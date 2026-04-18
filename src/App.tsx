import { useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  LayoutGrid, 
  Share2, 
  Facebook, 
  Instagram, 
  Video, 
  ChevronLeft, 
  Download,
  AlertCircle
} from 'lucide-react';
import { CATEGORIES, SOCIAL_LINKS, BRAND_ASSETS } from './constants';
import { Category, ViewState } from './types';

// --- Shared Components ---

const Icon = ({ name, className }: { name: string; className?: string }) => {
  switch (name) {
    case 'facebook': return <Facebook className={className} />;
    case 'instagram': return <Instagram className={className} />;
    case 'video': return <Video className={className} />;
    default: return <AlertCircle className={className} />;
  }
};

const Header = ({ title, showBack, onBack }: { title: string; showBack?: boolean; onBack?: () => void }) => (
  <header className="sticky top-0 z-30 bg-[#020617]/80 backdrop-blur-md border-b border-brand-gold/20 px-4 py-4 flex items-center justify-between">
    <div className="flex items-center gap-3">
      {showBack && (
        <button onClick={onBack} className="p-2 hover:bg-brand-gold/10 rounded-full transition-colors text-brand-red">
          <ChevronLeft className="w-6 h-6 rotate-180" />
        </button>
      )}
      <h1 className="text-xl font-display font-bold text-brand-red">{title}</h1>
    </div>
    {BRAND_ASSETS.logo && (
      <img src={BRAND_ASSETS.logo} alt="Logo" className="w-10 h-10 rounded-full border border-brand-gold/30 shadow-sm" referrerPolicy="no-referrer" />
    )}
  </header>
);

// --- Views ---

const LoadingSplash = () => (
  <motion.div 
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 bg-[#020617] flex flex-col items-center justify-center p-8"
  >
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative"
    >
      <div className="absolute inset-0 bg-brand-gold/20 blur-3xl rounded-full" />
      {BRAND_ASSETS.logo ? (
        <img src={BRAND_ASSETS.logo} alt="Hendren Logo" className="relative w-32 h-32 rounded-full mb-6" referrerPolicy="no-referrer" />
      ) : (
        <div className="relative w-32 h-32 bg-brand-gold/10 rounded-full mb-6 flex items-center justify-center text-brand-gold text-4xl italic font-display">H</div>
      )}
    </motion.div>
    <motion.h1 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="text-2xl font-display font-bold text-brand-red text-center"
    >
      شركة هندرين العالمية
    </motion.h1>
    <motion.div 
      className="mt-8 flex gap-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
    >
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
          className="w-2 h-2 rounded-full bg-brand-gold"
        />
      ))}
    </motion.div>
  </motion.div>
);

const HomeView = ({ onCategorySelect }: { onCategorySelect: (cat: Category) => void; key?: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="pb-32"
  >
    <div className="px-4 py-6">
      <div className="relative rounded-3xl overflow-hidden shadow-luxury mb-8 aspect-[21/9] bg-brand-gold/5 flex items-center justify-center">
        {BRAND_ASSETS.banner ? (
          <img 
            src={BRAND_ASSETS.banner} 
            alt="Banner" 
            className="w-full h-full object-cover" 
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="text-brand-gold/20 font-display font-bold text-lg italic">Hendren International</div>
        )}
      </div>

      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-display font-bold text-slate-100 border-r-4 border-brand-red pr-3">منتجاتنا المميزة</h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {CATEGORIES.map((cat, index) => (
          <motion.div
            key={cat.id}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onCategorySelect(cat)}
            className={`group relative bg-[#0F172A] rounded-2xl overflow-hidden shadow-md cursor-pointer border border-brand-gold/10 ${
              CATEGORIES.length % 2 !== 0 && index === CATEGORIES.length - 1 ? 'col-span-2' : ''
            }`}
          >
    <div className="aspect-square overflow-hidden bg-white/5 flex items-center justify-center p-4">
              {cat.image ? (
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <LayoutGrid className="w-12 h-12 text-brand-gold/20" />
              )}
            </div>
            <div className="p-3 bg-[#020617] border-t border-brand-gold/10">
              <p className="text-sm font-bold text-center text-slate-100 group-hover:text-brand-red transition-colors">{cat.name}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Videos Section */}
      <div className="mt-10">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-display font-bold text-slate-100 border-r-4 border-brand-red pr-3">قسم الفيديوهات</h3>
        </div>
        
        {/* Featured Video Player */}
        <div className="px-2 mb-6 flex justify-center">
          <div className="bg-[#0F172A] rounded-3xl overflow-hidden border-2 border-brand-gold/20 shadow-2xl relative w-full max-w-[320px]">
            <video 
              controls 
              className="w-full aspect-[9/16] object-cover"
              poster="https://j.top4top.io/p_3760cn4bq0.png"
            >
              <source src="https://a.top4top.io/m_3760jkp4f0.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#020617] via-[#020617]/80 to-transparent">
              <h4 className="text-slate-100 font-bold text-sm">فيديو تعريفي - شركة هندرين</h4>
              <p className="text-slate-400 text-[10px]">جودة عالمية بأيادي عراقية</p>
            </div>
          </div>
        </div>

        {/* TikTok Access */}
        <div className="px-2">
          <a 
            href="https://vt.tiktok.com/ZSHwrh2E8/"
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <div className="bg-[#0F172A]/50 rounded-2xl overflow-hidden border border-brand-gold/10 shadow-lg flex items-center p-3 gap-4 hover:bg-[#0F172A] transition-colors">
              <div className="w-12 h-12 bg-brand-red/20 text-brand-red rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Video className="w-6 h-6" />
              </div>
              <div className="text-right flex-1">
                <h4 className="text-slate-100 text-sm font-bold group-hover:text-brand-red transition-colors">المزيد من الفيديوهات على تيك توك</h4>
                <p className="text-slate-400 text-[10px]">تابعونا لمشاهدة الكواليس والجديد</p>
              </div>
              <Share2 className="w-4 h-4 text-brand-gold/50 group-hover:text-brand-gold" />
            </div>
          </a>
        </div>
      </div>

      {/* Developer Credit */}
      <div className="mt-12 pt-6 border-t border-brand-gold/10 text-center">
        <p className="text-slate-400 text-xs mb-2">تم تطوير الموقع بواسطة</p>
        <a 
          href="https://www.tiktok.com/@ai2025a?_r=1&_t=ZS-95eI5QKSa0O" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-sm hover:scale-105 transition-transform"
        >
          <Video className="w-4 h-4" />
          <span>هيبت خالد</span>
        </a>
      </div>
    </div>
  </motion.div>
);

const CategoryDetailView = ({ category, onBack }: { category: Category; onBack: () => void; key?: string }) => {
  const handleDownload = (imageUrl: string, name: string) => {
    // In a real app, this would trigger a download. 
    // For now, we'll open it in a new tab.
    window.open(imageUrl, '_blank');
  };

  return (
    <motion.div 
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      className="pb-20 bg-[#020617] min-h-screen"
    >
      <Header title={category.name} showBack onBack={onBack} />
      
      <div className="p-4 grid grid-cols-1 gap-6">
        {category.products.map((product) => (
          <div key={product.id} className="bg-[#0F172A] rounded-3xl overflow-hidden shadow-luxury border border-brand-gold/10">
            <div className="aspect-square bg-white/5 flex items-center justify-center">
              {product.image ? (
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-neutral-400">
                  <AlertCircle className="w-12 h-12 opacity-20" />
                  <span className="text-xs font-bold">قريباً..</span>
                </div>
              )}
            </div>
            <div className="p-4 flex items-center justify-center border-t border-brand-gold/10 bg-white/5">
              <button 
                onClick={() => handleDownload(product.image, product.name)}
                className="flex items-center gap-2 px-8 py-2.5 bg-brand-red text-white rounded-full hover:bg-red-700 transition-colors shadow-md shrink-0"
                dir="ltr"
              >
                <Download className="w-5 h-5" />
                <span className="text-base font-bold">تحميل التصميم</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const SocialView = () => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="pb-20"
  >
    <div className="px-6 py-8">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-display font-bold text-brand-red mb-2">تواصل معنا</h2>
        <p className="text-slate-300">للطلب والاستفسار والحجز، يسعدنا تواصلكم معنا عبر الوسائل التالية:</p>
      </div>

      {/* Direct Contact Numbers */}
      <div className="grid grid-cols-1 gap-3 mb-10">
        <div className="bg-[#0F172A] p-5 rounded-3xl shadow-sm border-2 border-brand-gold/20 flex flex-col items-center gap-2 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-16 h-16 bg-brand-gold/5 rounded-bl-full transition-all group-hover:scale-150" />
          <span className="text-brand-red font-bold text-sm">واتساب (مراسلة فقط)</span>
          <a href="https://wa.me/9647805748005" className="text-2xl font-display font-bold tracking-wider text-white tabular-nums">07805748005</a>
        </div>
        
        <div className="bg-[#0F172A] p-5 rounded-3xl shadow-sm border-2 border-brand-gold/20 flex flex-col items-center gap-2 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-16 h-16 bg-brand-red/5 rounded-br-full transition-all group-hover:scale-150" />
          <span className="text-brand-red font-bold text-sm">اتصال فقط</span>
          <a href="tel:07735883245" className="text-2xl font-display font-bold tracking-wider text-white tabular-nums">07735883245</a>
        </div>
      </div>

      <div className="mb-6 flex items-center gap-3">
        <div className="h-[2px] flex-1 bg-brand-gold/20"></div>
        <span className="text-slate-300 font-bold text-xs uppercase tracking-widest px-2">تابعونا على</span>
        <div className="h-[2px] flex-1 bg-brand-gold/20"></div>
      </div>

      <div className="space-y-4">
        {SOCIAL_LINKS.map((link, idx) => (
          <motion.a
            key={idx}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex items-center justify-between p-5 bg-[#0F172A] rounded-2xl shadow-sm border border-brand-gold/10 hover:border-brand-gold transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-brand-gold/10 text-brand-gold group-hover:bg-brand-red group-hover:text-white transition-colors">
                <Icon name={link.icon} className="w-6 h-6" />
              </div>
              <span className="font-bold text-slate-100">{link.name}</span>
            </div>
            <ChevronLeft className="w-5 h-5 text-brand-gold rotate-180" />
          </motion.a>
        ))}
      </div>

      <div className="mt-12 p-8 bg-brand-red rounded-3xl text-center text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-xl" />
        {BRAND_ASSETS.logo && (
          <img src={BRAND_ASSETS.logo} alt="Logo" className="w-16 h-16 rounded-full mx-auto mb-4 border-2 border-brand-gold" referrerPolicy="no-referrer" />
        )}
        <h3 className="text-xl font-display font-bold mb-2">هندرين العالمية</h3>
        <p className="text-white/80 text-sm mb-6">الجودة التي تستحقها</p>
        
        <div className="pt-4 border-t border-white/20">
          <p className="text-white/60 text-[10px] mb-2 uppercase tracking-widest">الموقع من إنشاء هيبت خالد</p>
          <a 
            href="https://www.tiktok.com/@ai2025a?_r=1&_t=ZS-95eI5QKSa0O" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-brand-red px-3 py-1.5 rounded-full text-xs font-bold shadow-inner"
          >
            <Video className="w-3 h-3" />
            <span>تيك توك المطور</span>
          </a>
        </div>
      </div>
    </div>
  </motion.div>
);

// --- Main App ---

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState<ViewState>('home');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleCategorySelect = (cat: Category) => {
    setSelectedCategory(cat);
  };

  const handleBack = () => {
    setSelectedCategory(null);
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#020617] relative shadow-2xl overflow-x-hidden">
      <AnimatePresence>
        {loading && <LoadingSplash key="splash" />}
      </AnimatePresence>

      {!loading && (
        <div className="flex flex-col min-h-screen">
          <AnimatePresence mode="wait">
            {selectedCategory ? (
              <CategoryDetailView 
                key="detail" 
                category={selectedCategory} 
                onBack={handleBack} 
              />
            ) : (
              <div key="main" className="flex-1">
                <Header title="شركة هندرين العالمية" />
                
                <AnimatePresence mode="wait">
                  {activeView === 'home' && (
                    <HomeView key="home" onCategorySelect={handleCategorySelect} />
                  )}
                  {activeView === 'products' && (
                    <div key="products" className="px-4 py-8 pb-32">
                      <h2 className="text-2xl font-display font-bold text-brand-red mb-6">كافة الأقسام</h2>
                      <div className="grid grid-cols-1 gap-4">
                        {CATEGORIES.map((cat) => (
                          <div 
                            key={cat.id}
                            onClick={() => handleCategorySelect(cat)}
                            className="bg-[#0F172A] p-3 rounded-2xl shadow-sm border border-brand-gold/10 flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow active:scale-[0.98]"
                          >
                            <div className="w-20 h-20 rounded-xl bg-white/5 flex items-center justify-center overflow-hidden shrink-0 p-2">
                               {cat.image ? (
                                 <img src={cat.image} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                               ) : (
                                 <LayoutGrid className="w-8 h-8 text-brand-gold/20" />
                               )}
                             </div>
                             <span className="font-bold text-slate-100">{cat.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {activeView === 'social' && <SocialView key="social" />}
                </AnimatePresence>
              </div>
            )}
          </AnimatePresence>

          {/* Bottom Navigation */}
          {!selectedCategory && (
            <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-[#020617]/80 backdrop-blur-lg border-t border-brand-gold/20 flex justify-around items-center py-3 px-6 z-40 rounded-t-3xl shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
              <NavButton 
                active={activeView === 'home'} 
                onClick={() => setActiveView('home')} 
                icon={<Home />} 
                label="الرئيسية" 
              />
              <NavButton 
                active={activeView === 'products'} 
                onClick={() => setActiveView('products')} 
                icon={<LayoutGrid />} 
                label="الأقسام" 
              />
              <NavButton 
                active={activeView === 'social'} 
                onClick={() => setActiveView('social')} 
                icon={<Share2 />} 
                label="تواصل" 
              />
            </nav>
          )}
        </div>
      )}
    </div>
  );
}

function NavButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: ReactNode; label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 transition-all duration-300 ${active ? 'text-brand-red scale-110' : 'text-neutral-400'}`}
    >
      <div className={`${active ? 'bg-brand-red/10 p-2 rounded-xl' : ''}`}>
        {icon}
      </div>
      <span className="text-[10px] font-bold">{label}</span>
      {active && (
        <motion.div 
          layoutId="nav-indicator"
          className="absolute -bottom-1 w-1 h-1 bg-brand-red rounded-full"
        />
      )}
    </button>
  );
}

