import { sendEmail } from './sendgrid';

interface PayrollRequestData {
  companyName: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  companyAddress: string;
  businessType: string;
  employeeCount: string;
  currentPayrollProvider?: string;
  payrollFrequency: string;
  payrollProcessing: boolean;
  taxFiling: boolean;
  timeTracking: boolean;
  benefits: boolean;
  hrSupport: boolean;
  reporting: boolean;
  averageMonthlySalaries?: string;
  salaryCurrency: string;
  hasVariablePay: boolean;
  hasCommissions: boolean;
  hasBonuses: boolean;
  hasOvertimePay: boolean;
  needsEndOfService: boolean;
  needsVacationTracking: boolean;
  needsSickLeave: boolean;
  needsInsurance: boolean;
  needsRetirement: boolean;
  implementationTimeline: string;
  monthlyBudget?: string;
  budgetCurrency: string;
  currentChallenges?: string;
  specificRequirements?: string;
  additionalNotes?: string;
  requestId: number;
}

export async function sendPayrollRequestNotification(requestData: PayrollRequestData): Promise<boolean> {
  const emailSubject = `Payroll Service Request - SOURCE: SITE - ${requestData.companyName}`;
  
  // Helper function to format boolean services
  const formatServices = () => {
    const services = [];
    if (requestData.payrollProcessing) services.push('Payroll Processing');
    if (requestData.taxFiling) services.push('Tax Filing & Compliance');
    if (requestData.timeTracking) services.push('Time & Attendance Tracking');
    if (requestData.benefits) services.push('Benefits Administration');
    if (requestData.hrSupport) services.push('HR Support');
    if (requestData.reporting) services.push('Payroll Reporting & Analytics');
    return services.length > 0 ? services.join(', ') : 'No specific services selected';
  };

  const formatPayTypes = () => {
    const payTypes = [];
    if (requestData.hasVariablePay) payTypes.push('Variable Pay');
    if (requestData.hasCommissions) payTypes.push('Commissions');
    if (requestData.hasBonuses) payTypes.push('Bonuses');
    if (requestData.hasOvertimePay) payTypes.push('Overtime Pay');
    return payTypes.length > 0 ? payTypes.join(', ') : 'Standard pay only';
  };

  const formatComplianceNeeds = () => {
    const compliance = [];
    if (requestData.needsEndOfService) compliance.push('End of Service Calculations');
    if (requestData.needsVacationTracking) compliance.push('Vacation Tracking');
    if (requestData.needsSickLeave) compliance.push('Sick Leave Management');
    if (requestData.needsInsurance) compliance.push('Insurance Management');
    if (requestData.needsRetirement) compliance.push('Retirement Planning');
    return compliance.length > 0 ? compliance.join(', ') : 'No additional compliance services';
  };

  const formatTimeline = (timeline: string) => {
    const timelineMap: { [key: string]: string } = {
      'immediate': 'Immediate (ASAP)',
      '1_month': 'Within 1 month',
      '2_3_months': '2-3 months',
      'flexible': 'Flexible'
    };
    return timelineMap[timeline] || timeline;
  };

  const formatBusinessType = (type: string) => {
    const typeMap: { [key: string]: string } = {
      'corporation': 'Corporation',
      'llc': 'LLC',
      'partnership': 'Partnership',
      'sole_proprietorship': 'Sole Proprietorship',
      'other': 'Other'
    };
    return typeMap[type] || type;
  };

  const formatFrequency = (freq: string) => {
    const freqMap: { [key: string]: string } = {
      'weekly': 'Weekly',
      'bi_weekly': 'Bi-weekly',
      'semi_monthly': 'Semi-monthly',
      'monthly': 'Monthly'
    };
    return freqMap[freq] || freq;
  };

  const emailBody = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2 style="color: #2c5282; border-bottom: 2px solid #f56500; padding-bottom: 10px;">
        New Payroll Services Request #${requestData.requestId}
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
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold;">Address:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${requestData.companyAddress}</td>
        </tr>
      </table>

      <h3 style="color: #2c5282; margin-top: 30px;">Business Information</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold; width: 30%;">Business Type:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${formatBusinessType(requestData.businessType)}</td>
        </tr>
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold;">Number of Employees:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${requestData.employeeCount}</td>
        </tr>
        ${requestData.currentPayrollProvider ? `
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold;">Current Provider:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${requestData.currentPayrollProvider}</td>
        </tr>
        ` : ''}
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold;">Payroll Frequency:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${formatFrequency(requestData.payrollFrequency)}</td>
        </tr>
      </table>

      <h3 style="color: #2c5282; margin-top: 30px;">Services Required</h3>
      <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #f56500; margin-bottom: 20px;">
        ${formatServices()}
      </div>

      <h3 style="color: #2c5282; margin-top: 30px;">Payroll Details</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        ${requestData.averageMonthlySalaries ? `
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold; width: 30%;">Monthly Payroll:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${requestData.averageMonthlySalaries} ${requestData.salaryCurrency}</td>
        </tr>
        ` : ''}
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold;">Pay Types:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${formatPayTypes()}</td>
        </tr>
      </table>

      <h3 style="color: #2c5282; margin-top: 30px;">Compliance & Benefits</h3>
      <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #f56500; margin-bottom: 20px;">
        ${formatComplianceNeeds()}
      </div>

      <h3 style="color: #2c5282; margin-top: 30px;">Timeline & Budget</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold; width: 30%;">Timeline:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${formatTimeline(requestData.implementationTimeline)}</td>
        </tr>
        ${requestData.monthlyBudget ? `
        <tr>
          <td style="padding: 8px; background-color: #f8f9fa; font-weight: bold;">Monthly Budget:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${requestData.monthlyBudget} ${requestData.budgetCurrency}</td>
        </tr>
        ` : ''}
      </table>

      ${requestData.currentChallenges ? `
      <h4 style="color: #2c5282; margin-top: 20px;">Current Challenges:</h4>
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
          💼 Please respond to this payroll services request within 24 hours
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
      console.log(`Payroll request notification sent successfully for request #${requestData.requestId}`);
      return true;
    } else {
      console.error(`Failed to send payroll request notification for request #${requestData.requestId}`);
      return false;
    }
  } catch (error) {
    console.error('Error sending payroll request notification:', error);
    return false;
  }
}