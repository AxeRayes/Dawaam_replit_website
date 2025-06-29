import { useEffect } from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Users, Globe, Shield, Clock, CheckCircle, TrendingUp, ArrowRight, Briefcase } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";

export default function ManpowerServices() {
  useScrollToTop();

  const services = [
    {
      title: "Contract Staffing",
      description: "Flexible workforce solutions for project-based, seasonal, or peak workload periods",
      features: [
        "Project-specific talent sourcing",
        "Rapid deployment and scaling",
        "Administrative burden reduction",
        "Cost-effective workforce management",
        "Regulatory compliance handling"
      ],
      icon: <Users className="w-8 h-8" />
    },
    {
      title: "Global Recruitment",
      description: "International talent acquisition leveraging our global network",
      features: [
        "Worldwide candidate sourcing",
        "Expatriate talent management",
        "Cross-cultural expertise", 
        "International compliance",
        "Visa and desert pass processing",
        "Relocation support"
      ],
      icon: <Globe className="w-8 h-8" />
    },
    {
      title: "Comprehensive Onboarding",
      description: "Complete support from hire to productive team member",
      features: [
        "Visa and desert pass processing",
        "Cultural orientation training", 
        "Accommodation arrangements",
        "Local integration support",
        "Ongoing professional support"
      ],
      icon: <Shield className="w-8 h-8" />
    }
  ];

  const challenges = [
    {
      title: "Fluctuating Workloads",
      description: "Adapt to changing business demands with flexible staffing"
    },
    {
      title: "Project-Specific Skills",
      description: "Access specialized expertise for specific projects"
    },
    {
      title: "Fast Ramp-Up",
      description: "Quickly scale your workforce for urgent projects"
    },
    {
      title: "Mitigating Hiring Risks",
      description: "Reduce long-term employment risks with contract solutions"
    },
    {
      title: "Reducing Administrative Burden",
      description: "Let us handle payroll, benefits, and compliance"
    },
    {
      title: "Navigating Economic Uncertainty",
      description: "Maintain flexibility during uncertain economic times"
    }
  ];

  const process = [
    {
      step: 1,
      title: "Client Request & Job Specifications",
      description: "Understanding your requirements through comprehensive needs analysis"
    },
    {
      step: 2,
      title: "Global Sourcing",
      description: "Leveraging international networks to find experienced professionals"
    },
    {
      step: 3,
      title: "Comprehensive Screening",
      description: "Multi-stage evaluation including interviews and reference checks"
    },
    {
      step: 4,
      title: "Client Interviews",
      description: "Presenting top candidates for your final selection"
    },
    {
      step: 5,
      title: "Selection & Mobilization", 
      description: "Handling visa processing, desert passes, transportation, and accommodation"
    },
    {
      step: 6,
      title: "Onboarding & Support",
      description: "Ensuring smooth integration with ongoing support"
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
              Manpower Outsourcing
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Strategic workforce solutions addressing your staffing challenges with flexibility, expertise, and cost-effectiveness
            </p>
            <div className="text-lg text-blue-200">
              Global talent • Local expertise • Seamless integration
            </div>
          </div>
        </div>
      </section>

      {/* Service Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Comprehensive Manpower Solutions</h2>
            <p className="text-xl text-gray-600">
              The complex nature of Libya's business environment presents unique staffing challenges. 
              Our contract staffing services provide strategic solutions with flexibility, expertise, and cost-effectiveness.
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

      {/* Staffing Challenges */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Addressing Key Staffing Challenges</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our contract staffing services are designed to solve the most common workforce challenges 
              that companies face in today's dynamic business environment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {challenges.map((challenge, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-[hsl(16,100%,55%)] to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">{challenge.title}</h3>
                    <p className="text-gray-600 text-sm">{challenge.description}</p>
                  </div>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Efficient Contract Staffing Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From initial request to contract completion, we focus on creating an efficient, 
              transparent, and productive experience for all parties involved.
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

      {/* Value Proposition */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Value Proposition</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <TrendingUp className="w-6 h-6 text-[hsl(16,100%,55%)] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Cost-Effective Solutions</h3>
                    <p className="text-gray-600">Reduce hiring costs, administrative overhead, and long-term employment risks while accessing top talent.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-[hsl(16,100%,55%)] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Rapid Deployment</h3>
                    <p className="text-gray-600">Quick turnaround times to meet urgent staffing needs with minimal disruption to your operations.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Shield className="w-6 h-6 text-[hsl(16,100%,55%)] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Full Compliance</h3>
                    <p className="text-gray-600">Complete handling of regulatory compliance, visa processing, and legal requirements for international staff.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Briefcase className="w-6 h-6 text-[hsl(16,100%,55%)] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Ongoing Support</h3>
                    <p className="text-gray-600">Continuous support for both client and contractor throughout the engagement for optimal productivity.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Ready to Scale Your Workforce?</h3>
                <p className="text-gray-600 mb-8">
                  Let our manpower outsourcing solutions help you achieve operational flexibility 
                  and access specialized talent for your projects.
                </p>
                
                <div className="space-y-4">
                  <Button 
                    className="w-full bg-[hsl(16,100%,55%)] hover:bg-orange-600 text-white py-3 rounded-xl font-bold"
                    onClick={() => window.location.href = '/manpower-request'}
                  >
                    Request Manpower Services
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="w-full border-2 border-[hsl(16,100%,55%)] text-[hsl(16,100%,55%)] hover:bg-[hsl(16,100%,55%)] hover:text-white py-3 rounded-xl font-bold"
                    onClick={() => window.location.href = '/manpower-personas'}
                  >
                    View Professional Persona Examples
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