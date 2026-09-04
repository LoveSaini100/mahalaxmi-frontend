import React from 'react';
import SEO from '../components/common/SEO';
import { ShieldCheck, Lock, Eye, FileText, UserCheck, CheckCircle2 } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="font-sans">
      <SEO
        title="Privacy Policy | Mahalaxmi Property in Biharigarh"
        description="Read Privacy Policy of Mahalaxmi Property near Pencho Restaurant on Dehradun-Saharanpur Highway, Biharigarh, Saharanpur, UP 247662. Contact us today."
        keywords="Privacy policy Mahalaxmi Property, Real estate client data safety, Biharigarh property privacy terms"
      />

      {/* Header Banner */}
      <div className="bg-navy-dark text-white pt-32 pb-14 border-b border-gold/30">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-2">
          <span className="text-xs font-bold text-gold uppercase tracking-widest block font-sans">LEGAL STATEMENT</span>
          <h1 className="text-3xl sm:text-4xl font-bold font-sans">Privacy Policy</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mt-1 font-sans">
            Last Updated: August 21, 2026 | Effective Date: January 1, 2026
          </p>
        </div>
      </div>

      {/* Privacy Policy Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-slate-700 text-xs sm:text-sm leading-relaxed space-y-8 font-sans">

        {/* Intro Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-gold shrink-0" />
            <h3 className="text-base sm:text-lg font-bold font-sans text-navy-dark">1. Introduction & Overview</h3>
          </div>
          <p>
            At <strong>Mahalaxmi Property</strong> ("we," "our," or "us"), maintaining the trust and privacy of our clients, property buyers, sellers, and website visitors is our highest priority. This Privacy Policy outlines how we collect, use, process, and protect your personal information when you access our website, submit property enquiries, schedule site visits, or engage in real estate transactions across Biharigarh, Saharanpur, and the Dehradun highway corridor.
          </p>
          <p>
            By using our website or submitting your contact details to Mahalaxmi Property, you consent to the data practices described in this policy. If you do not agree with any terms outlined herein, please refrain from providing personal details or using our online services.
          </p>
        </div>

        {/* Section 2: Information We Collect */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <UserCheck className="w-6 h-6 text-gold shrink-0" />
            <h3 className="text-base sm:text-lg font-bold font-sans text-navy-dark">2. Information We Collect</h3>
          </div>
          <p>
            We collect personal information necessary to deliver transparent real estate advisory, schedule guided property visits, and execute property transactions efficiently:
          </p>
          <ul className="space-y-2.5 pl-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
              <span><strong>Personal Identity Data:</strong> Full Name, Phone Number, WhatsApp Contact Number, Email Address, and Mailing Address when you submit an enquiry form or callback request.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
              <span><strong>Property Requirements & Preferences:</strong> Desired property type (Villas, Commercial Land, Residential Plots, Agricultural Land), budget range, preferred location along the highway, and financing status.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
              <span><strong>Transactional & Legal Information:</strong> Identification documents (Aadhaar Card, PAN Card, passport-sized photographs) required solely for drafting Sale Agreements (Bayana) and executing sub-registrar property deeds.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
              <span><strong>Technical & Usage Data:</strong> IP address, device type, browser information, referral source, and page visit duration gathered via standard analytics tools to optimize website usability.</span>
            </li>
          </ul>
        </div>

        {/* Section 3: How We Use Your Information */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <Eye className="w-6 h-6 text-gold shrink-0" />
            <h4 className="text-base sm:text-lg font-bold font-sans text-navy-dark">3. How We Use Your Information</h4>
          </div>
          <p>
            The personal information collected by Mahalaxmi Property is strictly used for legitimate business operations and client support, including:
          </p>
          <ul className="space-y-2 pl-2">
            <li className="flex items-start gap-2">
              <span className="text-gold font-bold">•</span>
              <span>Responding to your property enquiries, callback requests, and WhatsApp messages in a timely manner.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gold font-bold">•</span>
              <span>Scheduling and coordinating guided physical site visits to plots, houses, and commercial listings.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gold font-bold">•</span>
              <span>Assisting with bank home loan documentation and title verification clearance upon your explicit request.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gold font-bold">•</span>
              <span>Sending curated property alerts, price updates, and newly available listings tailored to your specific budget and preferences.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gold font-bold">•</span>
              <span>Ensuring compliance with local land registry laws and real estate regulation requirements in Uttar Pradesh.</span>
            </li>
          </ul>
        </div>

        {/* Section 4: Confidentiality & Data Protection */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <Lock className="w-6 h-6 text-gold shrink-0" />
            <h4 className="text-base sm:text-lg font-bold font-sans text-navy-dark">4. Data Confidentiality & Zero Third-Party Selling</h4>
          </div>
          <p>
            Mahalaxmi Property strictly adheres to zero-tolerance policy against selling, renting, or trading client information to third-party telemarketers, advertising networks, or external agencies.
          </p>
          <p>
            Your information is shared only with authorized staff, internal legal advisers, and (where requested by you) verified banking loan officers solely for the purpose of fulfilling your real estate transaction.
          </p>
        </div>

        {/* Section 5: Data Security Measures */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-gold shrink-0" />
            <h4 className="text-base sm:text-lg font-bold font-sans text-navy-dark">5. Technical Security & Storage</h4>
          </div>
          <p>
            We implement administrative, technical, and physical security measures designed to safeguard your personal data from unauthorized access, alteration, disclosure, or destruction. Electronic enquiry records are stored on secure server infrastructure protected by encrypted connections and access restrictions.
          </p>
        </div>

        {/* Section 6: Client Rights & Contact */}
        <div className="bg-gradient-to-r from-navy via-navy-dark to-navy text-white p-6 rounded-2xl border border-gold/30 shadow-lg space-y-3 font-sans">
          <h4 className="text-base sm:text-lg font-bold font-sans text-gold">6. Your Rights & Privacy Inquiries</h4>
          <p className="text-xs sm:text-sm text-slate-200">
            You have the right to request access to the personal data we hold about you, request corrections to inaccurate contact information, or ask for the deletion of your enquiry records from our database.
          </p>
          <div className="pt-2 text-xs text-slate-300 space-y-1 font-sans">
            <p><strong>Official Contact Email:</strong> info@mahalaxmiproperty.com</p>
            <p><strong>Hotline / WhatsApp:</strong> +91 9917970750</p>
            <p><strong>Office Address:</strong> Near Pencho Restaurant, Dehradun–Saharanpur Highway, Biharigarh, Saharanpur, UP - 247662</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PrivacyPolicy;
