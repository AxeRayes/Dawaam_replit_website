import { sendEmail } from "./sendgrid";

interface TimesheetNotificationData {
  supervisorEmail: string;
  supervisorName: string;
  contractorName: string;
  timesheetId: number;
  period: string;
  totalHours: number;
  approvalLink: string;
}

interface ApprovalNotificationData {
  timesheetId: number;
  contractorEmail: string;
  additionalEmails?: string;
  supervisorName: string;
  approvedAt: Date;
}

interface RejectionNotificationData {
  timesheetId: number;
  contractorEmail: string;
  rejectionReason: string;
  rejectedBy: string;
  rejectedAt: Date;
}

export async function sendTimesheetNotification(data: TimesheetNotificationData): Promise<boolean> {
  const subject = `Timesheet Approval Required - ${data.contractorName}`;
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #2563eb; color: white; padding: 20px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">Timesheet Approval Required</h1>
      </div>
      
      <div style="padding: 30px; background-color: #f9fafb;">
        <p style="font-size: 16px; color: #374151; margin-bottom: 20px;">
          Dear ${data.supervisorName},
        </p>
        
        <p style="font-size: 16px; color: #374151; margin-bottom: 20px;">
          A new timesheet has been submitted by <strong>${data.contractorName}</strong> and requires your approval.
        </p>
        
        <div style="background-color: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 20px 0;">
          <h3 style="color: #1f2937; margin-top: 0;">Timesheet Details:</h3>
          <ul style="color: #374151; line-height: 1.6;">
            <li><strong>Contractor:</strong> ${data.contractorName}</li>
            <li><strong>Period:</strong> ${data.period}</li>
            <li><strong>Total Hours:</strong> ${data.totalHours}</li>
            <li><strong>Timesheet ID:</strong> #${data.timesheetId}</li>
          </ul>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${data.approvalLink}" 
             style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
            Review & Approve Timesheet
          </a>
        </div>
        
        <p style="font-size: 14px; color: #6b7280; margin-top: 30px;">
          Please review the timesheet details and either approve or request changes. 
          The contractor will be notified of your decision automatically.
        </p>
        
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
        
        <p style="font-size: 12px; color: #9ca3af; text-align: center;">
          This is an automated notification from Dawaam Timesheet System<br>
          If you have questions, please contact <a href="mailto:info@dawaam.com">info@dawaam.com</a>
        </p>
      </div>
    </div>
  `;

  const text = `
    Timesheet Approval Required
    
    Dear ${data.supervisorName},
    
    A new timesheet has been submitted by ${data.contractorName} and requires your approval.
    
    Timesheet Details:
    - Contractor: ${data.contractorName}
    - Period: ${data.period}
    - Total Hours: ${data.totalHours}
    - Timesheet ID: #${data.timesheetId}
    
    Please visit the following link to review and approve:
    ${data.approvalLink}
    
    Best regards,
    Dawaam Timesheet System
  `;

  return await sendEmail({
    to: data.supervisorEmail,
    from: "timesheets@dawaam.com",
    subject,
    html,
    text
  });
}

export async function sendApprovalNotification(data: ApprovalNotificationData): Promise<boolean> {
  const subject = `Timesheet Approved - #${data.timesheetId}`;
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #059669; color: white; padding: 20px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">✓ Timesheet Approved</h1>
      </div>
      
      <div style="padding: 30px; background-color: #f9fafb;">
        <p style="font-size: 16px; color: #374151; margin-bottom: 20px;">
          Good news! Your timesheet has been approved.
        </p>
        
        <div style="background-color: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 20px 0;">
          <h3 style="color: #1f2937; margin-top: 0;">Approval Details:</h3>
          <ul style="color: #374151; line-height: 1.6;">
            <li><strong>Timesheet ID:</strong> #${data.timesheetId}</li>
            <li><strong>Approved By:</strong> ${data.supervisorName}</li>
            <li><strong>Approved On:</strong> ${data.approvedAt.toLocaleString()}</li>
          </ul>
        </div>
        
        <p style="font-size: 14px; color: #6b7280;">
          Your timesheet has been processed and all relevant parties have been notified.
        </p>
        
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
        
        <p style="font-size: 12px; color: #9ca3af; text-align: center;">
          This is an automated notification from Dawaam Timesheet System<br>
          If you have questions, please contact <a href="mailto:info@dawaam.com">info@dawaam.com</a>
        </p>
      </div>
    </div>
  `;

  const emails = [data.contractorEmail];
  if (data.additionalEmails) {
    emails.push(...data.additionalEmails.split(',').map(e => e.trim()));
  }
  emails.push('timesheets@dawaam.com'); // Always notify Dawaam

  let allSent = true;
  for (const email of emails) {
    const sent = await sendEmail({
      to: email,
      from: "timesheets@dawaam.com",
      subject,
      html,
      text: `Timesheet #${data.timesheetId} has been approved by ${data.supervisorName} on ${data.approvedAt.toLocaleString()}.`
    });
    if (!sent) allSent = false;
  }

  return allSent;
}

export async function sendRejectionNotification(data: RejectionNotificationData): Promise<boolean> {
  const subject = `Timesheet Rejected - #${data.timesheetId}`;
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #dc2626; color: white; padding: 20px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">Timesheet Requires Revision</h1>
      </div>
      
      <div style="padding: 30px; background-color: #f9fafb;">
        <p style="font-size: 16px; color: #374151; margin-bottom: 20px;">
          Your timesheet has been reviewed and requires some revisions before approval.
        </p>
        
        <div style="background-color: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 20px 0;">
          <h3 style="color: #1f2937; margin-top: 0;">Rejection Details:</h3>
          <ul style="color: #374151; line-height: 1.6;">
            <li><strong>Timesheet ID:</strong> #${data.timesheetId}</li>
            <li><strong>Reviewed By:</strong> ${data.rejectedBy}</li>
            <li><strong>Date:</strong> ${data.rejectedAt.toLocaleString()}</li>
          </ul>
          
          <h4 style="color: #dc2626; margin-top: 20px;">Reason for Rejection:</h4>
          <p style="background-color: #fef2f2; border-left: 4px solid #dc2626; padding: 15px; color: #374151;">
            ${data.rejectionReason}
          </p>
        </div>
        
        <p style="font-size: 14px; color: #6b7280;">
          Please review the feedback above, make the necessary corrections, and resubmit your timesheet.
        </p>
        
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
        
        <p style="font-size: 12px; color: #9ca3af; text-align: center;">
          This is an automated notification from Dawaam Timesheet System<br>
          If you have questions, please contact <a href="mailto:info@dawaam.com">info@dawaam.com</a>
        </p>
      </div>
    </div>
  `;

  return await sendEmail({
    to: data.contractorEmail,
    from: "timesheets@dawaam.com",
    subject,
    html,
    text: `Timesheet #${data.timesheetId} has been rejected by ${data.rejectedBy}. Reason: ${data.rejectionReason}`
  });
}