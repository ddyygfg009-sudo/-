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
  AlertCircle,
  Menu,
  ShieldCheck,
  Truck,
  Star,
  Leaf,
  User,
  Tag,
  Headphones,
  ShoppingBag,
  Globe
} from 'lucide-react';
import { CATEGORIES, SOCIAL_LINKS, BRAND_ASSETS, FEATURES } from './constants';
import { Category, ViewState } from './types';

// --- Shared Components ---

const Icon = ({ name, className }: { name: string; className?: string }) => {
  switch (name) {
    case 'facebook': return <Facebook className={className} />;
    case 'instagram': return <Instagram className={className} />;
    case 'video': return <Video className={className} />;
    case 'twitter': return <Globe className={className} />;
    case 'shield': return <ShieldCheck className={className} />;
    case 'truck': return <Truck className={className} />;
    case 'badge': return <Star className={className} />;
    case 'leaf': return <Leaf className={className} />;
    case 'home': return <Home className={className} />;
    case 'grid': return <LayoutGrid className={className} />;
    case 'offers': return <Tag className={className} />;
    case 'profile': return <User className={className} />;
    case 'social': return <Headphones className={className} />;
    default: return <AlertCircle className={className} />;
  }
};

const Header = ({ onBack, showBack }: { onBack?: () => void; showBack?: boolean }) => (
  <header className="sticky top-0 z-30 bg-[#020617] border-b border-white/5 px-4 py-3 flex items-center justify-between">
    <div className="flex items-center">
      {BRAND_ASSETS.logo && (
        <img src={BRAND_ASSETS.logo} alt="Logo" className="w-10 h-10 object-contain" referrerPolicy="no-referrer" />
      )}
      {showBack && (
        <button onClick={onBack} className="mr-2 p-2 text-white">
          <ChevronLeft className="w-6 h-6 rotate-180" />
        </button>
      )}
    </div>
    
    <div className="flex flex-col items-center">
      <h1 className="text-sm font-bold text-white tracking-wide">شركة هندرين العالمية</h1>
      <span className="text-[10px] text-brand-gold flex items-center gap-1 mt-0.5">
        <span>🍃</span>
        نكهات تصنع الفرق
        <span>🍃</span>
      </span>
    </div>

    <button className="p-2 text-white opacity-80">
      <Menu className="w-6 h-6" />
    </button>
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

const HomeView = ({ onCategorySelect }: { onCategorySelect: (cat: Category) => void; key?: string }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="pb-32"
    >
      <div className="px-4 py-4">
        {/* Banner Section */}
        <div className="relative rounded-3xl overflow-hidden mb-8 aspect-[16/9] bg-brand-gold/5 shadow-2xl">
          {BRAND_ASSETS.banner ? (
            <img 
              src={BRAND_ASSETS.banner} 
              alt="Banner" 
              className="w-full h-full object-cover" 
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-brand-gold/20 font-display font-bold text-lg italic">Hendren International</div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
            <button className="bg-brand-gold/90 text-slate-900 px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 w-fit mb-4 shadow-lg hover:scale-105 transition-transform active:scale-95">
              <ShoppingBag className="w-4 h-4" />
              <span>تسوق الآن</span>
            </button>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-white/70">
                <Facebook className="w-4 h-4" />
                <Instagram className="w-4 h-4" />
                <Globe className="w-4 h-4" />
                <span className="text-[10px] mr-1 opacity-60">hendrenglobalcompany</span>
              </div>
              <div className="flex gap-1.5">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === currentSlide ? 'bg-white w-4' : 'bg-white/30'} transition-all duration-300`} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Categories Title */}
        <div className="mb-6 flex flex-col items-center gap-1">
          <div className="flex items-center gap-3">
             <span className="text-brand-gold">🍃</span>
             <h3 className="text-lg font-bold text-slate-100">منتجاتنا المميزة</h3>
             <span className="text-brand-gold">🍃</span>
          </div>
          <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent"></div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 gap-4">
          {CATEGORIES.map((cat, index) => {
            const isFullWidth = index === CATEGORIES.length - 1;
            return (
              <motion.div
                key={cat.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => onCategorySelect(cat)}
                className={`group relative bg-[#0F172A] rounded-2xl overflow-hidden shadow-xl cursor-pointer border border-white/5 h-[160px] ${
                  isFullWidth ? 'col-span-2' : ''
                }`}
              >
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
                  <div className="mb-3">
                    <p className="text-[10px] text-brand-gold/80 mb-0.5 opacity-0 group-hover:opacity-100 transition-opacity">تصفح الآن</p>
                    <p className="text-xs font-bold text-white line-clamp-1">{cat.name}</p>
                  </div>
                  <button className="bg-brand-green text-white py-1.5 px-4 rounded-lg text-[10px] font-bold flex items-center justify-center gap-2 w-fit active:scale-95 transition-transform">
                    <ShoppingBag className="w-3 h-3" />
                    <span>تسوق الآن</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Features Section */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {FEATURES.map((feature, idx) => (
            <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-100 flex flex-col items-center text-center gap-2 shadow-sm min-h-[140px] justify-center">
              <div className="w-12 h-12 bg-slate-50 text-[#006A4E] flex items-center justify-center rounded-2xl">
                <Icon name={feature.icon} className="w-6 h-6 stroke-[1.5]" />
              </div>
              <p className="text-slate-900 font-bold text-[11px] mt-1">{feature.title}</p>
              <p className="text-slate-400 text-[9px] leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Videos Section */}
        <div className="mt-12">
          <div className="mb-6 flex flex-col items-center gap-1">
            <div className="flex items-center gap-3">
               <span className="text-brand-gold">🎬</span>
               <h3 className="text-lg font-bold text-slate-100">قسم الفيديوهات</h3>
               <span className="text-brand-gold">🎬</span>
            </div>
            <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent"></div>
          </div>
          
          <div className="flex justify-center px-4">
            <div className="w-full max-w-[280px] aspect-[9/16] bg-black rounded-3xl overflow-hidden border-2 border-brand-gold/20 shadow-2xl relative">
              <video 
                controls 
                className="w-full h-full object-cover"
                poster="https://j.top4top.io/p_3760cn4bq0.png"
              >
                <source src="https://a.top4top.io/m_3760jkp4f0.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>

        {/* TikTok Access */}
        <div className="mt-12 px-2">
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
    </motion.div>
  );
};

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
      <Header showBack onBack={onBack} />
      
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
                <Header onBack={handleBack} showBack={!!selectedCategory} />
                
                <AnimatePresence mode="wait">
                  {activeView === 'home' && (
                    <HomeView key="home" onCategorySelect={handleCategorySelect} />
                  )}
                  {activeView === 'products' && (
                    <div key="products" className="px-4 py-8 pb-32">
                      <h2 className="text-2xl font-display font-bold text-white mb-6">كافة الأقسام</h2>
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
                  {activeView === 'offers' && (
                    <div key="offers" className="px-4 py-12 flex flex-col items-center justify-center text-center">
                      <Tag className="w-16 h-16 text-brand-gold/20 mb-4" />
                      <h2 className="text-2xl font-bold text-white mb-2">العروض والخصومات</h2>
                      <p className="text-slate-400">تابعونا باستمرار لمشاهدة أحدث العروض</p>
                    </div>
                  )}
                  {activeView === 'profile' && (
                    <div key="profile" className="px-4 py-12 flex flex-col items-center justify-center text-center">
                      <User className="w-16 h-16 text-brand-gold/20 mb-4" />
                      <h2 className="text-2xl font-bold text-white mb-2">حسابي</h2>
                      <p className="text-slate-400">سجل الدخول لمشاهدة تفضيلاتك</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </AnimatePresence>

          {/* Bottom Navigation */}
          {!selectedCategory && (
            <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-40 px-3 pb-3 overflow-visible">
              <nav className="bg-[#020617] border border-white/10 flex justify-around items-center pt-2 pb-2 px-1 rounded-3xl shadow-2xl relative overflow-visible h-[72px]">
                <NavButton 
                  active={activeView === 'social'} 
                  onClick={() => setActiveView('social')} 
                  icon={<Headphones />} 
                  label="تواصل" 
                />
                <NavButton 
                  active={activeView === 'products'} 
                  onClick={() => setActiveView('products')} 
                  icon={<LayoutGrid />} 
                  label="الأقسام" 
                />
                
                {/* Central Home Button */}
                <div className="relative -top-5">
                  <div className={`absolute inset-0 blur-2xl rounded-full ${activeView === 'home' ? 'bg-brand-red/40' : 'bg-brand-gold/10'}`}></div>
                  <button 
                    onClick={() => setActiveView('home')}
                    className={`relative w-14 h-14 rounded-full flex flex-col items-center justify-center transition-all duration-500 border-2 ${
                      activeView === 'home' 
                        ? 'bg-[#006A4E] border-white shadow-[0_4px_20px_rgba(0,106,78,0.4)] scale-110' 
                        : 'bg-[#020617] border-white/20'
                    }`}
                  >
                    <Home className={`w-6 h-6 mb-0.5 ${activeView === 'home' ? 'text-white' : 'text-slate-400'}`} />
                    <span className={`text-[9px] font-bold ${activeView === 'home' ? 'text-white' : 'text-slate-400'}`}>الرئيسية</span>
                  </button>
                </div>

                <NavButton 
                  active={activeView === 'offers'} 
                  onClick={() => setActiveView('offers')} 
                  icon={<Tag />} 
                  label="العروض" 
                />
                <NavButton 
                  active={activeView === 'profile'} 
                  onClick={() => setActiveView('profile')} 
                  icon={<User />} 
                  label="حسابي" 
                />
              </nav>
            </div>
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
      className={`flex flex-col items-center gap-0.5 transition-all duration-300 w-12 ${active ? 'text-brand-gold' : 'text-slate-500'}`}
    >
      <div className="mb-0.5">
        {icon && (icon as any).type ? (
           <span className="*:w-5 *:h-5">{icon}</span>
        ) : icon}
      </div>
      <span className="text-[9px] font-bold whitespace-nowrap">{label}</span>
    </button>
  );
}

