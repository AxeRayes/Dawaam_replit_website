import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import recruitmentIcon from "@assets/4_1750769913381.png";
import manpowerIcon from "@assets/5_1750769913380.png";
import payrollIcon from "@assets/6_1750769913380.png";
import immigrationIcon from "@assets/7_1750769913381.png";
import trainingIcon from "@assets/8_1750769913381.png";
import consultingIcon from "@assets/9_1750769913381.png";

const coreServices = [
  {
    icon: recruitmentIcon,
    title: "Recruitment Services",
    description: "Local and expat staffing solutions to connect the right talent with the right opportunities.",
    cta: "Hire Talent",
    image: "bg-gradient-to-br from-blue-500 to-blue-700"
  },
  {
    icon: manpowerIcon,
    title: "Manpower Outsourcing",
    description: "Flexible workforce solutions to help you scale your business efficiently and cost-effectively.",
    cta: "Get Started",
    image: "bg-gradient-to-br from-green-500 to-green-700"
  },
  {
    icon: payrollIcon,
    title: "Payroll Management",
    description: "Accurate and compliant payroll processing services to streamline your HR operations.",
    cta: "Request Payroll Services",
    image: "bg-gradient-to-br from-purple-500 to-purple-700"
  },
  {
    icon: immigrationIcon,
    title: "Immigration & Visa Services",
    description: "Expert guidance and support for all visa and immigration requirements.",
    cta: "Learn More",
    image: "bg-gradient-to-br from-indigo-500 to-indigo-700"
  },
  {
    icon: trainingIcon,
    title: "Training & Capacity Building",
    description: "Professional development programs to enhance skills and boost career growth.",
    cta: "View Programs",
    image: "bg-gradient-to-br from-yellow-500 to-yellow-700"
  },
  {
    icon: consultingIcon,
    title: "HR & Management Consulting",
    description: "Strategic HR consulting to optimize your human resources and management processes.",
    cta: "Book a Consultation",
    image: "bg-gradient-to-br from-red-500 to-red-700"
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive HR solutions tailored to meet the unique needs of businesses and professionals in Libya
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children">
          {coreServices.map((service, index) => (
            <Card 
              key={index} 
              className="service-card group hover:shadow-xl border border-gray-100 overflow-hidden opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]"
              style={{ 
                animationDelay: `${index * 150}ms`,
                '--index': index 
              } as any}
            >
              <div className={`h-48 ${service.image} flex items-center justify-center relative`}>
                <div className="absolute inset-0 bg-black/20"></div>
                <img 
                  src={service.icon} 
                  alt={`${service.title} icon`}
                  className="w-60 h-60 object-contain relative z-10 filter brightness-0 invert"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">{service.description}</p>
                <Button 
                  className="bg-[hsl(226,56%,26%)] hover:bg-[hsl(226,56%,20%)] text-white w-full"
                  onClick={() => {
                    if (service.title === "Training & Capacity Building") {
                      window.location.href = '/training';
                    } else if (service.title === "Recruitment Services") {
                      window.location.href = '/recruitment-services';
                    } else if (service.title === "Payroll Management") {
                      window.location.href = '/payroll-services';
                    } else if (service.title === "Manpower Outsourcing") {
                      window.location.href = '/manpower-services';
                    } else if (service.title === "Immigration & Visa Services") {
                      window.location.href = '/immigration-services';
                    } else if (service.title === "HR & Management Consulting") {
                      window.location.href = '/hr-consulting';
                    }
                  }}
                >
                  {service.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
