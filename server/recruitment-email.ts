import { sendEmail } from './sendgrid';

interface RecruitmentRequestData {
  companyName: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  jobTitle: string;
  jobDescription: string;
  salaryRange?: string;
  benefits?: string;
  jobLocation: string;
  workingHours: string;
  reportingTo: string;
  skills?: string;
  education?: string;
  minExperience?: string;
  englishLevel: string;
  arabicLevel: string;
  otherLanguage?: string;
  otherLanguageLevel?: string;
  companyDisclosure: string;
  additionalNotes?: string;
  requestId: number;
}

export async function sendRecruitmentRequestNotification(requestData: RecruitmentRequestData): Promise<boolean> {
  const emailSubject = `RECRUITMENT REQUEST - SOURCE: SITE - ${requestData.companyName}`;
  
  const emailBody = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2 style="color: #2c5282; border-bottom: 2px solid #f56500; padding-bottom: 10px;">
        New Recruitment Request #${requestData.requestId}
      </h2>
      
      <h3 style="color: #2c5282; margin-top: 30px;">Company Information</h3>
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
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold;">Email:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${requestData.contactEmail}</td>
        </tr>
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold;">Phone:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${requestData.contactPhone}</td>
        </tr>
      </table>

      <h3 style="color: #2c5282; margin-top: 30px;">Job Vacancy Information</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold; width: 30%;">Job Title:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${requestData.jobTitle}</td>
        </tr>
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold;">Location:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${requestData.jobLocation}</td>
        </tr>
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold;">Working Hours:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${requestData.workingHours}</td>
        </tr>
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold;">Reporting To:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${requestData.reportingTo}</td>
        </tr>
        ${requestData.salaryRange ? `
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold;">Salary Range:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${requestData.salaryRange}</td>
        </tr>
        ` : ''}
        ${requestData.benefits ? `
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold;">Benefits:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${requestData.benefits}</td>
        </tr>
        ` : ''}
      </table>

      <h4 style="color: #2c5282; margin-top: 20px;">Job Description & Responsibilities:</h4>
      <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #f56500; margin-bottom: 20px;">
        ${requestData.jobDescription.replace(/\n/g, '<br>')}
      </div>

      <h3 style="color: #2c5282; margin-top: 30px;">Requirements</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        ${requestData.skills ? `
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold; width: 30%;">Skills:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${requestData.skills}</td>
        </tr>
        ` : ''}
        ${requestData.education ? `
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold;">Education:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${requestData.education}</td>
        </tr>
        ` : ''}
        ${requestData.minExperience ? `
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold;">Min Experience:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${requestData.minExperience}</td>
        </tr>
        ` : ''}
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold;">English:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${requestData.englishLevel.charAt(0).toUpperCase() + requestData.englishLevel.slice(1)}</td>
        </tr>
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold;">Arabic:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${requestData.arabicLevel.charAt(0).toUpperCase() + requestData.arabicLevel.slice(1)}</td>
        </tr>
        ${requestData.otherLanguage ? `
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold;">${requestData.otherLanguage}:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${requestData.otherLanguageLevel ? requestData.otherLanguageLevel.charAt(0).toUpperCase() + requestData.otherLanguageLevel.slice(1) : 'Not specified'}</td>
        </tr>
        ` : ''}
      </table>

      <h3 style="color: #2c5282; margin-top: 30px;">Additional Information</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold; width: 30%;">Company Disclosure:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${requestData.companyDisclosure === 'yes' ? 'Yes, disclose company name' : 'No, keep company name confidential'}</td>
        </tr>
      </table>

      ${requestData.additionalNotes ? `
      <h4 style="color: #2c5282; margin-top: 20px;">Additional Notes:</h4>
      <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #f56500; margin-bottom: 20px;">
        ${requestData.additionalNotes.replace(/\n/g, '<br>')}
      </div>
      ` : ''}

      <div style="margin-top: 30px; padding: 20px; background-color: #e8f4fd; border-radius: 8px;">
        <p style="margin: 0; color: #2c5282; font-weight: bold;">
          📧 Please respond to this recruitment request within 24 hours
        </p>
        <p style="margin: 5px 0 0 0; color: #666;">
          Contact: ${requestData.contactEmail} | ${requestData.contactPhone}
        </p>
      </div>
    </div>
  `;

  try {
    const success = await sendEmail(
      process.env.SENDGRID_API_KEY!,
      {
        to: 'recruitment@dawaam.com',
        from: 'noreply@dawaam.com',
        subject: emailSubject,
        html: emailBody
      }
    );

    if (success) {
      console.log(`Recruitment request notification sent successfully for request #${requestData.requestId}`);
      return true;
    } else {
      console.error(`Failed to send recruitment request notification for request #${requestData.requestId}`);
      return false;
    }
  } catch (error) {
    console.error('Error sending recruitment request notification:', error);
    return false;
  }
}