import React from 'react';
import SEO from '../components/common/SEO';
import { Scale, Building2, ShieldAlert, FileCheck, Landmark, CheckCircle2 } from 'lucide-react';

const TermsConditions = () => {
  return (
    <div className="font-sans">
      <SEO
        title="Terms & Conditions | Mahalaxmi Property Biharigarh"
        description="Read Terms & Conditions of Mahalaxmi Property near Pencho Restaurant on Dehradun-Saharanpur Highway, Biharigarh, Saharanpur, UP 247662. Contact us."
        keywords="Terms and conditions Mahalaxmi Property, Real estate agreement terms Biharigarh, Property service rules Saharanpur"
      />

      {/* Header Banner */}
      <div className="bg-navy-dark text-white pt-32 pb-14 border-b border-gold/30">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-2 font-sans">
          <span className="text-xs font-bold text-gold uppercase tracking-widest block font-sans">TERMS OF SERVICE</span>
          <h1 className="text-3xl sm:text-4xl font-bold font-sans">Terms & Conditions</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mt-1 font-sans">
            Last Updated: August 21, 2026 | Effective Date: January 1, 2026
          </p>
        </div>
      </div>

      {/* Terms & Conditions Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-slate-700 text-xs sm:text-sm leading-relaxed space-y-8 font-sans">

        {/* Section 1: Agreement to Terms */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <Scale className="w-6 h-6 text-gold shrink-0" />
            <h3 className="text-base sm:text-lg font-bold font-sans text-navy-dark">1. Acceptance of Terms</h3>
          </div>
          <p>
            Welcome to <strong>Mahalaxmi Property</strong>. These Terms & Conditions ("Terms") constitute a legally binding agreement between you ("User," "Client," or "Visitor") and Mahalaxmi Property governing your access to and use of our website, real estate consultation services, property listings, and site visit scheduling along the Dehradun–Saharanpur highway corridor.
          </p>
          <p>
            By browsing our website, submitting an enquiry, or engaging our consultancy services, you acknowledge that you have read, understood, and agreed to be bound by these Terms. If you do not agree with any portion of these Terms, please discontinue using our website and services immediately.
          </p>
        </div>

        {/* Section 2: Property Listings & Disclaimers */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <Building2 className="w-6 h-6 text-gold shrink-0" />
            <h3 className="text-base sm:text-lg font-bold font-sans text-navy-dark">2. Property Listings & Accuracy Disclaimer</h3>
          </div>
          <p>
            Mahalaxmi Property strives to ensure that all property details, prices, area measurements (expressed in Sq.Ft, Sq.Yards, Bigha, or Acres), amenities, and photographs published on this website are accurate and up to date. However:
          </p>
          <ul className="space-y-2.5 pl-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
              <span><strong>Informational Nature:</strong> All information published on the website is provided for general guidance and marketing purposes. It does not constitute a legal offer or binding contractual agreement until formalized through a written Agreement to Sell.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
              <span><strong>Price & Availability Updates:</strong> Property prices, status (Available, Reserved, Sold), and owner terms are subject to change without prior notice based on market negotiations and owner directives.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
              <span><strong>Physical Verification:</strong> Buyers are strongly advised to conduct physical site inspections and independent legal verification of land titles prior to executing advance payments or registry deeds.</span>
            </li>
          </ul>
        </div>

        {/* Section 3: Site Visits & Advisory Terms */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <FileCheck className="w-6 h-6 text-gold shrink-0" />
            <h4 className="text-base sm:text-lg font-bold font-sans text-navy-dark">3. Site Visits & Advisory Services</h4>
          </div>
          <p>
            Mahalaxmi Property offers guided site visits to plots, residential houses, and commercial land listings. Site visits are arranged free of cost as a courtesy service. Visitors must follow safety guidelines during field inspections of undeveloped or under-construction land plots.
          </p>
          <p>
            Our real estate advisory team assists clients with legal due diligence, title checking, and bank loan clearance. Final purchasing decisions remain the sole responsibility of the buyer.
          </p>
        </div>

        {/* Section 4: Booking, Token & Financial Terms */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <Landmark className="w-6 h-6 text-gold shrink-0" />
            <h4 className="text-base sm:text-lg font-bold font-sans text-navy-dark">4. Financial Terms, Token (Bayana) & Registry</h4>
          </div>
          <ul className="space-y-2 pl-2">
            <li className="flex items-start gap-2">
              <span className="text-gold font-bold">•</span>
              <span><strong>Token Amount (Bayana):</strong> Property bookings are formalized upon payment of a mutually agreed token/advance payment accompanied by a written Agreement to Sell signed by both buyer and seller.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gold font-bold">•</span>
              <span><strong>Stamp Duty & Registration Charges:</strong> Government stamp duty fees, sub-registrar fees, legal documentation expenses, and municipal taxes are payable by the purchaser as per Uttar Pradesh state laws.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gold font-bold">•</span>
              <span><strong>Zero Hidden Costs:</strong> Mahalaxmi Property operates with 100% price transparency. All consultancy terms and transaction fees are agreed upon upfront.</span>
            </li>
          </ul>
        </div>

        {/* Section 5: Intellectual Property */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-6 h-6 text-gold shrink-0" />
            <h4 className="text-base sm:text-lg font-bold font-sans text-navy-dark">5. Intellectual Property & Website Use</h4>
          </div>
          <p>
            All content on this website—including logos, text, software, layout design, images, and property descriptions—is the exclusive intellectual property of Mahalaxmi Property. Users are strictly prohibited from copying, scraping, reproducing, or commercially exploiting any material without prior written consent.
          </p>
        </div>

        {/* Section 6: Jurisdiction & Contact */}
        <div className="bg-gradient-to-r from-navy via-navy-dark to-navy text-white p-6 rounded-2xl border border-gold/30 shadow-lg space-y-3 font-sans">
          <h4 className="text-base sm:text-lg font-bold font-sans text-gold">6. Governing Law & Contact Information</h4>
          <p className="text-xs sm:text-sm text-slate-200">
            These Terms & Conditions are governed by and construed in accordance with the laws of India. Any legal disputes arising out of or in connection with these Terms or our services shall be subject to the exclusive jurisdiction of the courts of <strong>Saharanpur, Uttar Pradesh, India</strong>.
          </p>
          <div className="pt-2 text-xs text-slate-300 space-y-1 border-t border-white/10 mt-3 font-sans">
            <p><strong>Hotline / WhatsApp:</strong> +91 9917970750</p>
            <p><strong>Email:</strong> info@mahalaxmiproperty.com</p>
            <p><strong>Address:</strong> Near Pencho Restaurant, Dehradun–Saharanpur Highway, Biharigarh, Saharanpur, UP - 247662</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TermsConditions;
