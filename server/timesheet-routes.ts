import type { Express } from "express";
import { storage } from "./storage";
import { insertTimesheetUserSchema, insertTimesheetSchema, insertTimesheetEntrySchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import { authenticateTimesheetUser } from "./timesheet-auth";

export function registerTimesheetRoutes(app: Express) {
  // Authentication
  app.post("/api/timesheet/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }

      console.log(`Login attempt for: ${email}`);
      const user = await authenticateTimesheetUser(email, password);
      
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Store user in session
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

      console.log(`User ${email} logged in, session saved with ID: ${user.id}`);
      
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
      console.error("Login error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Register new timesheet user
  app.post("/api/timesheet/register", async (req, res) => {
    try {
      const validatedData = insertTimesheetUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getTimesheetUserByEmail(validatedData.email);
      if (existingUser) {
        return res.status(409).json({ message: "User with this email already exists" });
      }

      const user = await storage.createTimesheetUser(validatedData);
      
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
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      console.error("Registration error:", error);
      res.status(500).json({ message: "Failed to register user" });
    }
  });

  // Get timesheets for contractor
  app.get("/api/timesheet/my-timesheets/:contractorId", async (req, res) => {
    try {
      const contractorId = parseInt(req.params.contractorId);
      const timesheets = await storage.getTimesheetsByContractor(contractorId);
      res.json(timesheets);
    } catch (error) {
      console.error("Error fetching timesheets:", error);
      res.status(500).json({ message: "Failed to fetch timesheets" });
    }
  });

  // Get pending timesheets for employer approval
  app.get("/api/timesheet/pending/:employerId", async (req, res) => {
    try {
      const employerId = parseInt(req.params.employerId);
      const timesheets = await storage.getTimesheetsPendingApproval(employerId);
      res.json(timesheets);
    } catch (error) {
      console.error("Error fetching pending timesheets:", error);
      res.status(500).json({ message: "Failed to fetch pending timesheets" });
    }
  });

  // Create new timesheet
  app.post("/api/timesheet/create", async (req, res) => {
    try {
      const validatedData = insertTimesheetSchema.parse(req.body);
      const timesheet = await storage.createTimesheet(validatedData);
      res.status(201).json(timesheet);
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      console.error("Error creating timesheet:", error);
      res.status(500).json({ message: "Failed to create timesheet" });
    }
  });

  // Update timesheet status (approve/reject)
  app.patch("/api/timesheet/:id/status", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status, approvedBy, rejectionReason } = req.body;
      
      const timesheet = await storage.updateTimesheetStatus(id, status, approvedBy, rejectionReason);
      res.json(timesheet);
    } catch (error) {
      console.error("Error updating timesheet status:", error);
      res.status(500).json({ message: "Failed to update timesheet status" });
    }
  });

  // Add timesheet entries
  app.post("/api/timesheet/entries", async (req, res) => {
    try {
      const validatedData = insertTimesheetEntrySchema.parse(req.body);
      const entry = await storage.createTimesheetEntry(validatedData);
      res.status(201).json(entry);
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      console.error("Error creating timesheet entry:", error);
      res.status(500).json({ message: "Failed to create timesheet entry" });
    }
  });

  // Get timesheet entries
  app.get("/api/timesheet/:id/entries", async (req, res) => {
    try {
      const timesheetId = parseInt(req.params.id);
      const entries = await storage.getTimesheetEntries(timesheetId);
      res.json(entries);
    } catch (error) {
      console.error("Error fetching timesheet entries:", error);
      res.status(500).json({ message: "Failed to fetch timesheet entries" });
    }
  });
}