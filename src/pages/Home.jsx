import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPropertiesThunk } from '../store/slices/propertySlice';
import { fetchTestimonialsThunk } from '../store/slices/testimonialSlice';
import SEO from '../components/common/SEO';
import PropertySearch from '../components/property/PropertySearch';
import PropertyCard from '../components/property/PropertyCard';
import { PropertyCardSkeleton } from '../components/common/Skeleton';
import RatingStars from '../components/common/RatingStars';
import WhatsAppIcon from '../components/common/WhatsAppIcon';
import { getWhatsAppLink } from '../utils/formatters';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { motion } from 'framer-motion';

import {
  ShieldCheck,
  Building2,
  MapPin,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  Award,
  Users,
  Briefcase,
  FileCheck,
  TrendingUp,
  HelpCircle,
  Compass,
  Handshake,
  Key,
  Sparkles,
  Phone,
} from 'lucide-react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Home = () => {
  const dispatch = useDispatch();
  const { list: properties = [], loading } = useSelector((state) => state.properties || {});
  const testimonials = useSelector((state) => state.testimonials?.list) || [];
  const settings = useSelector((state) => state.settings?.data) || {};

  useEffect(() => {
    dispatch(fetchPropertiesThunk());
    dispatch(fetchTestimonialsThunk());
  }, [dispatch]);

  const safeProperties = Array.isArray(properties) ? properties : [];
  const featuredProperties = safeProperties.filter((p) => p && p.featured);
  const latestProperties = safeProperties.slice(0, 8);
  const whatsappUrl = getWhatsAppLink();

  return (
    <>
      <SEO
        title="Real Estate in Biharigarh Saharanpur | Mahalaxmi"
        description="Find verified plots, villas, and commercial land near Pencho Restaurant on Dehradun-Saharanpur Highway, Biharigarh. Contact Mahalaxmi Property today."
        keywords="Real Estate Biharigarh, Property in Saharanpur, Dehradun Saharanpur Highway plots, Pencho Restaurant Biharigarh, Land in 247662, Chhutmalpur property, Mohand plots, Gagalheri land, Commercial plot Biharigarh, Villa Saharanpur, Mahalaxmi Property"
      />

      <section className="relative min-h-[90vh] flex items-center pt-24 pb-28 bg-navy-dark text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=75"
            srcSet="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=70 600w, https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=75 1200w"
            sizes="(max-width: 640px) 600px, 1200px"
            alt="Mahalaxmi Property Modern Home"
            className="w-full h-full object-cover object-right"
            fetchpriority="high"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-dark via-navy-dark/90 to-navy-dark/20 md:via-navy-dark/30 md:to-transparent" />
        </div>

        <div className="absolute top-1/4 left-10 w-72 h-72 bg-gold/10 rounded-full filter blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-2xl text-left space-y-6">
            {/* Small Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy/90 border border-gold/40 text-gold text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-md"
            >
              <Award className="w-4 h-4 text-gold" />
              <span>TRUSTED REAL ESTATE PARTNER</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-6xl font-bold font-heading leading-tight tracking-wide text-white"
            >
              Find a Place You'll <br />
              <span className="gold-gradient-text">Love to Call Home.</span>
            </motion.h1>

            {/* Supporting Text */}
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-sm sm:text-base text-white leading-relaxed max-w-xl"
            >
              Discover premium properties, residential homes, commercial hubs, and high-value plot investments with Mahalaxmi Property near Dehradun–Saharanpur Highway, Biharigarh.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-row items-center gap-2.5 sm:gap-4 pt-2 text-left"
            >
              <Link
                to="/properties"
                className="px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-gold via-gold-accent to-gold-dark text-navy-dark font-bold text-xs sm:text-sm shadow-gold hover:shadow-glow hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-1.5 sm:gap-2 shrink-0 whitespace-nowrap"
              >
                <span>Explore Properties</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </Link>

              <Link
                to="/contact"
                className="px-4 sm:px-7 py-2.5 sm:py-3 rounded-xl bg-navy/90 hover:bg-navy text-white border border-gold/50 text-xs sm:text-sm font-semibold backdrop-blur-md shadow-white hover:shadow-white-glow hover:border-gold hover:scale-105 active:scale-95 transition-all duration-300 shrink-0 whitespace-nowrap"
              >
                Contact Us
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= FEATURED PROPERTIES ================= */}
      <section className="py-16 bg-brand-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div>
              <span className="text-xs font-bold text-gold uppercase tracking-widest block mb-2">
                HANDPICKED SELECTIONS
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-heading text-navy-dark">
                Featured Properties
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-xl">
                Explore our handpicked selection of premium residential villas, commercial prime spaces, and strategic highway land investments.
              </p>
            </div>
            <Link
              to="/properties?featured=true"
              className="mt-4 md:mt-0 text-xs font-bold text-navy hover:text-gold flex items-center gap-1 group transition-colors"
            >
              <span>View All Featured</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <PropertyCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <Swiper
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              autoplay={{ delay: 4500, disableOnInteraction: false }}
              modules={[Pagination, Autoplay]}
              className="pb-14 px-1"
            >
              {(featuredProperties.length > 0 ? featuredProperties : properties).map((property) => (
                <SwiperSlide key={property._id}>
                  <PropertyCard property={property} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </section>

      {/* ================= PROPERTY CATEGORIES ================= */}
      {/* ================= CATEGORIES ================= */}
      <section className="py-16 bg-white border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-gold uppercase tracking-widest block mb-2">
              CATEGORIES
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-navy-dark">
              Explore Property Types
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Whether you are buying a residence, acquiring commercial property, or investing in raw land, we have options tailored to your aspirations.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {[
              {
                title: 'Residential',
                path: '/residential',
                desc: 'Villas, independent houses, and modern family homes.',
                image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
                icon: Building2,
              },
              {
                title: 'Commercial',
                path: '/commercial',
                desc: 'Highway plazas, retail shops, and commercial spaces.',
                image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
                icon: Briefcase,
              },
              {
                title: 'Plots & Land',
                path: '/plots-land',
                desc: 'Gated residential plots and strategic agricultural land.',
                image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80',
                icon: Compass,
              },
              {
                title: 'Luxury Properties',
                path: '/properties?featured=true',
                desc: 'Exclusive high-end villas and prime highway frontages.',
                image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80',
                icon: Award,
              },
            ].map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.title}
                  to={cat.path}
                  className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl min-h-[250px] sm:min-h-[300px] flex flex-col justify-end p-3.5 sm:p-6 border border-slate-200/80 transition-all duration-300 hover:-translate-y-1.5"
                >
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/85 to-navy-dark/30" />

                  <div className="relative z-10 space-y-1.5 sm:space-y-2 text-white">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gold/90 text-navy-dark flex items-center justify-center shadow-sm">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <h3 className="text-base sm:text-xl font-bold font-heading text-white">{cat.title}</h3>
                    <p className="text-[11px] sm:text-xs text-slate-200 leading-snug sm:leading-relaxed line-clamp-2">{cat.desc}</p>

                    <div className="pt-1 inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold text-gold group-hover:text-white transition-colors">
                      <span>Explore Category</span>
                      <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= ABOUT MAHALAXMI PROPERTY ================= */}
      <section className="py-16 bg-brand-offwhite relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-gold/30">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                alt="About Mahalaxmi Property"
                className="w-full h-auto object-cover"
              />
              <div className="absolute hidden md:block bottom-1 left-6 right-6 p-4 rounded-2xl glass-dark text-white space-y-1">
                <div className="text-2xl font-bold font-heading text-gold">Dehradun-Saharanpur Highway</div>
                <div className="text-xs text-slate-300">Prime Economic Corridor & Real Estate Hub</div>
              </div>
            </div>

            {/* Right Content */}
            <div className="space-y-1">
              <span className="text-xs font-bold text-gold uppercase tracking-widest block">
                ABOUT MAHALAXMI PROPERTY
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-heading text-navy-dark leading-tight">
                Committed to Helping You Find the Right Property With Trust & Transparency.
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
                Mahalaxmi Property is a premier real estate agency headquartered near Pencho Restaurant on the Dehradun–Saharanpur Highway in Biharigarh. With deep-rooted local market expertise and an unyielding commitment to transparency, we specialize in luxury residential homes, high-yield commercial hubs, and strategic land investments.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
                Whether you are looking to build your dream home, expand your commercial footprint, or secure high-appreciation plot investments along the rapidly developing Saharanpur-Dehradun economic corridor, our experienced team provides complete end-to-end guidance—from site visits and legal title verification to final registry assistance.
              </p>

              {/* Highlights list */}
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 pt-2">
                {[
                  'Verified Property Listings',
                  'Transparent Transactions',
                  'Local Market Expertise',
                  'Customer First Approach',
                  'End-to-End Assistance',
                  'Highway Corridor Specialist',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-xs font-semibold text-navy-dark">
                    <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-navy text-white font-bold text-xs hover:bg-navy-dark hover:text-gold transition-all shadow-md"
                >
                  <span>Know More About Us</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-16 bg-navy-dark text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-gold uppercase tracking-widest block mb-2">
              THE MAHALAXMI ADVANTAGE
            </span>
            <h3 className="text-3xl sm:text-4xl font-bold font-heading">
              Why Choose Mahalaxmi Property
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              We combine in-depth regional market knowledge with transparent processes to deliver seamless real estate solutions.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
            {[
              { title: 'Trusted Guidance', desc: 'Expert real estate advice tailored to your financial goals and family aspirations.', icon: ShieldCheck },
              { title: 'Verified Properties', desc: 'Detailed title verification and legal clarity for peace of mind.', icon: FileCheck },
              { title: 'Transparent Transactions', desc: 'Zero hidden clauses or surprise costs throughout your deal.', icon: Award },
              { title: 'Local Market Expertise', desc: 'Specialized focus on Biharigarh, Saharanpur, and Highway corridors.', icon: MapPin },
              { title: 'Personalized Assistance', desc: 'Dedicated consultations matching your exact property criteria.', icon: Users },
              { title: 'End-to-End Support', desc: 'From site visits to documentation and final registry assistance.', icon: TrendingUp },
            ].map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-3.5 sm:p-6 rounded-2xl bg-navy border border-gold/30 hover:border-gold/60 shadow-lg space-y-2 sm:space-y-3 transition-all duration-300 group"
                >
                  <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-navy-dark border border-gold/40 flex items-center justify-center text-gold group-hover:scale-110 transition-transform">
                    <Icon className="w-4 h-4 sm:w-6 sm:h-6" />
                  </div>
                  <h4 className="text-sm sm:text-xl font-bold font-heading text-white leading-snug">{card.title}</h4>
                  <p className="text-[11px] sm:text-sm text-slate-300 leading-tight sm:leading-relaxed">{card.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold text-gold uppercase tracking-widest block mb-2">
              OUR EXPERTISE
            </span>
            <h4 className="text-3xl sm:text-4xl font-bold font-heading text-navy-dark">
              Our Real Estate Services
            </h4>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Comprehensive end-to-end real estate solutions designed to maximize value, ensure legal transparency, and simplify your property journey along the Dehradun–Saharanpur corridor.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {[
              { title: 'Property Buying', desc: 'Find your dream home or commercial space effortlessly.', icon: Building2 },
              { title: 'Property Selling', desc: 'Get competitive market value for your property.', icon: TrendingUp },
              { title: 'Property Consultation', desc: 'Professional real-estate investment guidance.', icon: Briefcase },
              { title: 'Plot & Land Deals', desc: 'High appreciation plots along highway corridor.', icon: Compass },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.title}
                  className="p-3.5 sm:p-5 rounded-2xl bg-brand-offwhite border border-slate-200 hover:border-gold/50 hover:shadow-lg transition-all space-y-2"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-navy text-gold flex items-center justify-center shadow-sm">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <h4 className="text-sm sm:text-xl font-bold font-heading text-navy-dark">{s.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-500 leading-snug sm:leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= NEW SECTION: HOW WE WORK / 4-STEP PROCESS ================= */}
      <section className="py-16 bg-brand-offwhite border-t border-slate-200 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold text-gold uppercase tracking-widest block mb-2">
              SIMPLE & TRANSPARENT PROCESS
            </span>
            <h4 className="text-3xl sm:text-4xl font-bold font-heading text-navy-dark">
              How We Help You Buy or Invest
            </h4>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Our straightforward 4-step workflow ensures peace of mind, legal safety, and complete satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {[
              {
                step: '01',
                title: 'Property Discovery',
                desc: 'Explore handpicked listings or submit custom requirements.',
                icon: Compass,
              },
              {
                step: '02',
                title: 'Guided Site Visit',
                desc: 'Schedule private tours along the highway corridor with our local team.',
                icon: MapPin,
              },
              {
                step: '03',
                title: 'Title Verification',
                desc: 'Complete documentation & title checks for 100% legal safety.',
                icon: FileCheck,
              },
              {
                step: '04',
                title: 'Hassle-Free Handover',
                desc: 'Transparent pricing, final agreement, and registry handover.',
                icon: Key,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-300/80 shadow-md hover:border-gold/50 hover:shadow-xl transition-all space-y-2 sm:space-y-3 relative group flex flex-col justify-between h-full"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-navy text-gold flex items-center justify-center shadow-sm">
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <span className="text-lg sm:text-3xl font-bold font-heading text-slate-300 group-hover:text-gold transition-colors">
                        {item.step}
                      </span>
                    </div>
                    <h4 className="text-sm sm:text-xl font-bold font-heading text-navy-dark leading-snug">{item.title}</h4>
                  </div>
                  <p className="text-sm sm:text-md text-slate-500 leading-tight sm:leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= LATEST PROPERTIES ================= */}
      <section className="py-16 bg-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold text-gold uppercase tracking-widest block mb-2">
                FRESH ON MARKET
              </span>
              <h4 className="text-3xl font-bold font-heading text-navy-dark">
                Latest Property Listings
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-xl">
                Browse our newest verified listings, including residential houses, commercial spaces, and highway plot investments.
              </p>
            </div>
            <Link to="/properties" className="text-xs font-bold text-navy hover:text-gold flex items-center gap-1 group shrink-0">
              <span>View All Properties</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {latestProperties.map((prop) => (
              <PropertyCard key={prop._id} property={prop} />
            ))}
          </div>

          {/* View All Properties Bottom Action Button */}
          <div className="mt-8 text-center">
            <Link
              to="/properties"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-navy hover:bg-navy-dark text-white font-bold text-sm shadow-md hover:text-gold transition-all duration-300 group border border-gold/30 hover:border-gold"
            >
              <span>View All Properties</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-gold" />
            </Link>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="py-16 bg-brand-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold text-gold uppercase tracking-widest block mb-2">
              CLIENT TESTIMONIALS
            </span>
            <h4 className="text-3xl font-bold font-heading text-navy-dark">What Our Clients Say</h4>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Real feedback and experiences shared by buyers, home owners, and property investors who trusted Mahalaxmi Property for their real estate journey.
            </p>
          </div>

          <Swiper
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            modules={[Autoplay]}
            className="pb-28 px-1"
          >
            {Array.isArray(testimonials) && testimonials.map((t) => (
              <SwiperSlide key={t._id || t.id} className="!h-auto flex pb-5">
                <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-md space-y-1 flex flex-col justify-between w-full h-full">
                  <div className="space-y-3">
                    <RatingStars rating={t.rating} />
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">"{t.review}"</p>
                  </div>
                  <div className="pt-1 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-navy-dark">{t.name}</div>
                      <div className="text-[10px] sm:text-xs text-slate-400">{t.location}</div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* ================= NEW SECTION: CORRIDOR STATS & TRUST HIGHLIGHTS ================= */}
      <section className="py-16 bg-navy text-white border-t border-gold/20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { number: '15+', label: 'Years Market Presence', icon: Award },
              { number: '100%', label: 'Verified Title Properties', icon: ShieldCheck },
              { number: '500+', label: 'Happy Homeowners & Investors', icon: Users },
              { number: '0%', label: 'Hidden Fees or Clauses', icon: CheckCircle2 },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="p-5 rounded-2xl bg-navy-dark/60 border border-gold/40 space-y-2 hover:border-gold/60 transition-colors">
                  <div className="w-10 h-10 mx-auto rounded-xl bg-navy border border-gold/40 flex items-center justify-center text-gold">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold font-heading text-gold tracking-wide">
                    {stat.number}
                  </div>
                  <div className="text-xs text-slate-300 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-16 bg-offwhite text-navy text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-2">
          <h4 className="text-3xl sm:text-4xl font-bold font-heading">
            Your Dream Property Is Closer Than You Think.
          </h4>
          <p className="text-xs sm:text-sm text-slate-900 max-w-2xl mx-auto">
            Let Mahalaxmi Property help you find the right place for your next chapter along the Dehradun–Saharanpur corridor.
          </p>
          <div className="flex flex-row items-center justify-center gap-2.5 sm:gap-4 pt-4">
            <Link
              to="/properties"
              className="px-4 sm:px-8 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-gold via-gold-accent to-gold-dark text-navy-dark font-bold text-xs sm:text-sm shadow-gold hover:shadow-glow hover:scale-105 transition-all whitespace-nowrap"
            >
              Explore Properties
            </Link>
            <a
              href={`tel:${settings?.phone ? settings.phone.replace(/\s+/g, '') : '+919917970750'}`}
              className="px-4 sm:px-8 py-3 sm:py-3.5 rounded-xl bg-navy text-gold font-bold text-xs sm:text-sm hover:bg-navy-dark transition-all flex items-center gap-1.5 sm:gap-2 whitespace-nowrap shadow-md"
            >
              <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold" />
              <span>Call Direct</span>
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 sm:px-8 py-3 sm:py-3.5 rounded-xl bg-emerald-600 text-white font-bold text-xs sm:text-sm hover:bg-emerald-500 transition-all flex items-center gap-1.5 sm:gap-2 whitespace-nowrap"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              <span>Talk on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
