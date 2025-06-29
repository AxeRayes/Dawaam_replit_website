import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import BackToTop from "@/components/back-to-top";
import { ArrowRight, Users, Search, Calculator, Shield, Building, Wrench, Stethoscope, Briefcase } from "lucide-react";
import searchIcon from "@assets/4_1750769169996.png";
import teamIcon from "@assets/5_1750769169996.png";
import calculatorIcon from "@assets/6_1750769169995.png";
import shieldIcon from "@assets/7_1750769169995.png";
import fathiImage from "@assets/image_1750939914929.png";
import kwameImage from "@assets/image_1750939928483.png";
import nabilImage from "@assets/image_1750939941692.png";
import raniaImage from "@assets/image_1750939953063.png";

const personas = [
  {
    id: "local-contractor",
    title: "Local Contractors",
    subtitle: "Libyan Professionals on Dawaam Payroll",
    icon: <Users className="w-8 h-8 text-green-600" />,
    image: teamIcon,
    persona: {
      name: "Fathi al-Misrati",
      nationality: "Libyan",
      role: "HSE Officer",
      duration: "Project-based (6–12 months)",
      managedBy: "Dawaam",
      image: fathiImage
    },
    description: "Qualified Libyan professionals managed through Dawaam's payroll system for project-based assignments.",
    services: [
      "Fully compliant monthly payroll management",
      "Local tax, social security, and legal contributions handled",
      "Digital timesheet & invoice processing",
      "Employment contract issuance & HR file maintenance",
      "Covered under Dawaam's active liability & employer insurance"
    ],
    industries: ["Oil & Gas", "Infrastructure", "Industrial", "Construction"],
    experience: "Project-based assignments",
    certifications: ["Industry-specific certifications", "Safety protocols", "Local compliance"]
  },
  {
    id: "short-term-foreign",
    title: "Short-Term Foreign Contractors",
    subtitle: "90-Day Specialist Assignments",
    icon: <Search className="w-8 h-8 text-blue-600" />,
    image: searchIcon,
    persona: {
      name: "Kwame Mensah",
      nationality: "Ghanaian",
      role: "Instrumentation Technician",
      duration: "90 days",
      managedBy: "Dawaam",
      image: kwameImage
    },
    description: "Specialized foreign contractors for short-term technical assignments with full logistical support.",
    services: [
      "Visa & Desert Pass Processing",
      "Full logistical support (airport, hotel, transport)",
      "On-time payroll & tax handling",
      "Onboarding & contractor support during assignment",
      "Covered under Dawaam's active liability & employer insurance"
    ],
    industries: ["Oil & Gas", "Energy", "Infrastructure", "Industrial"],
    experience: "90-day assignments",
    certifications: ["Technical specializations", "International work permits"]
  },
  {
    id: "long-term-foreign",
    title: "Long-Term Foreign Contractors",
    subtitle: "12+ Month Strategic Assignments",
    icon: <Building className="w-8 h-8 text-purple-600" />,
    image: calculatorIcon,
    persona: {
      name: "Nabil Benyamina",
      nationality: "Algerian",
      role: "Senior Drilling & Mud Engineer",
      duration: "12+ months",
      managedBy: "Dawaam",
      image: nabilImage
    },
    description: "Senior foreign professionals for long-term strategic roles with comprehensive visa and residency support.",
    services: [
      "Visa & Residency Permit Processing",
      "Desert Pass acquisition",
      "On-time payroll & tax/social security compliance",
      "Administrative support (flights, accommodation, documentation)",
      "Covered under Dawaam's active liability & employer insurance"
    ],
    industries: ["Oil & Gas", "Energy", "Infrastructure", "Industrial"],
    experience: "12+ month assignments",
    certifications: ["Senior technical expertise", "Residency permits", "Desert pass"]
  },
  {
    id: "direct-hire",
    title: "Direct Hire (Local)",
    subtitle: "Permanent Libyan Employee Placement",
    icon: <Shield className="w-8 h-8 text-red-600" />,
    image: shieldIcon,
    persona: {
      name: "Rania al-Tarhuniya",
      nationality: "Libyan",
      role: "Senior Administrator",
      duration: "Permanent – Hired directly by Client",
      managedBy: "Client (recruited through Dawaam)",
      image: raniaImage
    },
    description: "Permanent placement of qualified Libyan professionals directly hired by the client company.",
    services: [
      "Sourcing of qualified local candidates",
      "Candidate screening, interviews, and shortlist presentation",
      "Coordination of job offer and onboarding",
      "Covered under Dawaam's recruitment guarantee"
    ],
    industries: ["All sectors", "Oil & Gas", "Corporate", "Industrial"],
    experience: "Permanent placement",
    certifications: ["Professional qualifications", "Local expertise"]
  }
];

export default function ManpowerPersonas() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Manpower & Compliance Support Models
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Persona-Based Overview of Services for Local and Foreign Staff
            </p>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-4 py-2 text-lg">
              Oil, Gas, Infrastructure & Industrial Sectors
            </Badge>
          </div>
        </div>
      </section>

      {/* Personas Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Contractor Types & Service Models
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-4">
              Four distinct workforce solutions tailored for Libya's oil, gas, infrastructure, and industrial sectors.
              Each model provides full compliance, operational efficiency, and risk mitigation.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto">
              <p className="text-blue-800 font-medium">
                <strong>Note:</strong> The following personas are examples of Dawaam's comprehensive manpower services. 
                Each represents the types of qualified professionals we can provide for your specific project needs.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {personas.map((persona) => (
              <Card key={persona.id} className="h-full hover:shadow-xl transition-shadow duration-300 border-0 shadow-md">
                <CardHeader className="text-center pb-4">
                  {persona.persona.image ? (
                    <img 
                      src={persona.persona.image} 
                      alt={persona.persona.name}
                      className="w-32 h-40 mx-auto mb-4 object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                      {persona.icon}
                    </div>
                  )}
                  <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                    {persona.title}
                  </CardTitle>
                  <p className="text-sm text-gray-600 font-medium">
                    {persona.subtitle}
                  </p>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {persona.description}
                  </p>
                  
                  {/* Persona Example */}
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-3 text-sm">Persona Example:</h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Name:</span>
                        <span className="font-medium">{persona.persona.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Nationality:</span>
                        <span className="font-medium">{persona.persona.nationality}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Role:</span>
                        <span className="font-medium">{persona.persona.role}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium">{persona.persona.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Managed by:</span>
                        <span className="font-medium">{persona.persona.managedBy}</span>
                      </div>
                    </div>
                  </div>

                  {/* Services Provided */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 text-sm">Services Provided:</h4>
                    <div className="grid grid-cols-1 gap-1">
                      {persona.services.map((service, index) => (
                        <div key={index} className="text-xs text-gray-600 flex items-start">
                          <div className="w-1.5 h-1.5 bg-green-600 rounded-full mr-2 mt-1 flex-shrink-0"></div>
                          <span>{service}</span>
                        </div>
                      ))}
                    </div>
                  </div>


                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              What We Deliver
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Visa & Compliance</h3>
                <p className="text-sm text-gray-600">Visa, residency & desert pass handling with full legal compliance</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                  <Calculator className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Payroll & Tax</h3>
                <p className="text-sm text-gray-600">Payroll, tax & social security compliance management</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <Building className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Full Support</h3>
                <p className="text-sm text-gray-600">Accommodation, transport & onboarding services</p>
              </div>
            </div>
            <div className="bg-blue-600 text-white p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">Why Choose Dawaam?</h3>
              <p className="text-lg mb-6">
                Our service allows clients to reduce administrative burden, ensure legal compliance, 
                and deploy workforce resources faster and with lower risk — all through a single local partner.
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  Active Employer Liability Insurance
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  Flexible Pricing Models
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  Local Expertise
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Let's Build a Compliant, Scalable Workforce Together
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
            At Dawaam, we don't just place people — we deliver full-service workforce solutions 
            tailored to Libya's complex energy environment. From urgent short-term deployment to 
            long-term strategic staffing, we ensure every step is legal, efficient, and low-risk.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 font-semibold transition-all"
              onClick={() => window.location.href = '/manpower-request'}
            >
              Request Manpower Services
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 font-semibold transition-all"
              onClick={() => window.location.href = '/contact'}
            >
              Discuss Requirements
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <BackToTop />
    </div>
  );
}