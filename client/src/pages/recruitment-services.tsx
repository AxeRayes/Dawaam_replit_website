import { useEffect } from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Users, Search, CheckCircle, Clock, Target, Award, ArrowRight, FileText, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";

export default function RecruitmentServices() {
  useScrollToTop();

  const recruitmentTypes = [
    {
      title: "Direct Hire Recruitment",
      description: "Permanent placement solutions for full-time positions",
      features: [
        "Comprehensive candidate sourcing",
        "Multi-stage screening process",
        "Skills and cultural fit assessment",
        "Background verification",
        "Salary negotiation support"
      ],
      icon: <Users className="w-8 h-8" />
    },
    {
      title: "Executive Search",
      description: "Specialized recruitment for senior and executive roles",
      features: [
        "Confidential search process",
        "Leadership assessment",
        "Industry expertise",
        "Executive network access",
        "Succession planning support"
      ],
      icon: <Target className="w-8 h-8" />
    },
    {
      title: "Contract Staffing",
      description: "Flexible staffing solutions for project-based needs",
      features: [
        "Project-specific talent",
        "Rapid deployment",
        "Administrative handling",
        "Scalable workforce",
        "Cost-effective solutions"
      ],
      icon: <Clock className="w-8 h-8" />
    }
  ];

  const industries = [
    "Oil & Gas",
    "Banking & Finance", 
    "Construction & Infrastructure",
    "Healthcare",
    "Education",
    "Telecoms & IT"
  ];

  const process = [
    {
      step: 1,
      title: "Client Consultation",
      description: "Understanding your specific requirements and company culture"
    },
    {
      step: 2,
      title: "Talent Sourcing",
      description: "Leveraging our network and databases to find qualified candidates"
    },
    {
      step: 3,
      title: "Screening & Assessment",
      description: "Comprehensive evaluation including skills, experience, and cultural fit"
    },
    {
      step: 4,
      title: "Client Presentation",
      description: "Presenting top candidates with detailed profiles and recommendations"
    },
    {
      step: 5,
      title: "Interview Coordination",
      description: "Managing the interview process and gathering feedback"
    },
    {
      step: 6,
      title: "Offer & Onboarding",
      description: "Facilitating offers, negotiations, and smooth onboarding"
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
              Recruitment Services
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Connecting top talent with leading organizations through comprehensive recruitment solutions
            </p>
            <div className="text-lg text-blue-200">
              Established in 2014 • Trusted by leading companies across Libya
            </div>
          </div>
        </div>
      </section>

      {/* Service Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Recruitment Expertise</h2>
            <p className="text-xl text-gray-600">
              At Dawaam, we understand that talent is the driving force behind business success. 
              Our comprehensive recruitment services are designed to help you find, attract, and 
              retain the best professionals in your industry.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {recruitmentTypes.map((type, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-[hsl(226,56%,26%)] to-blue-700 rounded-2xl flex items-center justify-center mb-4 text-white">
                    {type.icon}
                  </div>
                  <CardTitle className="text-xl text-gray-900">{type.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6">{type.description}</p>
                  <ul className="space-y-2">
                    {type.features.map((feature, idx) => (
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

      {/* Industries Served */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Industries We Serve</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our recruitment expertise spans across diverse industries, helping businesses 
              find specialized talent for their unique requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {industries.map((industry, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-[hsl(16,100%,55%)] rounded-full"></div>
                  <span className="font-semibold text-gray-900">{industry}</span>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Recruitment Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A systematic, thorough approach that ensures we find the right talent for your organization
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

      {/* Why Choose Dawaam */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose Dawaam for Recruitment?</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Award className="w-6 h-6 text-[hsl(16,100%,55%)] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Established Track Record</h3>
                    <p className="text-gray-600">Over 10 years of experience helping businesses across Libya find and develop top talent.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Search className="w-6 h-6 text-[hsl(16,100%,55%)] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Comprehensive Screening</h3>
                    <p className="text-gray-600">Rigorous multi-stage screening process including skills assessment, background verification, and cultural fit evaluation.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Users className="w-6 h-6 text-[hsl(16,100%,55%)] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Industry Expertise</h3>
                    <p className="text-gray-600">Deep understanding of local and international talent markets with specialized knowledge across multiple industries.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-[hsl(16,100%,55%)] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">End-to-End Service</h3>
                    <p className="text-gray-600">Complete recruitment support from initial consultation to successful onboarding and beyond.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Ready to Find Your Next Hire?</h3>
                <p className="text-gray-600 mb-8">
                  Let our experienced recruitment team help you identify and attract the best talent for your organization.
                </p>
                
                <div className="space-y-4">
                  <Button 
                    className="w-full bg-[hsl(16,100%,55%)] hover:bg-orange-600 text-white py-3 rounded-xl font-bold"
                    onClick={() => window.location.href = '/recruitment-agreement'}
                  >
                    Sign Agreement & Start
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="w-full border-2 border-[hsl(226,56%,26%)] text-[hsl(226,56%,26%)] hover:bg-[hsl(226,56%,26%)] hover:text-white py-3 rounded-xl font-bold"
                    onClick={() => window.location.href = '/contact'}
                  >
                    Schedule Consultation
                  </Button>

                  <div className="mt-6 pt-6 border-t">
                    <div className="flex items-center space-x-3 mb-3">
                      <FileText className="w-5 h-5 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">Standard Recruitment Agreement</span>
                    </div>
                    <p className="text-xs text-gray-600 mb-3">
                      Review our standard terms and conditions for recruitment services
                    </p>
                    <Button 
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-[hsl(16,100%,55%)] hover:text-orange-600 hover:bg-orange-50"
                      onClick={() => window.open('/uploads/Dawaam - Standard Agreement _2025_1750939198727.pdf', '_blank')}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Agreement (PDF)
                    </Button>
                  </div>
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