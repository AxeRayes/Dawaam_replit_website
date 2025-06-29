import { sendEmail } from './sendgrid';

interface HRConsultingRequestData {
  companyName: string;
  contactPerson: string;
  jobTitle: string;
  contactEmail: string;
  contactPhone: string;
  industry: string;
  companySize: string;
  businessModel: string;
  currentHRStructure: string;
  workforcePlanning: boolean;
  talentStrategy: boolean;
  compensationAnalysis: boolean;
  performanceManagement: boolean;
  organizationalDevelopment: boolean;
  policyDevelopment: boolean;
  complianceAssessment: boolean;
  changeManagement: boolean;
  leadershipDevelopment: boolean;
  cultureTransformation: boolean;
  projectScope: string;
  projectTimeline: string;
  projectBudget?: string;
  budgetCurrency: string;
  currentChallenges: string;
  specificObjectives: string;
  successMetrics?: string;
  stakeholders?: string;
  previousConsulting: boolean;
  urgency: string;
  additionalNotes?: string;
  requestId: number;
}

export async function sendHRConsultingRequestNotification(requestData: HRConsultingRequestData): Promise<boolean> {
  const emailSubject = `HR Consulting Request - SOURCE: SITE - ${requestData.companyName}`;
  
  // Helper functions to format services and data
  const formatStrategicServices = () => {
    const services = [];
    if (requestData.workforcePlanning) services.push('Workforce Planning & Analytics');
    if (requestData.talentStrategy) services.push('Talent Strategy & Acquisition');
    if (requestData.compensationAnalysis) services.push('Compensation & Benefits Analysis');
    if (requestData.performanceManagement) services.push('Performance Management Systems');
    return services.length > 0 ? services.join(', ') : 'None selected';
  };

  const formatOrganizationalServices = () => {
    const services = [];
    if (requestData.organizationalDevelopment) services.push('Organizational Design & Development');
    if (requestData.changeManagement) services.push('Change Management');
    if (requestData.leadershipDevelopment) services.push('Leadership Development');
    if (requestData.cultureTransformation) services.push('Culture Transformation');
    return services.length > 0 ? services.join(', ') : 'None selected';
  };

  const formatComplianceServices = () => {
    const services = [];
    if (requestData.policyDevelopment) services.push('HR Policy Development');
    if (requestData.complianceAssessment) services.push('Compliance Assessment');
    return services.length > 0 ? services.join(', ') : 'None selected';
  };

  const formatProjectScope = (scope: string) => {
    const scopeMap: { [key: string]: string } = {
      'assessment': 'Assessment & Recommendations',
      'strategy': 'Strategy Development',
      'implementation': 'Full Implementation',
      'ongoing': 'Ongoing Advisory'
    };
    return scopeMap[scope] || scope;
  };

  const formatProjectTimeline = (timeline: string) => {
    const timelineMap: { [key: string]: string } = {
      '1_month': '1 Month',
      '3_months': '3 Months',
      '6_months': '6 Months',
      '12_months': '12 Months',
      'ongoing': 'Ongoing Relationship'
    };
    return timelineMap[timeline] || timeline;
  };

  const formatHRStructure = (structure: string) => {
    const structureMap: { [key: string]: string } = {
      'no_hr': 'No dedicated HR',
      'hr_generalist': 'HR Generalist',
      'hr_team': 'Small HR Team',
      'hr_department': 'Full HR Department',
      'outsourced': 'Outsourced HR'
    };
    return structureMap[structure] || structure;
  };

  const formatUrgency = (urgency: string) => {
    const urgencyMap: { [key: string]: string } = {
      'immediate': 'Immediate (Start ASAP)',
      'month': 'Within a month',
      'quarter': 'Within a quarter',
      'flexible': 'Flexible timing'
    };
    return urgencyMap[urgency] || urgency;
  };

  const emailBody = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2 style="color: #2c5282; border-bottom: 2px solid #f56500; padding-bottom: 10px;">
        New HR Consulting Request #${requestData.requestId}
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
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold;">Business Model:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${requestData.businessModel}</td>
        </tr>
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold;">Current HR Structure:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${formatHRStructure(requestData.currentHRStructure)}</td>
        </tr>
      </table>

      <h3 style="color: #2c5282; margin-top: 30px;">Services Requested</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold; width: 30%;">Strategic HR Services:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${formatStrategicServices()}</td>
        </tr>
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold;">Organizational Development:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${formatOrganizationalServices()}</td>
        </tr>
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold;">Compliance & Policy:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${formatComplianceServices()}</td>
        </tr>
      </table>

      <h3 style="color: #2c5282; margin-top: 30px;">Project Details</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold; width: 30%;">Project Scope:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${formatProjectScope(requestData.projectScope)}</td>
        </tr>
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold;">Project Timeline:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${formatProjectTimeline(requestData.projectTimeline)}</td>
        </tr>
        ${requestData.projectBudget ? `
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold;">Project Budget:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${requestData.projectBudget} ${requestData.budgetCurrency}</td>
        </tr>
        ` : ''}
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold;">Urgency:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${formatUrgency(requestData.urgency)}</td>
        </tr>
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold;">Previous Consulting:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${requestData.previousConsulting ? 'Yes' : 'No'}</td>
        </tr>
      </table>

      <h4 style="color: #2c5282; margin-top: 20px;">Current HR Challenges:</h4>
      <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #f56500; margin-bottom: 20px;">
        ${requestData.currentChallenges.replace(/\n/g, '<br>')}
      </div>

      <h4 style="color: #2c5282; margin-top: 20px;">Specific Objectives:</h4>
      <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #f56500; margin-bottom: 20px;">
        ${requestData.specificObjectives.replace(/\n/g, '<br>')}
      </div>

      ${requestData.successMetrics ? `
      <h4 style="color: #2c5282; margin-top: 20px;">Success Metrics:</h4>
      <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #f56500; margin-bottom: 20px;">
        ${requestData.successMetrics.replace(/\n/g, '<br>')}
      </div>
      ` : ''}

      ${requestData.stakeholders ? `
      <h4 style="color: #2c5282; margin-top: 20px;">Key Stakeholders:</h4>
      <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #f56500; margin-bottom: 20px;">
        ${requestData.stakeholders.replace(/\n/g, '<br>')}
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
          🎯 Please respond to this HR consulting request within 24 hours
        </p>
        <p style="margin: 5px 0 0 0; color: #666;">
          Contact: ${requestData.contactEmail} | ${requestData.contactPhone}
        </p>
        <p style="margin: 5px 0 0 0; color: #666;">
          <strong>Urgency:</strong> ${formatUrgency(requestData.urgency)}
        </p>
        <p style="margin: 5px 0 0 0; color: #666;">
          <strong>Timeline:</strong> ${formatProjectTimeline(requestData.projectTimeline)}
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
      console.log(`HR consulting request notification sent successfully for request #${requestData.requestId}`);
      return true;
    } else {
      console.error(`Failed to send HR consulting request notification for request #${requestData.requestId}`);
      return false;
    }
  } catch (error) {
    console.error('Error sending HR consulting request notification:', error);
    return false;
  }
}