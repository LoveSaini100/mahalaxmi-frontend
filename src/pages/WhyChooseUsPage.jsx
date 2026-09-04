import React from 'react';
import SEO from '../components/common/SEO';
import { ShieldCheck, FileCheck, Award, MapPin, Users, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const WhyChooseUsPage = () => {
  const cards = [
    { title: '1. Trusted Guidance', desc: 'Expert real estate advice tailored to your financial goals and family aspirations.', icon: ShieldCheck },
    { title: '2. Verified Properties', desc: 'Detailed title verification and legal clarity for peace of mind.', icon: FileCheck },
    { title: '3. Transparent Transactions', desc: 'Zero hidden clauses or surprise costs throughout your deal.', icon: Award },
    { title: '4. Local Market Expertise', desc: 'Specialized focus on Biharigarh, Saharanpur, and Highway corridors.', icon: MapPin },
    { title: '5. Personalized Assistance', desc: 'Dedicated consultations matching your exact property criteria.', icon: Users },
    { title: '6. End-to-End Support', desc: 'From site visits to documentation and final registry assistance.', icon: TrendingUp },
  ];

  return (
    <>
      <SEO
        title="Why Choose Mahalaxmi Property in Biharigarh | UP"
        description="Learn why buyers trust Mahalaxmi Property near Pencho Restaurant on Dehradun-Saharanpur Highway, Biharigarh, Saharanpur for clear title land deals."
        keywords="Trusted property dealer Biharigarh, Verified title plots Saharanpur, Direct owner land deals, Zero brokerage real estate Saharanpur"
      />

      <div className="bg-navy-dark text-white pt-32 pb-14 border-b border-gold/30">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-xs font-bold text-gold uppercase tracking-widest block mb-2">OUR ADVANTAGE</span>
          <h1 className="text-4xl font-bold font-heading">Why Choose Mahalaxmi Property</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mt-2">
            6 core pillars that make Mahalaxmi Property the premier real estate choice.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <h3 className="text-xl font-bold font-heading text-navy-dark">Zero Hidden Costs & Direct Owner Consultations</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We operate with 100% price transparency and clear deal terms with zero hidden broker surprises.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <h3 className="text-xl font-bold font-heading text-navy-dark">End-to-End Property Registry & Loan Clearance</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              From site tours and agreement drafting to sub-registrar deed execution and bank home loan approval.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
          {cards.map((c, idx) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 rounded-3xl bg-white border border-slate-200 shadow-lg space-y-4 hover:border-gold transition-colors"
              >
                <div className="w-12 h-12 rounded-2xl bg-navy text-gold flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold font-heading text-navy-dark">{c.title}</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{c.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default WhyChooseUsPage;
