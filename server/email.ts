import { MailService } from '@sendgrid/mail';

const mailService = new MailService();

// Check if SendGrid API key is available
const sendGridApiKey = process.env.SENDGRID_API_KEY || "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";

if (sendGridApiKey) {
  mailService.setApiKey(sendGridApiKey);
}

interface ResumeNotificationData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  location?: string | null;
  jobTitle?: string | null;
  experience?: string | null;
  skills?: string | null;
  fileName: string;
  fileSize: number;
  fileType: string;
  resumeId: number;
}

export async function sendResumeNotification(resumeData: ResumeNotificationData): Promise<boolean> {
  if (!sendGridApiKey) {
    console.log('SendGrid API key not configured, skipping email notification');
    return false;
  }

  try {
    const emailContent = `
New Resume Submission from Dawaam Website

Candidate Information:
• Name: ${resumeData.firstName} ${resumeData.lastName}
• Email: ${resumeData.email}
• Phone: ${resumeData.phone || 'Not provided'}
• Location: ${resumeData.location || 'Not provided'}
• Job Title: ${resumeData.jobTitle || 'Not specified'}
• Experience Level: ${resumeData.experience || 'Not specified'}
• Skills: ${resumeData.skills || 'Not provided'}

File Details:
• File Name: ${resumeData.fileName}
• File Size: ${(resumeData.fileSize / 1024 / 1024).toFixed(2)} MB
• File Type: ${resumeData.fileType}
• Resume ID: ${resumeData.resumeId}

Please review this resume in your recruitment system.

---
This email was automatically generated from the Dawaam website resume upload system.
    `.trim();

    const emailMessage = {
      to: 'recruitment@dawaam.com',
      from: 'test@example.com', // Using a simple sender that doesn't require domain verification
      subject: 'New Resume from Dawaam Site',
      text: emailContent,
      html: emailContent.replace(/\n/g, '<br>').replace(/•/g, '&bull;'),
    };

    console.log('Attempting to send email with SendGrid:', emailMessage);
    const result = await mailService.send(emailMessage);
    console.log('SendGrid response:', result);

    console.log(`Resume notification sent for ${resumeData.firstName} ${resumeData.lastName} (ID: ${resumeData.resumeId})`);
    return true;
  } catch (error) {
    console.error('Failed to send resume notification email:', error);
    return false;
  }
}