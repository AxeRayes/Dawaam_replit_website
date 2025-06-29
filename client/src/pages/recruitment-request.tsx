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
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import BackToTop from "@/components/back-to-top";
import { FileText, Download } from "lucide-react";

const recruitmentRequestSchema = z.object({
  // Company Information
  companyName: z.string().min(2, "Company name is required"),
  contactPerson: z.string().min(2, "Contact person is required"),
  contactEmail: z.string().email("Valid email is required"),
  contactPhone: z.string().min(10, "Phone number is required"),
  
  // Job Vacancy Information
  jobTitle: z.string().min(2, "Job title is required"),
  jobDescription: z.string().min(20, "Job description must be at least 20 characters"),
  salaryRange: z.string().optional(),
  benefits: z.string().optional(),
  jobLocation: z.string().min(2, "Job location is required"),
  workingHours: z.string().min(5, "Working hours are required"),
  reportingTo: z.string().min(2, "Reporting structure is required"),
  
  // Requirements
  skills: z.string().optional(),
  education: z.string().optional(),
  minExperience: z.string().optional(),
  englishLevel: z.enum(["required", "preferred", "none"]),
  arabicLevel: z.enum(["required", "preferred", "none"]),
  otherLanguage: z.string().optional(),
  otherLanguageLevel: z.enum(["required", "preferred", "none"]).optional(),
  
  // Company Disclosure
  companyDisclosure: z.enum(["yes", "no"]),
  additionalNotes: z.string().optional(),
});

type RecruitmentRequestFormData = z.infer<typeof recruitmentRequestSchema>;

export default function RecruitmentRequest() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<RecruitmentRequestFormData>({
    resolver: zodResolver(recruitmentRequestSchema),
    defaultValues: {
      companyName: "",
      contactPerson: "",
      contactEmail: "",
      contactPhone: "",
      jobTitle: "",
      jobDescription: "",
      salaryRange: "",
      benefits: "",
      jobLocation: "",
      workingHours: "",
      reportingTo: "",
      skills: "",
      education: "",
      minExperience: "",
      englishLevel: "none",
      arabicLevel: "none",
      otherLanguage: "",
      companyDisclosure: "yes",
      additionalNotes: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: RecruitmentRequestFormData) => {
      setIsSubmitting(true);
      return await apiRequest("/api/recruitment-request", "POST", data);
    },
    onSuccess: () => {
      toast({
        title: "Request Submitted Successfully",
        description: "Your recruitment request has been sent to our team. We'll contact you within 24 hours.",
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

  const onSubmit = (data: RecruitmentRequestFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Header */}
      <section className="py-16 bg-gradient-to-br from-[hsl(211,74%,32%)] to-blue-600">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Recruitment Services Request
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Find the perfect talent for your organization. Fill out our comprehensive form and let our experts match you with the right candidates.
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
                      <Label htmlFor="contactPhone">Contact Phone Number *</Label>
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
                </CardContent>
              </Card>

              {/* Job Vacancy Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-900">Job Vacancy Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="jobTitle">Job Title *</Label>
                    <Input
                      id="jobTitle"
                      {...form.register("jobTitle")}
                      className="mt-1"
                    />
                    {form.formState.errors.jobTitle && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.jobTitle.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="jobDescription">Job Description & Responsibilities *</Label>
                    <Textarea
                      id="jobDescription"
                      {...form.register("jobDescription")}
                      className="mt-1 h-32"
                      placeholder="Please provide detailed job description and responsibilities..."
                    />
                    {form.formState.errors.jobDescription && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.jobDescription.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="salaryRange">Salary Range (Optional)</Label>
                      <Input
                        id="salaryRange"
                        {...form.register("salaryRange")}
                        className="mt-1"
                        placeholder="e.g., 1000-1500 LYD"
                      />
                    </div>
                    <div>
                      <Label htmlFor="benefits">Benefits (Optional)</Label>
                      <Input
                        id="benefits"
                        {...form.register("benefits")}
                        className="mt-1"
                        placeholder="e.g., Health insurance, transportation"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="jobLocation">Job Location *</Label>
                      <Input
                        id="jobLocation"
                        {...form.register("jobLocation")}
                        className="mt-1"
                      />
                      {form.formState.errors.jobLocation && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.jobLocation.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="workingHours">Working Hours *</Label>
                      <Input
                        id="workingHours"
                        {...form.register("workingHours")}
                        className="mt-1"
                        placeholder="e.g., Sunday - Thursday, 8am to 4pm"
                      />
                      {form.formState.errors.workingHours && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.workingHours.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="reportingTo">Reporting To *</Label>
                    <Input
                      id="reportingTo"
                      {...form.register("reportingTo")}
                      className="mt-1"
                      placeholder="e.g., CEO, HR Manager"
                    />
                    {form.formState.errors.reportingTo && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.reportingTo.message}</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Requirements */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-900">Requirements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="skills">Required Skills</Label>
                      <Textarea
                        id="skills"
                        {...form.register("skills")}
                        className="mt-1"
                        placeholder="List required skills..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="education">Education Requirements</Label>
                      <Textarea
                        id="education"
                        {...form.register("education")}
                        className="mt-1"
                        placeholder="Educational background required..."
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="minExperience">Minimum Experience (years)</Label>
                    <Input
                      id="minExperience"
                      {...form.register("minExperience")}
                      className="mt-1"
                      placeholder="e.g., 3-5 years"
                    />
                  </div>

                  {/* Language Requirements */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-900">Language Requirements</h4>
                    
                    <div>
                      <Label>English</Label>
                      <RadioGroup
                        value={form.watch("englishLevel")}
                        onValueChange={(value: "required" | "preferred" | "none") => form.setValue("englishLevel", value)}
                        className="flex gap-6 mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="required" id="english-required" />
                          <Label htmlFor="english-required">Required</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="preferred" id="english-preferred" />
                          <Label htmlFor="english-preferred">Preferred</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="none" id="english-none" />
                          <Label htmlFor="english-none">Not Required</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label>Arabic</Label>
                      <RadioGroup
                        value={form.watch("arabicLevel")}
                        onValueChange={(value: "required" | "preferred" | "none") => form.setValue("arabicLevel", value)}
                        className="flex gap-6 mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="required" id="arabic-required" />
                          <Label htmlFor="arabic-required">Required</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="preferred" id="arabic-preferred" />
                          <Label htmlFor="arabic-preferred">Preferred</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="none" id="arabic-none" />
                          <Label htmlFor="arabic-none">Not Required</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="otherLanguage">Other Language</Label>
                        <Input
                          id="otherLanguage"
                          {...form.register("otherLanguage")}
                          className="mt-1"
                          placeholder="e.g., French, Italian"
                        />
                      </div>
                      <div>
                        <Label>Other Language Level</Label>
                        <RadioGroup
                          value={form.watch("otherLanguageLevel") || "none"}
                          onValueChange={(value: "required" | "preferred" | "none") => form.setValue("otherLanguageLevel", value)}
                          className="flex gap-4 mt-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="required" id="other-required" />
                            <Label htmlFor="other-required">Required</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="preferred" id="other-preferred" />
                            <Label htmlFor="other-preferred">Preferred</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="none" id="other-none" />
                            <Label htmlFor="other-none">Not Required</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Company Disclosure & Additional Notes */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-900">Additional Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label>Company Name Disclosure</Label>
                    <RadioGroup
                      value={form.watch("companyDisclosure")}
                      onValueChange={(value: "yes" | "no") => form.setValue("companyDisclosure", value)}
                      className="mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="disclosure-yes" />
                        <Label htmlFor="disclosure-yes">Yes, disclose the name of our company from the start</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="disclosure-no" />
                        <Label htmlFor="disclosure-no">No, do not disclose the name of our company from the start</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label htmlFor="additionalNotes">Additional Notes / Comments</Label>
                    <Textarea
                      id="additionalNotes"
                      {...form.register("additionalNotes")}
                      className="mt-1 h-24"
                      placeholder="Any additional information or special requirements..."
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Standard Agreement */}
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <FileText className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Standard Recruitment Agreement</h3>
                      <p className="text-gray-600 mb-4">
                        Please review our standard terms and conditions for recruitment services. This agreement outlines the terms of engagement, fees, and mutual obligations.
                      </p>
                      <div className="flex space-x-3">
                        <Button 
                          type="button"
                          variant="outline"
                          className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                          onClick={() => window.open('/uploads/Dawaam - Standard Agreement _2025_1750939198727.pdf', '_blank')}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          View PDF
                        </Button>
                        <Button 
                          type="button"
                          className="bg-blue-600 text-white hover:bg-blue-700"
                          onClick={() => window.location.href = '/recruitment-agreement'}
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          Sign Online
                        </Button>
                      </div>
                    </div>
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
                  {isSubmitting ? "Submitting..." : "Submit Recruitment Request"}
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