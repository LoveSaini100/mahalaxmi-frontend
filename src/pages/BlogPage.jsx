import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';
import { blogPosts } from '../data/blogData';
import { Search, Calendar, Clock, User, ArrowRight, BookOpen, Tag, ChevronDown, Filter, X } from 'lucide-react';

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(blogPosts.map((post) => post.category))];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.keywords.some((kw) => kw.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <SEO
        title="Real Estate Blogs & Market Insights | Mahalaxmi Property Biharigarh"
        description="Read expert real estate blogs, land investment guides, legal documentation tips, and highway property appreciation insights for Biharigarh and Saharanpur."
        keywords="Biharigarh real estate blogs, Saharanpur land guides, Dehradun Highway property news, UP land registry verification"
      />

      {/* Header Banner */}
      <div className="bg-navy-dark text-white pt-32 pb-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <span className="text-xs font-bold text-gold uppercase tracking-widest block mb-2">LOCAL KNOWLEDGE & ADVISORY</span>
          <h1 className="text-4xl font-bold font-heading">Real Estate Articles & Guides</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mt-2">
            In-depth guides on land buying, highway property trends, legal documentation, and investment returns in Biharigarh & Saharanpur.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Integrated Search & Category Filter Bar */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-md">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Integrated Search Input + Category Dropdown Box */}
            <div className="flex flex-col sm:flex-row items-stretch gap-2.5 flex-1 max-w-3xl">
              {/* Search Text Input */}
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search blogs by title, keywords, or location..."
                  className="w-full pl-10 pr-8 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-navy-dark placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-gold/50 shadow-inner"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-3.5 text-slate-400 hover:text-navy transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Integrated Category Dropdown Select */}
              <div className="relative min-w-[200px]">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full appearance-none bg-slate-50 hover:bg-slate-100 border border-slate-200 text-navy-dark font-bold text-xs sm:text-sm py-3 pl-4 pr-9 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 cursor-pointer shadow-sm transition-all"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat === 'All' ? 'All Categories' : cat}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
              </div>
            </div>

            {/* Total Count & Active Filter Chip */}
            <div className="flex items-center justify-between sm:justify-end gap-3 text-xs font-semibold text-slate-500 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
              <div>
                Showing <span className="text-navy font-bold">{filteredPosts.length}</span> of {blogPosts.length} Articles
              </div>
              {(selectedCategory !== 'All' || searchTerm) && (
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchTerm('');
                  }}
                  className="px-3 py-1 rounded-full bg-red-50 text-red-600 border border-red-200 text-[11px] font-bold flex items-center gap-1 hover:bg-red-100 transition-all"
                >
                  <span>Reset Filters</span>
                  <X className="w-3 h-3 text-red-600" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-navy-dark/90 text-gold text-[10px] font-bold px-3 py-1 rounded-full border border-gold/30 backdrop-blur-md">
                  {post.category}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  {/* Meta Details */}
                  <div className="flex items-center gap-4 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-gold" />
                      {post.publishDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-gold" />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-base sm:text-lg font-bold font-heading text-navy-dark group-hover:text-gold transition-colors line-clamp-2 leading-snug">
                    <Link to={`/blogs/${post.slug}`}>{post.title}</Link>
                  </h2>

                  {/* Excerpt */}
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                {/* Footer / Read Link */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gold/20 text-gold-dark flex items-center justify-center text-xs font-bold">
                      {post.author.charAt(0)}
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-navy-dark">{post.author}</div>
                      <div className="text-[9px] text-slate-400">{post.authorRole}</div>
                    </div>
                  </div>

                  <Link
                    to={`/blogs/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-navy hover:text-gold transition-colors"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="bg-white p-12 rounded-2xl text-center border border-slate-200 space-y-3">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-navy-dark">No Articles Found</h3>
            <p className="text-xs text-slate-500">
              Try adjusting your search terms or filter selection.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="px-4 py-2 bg-navy text-white text-xs font-bold rounded-xl hover:bg-navy-light"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-navy-dark via-navy to-navy-dark text-white rounded-3xl p-8 sm:p-12 border border-gold/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-bold font-heading text-gold">Need Expert Real Estate Guidance in Biharigarh?</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Get direct consultation from Mr. Ishwar Singh Rathour and Mr. Amrit Singh for clear-title land purchases and highway commercial plots.
            </p>
          </div>
          <Link
            to="/contact"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-gold via-gold-accent to-gold-dark text-navy-dark font-bold text-xs sm:text-sm shadow-gold hover:shadow-glow hover:scale-105 transition-all whitespace-nowrap"
          >
            Schedule Free Advisory
          </Link>
        </div>
      </div>
    </>
  );
};

export default BlogPage;
