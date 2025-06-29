import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import { storage } from './storage';

declare module 'express-session' {
  interface SessionData {
    timesheetUser?: {
      id: number;
      email: string;
      firstName: string;
      lastName: string;
      role: string;
      companyName?: string;
      department?: string;
      phone?: string;
      supervisorId?: number;
      isActive: boolean;
      createdAt: string;
      updatedAt: string;
    };
  }
}

export interface TimesheetUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: 'contractor' | 'supervisor' | 'admin';
  companyName?: string;
  department?: string;
  phone?: string;
  supervisorId?: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export async function authenticateTimesheetUser(email: string, password: string): Promise<TimesheetUser | null> {
  try {
    console.log(`Authenticating user: ${email}`);
    const user = await storage.getTimesheetUserByEmail(email);
    if (!user) {
      console.log(`User not found: ${email}`);
      return null;
    }
    
    console.log(`User found: ${user.email}, Active: ${user.isActive}`);
    if (!user.isActive) {
      console.log(`User inactive: ${email}`);
      return null;
    }

    console.log(`Verifying password for user: ${email}`);
    console.log(`Stored hash: ${user.password.substring(0, 20)}...`);
    const isValidPassword = await verifyPassword(password, user.password);
    console.log(`Password valid: ${isValidPassword}`);
    
    if (!isValidPassword) {
      return null;
    }

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword as TimesheetUser;
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
}

export function requireTimesheetAuth(req: Request, res: Response, next: NextFunction) {
  console.log('Session check:', req.session);
  
  if (!req.session.timesheetUser) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  console.log('Timesheet user:', req.session.timesheetUser);
  next();
}

export function requireRole(roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.session.timesheetUser;
    
    if (!user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    if (!roles.includes(user.role)) {
      return res.status(403).json({ message: 'Insufficient permissions' });
    }

    next();
  };
}

export async function createTimesheetUser(userData: {
  email: string;
  firstName: string;
  lastName: string;
  role: 'contractor' | 'supervisor' | 'admin';
  password: string;
  companyName?: string;
  department?: string;
  phone?: string;
  supervisorId?: number;
}): Promise<TimesheetUser> {
  const hashedPassword = await hashPassword(userData.password);
  
  const user = await storage.createTimesheetUser({
    ...userData,
    password: hashedPassword,
  });

  // Return user without password
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword as TimesheetUser;
}

export function getSessionUser(req: Request): TimesheetUser | null {
  return req.session.timesheetUser || null;
}

export async function refreshUserSession(req: Request): Promise<void> {
  if (req.session.timesheetUser) {
    const updatedUser = await storage.getTimesheetUserById(req.session.timesheetUser.id);
    if (updatedUser && updatedUser.isActive) {
      const { password: _, ...userWithoutPassword } = updatedUser;
      req.session.timesheetUser = userWithoutPassword as any;
    } else {
      req.session.timesheetUser = undefined;
    }
  }
}