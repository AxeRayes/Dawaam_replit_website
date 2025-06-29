import { 
  users, 
  contactSubmissions, 
  resumes,
  auditRequests,
  recruitmentRequests,
  payrollRequests,
  manpowerRequests,
  immigrationRequests,
  consultationRequests,
  hrConsultingRequests,
  recruitmentAgreements,
  timesheetUsers,
  timesheets,
  timesheetEntries,
  type User, 
  type InsertUser, 
  type ContactSubmission, 
  type InsertContactSubmission,
  type Resume,
  type InsertResume,
  type AuditRequest,
  type InsertAuditRequest,
  type RecruitmentRequest,
  type InsertRecruitmentRequest,
  type PayrollRequest,
  type InsertPayrollRequest,
  type ManpowerRequest,
  type InsertManpowerRequest,
  type ImmigrationRequest,
  type InsertImmigrationRequest,
  type ConsultationRequest,
  type InsertConsultationRequest,
  type HRConsultingRequest,
  type InsertHRConsultingRequest,
  type RecruitmentAgreement,
  type InsertRecruitmentAgreement,
  type TimesheetUser,
  type InsertTimesheetUser,
  type Timesheet,
  type InsertTimesheet,
  type TimesheetEntry,
  type InsertTimesheetEntry,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, or } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
  createResume(resume: InsertResume): Promise<Resume>;
  getResumes(): Promise<Resume[]>;
  getResumeById(id: number): Promise<Resume | undefined>;
  createAuditRequest(request: InsertAuditRequest): Promise<AuditRequest>;
  getAuditRequests(): Promise<AuditRequest[]>;
  createRecruitmentRequest(request: InsertRecruitmentRequest): Promise<RecruitmentRequest>;
  getRecruitmentRequests(): Promise<RecruitmentRequest[]>;
  createPayrollRequest(request: InsertPayrollRequest): Promise<PayrollRequest>;
  getPayrollRequests(): Promise<PayrollRequest[]>;
  createManpowerRequest(request: InsertManpowerRequest): Promise<ManpowerRequest>;
  getManpowerRequests(): Promise<ManpowerRequest[]>;
  createImmigrationRequest(request: InsertImmigrationRequest): Promise<ImmigrationRequest>;
  getImmigrationRequests(): Promise<ImmigrationRequest[]>;
  createConsultationRequest(request: InsertConsultationRequest): Promise<ConsultationRequest>;
  getConsultationRequests(): Promise<ConsultationRequest[]>;
  createHRConsultingRequest(request: InsertHRConsultingRequest): Promise<HRConsultingRequest>;
  getHRConsultingRequests(): Promise<HRConsultingRequest[]>;
  createRecruitmentAgreement(agreement: InsertRecruitmentAgreement): Promise<RecruitmentAgreement>;
  getRecruitmentAgreements(): Promise<RecruitmentAgreement[]>;
  
  // Timesheet operations
  createTimesheetUser(user: InsertTimesheetUser): Promise<TimesheetUser>;
  getTimesheetUserByEmail(email: string): Promise<TimesheetUser | undefined>;
  authenticateTimesheetUser(email: string, password: string): Promise<TimesheetUser | undefined>;
  createTimesheet(timesheet: InsertTimesheet): Promise<Timesheet>;
  getTimesheetsByContractor(contractorId: number): Promise<Timesheet[]>;
  getTimesheetsPendingApproval(employerId: number): Promise<Timesheet[]>;
  updateTimesheetStatus(id: number, status: string, approvedBy?: number, rejectionReason?: string): Promise<Timesheet>;
  createTimesheetEntry(entry: InsertTimesheetEntry): Promise<TimesheetEntry>;
  getTimesheetEntries(timesheetId: number): Promise<TimesheetEntry[]>;
  getAllTimesheetUsers(): Promise<TimesheetUser[]>;
  deleteTimesheetUser(id: number): Promise<void>;
  getUserTimesheets(userId: string): Promise<Timesheet[]>;
  deleteTimesheet(timesheetId: number, userId: number): Promise<void>;
  getTimesheetById(timesheetId: number): Promise<Timesheet | undefined>;
}

class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const [submission] = await db
      .insert(contactSubmissions)
      .values(insertSubmission)
      .returning();
    return submission;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return await db.select().from(contactSubmissions);
  }

  async createResume(insertResume: InsertResume): Promise<Resume> {
    const [resume] = await db
      .insert(resumes)
      .values(insertResume)
      .returning();
    return resume;
  }

  async getResumes(): Promise<Resume[]> {
    return await db.select().from(resumes);
  }

  async getResumeById(id: number): Promise<Resume | undefined> {
    const [resume] = await db.select().from(resumes).where(eq(resumes.id, id));
    return resume || undefined;
  }

  async createAuditRequest(insertRequest: InsertAuditRequest): Promise<AuditRequest> {
    const [request] = await db
      .insert(auditRequests)
      .values(insertRequest)
      .returning();
    return request;
  }

  async getAuditRequests(): Promise<AuditRequest[]> {
    return await db.select().from(auditRequests).orderBy(auditRequests.createdAt);
  }

  async createRecruitmentRequest(insertRequest: InsertRecruitmentRequest): Promise<RecruitmentRequest> {
    const [request] = await db
      .insert(recruitmentRequests)
      .values(insertRequest)
      .returning();
    return request;
  }

  async getRecruitmentRequests(): Promise<RecruitmentRequest[]> {
    return await db.select().from(recruitmentRequests).orderBy(recruitmentRequests.createdAt);
  }

  async createPayrollRequest(insertRequest: InsertPayrollRequest): Promise<PayrollRequest> {
    const [request] = await db
      .insert(payrollRequests)
      .values(insertRequest)
      .returning();
    return request;
  }

  async getPayrollRequests(): Promise<PayrollRequest[]> {
    return await db.select().from(payrollRequests).orderBy(payrollRequests.createdAt);
  }

  async createManpowerRequest(insertRequest: InsertManpowerRequest): Promise<ManpowerRequest> {
    const [request] = await db
      .insert(manpowerRequests)
      .values(insertRequest)
      .returning();
    return request;
  }

  async getManpowerRequests(): Promise<ManpowerRequest[]> {
    return await db.select().from(manpowerRequests).orderBy(manpowerRequests.createdAt);
  }

  async createImmigrationRequest(insertRequest: InsertImmigrationRequest): Promise<ImmigrationRequest> {
    const [request] = await db
      .insert(immigrationRequests)
      .values(insertRequest)
      .returning();
    return request;
  }

  async getImmigrationRequests(): Promise<ImmigrationRequest[]> {
    return await db.select().from(immigrationRequests).orderBy(immigrationRequests.createdAt);
  }

  async createConsultationRequest(insertRequest: InsertConsultationRequest): Promise<ConsultationRequest> {
    const [request] = await db
      .insert(consultationRequests)
      .values(insertRequest)
      .returning();
    return request;
  }

  async getConsultationRequests(): Promise<ConsultationRequest[]> {
    return await db.select().from(consultationRequests).orderBy(consultationRequests.createdAt);
  }

  async createHRConsultingRequest(insertRequest: InsertHRConsultingRequest): Promise<HRConsultingRequest> {
    const [request] = await db
      .insert(hrConsultingRequests)
      .values(insertRequest)
      .returning();
    return request;
  }

  async getHRConsultingRequests(): Promise<HRConsultingRequest[]> {
    return await db.select().from(hrConsultingRequests).orderBy(hrConsultingRequests.createdAt);
  }
  
  // Timesheet operations
  async createTimesheetUser(insertUser: InsertTimesheetUser): Promise<TimesheetUser> {
    const [user] = await db
      .insert(timesheetUsers)
      .values(insertUser)
      .returning();
    return user;
  }

  async getTimesheetUserByEmail(email: string): Promise<TimesheetUser | undefined> {
    const [user] = await db.select().from(timesheetUsers).where(eq(timesheetUsers.email, email));
    return user || undefined;
  }

  async authenticateTimesheetUser(email: string, password: string): Promise<TimesheetUser | undefined> {
    const [user] = await db.select().from(timesheetUsers).where(
      and(eq(timesheetUsers.email, email), eq(timesheetUsers.password, password))
    );
    return user || undefined;
  }

  async createTimesheet(insertTimesheet: InsertTimesheet): Promise<Timesheet> {
    const [timesheet] = await db
      .insert(timesheets)
      .values(insertTimesheet)
      .returning();
    return timesheet;
  }

  async getTimesheetsByContractor(contractorId: number): Promise<Timesheet[]> {
    return await db.select().from(timesheets).where(eq(timesheets.contractorId, contractorId));
  }

  async getTimesheetsPendingApproval(employerId: number): Promise<Timesheet[]> {
    return await db.select().from(timesheets).where(
      eq(timesheets.status, "submitted")
    );
  }

  async updateTimesheetStatus(id: number, status: string, approvedBy?: number, rejectionReason?: string): Promise<Timesheet> {
    const updateData: any = { status, updatedAt: new Date() };
    if (approvedBy) updateData.approvedBy = approvedBy;
    if (status === 'approved') updateData.approvedAt = new Date();
    if (rejectionReason) updateData.rejectionReason = rejectionReason;

    const [timesheet] = await db
      .update(timesheets)
      .set(updateData)
      .where(eq(timesheets.id, id))
      .returning();
    return timesheet;
  }

  async createTimesheetEntry(insertEntry: InsertTimesheetEntry): Promise<TimesheetEntry> {
    const [entry] = await db
      .insert(timesheetEntries)
      .values(insertEntry)
      .returning();
    return entry;
  }

  async getTimesheetEntries(timesheetId: number): Promise<TimesheetEntry[]> {
    return await db.select().from(timesheetEntries).where(eq(timesheetEntries.timesheetId, timesheetId));
  }

  async getAllTimesheetUsers(): Promise<TimesheetUser[]> {
    return await db.select().from(timesheetUsers).orderBy(timesheetUsers.createdAt);
  }

  async deleteTimesheetUser(id: number): Promise<void> {
    await db.delete(timesheetUsers).where(eq(timesheetUsers.id, id));
  }

  async getUserTimesheets(userId: string): Promise<Timesheet[]> {
    try {
      const contractorId = parseInt(userId);
      console.log(`Getting timesheets for contractor ID: ${contractorId}`);
      
      const result = await db.select().from(timesheets)
        .where(eq(timesheets.contractorId, contractorId))
        .orderBy(desc(timesheets.createdAt));
      
      console.log(`Found ${result.length} timesheets for user ${userId}`);
      return result;
    } catch (error) {
      console.error('Error in getUserTimesheets:', error);
      throw error;
    }
  }

  async deleteTimesheet(timesheetId: number, userId: number): Promise<void> {
    console.log(`Attempting to delete timesheet ${timesheetId} for user ${userId}`);
    
    const [timesheet] = await db.select().from(timesheets)
      .where(eq(timesheets.id, timesheetId));
    
    if (!timesheet) {
      throw new Error("Timesheet not found");
    }
    
    if (timesheet.contractorId !== userId) {
      throw new Error("You can only delete your own timesheets");
    }
    
    if (timesheet.status !== 'draft' && timesheet.status !== 'rejected' && timesheet.status !== 'submitted') {
      throw new Error(`Cannot delete timesheet with status: ${timesheet.status}`);
    }
    
    await db.delete(timesheets).where(eq(timesheets.id, timesheetId));
  }

  async getTimesheetById(timesheetId: number): Promise<Timesheet | undefined> {
    const [timesheet] = await db
      .select()
      .from(timesheets)
      .where(eq(timesheets.id, timesheetId));
    return timesheet || undefined;
  }

  async updateTimesheet(id: number, data: Partial<InsertTimesheet>): Promise<Timesheet> {
    const [updatedTimesheet] = await db
      .update(timesheets)
      .set({
        ...data,
        updatedAt: new Date()
      })
      .where(eq(timesheets.id, id))
      .returning();
    
    return updatedTimesheet;
  }

  async createRecruitmentAgreement(insertAgreement: InsertRecruitmentAgreement): Promise<RecruitmentAgreement> {
    const [agreement] = await db
      .insert(recruitmentAgreements)
      .values(insertAgreement)
      .returning();
    return agreement;
  }

  async getRecruitmentAgreements(): Promise<RecruitmentAgreement[]> {
    return await db.select().from(recruitmentAgreements).orderBy(desc(recruitmentAgreements.createdAt));
  }
}

export const storage = new DatabaseStorage();