import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import BackToTop from "@/components/back-to-top";
import { CheckCircle, Users, TrendingUp, Briefcase, Mail, Phone, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";

export default function CareerOpportunities() {
  useScrollToTop();

  const positions = [
    {
      id: 1,
      title: "Sales & Marketing Professional",
      department: "Sales & Marketing",
      type: "Full-time",
      location: "Tripoli, Libya",
      experience: "3-7 years",
      description: "We are seeking a dynamic Sales & Marketing Professional to promote and sell our comprehensive HR services. The ideal candidate will have a proven track record in B2B sales and marketing within the professional services industry.",
      responsibilities: [
        "Develop and execute sales strategies to promote Dawaam's HR services",
        "Build and maintain relationships with potential clients and partners",
        "Conduct market research and identify new business opportunities",
        "Create compelling marketing materials and campaigns",
        "Represent Dawaam at industry events and networking functions",
        "Collaborate with team to develop service packages and pricing strategies",
        "Meet and exceed sales targets and KPIs",
        "Provide market feedback to improve service offerings"
      ],
      requirements: [
        "Bachelor's degree in Marketing, Business, or related field",
        "3-7 years of experience in B2B sales and marketing",
        "Proven track record of achieving sales targets",
        "Strong communication and presentation skills",
        "Experience in HR services or professional consulting preferred",
        "Fluency in Arabic and English",
        "Excellent networking and relationship-building abilities",
        "Self-motivated with strong organizational skills"
      ],
      benefits: [
        "Competitive salary with performance-based incentives",
        "Flexible working arrangements",
        "Career advancement potential"
      ]
    },
    {
      id: 2,
      title: "Training Executive",
      department: "Training & Development",
      type: "Full-time",
      location: "Tripoli, Libya",
      experience: "5-10 years",
      description: "Join our growing training division as a Training Executive. You'll be responsible for designing, developing, and delivering high-quality training programs across various industries and professional disciplines.",
      responsibilities: [
        "Design and develop comprehensive training programs and curricula",
        "Deliver engaging training sessions to diverse professional audiences",
        "Assess training needs and customize programs for specific client requirements",
        "Create training materials, presentations, and educational resources",
        "Evaluate training effectiveness and implement improvements",
        "Manage relationships with corporate training clients",
        "Coordinate with external trainers and subject matter experts",
        "Stay updated on industry trends and best practices in professional development"
      ],
      requirements: [
        "Bachelor's degree in Education, HR, Business, or relevant field",
        "5-10 years of experience in corporate training or adult education",
        "Proven experience in curriculum development and instructional design",
        "Excellent presentation and facilitation skills",
        "Experience with various training methodologies and technologies",
        "Strong project management and organizational abilities",
        "Professional certification in training (preferred)",
        "Fluency in Arabic and English"
      ],
      benefits: [
        "Competitive salary",
        "Performance bonuses"
      ]
    }
  ];

  const handleApply = (position: string) => {
    const subject = `Application for ${position} Position`;
    const body = `Dear Dawaam HR Team,

I am writing to express my interest in the ${position} position at Dawaam. Please find my application details below:

Name: [Your Full Name]
Phone: [Your Phone Number]
Email: [Your Email Address]
Experience: [Brief summary of relevant experience]

I have attached my CV and would welcome the opportunity to discuss how my skills and experience align with your requirements.

Best regards,
[Your Name]`;
    
    window.location.href = `mailto:careers@dawaam.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Career Opportunities
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-8">
            Join our dynamic team and build a rewarding career in Libya's leading HR services company. 
            We're looking for passionate professionals to help us transform the HR landscape.
          </p>
          <div className="flex items-center justify-center space-x-8 text-blue-100">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Growing Team</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Career Growth</span>
            </div>
            <div className="flex items-center space-x-2">
              <Briefcase className="w-5 h-5" />
              <span>Professional Development</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Work With Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Work With Dawaam?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Be part of a company that's shaping the future of HR services in Libya
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Growth Opportunities</h3>
              <p className="text-gray-600">Advance your career with our expanding company and diverse service offerings</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Collaborative Culture</h3>
              <p className="text-gray-600">Work with a supportive team of professionals who value innovation and excellence</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Professional Development</h3>
              <p className="text-gray-600">Continuous learning opportunities and access to industry-leading training programs</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Competitive Benefits</h3>
              <p className="text-gray-600">Comprehensive compensation packages and benefits designed to support your success</p>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Current Openings
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our available positions and find the perfect role to advance your career
            </p>
          </div>

          <div className="space-y-8 max-w-6xl mx-auto">
            {positions.map((position) => (
              <Card key={position.id} className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">{position.title}</h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">{position.department}</span>
                              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">{position.type}</span>
                              <span>{position.experience} experience</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600 leading-relaxed mb-6">{position.description}</p>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">Key Responsibilities:</h4>
                            <ul className="space-y-2">
                              {position.responsibilities.slice(0, 4).map((responsibility, index) => (
                                <li key={index} className="flex items-start space-x-2">
                                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                  <span className="text-gray-700 text-sm">{responsibility}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">Requirements:</h4>
                            <ul className="space-y-2">
                              {position.requirements.slice(0, 4).map((requirement, index) => (
                                <li key={index} className="flex items-start space-x-2">
                                  <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                                  <span className="text-gray-700 text-sm">{requirement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-1">
                      <div className="bg-gray-50 rounded-lg p-6">
                        <div className="space-y-4 mb-6">
                          <div className="flex items-center space-x-3">
                            <MapPin className="w-5 h-5 text-gray-500" />
                            <span className="text-gray-700">{position.location}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Briefcase className="w-5 h-5 text-gray-500" />
                            <span className="text-gray-700">{position.type}</span>
                          </div>
                        </div>

                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-900 mb-3">Benefits:</h4>
                          <ul className="space-y-2">
                            {position.benefits.map((benefit, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <CheckCircle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-700 text-sm">{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <Button 
                          onClick={() => handleApply(position.title)}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 font-bold transition-colors duration-200"
                        >
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Don't See the Right Position?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            We're always looking for talented professionals to join our team. Send us your CV and we'll keep you in mind for future opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => window.location.href = 'mailto:careers@dawaam.com?subject=General Career Inquiry'}
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 font-bold transition-colors duration-200"
            >
              <Mail className="mr-2 h-5 w-5" />
              Send Your CV
            </Button>
            <Button 
              onClick={() => window.location.href = '/contact'}
              variant="outline"
              className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-blue-600 px-8 py-3 font-bold transition-colors duration-200"
            >
              Contact Us
            </Button>
          </div>
          <div className="mt-8 text-blue-100">
            <p className="flex items-center justify-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>careers@dawaam.com</span>
            </p>
          </div>
        </div>
      </section>

      <Footer />
      <BackToTop />
    </div>
  );
}