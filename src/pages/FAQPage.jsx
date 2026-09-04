import React, { useState } from 'react';
import SEO from '../components/common/SEO';
import { getWhatsAppLink } from '../utils/formatters';
import {
  ChevronDown,
  HelpCircle,
  Search,
  MessageSquare,
  PhoneCall,
  CheckCircle2,
  Building2,
  FileText,
  MapPin,
} from 'lucide-react';

const FAQPage = () => {
  const [openIdx, setOpenIdx] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const faqs = [
    {
      category: 'Buying & Selling',
      q: '1. How can I enquire about a property listed on Mahalaxmi Property?',
      a: 'You can submit an enquiry directly on any property details page using our online contact form, call us directly at +91 9917970750, or click the WhatsApp button on our website to chat with our real estate experts instantly.',
    },
    {
      category: 'Verification',
      q: '2. Are all properties listed with Mahalaxmi Property verified?',
      a: 'Yes, every residential house, villa, commercial space, and land plot in our portfolio undergoes title inspection and preliminary legal checks so you can invest with 100% peace of mind.',
    },
    {
      category: 'Site Visits',
      q: '3. Can I schedule a physical site visit before purchasing?',
      a: 'Absolutely! We arrange complimentary, guided site visits for any property or land plot along the Dehradun-Saharanpur highway at your convenient date and time.',
    },
    {
      category: 'Location',
      q: '4. Where is the Mahalaxmi Property office located?',
      a: 'Our main office is located near Pencho Restaurant, Dehradun–Saharanpur Highway, Biharigarh, Saharanpur, Uttar Pradesh (Pincode: 247662). You are welcome to visit us during working hours (9:00 AM – 8:00 PM).',
    },
    {
      category: 'Highway Land',
      q: '5. Do you deal in plots and commercial land along the Dehradun–Saharanpur Highway?',
      a: 'Yes, strategic commercial land, highway frontage plots, petrol pump sites, showroom plots, and hotel/resort land investments along the booming Dehradun–Saharanpur highway corridor are our core specialty.',
    },
    {
      category: 'Legal & Registry',
      q: '6. Do you assist buyers with property legal documentation and registry?',
      a: 'Yes, we provide end-to-end legal support including title deed search verification, sales agreement drafting, stamp duty calculation, and complete registry execution at the sub-registrar office.',
    },
    {
      category: 'Buying & Selling',
      q: '7. Can I list and sell my property or agricultural land through Mahalaxmi Property?',
      a: 'Yes, if you own residential, commercial, or agricultural land in Biharigarh, Saharanpur, or surrounding highway areas, contact our team. We will inspect, evaluate, and market your property to verified buyers.',
    },
    {
      category: 'Property Types',
      q: '8. What types of residential properties do you offer?',
      a: 'We offer independent villas, double-story residential houses, gated colony plots, luxury duplexes, and affordable family homes across Biharigarh and nearby highway localities.',
    },
    {
      category: 'Pricing & Valuation',
      q: '9. How do I know the current market price of a plot in Biharigarh?',
      a: 'Property rates vary based on highway proximity, road frontage width, and sector growth. Contact our advisory team at +91 9917970750 for an accurate, up-to-date market evaluation of land rates.',
    },
    {
      category: 'Home Loans',
      q: '10. Are home loan facilities available for buying properties through Mahalaxmi Property?',
      a: 'Yes, we assist eligible buyers in connecting with leading nationalized and private banks (such as SBI, HDFC, ICICI, PNB) for smooth home loan approval and plot purchase loan documentation.',
    },
    {
      category: 'Process',
      q: '11. What is the step-by-step procedure for booking a property?',
      a: 'Once you select a property after a guided site visit, booking is initiated by signing an Agreement to Sell (Bayana) followed by document verification, bank loan processing (if required), and final registry execution.',
    },
    {
      category: 'Transparency',
      q: '12. Are there any hidden service charges or commission fees?',
      a: 'No, we maintain 100% pricing transparency. All property prices, legal registration costs, and consultancy terms are discussed upfront with zero hidden charges.',
    },
    {
      category: 'NRI & Outstation Buyers',
      q: '13. Can non-residents or investors from Delhi NCR / Uttarakhand buy land in Biharigarh?',
      a: 'Yes, Biharigarh is situated in Saharanpur district, Uttar Pradesh, right at the border of Dehradun, Uttarakhand. Buyers from anywhere in India can purchase clear-title land and properties here smoothly.',
    },
    {
      category: 'Process',
      q: '14. How fast can a property deal be finalized and registered?',
      a: 'For ready-to-move houses and clear-title plots with direct payment or pre-approved bank loans, property deals can be completed and registered within 3 to 7 working days.',
    },
    {
      category: 'Support',
      q: '15. How can I get in touch with Mahalaxmi Property customer support?',
      a: 'You can call our hotline at +91 9917970750, message us on WhatsApp (+91 9917970750), email us at sales@mahalaxmipropertiesindia.com (or Direct@mahalaxmipropertiesindia.com / Manager@mahalaxmipropertiesindia.com), or fill out the quick form on our Contact Us page.',
    },
  ];

  const categories = ['All', 'Buying & Selling', 'Legal & Registry', 'Site Visits', 'Highway Land', 'Home Loans'];

  // Filter FAQs based on search and category
  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <SEO
        title="Frequently Asked Questions | Mahalaxmi Biharigarh UP"
        description="Find answers to 15 FAQs on buying plots, legal registry, and site visits near Pencho Restaurant on Dehradun-Saharanpur Highway, Biharigarh, UP."
        keywords="Real estate FAQs Biharigarh, Property registry answers Saharanpur, Plot site visit FAQ Dehradun Highway"
      />

      {/* Header Banner */}
      <div className="bg-navy-dark text-white pt-32 pb-16 border-b border-gold/30">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-3">
          <span className="text-xs font-bold text-gold uppercase tracking-widest block">HELP & KNOWLEDGE CENTER</span>
          <h1 className="text-3xl sm:text-5xl font-bold">Frequently Asked Questions</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
            Got questions about buying plots, villas, legal documentation, or site visits along Dehradun-Saharanpur Highway? We have compiled 15 comprehensive answers below.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-8">
        {/* Search & Category Filter Bar */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 15 FAQs (e.g. registry, site visit, highway plot, home loan)..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-navy text-gold shadow-md border border-gold/40'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 15 FAQs Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden shadow-xs hover:shadow-md ${
                  isOpen ? 'border-gold/60 ring-1 ring-gold/30' : 'border-slate-200'
                }`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                  className="w-full p-2 md:p-5 text-left font-bold text-navy-dark flex items-center justify-between gap-4 text-xs sm:text-base hover:text-gold transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <span>{faq.q}</span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-gold shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-2 md:px-5 pb-5 pl-5 md:pl-12 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-fadeIn">
                    <p>{faq.a}</p>
                    <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-bold text-gold bg-amber-50 px-3 py-1 rounded-lg">
                      <CheckCircle2 className="w-3.5 h-3.5 text-gold" />
                      <span>Category: {faq.category}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center text-slate-400 text-xs">
              No matching FAQs found for "{searchQuery}". Try searching another keyword or contact us directly.
            </div>
          )}
        </div>

        {/* CTA Contact Box */}
        <div className="bg-gradient-to-r from-navy via-navy-dark to-navy text-white rounded-3xl p-5 sm:p-8 border border-gold/30 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-2">
            <span className="text-xs font-bold text-gold uppercase tracking-wider">STILL HAVE QUESTIONS?</span>
            <h3 className="text-xl sm:text-2xl font-bold font-heading">Need Personalized Assistance?</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg">
              Our real estate experts are available 7 days a week to answer your queries regarding land, legal check, or site visits.
            </p>
          </div>

          <div className="flex flex-row items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto">
            <a
              href="tel:+919917970750"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-white text-navy font-bold text-xs hover:bg-slate-100 transition-all shadow-md shrink-0 whitespace-nowrap"
            >
              <PhoneCall className="w-4 h-4 text-gold shrink-0" />
              <span className="hidden sm:inline">Call +91 9917970750</span>
              <span className="sm:hidden">Call Us</span>
            </a>

            <a
              href={getWhatsAppLink('', 'Hello Mahalaxmi Property, I have a question regarding property deals in Biharigarh.')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all shadow-md shrink-0 whitespace-nowrap"
            >
              <MessageSquare className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">Chat on WhatsApp</span>
              <span className="sm:hidden">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQPage;
