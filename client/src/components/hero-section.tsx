import { Button } from "@/components/ui/button";
import { Briefcase, Search } from "lucide-react";
import { useState, useEffect } from "react";
import heroBackground from "@assets/1d086145-35a4-474d-8b8e-cf4891e25ca4_1750767609282.png";
import dawaamLogo from "@assets/Vertical  Dawaam Transparent Logo  English.ai (1)_1750768297185.png";

const services = [
  "Recruitment",
  "Manpower",
  "Payroll", 
  "Immigration",
  "Training",
  "Consulting"
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsLoaded(true);
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % services.length);
    }, 3000);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroBackground})`
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-blue-800/40 to-blue-900/60"></div>
      
      {/* Parallax Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating particles with mouse interaction */}
        <div 
          className="absolute w-2 h-2 bg-blue-400/30 rounded-full animate-pulse"
          style={{ 
            left: `${20 + mousePosition.x * 0.02}%`,
            top: `${15 + mousePosition.y * 0.01}%`,
            transform: `translate3d(0, 0, 0)`,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        />
        <div 
          className="absolute w-3 h-3 bg-orange-400/20 rounded-full animate-pulse"
          style={{ 
            right: `${25 + mousePosition.x * 0.015}%`,
            top: `${25 + mousePosition.y * 0.01}%`,
            animationDelay: '1s',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        />
        <div 
          className="absolute w-1 h-1 bg-blue-300/40 rounded-full animate-pulse"
          style={{ 
            left: `${70 + mousePosition.x * 0.01}%`,
            bottom: `${30 + mousePosition.y * 0.008}%`,
            animationDelay: '2s',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        />
        
        {/* Smooth geometric shapes with easing */}
        <div 
          className="absolute w-64 h-64 border border-blue-400/10 rounded-full"
          style={{ 
            top: '20%',
            left: '15%',
            animation: 'float 8s ease-in-out infinite',
            transform: `translate3d(${mousePosition.x * 0.05}px, ${mousePosition.y * 0.03}px, 0)`
          }}
        />
        <div 
          className="absolute w-48 h-48 border border-orange-400/10 rounded-full"
          style={{ 
            bottom: '25%',
            right: '20%',
            animation: 'float 10s ease-in-out infinite reverse',
            animationDelay: '2s',
            transform: `translate3d(${mousePosition.x * -0.03}px, ${mousePosition.y * 0.02}px, 0)`
          }}
        />
        
        {/* Subtle grid lines */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(rgba(249, 115, 22, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
            transform: `translate3d(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px, 0)`
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-4 pb-4">
        <div className="text-center max-w-6xl mx-auto">
          
          {/* Company Logo */}
          <div className={`mb-8 transform transition-all duration-1200 ease-out ${isLoaded ? 'scale-100 opacity-100 translate-y-0' : 'scale-110 opacity-0 translate-y-8'}`}>
            <img 
              src={dawaamLogo} 
              alt="Dawaam Logo" 
              className="h-32 md:h-40 lg:h-48 mx-auto filter brightness-0 invert"
            />
          </div>

          {/* Animated Title */}
          <div className="mb-8">
            <h1 className={`text-5xl md:text-7xl lg:text-8xl font-black mb-8 transform transition-all duration-1500 ease-out ${isLoaded ? 'scale-100 opacity-100 translate-y-0' : 'scale-110 opacity-0 translate-y-8'}`}>
              <span 
                className="bg-gradient-to-r from-white via-blue-200 to-orange-200 bg-clip-text text-transparent inline-block"
                style={{
                  animation: isLoaded ? 'shimmer 3s ease-in-out infinite' : 'none'
                }}
              >
                HR EXCELLENCE
              </span>
            </h1>
            
            {/* Animated service text with smooth transitions */}
            <div className="h-20 flex items-center justify-center mb-8">
              <div className="text-3xl md:text-4xl font-bold">
                <span className="text-gray-300">Empowering through </span>
                <span className="relative overflow-hidden">
                  <span 
                    key={currentIndex}
                    className="inline-block text-orange-500 transition-all duration-700 ease-out"
                    style={{
                      animation: 'slideInUp 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
                      textShadow: '0 0 20px rgba(249, 115, 22, 0.3)'
                    }}
                  >
                    {services[currentIndex]}
                  </span>
                  <span 
                    className="absolute -right-1 top-0 w-0.5 h-full bg-orange-500"
                    style={{
                      animation: 'blink 1.5s ease-in-out infinite'
                    }}
                  ></span>
                </span>
                <span className="text-gray-300 ml-2">services</span>
              </div>
            </div>
          </div>

          {/* Animated subtitle */}
          <p className={`text-xl md:text-2xl mb-8 text-gray-200 max-w-4xl mx-auto leading-relaxed transform transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            Libya's leading HR services company delivering innovative workforce solutions
          </p>

          {/* Service Pills */}
          <div className={`flex flex-wrap justify-center gap-4 mb-12 transform transition-all duration-1200 delay-500 ease-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            {services.map((service, index) => (
              <div
                key={service}
                className={`px-6 py-3 rounded-full backdrop-blur-sm text-sm transition-all duration-500 hover:scale-110 hover:bg-white/10 cursor-pointer ${
                  index === currentIndex ? 'bg-[hsl(226,56%,26%)] text-white font-bold scale-105 shadow-lg border-2 border-[hsl(16,100%,55%)]' : 'bg-white/5 text-white font-medium border border-white/20'
                }`}
                style={{ 
                  transitionDelay: `${index * 100}ms`,
                  transform: index === currentIndex ? 'translateY(-2px)' : 'translateY(0)',
                  boxShadow: index === currentIndex ? '0 8px 32px rgba(249, 115, 22, 0.15)' : 'none'
                }}
              >
                {service}
              </div>
            ))}
          </div>

          {/* CTA Buttons with smooth focal.inc-style animations */}
          <div className={`flex flex-col sm:flex-row gap-6 justify-center transform transition-all duration-1400 delay-700 ease-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <Button 
              onClick={() => window.location.href = '/recruitment-request'}
              className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-12 py-6 text-lg font-bold rounded-full shadow-2xl hover:shadow-blue-500/30 transition-all duration-500 hover:scale-110 transform hover:-translate-y-1"
              style={{
                boxShadow: '0 10px 40px rgba(59, 130, 246, 0.2)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
              <Briefcase className="mr-3 h-6 w-6 relative z-10 transition-transform duration-300 group-hover:scale-110" />
              <span className="relative z-10">Hire Talent</span>
            </Button>
            
            <Button 
              onClick={() => window.location.href = '/jobs'}
              className="group relative overflow-hidden bg-gradient-to-r from-orange-600 to-orange-800 hover:from-orange-700 hover:to-orange-900 text-white px-12 py-6 text-lg font-bold rounded-full shadow-2xl hover:shadow-orange-500/30 transition-all duration-500 hover:scale-110 transform hover:-translate-y-1"
              style={{
                boxShadow: '0 10px 40px rgba(249, 115, 22, 0.2)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
              <Search className="mr-3 h-6 w-6 relative z-10 transition-transform duration-300 group-hover:scale-110" />
              <span className="relative z-10">Find Jobs</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
