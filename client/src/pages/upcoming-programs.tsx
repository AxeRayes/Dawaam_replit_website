import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import BackToTop from "@/components/back-to-top";
import { Calendar, MapPin, User, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";
import oracleFlyer from "@assets/ORACLE SQL & DBA COURSE FLYER_1750797967658.jpg";

export default function UpcomingPrograms() {
  useScrollToTop();

  const upcomingPrograms = [
    {
      id: 1,
      title: "Oracle SQL Fundamentals",
      category: "Database Technology",
      date: "TBC",
      endDate: "TBC",
      duration: "TBC",
      location: "TBC",
      instructor: "TBC",
      capacity: 20,
      enrolled: 0,
      price: "TBC",
      description: "Master Oracle SQL fundamentals with hands-on training designed for real-world success.",
      highlights: [
        "SQL query fundamentals",
        "Database design principles",
        "Data manipulation and retrieval",
        "Performance optimization basics"
      ],
      partnership: "A Dawaam-DataBridge initiative"
    },
    {
      id: 2,
      title: "Oracle DBA Administration I & II",
      category: "Database Technology",
      date: "TBC",
      endDate: "TBC",
      duration: "TBC",
      location: "TBC",
      instructor: "TBC",
      capacity: 20,
      enrolled: 0,
      price: "TBC",
      description: "Comprehensive Oracle database administration training covering both foundational and advanced concepts.",
      highlights: [
        "Database installation and configuration",
        "User management and security",
        "Backup and recovery strategies",
        "Performance tuning and monitoring"
      ],
      partnership: "A Dawaam-DataBridge initiative"
    },
    {
      id: 3,
      title: "Oracle for Non-Technical Business Users",
      category: "Database Technology",
      date: "TBC",
      endDate: "TBC",
      duration: "TBC",
      location: "TBC",
      instructor: "TBC",
      capacity: 20,
      enrolled: 0,
      price: "TBC",
      description: "Oracle database essentials tailored for business professionals without technical backgrounds.",
      highlights: [
        "Business-focused database concepts",
        "Report generation and analysis",
        "Data interpretation skills",
        "Oracle tools for business users"
      ],
      partnership: "A Dawaam-DataBridge initiative"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Header */}
      <section className="py-20 bg-gradient-to-br from-green-600 to-teal-700">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Upcoming Training Programs
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed">
            Register now for our upcoming training sessions and secure your spot in these popular programs
          </p>
        </div>
      </section>

      {/* Programs List */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-8">
            {upcomingPrograms.map((program) => (
              <Card key={program.id} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid lg:grid-cols-3 gap-0">
                    {/* Program Info */}
                    <div className="lg:col-span-2 p-8">
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-4">
                          <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                            {program.category}
                          </span>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-gray-900">{program.price}</p>
                            <p className="text-sm text-gray-500">per participant</p>
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">{program.title}</h3>
                        <p className="text-gray-600 mb-6">{program.description}</p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3 text-gray-600">
                            <Calendar className="w-5 h-5" />
                            <div>
                              <p className="font-medium">{program.date === 'TBC' ? 'TBC' : new Date(program.date).toLocaleDateString('en-US', { 
                                weekday: 'long', 
                                month: 'long', 
                                day: 'numeric',
                                year: 'numeric'
                              })}</p>
                              {program.endDate !== 'TBC' && (
                                <p className="text-sm text-gray-500">to {new Date(program.endDate).toLocaleDateString('en-US', { 
                                  weekday: 'long', 
                                  month: 'long', 
                                  day: 'numeric' 
                                })}</p>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3 text-gray-600">
                            <Clock className="w-5 h-5" />
                            <span>{program.duration}</span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center space-x-3 text-gray-600">
                            <MapPin className="w-5 h-5" />
                            <span>{program.location}</span>
                          </div>
                          
                          <div className="flex items-center space-x-3 text-gray-600">
                            <User className="w-5 h-5" />
                            <span>{program.instructor}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Program Highlights:</h4>
                        <div className="grid md:grid-cols-2 gap-2">
                          {program.highlights.map((highlight, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <span className="text-gray-700 text-sm">{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Registration Side */}
                    <div className="bg-gray-50 p-8 flex flex-col justify-center">
                      <div className="text-center mb-6">
                        <p className="text-sm text-gray-500 mb-2">Enrollment Status</p>
                        <p className="text-lg font-medium text-gray-700">
                          {program.enrolled}/{program.capacity} enrolled
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                          <div 
                            className="bg-blue-600 h-3 rounded-full transition-all duration-300" 
                            style={{ width: `${(program.enrolled / program.capacity) * 100}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                          {program.capacity - program.enrolled} spots remaining
                        </p>
                      </div>
                      
                      <Button 
                        className={`w-full mb-4 ${
                          program.enrolled >= program.capacity 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-[hsl(16,100%,55%)] hover:bg-orange-600'
                        } text-white font-bold py-3`}
                        disabled={program.enrolled >= program.capacity}
                        onClick={() => window.location.href = '/contact'}
                      >
                        {program.enrolled >= program.capacity ? 'Fully Booked' : 'Register Now'}
                      </Button>

                      <Button 
                        variant="outline"
                        className="w-full border-gray-300 text-gray-700 hover:bg-gray-100"
                        onClick={() => window.location.href = '/contact'}
                      >
                        Request More Info
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Training CTA */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Don't See What You're Looking For?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            We offer bespoke training solutions tailored to your specific needs. Whether you need specialized programs for your team or industry-specific training, we deliver customized solutions locally and internationally.
          </p>
          <Button 
            className="bg-[hsl(226,56%,26%)] hover:bg-[hsl(226,56%,20%)] text-white px-8 py-4 rounded-xl font-bold text-lg"
            onClick={() => window.location.href = '/contact'}
          >
            Request Custom Training
          </Button>
        </div>
      </section>

      <Footer />
      <BackToTop />
    </div>
  );
}