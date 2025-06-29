import { pgTable, text, serial, timestamp, varchar, integer, boolean, decimal, date, index, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  serviceInterest: text("service_interest").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const auditRequests = pgTable("audit_requests", {
  id: serial("id").primaryKey(),
  companyName: varchar("company_name", { length: 255 }).notNull(),
  contactPerson: varchar("contact_person", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  eventName: varchar("event_name", { length: 255 }).notNull(),
  eventType: varchar("event_type", { length: 100 }).notNull(),
  eventDate: varchar("event_date", { length: 50 }).notNull(),
  eventLocation: varchar("event_location", { length: 255 }).notNull(),
  expectedAttendees: varchar("expected_attendees", { length: 50 }).notNull(),
  eventDescription: text("event_description").notNull(),
  additionalRequirements: text("additional_requirements"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const resumes = pgTable("resumes", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  location: varchar("location", { length: 255 }),
  jobTitle: varchar("job_title", { length: 255 }),
  experience: varchar("experience", { length: 100 }),
  skills: text("skills"),
  fileName: varchar("file_name", { length: 255 }).notNull(),
  fileSize: integer("file_size").notNull(),
  fileType: varchar("file_type", { length: 100 }).notNull(),
  uploadedAt: timestamp("uploaded_at").defaultNow().notNull(),
});

export const recruitmentRequests = pgTable("recruitment_requests", {
  id: serial("id").primaryKey(),
  companyName: varchar("company_name", { length: 255 }).notNull(),
  contactPerson: varchar("contact_person", { length: 255 }).notNull(),
  contactEmail: varchar("contact_email", { length: 255 }).notNull(),
  contactPhone: varchar("contact_phone", { length: 50 }).notNull(),
  jobTitle: varchar("job_title", { length: 255 }).notNull(),
  jobDescription: text("job_description").notNull(),
  salaryRange: varchar("salary_range", { length: 255 }),
  benefits: text("benefits"),
  jobLocation: varchar("job_location", { length: 255 }).notNull(),
  workingHours: varchar("working_hours", { length: 255 }).notNull(),
  reportingTo: varchar("reporting_to", { length: 255 }).notNull(),
  skills: text("skills"),
  education: text("education"),
  minExperience: varchar("min_experience", { length: 100 }),
  englishLevel: varchar("english_level", { length: 50 }).notNull(),
  arabicLevel: varchar("arabic_level", { length: 50 }).notNull(),
  otherLanguage: varchar("other_language", { length: 100 }),
  otherLanguageLevel: varchar("other_language_level", { length: 50 }),
  companyDisclosure: varchar("company_disclosure", { length: 10 }).notNull(),
  additionalNotes: text("additional_notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const payrollRequests = pgTable("payroll_requests", {
  id: serial("id").primaryKey(),
  companyName: varchar("company_name", { length: 255 }).notNull(),
  contactPerson: varchar("contact_person", { length: 255 }).notNull(),
  contactEmail: varchar("contact_email", { length: 255 }).notNull(),
  contactPhone: varchar("contact_phone", { length: 50 }).notNull(),
  companyAddress: text("company_address").notNull(),
  businessType: varchar("business_type", { length: 50 }).notNull(),
  employeeCount: varchar("employee_count", { length: 50 }).notNull(),
  currentPayrollProvider: varchar("current_payroll_provider", { length: 255 }),
  payrollFrequency: varchar("payroll_frequency", { length: 50 }).notNull(),
  payrollProcessing: boolean("payroll_processing").default(false),
  taxFiling: boolean("tax_filing").default(false),
  timeTracking: boolean("time_tracking").default(false),
  benefits: boolean("benefits").default(false),
  hrSupport: boolean("hr_support").default(false),
  reporting: boolean("reporting").default(false),
  averageMonthlySalaries: varchar("average_monthly_salaries", { length: 100 }),
  salaryCurrency: varchar("salary_currency", { length: 3 }).default("LYD"),
  hasVariablePay: boolean("has_variable_pay").default(false),
  hasCommissions: boolean("has_commissions").default(false),
  hasBonuses: boolean("has_bonuses").default(false),
  hasOvertimePay: boolean("has_overtime_pay").default(false),
  needsEndOfService: boolean("needs_end_of_service").default(false),
  needsVacationTracking: boolean("needs_vacation_tracking").default(false),
  needsSickLeave: boolean("needs_sick_leave").default(false),
  needsInsurance: boolean("needs_insurance").default(false),
  needsRetirement: boolean("needs_retirement").default(false),
  implementationTimeline: varchar("implementation_timeline", { length: 50 }).notNull(),
  monthlyBudget: varchar("monthly_budget", { length: 100 }),
  budgetCurrency: varchar("budget_currency", { length: 3 }).default("LYD"),
  currentChallenges: text("current_challenges"),
  specificRequirements: text("specific_requirements"),
  additionalNotes: text("additional_notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const manpowerRequests = pgTable("manpower_requests", {
  id: serial("id").primaryKey(),
  companyName: varchar("company_name", { length: 255 }).notNull(),
  contactPerson: varchar("contact_person", { length: 255 }).notNull(),
  contactEmail: varchar("contact_email", { length: 255 }).notNull(),
  contactPhone: varchar("contact_phone", { length: 50 }).notNull(),
  industry: varchar("industry", { length: 255 }).notNull(),
  companySize: varchar("company_size", { length: 100 }).notNull(),
  staffingType: varchar("staffing_type", { length: 50 }).notNull(),
  positionsNeeded: varchar("positions_needed", { length: 50 }).notNull(),
  contractDuration: varchar("contract_duration", { length: 100 }).notNull(),
  startDate: varchar("start_date", { length: 50 }).notNull(),
  workLocation: varchar("work_location", { length: 255 }).notNull(),
  jobTitles: text("job_titles").notNull(),
  skillsRequired: text("skills_required").notNull(),
  experienceLevel: varchar("experience_level", { length: 50 }).notNull(),
  educationRequirements: text("education_requirements"),
  needsVisa: boolean("needs_visa").default(false),
  needsAccommodation: boolean("needs_accommodation").default(false),
  needsTransportation: boolean("needs_transportation").default(false),
  needsCulturalTraining: boolean("needs_cultural_training").default(false),
  needsOnboarding: boolean("needs_onboarding").default(false),
  localCompliance: boolean("local_compliance").default(false),
  payrollManagement: boolean("payroll_management").default(false),
  benefitsAdministration: boolean("benefits_administration").default(false),
  performanceManagement: boolean("performance_management").default(false),
  budgetRange: varchar("budget_range", { length: 100 }),
  currency: varchar("currency", { length: 3 }).default("LYD"),
  paymentTerms: varchar("payment_terms", { length: 50 }).notNull(),
  currentChallenges: text("current_challenges"),
  specificRequirements: text("specific_requirements"),
  additionalNotes: text("additional_notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const immigrationRequests = pgTable("immigration_requests", {
  id: serial("id").primaryKey(),
  applicantName: varchar("applicant_name", { length: 255 }).notNull(),
  nationality: varchar("nationality", { length: 100 }).notNull(),
  passportNumber: varchar("passport_number", { length: 50 }).notNull(),
  dateOfBirth: varchar("date_of_birth", { length: 50 }).notNull(),
  contactEmail: varchar("contact_email", { length: 255 }).notNull(),
  contactPhone: varchar("contact_phone", { length: 50 }).notNull(),
  companyName: varchar("company_name", { length: 255 }).notNull(),
  companyContact: varchar("company_contact", { length: 255 }).notNull(),
  companyEmail: varchar("company_email", { length: 255 }).notNull(),
  companyPhone: varchar("company_phone", { length: 50 }).notNull(),
  visaType: varchar("visa_type", { length: 50 }).notNull(),
  purposeOfVisit: text("purpose_of_visit").notNull(),
  intendedStayDuration: varchar("intended_stay_duration", { length: 100 }).notNull(),
  proposedPosition: varchar("proposed_position", { length: 255 }),
  expectedStartDate: varchar("expected_start_date", { length: 50 }).notNull(),
  visaProcessing: boolean("visa_processing").default(false),
  documentTranslation: boolean("document_translation").default(false),
  documentAuthentication: boolean("document_authentication").default(false),
  workPermitProcessing: boolean("work_permit_processing").default(false),
  accommodationArrangements: boolean("accommodation_arrangements").default(false),
  transportationArrangements: boolean("transportation_arrangements").default(false),
  culturalTraining: boolean("cultural_training").default(false),
  onboardingSupport: boolean("onboarding_support").default(false),
  hasValidPassport: boolean("has_valid_passport").default(false),
  hasEducationalCertificates: boolean("has_educational_certificates").default(false),
  hasExperienceCertificates: boolean("has_experience_certificates").default(false),
  hasMedicalCertificates: boolean("has_medical_certificates").default(false),
  hasPoliceClearance: boolean("has_police_clearance").default(false),
  educationLevel: varchar("education_level", { length: 50 }).notNull(),
  workExperience: varchar("work_experience", { length: 255 }).notNull(),
  previousLibyaVisit: boolean("previous_libya_visit").default(false),
  previousVisaRejection: boolean("previous_visa_rejection").default(false),
  familyAccompanying: boolean("family_accompanying").default(false),
  familyDetails: text("family_details"),
  specialRequirements: text("special_requirements"),
  additionalNotes: text("additional_notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const consultationRequests = pgTable("consultation_requests", {
  id: serial("id").primaryKey(),
  companyName: varchar("company_name", { length: 255 }).notNull(),
  contactPerson: varchar("contact_person", { length: 255 }).notNull(),
  jobTitle: varchar("job_title", { length: 255 }).notNull(),
  contactEmail: varchar("contact_email", { length: 255 }).notNull(),
  contactPhone: varchar("contact_phone", { length: 50 }).notNull(),
  industry: varchar("industry", { length: 255 }).notNull(),
  companySize: varchar("company_size", { length: 50 }).notNull(),
  consultationType: varchar("consultation_type", { length: 50 }).notNull(),
  urgency: varchar("urgency", { length: 50 }).notNull(),
  preferredTime: varchar("preferred_time", { length: 50 }).notNull(),
  preferredDay: varchar("preferred_day", { length: 50 }).notNull(),
  meetingFormat: varchar("meeting_format", { length: 50 }).notNull(),
  currentChallenges: text("current_challenges").notNull(),
  specificGoals: text("specific_goals"),
  budget: varchar("budget", { length: 100 }),
  additionalNotes: text("additional_notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const hrConsultingRequests = pgTable("hr_consulting_requests", {
  id: serial("id").primaryKey(),
  companyName: varchar("company_name", { length: 255 }).notNull(),
  contactPerson: varchar("contact_person", { length: 255 }).notNull(),
  jobTitle: varchar("job_title", { length: 255 }).notNull(),
  contactEmail: varchar("contact_email", { length: 255 }).notNull(),
  contactPhone: varchar("contact_phone", { length: 50 }).notNull(),
  industry: varchar("industry", { length: 255 }).notNull(),
  companySize: varchar("company_size", { length: 50 }).notNull(),
  businessModel: varchar("business_model", { length: 255 }).notNull(),
  currentHRStructure: varchar("current_hr_structure", { length: 50 }).notNull(),
  workforcePlanning: boolean("workforce_planning").default(false),
  talentStrategy: boolean("talent_strategy").default(false),
  compensationAnalysis: boolean("compensation_analysis").default(false),
  performanceManagement: boolean("performance_management").default(false),
  organizationalDevelopment: boolean("organizational_development").default(false),
  policyDevelopment: boolean("policy_development").default(false),
  complianceAssessment: boolean("compliance_assessment").default(false),
  changeManagement: boolean("change_management").default(false),
  leadershipDevelopment: boolean("leadership_development").default(false),
  cultureTransformation: boolean("culture_transformation").default(false),
  projectScope: varchar("project_scope", { length: 50 }).notNull(),
  projectTimeline: varchar("project_timeline", { length: 50 }).notNull(),
  projectBudget: varchar("project_budget", { length: 100 }),
  budgetCurrency: varchar("budget_currency", { length: 3 }).default("LYD"),
  currentChallenges: text("current_challenges").notNull(),
  specificObjectives: text("specific_objectives").notNull(),
  successMetrics: text("success_metrics"),
  stakeholders: text("stakeholders"),
  previousConsulting: boolean("previous_consulting").default(false),
  urgency: varchar("urgency", { length: 50 }).notNull(),
  additionalNotes: text("additional_notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const recruitmentAgreements = pgTable("recruitment_agreements", {
  id: serial("id").primaryKey(),
  companyName: varchar("company_name", { length: 255 }).notNull(),
  buildingNameNumber: varchar("building_name_number", { length: 255 }).notNull(),
  address1: varchar("address_1", { length: 255 }).notNull(),
  address2: varchar("address_2", { length: 255 }),
  city: varchar("city", { length: 100 }).notNull(),
  country: varchar("country", { length: 100 }).notNull(),
  representativeName: varchar("representative_name", { length: 255 }).notNull(),
  position: varchar("position", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  mobile: varchar("mobile", { length: 50 }).notNull(),
  specificRequirements: text("specific_requirements"),
  additionalNotes: text("additional_notes"),
  signature: varchar("signature", { length: 255 }).notNull(),
  signatureDate: varchar("signature_date", { length: 10 }).notNull(),
  agreementAcknowledged: boolean("agreement_acknowledged").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  createdAt: true,
});

export const insertResumeSchema = createInsertSchema(resumes).omit({
  id: true,
  uploadedAt: true,
});

export const insertAuditRequestSchema = createInsertSchema(auditRequests).omit({
  id: true,
  createdAt: true,
});

export const insertRecruitmentRequestSchema = createInsertSchema(recruitmentRequests).omit({
  id: true,
  createdAt: true,
});

export const insertPayrollRequestSchema = createInsertSchema(payrollRequests).omit({
  id: true,
  createdAt: true,
});

export const insertManpowerRequestSchema = createInsertSchema(manpowerRequests).omit({
  id: true,
  createdAt: true,
});

export const insertImmigrationRequestSchema = createInsertSchema(immigrationRequests).omit({
  id: true,
  createdAt: true,
});

export const insertConsultationRequestSchema = createInsertSchema(consultationRequests).omit({
  id: true,
  createdAt: true,
});

export const insertHRConsultingRequestSchema = createInsertSchema(hrConsultingRequests).omit({
  id: true,
  createdAt: true,
});

export const insertRecruitmentAgreementSchema = createInsertSchema(recruitmentAgreements).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertResume = z.infer<typeof insertResumeSchema>;
export type Resume = typeof resumes.$inferSelect;
export type InsertAuditRequest = z.infer<typeof insertAuditRequestSchema>;
export type AuditRequest = typeof auditRequests.$inferSelect;
export type InsertRecruitmentRequest = z.infer<typeof insertRecruitmentRequestSchema>;
export type RecruitmentRequest = typeof recruitmentRequests.$inferSelect;
export type InsertPayrollRequest = z.infer<typeof insertPayrollRequestSchema>;
export type PayrollRequest = typeof payrollRequests.$inferSelect;
export type InsertManpowerRequest = z.infer<typeof insertManpowerRequestSchema>;
export type ManpowerRequest = typeof manpowerRequests.$inferSelect;
export type InsertImmigrationRequest = z.infer<typeof insertImmigrationRequestSchema>;
export type ImmigrationRequest = typeof immigrationRequests.$inferSelect;
export type InsertConsultationRequest = z.infer<typeof insertConsultationRequestSchema>;
export type ConsultationRequest = typeof consultationRequests.$inferSelect;
export type InsertHRConsultingRequest = z.infer<typeof insertHRConsultingRequestSchema>;
export type HRConsultingRequest = typeof hrConsultingRequests.$inferSelect;
export type InsertRecruitmentAgreement = z.infer<typeof insertRecruitmentAgreementSchema>;
export type RecruitmentAgreement = typeof recruitmentAgreements.$inferSelect;

// Timesheet management tables
export const timesheetUsers = pgTable("timesheet_users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  role: varchar("role", { length: 20 }).notNull(), // 'contractor' or 'employer'
  companyName: varchar("company_name", { length: 255 }),
  phone: varchar("phone", { length: 20 }),
  password: varchar("password", { length: 255 }).notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const timesheetProjects = pgTable("timesheet_projects", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  employerId: integer("employer_id").references(() => timesheetUsers.id),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const contractorAssignments = pgTable("contractor_assignments", {
  id: serial("id").primaryKey(),
  contractorId: integer("contractor_id").references(() => timesheetUsers.id),
  projectId: integer("project_id").references(() => timesheetProjects.id),
  hourlyRate: decimal("hourly_rate", { precision: 10, scale: 2 }),
  startDate: date("start_date"),
  endDate: date("end_date"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const timesheets = pgTable("timesheets", {
  id: serial("id").primaryKey(),
  contractorId: integer("contractor_id").references(() => timesheetUsers.id),
  projectId: integer("project_id").references(() => timesheetProjects.id),
  weekStarting: date("week_starting").notNull(),
  periodType: varchar("period_type", { length: 20 }).default("weekly"), // 'weekly', 'monthly'
  rateType: varchar("rate_type", { length: 20 }).default("hourly"), // 'hourly', 'daily'
  totalHours: decimal("total_hours", { precision: 8, scale: 2 }),
  totalDays: integer("total_days"),
  workDescription: text("work_description"),
  workLocation: varchar("work_location", { length: 255 }),
  department: varchar("department", { length: 255 }),
  jobTitle: varchar("job_title", { length: 255 }),
  supervisorName: varchar("supervisor_name", { length: 255 }),
  supervisorEmail: varchar("supervisor_email", { length: 255 }),
  additionalEmails: text("additional_emails"),
  status: varchar("status", { length: 20 }).default("draft"), // 'draft', 'submitted', 'approved', 'rejected'
  notes: text("notes"),
  contractorSignature: text("contractor_signature"),
  contractorSignedAt: timestamp("contractor_signed_at"),
  supervisorSignature: text("supervisor_signature"),
  signedAt: timestamp("signed_at"),
  approvedBy: integer("approved_by").references(() => timesheetUsers.id),
  approvedAt: timestamp("approved_at"),
  rejectionReason: text("rejection_reason"),
  companyName: varchar("company_name"),
  pdfPath: varchar("pdf_path", { length: 500 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const timesheetEntries = pgTable("timesheet_entries", {
  id: serial("id").primaryKey(),
  timesheetId: integer("timesheet_id").references(() => timesheets.id),
  date: date("date").notNull(),
  startTime: varchar("start_time", { length: 10 }),
  endTime: varchar("end_time", { length: 10 }),
  breakTime: decimal("break_time", { precision: 4, scale: 2 }).default("0"),
  hoursWorked: decimal("hours_worked", { precision: 8, scale: 2 }),
  workDescription: text("work_description"),
  location: varchar("location", { length: 255 }),
});

export const insertTimesheetUserSchema = createInsertSchema(timesheetUsers).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertTimesheetSchema = createInsertSchema(timesheets).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertTimesheetEntrySchema = createInsertSchema(timesheetEntries).omit({
  id: true,
});

export type TimesheetUser = typeof timesheetUsers.$inferSelect;
export type InsertTimesheetUser = z.infer<typeof insertTimesheetUserSchema>;
export type TimesheetProject = typeof timesheetProjects.$inferSelect;
export type InsertTimesheetProject = typeof timesheetProjects.$inferInsert;
export type ContractorAssignment = typeof contractorAssignments.$inferSelect;
export type InsertContractorAssignment = typeof contractorAssignments.$inferInsert;
export type Timesheet = typeof timesheets.$inferSelect;
export type InsertTimesheet = z.infer<typeof insertTimesheetSchema>;
export type TimesheetEntry = typeof timesheetEntries.$inferSelect;
export type InsertTimesheetEntry = z.infer<typeof insertTimesheetEntrySchema>;
