import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import BackToTop from "@/components/back-to-top";
import { CheckCircle, Star, Building2, Calendar, Users, Award, BookOpen, ChevronDown, ChevronUp, X, ZoomIn } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import wahaMainPresentation from "@assets/image_1750797204220.png";
import wahaKitchenTraining from "@assets/image_1750796852552.png";
import wahaEquipmentInspection from "@assets/image_1750796864578.png";
import wahaTemperatureControl from "@assets/image_1750796873304.png";
import wahaClassroomSession from "@assets/image_1750796883430.png";
import wahaThermometerDemo from "@assets/image_1750796896450.png";
import wahaGroupTraining from "@assets/image_1750796911543.png";
import wahaAuditorium from "@assets/image_1750796921672.png";
import wahaPresentation from "@assets/image_1750796927792.png";
import wahaTheorySession from "@assets/image_1750796936099.png";
import wahaConferenceRoom from "@assets/image_1750796942281.png";
import wahaKitchenInspection from "@assets/image_1750797717605.png";
import trainingIcon1 from "@assets/10_1750780882136.png";
import trainingIcon2 from "@assets/11_1750780897317.png";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";
import { useState } from "react";

const successStories = [
  {
    id: 1,
    title: "Food Safety Training Program",
    company: "Al Waha Oil Company",
    date: "February 2025",
    duration: "10 Days",
    participants: 10,
    successRate: "100%",
    description: "Comprehensive food safety training program delivered for Al Waha Oil Services. Included 5 days classroom instruction and 5 days onsite practical training covering HACCP principles, hygiene practices, and regulatory compliance.",
    images: [
      {
        src: "WhatsApp Image 2025-02-05 at 18.00.22_d0e95be7_1750793993500.jpg",
        alt: "Food Safety Training Session at Al Waha Oil",
        label: "Training Session"
      },
      {
        src: "WhatsApp Image 2025-02-05 at 18.02.50_d4405950_1750793990063.jpg",
        alt: "Food Safety Training Presentation at Al Waha Oil",
        label: "Interactive Learning"
      }
    ],
    structure: {
      classroom: "5 days classroom theoretical training covering HACCP principles, food safety regulations, and hygiene protocols",
      practical: "5 days on-site practical training with hands-on application in real kitchen and food service environments"
    },
    outcomes: [
      "HACCP system implementation and monitoring",
      "Food safety risk assessment and control",
      "Personal hygiene and sanitation practices",
      "Temperature control and food storage protocols",
      "Documentation and record-keeping systems",
      "Emergency response procedures"
    ],
    methodology: [
      {
        title: "Interactive Lectures",
        description: "Engaging classroom sessions with case studies and real-world examples",
        icon: "BookOpen"
      },
      {
        title: "Hands-on Practice", 
        description: "Direct application in workplace environments with expert guidance",
        icon: "Users"
      },
      {
        title: "Certification",
        description: "Comprehensive assessment and professional certification upon completion",
        icon: "Award"
      }
    ]
  }
];

export default function SuccessStories() {
  useScrollToTop();
  const [selectedStory, setSelectedStory] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryImages = [
    wahaMainPresentation,
    wahaKitchenTraining,
    wahaEquipmentInspection,
    wahaTemperatureControl,
    wahaClassroomSession,
    wahaThermometerDemo,
    wahaGroupTraining,
    wahaAuditorium,
    wahaPresentation,
    wahaTheorySession,
    wahaConferenceRoom,
    wahaKitchenInspection
  ];

  const selectStory = (storyId: number) => {
    setSelectedStory(storyId);
  };

  const backToList = () => {
    setSelectedStory(null);
  };

  const openImageModal = (imageSrc: string) => {
    setSelectedImage(imageSrc);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Header */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Success Stories
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Real training programs delivering measurable results for Libya's leading companies
          </p>
        </div>
      </section>

      {/* Success Stories Content */}
      {selectedStory === null ? (
        /* Stories List View */
        <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid gap-6">
                {successStories.map((story) => (
                  <Card key={story.id} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer">
                    <div 
                      className="p-8 bg-white hover:bg-gray-50 transition-colors duration-300"
                      onClick={() => selectStory(story.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-4">
                            <Building2 className="w-6 h-6 text-blue-600" />
                            <div>
                              <h3 className="text-2xl font-bold text-gray-900">{story.title}</h3>
                              <div className="flex items-center space-x-4 mt-1">
                                <span className="text-blue-600 font-medium">{story.company}</span>
                                <span className="text-gray-400">•</span>
                                <span className="text-gray-600">{story.date}</span>
                                <span className="text-gray-400">•</span>
                                <span className="text-gray-600">{story.duration}</span>
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-gray-600 mb-6 leading-relaxed">
                            {story.description}
                          </p>

                          <div className="flex items-center space-x-6">
                            <div className="flex items-center space-x-2">
                              <Users className="w-5 h-5 text-blue-600" />
                              <span className="text-gray-700 font-medium">{story.participants} Participants</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Award className="w-5 h-5 text-green-600" />
                              <span className="text-gray-700 font-medium">{story.successRate} Success Rate</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-end space-x-6 ml-6">
                          <div className="w-56 h-36 rounded-lg overflow-hidden shadow-lg flex items-center justify-center">
                            <img 
                              src={wahaMainPresentation} 
                              alt={story.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <ChevronDown className="w-6 h-6 text-gray-400 transform rotate-270" />
                        </div>
                      </div>

                      <div className="mt-6 pt-6 border-t border-gray-100">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium">
                          View Full Details & Gallery
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : (
        /* Story Detail View */
        <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Back Button */}
              <div className="mb-8">
                <Button 
                  variant="outline"
                  onClick={backToList}
                  className="flex items-center space-x-2 text-blue-600 border-blue-600 hover:bg-blue-50"
                >
                  <ChevronUp className="w-4 h-4 transform rotate-90" />
                  <span>Back to Success Stories</span>
                </Button>
              </div>

              {(() => {
                const story = successStories.find(s => s.id === selectedStory);
                if (!story) return null;

                return (
                  <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    {/* Story Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8">
                      <div className="flex items-center space-x-4 mb-4">
                        <Building2 className="w-10 h-10" />
                        <div>
                          <h1 className="text-3xl font-bold">{story.title}</h1>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-blue-200">{story.company}</span>
                            <span className="text-blue-200">•</span>
                            <span className="text-blue-200">{story.date}</span>
                            <span className="text-blue-200">•</span>
                            <span className="text-blue-200">{story.duration}</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center">
                          <div className="text-3xl font-bold">{story.participants}</div>
                          <div className="text-blue-200">Participants</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-green-300">{story.successRate}</div>
                          <div className="text-blue-200">Success Rate</div>
                        </div>
                        <div className="text-center">
                          <div className="flex justify-center space-x-1 mb-2">
                            <Star className="w-5 h-5 text-yellow-400 fill-current" />
                            <Star className="w-5 h-5 text-yellow-400 fill-current" />
                            <Star className="w-5 h-5 text-yellow-400 fill-current" />
                            <Star className="w-5 h-5 text-yellow-400 fill-current" />
                            <Star className="w-5 h-5 text-yellow-400 fill-current" />
                          </div>
                          <div className="text-blue-200">Client Rating</div>
                        </div>
                      </div>
                    </div>

                    {/* Story Content */}
                    <div className="p-8">
                      <p className="text-gray-600 text-lg leading-relaxed mb-8">
                        {story.description}
                      </p>

                      <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-4">Program Structure</h3>
                          <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                              <CheckCircle className="w-5 h-5 text-green-500" />
                              <span className="text-gray-700">{story.structure.classroom}</span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <CheckCircle className="w-5 h-5 text-green-500" />
                              <span className="text-gray-700">{story.structure.practical}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-4">Course Structure</h3>
                          <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                              <BookOpen className="w-5 h-5 text-blue-500" />
                              <span className="text-gray-700">5 days classroom theory</span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <Users className="w-5 h-5 text-blue-500" />
                              <span className="text-gray-700">5 days practical training</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>



                    {/* Training Gallery with Full Details */}
                    <div className="border-t border-gray-100 bg-gray-50">
                      <div className="p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Training Photo Gallery & Complete Course Details</h3>
                        
                        {/* Photo Gallery */}
                        <div className="space-y-6 mb-12">
                          {/* Main Featured Image */}
                          <div 
                            className="relative group cursor-pointer rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                            onClick={() => openImageModal(wahaMainPresentation)}
                          >
                            <img 
                              src={wahaMainPresentation} 
                              alt="Lead Instructor Presenting Training Materials" 
                              className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                              <ZoomIn className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                              <span className="text-white text-lg font-semibold">Lead Instructor Presentation</span>
                              <p className="text-blue-200 text-sm mt-1">Professional food safety training delivery</p>
                            </div>
                            <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-2 rounded-full text-sm font-bold">
                              Featured
                            </div>
                          </div>

                          {/* Additional Gallery Images */}
                          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                            <div 
                              className="relative group cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                              onClick={() => openImageModal(wahaKitchenTraining)}
                            >
                              <img 
                                src={wahaKitchenTraining} 
                                alt="Kitchen Training Session" 
                                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                                <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              </div>
                              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                                <span className="text-white text-sm font-medium">Kitchen Training</span>
                              </div>
                            </div>

                          <div 
                            className="relative group cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                            onClick={() => openImageModal(wahaEquipmentInspection)}
                          >
                            <img 
                              src={wahaEquipmentInspection} 
                              alt="Equipment Inspection" 
                              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                              <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                              <span className="text-white text-sm font-medium">Equipment Inspection</span>
                            </div>
                          </div>

                          <div 
                            className="relative group cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                            onClick={() => openImageModal(wahaTemperatureControl)}
                          >
                            <img 
                              src={wahaTemperatureControl} 
                              alt="Temperature Control Training" 
                              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                              <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                              <span className="text-white text-sm font-medium">Temperature Control</span>
                            </div>
                          </div>

                          <div 
                            className="relative group cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                            onClick={() => openImageModal(wahaClassroomSession)}
                          >
                            <img 
                              src={wahaClassroomSession} 
                              alt="Classroom Theory Session" 
                              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                              <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                              <span className="text-white text-sm font-medium">Theory Session</span>
                            </div>
                          </div>

                          <div 
                            className="relative group cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                            onClick={() => openImageModal(wahaThermometerDemo)}
                          >
                            <img 
                              src={wahaThermometerDemo} 
                              alt="Thermometer Demonstration" 
                              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                              <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                              <span className="text-white text-sm font-medium">Equipment Demo</span>
                            </div>
                          </div>

                          <div 
                            className="relative group cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                            onClick={() => openImageModal(wahaGroupTraining)}
                          >
                            <img 
                              src={wahaGroupTraining} 
                              alt="Group Training Session" 
                              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                              <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                              <span className="text-white text-sm font-medium">Group Training</span>
                            </div>
                          </div>

                          <div 
                            className="relative group cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                            onClick={() => openImageModal(wahaAuditorium)}
                          >
                            <img 
                              src={wahaAuditorium} 
                              alt="Auditorium Presentation" 
                              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                              <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                              <span className="text-white text-sm font-medium">Large Group Session</span>
                            </div>
                          </div>

                          <div 
                            className="relative group cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                            onClick={() => openImageModal(wahaPresentation)}
                          >
                            <img 
                              src={wahaPresentation} 
                              alt="Training Presentation" 
                              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                              <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                              <span className="text-white text-sm font-medium">Visual Training</span>
                            </div>
                          </div>

                          <div 
                            className="relative group cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                            onClick={() => openImageModal(wahaTheorySession)}
                          >
                            <img 
                              src={wahaTheorySession} 
                              alt="Theory Session with Visual Materials" 
                              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                              <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                              <span className="text-white text-sm font-medium">Educational Materials</span>
                            </div>
                          </div>

                          <div 
                            className="relative group cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                            onClick={() => openImageModal(wahaConferenceRoom)}
                          >
                            <img 
                              src={wahaConferenceRoom} 
                              alt="Conference Room Training" 
                              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                              <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                              <span className="text-white text-sm font-medium">Conference Training</span>
                            </div>
                          </div>

                          <div 
                            className="relative group cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                            onClick={() => openImageModal(wahaKitchenInspection)}
                          >
                            <img 
                              src={wahaKitchenInspection} 
                              alt="Kitchen Safety Inspection" 
                              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                              <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                              <span className="text-white text-sm font-medium">Kitchen Safety Inspection</span>
                            </div>
                          </div>
                        </div>

                        {/* Complete Course Details */}
                        <div className="grid md:grid-cols-2 gap-8">
                          <div>
                            <h4 className="text-xl font-bold text-gray-900 mb-4">Complete Learning Outcomes</h4>
                            <ul className="space-y-2">
                              {story.outcomes.map((outcome, index) => (
                                <li key={index} className="flex items-center space-x-2">
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                  <span className="text-gray-700 text-sm">{outcome}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-xl font-bold text-gray-900 mb-4">Training Methodology</h4>
                            <div className="space-y-4">
                              {story.methodology.map((method, index) => {
                                const IconComponent = method.icon === 'BookOpen' ? BookOpen : 
                                                   method.icon === 'Users' ? Users : Award;
                                return (
                                  <div key={index} className="flex items-start space-x-3">
                                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                      <IconComponent className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <div>
                                      <h5 className="font-medium text-gray-800">{method.title}</h5>
                                      <p className="text-gray-600 text-sm">{method.description}</p>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        {/* Call to Action - Only in detailed view */}
                        <div className="mt-12 p-8 bg-gradient-to-br from-[hsl(226,56%,26%)] to-blue-800 text-white rounded-2xl">
                          <div className="text-center">
                            <h3 className="text-3xl font-bold mb-4">Interested in Food Safety Training for Your Team?</h3>
                            <p className="text-lg mb-6 text-blue-100 max-w-2xl mx-auto">
                              Join Al Waha Oil and other leading companies in Libya who have transformed their food safety operations. 
                              We offer customized food safety training programs tailored to your industry and specific requirements.
                            </p>
                            <div className="bg-white/10 rounded-xl p-6 max-w-xl mx-auto mb-6">
                              <h4 className="text-lg font-bold mb-4">Why Choose Our Food Safety Training?</h4>
                              <div className="grid md:grid-cols-2 gap-3 text-left text-sm">
                                <div className="flex items-center space-x-2">
                                  <CheckCircle className="w-4 h-4 text-green-400" />
                                  <span className="text-blue-100">Industry-certified instructors</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <CheckCircle className="w-4 h-4 text-green-400" />
                                  <span className="text-blue-100">Customized to your operations</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <CheckCircle className="w-4 h-4 text-green-400" />
                                  <span className="text-blue-100">Practical hands-on training</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <CheckCircle className="w-4 h-4 text-green-400" />
                                  <span className="text-blue-100">100% success track record</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                              <Button 
                                className="bg-[hsl(16,100%,55%)] hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold"
                                onClick={() => window.location.href = '/contact'}
                              >
                                Request Food Safety Training
                              </Button>
                              <Button 
                                variant="outline"
                                className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-blue-800 px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                                onClick={() => window.location.href = '/training'}
                              >
                                View All Training Programs
                              </Button>
                            </div>
                          </div>
                        </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </section>
      )}

      <Footer />
      <BackToTop />

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50" onClick={closeImageModal}>
          <div className="relative max-w-6xl max-h-[95vh] w-full h-full flex items-center justify-center p-4">
            <img 
              src={selectedImage} 
              alt="Training session" 
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button 
              onClick={closeImageModal}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors bg-black/50 rounded-full p-2"
            >
              <X className="w-6 h-6" />
            </button>
            
            {/* Image navigation */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 rounded-full px-4 py-2">
              <span className="text-white text-sm">
                {galleryImages.indexOf(selectedImage) + 1} of {galleryImages.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}