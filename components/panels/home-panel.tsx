'use client'

import { useAppStore } from '@/lib/store'
import { TRANSLATIONS, AI_TOOLS } from '@/lib/data'

const TIPS = {
  ar: [
    { icon: '🔥', text: 'الريلز = 3x وصول مقارنة بالبوست في الخوارزمية الحالية.' },
    { icon: '✨', text: 'استخدم أدوات AI لتوليد محتوى متسق كل يوم بدون إرهاق إبداعي.' },
    { icon: '💰', text: '10K متابع يكفي لبدء الربح — الجودة أهم من العدد.' }
  ],
  en: [
    { icon: '🔥', text: 'Reels = 3x reach compared to posts in the current algorithm.' },
    { icon: '✨', text: 'Use AI tools to generate consistent content every day without creative burnout.' },
    { icon: '💰', text: '10K followers is enough to start earning — quality over quantity.' }
  ]
}

export function HomePanel() {
  const { language, setActivePanel } = useAppStore()
  const t = TRANSLATIONS[language]
  const tips = TIPS[language]
  const featuredTools = AI_TOOLS.slice(0, 4)

  return (
    <div className="animate-in fade-in slide-in-from-bottom-3 duration-300">
      {/* Hero Section */}
      <div className="relative p-6 bg-gradient-to-br from-primary/10 to-accent/5 border border-primary/20 rounded-2xl mb-5 overflow-hidden">
        <div className="absolute -top-12 -right-12 w-56 h-56 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative">
          <span className="inline-flex items-center gap-1.5 bg-primary/15 border border-primary/25 rounded-full px-3 py-1 text-[11px] font-bold text-accent mb-3">
            <span>✦</span>
            {language === 'ar' ? 'منصة النمو الذكية' : 'Smart Growth Platform'}
          </span>

          <h1 className="text-xl font-black leading-tight mb-2">
            {language === 'ar' ? (
              <>حوّل حسابك إلى <span className="gradient-text">ماكينة أرباح</span></>
            ) : (
              <>Transform your account into a <span className="gradient-text">profit machine</span></>
            )}
          </h1>

          <p className="text-sm text-muted-foreground mb-4 leading-relaxed max-w-xl">
            {language === 'ar' 
              ? '16 أداة AI متقدمة + محاكي نمو + محلل هاشتاقات + جدول نشر ذكي. كل ما تحتاجه لتحقيق 10K متابع وأرباح شهرية.'
              : '16 advanced AI tools + growth simulator + hashtag analyzer + smart posting schedule. Everything you need to reach 10K followers and monthly revenue.'}
          </p>

          <div className="flex gap-6 flex-wrap">
            <div className="text-center">
              <div className="text-xl font-black text-accent">16+</div>
              <div className="text-[10px] text-muted-foreground">{t.aiTools}</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-black text-accent">$2,400</div>
              <div className="text-[10px] text-muted-foreground">{t.potential}</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-black text-accent">24/7</div>
              <div className="text-[10px] text-muted-foreground">{language === 'ar' ? 'متاح دائماً' : 'Always Available'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {[
          { icon: '👥', value: '12.5K', label: t.followers, change: '+340/' + (language === 'ar' ? 'أسبوع' : 'week'), onClick: () => setActivePanel('insta') },
          { icon: '💬', value: '4.2%', label: t.engagement, change: t.aboveAverage + ' ✓', onClick: () => setActivePanel('insta') },
          { icon: '✨', value: '16', label: t.aiTools, change: t.allAvailable + ' ✓', onClick: () => setActivePanel('ai') },
          { icon: '💵', value: '$780', label: t.monthlyRevenue, change: t.potential + ' $2,400', onClick: () => setActivePanel('money') }
        ].map((stat, i) => (
          <button
            key={i}
            onClick={stat.onClick}
            className="glass-card relative rounded-2xl p-4 text-right hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all duration-200 cursor-pointer group"
          >
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent rounded-t-2xl" />
            <span className="absolute top-3 right-3 text-xl opacity-10 group-hover:opacity-20 transition-opacity">{stat.icon}</span>
            <div className="text-2xl font-black gradient-text leading-none mb-1">{stat.value}</div>
            <div className="text-xs text-muted-foreground font-bold">{stat.label}</div>
            <div className="text-[10px] text-green mt-1">▲ {stat.change}</div>
          </button>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Left Column */}
        <div className="space-y-4">
          {/* Featured Tools */}
          <div className="glass-card rounded-2xl p-5">
            <div className="flex items-center gap-2.5 mb-4 text-sm font-bold">
              <span className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center text-base">✨</span>
              {t.featuredTools}
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {featuredTools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => setActivePanel('ai')}
                  className="glass-card rounded-xl p-3 text-right hover:-translate-y-1 hover:border-primary/30 transition-all duration-200 group"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-2xl">{tool.emoji}</span>
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-accent">
                      {tool.badge[language]}
                    </span>
                  </div>
                  <div className="text-xs font-bold mb-1">{tool.name[language]}</div>
                  <div className="text-[10px] text-muted-foreground line-clamp-2">{tool.desc[language]}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Expert Tips */}
          <div className="glass-card rounded-2xl p-5">
            <div className="flex items-center gap-2.5 mb-4 text-sm font-bold">
              <span className="w-8 h-8 rounded-lg bg-gold/15 flex items-center justify-center text-base">💡</span>
              {t.expertTips}
            </div>

            <div className="space-y-3">
              {tips.map((tip, i) => (
                <div key={i} className="flex gap-3 p-3 bg-secondary/50 rounded-xl">
                  <span className="text-lg">{tip.icon}</span>
                  <p className="text-xs text-muted-foreground leading-relaxed">{tip.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Account Score */}
          <div className="glass-card rounded-2xl p-5">
            <div className="flex items-center gap-2.5 mb-4 text-sm font-bold">
              <span className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center text-base">🎯</span>
              {t.accountScore}
            </div>

            <div className="flex justify-center mb-4">
              <div className="relative w-28 h-28">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-border"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="url(#scoreGradient)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${65 * 2.83} ${100 * 2.83}`}
                  />
                  <defs>
                    <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="oklch(0.55 0.25 285)" />
                      <stop offset="50%" stopColor="oklch(0.65 0.2 285)" />
                      <stop offset="100%" stopColor="oklch(0.75 0.18 285)" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-black gradient-text">65</span>
                  <span className="text-[10px] text-muted-foreground">/ 100</span>
                </div>
              </div>
            </div>

            {/* Progress bars */}
            {[
              { label: t.contentQuality, value: 70, icon: '✨' },
              { label: t.consistency, value: 60, icon: '📅' },
              { label: t.engagement, value: 55, icon: '💬' }
            ].map((item, i) => (
              <div key={i} className="mb-3 last:mb-0">
                <div className="flex justify-between mb-1.5 text-xs">
                  <span className="text-muted-foreground">{item.icon} {item.label}</span>
                  <span className="text-orange font-bold">{item.value}%</span>
                </div>
                <div className="h-1 bg-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000"
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Growth Chart Placeholder */}
          <div className="glass-card rounded-2xl p-5">
            <div className="flex items-center gap-2.5 mb-4 text-sm font-bold">
              <span className="w-8 h-8 rounded-lg bg-green/15 flex items-center justify-center text-base">📈</span>
              {t.growthChart}
            </div>

            <div className="h-32 flex items-end justify-between gap-2 px-2">
              {[30, 45, 40, 60, 55, 75, 70, 85, 80, 95, 90, 100].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-primary to-accent rounded-t opacity-70 hover:opacity-100 transition-opacity"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <div className="flex justify-between mt-2 text-[9px] text-muted-foreground px-1">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
