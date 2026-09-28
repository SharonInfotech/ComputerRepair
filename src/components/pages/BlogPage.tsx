import React, { useState, useEffect, useMemo } from 'react';
import { FAQAccordion } from '../FAQAccordion';
import {
  BookOpen,
  ChevronRight,
  Clock,
  User,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Laptop,
  Search,
  Wrench,
  Cpu,
  Newspaper,
  Tag,
  CheckCircle2,
  PhoneCall,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  MapPin,
  Filter,
  Layers,
  Phone
} from 'lucide-react';
import {
  GENERATED_BLOG_POSTS,
  getOrCreateBlogPost,
  ACTION_TITLES,
  COMPONENT_CATEGORIES,
  PHONE_NUMBER,
  GeneratedBlogPost,
  BlogCategory
} from '../../data/blogEngine';
import { ALL_NAGPUR_LOCATIONS } from '../../data/nagpurLocations';

interface BlogPageProps {
  initialSubPage?: string;
  onNavigateHome: () => void;
  onOpenBooking: (mode?: 'doorstep' | 'instore', prefill?: string) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({
  initialSubPage = '',
  onNavigateHome,
  onOpenBooking
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | BlogCategory>('All');
  const [selectedAction, setSelectedAction] = useState<string>('All');
  const [selectedComponent, setSelectedComponent] = useState<string>('All');
  const [selectedLocality, setSelectedLocality] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const [activeBlogId, setActiveBlogId] = useState<string>('how-to-replace-ssd-in-besa-in-nagpur');
  const [currentPageNum, setCurrentPageNum] = useState<number>(1);
  const postsPerPage = 15;

  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);

  // Handle initialSubPage parameter for routing
  useEffect(() => {
    if (initialSubPage) {
      const parsed = getOrCreateBlogPost(initialSubPage);
      if (parsed) {
        setActiveBlogId(parsed.id);
        if (parsed.actionKeyword) setSelectedAction(parsed.actionKeyword);
        if (parsed.componentKeyword) setSelectedComponent(parsed.componentKeyword);
      } else {
        // Match category
        const catMap: Record<string, BlogCategory> = {
          'hardware-tips-replacement': 'Hardware Tips replacement',
          'software-fixes': 'Software Fixes',
          'technology-news': 'Technology News'
        };
        if (catMap[initialSubPage.toLowerCase()]) {
          setSelectedCategory(catMap[initialSubPage.toLowerCase()]);
        }
      }
    }
  }, [initialSubPage]);

  // Filtered post list calculation
  const filteredPosts = useMemo(() => {
    return GENERATED_BLOG_POSTS.filter((post) => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesAction = selectedAction === 'All' || post.actionKeyword === selectedAction;
      const matchesComponent = selectedComponent === 'All' || post.componentKeyword === selectedComponent;
      const matchesLocality = selectedLocality === 'All' || post.locality.toLowerCase() === selectedLocality.toLowerCase();

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q ||
        post.title.toLowerCase().includes(q) ||
        post.summary.toLowerCase().includes(q) ||
        post.locality.toLowerCase().includes(q) ||
        post.componentKeyword.toLowerCase().includes(q) ||
        post.actionKeyword.toLowerCase().includes(q);

      return matchesCategory && matchesAction && matchesComponent && matchesLocality && matchesSearch;
    });
  }, [selectedCategory, selectedAction, selectedComponent, selectedLocality, searchQuery]);

  // Reset page number on filter change
  useEffect(() => {
    setCurrentPageNum(1);
  }, [selectedCategory, selectedAction, selectedComponent, selectedLocality, searchQuery]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage) || 1;
  const currentPaginatedPosts = useMemo(() => {
    const startIndex = (currentPageNum - 1) * postsPerPage;
    return filteredPosts.slice(startIndex, startIndex + postsPerPage);
  }, [filteredPosts, currentPageNum, postsPerPage]);

  // Active Post lookup or on-demand generation
  const activePost: GeneratedBlogPost = useMemo(() => {
    const found = GENERATED_BLOG_POSTS.find((b) => b.id === activeBlogId);
    if (found) return found;
    const dynamicallyCreated = getOrCreateBlogPost(activeBlogId);
    if (dynamicallyCreated) return dynamicallyCreated;
    return GENERATED_BLOG_POSTS[0];
  }, [activeBlogId]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Breadcrumb Header */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
          <button onClick={onNavigateHome} className="hover:text-amber-400 transition flex items-center gap-1">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-slate-200 font-bold">1000+ Nagpur Computer Repair Blogs</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-amber-400 font-extrabold">{activePost.locality}</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-slate-300 truncate max-w-xs">{activePost.title}</span>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-950 p-6 sm:p-8 rounded-3xl border border-amber-800/40 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-4xl space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                1,000+ Nagpur Local Tech Guides
              </span>
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 transition"
              >
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                Call Helpline: {PHONE_NUMBER}
              </a>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              Nagpur Computer, Laptop & Component Repair Guides (1000+ Articles)
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Explore step-by-step guides on <strong className="text-amber-300">how to replace, repair, install, and fix</strong> hardware like SSD, HDD, RAM, motherboard, battery, CMOS, screen, keyboard, speaker, and charging sockets across all localities in Nagpur. Need immediate home technician support? Call <strong className="text-emerald-400 font-mono text-sm">7249430043</strong>.
            </p>
          </div>
        </div>

        {/* 1000+ BLOG FILTERING & SEARCH CONTROLS */}
        <div className="bg-slate-900 p-5 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xs font-black uppercase text-amber-400 tracking-wider flex items-center gap-2">
                <Filter className="w-4 h-4 text-amber-400" />
                Filter 1000+ Nagpur Tech Guides
              </h2>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Select title action keywords, hardware components, or Nagpur locality to filter indexed guides.
              </p>
            </div>

            {/* Keyword Search Input */}
            <div className="relative w-full lg:w-80">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search guide (e.g. replace ssd in Besa)..."
                className="w-full bg-slate-950 text-white text-xs px-3.5 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-amber-500 placeholder-slate-500"
              />
              <Search className="w-4 h-4 text-slate-500 absolute right-3 top-3" />
            </div>
          </div>

          {/* Grid of Dropdown & Button Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            
            {/* Title Line / Action Filter */}
            <div className="space-y-1">
              <label htmlFor="blog-filter-action" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                1. Title Action Line
              </label>
              <select
                id="blog-filter-action"
                value={selectedAction}
                onChange={(e) => setSelectedAction(e.target.value)}
                className="w-full bg-slate-950 text-amber-300 font-bold p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-amber-500 min-h-[44px]"
              >
                <option value="All">All Actions (Replace, Repair, Install, Fix)</option>
                {ACTION_TITLES.map((act) => (
                  <option key={act} value={act}>
                    {act}...
                  </option>
                ))}
              </select>
            </div>

            {/* Category / Component Filter */}
            <div className="space-y-1">
              <label htmlFor="blog-filter-component" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                2. Component Keyword
              </label>
              <select
                id="blog-filter-component"
                value={selectedComponent}
                onChange={(e) => setSelectedComponent(e.target.value)}
                className="w-full bg-slate-950 text-emerald-300 font-bold p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500 min-h-[44px]"
              >
                <option value="All">All Components (SSD, RAM, Battery, Screen...)</option>
                {COMPONENT_CATEGORIES.map((comp) => (
                  <option key={comp} value={comp}>
                    {comp}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Type Filter */}
            <div className="space-y-1">
              <label htmlFor="blog-filter-category" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                3. Blog Category
              </label>
              <select
                id="blog-filter-category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as any)}
                className="w-full bg-slate-950 text-sky-300 font-bold p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-sky-500 min-h-[44px]"
              >
                <option value="All">All Blog Categories</option>
                <option value="Hardware Tips replacement">Hardware Tips replacement</option>
                <option value="Software Fixes">Software Fixes</option>
                <option value="Technology News">Technology News</option>
              </select>
            </div>

            {/* Locality Filter */}
            <div className="space-y-1">
              <label htmlFor="blog-filter-locality" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                4. Nagpur Locality
              </label>
              <select
                id="blog-filter-locality"
                value={selectedLocality}
                onChange={(e) => setSelectedLocality(e.target.value)}
                className="w-full bg-slate-950 text-amber-200 font-bold p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-amber-500 min-h-[44px]"
              >
                <option value="All">All 220+ Nagpur Localities</option>
                {ALL_NAGPUR_LOCATIONS.map((loc) => (
                  <option key={loc.id} value={loc.name}>
                    {loc.name} ({loc.pincode})
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Quick Filter Reset Bar */}
          <div className="flex items-center justify-between pt-1 text-xs">
            <span className="text-[11px] text-slate-400 font-medium">
              Found <strong className="text-amber-400 font-mono">{filteredPosts.length}</strong> matching Nagpur blog guides
            </span>
            {(selectedAction !== 'All' || selectedComponent !== 'All' || selectedCategory !== 'All' || selectedLocality !== 'All' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedAction('All');
                  setSelectedComponent('All');
                  setSelectedCategory('All');
                  setSelectedLocality('All');
                  setSearchQuery('');
                }}
                className="text-[11px] font-extrabold text-amber-400 hover:underline"
              >
                Reset All Filters
              </button>
            )}
          </div>
        </div>

        {/* MAIN LAYOUT: ACTIVE BLOG POST + SIDEBAR LIST */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* MAIN ARTICLE CONTENT */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
              
              {/* Header Info */}
              <div className="space-y-3 border-b border-slate-800 pb-5">
                <div className="flex items-center gap-3 text-xs font-bold flex-wrap">
                  <span className="bg-amber-950 px-3 py-1 rounded-lg border border-amber-800 text-amber-300 flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    {activePost.category}
                  </span>
                  <span className="bg-slate-950 px-3 py-1 rounded-lg border border-slate-800 text-emerald-400 flex items-center gap-1 font-mono">
                    <MapPin className="w-3 h-3 text-emerald-400" />
                    {activePost.locality}, Nagpur
                  </span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <Clock className="w-3.5 h-3.5" /> {activePost.readTime}
                  </span>
                </div>

                <h2 className="text-xl sm:text-3xl font-black text-white leading-tight">
                  {activePost.title}
                </h2>

                <p className="text-xs text-slate-400 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-blue-400" /> By {activePost.author}
                </p>
              </div>

              {/* Summary */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-2">
                <span className="text-[10px] uppercase font-black tracking-wider text-amber-400 block">
                  Guide Summary in Nagpur:
                </span>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                  {activePost.summary}
                </p>
              </div>

              {/* PROMINENT CALL TO ACTION (CTA) WITH PHONE 7249430043 */}
              <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-emerald-950 p-6 rounded-2xl border-2 border-amber-500/60 shadow-2xl space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="inline-block px-2.5 py-0.5 rounded bg-emerald-500 text-slate-950 font-black text-[10px] uppercase tracking-wider">
                      Doorstep Tech CTA in Nagpur
                    </span>
                    <h3 className="text-lg font-black text-white">
                      Need Technician for {activePost.title}?
                    </h3>
                    <p className="text-xs text-slate-300">
                      Our Sharon Infotech certified engineer reaches your location in <strong className="text-amber-300">{activePost.locality}, Nagpur</strong> within 30 minutes!
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto shrink-0">
                    <a
                      href={`tel:${PHONE_NUMBER}`}
                      className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 transition"
                    >
                      <PhoneCall className="w-4 h-4" />
                      <span>Call {PHONE_NUMBER}</span>
                    </a>

                    <a
                      href={`https://wa.me/917249430043?text=Hi%20Sharon%20Infotech,%20I%20need%20doorstep%20help%20for%20${encodeURIComponent(activePost.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-emerald-500/40 transition"
                    >
                      <MessageSquare className="w-4 h-4 text-emerald-400" />
                      <span>WhatsApp {PHONE_NUMBER}</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Step-by-Step Instructions */}
              <div className="space-y-4">
                <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Step-by-Step Technical Instructions:
                </h3>
                
                <div className="space-y-3">
                  {activePost.steps.map((st) => (
                    <div key={st.stepNum} className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-1.5 hover:border-amber-800/60 transition">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center shrink-0 shadow">
                          {st.stepNum}
                        </span>
                        <h4 className="font-extrabold text-sm text-white">{st.heading}</h4>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed pl-8">
                        {st.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pro Tip Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/80 via-slate-900 to-emerald-950/80 border border-amber-800/60 text-xs text-amber-200 space-y-2">
                <span className="font-extrabold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Sharon Infotech Nagpur Pro Tip:
                </span>
                <p className="leading-relaxed text-slate-200">{activePost.proTip}</p>
              </div>

              {/* FAQ SECTION REQUIREMENT */}
              <FAQAccordion
                title={`Frequently Asked Questions (${activePost.locality}, Nagpur)`}
                subtitle={`Dynamic FAQs for: ${activePost.title}`}
                faqs={activePost.faqs}
                phone={PHONE_NUMBER}
                ctaTitle={`Need Technician for ${activePost.title}?`}
                ctaSubtitle={`Our Sharon Infotech certified engineer reaches your location in ${activePost.locality}, Nagpur within 30 minutes!`}
                onBookClick={() => onOpenBooking('doorstep', `Doorstep repair request for guide: ${activePost.title}`)}
              />

              {/* Bottom Booking Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => onOpenBooking('doorstep', `Doorstep repair request for guide: ${activePost.title}`)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-xl transition flex items-center justify-center gap-2"
                >
                  <Laptop className="w-4 h-4" />
                  <span>Book Doorstep Repair in {activePost.locality}</span>
                </button>

                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Call {PHONE_NUMBER}</span>
                </a>
              </div>

            </div>
          </div>

          {/* RIGHT SIDEBAR - 1000+ ARTICLES LIST WITH PAGINATION */}
          <div className="space-y-6">
            
            {/* Quick Phone CTA Banner in Sidebar */}
            <div className="bg-gradient-to-br from-slate-900 via-amber-950/80 to-slate-950 p-5 rounded-3xl border border-amber-800/60 space-y-3 shadow-xl text-xs">
              <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider block">
                Nagpur Home Repair Hotline
              </span>
              <h4 className="text-base font-black text-white">
                Call {PHONE_NUMBER}
              </h4>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Facing computer issues in Nagpur? Speak directly with our senior technician in Dhantoli, Nagpur for free advice or 30-minute doorstep booking.
              </p>
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black uppercase text-[11px] tracking-wider transition flex items-center justify-center gap-2 shadow"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call {PHONE_NUMBER} Now</span>
              </a>
            </div>

            {/* Paginated Blog Posts Navigation List */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-xs font-black uppercase text-amber-400 tracking-wider flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-amber-400" />
                  Articles Index ({filteredPosts.length})
                </h3>
                <span className="text-[10px] font-mono text-slate-400">
                  Page {currentPageNum} of {totalPages}
                </span>
              </div>

              {/* Scrollable List */}
              <div className="space-y-2 max-h-[550px] overflow-y-auto pr-1 scrollbar-thin">
                {currentPaginatedPosts.map((post) => {
                  const isCur = post.id === activeBlogId;
                  return (
                    <button
                      key={post.id}
                      onClick={() => {
                        setActiveBlogId(post.id);
                        setExpandedFaqIndex(0);
                      }}
                      className={`w-full text-left p-3 rounded-2xl text-xs transition flex flex-col gap-1 border ${
                        isCur
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/80 shadow ring-1 ring-amber-500/50'
                          : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border-slate-800/90'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-mono text-amber-400 uppercase">{post.locality}</span>
                        <span className="text-slate-500">{post.readTime}</span>
                      </div>
                      <span className="font-bold line-clamp-2 text-slate-200 text-[11px] leading-snug">
                        {post.title}
                      </span>
                    </button>
                  );
                })}

                {filteredPosts.length === 0 && (
                  <p className="text-xs text-slate-500 py-6 text-center">
                    No matching articles found. Try changing filters or resetting search.
                  </p>
                )}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2 text-xs">
                  <button
                    disabled={currentPageNum === 1}
                    onClick={() => setCurrentPageNum((prev) => Math.max(1, prev - 1))}
                    className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:bg-slate-800 disabled:opacity-40 text-slate-300 font-bold"
                  >
                    Prev
                  </button>

                  <span className="text-[10px] font-mono text-slate-400">
                    {currentPageNum} / {totalPages}
                  </span>

                  <button
                    disabled={currentPageNum === totalPages}
                    onClick={() => setCurrentPageNum((prev) => Math.min(totalPages, prev + 1))}
                    className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:bg-slate-800 disabled:opacity-40 text-slate-300 font-bold"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
