import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Link, useLocation } from "wouter";
import dawaamLogo from "@assets/Dawaam Business Cards (1)_1750610107884.png";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const scrollToSection = (sectionId: string) => {
    if (location !== "/") {
      window.location.href = `/#${sectionId}`;
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
    setIsOpen(false);
  };

  const NavLinks = () => (
    <>
      <button 
        onClick={() => scrollToSection("services")} 
        className="text-gray-700 hover:text-[hsl(16,100%,55%)] transition-colors"
      >
        Services
      </button>
      <button 
        onClick={() => scrollToSection("why-dawaam")} 
        className="text-gray-700 hover:text-[hsl(16,100%,55%)] transition-colors"
      >
        Why Dawaam
      </button>
      <button 
        onClick={() => scrollToSection("employers")} 
        className="text-gray-700 hover:text-[hsl(16,100%,55%)] transition-colors"
      >
        For Employers
      </button>
      <button 
        onClick={() => scrollToSection("job-seekers")} 
        className="text-gray-700 hover:text-[hsl(16,100%,55%)] transition-colors"
      >
        For Job Seekers
      </button>
      <Link href="/jobs">
        <button className="text-gray-700 hover:text-[hsl(16,100%,55%)] transition-colors">
          Jobs
        </button>
      </Link>
      <Link href="/training">
        <button className="text-gray-700 hover:text-[hsl(16,100%,55%)] transition-colors">
          Training
        </button>
      </Link>
      <Link href="/contact">
        <button className="text-gray-700 hover:text-[hsl(16,100%,55%)] transition-colors">
          Contact
        </button>
      </Link>
      <Link href="/upload-resume">
        <Button className="bg-[hsl(226,56%,26%)] hover:bg-[hsl(226,56%,20%)] text-white text-sm px-4 py-2">
          Upload Resume
        </Button>
      </Link>
    </>
  );

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center cursor-pointer hover:opacity-90 transition-opacity">
              <img 
                src={dawaamLogo} 
                alt="Dawaam Logo" 
                className="h-16 w-auto object-contain"
              />
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <NavLinks />
            
            {/* Language Toggle */}
            <div className="flex items-center space-x-2">
              <Button 
                size="sm" 
                className="bg-[hsl(16,100%,55%)] hover:bg-[hsl(16,100%,50%)] text-white"
              >
                EN
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="border-[hsl(16,100%,55%)] text-[hsl(16,100%,55%)] hover:bg-[hsl(16,100%,55%)] hover:text-white"
              >
                عربي
              </Button>
            </div>
          </div>
          
          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6 text-[hsl(16,100%,55%)]" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-6 mt-8">
                <NavLinks />
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    className="bg-[hsl(16,100%,55%)] hover:bg-[hsl(16,100%,50%)] text-white"
                  >
                    EN
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-[hsl(16,100%,55%)] text-[hsl(16,100%,55%)] hover:bg-[hsl(16,100%,55%)] hover:text-white"
                  >
                    عربي
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
