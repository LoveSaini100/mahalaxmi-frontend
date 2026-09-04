import React from 'react';
import SEO from '../components/common/SEO';
import WhatsAppIcon from '../components/common/WhatsAppIcon';
import { getWhatsAppLink } from '../utils/formatters';
import {
  ShieldCheck,
  Award,
  MapPin,
  Users,
  CheckCircle2,
  Building2,
  Target,
  Eye,
  TrendingUp,
  Compass,
  FileCheck,
  Milestone,
  ArrowRight,
  Sparkles,
  UserCheck,
  HelpCircle,
  FileText,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  const whatsappUrl = getWhatsAppLink();

  return (
    <>
      <SEO
        title="About Mahalaxmi Property | Best Property Dealer & Property Advisor in Biharigarh"
        description="Learn why Mahalaxmi Property is recognized as the best property dealer and trusted property advisor in Biharigarh, Chutmalpur, Gagalheri, Behat & Saharanpur."
        keywords="Best property dealer, property dealer in biharigarh, property advisor, property advisor in biharigarh, real estate agent Saharanpur, Chutmalpur property dealer, Gagalheri property advisor, Behat land dealer, Dehradun Highway plots"
      />

      {/* ================= HEADER BANNER ================= */}
      <div className="bg-navy-dark text-white pt-32 pb-20 relative overflow-hidden">
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full filter blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 text-center relative z-10 space-y-3">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy border border-gold/40 text-gold text-xs font-bold uppercase tracking-widest backdrop-blur-md">
            <Award className="w-4 h-4 text-gold" />
            <span>BEST PROPERTY DEALER & ADVISOR IN BIHARIGARH</span>
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold font-heading text-white">
            About Mahalaxmi Property
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Recognized as the <strong>best property dealer in Biharigarh</strong> and premier <strong>property advisor in Saharanpur</strong>, dedicated to absolute transparency, legal safety, and high-value land investments.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {/* ================= SECTION 1: WHO WE ARE ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <span className="text-xs font-bold text-gold uppercase tracking-widest block">
              WHO WE ARE
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-navy-dark leading-tight">
              Building Trust & Realizing Property Dreams
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
              Mahalaxmi Property operates with a clear objective: to bring absolute integrity, transparent pricing, and expert guidance to buyers, sellers, and land investors along the Dehradun–Saharanpur Highway corridor in Biharigarh.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
              Headquartered near Pencho Restaurant, we specialize in prime highway commercial land, verified residential plots, luxury independent villas, and agricultural holdings. Every property listed under Mahalaxmi Property undergoes rigorous legal title verification so you invest with complete peace of mind.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-2 rounded-2xl bg-brand-offwhite border border-slate-400">
                <div className="text-2xl font-bold font-heading text-gold">15+ Years</div>
                <div className="text-xs text-slate-500 mt-1 font-medium">Regional Real Estate Trust</div>
              </div>
              <div className="p-2 rounded-2xl bg-brand-offwhite border border-slate-400">
                <div className="text-2xl font-bold font-heading text-gold">500+</div>
                <div className="text-xs text-slate-500 mt-1 font-medium">Satisfied Property Owners</div>
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-gold/30">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
              alt="Mahalaxmi Property Office & Properties"
              className="w-full h-auto object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4 p-2 rounded-2xl glass-dark text-white ">
              <div className="text-lg font-bold font-heading text-gold">Dehradun-Saharanpur Highway</div>
              <div className="text-xs text-slate-300">Biharigarh Hub, Saharanpur, UP</div>
            </div>
          </div>
        </div>

        {/* ================= SECTION 2: CORE VALUES GRID ================= */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-gold uppercase tracking-widest block mb-2">
              OUR PILLARS
            </span>
            <h2 className="text-4xl font-bold font-heading text-navy-dark">What Drives Our Work</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              The fundamental values and ethical standards that guide every property deal, client consultation, and regional land investment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-md space-y-2 hover:border-gold/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-navy text-gold flex items-center justify-center shadow-sm">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-heading text-navy-dark">Absolute Transparency</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We believe in straightforward communication, zero hidden broker charges, clear title documents, and open deal negotiation.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-md space-y-2 hover:border-gold/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-navy text-gold flex items-center justify-center shadow-sm">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-heading text-navy-dark">Local Market Authority</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Unrivaled deep-rooted knowledge of Biharigarh, Saharanpur, and the rapidly growing Dehradun Highway economic corridor.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-md space-y-3 hover:border-gold/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-navy text-gold flex items-center justify-center shadow-sm">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-heading text-navy-dark">Customer-Centric Focus</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Every consultation is tailored to match your family's specific residential needs and long-term financial investment goals.
              </p>
            </div>
          </div>
        </div>

        {/* ================= SECTION 3: VISION & MISSION DUAL CARDS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-navy-dark text-white border border-gold/40 shadow-xl space-y-4 relative overflow-hidden group">
            <div className="w-12 h-12 rounded-2xl bg-navy border border-gold/40 flex items-center justify-center text-gold shadow-md">
              <Target className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-gold uppercase tracking-widest block">PURPOSE & DRIVE</span>
            <h4 className="text-2xl font-bold font-heading text-white">Our Mission</h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              To empower home buyers, business owners, and real estate investors with 100% verified legal titles, fair market valuation, and seamless end-to-end registry assistance along the Saharanpur–Dehradun highway region.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white text-navy-dark border border-slate-200 shadow-xl space-y-4 relative overflow-hidden group hover:border-gold/50 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-navy text-gold flex items-center justify-center shadow-md">
              <Eye className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-gold uppercase tracking-widest block">FUTURE HORIZON</span>
            <h4 className="text-2xl font-bold font-heading text-navy-dark">Our Vision</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              To be recognized as the premier and most trusted real estate destination in Western Uttar Pradesh and Uttarakhand by setting benchmark standards in transparent dealing, property legal safety, and client satisfaction.
            </p>
          </div>
        </div>

        {/* ================= NEW SECTION 9: KEY REGIONAL CORRIDORS WE COVER ================= */}
        <div className="py-12 px-6 sm:px-10 rounded-3xl bg-brand-offwhite border border-slate-200 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-gold uppercase tracking-widest block">
              PRIMARY LOCATIONS
            </span>
            <h3 className="text-3xl font-bold font-heading text-navy-dark">
              Key Regional Corridors We Cover
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Specialized real estate solutions across prime growth zones, highway junctions, and residential hubs in Saharanpur, Biharigarh, and Uttarakhand border belts.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Biharigarh Highway Hub',
                desc: 'Commercial plots, showrooms, petrol pump land, and highway retail plazas.',
                icon: Building2,
              },
              {
                title: 'Pencho Corridor Zone',
                desc: 'Luxury villas, modern independent family homes, and quiet residential colonies.',
                icon: MapPin,
              },
              {
                title: 'Saharanpur Link Road',
                desc: 'Gated residential plots, sub-divided land, and agricultural investment plots.',
                icon: Compass,
              },
              {
                title: 'Foothill Green Belt',
                desc: 'Scenic farmhouses, eco-retreat plots, and hillside boundary land holdings.',
                icon: Sparkles,
              },
            ].map((zone) => {
              const Icon = zone.icon;
              return (
                <div key={zone.title} className="p-5 rounded-2xl bg-white border border-slate-400 shadow-sm space-y-1">
                  <div className="w-10 h-10 rounded-xl bg-navy text-gold flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-xl font-bold font-heading text-navy-dark">{zone.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{zone.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= SECTION 4: WHY INVEST IN THE HIGHWAY CORRIDOR ================= */}
        <div className="py-12 px-6 sm:px-10 rounded-3xl bg-navy-dark text-white border border-gold/40 space-y-8 shadow-xl">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-gold uppercase tracking-widest block">
              LOCATION ADVANTAGE
            </span>
            <h3 className="text-3xl font-bold font-heading text-white">
              Why Invest in Dehradun-Saharanpur Highway Corridor?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Strategic economic growth, foothill climate, and seamless highway connectivity make Biharigarh a real estate hotspot.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Expressway & Highway Links',
                desc: 'Reduced travel times connecting Delhi NCR, Saharanpur, and Dehradun capital region.',
                icon: TrendingUp,
              },
              {
                title: 'High Land Appreciation',
                desc: 'Consistently strong 15-25% annual appreciation across commercial and plot holdings.',
                icon: Award,
              },
              {
                title: 'Scenic Foothill Location',
                desc: 'Peaceful living nestled near Shivalik green hills, ideal for holiday homes and villas.',
                icon: MapPin,
              },
              {
                title: 'Commercial Hub Growth',
                desc: 'Emerging hub for showrooms, plazas, educational institutions, and hospitality businesses.',
                icon: Building2,
              },
            ].map((adv) => {
              const Icon = adv.icon;
              return (
                <div key={adv.title} className="p-5 rounded-2xl bg-navy/80 border border-gold/40 shadow-sm space-y-1">
                  <div className="w-10 h-10 rounded-xl bg-navy-dark border border-gold/40 text-gold flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-xl font-bold font-heading text-white">{adv.title}</h4>
                  <p className="text-sm text-slate-300 leading-relaxed">{adv.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= SECTION 5: OUR GUIDING COMMITMENTS ================= */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-gold uppercase tracking-widest block">
              CLIENT GUARANTEE
            </span>
            <h4 className="text-3xl font-bold font-heading text-navy-dark">Our Guiding Commitments</h4>
            <p className="text-xs sm:text-sm text-slate-500">
              We hold ourselves to the highest ethical standard to ensure every property purchase is secure and stress-free.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              '100% Legal Title & Revenue Paper Scrutiny',
              'Direct Owner Consultation & Zero Markups',
              'Complete Registry & Stamp Duty Assistance',
              'Free Guided Site Visits with Local Experts',
              'Authentic Ground-Market Valuation Advice',
              'Post-Purchase Fencing & Boundary Support',
            ].map((item) => (
              <div key={item} className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-gold shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-navy-dark">{item}</span>
              </div>
            ))}
          </div>
        </div>

      

        {/* ================= SECTION 7: CTA BANNER ================= */}
        <div className="p-5 sm:p-12 rounded-3xl bg-navy-dark text-white text-center border border-gold/40 shadow-2xl space-y-6 relative overflow-hidden">
          <h4 className="text-2xl sm:text-4xl font-bold font-heading">
            Ready to Find Your Ideal Property?
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
            Get in touch with Mahalaxmi Property today for expert guidance, verified listings, and tailored real estate deals in Biharigarh.
          </p>
          <div className="flex flex-row items-center justify-center gap-2 sm:gap-4 pt-2 w-full sm:w-auto">
            <Link
              to="/properties"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center px-3 sm:px-8 py-2.5 sm:py-3.5 rounded-xl bg-gradient-to-r from-gold via-gold-accent to-gold-dark text-navy-dark font-bold text-xs sm:text-sm shadow-gold hover:shadow-glow transition-all shrink-0 whitespace-nowrap"
            >
              <span>Explore Properties</span>
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center px-3 sm:px-8 py-2.5 sm:py-3.5 rounded-xl bg-emerald-600 text-white font-bold text-xs sm:text-sm hover:bg-emerald-500 transition-all flex items-center gap-1.5 sm:gap-2 shrink-0 whitespace-nowrap"
            >
              <WhatsAppIcon className="w-4 h-4 text-white shrink-0" />
              <span className="hidden sm:inline">Talk on WhatsApp</span>
              <span className="sm:hidden">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
