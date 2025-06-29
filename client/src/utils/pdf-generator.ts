import jsPDF from 'jspdf';
import dawaamLogo from "@assets/dawaam_1750842973576.jpg";

interface TimesheetPDFData {
  contractorName: string;
  companyName: string;
  department: string;
  jobTitle: string;
  periodType: string;
  periodText: string;
  rateType: string;
  totalDays: number;
  totalHours: number;
  workLocation: string;
  workDescription: string;
  supervisorName?: string;
  supervisorEmail?: string;
  workDays: Array<{
    date: string;
    dayName: string;
    hours: number;
    isWorked: boolean;
  }>;
  contractorSignature?: string;
  supervisorSignature?: string;
}

export function generateTimesheetPDF(data: TimesheetPDFData): void {
  const doc = new jsPDF();
  
  // Add Dawaam logo to top left (original circular logo maintains aspect ratio)
  try {
    // Use original dimensions to prevent distortion
    doc.addImage(dawaamLogo, 'JPEG', 20, 8, 22, 22);
  } catch (error) {
    console.warn('Could not add logo to PDF:', error);
  }
  
  // Modern Header Design
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('TIMESHEET', 105, 18, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Dawaam HR Services', 105, 26, { align: 'center' });
  doc.text('Professional Timesheet Management', 105, 32, { align: 'center' });
  
  // Modern line separator
  doc.setLineWidth(0.5);
  doc.line(20, 38, 190, 38);
  
  // Modern Information Section
  let yPos = 48;
  
  // Section Header
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('CONTRACTOR DETAILS', 20, yPos);
  
  yPos += 8;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  
  // Two-column layout
  doc.text(`Name: ${data.contractorName}`, 20, yPos);
  doc.text(`Client Company: ${data.companyName}`, 110, yPos);
  
  yPos += 6;
  doc.text(`Department: ${data.department}`, 20, yPos);
  doc.text(`Job Title: ${data.jobTitle}`, 110, yPos);
  
  // Period Information Section
  yPos += 12;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('PERIOD DETAILS', 20, yPos);
  
  yPos += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(`Period: ${data.periodText}`, 20, yPos);
  doc.text(`Rate Type: ${data.rateType}`, 110, yPos);
  
  yPos += 6;
  doc.text(`Work Location: ${data.workLocation}`, 20, yPos);
  if (data.supervisorName) {
    doc.text(`Supervisor: ${data.supervisorName}`, 110, yPos);
  }
  
  // Summary Section with Box
  yPos += 12;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('SUMMARY', 20, yPos);
  
  yPos += 8;
  // Create a summary box
  doc.rect(20, yPos - 3, 170, 12);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(`Total Days Worked: ${data.totalDays}`, 25, yPos + 3);
  doc.text(`Total Hours: ${data.totalHours}`, 80, yPos + 3);
  doc.text(`Average: ${data.totalDays > 0 ? (data.totalHours / data.totalDays).toFixed(1) : '0'} hrs/day`, 130, yPos + 3);
  
  // Work Calendar Section
  yPos += 18;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('DAILY WORK RECORD', 20, yPos);
  
  yPos += 8;
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  
  // Modern grid layout for all days
  const startX = 20;
  const startY = yPos;
  const cellWidth = 24;
  const cellHeight = 16;
  const cols = 7;
  const rows = Math.ceil(data.workDays.length / 7);
  
  // Day headers
  const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  dayHeaders.forEach((day, i) => {
    doc.text(day, startX + (i * cellWidth) + 2, startY);
  });
  
  yPos = startY + 8;
  
  // Draw grid for all work days
  let dayIndex = 0;
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols && dayIndex < data.workDays.length; col++) {
      const x = startX + (col * cellWidth);
      const y = yPos + (row * cellHeight);
      const workDay = data.workDays[dayIndex];
      
      if (workDay) {
        // Draw cell border with modern styling
        doc.setLineWidth(0.5);
        doc.rect(x, y, cellWidth, cellHeight);
        
        const date = new Date(workDay.date);
        const dayNum = date.getDate();
        
        // Day number
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.text(dayNum.toString(), x + 2, y + 7);
        
        // Day name
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7);
        doc.text(workDay.dayName.substr(0, 3), x + 2, y + 11);
        
        if (workDay.isWorked) {
          // Hours worked
          doc.setFontSize(8);
          doc.text(`${workDay.hours}h`, x + 2, y + 14);
          
          // Modern work indicator - filled circle
          doc.setFillColor(0, 0, 0);
          doc.circle(x + 18, y + 6, 3, 'F');
          
          // White checkmark
          doc.setTextColor(255, 255, 255);
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(6);
          doc.text('✓', x + 17, y + 7);
          doc.setTextColor(0, 0, 0); // Reset to black
        } else {
          // Empty circle for non-worked days
          doc.setLineWidth(0.5);
          doc.circle(x + 18, y + 6, 3, 'S');
        }
      }
      dayIndex++;
    }
  }
  
  yPos += (rows * cellHeight) + 6;
  
  // Work Description
  if (data.workDescription) {
    yPos += 4;
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text('Work Description:', 20, yPos);
    
    yPos += 4;
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    const splitDescription = doc.splitTextToSize(data.workDescription, 170);
    doc.text(splitDescription, 20, yPos);
    yPos += splitDescription.length * 2.5 + 4;
  }
  
  // Signatures section (simplified without boxes to save space)
  yPos += 6;
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('Signatures:', 20, yPos);
  
  yPos += 6;
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.text('Contractor: ________________________   Date: ____________', 20, yPos);
  yPos += 5;
  doc.text('Supervisor: ________________________   Date: ____________', 20, yPos);
  
  // Footer
  yPos += 8;
  doc.setFontSize(5);
  doc.setFont('helvetica', 'italic');
  doc.text('Generated by Dawaam Timesheet System', 105, yPos, { align: 'center' });
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 105, yPos + 2.5, { align: 'center' });
  
  // Generate filename in format: Month_Year_FirstName_LastName_Timesheet
  const [firstName, ...lastNameParts] = data.contractorName.split(' ');
  const lastName = lastNameParts.join('_');
  
  // Get month and year from period
  let month = '';
  let year = '';
  
  if (data.periodType === 'weekly') {
    // Extract from period text like "Week of 1/1/2025"
    const dateMatch = data.periodText.match(/(\d+)\/(\d+)\/(\d+)/);
    if (dateMatch) {
      const date = new Date(parseInt(dateMatch[3]), parseInt(dateMatch[1]) - 1, parseInt(dateMatch[2]));
      month = date.toLocaleDateString('en-US', { month: 'long' });
      year = date.getFullYear().toString();
    }
  } else {
    // Extract from period text like "January 2025"
    const parts = data.periodText.split(' ');
    if (parts.length >= 2) {
      month = parts[0];
      year = parts[1];
    }
  }
  
  // Fallback to current date if parsing fails
  if (!month || !year) {
    const now = new Date();
    month = now.toLocaleDateString('en-US', { month: 'long' });
    year = now.getFullYear().toString();
  }
  
  const filename = `${month}_${year}_${firstName}_${lastName}_Timesheet.pdf`;
  doc.save(filename);
}

export function generateBlankTimesheetPDF(): void {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('BLANK TIMESHEET', 105, 20, { align: 'center' });
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.text('Dawaam HR Services', 105, 30, { align: 'center' });
  
  // Add form fields
  let yPos = 50;
  doc.setFontSize(10);
  
  doc.text('Contractor Name: ________________________', 20, yPos);
  doc.text('Company: ________________________', 120, yPos);
  
  yPos += 15;
  doc.text('Period: ________________________', 20, yPos);
  doc.text('Rate Type: ⬜ Hourly ⬜ Daily', 120, yPos);
  
  yPos += 15;
  doc.text('Work Location: ________________________', 20, yPos);
  
  // Weekly grid
  yPos += 20;
  doc.setFont('helvetica', 'bold');
  doc.text('Daily Time Record', 20, yPos);
  
  yPos += 10;
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  // Table header
  doc.text('Day', 20, yPos);
  doc.text('Date', 60, yPos);
  doc.text('Start', 90, yPos);
  doc.text('End', 120, yPos);
  doc.text('Break', 145, yPos);
  doc.text('Hours', 170, yPos);
  
  doc.line(20, yPos + 2, 190, yPos + 2);
  yPos += 8;
  
  doc.setFont('helvetica', 'normal');
  days.forEach(day => {
    doc.text(day, 20, yPos);
    doc.text('___/___', 60, yPos);
    doc.text('____', 90, yPos);
    doc.text('____', 120, yPos);
    doc.text('____', 145, yPos);
    doc.text('____', 170, yPos);
    yPos += 10;
  });
  
  // Total line
  yPos += 5;
  doc.line(20, yPos, 190, yPos);
  yPos += 8;
  doc.setFont('helvetica', 'bold');
  doc.text('TOTAL HOURS:', 120, yPos);
  doc.text('________', 160, yPos);
  
  // Work description
  yPos += 20;
  doc.text('Work Description:', 20, yPos);
  yPos += 10;
  for (let i = 0; i < 3; i++) {
    doc.text('_________________________________________________________________________', 20, yPos);
    yPos += 8;
  }
  
  // Signatures
  yPos += 15;
  doc.text('Contractor Signature:', 20, yPos);
  doc.text('Date: ____________', 20, yPos + 15);
  doc.rect(20, yPos + 5, 60, 8);
  
  doc.text('Supervisor Signature:', 120, yPos);
  doc.text('Date: ____________', 120, yPos + 15);
  doc.rect(120, yPos + 5, 60, 8);
  
  doc.save('blank_timesheet.pdf');
}