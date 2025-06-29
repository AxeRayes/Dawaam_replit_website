import { useEffect } from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Briefcase, MapPin, Clock } from "lucide-react";

export default function Jobs() {
  useEffect(() => {
    // Load Zoho Recruit embed styles and scripts
    const loadZohoRecruit = () => {
      // Add CSS
      const cssLink = document.createElement('link');
      cssLink.rel = 'stylesheet';
      cssLink.href = 'https://static.zohocdn.com/recruit/embed_careers_site/css/v1.1/embed_jobs.css';
      cssLink.type = 'text/css';
      document.head.appendChild(cssLink);

      // Add main script
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://static.zohocdn.com/recruit/embed_careers_site/javascript/v1.1/embed_jobs.js';
      script.onload = () => {
        // Initialize Zoho Recruit widget after script loads
        if (window.rec_embed_js) {
          window.rec_embed_js.load({
            widget_id: "rec_job_listing_div",
            page_name: "Dawaam",
            source: "CareerSite",
            site: "https://dawaam.zohorecruit.com",
            brand_color: "#D65A31",
            empty_job_msg: "No current Openings",
            jobs_per_page: 25,
            show_pagination: true
          });
        }
      };
      document.body.appendChild(script);
    };

    loadZohoRecruit();

    // Cleanup function
    return () => {
      // Remove added elements when component unmounts
      const cssLink = document.querySelector('link[href*="embed_jobs.css"]');
      if (cssLink) cssLink.remove();
      
      const script = document.querySelector('script[src*="embed_jobs.js"]');
      if (script) script.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[hsl(226,56%,26%)] to-[hsl(16,100%,55%)] py-20">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <div className="flex items-center justify-center mb-6">
              <Briefcase className="w-12 h-12 mr-4" />
              <h1 className="text-4xl lg:text-5xl font-bold">Current Job Openings</h1>
            </div>
            <p className="text-xl lg:text-2xl mb-8 text-white/90">
              Discover exciting career opportunities with Libya's leading companies
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-white/90">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                <span>Multiple Locations</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                <span>Full-time & Part-time</span>
              </div>
              <div className="flex items-center">
                <Briefcase className="w-5 h-5 mr-2" />
                <span>All Experience Levels</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Available Positions</h2>
              <p className="text-xl text-gray-600">
                Browse our current job openings and take the next step in your career
              </p>
            </div>

            {/* Zoho Recruit Embed Container */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="embed_jobs_head embed_jobs_with_style_3">
                <div className="embed_jobs_head2">
                  <div className="embed_jobs_head3">
                    <div id="rec_job_listing_div" className="min-h-[600px] w-full">
                      <style>{`
                        .embed_jobs_head {
                          width: 100% !important;
                          max-width: none !important;
                        }
                        .embed_jobs_head2 {
                          width: 100% !important;
                          max-width: none !important;
                        }
                        .embed_jobs_head3 {
                          width: 100% !important;
                          max-width: none !important;
                        }
                        #rec_job_listing_div {
                          width: 100% !important;
                          max-width: none !important;
                        }
                        .rec_job_list_container {
                          width: 100% !important;
                          max-width: none !important;
                        }
                        .rec_job_item {
                          width: 100% !important;
                          max-width: none !important;
                          margin-bottom: 20px !important;
                          padding: 20px !important;
                          border-radius: 8px !important;
                          box-shadow: 0 2px 4px rgba(0,0,0,0.1) !important;
                        }
                        .rec_job_title {
                          font-size: 18px !important;
                          font-weight: 600 !important;
                          margin-bottom: 10px !important;
                        }
                        .rec_job_description {
                          line-height: 1.6 !important;
                          margin-bottom: 15px !important;
                        }
                        .rec_pagination {
                          text-align: center !important;
                          margin-top: 30px !important;
                        }
                      `}</style>
                      {/* Loading placeholder */}
                      <div className="flex items-center justify-center h-64">
                        <div className="text-center">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[hsl(16,100%,55%)] mx-auto mb-4"></div>
                          <p className="text-gray-600">Loading job openings...</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="mt-12 bg-blue-50 rounded-lg p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Don't see the right position?</h3>
              <p className="text-gray-700 mb-6">
                We're always looking for talented professionals to join our team. Upload your resume and we'll contact you when suitable opportunities become available.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="/upload-resume"
                  className="inline-flex items-center justify-center px-6 py-3 bg-[hsl(226,56%,26%)] text-white font-semibold rounded-lg hover:bg-[hsl(226,56%,20%)] transition-colors"
                >
                  <Briefcase className="w-5 h-5 mr-2" />
                  Upload Your Resume
                </a>
                <a 
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 border-2 border-[hsl(226,56%,26%)] text-[hsl(226,56%,26%)] font-semibold rounded-lg hover:bg-[hsl(226,56%,26%)] hover:text-white transition-colors"
                >
                  Contact Our Team
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}