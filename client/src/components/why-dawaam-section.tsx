import { Card, CardContent } from "@/components/ui/card";
import { Users, Handshake, Calculator, Shield, GraduationCap, Heart } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Recruitment Excellence",
    description: "Connecting top talent with leading companies across Libya with our proven recruitment methodologies.",
  },
  {
    icon: Handshake,
    title: "Manpower Solutions",
    description: "Flexible staffing solutions that adapt to your business needs and operational requirements.",
  },
  {
    icon: Calculator,
    title: "Payroll Expertise",
    description: "Comprehensive payroll management ensuring accuracy, compliance, and timely processing.",
  },
  {
    icon: Shield,
    title: "Full Compliance",
    description: "Adherence to all local labor laws and international standards for reliable service delivery.",
  },
  {
    icon: GraduationCap,
    title: "Professional Training",
    description: "Capacity building programs that enhance workforce skills and drive organizational growth.",
  },
  {
    icon: Heart,
    title: "UNWEP Signatory",
    description: "Committed to gender equality and women's empowerment in the workplace.",
  },
];

export default function WhyDawaamSection() {
  return (
    <section id="why-dawaam" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Choose Dawaam?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your trusted partner for HR excellence in Libya, backed by credentials and local expertise
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="flex items-start space-x-4 p-6">
                <div className="w-12 h-12 bg-[hsl(16,100%,55%)] rounded-lg flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
}
