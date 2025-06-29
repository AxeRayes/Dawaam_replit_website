import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema, insertResumeSchema, insertAuditRequestSchema, insertRecruitmentRequestSchema, insertPayrollRequestSchema, insertManpowerRequestSchema, insertImmigrationRequestSchema, insertConsultationRequestSchema, insertHRConsultingRequestSchema, insertRecruitmentAgreementSchema } from "@shared/schema";
import { sendResumeNotification } from "./email";
import { sendAuditRequestNotification } from "./audit-email";
import { sendRecruitmentRequestNotification } from "./recruitment-email";
import { sendPayrollRequestNotification } from "./payroll-email";
import { sendManpowerRequestNotification } from "./manpower-email";
import { sendImmigrationRequestNotification } from "./immigration-email";
import { sendConsultationRequestNotification } from "./consultation-email";
import { sendHRConsultingRequestNotification } from "./hr-consulting-email";
import { registerTimesheetRoutes } from "./timesheet-routes";
import { z } from "zod";
import multer from "multer";
import path from "path";
import fs from "fs";
import bcrypt from "bcrypt";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      res.json({ success: true, id: submission.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          error: "Invalid form data", 
          details: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          error: "Failed to submit contact form" 
        });
      }
    }
  });

  // Get all contact submissions (for admin purposes)
  app.get("/api/contact-submissions", async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json(submissions);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        error: "Failed to retrieve contact submissions" 
      });
    }
  });

  // Configure multer for file uploads
  const upload = multer({
    dest: 'uploads/',
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    fileFilter: (req, file, cb) => {
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error('Only PDF, DOC, and DOCX files are allowed'));
      }
    }
  });

  // Configure multer for FormData parsing (no file destination needed for form fields)
  const formUpload = multer();
  
  // Debug middleware to log all requests
  const debugRequest = (req: any, res: any, next: any) => {
    console.log('Request content-type:', req.headers['content-type']);
    next();
  };

  app.post("/api/resumes", upload.single('resume'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const resumeData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone || null,
        location: req.body.location || null,
        jobTitle: req.body.jobTitle || null,
        experience: req.body.experience || null,
        skills: req.body.skills || null,
        fileName: req.file.originalname,
        fileSize: req.file.size,
        fileType: req.file.mimetype,
      };

      const validatedData = insertResumeSchema.parse(resumeData);
      const resume = await storage.createResume(validatedData);
      
      // Send email notification to recruitment team
      try {
        await sendResumeNotification({
          firstName: resume.firstName,
          lastName: resume.lastName,
          email: resume.email,
          phone: resume.phone,
          location: resume.location,
          jobTitle: resume.jobTitle,
          experience: resume.experience,
          skills: resume.skills,
          fileName: resume.fileName,
          fileSize: resume.fileSize,
          fileType: resume.fileType,
          resumeId: resume.id,
        });
        console.log(`Email notification sent for resume ID: ${resume.id}`);
      } catch (emailError) {
        console.error(`Failed to send email notification for resume ID: ${resume.id}`, emailError);
        // Don't fail the entire request if email fails
      }
      
      // Clean up uploaded file after saving to database
      fs.unlinkSync(req.file.path);
      
      res.json({ 
        message: "Resume uploaded successfully", 
        id: resume.id 
      });
    } catch (error: any) {
      // Clean up file if there was an error
      if (req.file) {
        try {
          fs.unlinkSync(req.file.path);
        } catch (cleanupError) {
          console.error("Error cleaning up file:", cleanupError);
        }
      }
      
      console.error("Resume upload error:", error);
      res.status(400).json({ 
        error: "Invalid resume data",
        details: error.message 
      });
    }
  });

  app.get("/api/resumes", async (req, res) => {
    try {
      const resumes = await storage.getResumes();
      res.json(resumes);
    } catch (error: any) {
      console.error("Error fetching resumes:", error);
      res.status(500).json({ error: "Failed to fetch resumes" });
    }
  });

  // Audit request submission endpoint
  app.post("/api/audit-request", async (req, res) => {
    try {
      const validatedData = insertAuditRequestSchema.parse(req.body);
      
      const auditRequest = await storage.createAuditRequest(validatedData);
      
      // Send email notification
      const emailSent = await sendAuditRequestNotification({
        ...validatedData,
        requestId: auditRequest.id,
      });

      if (!emailSent) {
        console.warn(`Email notification failed for audit request #${auditRequest.id}`);
      }

      res.status(201).json({ 
        success: true, 
        message: "Audit request submitted successfully",
        requestId: auditRequest.id
      });
    } catch (error) {
      console.error("Error creating audit request:", error);
      res.status(400).json({ error: "Invalid audit request data" });
    }
  });

  // Payroll request endpoint
  app.post("/api/payroll-request", async (req, res) => {
    try {
      const validatedData = insertPayrollRequestSchema.parse(req.body);
      
      const payrollRequest = await storage.createPayrollRequest(validatedData);
      
      // Send email notification
      const emailSent = await sendPayrollRequestNotification({
        ...validatedData,
        requestId: payrollRequest.id,
      });
      
      if (!emailSent) {
        console.warn("Failed to send payroll request email notification");
      }
      
      res.json({ 
        success: true, 
        message: "Payroll request submitted successfully",
        requestId: payrollRequest.id 
      });
    } catch (error) {
      console.error("Error submitting payroll request:", error);
      res.status(500).json({ error: "Failed to submit payroll request" });
    }
  });

  // Manpower request endpoint
  app.post("/api/manpower-request", async (req, res) => {
    try {
      const validatedData = insertManpowerRequestSchema.parse(req.body);
      
      const manpowerRequest = await storage.createManpowerRequest(validatedData);
      
      // Send email notification
      const emailSent = await sendManpowerRequestNotification({
        ...validatedData,
        requestId: manpowerRequest.id,
      });
      
      if (!emailSent) {
        console.warn("Failed to send manpower request email notification");
      }
      
      res.json({ 
        success: true, 
        message: "Manpower request submitted successfully",
        requestId: manpowerRequest.id 
      });
    } catch (error) {
      console.error("Error submitting manpower request:", error);
      res.status(500).json({ error: "Failed to submit manpower request" });
    }
  });

  // Immigration request endpoint
  app.post("/api/immigration-request", async (req, res) => {
    try {
      const validatedData = insertImmigrationRequestSchema.parse(req.body);
      
      const immigrationRequest = await storage.createImmigrationRequest(validatedData);
      
      // Send email notification
      const emailSent = await sendImmigrationRequestNotification({
        ...validatedData,
        requestId: immigrationRequest.id,
      });
      
      if (!emailSent) {
        console.warn("Failed to send immigration request email notification");
      }
      
      res.json({ 
        success: true, 
        message: "Immigration request submitted successfully",
        requestId: immigrationRequest.id 
      });
    } catch (error) {
      console.error("Error submitting immigration request:", error);
      res.status(500).json({ error: "Failed to submit immigration request" });
    }
  });

  // Consultation request endpoint
  app.post("/api/consultation-request", async (req, res) => {
    try {
      const validatedData = insertConsultationRequestSchema.parse(req.body);
      
      const consultationRequest = await storage.createConsultationRequest(validatedData);
      
      // Send email notification
      const emailSent = await sendConsultationRequestNotification({
        ...validatedData,
        requestId: consultationRequest.id,
      });
      
      if (!emailSent) {
        console.warn("Failed to send consultation request email notification");
      }
      
      res.json({ 
        success: true, 
        message: "Consultation request submitted successfully",
        requestId: consultationRequest.id 
      });
    } catch (error) {
      console.error("Error submitting consultation request:", error);
      res.status(500).json({ error: "Failed to submit consultation request" });
    }
  });

  // HR Consulting request endpoint
  app.post("/api/hr-consulting-request", async (req, res) => {
    try {
      const validatedData = insertHRConsultingRequestSchema.parse(req.body);
      
      const hrConsultingRequest = await storage.createHRConsultingRequest(validatedData);
      
      // Send email notification
      const emailSent = await sendHRConsultingRequestNotification({
        ...validatedData,
        requestId: hrConsultingRequest.id,
      });
      
      if (!emailSent) {
        console.warn("Failed to send HR consulting request email notification");
      }
      
      res.json({ 
        success: true, 
        message: "HR consulting request submitted successfully",
        requestId: hrConsultingRequest.id 
      });
    } catch (error) {
      console.error("Error submitting HR consulting request:", error);
      res.status(500).json({ error: "Failed to submit HR consulting request" });
    }
  });

  // Recruitment Agreement endpoint
  app.post("/api/recruitment-agreement", async (req, res) => {
    try {
      const validatedData = insertRecruitmentAgreementSchema.parse(req.body);
      const agreement = await storage.createRecruitmentAgreement(validatedData);
      
      console.log("Recruitment agreement submitted successfully");
      
      res.json({ success: true, id: agreement.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          error: "Invalid form data", 
          details: error.errors 
        });
      } else {
        console.error("Error submitting recruitment agreement:", error);
        res.status(500).json({ 
          success: false, 
          error: "Failed to submit recruitment agreement" 
        });
      }
    }
  });

  // Removed duplicate login endpoint

  // Get user's timesheets
  app.get('/api/timesheets', async (req: any, res) => {
    try {
      // Ensure user is logged in
      console.log(`Session check for /api/timesheets: ${JSON.stringify(req.session?.timesheetUser)}`);
      if (!req.session?.timesheetUser?.id) {
        return res.status(401).json({ message: "Please log in to view timesheets" });
      }
      
      const userId = req.session.timesheetUser.id.toString();
      const timesheets = await storage.getUserTimesheets(userId);
      res.json(timesheets);
    } catch (error) {
      console.error("Error fetching timesheets:", error);
      res.status(500).json({ message: "Failed to fetch timesheets" });
    }
  });

  // Get individual timesheet for editing
  app.get('/api/timesheets/:id', async (req: any, res) => {
    try {
      if (!req.session?.timesheetUser?.id) {
        return res.status(401).json({ message: "Please log in to view timesheet" });
      }
      
      const timesheetId = parseInt(req.params.id);
      const timesheet = await storage.getTimesheetById(timesheetId);
      
      if (!timesheet || timesheet.contractorId !== req.session.timesheetUser.id) {
        return res.status(404).json({ message: "Timesheet not found" });
      }
      
      res.json(timesheet);
    } catch (error) {
      console.error("Error fetching timesheet:", error);
      res.status(500).json({ message: "Failed to fetch timesheet" });
    }
  });

  // Delete timesheet
  app.delete('/api/timesheets/:id', async (req: any, res) => {
    try {
      // Ensure user is logged in
      if (!req.session?.timesheetUser?.id) {
        return res.status(401).json({ message: "Please log in to delete timesheets" });
      }
      
      const timesheetId = parseInt(req.params.id);
      await storage.deleteTimesheet(timesheetId, req.session.timesheetUser.id);
      res.json({ message: "Timesheet deleted successfully" });
    } catch (error) {
      console.error("Error deleting timesheet:", error);
      res.status(500).json({ message: "Failed to delete timesheet" });
    }
  });

  // Timesheet authentication endpoint
  app.post("/api/timesheet/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(`Timesheet login for: ${email}`);
      
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password required" });
      }
      
      const user = await storage.getTimesheetUserByEmail(email);
      if (!user || !user.isActive) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      // Set session
      req.session.timesheetUser = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        companyName: user.companyName || '',
        department: user.department || '',
        phone: user.phone || '',
        supervisorId: user.supervisorId,
        isActive: user.isActive,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString()
      };
      
      console.log(`Login successful for ${email}`);
      
      res.json({ 
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          companyName: user.companyName
        }
      });
    } catch (error) {
      console.error("Authentication error:", error);
      res.status(500).json({ message: "Login failed" });
    }
  });

  // Admin routes for timesheet user management
  app.post("/api/timesheet/admin/create-user", async (req, res) => {
    try {
      const userData = req.body;
      
      // Check if user already exists
      const existingUser = await storage.getTimesheetUserByEmail(userData.email);
      if (existingUser) {
        return res.status(409).json({ message: "User with this email already exists" });
      }

      const user = await storage.createTimesheetUser(userData);
      
      res.status(201).json({ 
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          companyName: user.companyName
        }
      });
    } catch (error) {
      console.error("User creation error:", error);
      res.status(500).json({ message: "Failed to create user" });
    }
  });

  app.get("/api/timesheet/admin/users", async (req, res) => {
    try {
      const users = await storage.getAllTimesheetUsers();
      res.json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  app.delete("/api/timesheet/admin/users/:id", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      await storage.deleteTimesheetUser(userId);
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ message: "Failed to delete user" });
    }
  });

  // Timesheet submission and approval routes
  app.post("/api/timesheets/submit", debugRequest, formUpload.fields([
    { name: 'signedPDF', maxCount: 1 },
    { name: 'timesheetType' },
    { name: 'rateType' },
    { name: 'totalDays' },
    { name: 'totalHours' },
    { name: 'workDescription' },
    { name: 'location' },
    { name: 'department' },
    { name: 'jobTitle' },
    { name: 'supervisorName' },
    { name: 'supervisorEmail' },
    { name: 'additionalEmails' },
    { name: 'contractorSignature' },
    { name: 'periodStart' },
    { name: 'entries' }
  ]), async (req, res) => {
    try {
      const timesheetData = req.body;
      const uploadedFile = req.file;
      
      // Ensure user is logged in
      console.log(`Session check for timesheet submit: ${JSON.stringify(req.session?.timesheetUser)}`);
      if (!req.session?.timesheetUser?.id) {
        return res.status(401).json({ message: "Please log in to submit timesheets" });
      }
      
      // Parse the data properly - extract from FormData
      console.log('Raw request body fields:', Object.keys(req.body));
      console.log('Full request body:', req.body);
      console.log('totalDays field:', req.body.totalDays, 'totalHours field:', req.body.totalHours);
      
      const parsedData = {
        timesheetType: req.body.timesheetType || 'monthly',
        rateType: req.body.rateType || 'daily',
        totalDays: parseInt(req.body.totalDays) || 0,
        totalHours: parseFloat(req.body.totalHours) || 0,
        workDescription: req.body.workDescription || '',
        location: req.body.location || '',
        department: req.body.department || '',
        jobTitle: req.body.jobTitle || '',
        supervisorName: req.body.supervisorName || '',
        supervisorEmail: req.body.supervisorEmail || '',
        additionalEmails: req.body.additionalEmails || '',
        contractorSignature: req.body.contractorSignature || '',
        periodStart: req.body.periodStart || new Date().toISOString()
      };
      
      console.log('Parsed timesheet data:', parsedData);
      
      // Convert periodStart to proper date format
      const periodStart = new Date(parsedData.periodStart);
      const weekStarting = periodStart.toISOString().split('T')[0]; // Convert to YYYY-MM-DD format
      
      const timesheet = await storage.createTimesheet({
        contractorId: req.session.timesheetUser.id,
        weekStarting: weekStarting,
        periodType: parsedData.timesheetType || 'monthly',
        rateType: parsedData.rateType || 'daily',
        totalHours: parseFloat(parsedData.totalHours) || 0,
        totalDays: parseInt(parsedData.totalDays) || 0,
        workDescription: parsedData.workDescription || '',
        workLocation: parsedData.location || '',
        department: parsedData.department || '',
        jobTitle: parsedData.jobTitle || '',
        supervisorName: parsedData.supervisorName || '',
        supervisorEmail: parsedData.supervisorEmail || '',
        additionalEmails: parsedData.additionalEmails || '',
        contractorSignature: parsedData.contractorSignature || '',
        contractorSignedAt: new Date(),
        pdfPath: uploadedFile ? `/uploads/${uploadedFile.filename}` : null,
        status: 'submitted'
      });

      // Email notification would be sent here if SendGrid is configured
      console.log(`Timesheet submitted for approval - ID: ${timesheet.id}, Supervisor: ${parsedData.supervisorEmail}`);

      res.json({ 
        success: true, 
        timesheetId: timesheet.id,
        message: 'Timesheet submitted successfully'
      });
    } catch (error) {
      console.error("Error submitting timesheet:", error);
      res.status(500).json({ message: "Failed to submit timesheet" });
    }
  });

  app.get("/api/timesheets/pending-approval", async (req, res) => {
    try {
      const supervisorEmail = req.query.email as string;
      const pendingTimesheets = await storage.getPendingTimesheets(supervisorEmail);
      res.json(pendingTimesheets);
    } catch (error) {
      console.error("Error fetching pending timesheets:", error);
      res.status(500).json({ message: "Failed to fetch pending timesheets" });
    }
  });

  app.post("/api/timesheets/:id/approve", async (req, res) => {
    try {
      const timesheetId = parseInt(req.params.id);
      const { supervisorSignature, approvedBy } = req.body;
      
      const timesheet = await storage.updateTimesheetStatus(
        timesheetId, 
        'approved', 
        supervisorSignature,
        approvedBy
      );

      // Send approval notification emails
      const emailSent = await sendApprovalNotification({
        timesheetId,
        contractorEmail: timesheet.contractorEmail,
        additionalEmails: timesheet.additionalEmails,
        supervisorName: approvedBy,
        approvedAt: new Date()
      });

      res.json({ 
        success: true, 
        timesheet,
        emailSent 
      });
    } catch (error) {
      console.error("Error approving timesheet:", error);
      res.status(500).json({ message: "Failed to approve timesheet" });
    }
  });

  app.post("/api/timesheets/:id/reject", async (req, res) => {
    try {
      const timesheetId = parseInt(req.params.id);
      const { rejectionReason, rejectedBy } = req.body;
      
      const timesheet = await storage.updateTimesheetStatus(
        timesheetId, 
        'rejected', 
        null,
        rejectionReason
      );

      // Send rejection notification
      const emailSent = await sendRejectionNotification({
        timesheetId,
        contractorEmail: timesheet.contractorEmail,
        rejectionReason,
        rejectedBy,
        rejectedAt: new Date()
      });

      res.json({ 
        success: true, 
        timesheet,
        emailSent 
      });
    } catch (error) {
      console.error("Error rejecting timesheet:", error);
      res.status(500).json({ message: "Failed to reject timesheet" });
    }
  });

  // Delete timesheet endpoint
  app.delete("/api/timesheets/:id", async (req: any, res) => {
    try {
      if (!req.session?.timesheetUser?.id) {
        return res.status(401).json({ message: "Please log in to delete timesheets" });
      }
      
      const timesheetId = parseInt(req.params.id);
      const userId = req.session.timesheetUser.id;
      
      console.log(`Delete request for timesheet ${timesheetId} by user ${userId}`);
      
      try {
        await storage.deleteTimesheet(timesheetId, userId);
        console.log(`Successfully deleted timesheet ${timesheetId}`);
        res.json({ success: true, message: "Timesheet deleted successfully" });
      } catch (dbError: any) {
        console.error("Database error during deletion:", dbError);
        res.status(400).json({ message: dbError.message || "Failed to delete timesheet" });
      }
      
    } catch (error) {
      console.error("Error deleting timesheet:", error);
      res.status(500).json({ message: "Failed to delete timesheet" });
    }
  });

  // Download timesheet endpoint - simplified to avoid database issues
  app.get("/api/timesheets/:id/download", async (req: any, res) => {
    try {
      console.log('Session check:', req.session);
      console.log('Timesheet user:', req.session?.timesheetUser);
      
      if (!req.session?.timesheetUser?.id) {
        console.log('No authenticated user found');
        return res.status(401).json({ message: "Please log in to download timesheets" });
      }
      
      const timesheetId = parseInt(req.params.id);
      console.log(`Download request for timesheet ${timesheetId} by user ${req.session.timesheetUser.id}`);
      
      // Fetch actual timesheet data from database
      const timesheet = await storage.getTimesheetById(timesheetId);
      if (!timesheet || timesheet.contractorId !== req.session.timesheetUser.id) {
        return res.status(404).json({ message: "Timesheet not found" });
      }
      
      const { generateTimesheetPDF } = await import("./pdf-generator");
      
      // Parse entries from stored JSON
      let entries = [];
      try {
        entries = timesheet.entries ? JSON.parse(timesheet.entries) : [];
      } catch (error) {
        console.error('Error parsing timesheet entries:', error);
        entries = [];
      }
      
      const pdfData = {
        periodText: timesheet.periodType === 'monthly' ? 'Month of June 2025' : 'Week of June 2025',
        totalHours: timesheet.totalHours || 0,
        totalDays: timesheet.totalDays || 0,
        workDescription: timesheet.workDescription || 'Regular work activities',
        location: timesheet.location || timesheet.workLocation || 'Various locations',
        department: timesheet.department || req.session.timesheetUser.department || "HSE",
        jobTitle: timesheet.jobTitle || req.session.timesheetUser.jobTitle || "Contractor",
        supervisorName: timesheet.supervisorName || "Akram Rayes",
        supervisorEmail: timesheet.supervisorEmail || "a.rayes@dawaam.com",
        contractorSignature: timesheet.contractorSignature || "",
        supervisorSignature: timesheet.supervisorSignature || "",
        firstName: req.session.timesheetUser.firstName,
        lastName: req.session.timesheetUser.lastName,
        companyName: req.session.timesheetUser.companyName || 'Dawaam',
        rateType: timesheet.rateType || "daily",
        periodType: timesheet.periodType || "monthly",
        entries: entries.length > 0 ? entries : []
      };
      
      const pdfBuffer = generateTimesheetPDF(pdfData);
      
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="Timesheet_June_2025_${req.session.timesheetUser.firstName}_${req.session.timesheetUser.lastName}.pdf"`);
      res.setHeader('Content-Length', pdfBuffer.length.toString());
      res.status(200).send(pdfBuffer);
      
      console.log(`Successfully generated timesheet download for ${timesheetId}`);
      
    } catch (error) {
      console.error("Error downloading timesheet:", error);
      res.status(500).json({ message: "Failed to download timesheet" });
    }
  });

  // PUT /api/timesheets/:id - Update timesheet
  app.put('/api/timesheets/:id', async (req, res) => {
    try {
      if (!req.session.timesheetUser) {
        return res.status(401).json({ message: 'Not authenticated' });
      }

      const timesheetId = parseInt(req.params.id);
      const { 
        periodType, 
        rateType, 
        totalHours, 
        totalDays, 
        workDescription, 
        location: workLocation, 
        department, 
        jobTitle,
        companyName,
        supervisorName, 
        supervisorEmail, 
        additionalEmails,
        periodStart,
        entries 
      } = req.body;

      console.log('Updating timesheet:', timesheetId, 'with data:', req.body);

      // Verify timesheet belongs to user
      const existingTimesheet = await storage.getTimesheetById(timesheetId);
      if (!existingTimesheet || existingTimesheet.contractorId !== req.session.timesheetUser.id) {
        return res.status(404).json({ message: 'Timesheet not found' });
      }

      // Only allow editing draft, rejected, and submitted timesheets (not approved)
      if (existingTimesheet.status === 'approved') {
        return res.status(400).json({ message: 'Cannot edit approved timesheets. Please contact your supervisor.' });
      }

      const updatedTimesheet = await storage.updateTimesheet(timesheetId, {
        contractorId: req.session.timesheetUser.id,
        weekStarting: new Date(periodStart),
        periodType,
        rateType,
        totalHours: parseFloat(totalHours) || 0,
        totalDays: parseInt(totalDays) || 0,
        workDescription,
        workLocation,
        department,
        jobTitle,
        companyName,
        supervisorName,
        supervisorEmail,
        additionalEmails,
        status: existingTimesheet.status === 'submitted' ? 'submitted' : 'draft',
        entries: JSON.stringify(entries)
      });

      console.log('Timesheet updated successfully:', updatedTimesheet);
      res.json(updatedTimesheet);
    } catch (error) {
      console.error('Error updating timesheet:', error);
      res.status(500).json({ message: 'Failed to update timesheet' });
    }
  });

  // Timesheet routes are integrated directly in this file

  const httpServer = createServer(app);
  return httpServer;
}
