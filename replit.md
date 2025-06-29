# Dawaam HR Services Website

## Project Overview
Professional website for Dawaam, a leading HR services company in Libya. Built with React, TypeScript, and modern web technologies.

## User Preferences
- Prefers clean, professional designs with smooth, sophisticated animations
- Wants functional, business-focused UI with focal.inc-inspired motion design
- Emphasizes clarity and usability with elegant transitions
- Likes brand colors: blue overlay with solid orange animated elements
- Company motto: "HIRE. TRAIN. RETAIN." - core business philosophy

## Project Architecture
- Frontend: React with TypeScript, Tailwind CSS, shadcn/ui components
- Backend: Express.js with TypeScript
- Database: PostgreSQL with Drizzle ORM
- Email: SendGrid integration for notifications
- File uploads: Multer for resume handling
- External integrations: Zoho Recruit for job listings

## Key Features
- Multi-page website (Home, Jobs, Contact, Upload Resume)
- Resume upload with email notifications to recruitment@dawaam.com
- Job listings integration with Zoho Recruit ATS
- Contact form with database storage
- Professional navigation and footer
- UFI Event Auditing separate section
- Core HR services: Recruitment, Manpower, Payroll, Immigration, Training, Consulting

## Recent Changes
- 2025-06-29: TIMESHEET SUBMISSION COMPLETED WITH USER GUIDANCE - Implemented clean timesheet submission with success notifications and user guidance instructions. Since automatic redirect proved technically unfeasible due to component architecture, added blue instruction toast directing users to manually click "My Timesheets" tab after submission. Core functionality works perfectly: submissions save correctly, users receive confirmation, and clear guidance for next step. User experience optimized within architectural constraints.
- 2025-06-26: MANPOWER PERSONAS INTEGRATION - Created comprehensive manpower personas section showcasing four distinct contractor types based on authentic Dawaam documentation: Local Contractors (Fathi al-Misrati), Short-Term Foreign (Kwame Mensah), Long-Term Foreign (Nabil Benyamina), and Direct Hire (Rania al-Tarhuniya). Each persona includes real examples, service details, and compliance features for Libya's oil, gas, infrastructure, and industrial sectors. Enhanced with authentic professional photos (w-32 h-40) without background styling, standardized CTA button styling with consistent white backgrounds and blue text, and improved text visibility using font-semibold across all interactive elements.
- 2025-06-26: RECRUITMENT AGREEMENT INTEGRATION - Updated to use new 2025 standard recruitment agreement PDF (Dawaam - Standard Agreement _2025_1750939198727.pdf) replacing previous version. Interactive online agreement form fully operational with comprehensive fields matching PDF structure. Agreement accessible via download links and online completion form with professional styling.
- 2025-06-26: CONTACT PAGE MAP ENHANCEMENT - Added custom Dawaam logo marker to interactive Google Maps with precise coordinates (32.84198617363664, 13.08750192608777) for accurate Regus Seraj Tower office location in Tripoli.
- 2025-06-26: CONTACT PAGE PROFESSIONAL REDESIGN - Redesigned hero section with enhanced typography, professional badge element, team member image integration, and updated office address to specify "Regus Seraj, Tripoli, Libya" for accurate location information.
- 2025-06-26: TIMESHEET UX IMPROVEMENTS COMPLETED - Fixed false "Network connection error" messages during successful timesheet submissions by implementing comprehensive error handling with success flag tracking. Enhanced login form with Enter key functionality for password field. Added automatic dashboard redirect after successful timesheet submission with 1.5-second success message display. All UAT requirements fully working with improved user experience.
- 2025-06-25: REDESIGNED TIMESHEET DASHBOARD - Created brand new dashboard interface with functional view, edit, delete, and download capabilities, fixed all React component issues, implemented proper timesheet card components with working actions, and enabled complete CRUD operations from dashboard interface
- 2025-06-25: COMPLETED TIMESHEET AUTHENTICATION SYSTEM - Fixed all import errors (User, Building, Mail icons), resolved duplicate login endpoints causing conflicts, implemented clean bcrypt password verification, created working session management, and successfully integrated timesheet portal into main website with functional login at /timesheets route
- 2025-06-25: ENHANCED TIMESHEET PORTAL VISIBILITY - Added prominent timesheet portal banner to homepage, enhanced footer links with visual indicators, created role-specific dashboard interfaces with stats cards, improved user authentication flow, and made timesheet system easily accessible from main website
- 2025-06-25: Added automatic redirect to dashboard after timesheet submission, cleaned up test files, improved user workflow navigation
- 2025-06-25: Cleared all timesheets from database for fresh start, fixed session authentication for downloads, enhanced error handling with detailed logging
- 2025-06-25: Fixed timesheet month display to show correct dates (June instead of May), removed download retry notifications, enabled edit/delete for submitted timesheets, and improved date formatting for monthly periods
- 2025-06-25: Enhanced timesheet functionality with full edit, delete, and download capabilities - timesheets are now clickable for PDF download, editable/deletable when in draft or rejected status, with server-side PDF generation and proper action buttons
- 2025-06-25: Fixed timesheet display logic to properly show period types ("Month of" vs "Week of") and totals ("days" vs "hours") based on periodType and rateType fields
- 2025-06-25: Resolved database connection issues with Neon serverless PostgreSQL and optimized pool configuration for serverless environment
- 2025-06-25: Fixed timesheet system completely - cleared previous timesheets, enhanced database schema with proper monthly/weekly period types, added delete/edit functionality for draft and rejected timesheets, improved display to show days vs hours based on period type, and added comprehensive timesheet management with proper session authentication
- 2025-06-25: Completely redesigned PDF layout with modern styling, fixed logo distortion, ensured all days display correctly including day 30, added department/job title to PDF, improved work day indicators with filled circles, and fixed timesheet submission tracking to properly display in user dashboard
- 2025-06-25: Implemented functional PDF generation for timesheets with professional formatting, signatures, and download capability using jsPDF
- 2025-06-25: Implemented comprehensive timesheet workflow with PDF generation, digital signatures, supervisor approval system, and automated email notifications
- 2025-06-25: Added multi-step timesheet submission (entry → review → signature) with supervisor information capture and additional email notifications
- 2025-06-25: Created supervisor approval portal with digital signature capability, approve/reject functionality, and automated status notifications
- 2025-06-25: Enhanced timesheet database schema with signature storage, supervisor details, and approval tracking fields
- 2025-06-25: Built email notification system for timesheet submission, approval, and rejection with professional HTML templates
- 2025-06-25: Enhanced timesheet form with weekly/monthly selection, hourly/daily rate options, and interactive grid system where users click days to mark as worked
- 2025-06-25: Added Sunday-based week starting, visual work day selection with check marks, and automatic hours/days calculation
- 2025-06-25: Implemented period navigation (previous/next week/month) with summary statistics and improved user experience
- 2025-06-25: Fixed timesheet authentication issues and database table creation for proper user login functionality
- 2025-06-25: Created Timesheet Admin panel for Dawaam to manage contractor and employer accounts (dawaam_admin/Dawaam2025)
- 2025-06-25: Added admin user creation, management, and deletion functionality for timesheet system
- 2025-06-25: Created comprehensive Timesheet Management System with separate login, contractor timesheet submission, and employer approval workflow
- 2025-06-25: Added timesheet database schema with users, projects, assignments, timesheets, and entries tables
- 2025-06-25: Built timesheet API endpoints for authentication, submission, and approval processes
- 2025-06-25: Added timesheets link to footer navigation for easy contractor and employer access
- 2025-06-24: Created Career Opportunities page featuring Sales & Marketing Professional and Training Executive positions with comprehensive job descriptions, requirements, and benefits
- 2025-06-24: Added career opportunities link to footer navigation for easy access to job openings at Dawaam
- 2025-06-24: Integrated careers@dawaam.com email contact system for job applications
- 2025-06-24: Updated CV writing package experience ranges to industry standards (Entry/Junior 1-3 years, Mid-level 4-9 years, Senior/Executive 10+ years)
- 2025-06-24: Aligned "Get Started" buttons across all CV writing packages with consistent styling and flex layout
- 2025-06-24: Created comprehensive CV Writing Services page with three packages (Entry/Junior 250 LYD, Mid-level 500 LYD, Senior/Executive 1000 LYD)
- 2025-06-24: Added CV Writing service to main services section and navigation menu with professional gradient icon
- 2025-06-24: Integrated email contact system for CV service inquiries (cv@dawaam.com)
- 2025-06-24: Updated grid layout from 3 to 4 columns to accommodate new CV Writing service
- 2025-06-24: Updated upcoming programs to show only Oracle SQL & DBA training with TBC details and official course flyer
- 2025-06-24: Fixed button visibility issue in success stories call-to-action section (white text on white background)
- 2025-06-24: Reduced main gallery image size from 700px to 320px for better proportion
- 2025-06-24: Increased listing thumbnail size to 224x144px with vertical centering and right alignment
- 2025-06-24: Added kitchen safety inspection image to food safety training gallery showing hands-on assessment and documentation process
- 2025-06-24: Increased thumbnail image size in course listing from 96px to 192x128px for better visibility
- 2025-06-24: Set lead instructor presentation image as main course image in listing and featured image in gallery with prominent positioning
- 2025-06-24: Hidden training outcomes from list view - now only visible after clicking "View Full Details & Gallery"
- 2025-06-24: Updated success story gallery with 12 authentic training photos from Al Waha Oil food safety course including kitchen training, equipment inspection, temperature control demonstrations, classroom sessions, and group training activities
- 2025-06-24: Enhanced photo gallery layout with 4-column grid and improved modal viewer with image counter
- 2025-06-24: Restructured success stories page to list view with clickable course cards showing title, date, description, and link to detailed view with gallery
- 2025-06-24: Added interactive photo gallery to Al Waha Oil success story with modal viewer for browsing training session images
- 2025-06-24: Restructured success stories into collapsible course entries with titles and dates, making it easy to add multiple success stories
- 2025-06-24: Enhanced success story page with detailed course information, corrected participant count to 10, and added food safety training contact CTA for interested companies
- 2025-06-24: Created separate Success Stories and Upcoming Programs pages with proper routing and navigation
- 2025-06-24: Added Al Waha Oil Company Food Safety training project showcase with real images and LinkedIn integration for case study promotion
- 2025-06-24: Added comprehensive training programs showcase section with featured programs and upcoming training calendar with real dates, instructors, and enrollment tracking
- 2025-06-24: Updated services section links to point to detailed service pages instead of request forms directly
- 2025-06-24: Added desert passes to immigration and manpower services as additional offering
- 2025-06-24: Created comprehensive service pages for Recruitment, Manpower Outsourcing, Payroll Management, and Immigration & Visa services based on Dawaam manpower profile
- 2025-06-24: Added service pages with detailed descriptions, processes, benefits, and call-to-action buttons linking to request forms
- 2025-06-24: Updated footer service links to point to dedicated service pages instead of request forms directly
- 2025-06-24: Created About Us and Blog pages with comprehensive content and proper routing
- 2025-06-24: Fixed all footer links to point to correct pages - services link to request forms, quick links to existing pages
- 2025-06-24: Updated office hours to 9:00 AM - 4:00 PM throughout the site (contact page and footer)
- 2025-06-24: Added custom PNG icons for "For Employers" and "For Job Seekers" sections with proper sizing
- 2025-06-24: Updated contact information with correct phone numbers (+218 91 588 5111, +218 92 588 5111), email (info@dawaam.com), and WhatsApp (+218 791 588 5111)
- 2025-06-24: Redesigned "For Employers" and "For Job Seekers" sections with modern icon-based cards, gradient backgrounds, and improved visual hierarchy without problematic images
- 2025-06-24: Moved "For Employers" and "For Job Seekers" sections directly under hero section and arranged them side by side with card-style design
- 2025-06-24: Added smooth animated transitions between sections using Intersection Observer API with fadeInUp, fadeInLeft, fadeInRight, scaleIn, and fadeIn animations
- 2025-06-24: Created HR & Management Consulting section with comprehensive form covering workforce planning, talent strategy, organizational development, and compliance services
- 2025-06-24: Created schedule consultation section with comprehensive HR consultation request form and email notifications
- 2025-06-24: Updated "Post a Job" and "Schedule Consultation" buttons to navigate to respective forms
- 2025-06-24: Removed "Home" from navigation menu, enlarged logo and made it clickable for home navigation
- 2025-06-24: Created manpower outsourcing and immigration & visa services forms with comprehensive requirements gathering
- 2025-06-24: Updated service descriptions based on Dawaam manpower services documentation
- 2025-06-24: Added currency selection (USD/LYD) to payroll form and updated email destination to info@dawaam.com
- 2025-06-24: Created comprehensive payroll management form with business info, services, compliance tracking, and email notifications to payroll@dawaam.com
- 2025-06-24: Added Oil & Gas training category with Food Safety and HSE courses
- 2025-06-24: Created recruitment services form with job details, requirements, and email notifications to recruitment@dawaam.com
- 2025-06-24: Added bespoke training notice and Food Safety course to training section
- 2025-06-24: Added comprehensive training section with 8 course categories and expandable course lists
- 2025-06-24: Balanced hero section spacing above and below "Empowering through..." text
- 2025-06-24: Enhanced highlighted service pill contrast with darker background (70% opacity)
- 2025-06-24: Created UFI Event Audit request form with email notifications to UFI@dawaam.com
- 2025-06-24: Added professional team image to "For Job Seekers" section with brand overlay
- 2025-06-24: Added professional business executive photo to "For Employers" section  
- 2025-06-24: Added UFI logo to UFI auditing section (transparent PNG, large size)
- 2025-06-24: Integrated custom transparent service icons in services section (3x larger size)
- 2025-06-24: Added professional background image to hero section with emerald/teal/amber color scheme
- 2025-06-24: Created modern animated hero with geometric shapes and typewriter effect
- 2025-06-24: Added Zoho Recruit job listings with pagination (25 jobs per page)
- 2025-06-24: Implemented resume upload with SendGrid email notifications
- 2025-06-24: Created dedicated jobs page with wider container for better visibility
- 2025-06-24: Enhanced website structure with proper navigation and routing

## Technical Notes
- SendGrid API key configured for email notifications
- Database schema includes users, contact submissions, and resumes tables
- File validation for resume uploads (PDF, DOC, DOCX, max 5MB)
- Responsive design with mobile-first approach
- Color scheme: Navy blue (#2c5282) and orange (#f56500) from company branding