import { useEffect } from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Calendar, User, ArrowRight, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";

export default function Blog() {
  useScrollToTop();

  const blogPosts = [
    {
      id: 1,
      title: "The Future of HR in Libya: Trends and Opportunities",
      excerpt: "Exploring the evolving landscape of human resources in Libya's growing economy and the opportunities that lie ahead for businesses and professionals.",
      author: "Dawaam Team",
      date: "2024-06-15",
      readTime: "5 min read",
      category: "Industry Insights"
    },
    {
      id: 2,
      title: "Building Effective Remote Work Policies",
      excerpt: "A comprehensive guide to creating and implementing remote work policies that boost productivity while maintaining company culture.",
      author: "HR Experts",
      date: "2024-06-10",
      readTime: "7 min read",
      category: "HR Best Practices"
    },
    {
      id: 3,
      title: "Recruitment Strategies for the Digital Age",
      excerpt: "How modern recruitment techniques and digital tools are transforming the way we attract and hire top talent in today's competitive market.",
      author: "Recruitment Team",
      date: "2024-06-05",
      readTime: "6 min read",
      category: "Recruitment"
    },
    {
      id: 4,
      title: "Training and Development: Investing in Your Workforce",
      excerpt: "Why continuous learning and professional development programs are essential for business growth and employee satisfaction.",
      author: "Training Specialists",
      date: "2024-05-28",
      readTime: "4 min read",
      category: "Professional Development"
    },
    {
      id: 5,
      title: "Navigating Payroll Management in Libya",
      excerpt: "Understanding the complexities of payroll management, compliance requirements, and best practices for businesses operating in Libya.",
      author: "Payroll Experts",
      date: "2024-05-20",
      readTime: "8 min read",
      category: "Payroll & Compliance"
    },
    {
      id: 6,
      title: "Immigration and Work Permits: A Complete Guide",
      excerpt: "Everything you need to know about immigration processes, work permits, and legal requirements for international employees in Libya.",
      author: "Immigration Team",
      date: "2024-05-15",
      readTime: "10 min read",
      category: "Immigration"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[hsl(226,56%,26%)] to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Dawaam Blog
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Insights, tips, and expert advice on HR, recruitment, and workforce management
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <Card key={post.id} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer">
                  <CardContent className="p-0">
                    <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg"></div>
                    <div className="p-6">
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                        <span className="bg-[hsl(16,100%,55%)] text-white px-3 py-1 rounded-full text-xs font-medium">
                          {post.category}
                        </span>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[hsl(16,100%,55%)] transition-colors">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <User className="w-4 h-4" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(post.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                        
                        <ArrowRight className="w-5 h-5 text-[hsl(16,100%,55%)] group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Stay Updated</h2>
            <p className="text-xl text-gray-600 mb-8">
              Subscribe to our newsletter for the latest HR insights, industry trends, and expert advice delivered to your inbox.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[hsl(16,100%,55%)] focus:border-transparent outline-none"
              />
              <button className="bg-[hsl(16,100%,55%)] hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105">
                Subscribe
              </button>
            </div>
            
            <p className="text-sm text-gray-500 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>

      {/* Coming Soon Notice */}
      <section className="py-16 bg-gradient-to-br from-[hsl(226,56%,26%)] to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">More Content Coming Soon</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            We're working on bringing you more valuable content. In the meantime, feel free to reach out to our experts for personalized advice.
          </p>
          <button 
            className="bg-[hsl(16,100%,55%)] hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105"
            onClick={() => window.location.href = '/contact'}
          >
            Contact Our Experts
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}