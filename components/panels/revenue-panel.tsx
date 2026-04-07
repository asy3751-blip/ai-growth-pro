'use client'

import { useState, useMemo } from 'react'
import { useAppStore } from '@/lib/store'
import { cn } from '@/lib/utils'

const REVENUE_PATHS = [
  { id: 'sponsored', emoji: '🤝', name: { ar: 'إعلانات مدفوعة', en: 'Sponsored Posts' }, range: '$200—$5K', desc: { ar: 'تعاون مع ماركات', en: 'Brand collaborations' }, req: { ar: '5K+ متابع', en: '5K+ followers' } },
  { id: 'affiliate', emoji: '🛒', name: { ar: 'تسويق بالعمولة', en: 'Affiliate Marketing' }, range: '$100—$3K', desc: { ar: 'عمولة على كل بيعة', en: 'Commission per sale' }, req: { ar: 'رابط بيو', en: 'Bio link' } },
  { id: 'digital', emoji: '🎓', name: { ar: 'منتجات رقمية', en: 'Digital Products' }, range: '$300—$8K', desc: { ar: 'كورسات، PDF، تمبلتات', en: 'Courses, PDF, templates' }, req: { ar: 'خبرة + ثقة', en: 'Expertise + trust' } },
  { id: 'ecommerce', emoji: '📦', name: { ar: 'متجر إلكتروني', en: 'E-commerce' }, range: '$500—$15K', desc: { ar: 'منتجات مادية', en: 'Physical products' }, req: { ar: 'بزنس أكاونت', en: 'Business account' } },
  { id: 'subscription', emoji: '🔔', name: { ar: 'اشتراكات VIP', en: 'VIP Subscriptions' }, range: '$5—$50/m', desc: { ar: 'محتوى حصري مدفوع', en: 'Exclusive paid content' }, req: { ar: 'جمهور وفي', en: 'Loyal audience' } },
  { id: 'services', emoji: '🎨', name: { ar: 'خدمات احترافية', en: 'Professional Services' }, range: '$500—$5K', desc: { ar: 'كوتش، مصمم، مستشار', en: 'Coach, designer, consultant' }, req: { ar: 'بورتفوليو', en: 'Portfolio' } },
]

const NICHES = [
  { value: '1', label: { ar: '🎯 اختر النيش', en: '🎯 Select Niche' } },
  { value: '2.5', label: { ar: '💰 مال وأعمال ×2.5', en: '💰 Finance ×2.5' } },
  { value: '2.2', label: { ar: '💻 تقنية ×2.2', en: '💻 Tech ×2.2' } },
  { value: '1.8', label: { ar: '💪 لياقة ×1.8', en: '💪 Fitness ×1.8' } },
  { value: '1.5', label: { ar: '✈️ سفر ×1.5', en: '✈️ Travel ×1.5' } },
  { value: '1.3', label: { ar: '👗 موضة ×1.3', en: '👗 Fashion ×1.3' } },
]

const formatNumber = (n: number) => {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M'
  if (n >= 1000) return (n / 1000).toFixed(0) + 'K'
  return String(n)
}

export function RevenuePanel() {
  const { language } = useAppStore()
  const [selectedPath, setSelectedPath] = useState(REVENUE_PATHS[0].id)
  const [followers, setFollowers] = useState(50000)
  const [engagement, setEngagement] = useState(3)
  const [sponsoredPosts, setSponsoredPosts] = useState(2)
  const [nicheMultiplier, setNicheMultiplier] = useState('1')

  const revenue = useMemo(() => {
    const niche = parseFloat(nicheMultiplier)
    const baseRate = (followers / 1000) * 0.5
    const engagementBonus = engagement / 3

    const sponsoredRevenue = Math.round(sponsoredPosts * baseRate * niche * engagementBonus * 10)
    const affiliateRevenue = Math.round(followers * 0.001 * engagement * niche)
    const digitalRevenue = Math.round(followers * 0.0005 * engagement * niche * 5)

    const total = sponsoredRevenue + affiliateRevenue + digitalRevenue

    return {
      sponsored: sponsoredRevenue,
      affiliate: affiliateRevenue,
      digital: digitalRevenue,
      total
    }
  }, [followers, engagement, sponsoredPosts, nicheMultiplier])

  return (
    <div className="animate-in fade-in slide-in-from-bottom-3 duration-300">
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-xl font-black tracking-tight mb-1">
          💰 <span className="gradient-text">{language === 'ar' ? 'مسارات الربح' : 'Revenue Paths'}</span>
        </h1>
        <p className="text-sm text-muted-foreground">
          {language === 'ar' ? '6 مسارات مجربة — اختر واحسب أرباحك الفعلية' : '6 proven paths — choose and calculate your actual earnings'}
        </p>
      </div>

      {/* Revenue Paths Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-5">
        {REVENUE_PATHS.map((path) => (
          <button
            key={path.id}
            onClick={() => setSelectedPath(path.id)}
            className={cn(
              "glass-card rounded-2xl p-4 text-right transition-all duration-200 group relative overflow-hidden",
              selectedPath === path.id
                ? "border-primary/40 bg-primary/5"
                : "hover:-translate-y-1 hover:border-primary/30"
            )}
          >
            {selectedPath === path.id && (
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent" />
            )}
            
            <span className="text-3xl mb-2 block">{path.emoji}</span>
            <div className="text-sm font-bold mb-1">{path.name[language]}</div>
            <div className="text-base font-black text-gold mb-1">{path.range}</div>
            <div className="text-[10px] text-muted-foreground mb-2">{path.desc[language]}</div>
            <div className="text-[9px] text-green">✅ {path.req[language]}</div>
          </button>
        ))}
      </div>

      {/* Calculator */}
      <div className="glass-card rounded-2xl p-5">
        <div className="flex items-center gap-2.5 mb-5 text-sm font-bold">
          <span className="w-8 h-8 rounded-lg bg-gold/15 flex items-center justify-center text-base">🧮</span>
          {language === 'ar' ? 'حاسبة الأرباح المتقدمة' : 'Advanced Revenue Calculator'}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Inputs */}
          <div className="space-y-5">
            {/* Followers Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-muted-foreground font-semibold">👥 {language === 'ar' ? 'المتابعون' : 'Followers'}</span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-accent">
                  {formatNumber(followers)}
                </span>
              </div>
              <input
                type="range"
                min={1000}
                max={1000000}
                step={1000}
                value={followers}
                onChange={(e) => setFollowers(Number(e.target.value))}
                className="w-full h-1 bg-border rounded-full appearance-none cursor-pointer accent-primary [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-primary [&::-webkit-slider-thumb]:to-accent [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-primary/50 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-background"
              />
            </div>

            {/* Engagement Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-muted-foreground font-semibold">💬 {language === 'ar' ? 'التفاعل %' : 'Engagement %'}</span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-accent">
                  {engagement}%
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={15}
                step={0.5}
                value={engagement}
                onChange={(e) => setEngagement(Number(e.target.value))}
                className="w-full h-1 bg-border rounded-full appearance-none cursor-pointer accent-primary [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-primary [&::-webkit-slider-thumb]:to-accent [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-primary/50 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-background"
              />
            </div>

            {/* Sponsored Posts Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-muted-foreground font-semibold">🤝 {language === 'ar' ? 'منشورات مموّلة/شهر' : 'Sponsored Posts/Month'}</span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-accent">
                  {sponsoredPosts}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={20}
                step={1}
                value={sponsoredPosts}
                onChange={(e) => setSponsoredPosts(Number(e.target.value))}
                className="w-full h-1 bg-border rounded-full appearance-none cursor-pointer accent-primary [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-primary [&::-webkit-slider-thumb]:to-accent [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-primary/50 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-background"
              />
            </div>

            {/* Niche Select */}
            <select
              value={nicheMultiplier}
              onChange={(e) => setNicheMultiplier(e.target.value)}
              className="w-full bg-secondary border border-border text-foreground px-4 py-2.5 rounded-xl text-sm outline-none focus:border-primary/50 cursor-pointer appearance-none"
            >
              {NICHES.map((niche) => (
                <option key={niche.value} value={niche.value}>
                  {niche.label[language]}
                </option>
              ))}
            </select>
          </div>

          {/* Results */}
          <div className="bg-gradient-to-br from-primary/10 to-accent/5 border border-primary/20 rounded-xl p-5">
            {/* Total */}
            <div className="text-center mb-5 pb-5 border-b border-white/10">
              <div className="text-xs text-muted-foreground mb-1">
                {language === 'ar' ? 'الأرباح الشهرية الإجمالية' : 'Total Monthly Revenue'}
              </div>
              <div className="text-4xl font-black gradient-text">${revenue.total.toLocaleString()}</div>
            </div>

            {/* Breakdown */}
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-xs text-muted-foreground">🤝 {language === 'ar' ? 'إعلانات مموّلة' : 'Sponsored Posts'}</span>
                <span className="text-sm font-bold text-gold">${revenue.sponsored.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-xs text-muted-foreground">🛒 {language === 'ar' ? 'تسويق بالعمولة' : 'Affiliate Marketing'}</span>
                <span className="text-sm font-bold text-gold">${revenue.affiliate.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-xs text-muted-foreground">🎓 {language === 'ar' ? 'منتجات رقمية' : 'Digital Products'}</span>
                <span className="text-sm font-bold text-gold">${revenue.digital.toLocaleString()}</span>
              </div>
            </div>

            <button className="gradient-btn w-full py-3 rounded-xl text-white text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/30 hover:-translate-y-0.5 transition-all mt-5">
              <span className="relative z-10 flex items-center gap-2">
                📊 {language === 'ar' ? 'تصدير التقرير' : 'Export Report'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
