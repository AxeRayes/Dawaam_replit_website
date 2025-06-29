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

const manpowerRequestSchema = z.object({
  // Company Information
  companyName: z.string().min(2, "Company name is required"),
  contactPerson: z.string().min(2, "Contact person is required"),
  contactEmail: z.string().email("Valid email is required"),
  contactPhone: z.string().min(10, "Phone number is required"),
  industry: z.string().min(2, "Industry is required"),
  companySize: z.string().min(1, "Company size is required"),
  
  // Staffing Requirements
  staffingType: z.enum(["contract", "project_based", "seasonal", "peak_workload"]),
  positionsNeeded: z.string().min(1, "Number of positions is required"),
  contractDuration: z.string().min(1, "Contract duration is required"),
  startDate: z.string().min(1, "Start date is required"),
  workLocation: z.string().min(2, "Work location is required"),
  
  // Role Details
  jobTitles: z.string().min(5, "Job titles/roles are required"),
  skillsRequired: z.string().min(10, "Required skills are required"),
  experienceLevel: z.enum(["entry", "mid", "senior", "executive"]),
  educationRequirements: z.string().optional(),
  
  // Services Required
  needsVisa: z.boolean().default(false),
  needsAccommodation: z.boolean().default(false),
  needsTransportation: z.boolean().default(false),
  needsCulturalTraining: z.boolean().default(false),
  needsOnboarding: z.boolean().default(false),
  
  // Compliance & Administration
  localCompliance: z.boolean().default(false),
  payrollManagement: z.boolean().default(false),
  benefitsAdministration: z.boolean().default(false),
  performanceManagement: z.boolean().default(false),
  
  // Budget & Terms
  budgetRange: z.string().optional(),
  currency: z.enum(["USD", "LYD"]).default("LYD"),
  paymentTerms: z.enum(["monthly", "milestone", "completion"]),
  
  // Additional Information
  currentChallenges: z.string().optional(),
  specificRequirements: z.string().optional(),
  additionalNotes: z.string().optional(),
});

type ManpowerRequestFormData = z.infer<typeof manpowerRequestSchema>;

export default function ManpowerRequest() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ManpowerRequestFormData>({
    resolver: zodResolver(manpowerRequestSchema),
    defaultValues: {
      companyName: "",
      contactPerson: "",
      contactEmail: "",
      contactPhone: "",
      industry: "",
      companySize: "",
      staffingType: "contract",
      positionsNeeded: "",
      contractDuration: "",
      startDate: "",
      workLocation: "",
      jobTitles: "",
      skillsRequired: "",
      experienceLevel: "mid",
      educationRequirements: "",
      needsVisa: false,
      needsAccommodation: false,
      needsTransportation: false,
      needsCulturalTraining: false,
      needsOnboarding: false,
      localCompliance: false,
      payrollManagement: false,
      benefitsAdministration: false,
      performanceManagement: false,
      budgetRange: "",
      currency: "LYD",
      paymentTerms: "monthly",
      currentChallenges: "",
      specificRequirements: "",
      additionalNotes: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: ManpowerRequestFormData) => {
      setIsSubmitting(true);
      return await apiRequest("/api/manpower-request", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      toast({
        title: "Request Submitted Successfully",
        description: "Your manpower outsourcing request has been sent to our team. We'll contact you within 24 hours.",
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

  const onSubmit = (data: ManpowerRequestFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Header */}
      <section className="py-16 bg-gradient-to-br from-[hsl(211,74%,32%)] to-blue-600">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Manpower Outsourcing Services
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Strategic contract staffing solutions for project-based, seasonal, and peak workload periods. Let us handle the administrative burden while you focus on your core business.
          </p>
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
                      <Label htmlFor="contactEmail">Contact Email *</Label>
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
                    <div>
                      <Label htmlFor="contactPhone">Contact Phone *</Label>
                      <Input
                        id="contactPhone"
                        {...form.register("contactPhone")}
                        className="mt-1"
                      />
                      {form.formState.errors.contactPhone && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.contactPhone.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="industry">Industry *</Label>
                      <Input
                        id="industry"
                        {...form.register("industry")}
                        className="mt-1"
                        placeholder="e.g., Oil & Gas, Construction, Banking"
                      />
                      {form.formState.errors.industry && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.industry.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="companySize">Company Size *</Label>
                      <Input
                        id="companySize"
                        {...form.register("companySize")}
                        className="mt-1"
                        placeholder="e.g., 50-100 employees"
                      />
                      {form.formState.errors.companySize && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.companySize.message}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Staffing Requirements */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-900">Staffing Requirements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="staffingType">Staffing Type *</Label>
                      <Select value={form.watch("staffingType")} onValueChange={(value) => form.setValue("staffingType", value as any)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select staffing type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="contract">Contract Staffing</SelectItem>
                          <SelectItem value="project_based">Project-Based</SelectItem>
                          <SelectItem value="seasonal">Seasonal</SelectItem>
                          <SelectItem value="peak_workload">Peak Workload</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="positionsNeeded">Number of Positions *</Label>
                      <Input
                        id="positionsNeeded"
                        {...form.register("positionsNeeded")}
                        className="mt-1"
                        placeholder="e.g., 5 positions"
                      />
                      {form.formState.errors.positionsNeeded && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.positionsNeeded.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="contractDuration">Contract Duration *</Label>
                      <Input
                        id="contractDuration"
                        {...form.register("contractDuration")}
                        className="mt-1"
                        placeholder="e.g., 6 months, 1 year"
                      />
                      {form.formState.errors.contractDuration && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.contractDuration.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="startDate">Start Date *</Label>
                      <Input
                        id="startDate"
                        type="date"
                        {...form.register("startDate")}
                        className="mt-1"
                      />
                      {form.formState.errors.startDate && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.startDate.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="workLocation">Work Location *</Label>
                    <Input
                      id="workLocation"
                      {...form.register("workLocation")}
                      className="mt-1"
                      placeholder="e.g., Tripoli, Benghazi, Offshore Platform"
                    />
                    {form.formState.errors.workLocation && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.workLocation.message}</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Role Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-900">Role Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="jobTitles">Job Titles/Roles Required *</Label>
                    <Textarea
                      id="jobTitles"
                      {...form.register("jobTitles")}
                      className="mt-1 h-24"
                      placeholder="List the specific job titles and roles needed..."
                    />
                    {form.formState.errors.jobTitles && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.jobTitles.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="skillsRequired">Skills & Qualifications Required *</Label>
                    <Textarea
                      id="skillsRequired"
                      {...form.register("skillsRequired")}
                      className="mt-1 h-32"
                      placeholder="Describe the technical skills, certifications, and qualifications needed..."
                    />
                    {form.formState.errors.skillsRequired && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.skillsRequired.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label>Experience Level *</Label>
                      <RadioGroup
                        value={form.watch("experienceLevel")}
                        onValueChange={(value) => form.setValue("experienceLevel", value as any)}
                        className="mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="entry" id="entry" />
                          <Label htmlFor="entry">Entry Level (0-2 years)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="mid" id="mid" />
                          <Label htmlFor="mid">Mid Level (3-7 years)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="senior" id="senior" />
                          <Label htmlFor="senior">Senior Level (8+ years)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="executive" id="executive" />
                          <Label htmlFor="executive">Executive Level</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div>
                      <Label htmlFor="educationRequirements">Education Requirements</Label>
                      <Textarea
                        id="educationRequirements"
                        {...form.register("educationRequirements")}
                        className="mt-1"
                        placeholder="Specify degree requirements, certifications, etc."
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Services Required */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-900">Additional Services</CardTitle>
                  <p className="text-gray-600">Select additional services you need</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Mobilization Services</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="needsVisa"
                          checked={form.watch("needsVisa")}
                          onCheckedChange={(checked) => form.setValue("needsVisa", !!checked)}
                        />
                        <Label htmlFor="needsVisa">Visa Processing</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="needsAccommodation"
                          checked={form.watch("needsAccommodation")}
                          onCheckedChange={(checked) => form.setValue("needsAccommodation", !!checked)}
                        />
                        <Label htmlFor="needsAccommodation">Accommodation Arrangements</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="needsTransportation"
                          checked={form.watch("needsTransportation")}
                          onCheckedChange={(checked) => form.setValue("needsTransportation", !!checked)}
                        />
                        <Label htmlFor="needsTransportation">Transportation to Libya</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="needsCulturalTraining"
                          checked={form.watch("needsCulturalTraining")}
                          onCheckedChange={(checked) => form.setValue("needsCulturalTraining", !!checked)}
                        />
                        <Label htmlFor="needsCulturalTraining">Cultural Training</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="needsOnboarding"
                          checked={form.watch("needsOnboarding")}
                          onCheckedChange={(checked) => form.setValue("needsOnboarding", !!checked)}
                        />
                        <Label htmlFor="needsOnboarding">Onboarding Support</Label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Administrative Services</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="localCompliance"
                          checked={form.watch("localCompliance")}
                          onCheckedChange={(checked) => form.setValue("localCompliance", !!checked)}
                        />
                        <Label htmlFor="localCompliance">Local Compliance Management</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="payrollManagement"
                          checked={form.watch("payrollManagement")}
                          onCheckedChange={(checked) => form.setValue("payrollManagement", !!checked)}
                        />
                        <Label htmlFor="payrollManagement">Payroll Management</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="benefitsAdministration"
                          checked={form.watch("benefitsAdministration")}
                          onCheckedChange={(checked) => form.setValue("benefitsAdministration", !!checked)}
                        />
                        <Label htmlFor="benefitsAdministration">Benefits Administration</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="performanceManagement"
                          checked={form.watch("performanceManagement")}
                          onCheckedChange={(checked) => form.setValue("performanceManagement", !!checked)}
                        />
                        <Label htmlFor="performanceManagement">Performance Management</Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Budget & Terms */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-900">Budget & Terms</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="budgetRange">Budget Range</Label>
                      <div className="flex gap-2 mt-1">
                        <Input
                          id="budgetRange"
                          {...form.register("budgetRange")}
                          className="flex-1"
                          placeholder="e.g., 50,000"
                        />
                        <Select value={form.watch("currency")} onValueChange={(value) => form.setValue("currency", value as any)}>
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
                      <Label htmlFor="paymentTerms">Payment Terms *</Label>
                      <Select value={form.watch("paymentTerms")} onValueChange={(value) => form.setValue("paymentTerms", value as any)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select payment terms" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="milestone">Milestone-based</SelectItem>
                          <SelectItem value="completion">Upon Completion</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-900">Additional Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="currentChallenges">Current Staffing Challenges</Label>
                    <Textarea
                      id="currentChallenges"
                      {...form.register("currentChallenges")}
                      className="mt-1 h-24"
                      placeholder="Describe any current staffing challenges or pain points..."
                    />
                  </div>

                  <div>
                    <Label htmlFor="specificRequirements">Specific Requirements</Label>
                    <Textarea
                      id="specificRequirements"
                      {...form.register("specificRequirements")}
                      className="mt-1 h-24"
                      placeholder="Any specific requirements or customizations needed..."
                    />
                  </div>

                  <div>
                    <Label htmlFor="additionalNotes">Additional Notes</Label>
                    <Textarea
                      id="additionalNotes"
                      {...form.register("additionalNotes")}
                      className="mt-1 h-24"
                      placeholder="Any additional information you'd like to share..."
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
                  {isSubmitting ? "Submitting..." : "Submit Manpower Request"}
                </Button>
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