import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import ServicesSection from "@/components/services-section";
import WhyDawaamSection from "@/components/why-dawaam-section";
import ForEmployersSection from "@/components/for-employers-section";
import ForJobSeekersSection from "@/components/for-job-seekers-section";
import Footer from "@/components/footer";
import BackToTop from "@/components/back-to-top";
import UFIAuditingSection from "@/components/ufi-auditing-section";
import AnimatedSection from "@/components/animated-section";
import employerImage from "@assets/Copy of Untitled (1)_1750770862983.png";
import jobSeekerImage from "@assets/Copy of Untitled (2)_1750771135985.png";
import employerIcon from "@assets/10_1750780882136.png";
import jobSeekerIcon from "@assets/11_1750780897317.png";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      
      {/* Side by side sections directly under hero */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Choose Your Path</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you're looking to hire top talent or advance your career, we have the solutions you need
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <AnimatedSection animation="fadeInLeft" delay={100}>
              <div className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 opacity-50"></div>
                
                {/* Icon */}
                <div className="relative p-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-[hsl(226,56%,26%)] to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <img 
                      src={employerIcon} 
                      alt="For Employers" 
                      className="w-18 h-18 filter brightness-0 invert object-contain"
                    />
                  </div>
                  
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">For Employers</h3>
                  <p className="text-lg text-gray-600 mb-8">
                    Build your dream team with our comprehensive talent acquisition and workforce management solutions
                  </p>
                  
                  <div className="space-y-4 mb-10 text-left">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-[hsl(16,100%,55%)] rounded-full"></div>
                      <span className="text-gray-700">Access to qualified local and international talent</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-[hsl(16,100%,55%)] rounded-full"></div>
                      <span className="text-gray-700">Streamlined recruitment processes</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-[hsl(16,100%,55%)] rounded-full"></div>
                      <span className="text-gray-700">Complete payroll management</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-[hsl(16,100%,55%)] rounded-full"></div>
                      <span className="text-gray-700">HR consulting and training</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <button 
                      className="w-full bg-gradient-to-r from-[hsl(16,100%,55%)] to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                      onClick={() => window.location.href = '/recruitment-request'}
                    >
                      Post a Job
                    </button>
                    <button 
                      className="w-full border-2 border-[hsl(16,100%,55%)] text-[hsl(16,100%,55%)] hover:bg-[hsl(16,100%,55%)] hover:text-white px-8 py-4 font-bold rounded-xl transition-all duration-300 hover:shadow-lg"
                      onClick={() => window.location.href = '/schedule-consultation'}
                    >
                      Schedule Consultation
                    </button>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="fadeInRight" delay={200}>
              <div className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-orange-100 opacity-50"></div>
                
                {/* Icon */}
                <div className="relative p-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-[hsl(16,100%,55%)] to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <img 
                      src={jobSeekerIcon} 
                      alt="For Job Seekers" 
                      className="w-18 h-18 filter brightness-0 invert object-contain"
                    />
                  </div>
                  
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">For Job Seekers</h3>
                  <p className="text-lg text-gray-600 mb-8">
                    Advance your career with our extensive opportunities and professional development programs
                  </p>
                  
                  <div className="space-y-4 mb-10 text-left">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-[hsl(16,100%,55%)] rounded-full"></div>
                      <span className="text-gray-700">Access to exclusive job opportunities</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-[hsl(16,100%,55%)] rounded-full"></div>
                      <span className="text-gray-700">Career guidance and support</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-[hsl(16,100%,55%)] rounded-full"></div>
                      <span className="text-gray-700">Professional skills development</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-[hsl(16,100%,55%)] rounded-full"></div>
                      <span className="text-gray-700">Resume optimization services</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <button 
                      className="w-full bg-gradient-to-r from-[hsl(16,100%,55%)] to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                      onClick={() => window.location.href = '/jobs'}
                    >
                      View Jobs
                    </button>
                    <button 
                      className="w-full border-2 border-[hsl(16,100%,55%)] text-[hsl(16,100%,55%)] hover:bg-[hsl(16,100%,55%)] hover:text-white px-8 py-4 font-bold rounded-xl transition-all duration-300 hover:shadow-lg"
                      onClick={() => window.location.href = '/upload-resume'}
                    >
                      Upload Resume
                    </button>
                    <button 
                      className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 font-bold rounded-xl transition-all duration-300 hover:shadow-lg"
                      onClick={() => window.location.href = '/cv-writing'}
                    >
                      CV Writing Services
                    </button>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
      
      <AnimatedSection animation="fadeInUp">
        <ServicesSection />
      </AnimatedSection>
      
      <AnimatedSection animation="fadeInLeft" delay={100}>
        <WhyDawaamSection />
      </AnimatedSection>
      
      <AnimatedSection animation="scaleIn" delay={200}>
        <UFIAuditingSection />
      </AnimatedSection>
      
      <Footer />
      <BackToTop />
    </div>
  );
}
