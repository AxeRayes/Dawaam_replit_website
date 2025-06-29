import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import BackToTop from "@/components/back-to-top";
import { CheckCircle, Clock, FileText, Users, Award, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";

export default function CVWriting() {
  useScrollToTop();

  const packages = [
    {
      id: 1,
      level: "Entry / Junior",
      experience: "1–3 years",
      price: "250 LYD",
      consultation: "30-minute consultation",
      delivery: "5-day delivery",
      revisions: "2 revisions",
      features: [
        "30-minute one-on-one consultation",
        "ATS-friendly CV design",
        "LinkedIn profile review",
        "2 rounds of revisions",
        "5-day delivery guarantee",
        "Professional formatting",
        "Industry-specific keywords"
      ],
      description: "Perfect for recent graduates and early-career professionals looking to make their first strong impression in the job market.",
      icon: <Users className="w-8 h-8 text-blue-600" />,
      popular: false
    },
    {
      id: 2,
      level: "Mid-level",
      experience: "4–9 years",
      price: "500 LYD",
      consultation: "45-minute consultation",
      delivery: "3–4-day delivery",
      revisions: "3 revisions",
      features: [
        "45-minute strategic consultation",
        "ATS-friendly CV optimization",
        "Custom cover letter template",
        "LinkedIn profile review",
        "3 rounds of revisions",
        "3–4-day delivery",
        "Achievement-focused content",
        "Industry trend insights"
      ],
      description: "Designed for professionals with solid experience who want to advance their careers and stand out in competitive markets.",
      icon: <Award className="w-8 h-8 text-orange-600" />,
      popular: true
    },
    {
      id: 3,
      level: "Senior / Executive",
      experience: "10+ years",
      price: "1,000 LYD",
      consultation: "60-minute consultation",
      delivery: "2-day delivery",
      revisions: "Unlimited edits (30 days)",
      features: [
        "60-minute executive consultation",
        "Executive CV (2–3 pages)",
        "Custom cover letter",
        "Advanced ATS optimization",
        "LinkedIn headline and summary review",
        "Interview preparation guide",
        "Unlimited revisions (30 days)",
        "2-day priority delivery",
        "Leadership impact statements",
        "Executive branding strategy"
      ],
      description: "Comprehensive executive package for senior professionals and C-level executives seeking leadership positions.",
      icon: <Star className="w-8 h-8 text-purple-600" />,
      popular: false
    }
  ];

  const handleOrderNow = (packageLevel: string) => {
    const subject = `CV Writing Service - ${packageLevel} Package`;
    const body = `Hello Dawaam Team,

I'm interested in the ${packageLevel} CV Writing package. Please provide me with more information about the next steps and scheduling.

Thank you,`;
    
    window.location.href = `mailto:cv@dawaam.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Professional CV Writing Services
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-8">
            Professionally tailored CV services for every experience level. Let our experts craft a compelling CV that opens doors to your next career opportunity.
          </p>
          <div className="flex items-center justify-center space-x-8 text-blue-100">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>ATS-Optimized</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>Industry Experts</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>Fast Delivery</span>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Package
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Select the perfect CV writing package based on your experience level and career goals
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {packages.map((pkg) => (
              <Card key={pkg.id} className={`relative border-none shadow-lg hover:shadow-xl transition-all duration-300 ${pkg.popular ? 'ring-2 ring-orange-500' : ''} flex flex-col h-full`}>
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <CardContent className="p-8 flex flex-col h-full">
                  <div className="text-center mb-6">
                    <div className="flex justify-center mb-4">
                      {pkg.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.level}</h3>
                    <p className="text-gray-600 mb-4">{pkg.experience}</p>
                    <div className="text-4xl font-bold text-blue-600 mb-4">{pkg.price}</div>
                    <p className="text-gray-600 text-sm leading-relaxed">{pkg.description}</p>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium">Consultation</span>
                      </div>
                      <span className="text-sm text-gray-700">{pkg.consultation}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium">Delivery</span>
                      </div>
                      <span className="text-sm text-gray-700">{pkg.delivery}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-medium">Revisions</span>
                      </div>
                      <span className="text-sm text-gray-700">{pkg.revisions}</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-8 flex-grow">
                    <h4 className="font-semibold text-gray-900">What's Included:</h4>
                    {pkg.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto">
                    <Button 
                      onClick={() => handleOrderNow(pkg.level)}
                      className="w-full py-4 font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      Get Started
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our CV Writing Services?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our expert team combines industry knowledge with proven strategies to create CVs that get results
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Writers</h3>
              <p className="text-gray-600">Professional writers with deep industry knowledge across various sectors</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">ATS-Optimized</h3>
              <p className="text-gray-600">All CVs are optimized to pass through Applicant Tracking Systems</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast Turnaround</h3>
              <p className="text-gray-600">Quick delivery without compromising on quality or attention to detail</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Personal Support</h3>
              <p className="text-gray-600">One-on-one consultation and ongoing support throughout the process</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Take the first step towards your dream job with a professionally crafted CV that showcases your unique value
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => window.location.href = 'mailto:cv@dawaam.com?subject=CV Writing Service Inquiry'}
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 font-bold transition-colors duration-200"
            >
              Get Free Consultation
            </Button>
            <Button 
              onClick={() => window.location.href = '/contact'}
              variant="outline"
              className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-blue-600 px-8 py-3 font-bold transition-colors duration-200"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <BackToTop />
    </div>
  );
}