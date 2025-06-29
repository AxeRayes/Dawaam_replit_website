import { sendEmail } from './sendgrid';

interface ConsultationRequestData {
  companyName: string;
  contactPerson: string;
  jobTitle: string;
  contactEmail: string;
  contactPhone: string;
  industry: string;
  companySize: string;
  consultationType: string;
  urgency: string;
  preferredTime: string;
  preferredDay: string;
  meetingFormat: string;
  currentChallenges: string;
  specificGoals?: string;
  budget?: string;
  additionalNotes?: string;
  requestId: number;
}

export async function sendConsultationRequestNotification(requestData: ConsultationRequestData): Promise<boolean> {
  const emailSubject = `HR Consultation Request - SOURCE: SITE - ${requestData.companyName}`;
  
  // Helper functions to format data
  const formatConsultationType = (type: string) => {
    const typeMap: { [key: string]: string } = {
      'hr_strategy': 'HR Strategy & Planning',
      'recruitment': 'Recruitment & Talent Acquisition',
      'payroll': 'Payroll & Benefits Management',
      'training': 'Training & Development',
      'compliance': 'HR Compliance & Legal',
      'general': 'General HR Consultation'
    };
    return typeMap[type] || type;
  };

  const formatUrgency = (urgency: string) => {
    const urgencyMap: { [key: string]: string } = {
      'urgent': 'Urgent (Within 2 days)',
      'week': 'This week',
      'month': 'This month',
      'flexible': 'Flexible timing'
    };
    return urgencyMap[urgency] || urgency;
  };

  const formatTime = (time: string) => {
    const timeMap: { [key: string]: string } = {
      'morning': 'Morning (9 AM - 12 PM)',
      'afternoon': 'Afternoon (12 PM - 5 PM)',
      'evening': 'Evening (5 PM - 8 PM)',
      'any': 'Any time'
    };
    return timeMap[time] || time;
  };

  const formatDay = (day: string) => {
    const dayMap: { [key: string]: string } = {
      'weekday': 'Weekdays only',
      'weekend': 'Weekends only',
      'any': 'Any day'
    };
    return dayMap[day] || day;
  };

  const formatMeetingFormat = (format: string) => {
    const formatMap: { [key: string]: string } = {
      'video_call': 'Video Call (Zoom/Teams)',
      'phone_call': 'Phone Call',
      'in_person': 'In-Person (Tripoli Office)'
    };
    return formatMap[format] || format;
  };

  const emailBody = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2 style="color: #2c5282; border-bottom: 2px solid #f56500; padding-bottom: 10px;">
        New HR Consultation Request #${requestData.requestId}
      </h2>
      
      <h3 style="color: #2c5282; margin-top: 30px;">Contact Information</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold; width: 30%;">Company Name:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${requestData.companyName}</td>
        </tr>
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold;">Contact Person:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${requestData.contactPerson}</td>
        </tr>
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold;">Job Title:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${requestData.jobTitle}</td>
        </tr>
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold;">Email:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${requestData.contactEmail}</td>
        </tr>
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold;">Phone:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${requestData.contactPhone}</td>
        </tr>
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold;">Industry:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${requestData.industry}</td>
        </tr>
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold;">Company Size:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${requestData.companySize}</td>
        </tr>
      </table>

      <h3 style="color: #2c5282; margin-top: 30px;">Consultation Details</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold; width: 30%;">Consultation Type:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${formatConsultationType(requestData.consultationType)}</td>
        </tr>
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold;">Urgency:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${formatUrgency(requestData.urgency)}</td>
        </tr>
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold;">Meeting Format:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${formatMeetingFormat(requestData.meetingFormat)}</td>
        </tr>
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold;">Preferred Time:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${formatTime(requestData.preferredTime)}</td>
        </tr>
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold;">Preferred Days:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${formatDay(requestData.preferredDay)}</td>
        </tr>
        ${requestData.budget ? `
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold;">Budget Range:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${requestData.budget}</td>
        </tr>
        ` : ''}
      </table>

      <h4 style="color: #2c5282; margin-top: 20px;">Current HR Challenges:</h4>
      <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #f56500; margin-bottom: 20px;">
        ${requestData.currentChallenges.replace(/\n/g, '<br>')}
      </div>

      ${requestData.specificGoals ? `
      <h4 style="color: #2c5282; margin-top: 20px;">Specific Goals & Objectives:</h4>
      <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #f56500; margin-bottom: 20px;">
        ${requestData.specificGoals.replace(/\n/g, '<br>')}
      </div>
      ` : ''}

      ${requestData.additionalNotes ? `
      <h4 style="color: #2c5282; margin-top: 20px;">Additional Notes:</h4>
      <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #f56500; margin-bottom: 20px;">
        ${requestData.additionalNotes.replace(/\n/g, '<br>')}
      </div>
      ` : ''}

      <div style="margin-top: 30px; padding: 20px; background-color: #e8f4fd; border-radius: 8px;">
        <p style="margin: 0; color: #2c5282; font-weight: bold;">
          📅 Please respond to this consultation request within 24 hours
        </p>
        <p style="margin: 5px 0 0 0; color: #666;">
          Contact: ${requestData.contactEmail} | ${requestData.contactPhone}
        </p>
        <p style="margin: 5px 0 0 0; color: #666;">
          <strong>Urgency:</strong> ${formatUrgency(requestData.urgency)}
        </p>
      </div>
    </div>
  `;

  try {
    const success = await sendEmail(
      process.env.SENDGRID_API_KEY!,
      {
        to: 'info@dawaam.com',
        from: 'noreply@dawaam.com',
        subject: emailSubject,
        html: emailBody
      }
    );

    if (success) {
      console.log(`Consultation request notification sent successfully for request #${requestData.requestId}`);
      return true;
    } else {
      console.error(`Failed to send consultation request notification for request #${requestData.requestId}`);
      return false;
    }
  } catch (error) {
    console.error('Error sending consultation request notification:', error);
    return false;
  }
}