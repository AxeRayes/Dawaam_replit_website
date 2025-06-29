import { useEffect } from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Calculator, Shield, Clock, FileText, CheckCircle, TrendingUp, ArrowRight, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";

export default function PayrollServices() {
  useScrollToTop();

  const services = [
    {
      title: "Payroll Processing",
      description: "Comprehensive payroll management for accurate and timely salary processing",
      features: [
        "Automated salary calculations",
        "Tax deductions and filings",
        "Benefits administration",
        "Direct deposit management",
        "Payroll reporting and analytics"
      ],
      icon: <Calculator className="w-8 h-8" />
    },
    {
      title: "Compliance Management",
      description: "Ensuring full compliance with local labor laws and regulations",
      features: [
        "Labor law compliance",
        "Social security administration",
        "Tax filing and reporting",
        "Employment contract management",
        "Regulatory updates and changes"
      ],
      icon: <Shield className="w-8 h-8" />
    },
    {
      title: "Employee Benefits",
      description: "Complete benefits administration and management",
      features: [
        "Health insurance management",
        "Retirement plan administration",
        "Vacation and leave tracking",
        "End-of-service calculations",
        "Performance incentive management"
      ],
      icon: <FileText className="w-8 h-8" />
    }
  ];

  const features = [
    {
      title: "Multi-Currency Support",
      description: "Handle payroll in USD, LYD, and other currencies as needed"
    },
    {
      title: "Real-Time Reporting",
      description: "Access comprehensive payroll reports and analytics anytime"
    },
    {
      title: "Automated Calculations",
      description: "Accurate computation of salaries, taxes, and deductions"
    },
    {
      title: "Secure Data Management",
      description: "Bank-level security for all employee and payroll data"
    },
    {
      title: "Scalable Solutions",
      description: "Adapt to your growing workforce needs seamlessly"
    },
    {
      title: "Expert Support",
      description: "Dedicated payroll specialists available for assistance"
    }
  ];

  const benefits = [
    {
      title: "Cost Reduction",
      description: "Eliminate in-house payroll costs and reduce administrative overhead",
      icon: <DollarSign className="w-6 h-6" />
    },
    {
      title: "Time Savings",
      description: "Free up valuable time to focus on core business activities",
      icon: <Clock className="w-6 h-6" />
    },
    {
      title: "Accuracy Guarantee",
      description: "Minimize errors with automated systems and expert oversight",
      icon: <CheckCircle className="w-6 h-6" />
    },
    {
      title: "Compliance Assurance",
      description: "Stay compliant with changing regulations and labor laws",
      icon: <Shield className="w-6 h-6" />
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
              Payroll Management
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Comprehensive payroll solutions ensuring accuracy, compliance, and peace of mind for your business
            </p>
            <div className="text-lg text-blue-200">
              Accurate • Compliant • Secure • Efficient
            </div>
          </div>
        </div>
      </section>

      {/* Service Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Complete Payroll Solutions</h2>
            <p className="text-xl text-gray-600">
              Our comprehensive payroll management services handle all aspects of employee compensation, 
              from salary processing to compliance management, allowing you to focus on growing your business.
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

      {/* Key Features */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Key Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our payroll management platform combines advanced technology with expert knowledge 
              to deliver reliable and efficient payroll solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-[hsl(16,100%,55%)] to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Outsource Your Payroll?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the advantages of partnering with Dawaam for your payroll management needs
            </p>
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

      {/* Compliance Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Compliance Made Simple</h2>
                <p className="text-xl text-gray-600 mb-8">
                  Navigating payroll compliance in Libya can be complex. Our expert team ensures 
                  your payroll operations meet all local requirements and regulations.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-[hsl(16,100%,55%)]" />
                    <span className="text-gray-700">Libya Labor Law Compliance</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-[hsl(16,100%,55%)]" />
                    <span className="text-gray-700">Social Security Contributions</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-[hsl(16,100%,55%)]" />
                    <span className="text-gray-700">Tax Filing and Reporting</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-[hsl(16,100%,55%)]" />
                    <span className="text-gray-700">End-of-Service Calculations</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-[hsl(16,100%,55%)]" />
                    <span className="text-gray-700">Regulatory Updates</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Ready to Streamline Your Payroll?</h3>
                <p className="text-gray-600 mb-8">
                  Let our payroll experts handle the complexities while you focus on what matters most - 
                  growing your business and managing your team.
                </p>
                
                <div className="space-y-4">
                  <Button 
                    className="w-full bg-[hsl(16,100%,55%)] hover:bg-orange-600 text-white py-3 rounded-xl font-bold"
                    onClick={() => window.location.href = '/payroll-request'}
                  >
                    Request Payroll Services
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