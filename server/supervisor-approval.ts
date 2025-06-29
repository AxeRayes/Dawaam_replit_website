import { Request, Response, Router } from 'express';
import { storage } from './storage';
import { sendTimesheetNotification } from './timesheet-email';
import crypto from 'crypto';

const router = Router();

// Generate unique approval token
export function generateApprovalToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

// Supervisor approval page route
router.get('/approval/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const timesheet = await storage.getTimesheetByToken(token);
    
    if (!timesheet) {
      return res.status(404).json({ message: 'Invalid or expired approval link' });
    }

    if (timesheet.status !== 'submitted') {
      return res.status(400).json({ 
        message: 'This timesheet has already been processed',
        status: timesheet.status 
      });
    }

    res.json({ timesheet });
  } catch (error) {
    console.error('Approval link error:', error);
    res.status(500).json({ message: 'Failed to load approval page' });
  }
});

// Approve timesheet
router.post('/approval/:token/approve', async (req, res) => {
  try {
    const { token } = req.params;
    const { supervisorSignature, comments } = req.body;

    const timesheet = await storage.getTimesheetByToken(token);
    
    if (!timesheet) {
      return res.status(404).json({ message: 'Invalid or expired approval link' });
    }

    if (timesheet.status !== 'submitted') {
      return res.status(400).json({ 
        message: 'This timesheet has already been processed',
        status: timesheet.status 
      });
    }

    // Approve the timesheet
    const approvedTimesheet = await storage.approveTimesheet(
      timesheet.id, 
      supervisorSignature, 
      timesheet.supervisorId || 0
    );

    // Send approval notification email
    try {
      await sendTimesheetNotification({
        type: 'approved',
        timesheet: approvedTimesheet,
        recipientEmail: timesheet.contractorEmail || 'contractor@example.com',
        supervisorName: timesheet.supervisorName || 'Supervisor',
        comments: comments || 'Timesheet has been approved.',
      });
    } catch (emailError) {
      console.error('Failed to send approval email:', emailError);
    }

    res.json({ 
      message: 'Timesheet approved successfully',
      timesheet: approvedTimesheet 
    });
  } catch (error) {
    console.error('Approval error:', error);
    res.status(500).json({ message: 'Failed to approve timesheet' });
  }
});

// Reject timesheet
router.post('/approval/:token/reject', async (req, res) => {
  try {
    const { token } = req.params;
    const { rejectionReason, comments } = req.body;

    if (!rejectionReason) {
      return res.status(400).json({ message: 'Rejection reason is required' });
    }

    const timesheet = await storage.getTimesheetByToken(token);
    
    if (!timesheet) {
      return res.status(404).json({ message: 'Invalid or expired approval link' });
    }

    if (timesheet.status !== 'submitted') {
      return res.status(400).json({ 
        message: 'This timesheet has already been processed',
        status: timesheet.status 
      });
    }

    // Reject the timesheet
    const rejectedTimesheet = await storage.rejectTimesheet(
      timesheet.id, 
      rejectionReason, 
      timesheet.supervisorId || 0
    );

    // Send rejection notification email
    try {
      await sendTimesheetNotification({
        type: 'rejected',
        timesheet: rejectedTimesheet,
        recipientEmail: timesheet.contractorEmail || 'contractor@example.com',
        supervisorName: timesheet.supervisorName || 'Supervisor',
        rejectionReason,
        comments: comments || 'Please review and resubmit your timesheet.',
      });
    } catch (emailError) {
      console.error('Failed to send rejection email:', emailError);
    }

    res.json({ 
      message: 'Timesheet rejected successfully',
      timesheet: rejectedTimesheet 
    });
  } catch (error) {
    console.error('Rejection error:', error);
    res.status(500).json({ message: 'Failed to reject timesheet' });
  }
});

// Get timesheet details for approval interface
router.get('/timesheet/:id/details', async (req, res) => {
  try {
    const { id } = req.params;
    const timesheet = await storage.getTimesheetById(parseInt(id));
    
    if (!timesheet) {
      return res.status(404).json({ message: 'Timesheet not found' });
    }

    // Get contractor details
    const contractor = await storage.getTimesheetUserById(timesheet.contractorId);
    
    res.json({ 
      timesheet: {
        ...timesheet,
        contractorDetails: contractor ? {
          firstName: contractor.firstName,
          lastName: contractor.lastName,
          email: contractor.email,
          department: contractor.department,
          companyName: contractor.companyName,
        } : null
      }
    });
  } catch (error) {
    console.error('Timesheet details error:', error);
    res.status(500).json({ message: 'Failed to get timesheet details' });
  }
});

export { router as supervisorApprovalRouter };