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
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import BackToTop from "@/components/back-to-top";
import { FileText, Download, CheckCircle, Building } from "lucide-react";

const recruitmentAgreementSchema = z.object({
  // Client Details
  companyName: z.string().min(2, "Company name is required"),
  buildingNameNumber: z.string().min(2, "Building name/number is required"),
  address1: z.string().min(5, "Address is required"),
  address2: z.string().optional(),
  city: z.string().min(2, "City is required"),
  country: z.string().min(2, "Country is required"),
  representativeName: z.string().min(2, "Representative name is required"),
  position: z.string().min(2, "Position is required"),
  email: z.string().email("Valid email is required"),
  mobile: z.string().min(10, "Mobile number is required"),
  
  // Agreement Terms Acknowledgment
  agreementAcknowledged: z.boolean().refine(val => val === true, {
    message: "You must acknowledge the agreement terms"
  }),
  
  // Digital Signature
  signature: z.string().min(2, "Digital signature is required"),
  signatureDate: z.string().min(10, "Signature date is required"),
  
  // Optional: Specific Requirements
  specificRequirements: z.string().optional(),
  additionalNotes: z.string().optional(),
});

type RecruitmentAgreementFormData = z.infer<typeof recruitmentAgreementSchema>;

export default function RecruitmentAgreement() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<RecruitmentAgreementFormData>({
    resolver: zodResolver(recruitmentAgreementSchema),
    defaultValues: {
      signatureDate: new Date().toISOString().split('T')[0],
      agreementAcknowledged: false,
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: RecruitmentAgreementFormData) => {
      return apiRequest("/api/recruitment-agreement", "POST", data);
    },
    onSuccess: () => {
      toast({
        title: "Agreement Submitted Successfully",
        description: "Your recruitment agreement has been submitted and processed.",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Submission Failed", 
        description: error.message || "There was an error submitting your agreement.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data: RecruitmentAgreementFormData) => {
    setIsSubmitting(true);
    try {
      await submitMutation.mutateAsync(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Header */}
      <section className="py-16 bg-gradient-to-br from-[hsl(211,74%,32%)] to-blue-600">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Recruitment Services Agreement
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Complete and digitally sign our standard recruitment agreement to begin accessing our professional recruitment services.
          </p>
        </div>
      </section>

      {/* Agreement Content */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          
          {/* Agreement Terms Overview */}
          <Card className="mb-8 bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <FileText className="w-6 h-6 text-blue-600" />
                <span>Agreement Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-gray-700">
                <p className="font-medium">This Recruitment & Manpower Services Agreement establishes the terms for:</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Candidate sourcing and screening</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Professional recruitment services</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Placement fees and payment terms</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Confidentiality obligations</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Refund policy and terms</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Governing law and dispute resolution</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-blue-100 rounded-lg">
                  <p className="text-sm font-medium text-blue-800">Key Terms:</p>
                  <ul className="text-sm text-blue-700 mt-2 space-y-1">
                    <li>• Placement fee: 8.33% of candidate's annual salary (minimum LYD 1,000)</li>
                    <li>• Payment terms: 30 days from invoice date</li>
                    <li>• Refund policy: Sliding scale refunds if termination within 3 months</li>
                    <li>• Introduction validity: 12 months from date of introduction</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Agreement Form */}
          <div>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              {/* Company Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <Building className="w-6 h-6 text-gray-600" />
                    <span>Company Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="companyName">Company Name *</Label>
                    <Input
                      id="companyName"
                      {...form.register("companyName")}
                      className="mt-1"
                      placeholder="Enter company name"
                    />
                    {form.formState.errors.companyName && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.companyName.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="buildingNameNumber">Building Name/Number *</Label>
                      <Input
                        id="buildingNameNumber"
                        {...form.register("buildingNameNumber")}
                        className="mt-1"
                        placeholder="Building name or number"
                      />
                      {form.formState.errors.buildingNameNumber && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.buildingNameNumber.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        {...form.register("city")}
                        className="mt-1"
                        placeholder="City"
                      />
                      {form.formState.errors.city && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.city.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address1">Address Line 1 *</Label>
                    <Input
                      id="address1"
                      {...form.register("address1")}
                      className="mt-1"
                      placeholder="Street address"
                    />
                    {form.formState.errors.address1 && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.address1.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="address2">Address Line 2</Label>
                    <Input
                      id="address2"
                      {...form.register("address2")}
                      className="mt-1"
                      placeholder="Additional address information (optional)"
                    />
                  </div>

                  <div>
                    <Label htmlFor="country">Country *</Label>
                    <Input
                      id="country"
                      {...form.register("country")}
                      className="mt-1"
                      placeholder="Country"
                    />
                    {form.formState.errors.country && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.country.message}</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Representative Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Authorized Representative</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="representativeName">Representative Name *</Label>
                      <Input
                        id="representativeName"
                        {...form.register("representativeName")}
                        className="mt-1"
                        placeholder="Full name"
                      />
                      {form.formState.errors.representativeName && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.representativeName.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="position">Position/Title *</Label>
                      <Input
                        id="position"
                        {...form.register("position")}
                        className="mt-1"
                        placeholder="Job title"
                      />
                      {form.formState.errors.position && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.position.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        {...form.register("email")}
                        className="mt-1"
                        placeholder="email@company.com"
                      />
                      {form.formState.errors.email && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="mobile">Mobile Number *</Label>
                      <Input
                        id="mobile"
                        {...form.register("mobile")}
                        className="mt-1"
                        placeholder="+218 XX XXX XXXX"
                      />
                      {form.formState.errors.mobile && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.mobile.message}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Requirements */}
              <Card>
                <CardHeader>
                  <CardTitle>Additional Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="specificRequirements">Specific Recruitment Requirements</Label>
                    <Textarea
                      id="specificRequirements"
                      {...form.register("specificRequirements")}
                      className="mt-1 h-24"
                      placeholder="Any specific requirements for recruitment services (optional)"
                    />
                  </div>

                  <div>
                    <Label htmlFor="additionalNotes">Additional Notes</Label>
                    <Textarea
                      id="additionalNotes"
                      {...form.register("additionalNotes")}
                      className="mt-1 h-24"
                      placeholder="Any additional comments or special instructions (optional)"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Digital Signature */}
              <Card>
                <CardHeader>
                  <CardTitle>Digital Signature</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="signature">Digital Signature *</Label>
                      <Input
                        id="signature"
                        {...form.register("signature")}
                        className="mt-1"
                        placeholder="Type your full name as digital signature"
                      />
                      <p className="text-sm text-gray-600 mt-1">By typing your name, you agree to the terms of this agreement</p>
                      {form.formState.errors.signature && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.signature.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="signatureDate">Date *</Label>
                      <Input
                        id="signatureDate"
                        type="date"
                        {...form.register("signatureDate")}
                        className="mt-1"
                      />
                      {form.formState.errors.signatureDate && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.signatureDate.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <Checkbox
                      id="agreementAcknowledged"
                      checked={form.watch("agreementAcknowledged")}
                      onCheckedChange={(checked) => form.setValue("agreementAcknowledged", checked as boolean)}
                    />
                    <div className="flex-1">
                      <Label htmlFor="agreementAcknowledged" className="font-medium">
                        I acknowledge and agree to the terms and conditions *
                      </Label>
                      <p className="text-sm text-gray-600 mt-1">
                        I have read, understood, and agree to be bound by all terms and conditions of this Recruitment & Manpower Services Agreement, including but not limited to placement fees, payment terms, confidentiality obligations, and refund policies as outlined above.
                      </p>
                      {form.formState.errors.agreementAcknowledged && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.agreementAcknowledged.message}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Download Full Agreement */}
              <Card className="bg-gray-100 border-gray-300">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Full Agreement Document</h3>
                      <p className="text-sm text-gray-600">Download the complete agreement for your records</p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => window.open('/uploads/Dawaam - Standard Agreement _DTS_1750937456362.pdf', '_blank')}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <div className="text-center">
                <Button
                  type="submit"
                  disabled={isSubmitting || !form.watch("agreementAcknowledged")}
                  className="bg-gradient-to-r from-[hsl(211,74%,32%)] to-blue-600 text-white px-12 py-3 text-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  {isSubmitting ? "Submitting Agreement..." : "Submit Signed Agreement"}
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