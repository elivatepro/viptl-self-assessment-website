import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, CheckCircle, Users, Target, Heart, Brain, Star, Calendar, Menu, X } from 'lucide-react';
import TypewriterText from './components/TypewriterText';
import newMrWayneImage from './assets/new mr wayne.jpeg';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onPageChange }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-black shadow-2xl border-b border-amber-400/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 cursor-pointer" onClick={() => onPageChange('home')}>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
              VIP Transformative Living
            </h1>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button
                onClick={() => onPageChange('home')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  currentPage === 'home' 
                    ? 'text-black bg-gradient-to-r from-amber-300 to-amber-400 shadow-lg shadow-amber-400/25' 
                    : 'text-amber-300 hover:text-black hover:bg-gradient-to-r hover:from-amber-300 hover:to-amber-400 hover:shadow-lg hover:shadow-amber-400/25'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => onPageChange('assessment')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  currentPage === 'assessment' 
                    ? 'text-black bg-gradient-to-r from-amber-300 to-amber-400 shadow-lg shadow-amber-400/25' 
                    : 'text-amber-300 hover:text-black hover:bg-gradient-to-r hover:from-amber-300 hover:to-amber-400 hover:shadow-lg hover:shadow-amber-400/25'
                }`}
              >
                Assessment
              </button>
              <button
                onClick={() => onPageChange('about')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  currentPage === 'about' 
                    ? 'text-black bg-gradient-to-r from-amber-300 to-amber-400 shadow-lg shadow-amber-400/25' 
                    : 'text-amber-300 hover:text-black hover:bg-gradient-to-r hover:from-amber-300 hover:to-amber-400 hover:shadow-lg hover:shadow-amber-400/25'
                }`}
              >
                About
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-amber-300 hover:text-amber-400 transition-colors p-2"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-amber-400/20">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => {
                  onPageChange('home');
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                  currentPage === 'home' 
                    ? 'text-black bg-gradient-to-r from-amber-300 to-amber-400' 
                    : 'text-amber-300 hover:text-black hover:bg-gradient-to-r hover:from-amber-300 hover:to-amber-400'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => {
                  onPageChange('assessment');
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                  currentPage === 'assessment' 
                    ? 'text-black bg-gradient-to-r from-amber-300 to-amber-400' 
                    : 'text-amber-300 hover:text-black hover:bg-gradient-to-r hover:from-amber-300 hover:to-amber-400'
                }`}
              >
                Assessment
              </button>
              <button
                onClick={() => {
                  onPageChange('about');
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                  currentPage === 'about' 
                    ? 'text-black bg-gradient-to-r from-amber-300 to-amber-400' 
                    : 'text-amber-300 hover:text-black hover:bg-gradient-to-r hover:from-amber-300 hover:to-amber-400'
                }`}
              >
                About
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const HomePage: React.FC<{ onPageChange: (page: string) => void }> = ({ onPageChange }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black grain-texture">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 to-amber-600/5"></div>
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-none lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
                <div className="sm:text-center lg:text-left lg:col-span-7">
                  <h1 className="text-4xl tracking-tight font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl">
                    <span className="block mb-2">Welcome to Your</span>
                    <span className="block bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                      <TypewriterText 
                        texts={['Breakthrough', 'Transformation', 'Epiphany', 'Awakening']}
                        speed={150}
                        deleteSpeed={100}
                        pauseTime={2000}
                      />
                    </span>
                  </h1>
                  <p className="mt-6 text-base text-gray-300 sm:mt-8 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-8 md:text-xl lg:mx-0 leading-relaxed">
                    You're here because something in you knows it's time for change. This self-assessment is designed for 
                    Black men and women ready to realign with purpose, break cycles, and reclaim clarity.
                  </p>
                  <p className="mt-4 text-base text-gray-400 sm:text-lg sm:max-w-xl sm:mx-auto md:text-xl lg:mx-0 leading-relaxed">
                    In just a few minutes, you'll receive a personalized snapshot of where you are — and where you're being called to grow.
                  </p>
                  <div className="mt-8 sm:mt-10 sm:flex sm:justify-center lg:justify-start">
                    <div className="rounded-xl shadow-2xl shadow-amber-400/25">
                      <button
                        onClick={() => onPageChange('assessment')}
                        className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-xl text-black bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-400 hover:via-amber-500 hover:to-amber-600 md:py-5 md:text-lg md:px-12 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-amber-400/40"
                      >
                        Take the Assessment
                        <ArrowRight className="ml-3 h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Hero Image */}
                <div className="mt-12 lg:mt-0 lg:col-span-5">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-amber-600/20 rounded-2xl blur-xl"></div>
                    <img
                      src="https://storage.googleapis.com/msgsndr/caNSYCITaUdvuPWo8p4E/media/68d88c9130eb848593a8e096.jpeg"
                      alt="Professional coaching consultation"
                      className="relative w-full h-auto rounded-2xl shadow-2xl shadow-amber-400/20 border border-amber-400/20"
                    />
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Life Domains Section */}
      <div className="py-16 lg:py-24 bg-gradient-to-b from-black to-gray-900 grain-texture-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-amber-400 font-semibold tracking-wide uppercase">Holistic Assessment</h2>
            <p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Six Life Domains
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-300 lg:mx-auto leading-relaxed">
              Our comprehensive assessment covers the key areas that shape your life and legacy.
            </p>
          </div>

          <div className="mt-16">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-x-8 md:gap-y-12">
              <div className="relative group">
                <div className="absolute flex items-center justify-center h-16 w-16 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black shadow-lg shadow-amber-400/25 group-hover:shadow-amber-400/40 transition-all duration-300">
                  <Target className="h-8 w-8" />
                </div>
                <div className="ml-20">
                  <p className="text-xl leading-6 font-bold text-white group-hover:text-amber-400 transition-colors duration-300">Future Goals & Vision</p>
                  <p className="mt-2 text-base text-gray-300 leading-relaxed">
                    Clarifying your aspirations and the future you're working toward.
                  </p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute flex items-center justify-center h-16 w-16 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black shadow-lg shadow-amber-400/25 group-hover:shadow-amber-400/40 transition-all duration-300">
                  <Heart className="h-8 w-8" />
                </div>
                <div className="ml-20">
                  <p className="text-xl leading-6 font-bold text-white group-hover:text-amber-400 transition-colors duration-300">Core Values & Beliefs</p>
                  <p className="mt-2 text-base text-gray-300 leading-relaxed">
                    Understanding the principles and beliefs that guide your decisions.
                  </p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute flex items-center justify-center h-16 w-16 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black shadow-lg shadow-amber-400/25 group-hover:shadow-amber-400/40 transition-all duration-300">
                  <Users className="h-8 w-8" />
                </div>
                <div className="ml-20">
                  <p className="text-xl leading-6 font-bold text-white group-hover:text-amber-400 transition-colors duration-300">Identity & Self-Perception</p>
                  <p className="mt-2 text-base text-gray-300 leading-relaxed">
                    How you see yourself and your place in the world around you.
                  </p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute flex items-center justify-center h-16 w-16 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black shadow-lg shadow-amber-400/25 group-hover:shadow-amber-400/40 transition-all duration-300">
                  <Target className="h-8 w-8" />
                </div>
                <div className="ml-20">
                  <p className="text-xl leading-6 font-bold text-white group-hover:text-amber-400 transition-colors duration-300">Challenges & Pain Points</p>
                  <p className="mt-2 text-base text-gray-300 leading-relaxed">
                    Identifying obstacles and areas where you need breakthrough.
                  </p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute flex items-center justify-center h-16 w-16 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black shadow-lg shadow-amber-400/25 group-hover:shadow-amber-400/40 transition-all duration-300">
                  <Star className="h-8 w-8" />
                </div>
                <div className="ml-20">
                  <p className="text-xl leading-6 font-bold text-white group-hover:text-amber-400 transition-colors duration-300">Strengths & Assets</p>
                  <p className="mt-2 text-base text-gray-300 leading-relaxed">
                    Recognizing your unique gifts, talents, and resources.
                  </p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute flex items-center justify-center h-16 w-16 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black shadow-lg shadow-amber-400/25 group-hover:shadow-amber-400/40 transition-all duration-300">
                  <Brain className="h-8 w-8" />
                </div>
                <div className="ml-20">
                  <p className="text-xl leading-6 font-bold text-white group-hover:text-amber-400 transition-colors duration-300">Purpose & Motivation</p>
                  <p className="mt-2 text-base text-gray-300 leading-relaxed">
                    Understanding your deeper purpose and what drives you forward.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial/About Section with Image */}
      <div className="py-16 lg:py-24 bg-gradient-to-b from-gray-900 to-black grain-texture">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-amber-600/20 rounded-2xl blur-xl"></div>
              <img
                src={newMrWayneImage}
                alt="Transformational leadership coaching portrait"
                className="relative w-full h-auto rounded-2xl shadow-2xl shadow-amber-400/20 border border-amber-400/20 object-cover"
              />
            </div>
            <div className="mt-12 lg:mt-0">
              <h3 className="text-3xl font-bold text-white sm:text-4xl">
                Transformational Leadership
              </h3>
              <p className="mt-6 text-lg text-gray-300 leading-relaxed">
                With over 15 years of coaching experience, we understand the unique challenges and opportunities 
                that Black men and women face in their journey toward breakthrough and transformation.
              </p>
              <p className="mt-4 text-lg text-gray-300 leading-relaxed">
                This assessment isn't just about identifying where you are—it's about illuminating the path 
                to where you're meant to be.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-black sm:text-4xl lg:text-5xl">
            <span className="block">Ready to begin your transformation?</span>
          </h2>
          <p className="mt-6 text-lg leading-6 text-black/80 max-w-2xl mx-auto">
            Your breakthrough is waiting. Take the first step toward the clarity and alignment you've been seeking.
          </p>
          <button
            onClick={() => onPageChange('assessment')}
            className="mt-8 inline-flex items-center justify-center px-8 py-4 border-2 border-black text-base font-bold rounded-xl text-black bg-white hover:bg-black hover:text-amber-400 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-black/50"
          >
            Begin Your Assessment
            <ArrowRight className="ml-3 h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

const zohoFormPermaId = 'HhEr0QppDGWkygKjgygQH5ypDz5L7SGlyZeZ22Td8EM';

const AssessmentPage: React.FC = () => {
  const [formStarted, setFormStarted] = useState(false);
  const formContainerRef = useRef<HTMLDivElement | null>(null);
  const zohoFormDivId = `zf_div_${zohoFormPermaId}`;

  const isDev = import.meta.env.DEV;

  useEffect(() => {
    if (!formStarted) {
      return undefined;
    }

    const container = formContainerRef.current;
    if (!container) {
      return undefined;
    }

    let iframeSrc = `https://forms.zohopublic.com/elivate/form/VIPTLSelfAssessment/formperma/${zohoFormPermaId}?zf_rszfm=1`;

    try {
      const win = window as typeof window & Record<string, any>;
      const { ZFAdvLead, zfutm_zfAdvLead, ZFLead, zfutm_zfLead } = win;

      if (
        ZFAdvLead &&
        zfutm_zfAdvLead &&
        Array.isArray(ZFAdvLead.utmPNameArr) &&
        typeof zfutm_zfAdvLead.zfautm_gC_enc === 'function'
      ) {
        ZFAdvLead.utmPNameArr.forEach((utmParam: string, index: number) => {
          let paramName = utmParam;
          if (ZFAdvLead.isSameDomian && Array.isArray(ZFAdvLead.utmcustPNameArr) && ZFAdvLead.utmcustPNameArr.indexOf(utmParam) === -1) {
            paramName = `zf_${utmParam}`;
          }
          const utmValue = zfutm_zfAdvLead.zfautm_gC_enc(ZFAdvLead.utmPNameArr[index]);
          if (typeof utmValue !== 'undefined' && utmValue !== '') {
            iframeSrc += iframeSrc.indexOf('?') > -1 ? `&${paramName}=${utmValue}` : `?${paramName}=${utmValue}`;
          }
        });
      }

      if (
        ZFLead &&
        zfutm_zfLead &&
        Array.isArray(ZFLead.utmPNameArr) &&
        typeof zfutm_zfLead.zfutm_gC_enc === 'function'
      ) {
        ZFLead.utmPNameArr.forEach((utmParam: string, index: number) => {
          const utmValue = zfutm_zfLead.zfutm_gC_enc(ZFLead.utmPNameArr[index]);
          if (typeof utmValue !== 'undefined' && utmValue !== '') {
            iframeSrc += iframeSrc.indexOf('?') > -1 ? `&${utmParam}=${utmValue}` : `?${utmParam}=${utmValue}`;
          }
        });
      }
    } catch (error) {
      // Ignore tracking parameter enrichment if Zoho helpers are not present
    }

    const iframe = document.createElement('iframe');
    iframe.src = iframeSrc;
    iframe.style.border = 'none';
    iframe.style.height = '550px';
    iframe.style.width = '100%';
    iframe.style.transition = 'all 0.5s ease';
    iframe.setAttribute('aria-label', 'VIPTL Self Assessment');

    container.appendChild(iframe);

    const handleMessage = (event: MessageEvent) => {
      if (event.origin && !event.origin.includes('forms.zoho')) {
        return;
      }

      const eventData = event.data;
      if (!eventData) {
        return;
      }

      if (isDev) {
        // Helpful insight while refining auto-redirect behaviour
        // eslint-disable-next-line no-console
        console.debug('[Zoho Embed] message', event.origin, event.data);
      }

      if (typeof eventData !== 'string') {
        return;
      }

      const trimmedData = eventData.trim();

      // Zoho sends pipe-delimited messages: <perma>|<height>|<action?>
      if (!trimmedData.startsWith(`${zohoFormPermaId}|`)) {
        return;
      }

      const [, heightToken = '', actionToken = ''] = trimmedData.split('|');
      const parsedHeight = Number.parseFloat(heightToken);

      if (!Number.isNaN(parsedHeight)) {
        const paddedHeight = Math.max(320, Math.ceil(parsedHeight + 20));
        iframe.style.height = `${paddedHeight}px`;

        const shouldScroll = actionToken && actionToken.toLowerCase().includes('scroll');
        if (shouldScroll) {
          iframe.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };
    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
      if (container.contains(iframe)) {
        container.removeChild(iframe);
      }
    };
  }, [formStarted]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black grain-texture">
      <div className="w-full max-w-4xl mx-auto py-12 px-3 sm:px-6 lg:px-8">
        {!formStarted ? (
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Your Transformation Starts Here
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              This assessment will take approximately 25-30 minutes to complete. 
              Be honest with yourself – this is your space for reflection and growth.
            </p>
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl shadow-amber-400/10 p-6 sm:p-8 mb-8 border border-amber-400/20">
              <h2 className="text-2xl font-semibold mb-6 text-amber-400">What to Expect:</h2>
              <div className="space-y-4 text-left">
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-amber-400 mr-4 flex-shrink-0" />
                  <span className="text-gray-300">Thoughtful questions across six life domains</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-amber-400 mr-4 flex-shrink-0" />
                  <span className="text-gray-300">Personalized insights delivered within 5 minutes</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-amber-400 mr-4 flex-shrink-0" />
                  <span className="text-gray-300">Clear next steps for your breakthrough journey</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-amber-400 mr-4 flex-shrink-0" />
                  <span className="text-gray-300">Optional coaching consultation booking</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setFormStarted(true)}
              className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:via-amber-600 hover:to-amber-700 text-black font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-amber-400/25"
            >
              Start My Assessment
            </button>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl shadow-amber-400/10 border border-amber-400/20">
            {/* Zoho form embed */}
            <div className="p-6 sm:p-8 text-center grain-texture-dark">
              <h2 className="text-2xl font-bold mb-4 text-amber-400">Assessment Form</h2>
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl border border-amber-400/20 shadow-2xl shadow-amber-400/10 overflow-hidden -mx-4 sm:mx-0">
                <div id={zohoFormDivId} ref={formContainerRef} className="w-full"></div>
              </div>
              <p className="text-sm text-gray-400 mt-4">
                Your responses are confidential and will only be used to generate your personalized report.
              </p>
              <p className="text-xs text-gray-500 mt-6">
                Submit the form to be automatically redirected to your personalized next steps.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const SuccessPage: React.FC<{ onPageChange: (page: string) => void }> = ({ onPageChange }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black grain-texture">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <CheckCircle className="h-20 w-20 text-amber-400 mx-auto mb-6" />
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Your Assessment is Complete!
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Thank you for taking the time to invest in your growth. Your personalized report is being generated 
            and will be delivered to your email within the next 5 minutes.
          </p>

          <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl shadow-amber-400/10 p-6 sm:p-8 mb-8 border border-amber-400/20">
            <h2 className="text-2xl font-semibold mb-6 text-amber-400">What Happens Next:</h2>
            <div className="space-y-6 text-left max-w-2xl mx-auto">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-black font-bold text-sm">1</span>
                </div>
                <div>
                  <p className="font-semibold text-white">Check Your Email</p>
                  <p className="text-gray-300 text-sm mt-1">Your comprehensive report will arrive within 5 minutes</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-black font-bold text-sm">2</span>
                </div>
                <div>
                  <p className="font-semibold text-white">Review Your Insights</p>
                  <p className="text-gray-300 text-sm mt-1">Discover personalized insights and affirmations tailored to you</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-black font-bold text-sm">3</span>
                </div>
                <div>
                  <p className="font-semibold text-white">Take Action</p>
                  <p className="text-gray-300 text-sm mt-1">Follow the recommended next steps for your breakthrough</p>
                </div>
              </div>
            </div>
          </div>

          {/* Coaching CTA with Image */}
          <div className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 rounded-2xl p-6 sm:p-8 text-black relative overflow-hidden">
            <div className="absolute inset-0 bg-black/5"></div>
            <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
              <div className="text-left">
                <h3 className="text-2xl lg:text-3xl font-bold mb-4">Ready for Your Breakthrough?</h3>
                <p className="text-base sm:text-lg mb-6 text-black/80 leading-relaxed">
                  Your assessment is just the beginning. Let's talk about how to turn these insights into transformation.
                </p>
                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-6">
                  <button className="w-full sm:w-auto bg-black text-amber-400 font-bold py-3 px-6 rounded-lg hover:bg-gray-900 transition-all duration-300 flex items-center justify-center transform hover:scale-105">
                    <Calendar className="h-5 w-5 mr-2" />
                    Schedule Free Consultation
                  </button>
                  <button
                    onClick={() => onPageChange('home')}
                    className="w-full sm:w-auto border-2 border-black text-black font-medium py-3 px-6 rounded-lg hover:bg-black hover:text-amber-400 transition-all duration-300 transform hover:scale-105"
                  >
                    Return to Home
                  </button>
                </div>
              </div>
              <div className="mt-8 lg:mt-0">
                <div className="relative">
                  <div className="absolute inset-0 bg-black/10 rounded-xl blur-sm"></div>
                  <img
                    src="https://storage.googleapis.com/msgsndr/caNSYCITaUdvuPWo8p4E/media/68d88c9130eb841770a8e09a.jpeg"
                    alt="Professional coaching session"
                    className="relative w-full h-auto rounded-xl shadow-xl border-2 border-black/20"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black grain-texture">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl shadow-amber-400/10 p-8 border border-amber-400/20 grain-texture-dark">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">About the Assessment</h1>
          
          <div className="space-y-6 text-gray-300">
            <p className="text-lg leading-relaxed">
              The VIPTL Self-Assessment is designed specifically for Black men and women navigating major life transitions. 
              Drawing from over 15 years of coaching experience, this tool helps you gain clarity across the key domains 
              that shape your life and legacy.
            </p>

            <div className="bg-gradient-to-r from-amber-400/10 to-amber-600/10 rounded-xl p-5 border border-amber-400/20 flex items-center justify-between flex-wrap gap-3">
              <div className="text-sm uppercase tracking-wide text-amber-300 font-semibold">Website</div>
              <a
                href="https://viptransformativeliving.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-100 font-bold underline decoration-amber-400 decoration-2 underline-offset-4 hover:text-white transition-colors"
              >
                viptransformativeliving.com
              </a>
            </div>

            <div className="bg-gradient-to-r from-amber-400/10 to-amber-600/10 rounded-xl p-6 border border-amber-400/20">
              <h2 className="text-2xl font-semibold text-amber-400 mb-4">Our Mission</h2>
              <p className="text-gray-300 leading-relaxed">
                To support Black men and women in aligning their values, identity, and purpose so they can break 
                through in life, business, relationships, and health — especially during moments of change.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-amber-400 mb-4">Who This Is For</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-amber-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Black men and women, primarily aged 30–55</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-amber-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Individuals ready to clarify their vision, values, and purpose</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-amber-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Leaders seeking to overcome challenges and leverage their strengths</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-amber-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Anyone ready to align their identity with their deeper WHY</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-amber-400 mb-4">What Makes This Different</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-r from-amber-400/10 to-amber-500/10 rounded-lg p-4 border border-amber-400/20">
                  <h3 className="font-semibold text-amber-400 mb-2">Culturally Affirming</h3>
                  <p className="text-gray-300 text-sm">
                    Built with understanding of Black cultural nuance and lived experience
                  </p>
                </div>
                <div className="bg-gradient-to-r from-amber-400/10 to-amber-500/10 rounded-lg p-4 border border-amber-400/20">
                  <h3 className="font-semibold text-amber-400 mb-2">Transformational Focus</h3>
                  <p className="text-gray-300 text-sm">
                    Speaks to breakthroughs and growth, not deficits or problems
                  </p>
                </div>
                <div className="bg-gradient-to-r from-amber-400/10 to-amber-500/10 rounded-lg p-4 border border-amber-400/20">
                  <h3 className="font-semibold text-amber-400 mb-2">Holistic Approach</h3>
                  <p className="text-gray-300 text-sm">
                    Covers all six key domains: vision, values, identity, challenges, strengths, and purpose
                  </p>
                </div>
                <div className="bg-gradient-to-r from-amber-400/10 to-amber-500/10 rounded-lg p-4 border border-amber-400/20">
                  <h3 className="font-semibold text-amber-400 mb-2">AI-Powered Insights</h3>
                  <p className="text-gray-300 text-sm">
                    Personalized report with insights, affirmations, and next steps
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Scoring Table */}
            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-amber-400 mb-6 text-left">📊 Scoring & Coaching Interpretation</h2>
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-amber-400/30 shadow-2xl shadow-amber-400/20 overflow-hidden">
                {/* Mobile-first responsive table */}
                <div className="overflow-x-auto">
                  <table className="w-full min-w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-amber-400/20 to-amber-500/20 border-b border-amber-400/30">
                        <th className="px-3 py-4 sm:px-6 text-left text-amber-400 font-bold text-sm sm:text-lg whitespace-nowrap">
                          Total Score
                        </th>
                        <th className="px-3 py-4 sm:px-6 text-left text-amber-400 font-bold text-sm sm:text-lg">
                          Coaching Insight
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-amber-400/10 hover:bg-gradient-to-r hover:from-amber-400/5 hover:to-amber-500/5 transition-all duration-300 group">
                        <td className="px-3 py-4 sm:px-6 whitespace-nowrap">
                          <span className="text-amber-300 font-bold text-sm sm:text-lg group-hover:text-amber-200 transition-colors duration-300">
                            120–150
                          </span>
                        </td>
                        <td className="px-3 py-4 sm:px-6 text-gray-300 group-hover:text-white transition-colors duration-300 text-sm sm:text-base leading-relaxed">
                          High alignment. Focus on refining legacy and amplifying impact.
                        </td>
                      </tr>
                      <tr className="border-b border-amber-400/10 hover:bg-gradient-to-r hover:from-amber-400/5 hover:to-amber-500/5 transition-all duration-300 group">
                        <td className="px-3 py-4 sm:px-6 whitespace-nowrap">
                          <span className="text-amber-300 font-bold text-sm sm:text-lg group-hover:text-amber-200 transition-colors duration-300">
                            90–119
                          </span>
                        </td>
                        <td className="px-3 py-4 sm:px-6 text-gray-300 group-hover:text-white transition-colors duration-300 text-sm sm:text-base leading-relaxed">
                          Moderate alignment. Explore identity gaps and strengthen purpose clarity.
                        </td>
                      </tr>
                      <tr className="border-b border-amber-400/10 hover:bg-gradient-to-r hover:from-amber-400/5 hover:to-amber-500/5 transition-all duration-300 group">
                        <td className="px-3 py-4 sm:px-6 whitespace-nowrap">
                          <span className="text-amber-300 font-bold text-sm sm:text-lg group-hover:text-amber-200 transition-colors duration-300">
                            60–89
                          </span>
                        </td>
                        <td className="px-3 py-4 sm:px-6 text-gray-300 group-hover:text-white transition-colors duration-300 text-sm sm:text-base leading-relaxed">
                          Low alignment. Prioritize healing, identity work, and values integration.
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-amber-400/5 hover:to-amber-500/5 transition-all duration-300 group">
                        <td className="px-3 py-4 sm:px-6 whitespace-nowrap">
                          <span className="text-amber-300 font-bold text-sm sm:text-lg group-hover:text-amber-200 transition-colors duration-300">
                            Below 60
                          </span>
                        </td>
                        <td className="px-3 py-4 sm:px-6 text-gray-300 group-hover:text-white transition-colors duration-300 text-sm sm:text-base leading-relaxed">
                          Identity and purpose may feel fragmented. Begin with emotional safety and foundational clarity.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <p className="text-center text-gray-400 text-sm mt-4 italic">
                Each score range provides personalized guidance for your transformational journey
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // Check URL parameters on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const pageParam = urlParams.get('page');
    if (pageParam === 'success') {
      setCurrentPage('success');
    }
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onPageChange={setCurrentPage} />;
      case 'assessment':
        return <AssessmentPage />;
      case 'success':
        return <SuccessPage onPageChange={setCurrentPage} />;
      case 'about':
        return <AboutPage />;
      default:
        return <HomePage onPageChange={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      {renderPage()}
    </div>
  );
}

export default App;
