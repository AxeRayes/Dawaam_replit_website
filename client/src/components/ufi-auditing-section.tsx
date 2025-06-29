import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Award, ClipboardCheck, FileText, CheckCircle } from "lucide-react";
import { Link } from "wouter";
import ufiLogo from "@assets/UFI_RGB_color_1750769674089.png";

const features = [
  "UFI International certification standards",
  "Comprehensive event compliance auditing",
  "Trade show and exhibition auditing",
  "Post-event verification and reporting",
  "International best practices implementation",
  "Quality assurance for event organizers",
];

export default function UFIAuditingSection() {
  return (
    <section id="ufi-auditing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Award className="w-8 h-8 text-[hsl(45,92%,47%)] mr-3" />
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">UFI-Approved Event Auditing</h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            International certification for trade shows and exhibitions, ensuring compliance with global standards
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="bg-gradient-to-br from-[hsl(45,92%,47%)] to-[hsl(45,92%,40%)] rounded-xl shadow-lg w-full h-96 flex items-center justify-center text-white">
              <div className="text-center">
                <div className="flex items-center justify-center mx-auto mb-6">
                  <img 
                    src={ufiLogo} 
                    alt="UFI Logo" 
                    className="w-80 h-auto object-contain"
                  />
                </div>
                <h3 className="text-2xl font-semibold mb-2">International Certification</h3>
                <p className="text-white/90">UFI Global Association Standards</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Professional Event Auditing Services</h3>
              <p className="text-gray-600 mb-6">
                As a UFI-approved auditor, Dawaam provides independent verification services for trade shows, 
                exhibitions, and events ensuring they meet international standards and provide accurate attendance data.
              </p>
            </div>
            
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-[hsl(45,92%,47%)] flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="pt-6">
              <Link href="/request-audit">
                <Button className="bg-[hsl(45,92%,47%)] hover:bg-[hsl(45,92%,40%)] text-white px-8 py-4 font-semibold w-full sm:w-auto">
                  <FileText className="mr-2 h-5 w-5" />
                  Request Event Audit
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}