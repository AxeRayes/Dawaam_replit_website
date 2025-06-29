import { Button } from "@/components/ui/button";
import { CheckCircle, Search, Upload, FileText } from "lucide-react";
import { Link } from "wouter";
import jobSeekersBgImage from "@assets/Copy of Untitled (2)_1750771135985.png";

const benefits = [
  "Diverse job opportunities across industries",
  "Career guidance and coaching",
  "Skills development and training programs",
  "Resume optimization services",
  "Interview preparation support",
];

export default function ForJobSeekersSection() {
  return (
    <section id="job-seekers" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center stagger-children">
          <div className="space-y-6 lg:order-2">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">For Job Seekers</h2>
            <p className="text-xl text-gray-600">
              Take the next step in your career with our extensive job opportunities and professional development programs.
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
              <Link href="/jobs">
                <Button className="bg-[hsl(16,100%,55%)] hover:bg-[hsl(16,100%,50%)] text-white px-8 py-4 font-semibold w-full sm:w-auto">
                  <Search className="mr-2 h-5 w-5" />
                  View Jobs
                </Button>
              </Link>
              <Link href="/upload-resume">
                <Button 
                  variant="outline" 
                  className="border-2 border-[hsl(16,100%,55%)] text-[hsl(16,100%,55%)] hover:bg-[hsl(16,100%,55%)] hover:text-white px-8 py-4 font-semibold w-full sm:w-auto"
                >
                  <Upload className="mr-2 h-5 w-5" />
                  Upload Resume
                </Button>
              </Link>
              <Link href="/cv-writing">
                <Button 
                  variant="outline" 
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 font-semibold w-full sm:w-auto"
                >
                  <FileText className="mr-2 h-5 w-5" />
                  CV Writing Services
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="lg:order-1">
            <div className="relative rounded-xl shadow-lg overflow-hidden w-full h-96">
              <img 
                src={jobSeekersBgImage} 
                alt="Professional team members" 
                className="w-full h-full object-cover object-[center_20%]"
              />
              <div className="absolute inset-0 bg-[hsl(226,56%,26%)]/50"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
