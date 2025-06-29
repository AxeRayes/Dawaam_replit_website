import { storage } from './storage';
import { createTimesheetUser } from './timesheet-auth';

async function createAdminUser() {
  try {
    // Check if admin already exists
    const existingAdmin = await storage.getTimesheetUserByEmail('admin@dawaam.com');
    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    // Create admin user
    const adminUser = await createTimesheetUser({
      email: 'admin@dawaam.com',
      firstName: 'Dawaam',
      lastName: 'Admin',
      role: 'admin',
      password: 'DawaamAdmin2025',
      companyName: 'Dawaam - Manpower Services',
      department: 'Administration',
      phone: '+218 91 588 5111',
    });

    console.log('Admin user created successfully:', adminUser.email);

    // Create test supervisor
    const supervisorUser = await createTimesheetUser({
      email: 'supervisor@dawaam.com',
      firstName: 'John',
      lastName: 'Supervisor',
      role: 'supervisor',
      password: 'Supervisor2025',
      companyName: 'Dawaam - Manpower Services',
      department: 'Operations',
      phone: '+218 92 588 5111',
    });

    console.log('Supervisor user created successfully:', supervisorUser.email);

    // Create test contractor
    const contractorUser = await createTimesheetUser({
      email: 'contractor@dawaam.com',
      firstName: 'James',
      lastName: 'Brown',
      role: 'contractor',
      password: 'Contractor2025',
      companyName: 'Mela Ltd',
      department: 'HSE',
      phone: '+218 91 123 4567',
      supervisorId: supervisorUser.id,
    });

    console.log('Contractor user created successfully:', contractorUser.email);

    console.log('\n=== Test Users Created ===');
    console.log('Admin: admin@dawaam.com / DawaamAdmin2025');
    console.log('Supervisor: supervisor@dawaam.com / Supervisor2025');
    console.log('Contractor: contractor@dawaam.com / Contractor2025');
    console.log('========================\n');

  } catch (error) {
    console.error('Error creating admin user:', error);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  createAdminUser().then(() => process.exit(0));
}

export { createAdminUser };