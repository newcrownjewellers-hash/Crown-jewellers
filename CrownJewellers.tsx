import React, { useState, useMemo, useEffect } from "react";
import {
  Search, Phone, MapPin, MessageCircle, Menu, X, Crown, ShieldCheck,
  Gem, Sparkles, Instagram, Facebook, ChevronRight, Award,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  BRAND CONFIG                                                       */
/* ------------------------------------------------------------------ */
const BRAND = {
  name: "Crown Jewellers",
  tagline: "22ct & 24ct Gold Jewellery | Elegant Designs • Trusted Quality",
  heroSub: "22ct & 24ct Gold Jewellery — Elegant Designs • Trusted Quality",
  address: "608 Stockport Road, M13 0RQ",
  phone: "0161 222 3636",
  phoneTel: "+441612223636",
  whatsapp: "447404741212", // WhatsApp: +44 7404 741212 (international format, no "+")
  whatsappDisplay: "+44 7404 741212",
  logoUrl: "https://i.ibb.co/bRbDH2jR/logo.png", // Direct logo URL
  instagram: "cj6082026",
  facebook: "crown jewellers",
  tiktok: "crownjewellersmcr",
};

const SOCIAL = {
  instagram: `https://instagram.com/${BRAND.instagram}`,
  facebook: `https://facebook.com/${BRAND.facebook.replace(/\s+/g, "")}`,
  tiktok: `https://tiktok.com/@${BRAND.tiktok}`,
};

const GOLD = "#D4AF37";
const GOLD_LIGHT = "#E5C158";
const NAVY = "#0A192F";
const NAVY_DEEP = "#0B132B";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */
const CATEGORIES = [
  "All",
  "Bridal Sets",
  "22ct Gold Necklaces",
  "24ct Pure Gold Bars/Coins",
  "Diamond & Gem Rings",
  "Bangles & Bracelets",
  "Earrings",
];

const img = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;

const PRODUCTS = [
  { id: 1, title: "Royal Bridal Set — Kundan Inspired", category: "Bridal Sets", karat: "22ct", price: 4850, weight: "62.4 g", image: img("photo-1599643478518-a784e5dc4c8f"), craft: "Hand-finished necklace, earrings & tikka set with intricate filigree work." },
  { id: 2, title: "Heritage Bridal Necklace Set", category: "Bridal Sets", karat: "22ct", price: 5920, weight: "74.8 g", image: img("photo-1611591437281-460bfbe1220a"), craft: "Heavy temple-style design crafted for weddings and celebrations." },
  { id: 3, title: "Classic Rope Chain Necklace", category: "22ct Gold Necklaces", karat: "22ct", price: 1290, weight: "16.2 g", image: img("photo-1599643477877-530eb83abc8e"), craft: "Solid hand-twisted rope links with a secure box clasp." },
  { id: 4, title: "Gold Lotus Pendant Necklace", category: "22ct Gold Necklaces", karat: "22ct", price: 980, weight: "12.1 g", image: img("photo-1515562141207-7a88fb7ce338"), craft: "Delicately carved lotus pendant on a fine curb chain." },
  { id: 5, title: "24ct Pure Gold Bar — 10g", category: "24ct Pure Gold Bars/Coins", karat: "24ct", price: 820, weight: "10 g", image: img("photo-1610375461246-83df859d849d"), craft: "999.9 fine gold bar, sealed and stamped with assay certification." },
  { id: 6, title: "24ct Gold Coin — 1oz", category: "24ct Pure Gold Bars/Coins", karat: "24ct", price: 2650, weight: "31.1 g", image: img("photo-1624365169364-0640dd10e180"), craft: "Investment-grade 24ct gold coin in protective capsule." },
  { id: 7, title: "Solitaire Diamond Ring", category: "Diamond & Gem Rings", karat: "22ct", price: 2150, weight: "6.8 g", image: img("photo-1605100804763-247f67b3557e"), craft: "Brilliant-cut centre stone with a hand-polished gold setting." },
  { id: 8, title: "Emerald & Gold Cocktail Ring", category: "Diamond & Gem Rings", karat: "22ct", price: 1480, weight: "8.4 g", image: img("photo-1603561591411-07134e71a2a9"), craft: "Natural emerald framed by fine gold detailing." },
  { id: 9, title: "Pair of Classic Gold Bangles", category: "Bangles & Bracelets", karat: "22ct", price: 2380, weight: "28.6 g", image: img("photo-1611652022419-a9419f74343d"), craft: "Smooth polished bangles with engraved edge pattern." },
  { id: 10, title: "Gold Link Bracelet", category: "Bangles & Bracelets", karat: "22ct", price: 1120, weight: "14.0 g", image: img("photo-1573408301185-9146fe634ad0"), craft: "Solid link bracelet with a secure lobster clasp." },
  { id: 11, title: "Gold Jhumka Earrings", category: "Earrings", karat: "22ct", price: 760, weight: "9.3 g", image: img("photo-1535632066927-ab7c9ab60908"), craft: "Traditional dome jhumkas with pearl drops and fine beading." },
  { id: 12, title: "Everyday Gold Studs", category: "Earrings", karat: "22ct", price: 310, weight: "3.2 g", image: img("photo-1630019852942-f89202989a59"), craft: "Lightweight studs with a screw-back for daily wear." },
];

const NAV = [
  { label: "Home", href: "#home" },
  { label: "Collections", href: "#collections" },
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const waLink = (text) =>
  `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(text)}`;

/* Inline TikTok icon (not included in lucide-react) */
const TikTokIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M19.6 6.7a5.5 5.5 0 0 1-3.4-1.9A5.5 5.5 0 0 1 14.9 2h-3.3v13.2a2.7 2.7 0 1 1-2.7-2.7c.3 0 .5 0 .8.1V9.2a6 6 0 0 0-.8-.1 6 6 0 1 0 6 6V8.6a8.8 8.8 0 0 0 4.7 1.4V6.7z" />
  </svg>
);

/* Brand logo (falls back to crown icon if the image can't load) */
const LogoMark = ({ className = "h-11 w-auto max-w-[120px]" }) => {
  const [failed, setFailed] = useState(false);
  if (!BRAND.logoUrl || failed) {
    return (
      <span className="w-9 h-9 rounded-full flex items-center justify-center gold-btn"><Crown size={18} /></span>
    );
  }
  return (
    <img src={BRAND.logoUrl} alt={`${BRAND.name} logo`} className={`${className} object-contain`} onError={() => setFailed(true)} />
  );
};

/* 3D tilt wrapper: card follows the mouse in perspective */
const Tilt = ({ children, className = "", max = 10 }) => {
  const [t, setT] = useState({ x: 0, y: 0, on: false });
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setT({ x: -py * max * 2, y: px * max * 2, on: true });
  };
  return (
    <div
      className={className}
      onMouseMove={onMove}
      onMouseLeave={() => setT({ x: 0, y: 0, on: false })}
      style={{
        transform: `perspective(900px) rotateX(${t.x}deg) rotateY(${t.y}deg) translateZ(${t.on ? 14 : 0}px)`,
        transition: t.on ? "transform .1s ease-out" : "transform .5s ease",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
};

/* Image with luxury gradient fallback if the remote image fails */
const SafeImg = ({ src, alt, className = "", style }) => {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #1b2e52 50%, ${GOLD}55 100%)` }}
        role="img" aria-label={alt}
      >
        <Gem className="text-[#D4AF37]/70" size={44} />
      </div>
    );
  }
  return <img src={src} alt={alt} className={className} style={style} loading="lazy" onError={() => setFailed(true)} />;
};

/* ------------------------------------------------------------------ */
/*  MAIN COMPONENT                                                     */
/* ------------------------------------------------------------------ */
export default function CrownJewellersSite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCat, setActiveCat] = useState("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [angle, setAngle] = useState(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        (activeCat === "All" || p.category === activeCat) &&
        (!q || p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.karat.toLowerCase().includes(q))
    );
  }, [activeCat, query]);

  // Lock scroll + Esc to close when modal open
  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [selected]);

  const openProduct = (p) => { setSelected(p); setAngle(0); };

  // Different "detail angles" built from the same image via zoom/position
  const ANGLES = [
    { label: "Front", style: { objectPosition: "center", transform: "scale(1)" } },
    { label: "Close-up", style: { objectPosition: "center", transform: "scale(1.6)" } },
    { label: "Detail", style: { objectPosition: "20% 30%", transform: "scale(2)" } },
    { label: "Side", style: { objectPosition: "80% 70%", transform: "scale(1.8)" } },
  ];

  return (
    <div className="min-h-screen text-slate-100 font-sans antialiased" style={{ backgroundColor: NAVY }}>
      {/* Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@300;400;500;600&display=swap');
        .font-serif-lux { font-family: 'Cormorant Garamond', Georgia, serif; }
        body { font-family: 'Inter', system-ui, sans-serif; }
        html { scroll-behavior: smooth; }
        .gold-text { background: linear-gradient(90deg, ${GOLD}, ${GOLD_LIGHT}, ${GOLD}); -webkit-background-clip: text; background-clip: text; color: transparent; }
        .gold-btn { background: linear-gradient(135deg, ${GOLD} 0%, ${GOLD_LIGHT} 50%, ${GOLD} 100%); color: ${NAVY}; box-shadow: 0 3px 0 #9c7d1b, 0 10px 18px -8px rgba(0,0,0,.65), inset 0 1px 0 rgba(255,255,255,.45); }
        .gold-btn:hover { filter: brightness(1.08); box-shadow: 0 3px 0 #9c7d1b, 0 14px 26px -8px ${GOLD}99, inset 0 1px 0 rgba(255,255,255,.45); }
        .gold-btn:active { transform: translateY(2px); box-shadow: 0 1px 0 #9c7d1b, 0 6px 12px -6px rgba(0,0,0,.6); }
        @keyframes coinSpin { from { transform: rotateY(0deg);} to { transform: rotateY(360deg);} }
        @keyframes floaty { 0%,100% { transform: translateY(0);} 50% { transform: translateY(-12px);} }
        .float3d { animation: floaty 4s ease-in-out infinite; perspective: 600px; }
        .coin { animation: coinSpin 7s linear infinite; transform-style: preserve-3d; }
        @media (prefers-reduced-motion: reduce) { .coin, .float3d { animation: none; } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px);} to { opacity: 1; transform: none;} }
        .fade-up { animation: fadeUp .6s ease both; }
        @keyframes pop { from { opacity: 0; transform: scale(.96);} to { opacity: 1; transform: none;} }
        .pop { animation: pop .25s ease both; }
      `}</style>

      {/* ============ TOP ANNOUNCEMENT BAR ============ */}
      <div className="text-xs sm:text-[13px]" style={{ backgroundColor: NAVY_DEEP, borderBottom: `1px solid ${GOLD}40` }}>
        <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col md:flex-row items-center justify-between gap-1 md:gap-4 text-center">
          <p className="text-[#E5C158] tracking-wide">{BRAND.tagline}</p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-slate-300">
            <span className="inline-flex items-center gap-1.5"><MapPin size={13} className="text-[#D4AF37]" />{BRAND.address}</span>
            <a href={`tel:${BRAND.phoneTel}`} className="inline-flex items-center gap-1.5 hover:text-[#E5C158]"><Phone size={13} className="text-[#D4AF37]" />{BRAND.phone}</a>
          </div>
        </div>
      </div>

      {/* ============ HEADER ============ */}
      <header className="sticky top-0 z-40 backdrop-blur-md" style={{ backgroundColor: `${NAVY}F2`, borderBottom: `1px solid ${GOLD}30` }}>
        <div className="max-w-7xl mx-auto px-4 h-16 lg:h-20 flex items-center gap-4">
          <a href="#home" className="flex items-center gap-2 shrink-0">
            <LogoMark className="h-10 sm:h-12 w-auto max-w-[120px]" />
            <span className="font-serif-lux text-xl sm:text-2xl font-semibold gold-text leading-none">{BRAND.name}</span>
          </a>

          <nav className="hidden lg:flex items-center gap-8 ml-8">
            {NAV.map((n) => (
              <a key={n.label} href={n.href} className="text-sm uppercase tracking-[0.15em] text-slate-300 hover:text-[#E5C158] transition-colors">{n.label}</a>
            ))}
          </nav>

          <div className="hidden md:flex items-center ml-auto relative w-56 lg:w-64">
            <Search size={16} className="absolute left-3 text-[#D4AF37]" />
            <input
              value={query}
              onChange={(e) => { setQuery(e.target.value); if (e.target.value) document.getElementById("collections")?.scrollIntoView({ behavior: "smooth" }); }}
              placeholder="Search jewellery..."
              aria-label="Search jewellery"
              className="w-full bg-[#0B132B] rounded-full pl-9 pr-4 py-2 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
              style={{ border: `1px solid ${GOLD}50` }}
            />
          </div>

          <div className="hidden sm:flex items-center gap-2 ml-auto md:ml-0">
            <a href={waLink("Hello Crown Jewellers, I'd like to make an enquiry.")} target="_blank" rel="noreferrer" className="gold-btn inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all">
              <MessageCircle size={16} /> WhatsApp
            </a>
            <a href={`tel:${BRAND.phoneTel}`} aria-label="Call us" className="w-10 h-10 rounded-full flex items-center justify-center text-[#E5C158] hover:bg-[#D4AF37]/10" style={{ border: `1px solid ${GOLD}60` }}>
              <Phone size={16} />
            </a>
          </div>

          <button className="lg:hidden ml-auto sm:ml-0 p-2 text-[#E5C158]" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden px-4 pb-5 space-y-4" style={{ borderTop: `1px solid ${GOLD}25` }}>
            <div className="relative mt-4">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#D4AF37]" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search jewellery..." className="w-full bg-[#0B132B] rounded-full pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#D4AF37]" style={{ border: `1px solid ${GOLD}50` }} />
            </div>
            {NAV.map((n) => (
              <a key={n.label} href={n.href} onClick={() => setMenuOpen(false)} className="block py-1 text-sm uppercase tracking-[0.15em] text-slate-200 hover:text-[#E5C158]">{n.label}</a>
            ))}
            <div className="flex gap-2 pt-2">
              <a href={waLink("Hello Crown Jewellers, I'd like to make an enquiry.")} target="_blank" rel="noreferrer" className="gold-btn flex-1 inline-flex justify-center items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold"><MessageCircle size={16} /> WhatsApp</a>
              <a href={`tel:${BRAND.phoneTel}`} className="flex-1 inline-flex justify-center items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-[#E5C158]" style={{ border: `1px solid ${GOLD}` }}><Phone size={16} /> Call</a>
            </div>
          </div>
        )}
      </header>

      {/* ============ HERO ============ */}
      <section id="home" className="relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 75% 20%, ${GOLD}33 0%, transparent 50%), radial-gradient(ellipse at 10% 90%, #1d3a7a66 0%, transparent 55%), linear-gradient(180deg, ${NAVY_DEEP}, ${NAVY})` }} />
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full opacity-20 blur-3xl" style={{ background: GOLD }} />
        <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />

        <div className="relative max-w-7xl mx-auto px-4 py-20 sm:py-28 lg:py-36 grid lg:grid-cols-2 gap-12 items-center">
          <div className="fade-up text-center lg:text-left">
            <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs uppercase tracking-[0.3em] text-[#E5C158] mb-6">
              <Sparkles size={14} /> Manchester's Trusted Jeweller
            </div>
            <h1 className="font-serif-lux text-5xl sm:text-6xl lg:text-7xl font-bold gold-text leading-[1.05]">{BRAND.name}</h1>
            <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">{BRAND.heroSub}</p>
            <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <a href="#collections" className="gold-btn inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 font-semibold transition-all">
                Explore Collection <ChevronRight size={18} />
              </a>
              <a href="#contact" className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 font-semibold text-[#E5C158] hover:bg-[#D4AF37]/10 transition-all" style={{ border: `1px solid ${GOLD}` }}>
                Visit Store / Contact Us
              </a>
            </div>
          </div>

          <div className="relative fade-up" style={{ animationDelay: ".15s" }}>
            <div className="absolute -inset-4 rounded-[2rem] opacity-40 blur-2xl" style={{ background: `linear-gradient(135deg, ${GOLD}, transparent)` }} />
            {/* Floating 3D spinning gold coin */}
            <div className="float3d absolute -top-7 -left-3 sm:-left-9 z-10 w-20 h-20 sm:w-24 sm:h-24">
              <div className="coin w-full h-full rounded-full flex items-center justify-center gold-btn" style={{ border: `4px solid ${GOLD_LIGHT}`, boxShadow: `inset 0 0 0 5px ${GOLD}, inset 0 0 18px rgba(0,0,0,.35), 0 18px 30px -10px rgba(0,0,0,.7)` }}>
                <Crown size={34} />
              </div>
            </div>
            <Tilt max={7} className="relative">
            <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]" style={{ border: `1px solid ${GOLD}70` }}>
              <SafeImg src={img("photo-1599643478518-a784e5dc4c8f")} alt="Luxury 22ct gold bridal jewellery" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${NAVY}CC, transparent 50%)` }} />
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-sm">
                <span className="font-serif-lux text-2xl gold-text">Bridal Collection</span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold gold-btn">22ct</span>
              </div>
            </div>
            </Tilt>
          </div>
        </div>
      </section>

      {/* ============ COLLECTIONS ============ */}
      <section id="collections" className="py-16 sm:py-24 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.35em] text-[#D4AF37] mb-3">Our Collections</p>
            <h2 className="font-serif-lux text-4xl sm:text-5xl font-semibold text-white">Featured <span className="gold-text">Gold Jewellery</span></h2>
            <div className="mx-auto mt-5 h-px w-24" style={{ background: GOLD }} />
          </div>

          {/* Category tabs */}
          <div className="flex gap-2 overflow-x-auto pb-3 mb-6 sm:flex-wrap sm:justify-center sm:overflow-visible" role="tablist">
            {CATEGORIES.map((c) => {
              const active = activeCat === c;
              return (
                <button
                  key={c}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveCat(c)}
                  className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium transition-all ${active ? "gold-btn" : "text-slate-300 hover:text-[#E5C158]"}`}
                  style={active ? undefined : { border: `1px solid ${GOLD}40` }}
                >
                  {c}
                </button>
              );
            })}
          </div>

          {/* Mobile search */}
          <div className="md:hidden relative mb-8">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#D4AF37]" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search jewellery..." className="w-full bg-[#0B132B] rounded-full pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#D4AF37]" style={{ border: `1px solid ${GOLD}50` }} />
          </div>

          {filtered.length === 0 ? (
            <p className="text-center text-slate-400 py-16">No pieces match your search. Call us on {BRAND.phone} for bespoke requests.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
              {filtered.map((p) => (
                <Tilt key={p.id} className="h-full" max={8}>
                <article className="group h-full rounded-2xl overflow-hidden flex flex-col transition-shadow hover:shadow-[0_24px_40px_-14px_rgba(212,175,55,0.4)]" style={{ backgroundColor: NAVY_DEEP, border: `1px solid ${GOLD}30` }}>
                  <button onClick={() => openProduct(p)} className="relative aspect-square overflow-hidden text-left" aria-label={`View ${p.title}`}>
                    <SafeImg src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold gold-btn">{p.karat} Gold</span>
                    <span className="absolute inset-x-0 bottom-0 py-2 text-center text-xs uppercase tracking-widest text-[#E5C158] opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `${NAVY}CC` }}>Quick View</span>
                  </button>
                  <div className="p-4 flex flex-col flex-1">
                    <p className="text-[11px] uppercase tracking-widest text-[#D4AF37]/80">{p.category}</p>
                    <h3 onClick={() => openProduct(p)} className="font-serif-lux text-xl mt-1 text-white cursor-pointer hover:text-[#E5C158] leading-snug">{p.title}</h3>
                    <div className="mt-4 grid grid-cols-5 gap-2 mt-auto pt-4">
                      <a href={waLink(`Hello Crown Jewellers, I'm interested in: ${p.title} (${p.karat}). Is it available, and what is the price?`)} target="_blank" rel="noreferrer" className="col-span-4 gold-btn inline-flex items-center justify-center gap-2 rounded-full py-2.5 text-sm font-semibold transition-all">
                        <MessageCircle size={15} /> Order via WhatsApp
                      </a>
                      <a href={`tel:${BRAND.phoneTel}`} aria-label="Call to order" className="inline-flex items-center justify-center rounded-full text-[#E5C158] hover:bg-[#D4AF37]/10" style={{ border: `1px solid ${GOLD}60` }}>
                        <Phone size={15} />
                      </a>
                    </div>
                  </div>
                </article>
                </Tilt>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ============ ABOUT + TRUST ============ */}
      <section id="about" className="py-16 sm:py-24 scroll-mt-20" style={{ backgroundColor: NAVY_DEEP, borderTop: `1px solid ${GOLD}25`, borderBottom: `1px solid ${GOLD}25` }}>
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="rounded-3xl overflow-hidden aspect-[4/3]" style={{ border: `1px solid ${GOLD}60` }}>
              <SafeImg src={img("photo-1611591437281-460bfbe1220a")} alt="Crown Jewellers craftsmanship" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-5 -right-2 sm:right-6 rounded-2xl px-5 py-4 gold-btn shadow-xl">
              <p className="font-serif-lux text-3xl font-bold leading-none">22ct & 24ct</p>
              <p className="text-xs font-semibold uppercase tracking-widest mt-1">Certified Gold</p>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <p className="text-xs uppercase tracking-[0.35em] text-[#D4AF37] mb-3">About Us</p>
            <h2 className="font-serif-lux text-4xl sm:text-5xl font-semibold text-white leading-tight">A Crown of <span className="gold-text">Trusted Quality</span></h2>
            <p className="mt-5 text-slate-300 leading-relaxed">
              At {BRAND.name}, we bring together timeless craftsmanship and elegant design in every piece of 22ct and 24ct gold jewellery. From bridal sets to everyday essentials and pure gold investment bars, each item is selected and finished to the highest standard.
            </p>
            <p className="mt-4 text-slate-300 leading-relaxed">
              Visit us at {BRAND.address} and let our team help you find — or design — the perfect piece.
            </p>

            <div className="mt-8 grid sm:grid-cols-3 gap-4">
              {[
                { icon: ShieldCheck, t: "Certified Gold", d: "Genuine 22ct & 24ct hallmarked gold." },
                { icon: Gem, t: "Bespoke Designs", d: "Custom pieces made to your vision." },
                { icon: Award, t: "Trusted Quality", d: "Elegant designs you can rely on." },
              ].map(({ icon: Icon, t, d }) => (
                <div key={t} className="rounded-2xl p-4" style={{ backgroundColor: NAVY, border: `1px solid ${GOLD}35` }}>
                  <Icon className="text-[#D4AF37] mb-3" size={26} />
                  <h3 className="font-semibold text-white text-sm">{t}</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ CONTACT CTA ============ */}
      <section id="contact" className="py-16 sm:py-20 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 text-center rounded-3xl py-12 px-6" style={{ background: `linear-gradient(135deg, ${NAVY_DEEP}, #12285a)`, border: `1px solid ${GOLD}60` }}>
          <Crown className="mx-auto text-[#D4AF37] mb-4" size={34} />
          <h2 className="font-serif-lux text-3xl sm:text-4xl font-semibold text-white">Visit <span className="gold-text">{BRAND.name}</span></h2>
          <p className="mt-3 text-slate-300 inline-flex items-center gap-2 justify-center"><MapPin size={16} className="text-[#D4AF37]" />{BRAND.address}</p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
            <a href={`tel:${BRAND.phoneTel}`} className="gold-btn inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 font-semibold transition-all"><Phone size={18} /> Call {BRAND.phone}</a>
            <a href={waLink("Hello Crown Jewellers, I'd like to visit your store / make an enquiry.")} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 font-semibold text-[#E5C158] hover:bg-[#D4AF37]/10" style={{ border: `1px solid ${GOLD}` }}><MessageCircle size={18} /> WhatsApp Us</a>
          </div>
          <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BRAND.address)}`} target="_blank" rel="noreferrer" className="inline-block mt-5 text-sm text-slate-400 hover:text-[#E5C158] underline underline-offset-4">Get directions</a>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer style={{ backgroundColor: NAVY_DEEP, borderTop: `1px solid ${GOLD}50` }}>
        <div className="max-w-7xl mx-auto px-4 py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <LogoMark className="h-12 w-auto max-w-[130px]" />
              <span className="font-serif-lux text-2xl gold-text">{BRAND.name}</span>
            </div>
            <p className="mt-4 text-sm text-slate-400 leading-relaxed">{BRAND.tagline}</p>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-widest text-[#E5C158] mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              {NAV.map((n) => <li key={n.label}><a href={n.href} className="hover:text-[#E5C158]">{n.label}</a></li>)}
            </ul>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-widest text-[#E5C158] mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex gap-2"><MapPin size={16} className="text-[#D4AF37] mt-0.5 shrink-0" /><span>Address: {BRAND.address}</span></li>
              <li className="flex gap-2"><Phone size={16} className="text-[#D4AF37] mt-0.5 shrink-0" /><a href={`tel:${BRAND.phoneTel}`} className="hover:text-[#E5C158]">Phone: {BRAND.phone}</a></li>
              <li className="flex gap-2"><MessageCircle size={16} className="text-[#D4AF37] mt-0.5 shrink-0" /><a href={waLink("Hello Crown Jewellers")} target="_blank" rel="noreferrer" className="hover:text-[#E5C158]">WhatsApp: {BRAND.whatsappDisplay}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-widest text-[#E5C158] mb-4">Follow Us</h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li><a href={SOCIAL.instagram} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 hover:text-[#E5C158]"><span className="w-9 h-9 rounded-full flex items-center justify-center text-[#D4AF37]" style={{ border: `1px solid ${GOLD}60` }}><Instagram size={16} /></span>@{BRAND.instagram}</a></li>
              <li><a href={SOCIAL.facebook} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 hover:text-[#E5C158]"><span className="w-9 h-9 rounded-full flex items-center justify-center text-[#D4AF37]" style={{ border: `1px solid ${GOLD}60` }}><Facebook size={16} /></span>{BRAND.facebook}</a></li>
              <li><a href={SOCIAL.tiktok} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 hover:text-[#E5C158]"><span className="w-9 h-9 rounded-full flex items-center justify-center text-[#D4AF37]" style={{ border: `1px solid ${GOLD}60` }}><TikTokIcon size={16} /></span>@{BRAND.tiktok}</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center text-xs text-slate-500 py-5" style={{ borderTop: `1px solid ${GOLD}20` }}>
          © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
        </div>
      </footer>

      {/* Floating WhatsApp (mobile-friendly) */}
      <a href={waLink("Hello Crown Jewellers, I'd like to make an enquiry.")} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp" className="fixed bottom-5 right-5 z-30 w-14 h-14 rounded-full flex items-center justify-center gold-btn shadow-2xl sm:hidden">
        <MessageCircle size={26} />
      </a>

      {/* ============ PRODUCT MODAL ============ */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6" role="dialog" aria-modal="true" aria-label={selected.title}>
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={() => setSelected(null)} />
          <div className="pop relative w-full sm:max-w-4xl max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl" style={{ backgroundColor: NAVY, border: `1px solid ${GOLD}70` }}>
            <button onClick={() => setSelected(null)} aria-label="Close" className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full flex items-center justify-center text-[#E5C158] hover:bg-[#D4AF37]/10" style={{ backgroundColor: `${NAVY_DEEP}E6`, border: `1px solid ${GOLD}50` }}>
              <X size={20} />
            </button>

            <div className="grid md:grid-cols-2">
              {/* Gallery */}
              <div className="p-4 sm:p-6">
                <div className="aspect-square rounded-2xl overflow-hidden" style={{ border: `1px solid ${GOLD}40` }}>
                  <SafeImg src={selected.image} alt={`${selected.title} — ${ANGLES[angle].label}`} className="w-full h-full object-cover transition-transform duration-500" style={ANGLES[angle].style} />
                </div>
                <div className="mt-3 grid grid-cols-4 gap-2">
                  {ANGLES.map((a, i) => (
                    <button key={a.label} onClick={() => setAngle(i)} aria-label={`View ${a.label}`} className="aspect-square rounded-lg overflow-hidden transition-all" style={{ border: `2px solid ${i === angle ? GOLD : "transparent"}`, opacity: i === angle ? 1 : 0.65 }}>
                      <SafeImg src={selected.image} alt={a.label} className="w-full h-full object-cover" style={a.style} />
                    </button>
                  ))}
                </div>
                <p className="text-center text-xs text-slate-500 mt-2">{ANGLES[angle].label} view</p>
              </div>

              {/* Details */}
              <div className="p-5 sm:p-8 md:pl-2 flex flex-col">
                <p className="text-[11px] uppercase tracking-widest text-[#D4AF37]">{selected.category}</p>
                <h3 className="font-serif-lux text-3xl text-white mt-1 leading-tight pr-10">{selected.title}</h3>

                <div className="mt-5 rounded-2xl divide-y" style={{ backgroundColor: NAVY_DEEP, border: `1px solid ${GOLD}30`, borderColor: `${GOLD}30` }}>
                  {[
                    ["Purity", `${selected.karat} Gold`],
                    ["Approx. Weight", selected.weight],
                    ["Hallmark", "Certified & stamped"],
                    ["Availability", "In store / made to order"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between px-4 py-2.5 text-sm" style={{ borderColor: `${GOLD}20` }}>
                      <span className="text-slate-400">{k}</span>
                      <span className="text-white font-medium">{v}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-5">
                  <h4 className="text-xs uppercase tracking-widest text-[#E5C158] mb-2">Craftsmanship Notes</h4>
                  <p className="text-sm text-slate-300 leading-relaxed">{selected.craft}</p>
                </div>

                <div className="mt-auto pt-6 flex flex-col gap-2">
                  <a
                    href={waLink(`Hello Crown Jewellers, I'm interested in "${selected.title}" (${selected.karat} Gold, ${selected.weight}). Could you please confirm availability and price?`)}
                    target="_blank" rel="noreferrer"
                    className="gold-btn inline-flex items-center justify-center gap-2 rounded-full py-3.5 font-semibold transition-all"
                  >
                    <MessageCircle size={18} /> Enquire on WhatsApp
                  </a>
                  <a href={`tel:${BRAND.phoneTel}`} className="inline-flex items-center justify-center gap-2 rounded-full py-3 font-semibold text-[#E5C158] hover:bg-[#D4AF37]/10" style={{ border: `1px solid ${GOLD}` }}>
                    <Phone size={17} /> Call {BRAND.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
