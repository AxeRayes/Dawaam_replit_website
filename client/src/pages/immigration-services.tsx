import { useEffect } from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { FileCheck, Plane, Shield, FileText, CheckCircle, Clock, ArrowRight, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";

export default function ImmigrationServices() {
  useScrollToTop();

  const services = [
    {
      title: "Visa Processing",
      description: "Complete visa application and processing services for international employees",
      features: [
        "Work visa applications",
        "Business visa processing", 
        "Desert pass applications",
        "Visa renewal services",
        "Documentation preparation",
        "Government liaison support"
      ],
      icon: <FileCheck className="w-8 h-8" />
    },
    {
      title: "Work Permit Processing",
      description: "Comprehensive work permit applications and compliance management",
      features: [
        "Work permit applications",
        "Labor certification",
        "Permit renewals",
        "Compliance monitoring",
        "Legal requirement updates"
      ],
      icon: <FileText className="w-8 h-8" />
    },
    {
      title: "Relocation Support",
      description: "End-to-end relocation assistance for international employees",
      features: [
        "Accommodation arrangements",
        "Transportation coordination",
        "Cultural orientation training",
        "Local integration support",
        "Family relocation assistance"
      ],
      icon: <Plane className="w-8 h-8" />
    }
  ];

  const visaTypes = [
    "Work Visas",
    "Business Visas",
    "Desert Passes"
  ];

  const process = [
    {
      step: 1,
      title: "Initial Consultation",
      description: "Assessment of visa requirements and documentation needs"
    },
    {
      step: 2,
      title: "Document Preparation",
      description: "Gathering and preparing all required documentation"
    },
    {
      step: 3,
      title: "Application Submission",
      description: "Filing applications with relevant government authorities"
    },
    {
      step: 4,
      title: "Processing Support",
      description: "Monitoring application status and handling inquiries"
    },
    {
      step: 5,
      title: "Approval & Collection",
      description: "Collecting approved documents and final preparations"
    },
    {
      step: 6,
      title: "Arrival Support",
      description: "Assistance with arrival procedures and integration"
    }
  ];

  const benefits = [
    {
      title: "Expert Knowledge",
      description: "Deep understanding of Libya's immigration laws and procedures",
      icon: <Shield className="w-6 h-6" />
    },
    {
      title: "Faster Processing",
      description: "Streamlined processes to minimize waiting times",
      icon: <Clock className="w-6 h-6" />
    },
    {
      title: "Compliance Assurance",
      description: "Full compliance with all legal requirements and regulations",
      icon: <CheckCircle className="w-6 h-6" />
    },
    {
      title: "Comprehensive Support",
      description: "End-to-end support from application to successful integration",
      icon: <Users className="w-6 h-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[hsl(226,56%,26%)] to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Immigration & Visa Services
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Comprehensive immigration support for businesses and individuals seeking to work and establish operations in Libya
            </p>
            <div className="text-lg text-blue-200">
              Expert guidance • Legal compliance • Seamless processes
            </div>
          </div>
        </div>
      </section>

      {/* Service Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Complete Immigration Solutions</h2>
            <p className="text-xl text-gray-600">
              Our immigration and visa services provide comprehensive support for international employees, 
              ensuring smooth transitions and full compliance with Libya's immigration requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-[hsl(226,56%,26%)] to-blue-700 rounded-2xl flex items-center justify-center mb-4 text-white">
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl text-gray-900">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-[hsl(16,100%,55%)]" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Visa Types */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Visa Types We Handle</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide assistance with work visas, business visas, and desert passes 
              to meet your professional and business requirements in Libya.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {visaTypes.map((visa, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-[hsl(16,100%,55%)] rounded-full"></div>
                  <span className="font-semibold text-gray-900">{visa}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Immigration Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A systematic approach ensuring smooth and efficient processing of all immigration requirements
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {process.map((step, index) => (
                <div key={index} className="relative">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[hsl(16,100%,55%)] to-orange-600 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                  {index < process.length - 1 && (
                    <div className="hidden lg:block absolute top-6 -right-4 w-8 h-0.5 bg-gray-300"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose Our Immigration Services?</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-none shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[hsl(16,100%,55%)] to-orange-600 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Required Documentation</h2>
                <p className="text-xl text-gray-600 mb-8">
                  We handle all aspects of documentation preparation and verification to ensure 
                  your application meets all requirements for successful processing.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-[hsl(16,100%,55%)]" />
                    <span className="text-gray-700">Passport and ID Documentation</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-[hsl(16,100%,55%)]" />
                    <span className="text-gray-700">Educational Certificates</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-[hsl(16,100%,55%)]" />
                    <span className="text-gray-700">Professional Experience Certificates</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-[hsl(16,100%,55%)]" />
                    <span className="text-gray-700">Medical Certificates</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-[hsl(16,100%,55%)]" />
                    <span className="text-gray-700">Police Clearance Certificates</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-[hsl(16,100%,55%)]" />
                    <span className="text-gray-700">Document Translation & Authentication</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-[hsl(16,100%,55%)]" />
                    <span className="text-gray-700">Desert Pass Processing</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Ready to Start Your Immigration Process?</h3>
                <p className="text-gray-600 mb-8">
                  Let our immigration experts guide you through every step of the process, 
                  ensuring a smooth and successful transition to Libya.
                </p>
                
                <div className="space-y-4">
                  <Button 
                    className="w-full bg-[hsl(16,100%,55%)] hover:bg-orange-600 text-white py-3 rounded-xl font-bold"
                    onClick={() => window.location.href = '/immigration-request'}
                  >
                    Request Immigration Services
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="w-full border-2 border-[hsl(226,56%,26%)] text-[hsl(226,56%,26%)] hover:bg-[hsl(226,56%,26%)] hover:text-white py-3 rounded-xl font-bold"
                    onClick={() => window.location.href = '/contact'}
                  >
                    Schedule Consultation
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}