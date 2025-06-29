import sgMail from "@sendgrid/mail";

interface AuditRequestData {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  eventName: string;
  eventType: string;
  eventDate: string;
  eventLocation: string;
  expectedAttendees: string;
  eventDescription: string;
  additionalRequirements?: string;
  requestId: number;
}

export async function sendAuditRequestNotification(requestData: AuditRequestData): Promise<boolean> {
  if (!process.env.SENDGRID_API_KEY) {
    console.error("SENDGRID_API_KEY not configured");
    return false;
  }

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #2c5282; color: white; padding: 20px; text-align: center;">
        <h1>New UFI Event Audit Request</h1>
        <p>Request ID: #${requestData.requestId}</p>
      </div>
      
      <div style="padding: 20px; background: #f9f9f9;">
        <h2 style="color: #2c5282;">Company Information</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Company Name:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${requestData.companyName}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Contact Person:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${requestData.contactPerson}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${requestData.email}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Phone:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${requestData.phone}</td>
          </tr>
        </table>
        
        <h2 style="color: #2c5282; margin-top: 30px;">Event Information</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Event Name:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${requestData.eventName}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Event Type:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${requestData.eventType}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Event Date:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${requestData.eventDate}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Location:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${requestData.eventLocation}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Expected Attendees:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${requestData.expectedAttendees}</td>
          </tr>
        </table>
        
        <h2 style="color: #2c5282; margin-top: 30px;">Event Description</h2>
        <div style="background: white; padding: 15px; border-left: 4px solid #2c5282; margin: 10px 0;">
          ${requestData.eventDescription.replace(/\n/g, '<br>')}
        </div>
        
        ${requestData.additionalRequirements ? `
          <h2 style="color: #2c5282; margin-top: 30px;">Additional Requirements</h2>
          <div style="background: white; padding: 15px; border-left: 4px solid #f56500; margin: 10px 0;">
            ${requestData.additionalRequirements.replace(/\n/g, '<br>')}
          </div>
        ` : ''}
        
        <div style="margin-top: 30px; padding: 20px; background: #e6f3ff; border-radius: 5px;">
          <p style="margin: 0; color: #2c5282;"><strong>Next Steps:</strong></p>
          <p style="margin: 5px 0 0 0;">Please review this audit request and contact the client within 24 hours to discuss requirements and scheduling.</p>
        </div>
      </div>
      
      <div style="background: #2c5282; color: white; padding: 15px; text-align: center;">
        <p style="margin: 0;">Dawaam HR Services - UFI Event Auditing</p>
        <p style="margin: 5px 0 0 0; font-size: 12px;">This email was automatically generated from the Dawaam website.</p>
      </div>
    </div>
  `;

  const textContent = `
New UFI Event Audit Request - Request ID: #${requestData.requestId}

Company Information:
- Company Name: ${requestData.companyName}
- Contact Person: ${requestData.contactPerson}
- Email: ${requestData.email}
- Phone: ${requestData.phone}

Event Information:
- Event Name: ${requestData.eventName}
- Event Type: ${requestData.eventType}
- Event Date: ${requestData.eventDate}
- Location: ${requestData.eventLocation}
- Expected Attendees: ${requestData.expectedAttendees}

Event Description:
${requestData.eventDescription}

${requestData.additionalRequirements ? `Additional Requirements:\n${requestData.additionalRequirements}` : ''}

Please review this audit request and contact the client within 24 hours.

---
Dawaam HR Services - UFI Event Auditing
This email was automatically generated from the Dawaam website.
  `;

  const msg = {
    to: "info@dawaam.com",
    from: "noreply@dawaam.com",
    subject: `UFI AUDIT REQUEST - SOURCE: SITE - ${requestData.eventName} (#${requestData.requestId})`,
    text: textContent,
    html: htmlContent,
  };

  try {
    await sgMail.send(msg);
    console.log(`Audit request notification sent successfully for request #${requestData.requestId}`);
    return true;
  } catch (error) {
    console.error("Error sending audit request notification:", error);
    return false;
  }
}