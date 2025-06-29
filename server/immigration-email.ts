import { sendEmail } from './sendgrid';

interface ImmigrationRequestData {
  applicantName: string;
  nationality: string;
  passportNumber: string;
  dateOfBirth: string;
  contactEmail: string;
  contactPhone: string;
  companyName: string;
  companyContact: string;
  companyEmail: string;
  companyPhone: string;
  visaType: string;
  purposeOfVisit: string;
  intendedStayDuration: string;
  proposedPosition?: string;
  expectedStartDate: string;
  visaProcessing: boolean;
  documentTranslation: boolean;
  documentAuthentication: boolean;
  workPermitProcessing: boolean;
  accommodationArrangements: boolean;
  transportationArrangements: boolean;
  culturalTraining: boolean;
  onboardingSupport: boolean;
  hasValidPassport: boolean;
  hasEducationalCertificates: boolean;
  hasExperienceCertificates: boolean;
  hasMedicalCertificates: boolean;
  hasPoliceClearance: boolean;
  educationLevel: string;
  workExperience: string;
  previousLibyaVisit: boolean;
  previousVisaRejection: boolean;
  familyAccompanying: boolean;
  familyDetails?: string;
  specialRequirements?: string;
  additionalNotes?: string;
  requestId: number;
}

export async function sendImmigrationRequestNotification(requestData: ImmigrationRequestData): Promise<boolean> {
  const emailSubject = `Immigration & Visa Services Request - SOURCE: SITE - ${requestData.applicantName}`;
  
  // Helper functions to format services and data
  const formatDocumentationServices = () => {
    const services = [];
    if (requestData.visaProcessing) services.push('Visa Processing');
    if (requestData.documentTranslation) services.push('Document Translation');
    if (requestData.documentAuthentication) services.push('Document Authentication');
    if (requestData.workPermitProcessing) services.push('Work Permit Processing');
    return services.length > 0 ? services.join(', ') : 'No documentation services requested';
  };

  const formatSupportServices = () => {
    const services = [];
    if (requestData.accommodationArrangements) services.push('Accommodation Arrangements');
    if (requestData.transportationArrangements) services.push('Transportation Arrangements');
    if (requestData.culturalTraining) services.push('Cultural Training');
    if (requestData.onboardingSupport) services.push('Onboarding Support');
    return services.length > 0 ? services.join(', ') : 'No support services requested';
  };

  const formatDocumentationStatus = () => {
    const documents = [];
    if (requestData.hasValidPassport) documents.push('Valid Passport');
    if (requestData.hasEducationalCertificates) documents.push('Educational Certificates');
    if (requestData.hasExperienceCertificates) documents.push('Experience Certificates');
    if (requestData.hasMedicalCertificates) documents.push('Medical Certificates');
    if (requestData.hasPoliceClearance) documents.push('Police Clearance Certificate');
    return documents.length > 0 ? documents.join(', ') : 'No documents confirmed';
  };

  const formatVisaType = (type: string) => {
    const typeMap: { [key: string]: string } = {
      'work_permit': 'Work Permit',
      'business_visa': 'Business Visa',
      'entry_visa': 'Entry Visa',
      'residence_permit': 'Residence Permit',
      'family_visa': 'Family Visa'
    };
    return typeMap[type] || type;
  };

  const formatEducationLevel = (level: string) => {
    const levelMap: { [key: string]: string } = {
      'high_school': 'High School',
      'diploma': 'Diploma',
      'bachelor': "Bachelor's Degree",
      'master': "Master's Degree",
      'phd': 'PhD',
      'professional': 'Professional Certificate'
    };
    return levelMap[level] || level;
  };

  const emailBody = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2 style="color: #2c5282; border-bottom: 2px solid #f56500; padding-bottom: 10px;">
        New Immigration & Visa Services Request #${requestData.requestId}
      </h2>
      
      <h3 style="color: #2c5282; margin-top: 30px;">Applicant Information</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold; width: 30%;">Full Name:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${requestData.applicantName}</td>
        </tr>
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold;">Nationality:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${requestData.nationality}</td>
        </tr>
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold;">Passport Number:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${requestData.passportNumber}</td>
        </tr>
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold;">Date of Birth:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${requestData.dateOfBirth}</td>
        </tr>
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold;">Contact Email:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${requestData.contactEmail}</td>
        </tr>
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold;">Contact Phone:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${requestData.contactPhone}</td>
        </tr>
      </table>

      <h3 style="color: #2c5282; margin-top: 30px;">Company/Sponsor Information</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold; width: 30%;">Company Name:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${requestData.companyName}</td>
        </tr>
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold;">Company Contact:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${requestData.companyContact}</td>
        </tr>
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold;">Company Email:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${requestData.companyEmail}</td>
        </tr>
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold;">Company Phone:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${requestData.companyPhone}</td>
        </tr>
      </table>

      <h3 style="color: #2c5282; margin-top: 30px;">Visa Requirements</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold; width: 30%;">Visa Type:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${formatVisaType(requestData.visaType)}</td>
        </tr>
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold;">Intended Stay Duration:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${requestData.intendedStayDuration}</td>
        </tr>
        ${requestData.proposedPosition ? `
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold;">Proposed Position:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${requestData.proposedPosition}</td>
        </tr>
        ` : ''}
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold;">Expected Start Date:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${requestData.expectedStartDate}</td>
        </tr>
      </table>

      <h4 style="color: #2c5282; margin-top: 20px;">Purpose of Visit:</h4>
      <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #f56500; margin-bottom: 20px;">
        ${requestData.purposeOfVisit.replace(/\n/g, '<br>')}
      </div>

      <h3 style="color: #2c5282; margin-top: 30px;">Services Required</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold; width: 30%;">Documentation Services:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${formatDocumentationServices()}</td>
        </tr>
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold;">Support Services:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${formatSupportServices()}</td>
        </tr>
      </table>

      <h3 style="color: #2c5282; margin-top: 30px;">Documentation Status</h3>
      <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #f56500; margin-bottom: 20px;">
        <strong>Available Documents:</strong> ${formatDocumentationStatus()}
      </div>

      <h3 style="color: #2c5282; margin-top: 30px;">Background Information</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold; width: 30%;">Education Level:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${formatEducationLevel(requestData.educationLevel)}</td>
        </tr>
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold;">Work Experience:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${requestData.workExperience}</td>
        </tr>
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold;">Previously Visited Libya:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${requestData.previousLibyaVisit ? 'Yes' : 'No'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold;">Previous Visa Rejection:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${requestData.previousVisaRejection ? 'Yes' : 'No'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold;">Family Accompanying:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${requestData.familyAccompanying ? 'Yes' : 'No'}</td>
        </tr>
      </table>

      ${requestData.familyAccompanying && requestData.familyDetails ? `
      <h4 style="color: #2c5282; margin-top: 20px;">Family Details:</h4>
      <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #f56500; margin-bottom: 20px;">
        ${requestData.familyDetails.replace(/\n/g, '<br>')}
      </div>
      ` : ''}

      ${requestData.specialRequirements ? `
      <h4 style="color: #2c5282; margin-top: 20px;">Special Requirements:</h4>
      <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #f56500; margin-bottom: 20px;">
        ${requestData.specialRequirements.replace(/\n/g, '<br>')}
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
          🛂 Please respond to this immigration & visa request within 24 hours
        </p>
        <p style="margin: 5px 0 0 0; color: #666;">
          Applicant Contact: ${requestData.contactEmail} | ${requestData.contactPhone}
        </p>
        <p style="margin: 5px 0 0 0; color: #666;">
          Company Contact: ${requestData.companyEmail} | ${requestData.companyPhone}
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
      console.log(`Immigration request notification sent successfully for request #${requestData.requestId}`);
      return true;
    } else {
      console.error(`Failed to send immigration request notification for request #${requestData.requestId}`);
      return false;
    }
  } catch (error) {
    console.error('Error sending immigration request notification:', error);
    return false;
  }
}