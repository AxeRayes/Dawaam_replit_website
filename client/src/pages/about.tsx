import { useEffect } from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Award, Users, Globe, TrendingUp, Heart, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";

export default function About() {
  useScrollToTop();

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[hsl(226,56%,26%)] to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About Dawaam
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Leading HR services company in Libya, dedicated to empowering businesses and professionals with comprehensive workforce solutions.
            </p>
            <div className="text-lg text-blue-200">
              <strong className="text-[hsl(16,100%,55%)]">HIRE. TRAIN. RETAIN.</strong> - Our core philosophy
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-[hsl(226,56%,26%)] to-blue-700 rounded-2xl flex items-center justify-center mb-6">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  To provide exceptional human resources services that bridge the gap between talented professionals and forward-thinking organizations, fostering growth and success across Libya's dynamic business landscape.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-[hsl(16,100%,55%)] to-orange-600 rounded-2xl flex items-center justify-center mb-6">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  To be the premier HR solutions provider in Libya and the region, recognized for our innovative approaches, exceptional service quality, and commitment to building sustainable workforce ecosystems.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What We Do</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer comprehensive HR services designed to meet the diverse needs of businesses and professionals in today's competitive market.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Recruitment Excellence</h3>
              <p className="text-gray-600">
                Connect top talent with leading organizations through our comprehensive recruitment and headhunting services.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Workforce Solutions</h3>
              <p className="text-gray-600">
                Manpower outsourcing, payroll management, and comprehensive workforce management solutions.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Professional Development</h3>
              <p className="text-gray-600">
                Training programs and HR consulting services to develop skills and optimize organizational performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do and shape our commitment to excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-[hsl(16,100%,55%)] mx-auto mb-4" />
              <h4 className="text-lg font-bold text-gray-900 mb-2">Excellence</h4>
              <p className="text-gray-600 text-sm">
                We strive for the highest standards in every service we provide.
              </p>
            </div>

            <div className="text-center">
              <Heart className="w-12 h-12 text-[hsl(16,100%,55%)] mx-auto mb-4" />
              <h4 className="text-lg font-bold text-gray-900 mb-2">Integrity</h4>
              <p className="text-gray-600 text-sm">
                Honesty and transparency form the foundation of all our relationships.
              </p>
            </div>

            <div className="text-center">
              <Users className="w-12 h-12 text-[hsl(16,100%,55%)] mx-auto mb-4" />
              <h4 className="text-lg font-bold text-gray-900 mb-2">Partnership</h4>
              <p className="text-gray-600 text-sm">
                We build long-term relationships based on mutual success and growth.
              </p>
            </div>

            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-[hsl(16,100%,55%)] mx-auto mb-4" />
              <h4 className="text-lg font-bold text-gray-900 mb-2">Innovation</h4>
              <p className="text-gray-600 text-sm">
                We continuously evolve our services to meet changing market needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Credentials</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Recognized and certified by leading international organizations.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-16">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-[hsl(45,92%,47%)] to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-12 h-12 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">UFI-Approved</h4>
              <p className="text-gray-600">Event Auditor</p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-12 h-12 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">UNWEP</h4>
              <p className="text-gray-600">Signatory</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-br from-[hsl(226,56%,26%)] to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Work With Us?</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Whether you're looking to grow your team or advance your career, we're here to help you succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="bg-[hsl(16,100%,55%)] hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105"
              onClick={() => window.location.href = '/contact'}
            >
              Get In Touch
            </button>
            <button 
              className="border-2 border-white text-white hover:bg-white hover:text-blue-800 px-8 py-4 rounded-xl font-bold transition-all duration-300"
              onClick={() => window.location.href = '/jobs'}
            >
              View Opportunities
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}