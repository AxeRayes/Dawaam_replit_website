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

const payrollRequestSchema = z.object({
  // Company Information
  companyName: z.string().min(2, "Company name is required"),
  contactPerson: z.string().min(2, "Contact person is required"),
  contactEmail: z.string().email("Valid email is required"),
  contactPhone: z.string().min(10, "Phone number is required"),
  companyAddress: z.string().min(5, "Company address is required"),
  
  // Business Information
  businessType: z.enum(["corporation", "llc", "partnership", "sole_proprietorship", "other"]),
  employeeCount: z.string().min(1, "Employee count is required"),
  currentPayrollProvider: z.string().optional(),
  payrollFrequency: z.enum(["weekly", "bi_weekly", "monthly", "semi_monthly"]),
  
  // Services Required
  payrollProcessing: z.boolean().default(false),
  taxFiling: z.boolean().default(false),
  timeTracking: z.boolean().default(false),
  benefits: z.boolean().default(false),
  hrSupport: z.boolean().default(false),
  reporting: z.boolean().default(false),
  
  // Payroll Details
  averageMonthlySalaries: z.string().optional(),
  salaryCurrency: z.enum(["USD", "LYD"]).default("LYD"),
  hasVariablePay: z.boolean().default(false),
  hasCommissions: z.boolean().default(false),
  hasBonuses: z.boolean().default(false),
  hasOvertimePay: z.boolean().default(false),
  
  // Compliance & Benefits
  needsEndOfService: z.boolean().default(false),
  needsVacationTracking: z.boolean().default(false),
  needsSickLeave: z.boolean().default(false),
  needsInsurance: z.boolean().default(false),
  needsRetirement: z.boolean().default(false),
  
  // Timeline & Budget
  implementationTimeline: z.enum(["immediate", "1_month", "2_3_months", "flexible"]),
  monthlyBudget: z.string().optional(),
  budgetCurrency: z.enum(["USD", "LYD"]).default("LYD"),
  
  // Additional Information
  currentChallenges: z.string().optional(),
  specificRequirements: z.string().optional(),
  additionalNotes: z.string().optional(),
});

type PayrollRequestFormData = z.infer<typeof payrollRequestSchema>;

export default function PayrollRequest() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<PayrollRequestFormData>({
    resolver: zodResolver(payrollRequestSchema),
    defaultValues: {
      companyName: "",
      contactPerson: "",
      contactEmail: "",
      contactPhone: "",
      companyAddress: "",
      businessType: "corporation",
      employeeCount: "",
      currentPayrollProvider: "",
      payrollFrequency: "monthly",
      payrollProcessing: false,
      taxFiling: false,
      timeTracking: false,
      benefits: false,
      hrSupport: false,
      reporting: false,
      averageMonthlySalaries: "",
      salaryCurrency: "LYD",
      hasVariablePay: false,
      hasCommissions: false,
      hasBonuses: false,
      hasOvertimePay: false,
      needsEndOfService: false,
      needsVacationTracking: false,
      needsSickLeave: false,
      needsInsurance: false,
      needsRetirement: false,
      implementationTimeline: "flexible",
      monthlyBudget: "",
      budgetCurrency: "LYD",
      currentChallenges: "",
      specificRequirements: "",
      additionalNotes: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: PayrollRequestFormData) => {
      setIsSubmitting(true);
      return await apiRequest("/api/payroll-request", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      toast({
        title: "Request Submitted Successfully",
        description: "Your payroll services request has been sent to our team. We'll contact you within 24 hours.",
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

  const onSubmit = (data: PayrollRequestFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Header */}
      <section className="py-16 bg-gradient-to-br from-[hsl(211,74%,32%)] to-blue-600">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Payroll Management Services
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Streamline your payroll processes with our comprehensive management solutions. Let us handle the complexity while you focus on growing your business.
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

                  <div>
                    <Label htmlFor="companyAddress">Company Address *</Label>
                    <Input
                      id="companyAddress"
                      {...form.register("companyAddress")}
                      className="mt-1"
                    />
                    {form.formState.errors.companyAddress && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.companyAddress.message}</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Business Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-900">Business Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="businessType">Business Type *</Label>
                      <Select value={form.watch("businessType")} onValueChange={(value) => form.setValue("businessType", value as any)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select business type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="corporation">Corporation</SelectItem>
                          <SelectItem value="llc">LLC</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                          <SelectItem value="sole_proprietorship">Sole Proprietorship</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="employeeCount">Number of Employees *</Label>
                      <Input
                        id="employeeCount"
                        {...form.register("employeeCount")}
                        className="mt-1"
                        placeholder="e.g., 25"
                      />
                      {form.formState.errors.employeeCount && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.employeeCount.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="currentPayrollProvider">Current Payroll Provider (if any)</Label>
                      <Input
                        id="currentPayrollProvider"
                        {...form.register("currentPayrollProvider")}
                        className="mt-1"
                        placeholder="e.g., Internal team, ADP, etc."
                      />
                    </div>
                    <div>
                      <Label htmlFor="payrollFrequency">Preferred Payroll Frequency *</Label>
                      <Select value={form.watch("payrollFrequency")} onValueChange={(value) => form.setValue("payrollFrequency", value as any)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="bi_weekly">Bi-weekly</SelectItem>
                          <SelectItem value="semi_monthly">Semi-monthly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
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
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="payrollProcessing"
                        checked={form.watch("payrollProcessing")}
                        onCheckedChange={(checked) => form.setValue("payrollProcessing", !!checked)}
                      />
                      <Label htmlFor="payrollProcessing">Payroll Processing</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="taxFiling"
                        checked={form.watch("taxFiling")}
                        onCheckedChange={(checked) => form.setValue("taxFiling", !!checked)}
                      />
                      <Label htmlFor="taxFiling">Tax Filing & Compliance</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="timeTracking"
                        checked={form.watch("timeTracking")}
                        onCheckedChange={(checked) => form.setValue("timeTracking", !!checked)}
                      />
                      <Label htmlFor="timeTracking">Time & Attendance Tracking</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="benefits"
                        checked={form.watch("benefits")}
                        onCheckedChange={(checked) => form.setValue("benefits", !!checked)}
                      />
                      <Label htmlFor="benefits">Benefits Administration</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="hrSupport"
                        checked={form.watch("hrSupport")}
                        onCheckedChange={(checked) => form.setValue("hrSupport", !!checked)}
                      />
                      <Label htmlFor="hrSupport">HR Support</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="reporting"
                        checked={form.watch("reporting")}
                        onCheckedChange={(checked) => form.setValue("reporting", !!checked)}
                      />
                      <Label htmlFor="reporting">Payroll Reporting & Analytics</Label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payroll Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-900">Payroll Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="averageMonthlySalaries">Average Monthly Payroll Amount</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        id="averageMonthlySalaries"
                        {...form.register("averageMonthlySalaries")}
                        className="flex-1"
                        placeholder="e.g., 50,000"
                      />
                      <Select value={form.watch("salaryCurrency")} onValueChange={(value) => form.setValue("salaryCurrency", value as any)}>
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

                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-900">Pay Types (Select all that apply)</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="hasVariablePay"
                          checked={form.watch("hasVariablePay")}
                          onCheckedChange={(checked) => form.setValue("hasVariablePay", !!checked)}
                        />
                        <Label htmlFor="hasVariablePay">Variable Pay</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="hasCommissions"
                          checked={form.watch("hasCommissions")}
                          onCheckedChange={(checked) => form.setValue("hasCommissions", !!checked)}
                        />
                        <Label htmlFor="hasCommissions">Commissions</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="hasBonuses"
                          checked={form.watch("hasBonuses")}
                          onCheckedChange={(checked) => form.setValue("hasBonuses", !!checked)}
                        />
                        <Label htmlFor="hasBonuses">Bonuses</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="hasOvertimePay"
                          checked={form.watch("hasOvertimePay")}
                          onCheckedChange={(checked) => form.setValue("hasOvertimePay", !!checked)}
                        />
                        <Label htmlFor="hasOvertimePay">Overtime Pay</Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Compliance & Benefits */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-900">Compliance & Benefits</CardTitle>
                  <p className="text-gray-600">Select additional compliance and benefit services needed</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="needsEndOfService"
                        checked={form.watch("needsEndOfService")}
                        onCheckedChange={(checked) => form.setValue("needsEndOfService", !!checked)}
                      />
                      <Label htmlFor="needsEndOfService">End of Service Calculations</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="needsVacationTracking"
                        checked={form.watch("needsVacationTracking")}
                        onCheckedChange={(checked) => form.setValue("needsVacationTracking", !!checked)}
                      />
                      <Label htmlFor="needsVacationTracking">Vacation Tracking</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="needsSickLeave"
                        checked={form.watch("needsSickLeave")}
                        onCheckedChange={(checked) => form.setValue("needsSickLeave", !!checked)}
                      />
                      <Label htmlFor="needsSickLeave">Sick Leave Management</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="needsInsurance"
                        checked={form.watch("needsInsurance")}
                        onCheckedChange={(checked) => form.setValue("needsInsurance", !!checked)}
                      />
                      <Label htmlFor="needsInsurance">Insurance Management</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="needsRetirement"
                        checked={form.watch("needsRetirement")}
                        onCheckedChange={(checked) => form.setValue("needsRetirement", !!checked)}
                      />
                      <Label htmlFor="needsRetirement">Retirement Planning</Label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Timeline & Budget */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-900">Timeline & Budget</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label>Implementation Timeline *</Label>
                      <RadioGroup
                        value={form.watch("implementationTimeline")}
                        onValueChange={(value) => form.setValue("implementationTimeline", value as any)}
                        className="mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="immediate" id="immediate" />
                          <Label htmlFor="immediate">Immediate (ASAP)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="1_month" id="1_month" />
                          <Label htmlFor="1_month">Within 1 month</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="2_3_months" id="2_3_months" />
                          <Label htmlFor="2_3_months">2-3 months</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="flexible" id="flexible" />
                          <Label htmlFor="flexible">Flexible</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div>
                      <Label htmlFor="monthlyBudget">Estimated Monthly Budget</Label>
                      <div className="flex gap-2 mt-1">
                        <Input
                          id="monthlyBudget"
                          {...form.register("monthlyBudget")}
                          className="flex-1"
                          placeholder="e.g., 2,000"
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
                    <Label htmlFor="currentChallenges">Current Payroll Challenges</Label>
                    <Textarea
                      id="currentChallenges"
                      {...form.register("currentChallenges")}
                      className="mt-1 h-24"
                      placeholder="Describe any current payroll challenges or pain points..."
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
                  {isSubmitting ? "Submitting..." : "Submit Payroll Request"}
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