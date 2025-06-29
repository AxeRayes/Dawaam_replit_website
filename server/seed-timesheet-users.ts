// Temporary script to create demo timesheet users
import { db } from "./db";
import { timesheetUsers } from "@shared/schema";

async function seedTimesheetUsers() {
  try {
    // Create demo contractor
    const contractor = await db.insert(timesheetUsers).values({
      email: "contractor@demo.com",
      firstName: "John",
      lastName: "Smith",
      role: "contractor",
      companyName: "Independent Contractor",
      phone: "+218 91 123 4567",
      password: "demo123", // In production, this should be hashed
    }).returning();

    // Create demo employer
    const employer = await db.insert(timesheetUsers).values({
      email: "employer@demo.com",
      firstName: "Sarah",
      lastName: "Johnson",
      role: "employer",
      companyName: "ABC Construction Ltd",
      phone: "+218 91 987 6543",
      password: "demo123", // In production, this should be hashed
    }).returning();

    console.log("Demo users created:");
    console.log("Contractor:", contractor[0]);
    console.log("Employer:", employer[0]);
    console.log("\nLogin credentials:");
    console.log("Contractor: contractor@demo.com / demo123");
    console.log("Employer: employer@demo.com / demo123");
    
  } catch (error) {
    console.error("Error seeding users:", error);
  }
}

seedTimesheetUsers();