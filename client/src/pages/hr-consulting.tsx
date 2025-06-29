import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import BackToTop from "@/components/back-to-top";
import { Users, TrendingUp, FileText, BarChart3, ShieldCheck, Target } from "lucide-react";

const hrConsultingSchema = z.object({
  // Company Information
  companyName: z.string().min(2, "Company name is required"),
  contactPerson: z.string().min(2, "Contact person is required"),
  jobTitle: z.string().min(2, "Job title is required"),
  contactEmail: z.string().email("Valid email is required"),
  contactPhone: z.string().min(10, "Phone number is required"),
  
  // Company Details
  industry: z.string().min(2, "Industry is required"),
  companySize: z.string().min(1, "Company size is required"),
  businessModel: z.string().min(2, "Business model is required"),
  currentHRStructure: z.string().min(1, "Current HR structure is required"),
  
  // Consulting Services
  workforcePlanning: z.boolean().default(false),
  talentStrategy: z.boolean().default(false),
  compensationAnalysis: z.boolean().default(false),
  performanceManagement: z.boolean().default(false),
  organizationalDevelopment: z.boolean().default(false),
  policyDevelopment: z.boolean().default(false),
  complianceAssessment: z.boolean().default(false),
  changeManagement: z.boolean().default(false),
  leadershipDevelopment: z.boolean().default(false),
  cultureTransformation: z.boolean().default(false),
  
  // Project Details
  projectScope: z.enum(["assessment", "strategy", "implementation", "ongoing"]),
  projectTimeline: z.enum(["1_month", "3_months", "6_months", "12_months", "ongoing"]),
  projectBudget: z.string().optional(),
  budgetCurrency: z.enum(["USD", "LYD"]).default("LYD"),
  
  // Current Challenges
  currentChallenges: z.string().min(10, "Please describe your current challenges"),
  specificObjectives: z.string().min(10, "Please describe your specific objectives"),
  successMetrics: z.string().optional(),
  stakeholders: z.string().optional(),
  
  // Additional Information
  previousConsulting: z.boolean().default(false),
  urgency: z.enum(["immediate", "month", "quarter", "flexible"]),
  additionalNotes: z.string().optional(),
});

type HRConsultingFormData = z.infer<typeof hrConsultingSchema>;

export default function HRConsulting() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<HRConsultingFormData>({
    resolver: zodResolver(hrConsultingSchema),
    defaultValues: {
      companyName: "",
      contactPerson: "",
      jobTitle: "",
      contactEmail: "",
      contactPhone: "",
      industry: "",
      companySize: "",
      businessModel: "",
      currentHRStructure: "",
      workforcePlanning: false,
      talentStrategy: false,
      compensationAnalysis: false,
      performanceManagement: false,
      organizationalDevelopment: false,
      policyDevelopment: false,
      complianceAssessment: false,
      changeManagement: false,
      leadershipDevelopment: false,
      cultureTransformation: false,
      projectScope: "assessment",
      projectTimeline: "3_months",
      projectBudget: "",
      budgetCurrency: "LYD",
      currentChallenges: "",
      specificObjectives: "",
      successMetrics: "",
      stakeholders: "",
      previousConsulting: false,
      urgency: "flexible",
      additionalNotes: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: HRConsultingFormData) => {
      setIsSubmitting(true);
      return await apiRequest("/api/hr-consulting-request", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      toast({
        title: "Consulting Request Submitted",
        description: "Your HR consulting request has been sent to our experts. We'll contact you within 24 hours.",
      });
      form.reset();
      setIsSubmitting(false);
    },
    onError: (error: any) => {
      console.error("Submission error:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    },
  });

  const onSubmit = (data: HRConsultingFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Header */}
      <section className="py-16 bg-gradient-to-br from-[hsl(211,74%,32%)] to-blue-600">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            HR & Management Consulting
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Strategic HR advisory services to optimize your human resources practices. Deep understanding of labor market and industry trends for tailored solutions.
          </p>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="text-center p-6">
              <Users className="w-12 h-12 text-[hsl(211,74%,32%)] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Workforce Planning</h3>
              <p className="text-gray-600">Strategic planning for optimal workforce allocation and development</p>
            </div>
            <div className="text-center p-6">
              <TrendingUp className="w-12 h-12 text-[hsl(211,74%,32%)] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Talent Strategy</h3>
              <p className="text-gray-600">Comprehensive talent acquisition and retention strategies</p>
            </div>
            <div className="text-center p-6">
              <BarChart3 className="w-12 h-12 text-[hsl(211,74%,32%)] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Compensation Analysis</h3>
              <p className="text-gray-600">Market-based compensation and benefits optimization</p>
            </div>
            <div className="text-center p-6">
              <Target className="w-12 h-12 text-[hsl(211,74%,32%)] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Performance Management</h3>
              <p className="text-gray-600">Systems and processes for effective performance evaluation</p>
            </div>
            <div className="text-center p-6">
              <FileText className="w-12 h-12 text-[hsl(211,74%,32%)] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Policy Development</h3>
              <p className="text-gray-600">HR policies and procedures aligned with best practices</p>
            </div>
            <div className="text-center p-6">
              <ShieldCheck className="w-12 h-12 text-[hsl(211,74%,32%)] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Compliance Assessment</h3>
              <p className="text-gray-600">Ensuring adherence to labor laws and regulations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              {/* Company Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-900">Company Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="companyName">Company Name *</Label>
                      <Input
                        id="companyName"
                        {...form.register("companyName")}
                        className="mt-1"
                      />
                      {form.formState.errors.companyName && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.companyName.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="contactPerson">Contact Person *</Label>
                      <Input
                        id="contactPerson"
                        {...form.register("contactPerson")}
                        className="mt-1"
                      />
                      {form.formState.errors.contactPerson && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.contactPerson.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="jobTitle">Job Title *</Label>
                      <Input
                        id="jobTitle"
                        {...form.register("jobTitle")}
                        className="mt-1"
                        placeholder="e.g., CEO, HR Director, Operations Manager"
                      />
                      {form.formState.errors.jobTitle && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.jobTitle.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="contactEmail">Email Address *</Label>
                      <Input
                        id="contactEmail"
                        type="email"
                        {...form.register("contactEmail")}
                        className="mt-1"
                      />
                      {form.formState.errors.contactEmail && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.contactEmail.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="contactPhone">Phone Number *</Label>
                      <Input
                        id="contactPhone"
                        {...form.register("contactPhone")}
                        className="mt-1"
                      />
                      {form.formState.errors.contactPhone && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.contactPhone.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="industry">Industry *</Label>
                      <Input
                        id="industry"
                        {...form.register("industry")}
                        className="mt-1"
                        placeholder="e.g., Oil & Gas, Banking, Manufacturing"
                      />
                      {form.formState.errors.industry && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.industry.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="companySize">Company Size *</Label>
                      <Select value={form.watch("companySize")} onValueChange={(value) => form.setValue("companySize", value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select company size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-10">1-10 employees</SelectItem>
                          <SelectItem value="11-50">11-50 employees</SelectItem>
                          <SelectItem value="51-200">51-200 employees</SelectItem>
                          <SelectItem value="201-500">201-500 employees</SelectItem>
                          <SelectItem value="500+">500+ employees</SelectItem>
                        </SelectContent>
                      </Select>
                      {form.formState.errors.companySize && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.companySize.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="businessModel">Business Model *</Label>
                      <Input
                        id="businessModel"
                        {...form.register("businessModel")}
                        className="mt-1"
                        placeholder="e.g., B2B, B2C, Manufacturing, Services"
                      />
                      {form.formState.errors.businessModel && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.businessModel.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="currentHRStructure">Current HR Structure *</Label>
                    <Select value={form.watch("currentHRStructure")} onValueChange={(value) => form.setValue("currentHRStructure", value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select current HR structure" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="no_hr">No dedicated HR</SelectItem>
                        <SelectItem value="hr_generalist">HR Generalist</SelectItem>
                        <SelectItem value="hr_team">Small HR Team</SelectItem>
                        <SelectItem value="hr_department">Full HR Department</SelectItem>
                        <SelectItem value="outsourced">Outsourced HR</SelectItem>
                      </SelectContent>
                    </Select>
                    {form.formState.errors.currentHRStructure && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.currentHRStructure.message}</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Consulting Services */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-900">Consulting Services Needed</CardTitle>
                  <p className="text-gray-600">Select all services you're interested in</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Strategic HR Services</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="workforcePlanning"
                          checked={form.watch("workforcePlanning")}
                          onCheckedChange={(checked) => form.setValue("workforcePlanning", !!checked)}
                        />
                        <Label htmlFor="workforcePlanning">Workforce Planning & Analytics</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="talentStrategy"
                          checked={form.watch("talentStrategy")}
                          onCheckedChange={(checked) => form.setValue("talentStrategy", !!checked)}
                        />
                        <Label htmlFor="talentStrategy">Talent Strategy & Acquisition</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="compensationAnalysis"
                          checked={form.watch("compensationAnalysis")}
                          onCheckedChange={(checked) => form.setValue("compensationAnalysis", !!checked)}
                        />
                        <Label htmlFor="compensationAnalysis">Compensation & Benefits Analysis</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="performanceManagement"
                          checked={form.watch("performanceManagement")}
                          onCheckedChange={(checked) => form.setValue("performanceManagement", !!checked)}
                        />
                        <Label htmlFor="performanceManagement">Performance Management Systems</Label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Organizational Development</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="organizationalDevelopment"
                          checked={form.watch("organizationalDevelopment")}
                          onCheckedChange={(checked) => form.setValue("organizationalDevelopment", !!checked)}
                        />
                        <Label htmlFor="organizationalDevelopment">Organizational Design & Development</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="changeManagement"
                          checked={form.watch("changeManagement")}
                          onCheckedChange={(checked) => form.setValue("changeManagement", !!checked)}
                        />
                        <Label htmlFor="changeManagement">Change Management</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="leadershipDevelopment"
                          checked={form.watch("leadershipDevelopment")}
                          onCheckedChange={(checked) => form.setValue("leadershipDevelopment", !!checked)}
                        />
                        <Label htmlFor="leadershipDevelopment">Leadership Development</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="cultureTransformation"
                          checked={form.watch("cultureTransformation")}
                          onCheckedChange={(checked) => form.setValue("cultureTransformation", !!checked)}
                        />
                        <Label htmlFor="cultureTransformation">Culture Transformation</Label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Compliance & Policy</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="policyDevelopment"
                          checked={form.watch("policyDevelopment")}
                          onCheckedChange={(checked) => form.setValue("policyDevelopment", !!checked)}
                        />
                        <Label htmlFor="policyDevelopment">HR Policy Development</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="complianceAssessment"
                          checked={form.watch("complianceAssessment")}
                          onCheckedChange={(checked) => form.setValue("complianceAssessment", !!checked)}
                        />
                        <Label htmlFor="complianceAssessment">Compliance Assessment</Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Project Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-900">Project Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label>Project Scope *</Label>
                      <RadioGroup
                        value={form.watch("projectScope")}
                        onValueChange={(value) => form.setValue("projectScope", value as any)}
                        className="mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="assessment" id="assessment" />
                          <Label htmlFor="assessment">Assessment & Recommendations</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="strategy" id="strategy" />
                          <Label htmlFor="strategy">Strategy Development</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="implementation" id="implementation" />
                          <Label htmlFor="implementation">Full Implementation</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="ongoing" id="ongoing" />
                          <Label htmlFor="ongoing">Ongoing Advisory</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label>Project Timeline *</Label>
                      <RadioGroup
                        value={form.watch("projectTimeline")}
                        onValueChange={(value) => form.setValue("projectTimeline", value as any)}
                        className="mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="1_month" id="1_month" />
                          <Label htmlFor="1_month">1 Month</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="3_months" id="3_months" />
                          <Label htmlFor="3_months">3 Months</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="6_months" id="6_months" />
                          <Label htmlFor="6_months">6 Months</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="12_months" id="12_months" />
                          <Label htmlFor="12_months">12 Months</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="ongoing" id="ongoing_timeline" />
                          <Label htmlFor="ongoing_timeline">Ongoing Relationship</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="projectBudget">Project Budget</Label>
                      <div className="flex gap-2 mt-1">
                        <Input
                          id="projectBudget"
                          {...form.register("projectBudget")}
                          className="flex-1"
                          placeholder="e.g., 25,000"
                        />
                        <Select value={form.watch("budgetCurrency")} onValueChange={(value) => form.setValue("budgetCurrency", value as any)}>
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="LYD">LYD</SelectItem>
                            <SelectItem value="USD">USD</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label>Urgency *</Label>
                      <RadioGroup
                        value={form.watch("urgency")}
                        onValueChange={(value) => form.setValue("urgency", value as any)}
                        className="mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="immediate" id="immediate" />
                          <Label htmlFor="immediate">Immediate (Start ASAP)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="month" id="month" />
                          <Label htmlFor="month">Within a month</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="quarter" id="quarter" />
                          <Label htmlFor="quarter">Within a quarter</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="flexible" id="flexible" />
                          <Label htmlFor="flexible">Flexible timing</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Project Requirements */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-900">Project Requirements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="currentChallenges">Current HR Challenges *</Label>
                    <Textarea
                      id="currentChallenges"
                      {...form.register("currentChallenges")}
                      className="mt-1 h-32"
                      placeholder="Describe the specific HR challenges your organization is facing..."
                    />
                    {form.formState.errors.currentChallenges && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.currentChallenges.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="specificObjectives">Specific Objectives *</Label>
                    <Textarea
                      id="specificObjectives"
                      {...form.register("specificObjectives")}
                      className="mt-1 h-32"
                      placeholder="What specific outcomes do you want to achieve through this consulting engagement?"
                    />
                    {form.formState.errors.specificObjectives && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.specificObjectives.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="successMetrics">Success Metrics</Label>
                    <Textarea
                      id="successMetrics"
                      {...form.register("successMetrics")}
                      className="mt-1 h-24"
                      placeholder="How will you measure the success of this project? (e.g., retention rates, productivity metrics, cost savings)"
                    />
                  </div>

                  <div>
                    <Label htmlFor="stakeholders">Key Stakeholders</Label>
                    <Textarea
                      id="stakeholders"
                      {...form.register("stakeholders")}
                      className="mt-1 h-24"
                      placeholder="Who are the key stakeholders involved in this project? (roles, departments, decision makers)"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="previousConsulting"
                      checked={form.watch("previousConsulting")}
                      onCheckedChange={(checked) => form.setValue("previousConsulting", !!checked)}
                    />
                    <Label htmlFor="previousConsulting">We have worked with HR consultants before</Label>
                  </div>

                  <div>
                    <Label htmlFor="additionalNotes">Additional Notes</Label>
                    <Textarea
                      id="additionalNotes"
                      {...form.register("additionalNotes")}
                      className="mt-1 h-24"
                      placeholder="Any additional information that would help us understand your needs..."
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <div className="text-center">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-[hsl(211,74%,32%)] to-blue-600 text-white px-12 py-3 text-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  {isSubmitting ? "Submitting..." : "Request HR Consulting"}
                </Button>
                <p className="text-gray-600 mt-4">
                  Our HR consulting experts will review your request and contact you within 24 hours to discuss your project in detail.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
      <BackToTop />
    </div>
  );
}