import React, { useState, useMemo } from 'react';
import {
  X,
  Search,
  Download,
  Copy,
  Check,
  Globe,
  FileCode,
  CheckCircle2,
  ExternalLink,
  MapPin,
  Wrench,
  BookOpen,
  Filter,
  Layers
} from 'lucide-react';
import { getAllSitemapEntries, downloadSitemapFile, SitemapUrlEntry } from '../utils/sitemapGenerator';

interface SitemapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigatePage: (page: string, subPage?: string) => void;
}

export const SitemapModal: React.FC<SitemapModalProps> = ({
  isOpen,
  onClose,
  onNavigatePage
}) => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [copied, setCopied] = useState(false);

  const entries = useMemo(() => getAllSitemapEntries(), []);

  const filteredEntries = useMemo(() => {
    return entries.filter((entry) => {
      const matchCat = activeCategory === 'all' || entry.category === activeCategory;
      const matchSearch =
        search.trim() === '' ||
        entry.url.toLowerCase().includes(search.toLowerCase()) ||
        entry.title.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [entries, activeCategory, search]);

  if (!isOpen) return null;

  const handleCopyXml = () => {
    const xml = entries.map(e => `${e.url} (Priority: ${e.priority}, Freq: ${e.changefreq})`).join('\n');
    navigator.clipboard.writeText(xml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleUrlClick = (entry: SitemapUrlEntry) => {
    onClose();
    // Parse URL path to call onNavigatePage
    const path = entry.url.replace('https://computerrepairnagpur.com', '').replace(/^\/+|\/+$/g, '');
    if (!path) {
      onNavigatePage('home');
      return;
    }
    const parts = path.split('/');
    const main = parts[0] || 'home';
    const sub = parts[1] || '';
    onNavigatePage(main, sub);
  };

  const categories = [
    { id: 'all', label: 'All Pages', count: entries.length, icon: <Globe className="w-3.5 h-3.5" /> },
    { id: 'core', label: 'Core Pages', count: entries.filter(e => e.category === 'core').length, icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'services', label: 'Services', count: entries.filter(e => e.category === 'services').length, icon: <Wrench className="w-3.5 h-3.5" /> },
    { id: 'brands', label: 'Brand Hubs', count: entries.filter(e => e.category === 'brands').length, icon: <FileCode className="w-3.5 h-3.5" /> },
    { id: 'service-areas', label: 'Service Areas (220+)', count: entries.filter(e => e.category === 'service-areas').length, icon: <MapPin className="w-3.5 h-3.5" /> },
    { id: 'blog', label: 'Blog Posts (1,000+)', count: entries.filter(e => e.category === 'blog').length, icon: <BookOpen className="w-3.5 h-3.5" /> }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden relative">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                SEO Indexing Engine • XML Sitemap
              </span>
              <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                Sharon Infotech Complete Sitemap Explorer
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close sitemap modal"
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Controls Bar */}
        <div className="p-4 bg-slate-900/90 border-b border-slate-800/80 space-y-3">
          {/* Connected Multi-Sitemap Index Bar */}
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-[11px] font-black text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Connected Sitemap Index Architecture (All Sitemaps &lt; 1.8 MB &amp; Linked to Master Index)
              </span>
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1"
              >
                <span>Open Master /sitemap.xml</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1.5">
              {[
                { file: 'sitemap-pages.xml', label: 'Core & 220 Areas', size: '65 KB' },
                { file: 'sitemap-services.xml', label: 'Nagpur Services', size: '1.9 MB' },
                { file: 'sitemap-brands-1.xml', label: 'Brands Part 1', size: '1.5 MB' },
                { file: 'sitemap-brands-2.xml', label: 'Brands Part 2', size: '1.5 MB' },
                { file: 'sitemap-brands-3.xml', label: 'Brands Part 3', size: '1.5 MB' },
                { file: 'sitemap-brands-4.xml', label: 'Brands Part 4', size: '1.5 MB' },
                { file: 'sitemap-brands-5.xml', label: 'Brands Part 5', size: '1.5 MB' },
                { file: 'sitemap-brands-6.xml', label: 'Brands Part 6', size: '1.5 MB' },
                { file: 'sitemap-brands-7.xml', label: 'Brands Part 7', size: '1.5 MB' },
                { file: 'sitemap-brands-8.xml', label: 'Brands Part 8', size: '1.3 MB' },
                { file: 'sitemap-blog.xml', label: '1,200+ Blogs', size: '262 KB' },
              ].map((s) => (
                <a
                  key={s.file}
                  href={`/${s.file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-blue-500/40 transition flex flex-col justify-between"
                >
                  <span className="text-[10px] font-bold text-white truncate">{s.file}</span>
                  <span className="text-[9px] text-slate-400 flex items-center justify-between mt-0.5">
                    <span>{s.label}</span>
                    <span className="text-emerald-400 font-semibold">{s.size}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search URL, locality, brand, topic..."
                className="w-full bg-slate-950 border border-slate-700 text-white text-xs rounded-xl pl-9 pr-3 py-2 outline-none focus:border-blue-500 font-medium"
              />
            </div>

            {/* Export Actions */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                onClick={handleCopyXml}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition flex items-center gap-1.5 border border-slate-700"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied URLs!' : 'Copy URLs'}</span>
              </button>

              <button
                onClick={downloadSitemapFile}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs transition flex items-center gap-1.5 shadow-md"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download sitemap.xml</span>
              </button>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition shrink-0 flex items-center gap-1.5 border ${
                  activeCategory === cat.id
                    ? 'bg-blue-600 text-white border-blue-500 shadow'
                    : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
                <span className="text-[10px] bg-slate-900/80 px-1.5 py-0.5 rounded-md border border-slate-800">
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

        </div>

        {/* URL Table / List View */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 font-mono text-xs">
          <div className="flex items-center justify-between text-[11px] font-sans text-slate-400 px-2 pb-1 border-b border-slate-800">
            <span>Showing {filteredEntries.length} indexed URLs</span>
            <span>Domain: computerrepairnagpur.com</span>
          </div>

          {filteredEntries.slice(0, 150).map((entry, index) => (
            <div
              key={index}
              onClick={() => handleUrlClick(entry)}
              className="p-3 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800/80 hover:border-blue-500/50 transition cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-2 group"
            >
              <div className="space-y-0.5 overflow-hidden">
                <span className="text-slate-200 font-bold font-sans text-xs group-hover:text-blue-400 transition flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  {entry.title}
                </span>
                <p className="text-[11px] text-blue-400 font-mono truncate">{entry.url}</p>
              </div>

              <div className="flex items-center gap-2 font-sans text-[10px] shrink-0">
                <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                  Priority: {entry.priority.toFixed(2)}
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 uppercase">
                  {entry.category}
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400 transition" />
              </div>
            </div>
          ))}

          {filteredEntries.length > 150 && (
            <div className="p-4 text-center font-sans text-xs text-slate-400 bg-slate-950 rounded-xl border border-slate-800">
              Showing top 150 of {filteredEntries.length} matching URLs. Download full XML to view all 1,280+ URLs.
            </div>
          )}

          {filteredEntries.length === 0 && (
            <div className="p-8 text-center font-sans text-xs text-slate-400 space-y-2">
              <Globe className="w-8 h-8 mx-auto text-slate-600" />
              <p>No matching sitemap URLs found for "{search}".</p>
            </div>
          )}
        </div>

        {/* Modal Footer Note */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 text-[11px] font-sans text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            Google Search Console Ready • Auto-updated for Sharon Infotech Nagpur
          </span>
          <span className="font-bold text-emerald-400">
            Total Indexable URLs: {entries.length} Pages
          </span>
        </div>

      </div>
    </div>
  );
};
