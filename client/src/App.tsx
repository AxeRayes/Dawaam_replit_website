import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Contact from "@/pages/contact";
import Training from "@/pages/training";
import UploadResume from "@/pages/upload-resume";
import Jobs from "@/pages/jobs";
import RequestAudit from "@/pages/request-audit";
import RecruitmentRequest from "@/pages/recruitment-request";
import RecruitmentAgreement from "@/pages/recruitment-agreement";
import PayrollRequest from "@/pages/payroll-request";
import ManpowerRequest from "@/pages/manpower-request";
import ImmigrationRequest from "@/pages/immigration-request";
import ScheduleConsultation from "@/pages/schedule-consultation";
import HRConsulting from "@/pages/hr-consulting";
import About from "@/pages/about";
import Blog from "@/pages/blog";
import RecruitmentServices from "@/pages/recruitment-services";
import ManpowerServices from "@/pages/manpower-services";
import ManpowerPersonas from "@/pages/manpower-personas";
import PayrollServices from "@/pages/payroll-services";
import ImmigrationServices from "@/pages/immigration-services";
import SuccessStories from "@/pages/success-stories";
import UpcomingPrograms from "@/pages/upcoming-programs";
import CVWriting from "@/pages/cv-writing";
import CareerOpportunities from "@/pages/career-opportunities";
import TimesheetsNew from "@/pages/timesheets-new";
import TimesheetAdmin from "@/pages/timesheet-admin";
import SupervisorApproval from "@/pages/supervisor-approval";

function Router() {
  useScrollToTop();
  
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/contact" component={Contact} />
      <Route path="/training" component={Training} />
      <Route path="/upload-resume" component={UploadResume} />
      <Route path="/jobs" component={Jobs} />
      <Route path="/request-audit" component={RequestAudit} />
      <Route path="/recruitment-request" component={RecruitmentRequest} />
      <Route path="/recruitment-agreement" component={RecruitmentAgreement} />
      <Route path="/payroll-request" component={PayrollRequest} />
      <Route path="/manpower-request" component={ManpowerRequest} />
      <Route path="/immigration-request" component={ImmigrationRequest} />
      <Route path="/schedule-consultation" component={ScheduleConsultation} />
      <Route path="/hr-consulting" component={HRConsulting} />
      <Route path="/about" component={About} />
      <Route path="/blog" component={Blog} />
      <Route path="/recruitment-services" component={RecruitmentServices} />
      <Route path="/manpower-services" component={ManpowerServices} />
      <Route path="/manpower-personas" component={ManpowerPersonas} />
      <Route path="/payroll-services" component={PayrollServices} />
      <Route path="/immigration-services" component={ImmigrationServices} />
      <Route path="/success-stories" component={SuccessStories} />
      <Route path="/upcoming-programs" component={UpcomingPrograms} />
      <Route path="/cv-writing" component={CVWriting} />
      <Route path="/career-opportunities" component={CareerOpportunities} />
      <Route path="/timesheets" component={TimesheetsNew} />
      <Route path="/timesheet-admin" component={TimesheetAdmin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
