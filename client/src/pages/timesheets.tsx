import React, { useState, useEffect } from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import BackToTop from "@/components/back-to-top";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogIn, Clock, Shield, Users, FileText, CheckCircle, Plus, User, Building, Mail, MapPin, Phone } from "lucide-react";
import TimesheetForm from "@/components/timesheet-form";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Timesheets() {
  useScrollToTop();
  const { toast } = useToast();
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [showNewTimesheet, setShowNewTimesheet] = useState(false);
  const [editingTimesheet, setEditingTimesheet] = useState<any>(null);

  // Listen for timesheet submission completion event
  useEffect(() => {
    const handleTimesheetSubmission = (event: CustomEvent) => {
      console.log('✓ Received timesheet submission event:', event.detail);
      if (event.detail.tab === 'timesheets') {
        console.log('✓ Switching to timesheets tab');
        setActiveTab('timesheets');
        
        if (event.detail.submitted) {
          // Show success toast notification
          setTimeout(() => {
            const toast = document.createElement('div');
            toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
            toast.textContent = 'Timesheet submitted successfully! ✓';
            document.body.appendChild(toast);
            
            // Remove toast after 3 seconds
            setTimeout(() => {
              if (document.body.contains(toast)) {
                document.body.removeChild(toast);
              }
            }, 3000);
          }, 100);
        }
      }
    };
    
    // Add event listener
    window.addEventListener('timesheetSubmissionComplete', handleTimesheetSubmission as EventListener);
    
    // Cleanup
    return () => {
      window.removeEventListener('timesheetSubmissionComplete', handleTimesheetSubmission as EventListener);
    };
  }, []);
  const [activeTab, setActiveTab] = useState(() => {
    // Check URL parameters for tab selection
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');
    const submittedParam = urlParams.get('submitted');
    
    console.log('=== TAB INITIALIZATION ===');
    console.log('URL params:', window.location.search);
    console.log('Tab param:', tabParam);
    console.log('Submitted param:', submittedParam);
    
    if (tabParam === 'timesheets') {
      console.log('✓ Setting initial tab to timesheets from URL');
      
      // Show success message if redirected from submission
      if (submittedParam === 'true') {
        console.log('✓ Timesheet was just submitted - showing success message');
        
        // Show success toast notification
        setTimeout(() => {
          const toast = document.createElement('div');
          toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
          toast.textContent = 'Timesheet submitted successfully! ✓';
          document.body.appendChild(toast);
          
          // Remove toast after 3 seconds
          setTimeout(() => {
            document.body.removeChild(toast);
          }, 3000);
          
          // Clear URL parameters after showing message
          const newUrl = new URL(window.location.href);
          newUrl.searchParams.delete('tab');
          newUrl.searchParams.delete('submitted');
          window.history.replaceState({}, '', newUrl.toString());
        }, 500);
      }
      
      return 'timesheets';
    }
    
    console.log('✓ Default tab: timesheets');
    return 'timesheets';
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const response = await apiRequest("POST", "/api/timesheet/login", credentials);
      return await response.json();
    },
    onSuccess: (data) => {
      setIsLoggedIn(true);
      setCurrentUser(data.user);
      toast({
        title: "Login Successful",
        description: `Welcome back, ${data.user.firstName}!`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Login Failed",
        description: error.message || "Invalid credentials",
        variant: "destructive",
      });
    },
  });

  const handleLogin = (e: React.FormEvent) => {
    console.log('=== HANDLE LOGIN DEBUG START ===');
    console.log('Event type:', e.type);
    console.log('Event target:', e.target);
    console.log('Current form data:', loginForm);
    console.log('Preventing default...');
    e.preventDefault();
    console.log('Calling loginMutation.mutate with:', loginForm);
    loginMutation.mutate(loginForm);
    console.log('=== HANDLE LOGIN DEBUG END ===');
  };

  // Debug function for Enter key handling
  const handlePasswordKeyPress = (e: React.KeyboardEvent) => {
    console.log('=== PASSWORD KEY PRESS DEBUG ===');
    console.log('Key pressed:', e.key);
    console.log('KeyCode:', e.keyCode);
    console.log('Which:', e.which);
    console.log('Target:', e.target);
    console.log('Current target:', e.currentTarget);
    
    if (e.key === 'Enter') {
      console.log('✓ Enter key detected - triggering login');
      console.log('About to call handleLogin...');
      
      // Create a synthetic form event
      const syntheticEvent = new Event('submit', { bubbles: true, cancelable: true });
      Object.defineProperty(syntheticEvent, 'target', { value: e.currentTarget, enumerable: true });
      
      console.log('Created synthetic event:', syntheticEvent);
      handleLogin(syntheticEvent as any);
      console.log('handleLogin call completed');
    } else {
      console.log('✗ Not Enter key - ignoring');
    }
    console.log('=== PASSWORD KEY PRESS DEBUG END ===');
  };

  // Fetch timesheets for logged in user
  const timesheetsQuery = useQuery({
    queryKey: ['/api/timesheets'],
    enabled: isLoggedIn,
    retry: false
  });

  const timesheets = timesheetsQuery.data || [];

  // Submit timesheet mutation
  const submitTimesheet = useMutation({
    mutationFn: async (data: FormData) => {
      // Debug what's being sent
      console.log('Submitting FormData in mutation:');
      for (let [key, value] of data.entries()) {
        console.log(`${key}:`, value);
      }
      
      const response = await fetch('/api/timesheets/submit', {
        method: 'POST',
        body: data, // Send FormData directly, no JSON conversion
      });

      if (!response.ok) {
        throw new Error('Failed to submit timesheet');
      }

      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Timesheet submitted successfully! Your supervisor will be notified for approval.",
      });
      setShowNewTimesheet(false);
      // Refetch timesheets to show the new submission
      timesheetsQuery.refetch();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit timesheet. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleTimesheetSubmit = (formData: FormData) => {
    // FormData is already properly formatted from the TimeSheetForm component
    submitTimesheet.mutate(formData);
  };

  const handleSaveTimesheet = (entries: any[]) => {
    toast({
      title: "Timesheet Saved",
      description: "Your timesheet has been saved as a draft",
    });
  };

  const handleSubmitTimesheet = (entries: any[]) => {
    toast({
      title: "Timesheet Submitted",
      description: "Your timesheet has been submitted for approval",
    });
  };

  // Listen for timesheet submission events
  useEffect(() => {
    const handleTimesheetSubmitSuccess = () => {
      console.log('=== WINDOW EVENT LISTENER: TIMESHEET SUCCESS ===');
      console.log('✓ Received timesheet submit success event');
      console.log('Current activeTab before redirect:', activeTab);
      
      setActiveTab('timesheets');
      console.log('✓ Tab switched to timesheets');
      
      // Refresh the timesheets list
      timesheetsQuery.refetch();
      console.log('✓ Timesheets query refetched');
    };

    window.addEventListener('timesheetSubmitSuccess', handleTimesheetSubmitSuccess);
    
    return () => {
      window.removeEventListener('timesheetSubmitSuccess', handleTimesheetSubmitSuccess);
    };
  }, [activeTab, timesheetsQuery]);

  // Callback for successful timesheet submission to redirect to dashboard
  const handleFormSubmitSuccess = () => {
    console.log('=== TIMESHEET SUBMIT SUCCESS TEST ===');
    console.log('✓ handleFormSubmitSuccess called - starting redirect');
    console.log('Current activeTab before:', activeTab);
    
    try {
      // Refetch timesheets to show the new submission
      console.log('✓ Calling timesheetsQuery.refetch()...');
      timesheetsQuery.refetch();
      console.log('✓ Timesheets refetched successfully');
      
      // Switch to timesheets tab to show dashboard
      console.log('✓ Calling setActiveTab("timesheets")...');
      setActiveTab("timesheets");
      console.log('✓ Tab switched to timesheets, activeTab is now:', "timesheets");
      console.log('✓ Redirect completed successfully');
    } catch (error) {
      console.error('✗ Error in handleFormSubmitSuccess:', error);
    }
    console.log('=== END TIMESHEET SUBMIT SUCCESS TEST ===');
  };

  // Listen for custom redirect events from TimesheetForm
  React.useEffect(() => {
    console.log('=== EXTENSIVE EVENT LISTENER SETUP DEBUG ===');
    console.log('Current activeTab:', activeTab);
    console.log('handleFormSubmitSuccess function exists:', typeof handleFormSubmitSuccess);
    console.log('Window object exists:', typeof window);
    console.log('addEventListener function exists:', typeof window.addEventListener);
    
    const handleTimesheetSuccess = (event: any) => {
      console.log('=== EVENT RECEIVED - EXTENSIVE DEBUG ===');
      console.log('Event object:', event);
      console.log('Event type:', event.type);
      console.log('Event detail:', event.detail);
      console.log('Event target:', event.target);
      console.log('Current activeTab at event time:', activeTab);
      console.log('About to call handleFormSubmitSuccess...');
      
      try {
        handleFormSubmitSuccess();
        console.log('✓ handleFormSubmitSuccess completed successfully');
      } catch (error) {
        console.error('✗ Error in handleFormSubmitSuccess:', error);
      }
      console.log('=== EVENT HANDLING COMPLETE ===');
    };

    console.log('Adding event listener...');
    window.addEventListener('timesheetSubmitSuccess', handleTimesheetSuccess);
    console.log('✓ Event listener added successfully');
    
    // Test the event listener by dispatching a test event
    console.log('Testing event listener with test event...');
    setTimeout(() => {
      const testEvent = new CustomEvent('timesheetSubmitSuccess', { 
        detail: { test: true, redirectToTab: 'timesheets' } 
      });
      console.log('Dispatching test event:', testEvent);
      window.dispatchEvent(testEvent);
      console.log('Test event dispatched');
    }, 1000);
    
    return () => {
      console.log('=== CLEANUP EVENT LISTENER ===');
      console.log('Removing timesheetSubmitSuccess event listener');
      window.removeEventListener('timesheetSubmitSuccess', handleTimesheetSuccess);
      console.log('✓ Event listener removed');
    };
  }, [handleFormSubmitSuccess, activeTab]);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen">
        <Navigation />
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700 py-20 overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container mx-auto px-6 text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Timesheet Management
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-8">
              Streamlined timesheet management for contractors and employers. 
              Track hours, submit timesheets, and manage approvals efficiently.
            </p>
            <div className="flex items-center justify-center space-x-8 text-blue-100">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>Time Tracking</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Team Management</span>
              </div>
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Digital Timesheets</span>
              </div>
            </div>
          </div>
        </section>

        {/* Login Section */}
        <section className="py-20">
          <div className="container mx-auto px-6 max-w-md">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-center">Login to Timesheets</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      onKeyDown={(e) => {
                        console.log('=== KEYDOWN EVENT DEBUG ===');
                        console.log('Key:', e.key, 'Code:', e.code, 'KeyCode:', e.keyCode);
                        
                        if (e.key === 'Enter' || e.code === 'Enter' || e.keyCode === 13) {
                          console.log('✓ Enter detected via keyDown - submitting form');
                          e.preventDefault();
                          
                          const form = e.currentTarget.closest('form');
                          if (form) {
                            console.log('✓ Found form, dispatching submit event');
                            form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
                          } else {
                            console.log('✗ No form found, calling loginMutation directly');
                            loginMutation.mutate(loginForm);
                          }
                        }
                      }}
                      onKeyPress={handlePasswordKeyPress}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    Login
                  </Button>
                </form>
                
                <div className="mt-6 text-center space-y-4">
                  <p className="text-sm text-gray-600 mb-4">
                    Don't have an account? Contact Dawaam to get access.
                  </p>
                  <div className="flex flex-col space-y-2">
                    <Button 
                      variant="outline" 
                      onClick={() => window.location.href = 'mailto:info@dawaam.com?subject=Timesheet Account Request'}
                    >
                      Request Access
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => window.location.href = '/timesheet-admin'}
                      className="text-xs text-gray-500 hover:text-gray-700"
                    >
                      Admin Login
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Timesheet Features
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Comprehensive timesheet management for modern workforce
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Time Tracking</h3>
                  <p className="text-gray-600">
                    Accurate time tracking with start/end times, breaks, and detailed work descriptions
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <FileText className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Digital Submission</h3>
                  <p className="text-gray-600">
                    Submit timesheets digitally with electronic signatures and automatic calculations
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <CheckCircle className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Approval Workflow</h3>
                  <p className="text-gray-600">
                    Streamlined approval process with notifications and feedback mechanisms
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <Footer />
        <BackToTop />
      </div>
    );
  }

  // Logged in view
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="py-8">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Timesheet Dashboard</h1>
              <div className="flex items-center space-x-4 mt-2 text-gray-600">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>{currentUser?.firstName} {currentUser?.lastName}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Building className="w-4 h-4" />
                  <span>{currentUser?.companyName || 'Independent Contractor'}</span>
                </div>
                <Badge variant={currentUser?.role === 'contractor' ? 'default' : 'secondary'}>
                  {currentUser?.role?.toUpperCase()}
                </Badge>
              </div>
            </div>
            <Button variant="outline" onClick={() => {
              setIsLoggedIn(false);
              setCurrentUser(null);
              setTimesheets([]);
            }}>
              Logout
            </Button>
          </div>

          {currentUser?.role === 'contractor' ? (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="timesheets">My Timesheets</TabsTrigger>
                <TabsTrigger value="submit">Submit New</TabsTrigger>
                <TabsTrigger value="profile">Profile</TabsTrigger>
              </TabsList>
              
              <TabsContent value="timesheets">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Timesheets</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {timesheets.length === 0 ? (
                      <div className="text-center py-8">
                        <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-4">No timesheets submitted yet</p>
                        <p className="text-sm text-gray-500 mb-4">
                          Start by creating your first timesheet using the "Submit New" tab
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {timesheets.map((timesheet, index) => {
                          const periodLabel = timesheet.periodType === 'monthly' ? 'Month of' : 'Week of';
                          const totalDisplay = timesheet.rateType === 'daily' 
                            ? `${timesheet.totalDays || 0} days` 
                            : `${timesheet.totalHours || 0} hours`;
                          
                          const formatDate = (dateStr: string) => {
                            const date = new Date(dateStr);
                            return timesheet.periodType === 'monthly' 
                              ? date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                              : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                          };
                          
                          const downloadTimesheet = async () => {
                            try {
                              const response = await fetch(`/api/timesheets/${timesheet.id}/download`);
                              if (!response.ok) throw new Error('Download failed');
                              
                              const blob = await response.blob();
                              const url = window.URL.createObjectURL(blob);
                              const a = document.createElement('a');
                              a.style.display = 'none';
                              a.href = url;
                              a.download = `${periodLabel}_${formatDate(timesheet.weekStarting).replace(/\s+/g, '_')}_Timesheet.pdf`;
                              document.body.appendChild(a);
                              a.click();
                              window.URL.revokeObjectURL(url);
                              document.body.removeChild(a);
                              
                              toast({
                                title: "Success",
                                description: "Timesheet downloaded successfully",
                              });
                            } catch (error) {
                              toast({
                                title: "Error",
                                description: "Failed to download timesheet",
                                variant: "destructive",
                              });
                            }
                          };
                          
                          return (
                            <div key={index} className="border rounded-lg p-4">
                              <div className="flex justify-between items-center">
                                <div 
                                  className="cursor-pointer flex-1" 
                                  onClick={downloadTimesheet}
                                  title="Click to download timesheet"
                                >
                                  <p className="font-semibold">{periodLabel} {formatDate(timesheet.weekStarting)}</p>
                                  <p className="text-sm text-gray-600">{totalDisplay}</p>
                                </div>
                                <Badge variant={
                                  timesheet.status === 'approved' ? 'default' : 
                                  timesheet.status === 'rejected' ? 'destructive' : 
                                  'secondary'
                                }>
                                  {timesheet.status}
                                </Badge>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="submit">
                <div>
                  <div className="mb-4 p-4 bg-yellow-100 rounded">
                    <p>Testing prop passing:</p>
                    <button onClick={() => {
                      console.log('✓ Test callback working');
                      handleFormSubmitSuccess();
                    }}>Test Redirect</button>
                  </div>
                  <TimesheetForm 
                    onCancel={() => {
                      console.log('✓ onCancel function called');
                      setActiveTab("timesheets");
                    }}
                    onSubmitSuccess={() => {
                      console.log('✓ onSubmitSuccess function called - executing redirect');
                      handleFormSubmitSuccess();
                    }}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>First Name</Label>
                        <Input value={currentUser?.firstName} readOnly />
                      </div>
                      <div>
                        <Label>Last Name</Label>
                        <Input value={currentUser?.lastName} readOnly />
                      </div>
                      <div>
                        <Label>Email</Label>
                        <Input value={currentUser?.email} readOnly />
                      </div>
                      <div>
                        <Label>Role</Label>
                        <Input value={currentUser?.role} readOnly />
                      </div>
                      <div className="col-span-2">
                        <Label>Company</Label>
                        <Input value={currentUser?.companyName || 'Independent Contractor'} readOnly />
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-4">
                      To update your profile information, please contact Dawaam administration.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          ) : (
            // Employer dashboard
            <Card>
              <CardHeader>
                <CardTitle>Pending Approvals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No timesheets pending approval</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      <Footer />
      <BackToTop />
    </div>
  );
}