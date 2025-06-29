import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import BackToTop from "@/components/back-to-top";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSubmissionSchema } from "@shared/schema";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import contactImagePath from "@assets/Copy of Untitled (3)_1750935227137.png";
import logoPath from "@assets/dawaam_1750936913158.png";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  serviceInterest: string;
  message: string;
  agreeToTerms: boolean;
};

export default function Contact() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const form = useForm<FormData>({
    resolver: zodResolver(insertContactSubmissionSchema.extend({
      agreeToTerms: z.boolean().refine(val => val === true, {
        message: "You must agree to the terms and conditions"
      })
    })),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      serviceInterest: "",
      message: "",
      agreeToTerms: false,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: Omit<FormData, "agreeToTerms">) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/contact-submissions"] });
    },
    onError: () => {
      toast({
        title: "Failed to send message",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    const { agreeToTerms, ...submitData } = data;
    mutation.mutate(submitData);
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Contact Hero */}
      <section className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 hero-pattern opacity-30"></div>
        
        <div className="relative container mx-auto px-4 py-16 lg:py-24">
          <div className="grid lg:grid-cols-12 gap-8 items-center min-h-[500px]">
            {/* Hero Content */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <div className="inline-block px-6 py-3 bg-[hsl(16,100%,55%)]/20 rounded-full border border-[hsl(16,100%,55%)]/30">
                  <span className="text-lg font-semibold text-[hsl(16,100%,70%)]">Contact Our Team</span>
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Let's Build Your
                  <span className="block text-[hsl(16,100%,65%)]">Success Together</span>
                </h1>
              </div>
              
              <p className="text-xl text-slate-300 leading-relaxed max-w-xl">
                Connect with our HR experts to transform your workforce strategy and unlock your organization's full potential.
              </p>
            </div>
            
            {/* Team Member Image */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-[hsl(16,100%,55%)]/20 to-blue-500/20 blur-xl rounded-3xl"></div>
                <img 
                  src={contactImagePath} 
                  alt="Dawaam Team Member" 
                  className="relative w-80 h-auto lg:w-96 lg:h-auto object-cover object-center rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom border accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[hsl(16,100%,55%)] to-blue-500"></div>
      </section>

      {/* Contact Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div id="contact-info" className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  <Card>
                    <CardContent className="flex items-start space-x-4 p-6">
                      <div className="w-12 h-12 bg-[hsl(16,100%,55%)] rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Office Address</h3>
                        <p className="text-gray-600">Regus Seraj</p>
                        <p className="text-gray-600">Tripoli, Libya</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="flex items-start space-x-4 p-6">
                      <div className="w-12 h-12 bg-[hsl(16,100%,55%)] rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                        <p className="text-gray-600">+218 91 588 5111</p>
                        <p className="text-gray-600">+218 92 588 5111</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="flex items-start space-x-4 p-6">
                      <div className="w-12 h-12 bg-[hsl(16,100%,55%)] rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                        <p className="text-gray-600">info@dawaam.com</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="flex items-start space-x-4 p-6">
                      <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <SiWhatsapp className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">WhatsApp</h3>
                        <p className="text-gray-600 mb-2">+218 91 588 5111</p>
                        <Button 
                          className="bg-green-500 hover:bg-green-600 text-white"
                          onClick={() => window.open('https://wa.me/218915885111', '_blank')}
                        >
                          <SiWhatsapp className="w-4 h-4 mr-2" />
                          Chat with us
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                </div>
              </div>
              
              {/* Office Hours */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Office Hours
                  </h3>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex justify-between">
                      <span>Sunday - Thursday:</span>
                      <span>9:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Friday:</span>
                      <span>Closed</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday:</span>
                      <span>Closed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Contact Form */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send us a Message</h2>
                
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        {...form.register("firstName")}
                        placeholder="Enter your first name"
                        className="mt-2"
                      />
                      {form.formState.errors.firstName && (
                        <p className="text-sm text-red-600 mt-1">{form.formState.errors.firstName.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        {...form.register("lastName")}
                        placeholder="Enter your last name"
                        className="mt-2"
                      />
                      {form.formState.errors.lastName && (
                        <p className="text-sm text-red-600 mt-1">{form.formState.errors.lastName.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      {...form.register("email")}
                      placeholder="Enter your email address"
                      className="mt-2"
                    />
                    {form.formState.errors.email && (
                      <p className="text-sm text-red-600 mt-1">{form.formState.errors.email.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      {...form.register("phone")}
                      placeholder="Enter your phone number"
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="serviceInterest">Service Interest *</Label>
                    <Select onValueChange={(value) => form.setValue("serviceInterest", value)}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recruitment">Recruitment Services</SelectItem>
                        <SelectItem value="manpower">Manpower Outsourcing</SelectItem>
                        <SelectItem value="payroll">Payroll Management</SelectItem>
                        <SelectItem value="immigration">Immigration & Visa Services</SelectItem>
                        <SelectItem value="training">Training & Capacity Building</SelectItem>
                        <SelectItem value="consulting">HR & Management Consulting</SelectItem>
                        <SelectItem value="auditing">Event Auditing</SelectItem>
                        <SelectItem value="general">General Inquiry</SelectItem>
                      </SelectContent>
                    </Select>
                    {form.formState.errors.serviceInterest && (
                      <p className="text-sm text-red-600 mt-1">{form.formState.errors.serviceInterest.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      {...form.register("message")}
                      placeholder="Tell us about your needs or questions..."
                      rows={5}
                      className="mt-2"
                    />
                    {form.formState.errors.message && (
                      <p className="text-sm text-red-600 mt-1">{form.formState.errors.message.message}</p>
                    )}
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="agreeToTerms"
                      checked={form.watch("agreeToTerms")}
                      onCheckedChange={(checked) => form.setValue("agreeToTerms", checked as boolean)}
                    />
                    <Label htmlFor="agreeToTerms" className="text-sm text-gray-600">
                      I agree to the Terms of Service and Privacy Policy *
                    </Label>
                  </div>
                  {form.formState.errors.agreeToTerms && (
                    <p className="text-sm text-red-600">{form.formState.errors.agreeToTerms.message}</p>
                  )}
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-[hsl(16,100%,55%)] hover:bg-[hsl(16,100%,50%)] text-white"
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          {/* Map Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Find Our Office</h2>
            <Card>
              <CardContent className="p-0">
                <div className="w-full h-96 bg-gray-200 rounded-lg overflow-hidden relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3349.123456789!2d13.08750192608777!3d32.84198617363664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13a8c6d5b6e2c5d1%3A0x1234567890abcdef!2sRegus%20Seraj%20Tower%2C%20Tripoli!5e0!3m2!1sen!2sly!4v1640995200000!5m2!1sen!2sly"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Dawaam Office Location - Regus Seraj Tower, Tripoli"
                  />
                  {/* Custom Dawaam Logo Marker */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                    <div className="relative">
                      <div className="w-16 h-16 bg-white rounded-full shadow-xl border-3 border-white flex items-center justify-center">
                        <img 
                          src={logoPath} 
                          alt="Dawaam Office" 
                          className="w-12 h-12 object-contain"
                        />
                      </div>
                      <div className="absolute -inset-1 bg-gradient-to-r from-[hsl(16,100%,55%)] to-blue-500 rounded-full opacity-20 blur-sm"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>



      <Footer />
      <BackToTop />
    </div>
  );
}
