import React, { useState, useMemo, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, FileText, Plus, Trash2, X, Check, Download, Send, Mail, Upload } from "lucide-react";
import DigitalSignature from "./digital-signature";
import { generateTimesheetPDF } from "@/utils/pdf-generator";
import { useToast } from "@/hooks/use-toast";

interface TimesheetEntry {
  date: string;
  startTime: string;
  endTime: string;
  breakTime: number;
  hoursWorked: number;
  workDescription: string;
  location: string;
}

interface WorkDay {
  date: string;
  dayName: string;
  isWorked: boolean;
  hours?: number;
}

interface TimesheetFormProps {
  editingData?: any;
  onCancel?: () => void;
  onSubmitSuccess?: () => void;
}

export default function TimesheetForm({ editingData, onCancel, onSubmitSuccess }: TimesheetFormProps) {
  console.log('=== TIMESHEET FORM PROPS DEBUG ===');
  console.log('editingData:', !!editingData);
  console.log('onCancel:', typeof onCancel, !!onCancel);
  console.log('onSubmitSuccess:', typeof onSubmitSuccess, !!onSubmitSuccess);
  console.log('=== END TIMESHEET FORM PROPS DEBUG ===');
  
  const { toast } = useToast();
  
  // Initialize with existing data if editing
  const [timesheetType, setTimesheetType] = useState<'weekly' | 'monthly'>('monthly');
  const [rateType, setRateType] = useState<'hourly' | 'daily'>('daily');
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [workDays, setWorkDays] = useState<WorkDay[]>([]);
  const [defaultHours, setDefaultHours] = useState(8);
  const [workDescription, setWorkDescription] = useState('');
  const [location, setLocation] = useState('');
  const [supervisorName, setSupervisorName] = useState('');
  const [supervisorEmail, setSupervisorEmail] = useState('');
  const [additionalEmails, setAdditionalEmails] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [department, setDepartment] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [contractorSignature, setContractorSignature] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<'timesheet' | 'review' | 'signature'>('timesheet');
  const [uploadedPDF, setUploadedPDF] = useState<File | null>(null);
  const [uploadMode, setUploadMode] = useState<'digital' | 'upload'>('digital');

  // Calculate week starting on Sunday
  const getWeekStart = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day;
    return new Date(d.setDate(diff));
  };

  // Generate work days for current period
  const periodDays = useMemo(() => {
    const days: WorkDay[] = [];
    
    if (timesheetType === 'weekly') {
      const weekStart = getWeekStart(currentWeek);
      for (let i = 0; i < 7; i++) {
        const date = new Date(weekStart);
        date.setDate(weekStart.getDate() + i);
        const existing = workDays.find(wd => wd.date === date.toISOString().split('T')[0]);
        days.push({
          date: date.toISOString().split('T')[0],
          dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
          isWorked: existing?.isWorked || false,
          hours: existing?.hours || defaultHours
        });
      }
    } else {
      const year = currentMonth.getFullYear();
      const month = currentMonth.getMonth();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      
      for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(year, month, i);
        const existing = workDays.find(wd => wd.date === date.toISOString().split('T')[0]);
        days.push({
          date: date.toISOString().split('T')[0],
          dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
          isWorked: existing?.isWorked || false,
          hours: existing?.hours || defaultHours
        });
      }
    }
    
    return days;
  }, [timesheetType, currentWeek, currentMonth, workDays, defaultHours]);

  // Load existing timesheet data when editing
  useEffect(() => {
    if (editingData) {
      console.log("Loading edit data:", editingData);
      
      // Set basic form fields
      setTimesheetType(editingData.periodType === 'weekly' ? 'weekly' : 'monthly');
      setRateType(editingData.rateType || 'daily');
      setWorkDescription(editingData.workDescription || '');
      setLocation(editingData.workLocation || editingData.location || '');
      setDepartment(editingData.department || '');
      setJobTitle(editingData.jobTitle || '');
      setSupervisorName(editingData.supervisorName || '');
      setSupervisorEmail(editingData.supervisorEmail || '');
      setAdditionalEmails(editingData.additionalEmails || '');
      // Set company name from database field
      setCompanyName(editingData.companyName || '');
      
      // Set dates
      if (editingData.weekStarting) {
        const startDate = new Date(editingData.weekStarting);
        setCurrentWeek(startDate);
        setCurrentMonth(startDate);
      }
      
      // Reconstruct work days from period and total information
      if (editingData.totalDays && editingData.weekStarting) {
        console.log('Reconstructing work days from totalDays:', editingData.totalDays);
        
        const periodStart = new Date(editingData.weekStarting);
        const workDaysArray: WorkDay[] = [];
        const totalWorkedDays = parseInt(editingData.totalDays.toString());
        
        if (editingData.periodType === 'monthly') {
          // For monthly, spread work days across the month
          const year = periodStart.getFullYear();
          const month = periodStart.getMonth();
          const daysInMonth = new Date(year, month + 1, 0).getDate();
          
          // Distribute work days evenly throughout the month
          const dayInterval = Math.floor(daysInMonth / totalWorkedDays);
          
          for (let i = 0; i < totalWorkedDays; i++) {
            const dayNum = Math.min(1 + (i * dayInterval), daysInMonth);
            const date = new Date(year, month, dayNum);
            workDaysArray.push({
              date: date.toISOString().split('T')[0],
              dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
              isWorked: true,
              hours: editingData.rateType === 'hourly' ? 8 : 1
            });
          }
        } else {
          // For weekly, use consecutive days
          for (let i = 0; i < totalWorkedDays; i++) {
            const date = new Date(periodStart);
            date.setDate(periodStart.getDate() + i);
            workDaysArray.push({
              date: date.toISOString().split('T')[0],
              dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
              isWorked: true,
              hours: editingData.rateType === 'hourly' ? 8 : 1
            });
          }
        }
        
        console.log('Setting reconstructed work days:', workDaysArray);
        setWorkDays(workDaysArray);
      }
      
      // Load work days from stored data if available
      if (editingData.workDays) {
        try {
          let workDaysData;
          if (typeof editingData.workDays === 'string') {
            workDaysData = JSON.parse(editingData.workDays);
          } else {
            workDaysData = editingData.workDays;
          }
          
          console.log('Parsed work days data:', workDaysData);
          
          if (Array.isArray(workDaysData)) {
            const loadedWorkDays: WorkDay[] = workDaysData.map((dateStr: string) => ({
              date: dateStr,
              dayName: new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short' }),
              isWorked: true,
              hours: editingData.rateType === 'hourly' ? 8 : 1
            }));
            
            console.log('Setting work days from stored data:', loadedWorkDays);
            setWorkDays(loadedWorkDays);
          }
        } catch (error) {
          console.error('Error parsing work days:', error);
        }
      }
      
      // Also check if we have entries data to populate work days
      if (editingData.entries) {
        try {
          let entriesData;
          if (typeof editingData.entries === 'string') {
            entriesData = JSON.parse(editingData.entries);
          } else {
            entriesData = editingData.entries;
          }
          
          if (Array.isArray(entriesData) && entriesData.length > 0) {
            const workDaysFromEntries: WorkDay[] = entriesData.map((entry: any) => ({
              date: entry.date,
              dayName: new Date(entry.date).toLocaleDateString('en-US', { weekday: 'short' }),
              isWorked: true,
              hours: entry.hoursWorked || 8
            }));
            
            console.log('Setting work days from entries:', workDaysFromEntries);
            setWorkDays(workDaysFromEntries);
          }
        } catch (error) {
          console.error('Error parsing entries:', error);
        }
      }
    }
  }, [editingData]);

  const toggleWorkDay = (date: string) => {
    const updated = [...workDays];
    const existingIndex = updated.findIndex(wd => wd.date === date);
    
    if (existingIndex >= 0) {
      updated[existingIndex].isWorked = !updated[existingIndex].isWorked;
      if (!updated[existingIndex].isWorked) {
        updated[existingIndex].hours = 0;
      } else {
        updated[existingIndex].hours = defaultHours;
      }
    } else {
      // Create new work day entry
      updated.push({
        date: date,
        dayName: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
        isWorked: true,
        hours: defaultHours
      });
    }
    
    setWorkDays(updated);
  };

  const updateDayHours = (date: string, hours: number) => {
    const updated = [...workDays];
    const existingIndex = updated.findIndex(wd => wd.date === date);
    
    if (existingIndex >= 0) {
      updated[existingIndex].hours = hours;
    } else {
      // Create new work day entry with hours
      updated.push({
        date: date,
        dayName: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
        isWorked: true,
        hours: hours
      });
    }
    
    setWorkDays(updated);
  };

  // Calculate totals based on workDays array
  const totalHours = workDays.filter(day => day.isWorked).reduce((sum, day) => sum + (day.hours || 0), 0);
  const totalDays = workDays.filter(day => day.isWorked).length;

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newWeek = new Date(currentWeek);
    newWeek.setDate(currentWeek.getDate() + (direction === 'prev' ? -7 : 7));
    setCurrentWeek(newWeek);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + (direction === 'prev' ? -1 : 1));
    setCurrentMonth(newMonth);
  };

  const convertToEntries = (): TimesheetEntry[] => {
    return periodDays
      .filter(day => day.isWorked)
      .map(day => ({
        date: day.date,
        startTime: '09:00',
        endTime: rateType === 'hourly' ? `${9 + (day.hours || 8)}:00` : '17:00',
        breakTime: rateType === 'hourly' ? 1 : 0,
        hoursWorked: day.hours || 8,
        workDescription: workDescription,
        location: location
      }));
  };

  const generatePDF = () => {
    const periodText = timesheetType === 'weekly' 
      ? `Week of ${getWeekStart(currentWeek).toLocaleDateString()}`
      : currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    const pdfData = {
      contractorName: 'John Smith', // This would come from user context
      companyName: companyName || 'Client Company',
      department: department || 'Not Specified',
      jobTitle: jobTitle || 'Not Specified',
      periodType: timesheetType,
      periodText,
      rateType,
      totalDays,
      totalHours,
      workLocation: location,
      workDescription,
      supervisorName,
      supervisorEmail,
      workDays: workDays,
      contractorSignature,
    };

    generateTimesheetPDF(pdfData);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === 'application/pdf') {
        setUploadedPDF(file);
      } else {
        alert('Please upload a PDF file only.');
      }
    }
  };

  const handleSubmitForApproval = async () => {
    if (uploadMode === 'digital' && !contractorSignature) {
      alert('Please sign the timesheet before submitting');
      return;
    }
    if (uploadMode === 'upload' && !uploadedPDF) {
      alert('Please upload the signed PDF before submitting');
      return;
    }
    if (!supervisorName || !supervisorEmail || !companyName || !department || !jobTitle) {
      alert('Please provide all required information including department and job title');
      return;
    }
    
    // Calculate fresh totals at submission time
    const submissionTotalDays = workDays.filter(day => day.isWorked).length;
    const submissionTotalHours = workDays.filter(day => day.isWorked).reduce((sum, day) => sum + (day.hours || 0), 0);
    
    console.log('Submission data:', { submissionTotalDays, submissionTotalHours, workDaysCount: workDays.length, workedDays: workDays.filter(d => d.isWorked) });
    
    const formData = new FormData();
    
    // Add all timesheet data to FormData with explicit values
    formData.append('timesheetType', timesheetType);
    formData.append('rateType', rateType);
    formData.append('totalDays', submissionTotalDays.toString());
    formData.append('totalHours', submissionTotalHours.toString());
    formData.append('workDescription', workDescription || '');
    formData.append('location', location || '');
    formData.append('department', department || '');
    formData.append('jobTitle', jobTitle || '');
    formData.append('supervisorName', supervisorName || '');
    formData.append('supervisorEmail', supervisorEmail || '');
    formData.append('additionalEmails', additionalEmails || '');
    formData.append('contractorSignature', contractorSignature || '');
    formData.append('periodStart', timesheetType === 'weekly' ? getWeekStart(currentWeek).toISOString() : new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).toISOString());
    formData.append('entries', JSON.stringify(convertToEntries()));

    // Add uploaded PDF if in upload mode
    if (uploadMode === 'upload' && uploadedPDF) {
      formData.append('signedPDF', uploadedPDF);
    }
    
    // Log FormData contents for debugging
    console.log('FormData contents:');
    for (let [key, value] of formData.entries()) {
      console.log(key, ':', value);
    }
    
    // Submit timesheet data using correct HTTP method
    try {
      await submitTimesheet(formData);
    } catch (error) {
      console.error('Submission wrapper error:', error);
      toast({
        title: "Error",
        description: "Failed to submit timesheet. Please try again.",
        variant: "destructive",
      });
    }
  };

  const submitTimesheet = async (formData: FormData) => {
    let submissionSuccessful = false;
    
    try {
      // Convert FormData to JSON for proper API request
      const jsonData: any = {};
      for (let [key, value] of formData.entries()) {
        if (key === 'entries') {
          jsonData[key] = JSON.parse(value as string);
        } else {
          jsonData[key] = value;
        }
      }
      
      // Add company name to submission data
      jsonData.companyName = companyName;
      
      const url = editingData ? `/api/timesheets/${editingData.id}` : '/api/timesheets/submit';
      const method = editingData ? 'PUT' : 'POST';
      
      console.log('Submitting to:', url, 'with method:', method);
      console.log('Data:', jsonData);
      
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      });

      if (response.ok) {
        submissionSuccessful = true;
        console.log('Success! Response status:', response.status);
        
        // Parse response to ensure no errors
        const result = await response.json();
        console.log('Response data:', result);
        
        toast({
          title: "Success",
          description: editingData ? "Timesheet updated successfully!" : "Timesheet submitted successfully! Redirecting to dashboard...",
        });

        // Reset form
        setWorkDays([]);
        setWorkDescription('');
        setLocation('');
        setDepartment('');
        setJobTitle('');
        setSupervisorName('');
        setSupervisorEmail('');
        setAdditionalEmails('');
        setContractorSignature('');
        setCompanyName('');
        
        // EXTENSIVE REDIRECT DEBUGGING - Multiple approaches
        console.log('=== COMPREHENSIVE REDIRECT ATTEMPT ===');
        console.log('Current window object:', window);
        console.log('Current location:', window.location);
        console.log('dispatchEvent function:', typeof window.dispatchEvent);
        
        // Method 1: Hash change
        try {
          console.log('Method 1: Setting hash to #timesheets');
          const oldHash = window.location.hash;
          window.location.hash = 'timesheets';
          console.log('Hash changed from', oldHash, 'to', window.location.hash);
        } catch (error) {
          console.error('✗ Method 1 failed:', error);
        }
        
        // Method 2: Custom event with extensive debugging
        try {
          console.log('Method 2: Custom event dispatch');
          const eventDetail = { 
            redirectToTab: 'timesheets',
            timestamp: Date.now(),
            source: 'TimesheetForm'
          };
          const customEvent = new CustomEvent('timesheetSubmitSuccess', { 
            detail: eventDetail,
            bubbles: true,
            cancelable: true
          });
          
          console.log('Created custom event:', customEvent);
          console.log('Event type:', customEvent.type);
          console.log('Event detail:', customEvent.detail);
          console.log('Event bubbles:', customEvent.bubbles);
          
          console.log('About to dispatch event...');
          const dispatchResult = window.dispatchEvent(customEvent);
          console.log('Event dispatch result:', dispatchResult);
          console.log('✓ Custom event dispatched successfully');
        } catch (error) {
          console.error('✗ Method 2 failed:', error);
        }
        
        // Method 3: Direct DOM manipulation - Enhanced
        try {
          console.log('Method 3: DOM manipulation attempt');
          
          // Look for all possible tab selectors
          const selectors = [
            '[data-state="inactive"]',
            '[role="tab"]',
            '.tab-trigger',
            'button[data-value="timesheets"]',
            'button:contains("My Timesheets")'
          ];
          
          let found = false;
          for (const selector of selectors) {
            const tabButtons = document.querySelectorAll(selector);
            console.log(`Selector "${selector}" found ${tabButtons.length} buttons`);
            
            tabButtons.forEach((btn, index) => {
              console.log(`Tab button ${index}:`, btn.textContent?.trim(), btn);
              
              // Check for multiple patterns to find the timesheets tab
              const buttonText = btn.textContent?.trim() || '';
              const dataValue = btn.getAttribute('data-value');
              
              if (buttonText.includes('My Timesheets') || 
                  buttonText.includes('Timesheets') || 
                  dataValue === 'timesheets' ||
                  buttonText.toLowerCase().includes('timesheet')) {
                
                console.log('✓ Found timesheets tab button - attempting click...');
                try {
                  // Multiple click approaches
                  (btn as HTMLElement).click();
                  
                  // Also try triggering events manually
                  btn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
                  btn.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
                  btn.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
                  
                  console.log('✓ Tab button clicked successfully');
                  found = true;
                } catch (clickError) {
                  console.error('✗ Click failed:', clickError);
                }
              }
            });
            
            if (found) break;
          }
          
          if (!found) {
            console.log('Trying direct tab switch via URL manipulation...');
            // Force a URL change to trigger tab switch
            window.history.pushState({}, '', window.location.pathname + '#timesheets');
            window.dispatchEvent(new PopStateEvent('popstate'));
          }
        } catch (error) {
          console.error('✗ Method 3 failed:', error);
        }
        
        // Method 4: Try localStorage signal
        try {
          console.log('Method 4: localStorage signal');
          localStorage.setItem('timesheetSubmitted', Date.now().toString());
          console.log('✓ localStorage signal set');
        } catch (error) {
          console.error('✗ Method 4 failed:', error);
        }
        
        // Method 5: Simple success notification without DOM manipulation
        setTimeout(() => {
          console.log('Method 5: Simple success notification');
          
          try {
            // Show clear success message
            console.log('✓ Displaying success notification');
            const instruction = document.createElement('div');
            instruction.style.cssText = `
              position: fixed; 
              top: 20px; 
              right: 20px; 
              background: #22c55e; 
              color: white; 
              padding: 20px; 
              border-radius: 8px; 
              z-index: 9999;
              font-weight: bold;
              text-align: center;
              box-shadow: 0 4px 12px rgba(0,0,0,0.3);
              max-width: 300px;
            `;
            instruction.innerHTML = `
              ✓ Timesheet Submitted Successfully!<br>
              <small style="font-weight: normal; display: block; margin-top: 8px;">
                Click "My Timesheets" tab to view your submission
              </small>
            `;
            document.body.appendChild(instruction);
            
            // Remove instruction after 4 seconds
            setTimeout(() => {
              try {
                if (instruction.parentNode) {
                  instruction.parentNode.removeChild(instruction);
                  console.log('✓ Success notification removed');
                }
              } catch (e) {
                console.log('Notification already removed:', e);
              }
            }, 4000);
            
          } catch (error) {
            console.error('✗ Method 5 failed:', error);
          }
          
          console.log('✓ Method 5 completed');
        }, 500);
        
        // Show instruction to manually navigate to My Timesheets
        setTimeout(() => {
          const instructionToast = document.createElement('div');
          instructionToast.className = 'fixed top-20 right-4 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 max-w-xs';
          instructionToast.innerHTML = '<div class="text-sm"><strong>Next:</strong> Click the "My Timesheets" tab to view your submission</div>';
          document.body.appendChild(instructionToast);
          
          // Remove instruction after 5 seconds
          setTimeout(() => {
            if (document.body.contains(instructionToast)) {
              document.body.removeChild(instructionToast);
            }
          }, 5000);
        }, 2000);
        
        // Clear form data for fresh start
        setWorkDays(getCurrentPeriodDays());
        setWorkDescription('');
        setLocation('');
        setSupervisorName('');
        setSupervisorEmail('');
        setAdditionalEmails('');
        setContractorSignature(null);
        
        return; // Exit function on success
      } else {
        let errorMessage = "Failed to save timesheet. Please try again.";
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          try {
            errorMessage = await response.text() || errorMessage;
          } catch {
            // Use default message
          }
        }
        console.error('Server error:', errorMessage);
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      }
    } catch (error) {
      // Only show network error if submission wasn't successful
      if (!submissionSuccessful) {
        console.error('Network connection error:', error);
        toast({
          title: "Error", 
          description: "Network connection error. Please check your internet connection and try again.",
          variant: "destructive",
        });
      } else {
        console.error('Post-submission error (but submission was successful):', error);
      }
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Step Indicator */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className={`flex items-center gap-2 ${currentStep === 'timesheet' ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'timesheet' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>1</div>
              <span>Timesheet Entry</span>
            </div>
            <div className={`flex items-center gap-2 ${currentStep === 'review' ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'review' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>2</div>
              <span>Review & Details</span>
            </div>
            <div className={`flex items-center gap-2 ${currentStep === 'signature' ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'signature' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>3</div>
              <span>Signature & Submit</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {currentStep === 'timesheet' && (
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Timesheet Entry
              </CardTitle>
              <div className="flex gap-2">
                <Select value={timesheetType} onValueChange={(value: 'weekly' | 'monthly') => setTimesheetType(value)}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={rateType} onValueChange={(value: 'hourly' | 'daily') => setRateType(value)}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly Rate</SelectItem>
                    <SelectItem value="daily">Daily Rate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
      <CardContent className="space-y-6">
        {/* Period Navigation */}
        <div className="flex justify-between items-center bg-blue-50 p-4 rounded-lg">
          <Button variant="outline" size="sm" onClick={() => timesheetType === 'weekly' ? navigateWeek('prev') : navigateMonth('prev')}>
            ← Previous
          </Button>
          <div className="text-center">
            <h3 className="font-medium">
              {timesheetType === 'weekly' 
                ? `Week of ${getWeekStart(currentWeek).toLocaleDateString()}`
                : `Month of ${currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`
              }
            </h3>
            <div className="text-sm text-gray-600 mt-1">
              {rateType === 'hourly' ? `Total Hours: ${totalHours}` : `Total Days: ${totalDays}`} - Selected: {workDays.filter(d => d.isWorked).length} days
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={() => timesheetType === 'weekly' ? navigateWeek('next') : navigateMonth('next')}>
            Next →
          </Button>
        </div>

        {/* Rate Configuration */}
        {rateType === 'hourly' && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <Label htmlFor="default-hours">Default Hours per Day</Label>
            <Input
              id="default-hours"
              type="number"
              min="1"
              max="24"
              value={defaultHours}
              onChange={(e) => setDefaultHours(parseInt(e.target.value) || 8)}
              className="w-32 mt-1"
            />
          </div>
        )}

        {/* Work Days Grid */}
        <div className="space-y-4">
          <h4 className="font-medium">Select Work Days</h4>
          {timesheetType === 'monthly' ? (
            <div className="space-y-2">
              <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium text-gray-500">
                <span>Sun</span>
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
              </div>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 35 }, (_, index) => {
                  const year = currentMonth.getFullYear();
                  const month = currentMonth.getMonth();
                  const daysInMonth = new Date(year, month + 1, 0).getDate();
                  
                  // Calculate which day to show (1-based day of month or empty)
                  const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0 = Sunday
                  const dayNumber = index - firstDayOfWeek + 1;
                  
                  // Only show days that are valid for this month
                  const isValidDay = dayNumber >= 1 && dayNumber <= daysInMonth;
                  
                  if (!isValidDay) {
                    // Empty cell for days outside current month
                    return (
                      <div key={index} className="h-12 border border-gray-100"></div>
                    );
                  }
                  
                  const cellDate = new Date(year, month, dayNumber);
                  const dayData = workDays.find(d => d.date === cellDate.toISOString().split('T')[0]);
                  const isWorked = dayData?.isWorked || false;
                  
                  return (
                    <div key={index} className="relative">
                      <Button
                        variant={isWorked ? "default" : "outline"}
                        size="sm"
                        className={`w-full h-12 flex flex-col p-1 text-xs ${
                          isWorked 
                            ? 'bg-green-600 hover:bg-green-700 text-white' 
                            : 'hover:bg-gray-100'
                        }`}
                        onClick={() => {
                          const dateStr = cellDate.toISOString().split('T')[0];
                          console.log('Toggling work day:', dateStr, 'Current workDays:', workDays.length);
                          toggleWorkDay(dateStr);
                        }}
                      >
                        <span className="font-medium">{dayNumber}</span>
                        {isWorked && (
                          <div className="absolute top-1 right-1">
                            <Check className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </Button>
                      {isWorked && rateType === 'hourly' && (
                        <Input
                          type="number"
                          min="0.25"
                          max="24"
                          step="0.25"
                          value={dayData?.hours || defaultHours}
                          onChange={(e) => updateDayHours(cellDate.toISOString().split('T')[0], parseFloat(e.target.value) || defaultHours)}
                          className="mt-1 h-6 text-xs text-center"
                          placeholder="Hours"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-7 gap-2">
              {periodDays.map((day) => {
                const workDay = workDays.find(wd => wd.date === day.date);
                const isWorked = workDay?.isWorked || false;
                return (
                  <div key={day.date} className="relative">
                    <Button
                      variant={isWorked ? "default" : "outline"}
                      size="sm"
                      className={`w-full h-16 flex flex-col p-1 ${isWorked ? 'bg-green-600 hover:bg-green-700' : ''}`}
                      onClick={() => {
                        console.log('Toggling work day:', day.date, 'Current workDays:', workDays.length);
                        toggleWorkDay(day.date);
                      }}
                    >
                      <span className="text-xs font-medium">{day.dayName}</span>
                      <span className="text-xs">{new Date(day.date).getDate()}</span>
                      {isWorked && (
                        <div className="absolute top-1 right-1">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </Button>
                    {isWorked && rateType === 'hourly' && (
                      <Input
                        type="number"
                        min="0.25"
                        max="24"
                        step="0.25"
                        value={workDay?.hours || defaultHours}
                        onChange={(e) => updateDayHours(day.date, parseFloat(e.target.value) || defaultHours)}
                        className="mt-1 h-8 text-xs text-center"
                        placeholder="Hours"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Work Details */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="location">Work Location</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter work location"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="work-description">Work Description</Label>
            <Textarea
              id="work-description"
              value={workDescription}
              onChange={(e) => setWorkDescription(e.target.value)}
              placeholder="Describe the work performed during this period"
              rows={3}
            />
          </div>
        </div>

        {/* Summary */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">{totalDays}</div>
              <div className="text-sm text-gray-600">Days Worked</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">{totalHours}</div>
              <div className="text-sm text-gray-600">Total Hours</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">{rateType === 'hourly' ? (totalHours / totalDays || 0).toFixed(1) : '8.0'}</div>
              <div className="text-sm text-gray-600">Avg Hours/Day</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{timesheetType === 'weekly' ? 'Weekly' : 'Monthly'}</div>
              <div className="text-sm text-gray-600">Period Type</div>
            </div>
          </div>
        </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4 border-t">
            <Button 
              variant="outline" 
              onClick={() => onSave(convertToEntries())} 
              className="flex-1"
              disabled={totalDays === 0}
            >
              Save Draft
            </Button>
            <Button 
              onClick={() => setCurrentStep('review')} 
              className="flex-1"
              disabled={totalDays === 0}
            >
              Continue to Review
            </Button>
          </div>
        </CardContent>
      </Card>
      )}

      {currentStep === 'review' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Review & Supervisor Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Timesheet Summary */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Timesheet Summary</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-xl font-bold text-blue-600">{totalDays}</div>
                  <div className="text-sm text-gray-600">Days Worked</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-blue-600">{totalHours}</div>
                  <div className="text-sm text-gray-600">Total Hours</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-blue-600">
                    {timesheetType === 'weekly' 
                      ? `Week of ${getWeekStart(currentWeek).toLocaleDateString()}`
                      : currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                    }
                  </div>
                  <div className="text-sm text-gray-600">Period</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-green-600">{rateType === 'hourly' ? 'Hourly' : 'Daily'}</div>
                  <div className="text-sm text-gray-600">Rate Type</div>
                </div>
              </div>
            </div>

            {/* Contractor Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="department">Department *</Label>
                <Input
                  id="department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder="e.g., IT, Finance, Operations"
                  required
                />
              </div>
              <div>
                <Label htmlFor="job-title">Job Title *</Label>
                <Input
                  id="job-title"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g., Software Developer, Analyst"
                  required
                />
              </div>
            </div>

            {/* Company Information */}
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="company-name">Client Company Name *</Label>
                <Input
                  id="company-name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Enter client company name"
                  required
                />
              </div>
            </div>

            {/* Supervisor Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="supervisor-name">Supervisor Name *</Label>
                <Input
                  id="supervisor-name"
                  value={supervisorName}
                  onChange={(e) => setSupervisorName(e.target.value)}
                  placeholder="Enter supervisor's full name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="supervisor-email">Supervisor Email *</Label>
                <Input
                  id="supervisor-email"
                  type="email"
                  value={supervisorEmail}
                  onChange={(e) => setSupervisorEmail(e.target.value)}
                  placeholder="supervisor@company.com"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="additional-emails">Additional Notification Emails (Optional)</Label>
              <Input
                id="additional-emails"
                value={additionalEmails}
                onChange={(e) => setAdditionalEmails(e.target.value)}
                placeholder="email1@company.com, email2@company.com (comma separated)"
              />
              <p className="text-sm text-gray-500 mt-1">
                These emails will be notified when the timesheet is approved
              </p>
            </div>

            <div className="flex gap-4 pt-4 border-t">
              <Button 
                variant="outline" 
                onClick={() => setCurrentStep('timesheet')}
                className="flex-1"
              >
                Back to Timesheet
              </Button>
              <Button 
                onClick={() => setCurrentStep('signature')}
                className="flex-1"
                disabled={!supervisorName || !supervisorEmail || !companyName || !department || !jobTitle}
              >
                Continue to Signature
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 'signature' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Choose Signature Method</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={uploadMode} onValueChange={(value: 'digital' | 'upload') => setUploadMode(value)} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="digital">Digital Signature</TabsTrigger>
                  <TabsTrigger value="upload">Upload Signed PDF</TabsTrigger>
                </TabsList>
                <TabsContent value="digital" className="mt-4">
                  <DigitalSignature
                    onSignatureChange={setContractorSignature}
                    existingSignature={contractorSignature}
                    signerName="Contractor"
                    title="Digital Signature"
                  />
                </TabsContent>
                <TabsContent value="upload" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Upload className="h-5 w-5" />
                        Upload Signed PDF
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-sm text-gray-600 space-y-2">
                        <p><strong>Instructions:</strong></p>
                        <ol className="list-decimal list-inside space-y-1">
                          <li>Download the blank timesheet PDF using the button below</li>
                          <li>Print and manually sign the document</li>
                          <li>Scan or photograph the signed document as a PDF</li>
                          <li>Upload the signed PDF file here</li>
                        </ol>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        onClick={generatePDF}
                        className="flex items-center gap-2 mb-4"
                      >
                        <Download className="h-4 w-4" />
                        Download Blank Timesheet
                      </Button>

                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={handleFileUpload}
                          className="hidden"
                          id="pdf-upload"
                        />
                        <label htmlFor="pdf-upload" className="cursor-pointer">
                          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-lg font-medium text-gray-700">
                            {uploadedPDF ? uploadedPDF.name : 'Click to upload signed PDF'}
                          </p>
                          <p className="text-sm text-gray-500 mt-2">
                            PDF files only, max 10MB
                          </p>
                        </label>
                      </div>

                      {uploadedPDF && (
                        <div className="bg-green-50 p-4 rounded-lg flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Check className="h-5 w-5 text-green-600" />
                            <span className="text-green-700 font-medium">
                              File uploaded: {uploadedPDF.name}
                            </span>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setUploadedPDF(null)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5" />
                Submit Timesheet
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">What happens next?</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Your signed timesheet will be sent to your supervisor: <strong>{supervisorEmail}</strong></li>
                  <li>• Supervisor will receive an email with a link to review and approve</li>
                  <li>• Once approved, you and all specified parties will be notified</li>
                  <li>• You can download a PDF copy anytime from your timesheet history</li>
                </ul>
              </div>

              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentStep('review')}
                  className="flex-1"
                >
                  Back to Review
                </Button>
                {uploadMode === 'digital' && (
                  <Button 
                    variant="outline" 
                    onClick={generatePDF}
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download PDF
                  </Button>
                )}
                <Button 
                  onClick={handleSubmitForApproval}
                  className="flex-1 flex items-center gap-2"
                  disabled={uploadMode === 'digital' ? !contractorSignature : !uploadedPDF}
                >
                  <Mail className="h-4 w-4" />
                  Submit for Approval
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}