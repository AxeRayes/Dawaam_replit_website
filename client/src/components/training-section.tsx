import { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, Users, TrendingUp, FileText, Crown, Globe, Shield, Code, Zap, Calendar, MapPin, User, CheckCircle, Star, Building2, Award, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import professionalPhoto from "@assets/Copy of Untitled_1750770363088.png";
import trainingIcon1 from "@assets/10_1750780882136.png";
import trainingIcon2 from "@assets/11_1750780897317.png";

const trainingData = [
  {
    id: 'management',
    title: 'Management Courses',
    icon: Users,
    color: 'from-blue-500 to-blue-600',
    courses: [
      'Leadership and management development',
      'Communication and presentation skills',
      'Time management and productivity',
      'Team building and collaboration',
      'Change management',
      'Diversity and inclusion',
      'Critical thinking & Problem solving',
      'Public Speaking & Presentation skills',
      'Finance for non-finance Managers',
      'Budget Planning',
      'Negotiation skills',
      'Conflict Resolution',
      'Decision Making',
      'Planning & Organization'
    ]
  },
  {
    id: 'finance',
    title: 'Finance Courses',
    icon: TrendingUp,
    color: 'from-green-500 to-green-600',
    courses: [
      'Financial Accounting',
      'Managerial Accounting',
      'Financial Statement Analysis',
      'Taxation (Libya)',
      'Corporate Finance',
      'Financial modelling',
      'Business analysis'
    ]
  },
  {
    id: 'hr',
    title: 'Human Resource Courses',
    icon: Users,
    color: 'from-purple-500 to-purple-600',
    courses: [
      'HR Fundamentals',
      'Employment law (Libya)',
      'Payroll management',
      'Talent management',
      'Performance management',
      'Employee Relations',
      'Diversity & Inclusion'
    ]
  },
  {
    id: 'administrative',
    title: 'Administrative Courses',
    icon: FileText,
    color: 'from-orange-500 to-orange-600',
    courses: [
      'Office management',
      'Time management and productivity',
      'Communication and customer service',
      'Computer skills',
      'Project management',
      'Business writing'
    ]
  },
  {
    id: 'clevel',
    title: 'C-Level Courses',
    icon: Crown,
    color: 'from-red-500 to-red-600',
    courses: [
      'Strategic management',
      'Leadership development',
      'Change management',
      'Risk management',
      'Strategic HR management',
      'Financial management',
      'Business ethics'
    ]
  },
  {
    id: 'english',
    title: 'English Language Courses',
    icon: Globe,
    color: 'from-teal-500 to-teal-600',
    courses: [
      'General English',
      'Business English',
      'English for specific purposes',
      'English conversation',
      'English for exams (TOEFL or IELTS)'
    ]
  },
  {
    id: 'board',
    title: 'Board of Directors Courses',
    icon: Shield,
    color: 'from-indigo-500 to-indigo-600',
    courses: [
      'Director Development Program (Dubai)'
    ]
  },
  {
    id: 'oilgas',
    title: 'Oil & Gas Courses',
    icon: Zap,
    color: 'from-amber-500 to-amber-600',
    courses: [
      'Food Safety',
      'HSE (Health, Safety & Environment)',
      'Drilling Operations',
      'Petroleum Engineering Fundamentals',
      'Process Safety Management'
    ]
  },
  {
    id: 'it',
    title: 'IT Courses',
    icon: Code,
    color: 'from-cyan-500 to-cyan-600',
    courses: [
      'Oracle',
      'Power BI',
      'Cybersecurity',
      'Cloud Services'
    ]
  }
];

export default function TrainingSection() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const upcomingPrograms = [
    {
      id: 1,
      title: "Leadership Development Program",
      category: "Management & Leadership",
      date: "2025-07-15",
      endDate: "2025-07-19",
      duration: "5 Days",
      location: "Tripoli Training Center",
      instructor: "Dr. Ahmed Hassan",
      capacity: 20,
      enrolled: 15,
      price: "1,200 LYD",
      description: "Comprehensive leadership skills development for managers and team leaders"
    },
    {
      id: 2,
      title: "Oil & Gas Safety Fundamentals",
      category: "Oil & Gas",
      date: "2025-07-22",
      endDate: "2025-07-24", 
      duration: "3 Days",
      location: "Industry Training Facility",
      instructor: "Eng. Sarah Al-Mansouri",
      capacity: 25,
      enrolled: 18,
      price: "850 LYD",
      description: "Essential safety protocols and procedures for oil and gas operations"
    },
    {
      id: 3,
      title: "Digital Marketing Strategy",
      category: "Sales & Marketing", 
      date: "2025-08-05",
      endDate: "2025-08-07",
      duration: "3 Days",
      location: "Online + Tripoli Hub",
      instructor: "Ms. Fatima Benali",
      capacity: 30,
      enrolled: 22,
      price: "750 LYD",
      description: "Modern digital marketing techniques and social media strategies"
    },
    {
      id: 4,
      title: "Financial Analysis for Non-Financial Managers",
      category: "Finance & Administration",
      date: "2025-08-12",
      endDate: "2025-08-14",
      duration: "3 Days", 
      location: "Business Training Center",
      instructor: "CPA Omar Khalil",
      capacity: 15,
      enrolled: 8,
      price: "950 LYD",
      description: "Understanding financial statements and budgeting for operational managers"
    },
    {
      id: 5,
      title: "Project Management Professional (PMP) Prep",
      category: "Project Management",
      date: "2025-08-19",
      endDate: "2025-08-23",
      duration: "5 Days",
      location: "Tripoli Training Center", 
      instructor: "PMP John Smith",
      capacity: 18,
      enrolled: 12,
      price: "1,500 LYD",
      description: "Comprehensive preparation for PMP certification exam"
    },
    {
      id: 6,
      title: "HR Analytics and Metrics",
      category: "Human Resources",
      date: "2025-08-26",
      endDate: "2025-08-28",
      duration: "3 Days",
      location: "HR Excellence Center",
      instructor: "Dr. Layla Mahmoud", 
      capacity: 20,
      enrolled: 14,
      price: "800 LYD",
      description: "Data-driven approaches to human resources management and decision making"
    }
  ];

  const toggleCategory = (categoryId: string) => {
    console.log('Toggling category:', categoryId);
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  return (
    <div>

      {/* Training Categories */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <BookOpen className="w-12 h-12 text-[hsl(16,100%,55%)] mr-4" />
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Training Categories
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Comprehensive professional development programs designed to enhance skills and drive career growth across all organizational levels
            </p>
            
            {/* Bespoke Training Notice */}
            <div className="bg-gradient-to-r from-blue-50 to-orange-50 p-6 rounded-2xl border border-gray-200 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Customized Training Solutions</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                We create <span className="font-semibold text-[hsl(16,100%,55%)]">bespoke training courses</span> tailored to your specific requirements. 
                Whether you need specialized programs for your team or industry-specific training, we deliver customized solutions 
                <span className="font-semibold"> locally and internationally</span> to meet your organization's unique needs.
              </p>
            </div>
          </div>

        {/* Quick Links to Training Pages */}
        <div className="text-center mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Explore Our Training Programs</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg"
              onClick={() => window.location.href = '/success-stories'}
            >
              View Success Stories
            </Button>
            <Button 
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg"
              onClick={() => window.location.href = '/upcoming-programs'}
            >
              View Upcoming Programs
            </Button>
          </div>
        </div>

        {/* Training Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainingData.map((category) => {
            const IconComponent = category.icon;
            const isExpanded = expandedCategory === category.id;
            
            return (
              <div
                key={category.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
              >
                {/* Category Header */}
                <div
                  className={`bg-gradient-to-r ${category.color} p-6 cursor-pointer`}
                  onClick={() => toggleCategory(category.id)}
                >
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center">
                      <IconComponent className="w-8 h-8 mr-4" />
                      <h3 className="text-xl md:text-2xl font-bold">
                        {category.title}
                      </h3>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm mr-2 opacity-90">
                        {category.courses.length} courses
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-6 h-6" />
                      ) : (
                        <ChevronDown className="w-6 h-6" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Courses List */}
                <div
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="p-6">
                    <div className="grid grid-cols-1 gap-3">
                      {category.courses.map((course, index) => (
                        <div
                          key={index}
                          className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                        >
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.color} mr-3`}></div>
                          <span className="text-gray-700 font-medium">{course}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Preview (when collapsed) */}
                {!isExpanded && (
                  <div className="p-6">
                    <div className="text-gray-600 text-sm">
                      Click to view {category.courses.length} available courses including{' '}
                      <span className="font-medium text-gray-800">
                        {category.courses[0]}
                      </span>
                      {category.courses.length > 1 && ', '}
                      {category.courses.length > 1 && (
                        <span className="font-medium text-gray-800">
                          {category.courses[1]}
                        </span>
                      )}
                      {category.courses.length > 2 && ` and ${category.courses.length - 2} more...`}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Enhance Your Skills?
            </h3>
            <p className="text-gray-600 mb-6">
              Contact us to learn more about our training programs, create custom courses, or find the perfect solution for your professional development needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-[hsl(16,100%,55%)] to-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Request Custom Training
              </button>
              <button className="bg-gradient-to-r from-[hsl(211,74%,32%)] to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Contact Training Team
              </button>
            </div>
          </div>
          </div>
        </div>
      </section>
    </div>
  );
}