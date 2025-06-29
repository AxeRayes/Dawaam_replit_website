import { Button } from "@/components/ui/button";
import { CheckCircle, Plus, Calendar } from "lucide-react";
import employerBgImage from "@assets/Copy of Untitled (1)_1750770862983.png";

const benefits = [
  "Access to qualified local and international talent",
  "Streamlined recruitment processes",
  "Flexible manpower outsourcing solutions",
  "Complete payroll management services",
  "HR consulting and training programs",
];

export default function ForEmployersSection() {
  return (
    <section id="employers" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center stagger-children">
          <div className="transform transition-all duration-700 ease-out" style={{ '--index': 0 } as any}>
            <div className="relative rounded-xl shadow-lg overflow-hidden w-full h-96 transform transition-all duration-500 hover:scale-105">
              <img 
                src={employerBgImage} 
                alt="Professional business executive" 
                className="w-full h-full object-cover object-[center_20%]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[hsl(226,56%,26%)]/60 to-[hsl(226,56%,26%)]/40"></div>
            </div>
          </div>
          
          <div className="space-y-6 transform transition-all duration-700 ease-out delay-200" style={{ '--index': 1 } as any}>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">For Employers</h2>
            <p className="text-xl text-gray-600">
              Find the right talent to drive your business forward with our comprehensive recruitment and workforce solutions.
            </p>
            
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-[hsl(16,100%,55%)] flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="bg-[hsl(16,100%,55%)] hover:bg-[hsl(16,100%,50%)] text-white px-8 py-4 font-semibold"
                onClick={() => window.location.href = '/recruitment-request'}
              >
                <Plus className="mr-2 h-5 w-5" />
                Post a Job
              </Button>
              <Button 
                variant="outline" 
                className="border-2 border-[hsl(16,100%,55%)] text-[hsl(16,100%,55%)] hover:bg-[hsl(16,100%,55%)] hover:text-white px-8 py-4 font-semibold"
                onClick={() => window.location.href = '/schedule-consultation'}
              >
                <Calendar className="mr-2 h-5 w-5" />
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
