import { PlayIcon, EyeIcon } from '@heroicons/react/24/solid';

const HeroSection = () => {
  return (
    <section className="relative w-full bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 text-white overflow-hidden">
      <div className="container mx-auto px-6 py-24 md:py-32 lg:py-40 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          
          {/* Left Side: Text Content */}
          <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4" style={{ fontFamily: 'Inter, Poppins, sans-serif' }}>
              Skyrocket Your Rankings with <span className="text-green-400">SEOBuddy</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-xl mx-auto lg:mx-0 mb-8" style={{ fontFamily: 'Inter, Open Sans, sans-serif' }}>
              We combine data-driven strategies with cutting-edge technology to deliver measurable growth and dominate search results.
            </p>
            <div className="flex justify-center lg:justify-start space-x-4">
              <button 
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-500 hover:bg-green-600 transition-transform hover:scale-105"
                style={{ backgroundColor: '#10B981' }}
              >
                <PlayIcon className="h-5 w-5 mr-2" />
                Start Free Analysis
              </button>
              <button 
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-900 bg-gray-200 hover:bg-white transition-transform hover:scale-105"
                style={{ color: '#1E40AF' }}
              >
                <EyeIcon className="h-5 w-5 mr-2" />
                View Our Work
              </button>
            </div>
          </div>

          {/* Right Side: Visual Placeholder */}
          <div className="lg:w-1/2 flex justify-center lg:justify-end">
            <div 
              className="w-full max-w-md h-64 lg:h-80 bg-white/10 rounded-2xl shadow-2xl flex items-center justify-center border border-white/20"
              style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
            >
              <p className="text-gray-300">3D SEO Dashboard Mockup</p>
            </div>
          </div>

        </div>
      </div>
      {/* Optional: Add some decorative shapes or elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"></div>
    </section>
  );
};
export default HeroSection;