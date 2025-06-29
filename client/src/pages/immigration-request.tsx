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

const immigrationRequestSchema = z.object({
  // Applicant Information
  applicantName: z.string().min(2, "Applicant name is required"),
  nationality: z.string().min(2, "Nationality is required"),
  passportNumber: z.string().min(6, "Passport number is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  contactEmail: z.string().email("Valid email is required"),
  contactPhone: z.string().min(10, "Phone number is required"),
  
  // Company/Sponsor Information
  companyName: z.string().min(2, "Company name is required"),
  companyContact: z.string().min(2, "Company contact person is required"),
  companyEmail: z.string().email("Valid company email is required"),
  companyPhone: z.string().min(10, "Company phone is required"),
  
  // Visa Requirements
  visaType: z.enum(["work_permit", "business_visa", "entry_visa", "residence_permit", "family_visa"]),
  purposeOfVisit: z.string().min(10, "Purpose of visit is required"),
  intendedStayDuration: z.string().min(1, "Intended stay duration is required"),
  proposedPosition: z.string().optional(),
  expectedStartDate: z.string().min(1, "Expected start date is required"),
  
  // Services Required
  visaProcessing: z.boolean().default(false),
  documentTranslation: z.boolean().default(false),
  documentAuthentication: z.boolean().default(false),
  workPermitProcessing: z.boolean().default(false),
  accommodationArrangements: z.boolean().default(false),
  transportationArrangements: z.boolean().default(false),
  culturalTraining: z.boolean().default(false),
  onboardingSupport: z.boolean().default(false),
  
  // Documentation Status
  hasValidPassport: z.boolean().default(false),
  hasEducationalCertificates: z.boolean().default(false),
  hasExperienceCertificates: z.boolean().default(false),
  hasMedicalCertificates: z.boolean().default(false),
  hasPoliceClearance: z.boolean().default(false),
  
  // Background Information
  educationLevel: z.enum(["high_school", "diploma", "bachelor", "master", "phd", "professional"]),
  workExperience: z.string().min(1, "Work experience is required"),
  previousLibyaVisit: z.boolean().default(false),
  previousVisaRejection: z.boolean().default(false),
  
  // Additional Information
  familyAccompanying: z.boolean().default(false),
  familyDetails: z.string().optional(),
  specialRequirements: z.string().optional(),
  additionalNotes: z.string().optional(),
});

type ImmigrationRequestFormData = z.infer<typeof immigrationRequestSchema>;

export default function ImmigrationRequest() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ImmigrationRequestFormData>({
    resolver: zodResolver(immigrationRequestSchema),
    defaultValues: {
      applicantName: "",
      nationality: "",
      passportNumber: "",
      dateOfBirth: "",
      contactEmail: "",
      contactPhone: "",
      companyName: "",
      companyContact: "",
      companyEmail: "",
      companyPhone: "",
      visaType: "work_permit",
      purposeOfVisit: "",
      intendedStayDuration: "",
      proposedPosition: "",
      expectedStartDate: "",
      visaProcessing: false,
      documentTranslation: false,
      documentAuthentication: false,
      workPermitProcessing: false,
      accommodationArrangements: false,
      transportationArrangements: false,
      culturalTraining: false,
      onboardingSupport: false,
      hasValidPassport: false,
      hasEducationalCertificates: false,
      hasExperienceCertificates: false,
      hasMedicalCertificates: false,
      hasPoliceClearance: false,
      educationLevel: "bachelor",
      workExperience: "",
      previousLibyaVisit: false,
      previousVisaRejection: false,
      familyAccompanying: false,
      familyDetails: "",
      specialRequirements: "",
      additionalNotes: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: ImmigrationRequestFormData) => {
      setIsSubmitting(true);
      return await apiRequest("/api/immigration-request", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      toast({
        title: "Application Submitted Successfully",
        description: "Your immigration & visa application has been sent to our team. We'll contact you within 24 hours.",
      });
      form.reset();
      setIsSubmitting(false);
    },
    onError: (error: any) => {
      console.error("Submission error:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    },
  });

  const onSubmit = (data: ImmigrationRequestFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Header */}
      <section className="py-16 bg-gradient-to-br from-[hsl(211,74%,32%)] to-blue-600">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Immigration & Visa Services
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Complete visa processing, work permits, and documentation support for international talent. We handle the entire immigration process from start to finish.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              {/* Applicant Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-900">Applicant Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="applicantName">Full Name *</Label>
                      <Input
                        id="applicantName"
                        {...form.register("applicantName")}
                        className="mt-1"
                        placeholder="As per passport"
                      />
                      {form.formState.errors.applicantName && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.applicantName.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="nationality">Nationality *</Label>
                      <Input
                        id="nationality"
                        {...form.register("nationality")}
                        className="mt-1"
                      />
                      {form.formState.errors.nationality && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.nationality.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="passportNumber">Passport Number *</Label>
                      <Input
                        id="passportNumber"
                        {...form.register("passportNumber")}
                        className="mt-1"
                      />
                      {form.formState.errors.passportNumber && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.passportNumber.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        {...form.register("dateOfBirth")}
                        className="mt-1"
                      />
                      {form.formState.errors.dateOfBirth && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.dateOfBirth.message}</p>
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
                </CardContent>
              </Card>

              {/* Company/Sponsor Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-900">Company/Sponsor Information</CardTitle>
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
                      <Label htmlFor="companyContact">Company Contact Person *</Label>
                      <Input
                        id="companyContact"
                        {...form.register("companyContact")}
                        className="mt-1"
                      />
                      {form.formState.errors.companyContact && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.companyContact.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="companyEmail">Company Email *</Label>
                      <Input
                        id="companyEmail"
                        type="email"
                        {...form.register("companyEmail")}
                        className="mt-1"
                      />
                      {form.formState.errors.companyEmail && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.companyEmail.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="companyPhone">Company Phone *</Label>
                      <Input
                        id="companyPhone"
                        {...form.register("companyPhone")}
                        className="mt-1"
                      />
                      {form.formState.errors.companyPhone && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.companyPhone.message}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Visa Requirements */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-900">Visa Requirements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="visaType">Visa Type *</Label>
                      <Select value={form.watch("visaType")} onValueChange={(value) => form.setValue("visaType", value as any)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select visa type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="work_permit">Work Permit</SelectItem>
                          <SelectItem value="business_visa">Business Visa</SelectItem>
                          <SelectItem value="entry_visa">Entry Visa</SelectItem>
                          <SelectItem value="residence_permit">Residence Permit</SelectItem>
                          <SelectItem value="family_visa">Family Visa</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="intendedStayDuration">Intended Stay Duration *</Label>
                      <Input
                        id="intendedStayDuration"
                        {...form.register("intendedStayDuration")}
                        className="mt-1"
                        placeholder="e.g., 1 year, 6 months"
                      />
                      {form.formState.errors.intendedStayDuration && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.intendedStayDuration.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="purposeOfVisit">Purpose of Visit *</Label>
                    <Textarea
                      id="purposeOfVisit"
                      {...form.register("purposeOfVisit")}
                      className="mt-1 h-24"
                      placeholder="Describe the purpose of your visit to Libya..."
                    />
                    {form.formState.errors.purposeOfVisit && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.purposeOfVisit.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="proposedPosition">Proposed Position (if applicable)</Label>
                      <Input
                        id="proposedPosition"
                        {...form.register("proposedPosition")}
                        className="mt-1"
                        placeholder="Job title or position"
                      />
                    </div>
                    <div>
                      <Label htmlFor="expectedStartDate">Expected Start Date *</Label>
                      <Input
                        id="expectedStartDate"
                        type="date"
                        {...form.register("expectedStartDate")}
                        className="mt-1"
                      />
                      {form.formState.errors.expectedStartDate && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.expectedStartDate.message}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Services Required */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-900">Services Required</CardTitle>
                  <p className="text-gray-600">Select all services you need</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Documentation Services</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="visaProcessing"
                          checked={form.watch("visaProcessing")}
                          onCheckedChange={(checked) => form.setValue("visaProcessing", !!checked)}
                        />
                        <Label htmlFor="visaProcessing">Visa Processing</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="documentTranslation"
                          checked={form.watch("documentTranslation")}
                          onCheckedChange={(checked) => form.setValue("documentTranslation", !!checked)}
                        />
                        <Label htmlFor="documentTranslation">Document Translation</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="documentAuthentication"
                          checked={form.watch("documentAuthentication")}
                          onCheckedChange={(checked) => form.setValue("documentAuthentication", !!checked)}
                        />
                        <Label htmlFor="documentAuthentication">Document Authentication</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="workPermitProcessing"
                          checked={form.watch("workPermitProcessing")}
                          onCheckedChange={(checked) => form.setValue("workPermitProcessing", !!checked)}
                        />
                        <Label htmlFor="workPermitProcessing">Work Permit Processing</Label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Support Services</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="accommodationArrangements"
                          checked={form.watch("accommodationArrangements")}
                          onCheckedChange={(checked) => form.setValue("accommodationArrangements", !!checked)}
                        />
                        <Label htmlFor="accommodationArrangements">Accommodation Arrangements</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="transportationArrangements"
                          checked={form.watch("transportationArrangements")}
                          onCheckedChange={(checked) => form.setValue("transportationArrangements", !!checked)}
                        />
                        <Label htmlFor="transportationArrangements">Transportation Arrangements</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="culturalTraining"
                          checked={form.watch("culturalTraining")}
                          onCheckedChange={(checked) => form.setValue("culturalTraining", !!checked)}
                        />
                        <Label htmlFor="culturalTraining">Cultural Training</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="onboardingSupport"
                          checked={form.watch("onboardingSupport")}
                          onCheckedChange={(checked) => form.setValue("onboardingSupport", !!checked)}
                        />
                        <Label htmlFor="onboardingSupport">Onboarding Support</Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Documentation Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-900">Documentation Status</CardTitle>
                  <p className="text-gray-600">Confirm which documents you currently have</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="hasValidPassport"
                        checked={form.watch("hasValidPassport")}
                        onCheckedChange={(checked) => form.setValue("hasValidPassport", !!checked)}
                      />
                      <Label htmlFor="hasValidPassport">Valid Passport</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="hasEducationalCertificates"
                        checked={form.watch("hasEducationalCertificates")}
                        onCheckedChange={(checked) => form.setValue("hasEducationalCertificates", !!checked)}
                      />
                      <Label htmlFor="hasEducationalCertificates">Educational Certificates</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="hasExperienceCertificates"
                        checked={form.watch("hasExperienceCertificates")}
                        onCheckedChange={(checked) => form.setValue("hasExperienceCertificates", !!checked)}
                      />
                      <Label htmlFor="hasExperienceCertificates">Experience Certificates</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="hasMedicalCertificates"
                        checked={form.watch("hasMedicalCertificates")}
                        onCheckedChange={(checked) => form.setValue("hasMedicalCertificates", !!checked)}
                      />
                      <Label htmlFor="hasMedicalCertificates">Medical Certificates</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="hasPoliceClearance"
                        checked={form.watch("hasPoliceClearance")}
                        onCheckedChange={(checked) => form.setValue("hasPoliceClearance", !!checked)}
                      />
                      <Label htmlFor="hasPoliceClearance">Police Clearance Certificate</Label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Background Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-900">Background Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="educationLevel">Education Level *</Label>
                      <Select value={form.watch("educationLevel")} onValueChange={(value) => form.setValue("educationLevel", value as any)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select education level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high_school">High School</SelectItem>
                          <SelectItem value="diploma">Diploma</SelectItem>
                          <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                          <SelectItem value="master">Master's Degree</SelectItem>
                          <SelectItem value="phd">PhD</SelectItem>
                          <SelectItem value="professional">Professional Certificate</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="workExperience">Work Experience *</Label>
                      <Input
                        id="workExperience"
                        {...form.register("workExperience")}
                        className="mt-1"
                        placeholder="e.g., 5 years in engineering"
                      />
                      {form.formState.errors.workExperience && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.workExperience.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="previousLibyaVisit"
                        checked={form.watch("previousLibyaVisit")}
                        onCheckedChange={(checked) => form.setValue("previousLibyaVisit", !!checked)}
                      />
                      <Label htmlFor="previousLibyaVisit">Previously visited Libya</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="previousVisaRejection"
                        checked={form.watch("previousVisaRejection")}
                        onCheckedChange={(checked) => form.setValue("previousVisaRejection", !!checked)}
                      />
                      <Label htmlFor="previousVisaRejection">Previous visa rejection</Label>
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
                    <div className="flex items-center space-x-2 mb-4">
                      <Checkbox
                        id="familyAccompanying"
                        checked={form.watch("familyAccompanying")}
                        onCheckedChange={(checked) => form.setValue("familyAccompanying", !!checked)}
                      />
                      <Label htmlFor="familyAccompanying">Family members accompanying</Label>
                    </div>
                    
                    {form.watch("familyAccompanying") && (
                      <div>
                        <Label htmlFor="familyDetails">Family Details</Label>
                        <Textarea
                          id="familyDetails"
                          {...form.register("familyDetails")}
                          className="mt-1 h-24"
                          placeholder="Provide details of family members (names, ages, relationship)..."
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="specialRequirements">Special Requirements</Label>
                    <Textarea
                      id="specialRequirements"
                      {...form.register("specialRequirements")}
                      className="mt-1 h-24"
                      placeholder="Any special requirements or considerations..."
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
                  {isSubmitting ? "Submitting..." : "Submit Immigration Application"}
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