import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Calendar, FileText, Send } from "lucide-react";
import ufiLogo from "@assets/UFI_RGB_color_1750769674089.png";

const auditRequestSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  contactPerson: z.string().min(1, "Contact person is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone number is required"),
  eventName: z.string().min(1, "Event name is required"),
  eventType: z.string().min(1, "Event type is required"),
  eventDate: z.string().min(1, "Event date is required"),
  eventLocation: z.string().min(1, "Event location is required"),
  expectedAttendees: z.string().min(1, "Expected attendees is required"),
  eventDescription: z.string().min(10, "Event description must be at least 10 characters"),
  additionalRequirements: z.string().optional(),
  agreeToTerms: z.boolean().refine(val => val === true, "You must agree to the terms")
});

type AuditRequestFormData = z.infer<typeof auditRequestSchema>;

export default function RequestAudit() {
  const { toast } = useToast();
  
  const form = useForm<AuditRequestFormData>({
    resolver: zodResolver(auditRequestSchema),
    defaultValues: {
      companyName: "",
      contactPerson: "",
      email: "",
      phone: "",
      eventName: "",
      eventType: "",
      eventDate: "",
      eventLocation: "",
      expectedAttendees: "",
      eventDescription: "",
      additionalRequirements: "",
      agreeToTerms: false
    }
  });

  const submitMutation = useMutation({
    mutationFn: async (data: AuditRequestFormData) => {
      return apiRequest("POST", "/api/audit-request", data);
    },
    onSuccess: () => {
      toast({
        title: "Request Submitted Successfully",
        description: "Your audit request has been sent to info@dawaam.com. We will contact you within 24 hours.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: AuditRequestFormData) => {
    submitMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img src={ufiLogo} alt="UFI Logo" className="h-16 w-auto" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Request UFI Event Audit
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Submit your event details for professional UFI compliance auditing services
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-6 h-6 text-[hsl(226,56%,26%)]" />
              <span>Event Audit Request Form</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Company Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input
                    id="companyName"
                    {...form.register("companyName")}
                    placeholder="Enter company name"
                  />
                  {form.formState.errors.companyName && (
                    <p className="text-sm text-red-600">{form.formState.errors.companyName.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contactPerson">Contact Person *</Label>
                  <Input
                    id="contactPerson"
                    {...form.register("contactPerson")}
                    placeholder="Enter contact person name"
                  />
                  {form.formState.errors.contactPerson && (
                    <p className="text-sm text-red-600">{form.formState.errors.contactPerson.message}</p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...form.register("email")}
                    placeholder="Enter email address"
                  />
                  {form.formState.errors.email && (
                    <p className="text-sm text-red-600">{form.formState.errors.email.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    {...form.register("phone")}
                    placeholder="Enter phone number"
                  />
                  {form.formState.errors.phone && (
                    <p className="text-sm text-red-600">{form.formState.errors.phone.message}</p>
                  )}
                </div>
              </div>

              {/* Event Information */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Information</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="eventName">Event Name *</Label>
                    <Input
                      id="eventName"
                      {...form.register("eventName")}
                      placeholder="Enter event name"
                    />
                    {form.formState.errors.eventName && (
                      <p className="text-sm text-red-600">{form.formState.errors.eventName.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="eventType">Event Type *</Label>
                    <Select onValueChange={(value) => form.setValue("eventType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="conference">Conference</SelectItem>
                        <SelectItem value="exhibition">Exhibition</SelectItem>
                        <SelectItem value="trade-show">Trade Show</SelectItem>
                        <SelectItem value="seminar">Seminar</SelectItem>
                        <SelectItem value="workshop">Workshop</SelectItem>
                        <SelectItem value="corporate-event">Corporate Event</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {form.formState.errors.eventType && (
                      <p className="text-sm text-red-600">{form.formState.errors.eventType.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="eventDate">Event Date *</Label>
                    <Input
                      id="eventDate"
                      type="date"
                      {...form.register("eventDate")}
                    />
                    {form.formState.errors.eventDate && (
                      <p className="text-sm text-red-600">{form.formState.errors.eventDate.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="expectedAttendees">Expected Attendees *</Label>
                    <Select onValueChange={(value) => form.setValue("expectedAttendees", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select attendee range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="50-100">50-100</SelectItem>
                        <SelectItem value="100-250">100-250</SelectItem>
                        <SelectItem value="250-500">250-500</SelectItem>
                        <SelectItem value="500-1000">500-1000</SelectItem>
                        <SelectItem value="1000+">1000+</SelectItem>
                      </SelectContent>
                    </Select>
                    {form.formState.errors.expectedAttendees && (
                      <p className="text-sm text-red-600">{form.formState.errors.expectedAttendees.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="eventLocation">Event Location *</Label>
                  <Input
                    id="eventLocation"
                    {...form.register("eventLocation")}
                    placeholder="Enter event location (city, venue, etc.)"
                  />
                  {form.formState.errors.eventLocation && (
                    <p className="text-sm text-red-600">{form.formState.errors.eventLocation.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="eventDescription">Event Description *</Label>
                  <Textarea
                    id="eventDescription"
                    {...form.register("eventDescription")}
                    placeholder="Provide a detailed description of your event..."
                    rows={4}
                  />
                  {form.formState.errors.eventDescription && (
                    <p className="text-sm text-red-600">{form.formState.errors.eventDescription.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalRequirements">Additional Requirements (Optional)</Label>
                  <Textarea
                    id="additionalRequirements"
                    {...form.register("additionalRequirements")}
                    placeholder="Any specific audit requirements or additional information..."
                    rows={3}
                  />
                </div>
              </div>

              {/* Terms and Submit */}
              <div className="border-t pt-6">
                <div className="flex items-center space-x-2 mb-6">
                  <Checkbox
                    id="agreeToTerms"
                    checked={form.watch("agreeToTerms")}
                    onCheckedChange={(checked) => form.setValue("agreeToTerms", checked as boolean)}
                  />
                  <Label htmlFor="agreeToTerms" className="text-sm">
                    I agree that the information provided is accurate and consent to being contacted regarding this audit request *
                  </Label>
                </div>
                {form.formState.errors.agreeToTerms && (
                  <p className="text-sm text-red-600 mb-4">{form.formState.errors.agreeToTerms.message}</p>
                )}

                <Button
                  type="submit"
                  disabled={submitMutation.isPending}
                  className="bg-[hsl(226,56%,26%)] hover:bg-[hsl(226,56%,20%)] text-white px-8 py-3 w-full md:w-auto"
                >
                  {submitMutation.isPending ? (
                    "Submitting..."
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Submit Audit Request
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}