import { sendEmail } from './sendgrid';

interface ManpowerRequestData {
  companyName: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  industry: string;
  companySize: string;
  staffingType: string;
  positionsNeeded: string;
  contractDuration: string;
  startDate: string;
  workLocation: string;
  jobTitles: string;
  skillsRequired: string;
  experienceLevel: string;
  educationRequirements?: string;
  needsVisa: boolean;
  needsAccommodation: boolean;
  needsTransportation: boolean;
  needsCulturalTraining: boolean;
  needsOnboarding: boolean;
  localCompliance: boolean;
  payrollManagement: boolean;
  benefitsAdministration: boolean;
  performanceManagement: boolean;
  budgetRange?: string;
  currency: string;
  paymentTerms: string;
  currentChallenges?: string;
  specificRequirements?: string;
  additionalNotes?: string;
  requestId: number;
}

export async function sendManpowerRequestNotification(requestData: ManpowerRequestData): Promise<boolean> {
  const emailSubject = `Manpower Outsourcing Request - SOURCE: SITE - ${requestData.companyName}`;
  
  // Helper functions to format services
  const formatMobilizationServices = () => {
    const services = [];
    if (requestData.needsVisa) services.push('Visa Processing');
    if (requestData.needsAccommodation) services.push('Accommodation Arrangements');
    if (requestData.needsTransportation) services.push('Transportation to Libya');
    if (requestData.needsCulturalTraining) services.push('Cultural Training');
    if (requestData.needsOnboarding) services.push('Onboarding Support');
    return services.length > 0 ? services.join(', ') : 'No mobilization services requested';
  };

  const formatAdministrativeServices = () => {
    const services = [];
    if (requestData.localCompliance) services.push('Local Compliance Management');
    if (requestData.payrollManagement) services.push('Payroll Management');
    if (requestData.benefitsAdministration) services.push('Benefits Administration');
    if (requestData.performanceManagement) services.push('Performance Management');
    return services.length > 0 ? services.join(', ') : 'No administrative services requested';
  };

  const formatStaffingType = (type: string) => {
    const typeMap: { [key: string]: string } = {
      'contract': 'Contract Staffing',
      'project_based': 'Project-Based',
      'seasonal': 'Seasonal',
      'peak_workload': 'Peak Workload'
    };
    return typeMap[type] || type;
  };

  const formatExperienceLevel = (level: string) => {
    const levelMap: { [key: string]: string } = {
      'entry': 'Entry Level (0-2 years)',
      'mid': 'Mid Level (3-7 years)',
      'senior': 'Senior Level (8+ years)',
      'executive': 'Executive Level'
    };
    return levelMap[level] || level;
  };

  const formatPaymentTerms = (terms: string) => {
    const termsMap: { [key: string]: string } = {
      'monthly': 'Monthly',
      'milestone': 'Milestone-based',
      'completion': 'Upon Completion'
    };
    return termsMap[terms] || terms;
  };

  const emailBody = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2 style="color: #2c5282; border-bottom: 2px solid #f56500; padding-bottom: 10px;">
        New Manpower Outsourcing Request #${requestData.requestId}
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
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold;">Industry:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${requestData.industry}</td>
        </tr>
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold;">Company Size:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${requestData.companySize}</td>
        </tr>
      </table>

      <h3 style="color: #2c5282; margin-top: 30px;">Staffing Requirements</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold; width: 30%;">Staffing Type:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${formatStaffingType(requestData.staffingType)}</td>
        </tr>
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold;">Positions Needed:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${requestData.positionsNeeded}</td>
        </tr>
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold;">Contract Duration:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${requestData.contractDuration}</td>
        </tr>
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold;">Start Date:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${requestData.startDate}</td>
        </tr>
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold;">Work Location:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${requestData.workLocation}</td>
        </tr>
      </table>

      <h3 style="color: #2c5282; margin-top: 30px;">Role Details</h3>
      <h4 style="color: #2c5282; margin-top: 20px;">Job Titles/Roles:</h4>
      <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #f56500; margin-bottom: 20px;">
        ${requestData.jobTitles.replace(/\n/g, '<br>')}
      </div>

      <h4 style="color: #2c5282; margin-top: 20px;">Skills & Qualifications Required:</h4>
      <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #f56500; margin-bottom: 20px;">
        ${requestData.skillsRequired.replace(/\n/g, '<br>')}
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold; width: 30%;">Experience Level:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${formatExperienceLevel(requestData.experienceLevel)}</td>
        </tr>
        ${requestData.educationRequirements ? `
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold;">Education Requirements:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${requestData.educationRequirements}</td>
        </tr>
        ` : ''}
      </table>

      <h3 style="color: #2c5282; margin-top: 30px;">Additional Services</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold; width: 30%;">Mobilization Services:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${formatMobilizationServices()}</td>
        </tr>
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold;">Administrative Services:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${formatAdministrativeServices()}</td>
        </tr>
      </table>

      <h3 style="color: #2c5282; margin-top: 30px;">Budget & Terms</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        ${requestData.budgetRange ? `
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold; width: 30%;">Budget Range:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${requestData.budgetRange} ${requestData.currency}</td>
        </tr>
        ` : ''}
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold;">Payment Terms:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${formatPaymentTerms(requestData.paymentTerms)}</td>
        </tr>
      </table>

      ${requestData.currentChallenges ? `
      <h4 style="color: #2c5282; margin-top: 20px;">Current Staffing Challenges:</h4>
      <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #f56500; margin-bottom: 20px;">
        ${requestData.currentChallenges.replace(/\n/g, '<br>')}
      </div>
      ` : ''}

      ${requestData.specificRequirements ? `
      <h4 style="color: #2c5282; margin-top: 20px;">Specific Requirements:</h4>
      <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #f56500; margin-bottom: 20px;">
        ${requestData.specificRequirements.replace(/\n/g, '<br>')}
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
          👥 Please respond to this manpower outsourcing request within 24 hours
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
        to: 'info@dawaam.com',
        from: 'noreply@dawaam.com',
        subject: emailSubject,
        html: emailBody
      }
    );

    if (success) {
      console.log(`Manpower request notification sent successfully for request #${requestData.requestId}`);
      return true;
    } else {
      console.error(`Failed to send manpower request notification for request #${requestData.requestId}`);
      return false;
    }
  } catch (error) {
    console.error('Error sending manpower request notification:', error);
    return false;
  }
}