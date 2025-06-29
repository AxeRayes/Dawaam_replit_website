interface TimesheetPDFData {
  periodText: string;
  totalHours: number;
  totalDays: number;
  workDescription: string;
  location: string;
  department: string;
  jobTitle: string;
  supervisorName: string;
  supervisorEmail: string;
  contractorSignature: string;
  supervisorSignature: string;
  firstName: string;
  lastName: string;
  companyName: string;
  rateType: string;
  periodType: string;
  entries: Array<{
    date: string;
    startTime: string;
    endTime: string;
    hoursWorked: number;
    workDescription: string;
    location: string;
  }>;
}

export function generateTimesheetPDF(data: TimesheetPDFData): Buffer {
  const { jsPDF } = require('jspdf');
  require('jspdf-autotable');

  const pdf = new jsPDF();
  
  // Add logo and header
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text('DAWAAM - MANPOWER SERVICES', 105, 20, { align: 'center' });
  
  pdf.setFontSize(16);
  pdf.text('TIMESHEET', 105, 30, { align: 'center' });
  
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.text(data.periodText, 105, 40, { align: 'center' });
  
  // Employee Information Box
  pdf.setFontSize(11);
  pdf.rect(15, 50, 180, 40);
  pdf.setFont('helvetica', 'bold');
  pdf.text('EMPLOYEE INFORMATION', 20, 60);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Name: ${data.firstName} ${data.lastName}`, 20, 70);
  pdf.text(`Company: ${data.companyName}`, 20, 77);
  pdf.text(`Department: ${data.department}`, 105, 70);
  pdf.text(`Job Title: ${data.jobTitle}`, 105, 77);
  pdf.text(`Location: ${data.location}`, 20, 84);
  
  // Work Summary Box
  pdf.rect(15, 100, 180, 25);
  pdf.setFont('helvetica', 'bold');
  pdf.text('WORK SUMMARY', 20, 110);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Total Hours: ${data.totalHours || 0}`, 20, 118);
  pdf.text(`Total Days: ${data.totalDays || 0}`, 105, 118);
  
  // Work Entries Table
  if (data.entries && data.entries.length > 0) {
    const tableData = data.entries.map(entry => [
      entry.date,
      `${entry.startTime} - ${entry.endTime}`,
      entry.hoursWorked.toString(),
      entry.workDescription || 'Regular work activities',
      entry.location
    ]);
    
    pdf.autoTable({
      head: [['Date', 'Time Period', 'Hours', 'Work Description', 'Location']],
      body: tableData,
      startY: 135,
      theme: 'grid',
      styles: { 
        fontSize: 9,
        cellPadding: 3
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      }
    });
  }
  
  // Signatures Section
  const finalY = (pdf as any).lastAutoTable ? (pdf as any).lastAutoTable.finalY + 20 : 200;
  
  pdf.rect(15, finalY, 180, 50);
  pdf.setFont('helvetica', 'bold');
  pdf.text('SIGNATURES', 20, finalY + 10);
  
  pdf.setFont('helvetica', 'normal');
  pdf.text('Contractor Signature:', 20, finalY + 25);
  pdf.line(80, finalY + 25, 140, finalY + 25);
  pdf.text(`${data.firstName} ${data.lastName}`, 20, finalY + 32);
  
  pdf.text('Supervisor Signature:', 20, finalY + 40);
  pdf.line(80, finalY + 40, 140, finalY + 40);
  pdf.text(`${data.supervisorName}`, 20, finalY + 47);
  
  // Footer
  pdf.setFontSize(8);
  pdf.text(`Generated: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`, 20, 280);
  pdf.text('DAWAAM - Professional Manpower Services', 105, 280, { align: 'center' });
  
  // Return proper PDF buffer
  const pdfArrayBuffer = pdf.output('arraybuffer');
  return Buffer.from(pdfArrayBuffer);
}