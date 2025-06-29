import Navigation from "@/components/navigation";
import TrainingSection from "@/components/training-section";
import Footer from "@/components/footer";
import BackToTop from "@/components/back-to-top";

export default function Training() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Header */}
      <section className="py-20 bg-gradient-to-br from-[hsl(211,74%,32%)] to-blue-600">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Professional Training Programs
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Comprehensive development programs designed to enhance skills and drive career growth across all organizational levels
          </p>
        </div>
      </section>

      <TrainingSection />
      <Footer />
      <BackToTop />
    </div>
  );
}