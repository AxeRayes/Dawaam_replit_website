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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import BackToTop from "@/components/back-to-top";
import { Calendar, Clock, Users, MessageSquare } from "lucide-react";

const consultationSchema = z.object({
  // Contact Information
  companyName: z.string().min(2, "Company name is required"),
  contactPerson: z.string().min(2, "Contact person is required"),
  jobTitle: z.string().min(2, "Job title is required"),
  contactEmail: z.string().email("Valid email is required"),
  contactPhone: z.string().min(10, "Phone number is required"),
  
  // Company Details
  industry: z.string().min(2, "Industry is required"),
  companySize: z.string().min(1, "Company size is required"),
  
  // Consultation Details
  consultationType: z.enum(["hr_strategy", "recruitment", "payroll", "training", "compliance", "general"]),
  urgency: z.enum(["urgent", "week", "month", "flexible"]),
  preferredTime: z.enum(["morning", "afternoon", "evening", "any"]),
  preferredDay: z.enum(["weekday", "weekend", "any"]),
  meetingFormat: z.enum(["in_person", "video_call", "phone_call"]),
  
  // Consultation Details
  currentChallenges: z.string().min(10, "Please describe your current challenges"),
  specificGoals: z.string().optional(),
  budget: z.string().optional(),
  additionalNotes: z.string().optional(),
});

type ConsultationFormData = z.infer<typeof consultationSchema>;

export default function ScheduleConsultation() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ConsultationFormData>({
    resolver: zodResolver(consultationSchema),
    defaultValues: {
      companyName: "",
      contactPerson: "",
      jobTitle: "",
      contactEmail: "",
      contactPhone: "",
      industry: "",
      companySize: "",
      consultationType: "general",
      urgency: "flexible",
      preferredTime: "any",
      preferredDay: "any",
      meetingFormat: "video_call",
      currentChallenges: "",
      specificGoals: "",
      budget: "",
      additionalNotes: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: ConsultationFormData) => {
      setIsSubmitting(true);
      return await apiRequest("/api/consultation-request", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      toast({
        title: "Consultation Request Submitted",
        description: "Our team will contact you within 24 hours to schedule your consultation.",
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

  const onSubmit = (data: ConsultationFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Header */}
      <section className="py-16 bg-gradient-to-br from-[hsl(211,74%,32%)] to-blue-600">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Schedule HR Consultation
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Get expert advice from our HR professionals. Book a consultation to discuss your workforce challenges and discover tailored solutions for your business.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="text-center p-6">
              <Calendar className="w-12 h-12 text-[hsl(211,74%,32%)] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Flexible Scheduling</h3>
              <p className="text-gray-600">Choose the time and format that works best for you</p>
            </div>
            <div className="text-center p-6">
              <Users className="w-12 h-12 text-[hsl(211,74%,32%)] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Advisors</h3>
              <p className="text-gray-600">Connect with experienced HR professionals</p>
            </div>
            <div className="text-center p-6">
              <MessageSquare className="w-12 h-12 text-[hsl(211,74%,32%)] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Tailored Solutions</h3>
              <p className="text-gray-600">Get customized recommendations for your business</p>
            </div>
            <div className="text-center p-6">
              <Clock className="w-12 h-12 text-[hsl(211,74%,32%)] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Response</h3>
              <p className="text-gray-600">We'll contact you within 24 hours</p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-900">Contact Information</CardTitle>
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
                        placeholder="e.g., HR Manager, CEO"
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
                </CardContent>
              </Card>

              {/* Consultation Preferences */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-900">Consultation Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label>Consultation Type *</Label>
                    <RadioGroup
                      value={form.watch("consultationType")}
                      onValueChange={(value) => form.setValue("consultationType", value as any)}
                      className="mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="hr_strategy" id="hr_strategy" />
                        <Label htmlFor="hr_strategy">HR Strategy & Planning</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="recruitment" id="recruitment" />
                        <Label htmlFor="recruitment">Recruitment & Talent Acquisition</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="payroll" id="payroll" />
                        <Label htmlFor="payroll">Payroll & Benefits Management</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="training" id="training" />
                        <Label htmlFor="training">Training & Development</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="compliance" id="compliance" />
                        <Label htmlFor="compliance">HR Compliance & Legal</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="general" id="general" />
                        <Label htmlFor="general">General HR Consultation</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label>Urgency *</Label>
                      <RadioGroup
                        value={form.watch("urgency")}
                        onValueChange={(value) => form.setValue("urgency", value as any)}
                        className="mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="urgent" id="urgent" />
                          <Label htmlFor="urgent">Urgent (Within 2 days)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="week" id="week" />
                          <Label htmlFor="week">This week</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="month" id="month" />
                          <Label htmlFor="month">This month</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="flexible" id="flexible" />
                          <Label htmlFor="flexible">Flexible timing</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label>Meeting Format *</Label>
                      <RadioGroup
                        value={form.watch("meetingFormat")}
                        onValueChange={(value) => form.setValue("meetingFormat", value as any)}
                        className="mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="video_call" id="video_call" />
                          <Label htmlFor="video_call">Video Call (Zoom/Teams)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="phone_call" id="phone_call" />
                          <Label htmlFor="phone_call">Phone Call</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="in_person" id="in_person" />
                          <Label htmlFor="in_person">In-Person (Tripoli Office)</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="preferredTime">Preferred Time</Label>
                      <Select value={form.watch("preferredTime")} onValueChange={(value) => form.setValue("preferredTime", value as any)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select preferred time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="morning">Morning (9 AM - 12 PM)</SelectItem>
                          <SelectItem value="afternoon">Afternoon (12 PM - 5 PM)</SelectItem>
                          <SelectItem value="evening">Evening (5 PM - 8 PM)</SelectItem>
                          <SelectItem value="any">Any time</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="preferredDay">Preferred Days</Label>
                      <Select value={form.watch("preferredDay")} onValueChange={(value) => form.setValue("preferredDay", value as any)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select preferred days" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="weekday">Weekdays only</SelectItem>
                          <SelectItem value="weekend">Weekends only</SelectItem>
                          <SelectItem value="any">Any day</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Consultation Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-900">Tell Us About Your Needs</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="currentChallenges">Current HR Challenges *</Label>
                    <Textarea
                      id="currentChallenges"
                      {...form.register("currentChallenges")}
                      className="mt-1 h-32"
                      placeholder="Describe the HR challenges your company is currently facing..."
                    />
                    {form.formState.errors.currentChallenges && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.currentChallenges.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="specificGoals">Specific Goals & Objectives</Label>
                    <Textarea
                      id="specificGoals"
                      {...form.register("specificGoals")}
                      className="mt-1 h-24"
                      placeholder="What specific outcomes are you hoping to achieve?"
                    />
                  </div>

                  <div>
                    <Label htmlFor="budget">Budget Range (Optional)</Label>
                    <Input
                      id="budget"
                      {...form.register("budget")}
                      className="mt-1"
                      placeholder="e.g., $5,000 - $10,000 USD"
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
                  {isSubmitting ? "Submitting..." : "Schedule Consultation"}
                </Button>
                <p className="text-gray-600 mt-4">
                  Our team will review your request and contact you within 24 hours to confirm your consultation appointment.
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