import { Award, Heart } from "lucide-react";
import { SiLinkedin, SiFacebook } from "react-icons/si";
import dawaamLogo from "@assets/Vertical  Dawaam Transparent Logo  English.ai_1750776985659.png";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <img 
                src={dawaamLogo} 
                alt="Dawaam Logo" 
                className="h-20 w-auto object-contain"
              />
            </div>
            <p className="text-gray-400">
              Leading HR services company in Libya, empowering businesses and professionals with comprehensive workforce solutions.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/company/dawaam-com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <SiLinkedin className="w-5 h-5" />
              </a>
              <a href="https://www.facebook.com/DawaamCom" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <SiFacebook className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/recruitment-services" className="hover:text-white transition-colors">Recruitment</a></li>
              <li><a href="/manpower-services" className="hover:text-white transition-colors">Manpower Outsourcing</a></li>
              <li><a href="/payroll-services" className="hover:text-white transition-colors">Payroll Management</a></li>
              <li><a href="/immigration-services" className="hover:text-white transition-colors">Immigration & Visa</a></li>
              <li><a href="/training" className="hover:text-white transition-colors">Training Programs</a></li>
              <li><a href="/hr-consulting" className="hover:text-white transition-colors">HR Consulting</a></li>
              <li><a href="/request-audit" className="hover:text-white transition-colors">Event Auditing</a></li>
              <li><a href="/timesheets" className="text-orange-300 hover:text-orange-200 font-medium transition-colors">🕒 Timesheet Portal</a></li>
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="/recruitment-request" className="hover:text-white transition-colors">For Employers</a></li>
              <li><a href="/jobs" className="hover:text-white transition-colors">For Job Seekers</a></li>
              <li><a href="/career-opportunities" className="hover:text-white transition-colors">Career Opportunities</a></li>
              <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center space-x-3">
                <span>📍</span>
                <span>Tripoli, Libya</span>
              </div>
              <div className="flex items-center space-x-3">
                <span>📞</span>
                <span>+218 91 588 5111</span>
              </div>
              <div className="flex items-center space-x-3">
                <span>📞</span>
                <span>+218 92 588 5111</span>
              </div>
              <div className="flex items-center space-x-3">
                <span>✉️</span>
                <span>info@dawaam.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <span>💬</span>
                <span>+218 91 588 5111 (WhatsApp)</span>
              </div>
              <div className="flex items-center space-x-3">
                <span>🕒</span>
                <span>Sun-Thu: 9:00 AM - 4:00 PM</span>
              </div>
              <div className="flex items-center space-x-3">
                <span>🌐</span>
                <span>www.dawaam.com</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2024 Dawaam. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-[hsl(45,92%,47%)]" />
                <span>UFI-Approved Event Auditor</span>
              </span>
              <span className="flex items-center space-x-2">
                <Heart className="w-4 h-4 text-[hsl(45,92%,47%)]" />
                <span>UNWEP Signatory</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
