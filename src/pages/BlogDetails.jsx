import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import SEO from '../components/common/SEO';
import { blogPosts } from '../data/blogData';
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Share2,
  PhoneCall,
  MessageSquare,
  CheckCircle2,
  ChevronRight,
  BookOpen,
} from 'lucide-react';
import WhatsAppIcon from '../components/common/WhatsAppIcon';

const BlogDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const post = blogPosts.find((b) => b.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-brand-offwhite px-4 text-center space-y-4 pt-32">
        <BookOpen className="w-16 h-16 text-slate-300" />
        <h1 className="text-2xl font-bold font-heading text-navy-dark">Article Not Found</h1>
        <p className="text-xs text-slate-500 max-w-md">
          The real estate guide or article you are looking for might have been moved or renamed.
        </p>
        <Link
          to="/blogs"
          className="px-5 py-2.5 bg-navy text-gold text-xs font-bold rounded-xl hover:bg-navy-light transition-all"
        >
          Return to All Blogs
        </Link>
      </div>
    );
  }

  const relatedPosts = blogPosts.filter((b) => b.slug !== slug).slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.subtitle,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Article link copied to clipboard!');
    }
  };

  return (
    <>
      <SEO
        title={`${post.title} | Mahalaxmi Property`}
        description={post.metaDescription}
        keywords={post.keywords.join(', ')}
      />

      {/* Header Space */}
      <div className="bg-navy-dark pt-32 pb-12 text-white relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <Link to="/" className="hover:text-gold">Home</Link>
            <ChevronRight className="w-3 h-3 text-gold" />
            <Link to="/blogs" className="hover:text-gold">Blogs</Link>
            <ChevronRight className="w-3 h-3 text-gold" />
            <span className="text-gold font-semibold truncate">{post.category}</span>
          </div>

          <div className="inline-block bg-gold/20 text-gold text-xs font-bold px-3 py-1 rounded-full border border-gold/40">
            {post.category}
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold font-heading text-white leading-tight">
            {post.title}
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-body">
            {post.subtitle}
          </p>

          {/* Meta Info Bar */}
          <div className="pt-4 border-t border-navy-light flex flex-wrap items-center justify-between gap-4 text-xs text-slate-300">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gold/20 text-gold-dark font-bold flex items-center justify-center text-sm border border-gold/30">
                {post.author.charAt(0)}
              </div>
              <div>
                <div className="font-bold text-white text-xs sm:text-sm">{post.author}</div>
                <div className="text-[10px] text-slate-400">{post.authorRole}</div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-gold" />
                {post.publishDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-gold" />
                {post.readTime}
              </span>
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-navy hover:bg-navy-light text-gold text-xs font-bold border border-gold/30 cursor-pointer transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-12">
        {/* Cover Image */}
        <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200 aspect-[16/9]">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Excerpt Summary Box */}
        <div className="bg-gold/10 border-l-4 border-gold p-6 rounded-r-2xl space-y-2">
          <h3 className="text-xs font-bold text-navy-dark uppercase tracking-wider">Key Executive Summary</h3>
          <p className="text-xs sm:text-sm text-slate-700 font-medium italic leading-relaxed">
            "{post.excerpt}"
          </p>
        </div>

        {/* Article Body Sections (H2 + Paragraphs) */}
        <article className="space-y-10 text-slate-700 font-body text-justify text-xs sm:text-base leading-relaxed">
          {post.sections.map((sec, idx) => (
            <section key={idx} className="space-y-4">
              <h2 className="text-lg sm:text-2xl font-bold font-heading text-navy-dark border-b border-slate-200 pb-2">
                {sec.heading}
              </h2>
              {sec.content.split('\n\n').map((paragraph, pIdx) => (
                <p key={pIdx} className="leading-relaxed text-slate-700 whitespace-pre-line">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </article>

        {/* Author Bio Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-navy text-gold font-bold text-xl flex items-center justify-center shrink-0 border border-gold/30">
            {post.author.charAt(0)}
          </div>
          <div className="space-y-1">
            <div className="text-xs font-bold text-gold uppercase tracking-wider">Written By</div>
            <h4 className="text-base font-bold font-heading text-navy-dark">{post.author}</h4>
            <p className="text-xs text-slate-500">{post.authorRole} at Mahalaxmi Property, Biharigarh.</p>
            <p className="text-xs text-slate-600 pt-2">
              Specializing in clear-title property advisory, land valuation, and commercial development along the Dehradun-Saharanpur Highway corridor.
            </p>
          </div>
        </div>

        {/* Direct Consultation Contact Box */}
        <div className="bg-navy-dark text-white rounded-3xl p-6 sm:p-10 border border-gold/40 shadow-2xl space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-gold uppercase tracking-widest block">EXPERT SITE ADVISORY</span>
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
              Interested in Property or Plots in Biharigarh?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Talk directly with Mr. Ishwar Singh Rathour & Mr. Amrit Singh for verified plot listings, price analysis, and legal document verification.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="tel:+919917970750"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-gold via-gold-accent to-gold-dark text-navy-dark font-bold text-xs sm:text-sm shadow-gold hover:shadow-glow transition-all"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call +91 9917970750</span>
            </a>

            <a
              href="https://wa.me/919917970750?text=Hello%20Mahalaxmi%20Property,%20I%20read%20your%20blog%20article%20and%20want%20to%20inquire%20about%20land%20in%20Biharigarh."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
            >
              <WhatsAppIcon className="w-4 h-4 fill-current" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>

        {/* Related Articles Section */}
        <div className="space-y-6 pt-6 border-t border-slate-200">
          <h3 className="text-xl font-bold font-heading text-navy-dark">Related Real Estate Guides</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((rel) => (
              <div
                key={rel.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-all group"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={rel.coverImage}
                    alt={rel.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 bg-navy-dark/90 text-gold text-[9px] font-bold px-2 py-0.5 rounded-full">
                    {rel.category}
                  </div>
                </div>
                <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                  <h4 className="text-xs font-bold text-navy-dark group-hover:text-gold transition-colors line-clamp-2">
                    <Link to={`/blogs/${rel.slug}`}>{rel.title}</Link>
                  </h4>
                  <Link
                    to={`/blogs/${rel.slug}`}
                    className="text-[11px] font-bold text-navy inline-flex items-center gap-1 hover:text-gold pt-2"
                  >
                    <span>Read Guide</span>
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Back Link */}
        <div className="pt-4 text-center">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-navy"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Blogs</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default BlogDetails;
