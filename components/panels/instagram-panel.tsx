'use client'

import { useState } from 'react'
import { useAppStore } from '@/lib/store'
import { cn } from '@/lib/utils'

const formatNumber = (n: number) => {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M'
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K'
  return String(n)
}

const CONTENT_TYPES = [
  { id: 'reels', icon: '🎬', name: { ar: 'Reels', en: 'Reels' }, desc: { ar: '15-90s — ملك الخوارزمية', en: '15-90s — Algorithm King' }, badge: '3x' },
  { id: 'carousel', icon: '🖼️', name: { ar: 'Carousel', en: 'Carousel' }, desc: { ar: 'أعلى معدل حفظ', en: 'Highest save rate' }, badge: '2x' },
  { id: 'story', icon: '⭕', name: { ar: 'Story', en: 'Story' }, desc: { ar: 'الأفضل للمبيعات', en: 'Best for sales' }, badge: '4x' },
  { id: 'live', icon: '🔴', name: { ar: 'Live', en: 'Live' }, desc: { ar: 'يبني الثقة الحقيقية', en: 'Builds real trust' }, badge: '5x' },
]

const PEAK_TIMES = {
  ar: {
    monday: ['6ص', '7ص', '8ص', '9ص', '10ص', '11ص', '12م', '2م', '5م', '7م', '8م', '9م'],
    friday: ['6ص', '7ص', '9ص', '10ص', '12م', '2م', '4م', '6م', '8م', '9م', '10م', '11م'],
    heat: [[0, 1, 2, 2, 1, 0, 0, 0, 1, 2, 2, 1], [0, 0, 1, 2, 2, 2, 1, 1, 2, 2, 1, 0]]
  },
  en: {
    monday: ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '2pm', '5pm', '7pm', '8pm', '9pm'],
    friday: ['6am', '7am', '9am', '10am', '12pm', '2pm', '4pm', '6pm', '8pm', '9pm', '10pm', '11pm'],
    heat: [[0, 1, 2, 2, 1, 0, 0, 0, 1, 2, 2, 1], [0, 0, 1, 2, 2, 2, 1, 1, 2, 2, 1, 0]]
  }
}

export function InstagramPanel() {
  const { language } = useAppStore()
  const [followers, setFollowers] = useState(12500)
  const [postsPerWeek, setPostsPerWeek] = useState(5)
  const [reelsRatio, setReelsRatio] = useState(60)
  const [contentQuality, setContentQuality] = useState(7)
  const [dailyEngagement, setDailyEngagement] = useState(2)
  const [selectedContentType, setSelectedContentType] = useState('reels')
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState({
    monthlyGrowth: 0,
    futureFollowers: 0,
    engagementRate: 0,
    potentialRevenue: 0,
    score: 0
  })

  const runSimulation = () => {
    const baseGrowth = 0.02
    const reelsBonus = (reelsRatio / 100) * 0.03
    const qualityMultiplier = contentQuality / 10
    const postingBonus = Math.min(postsPerWeek / 7, 1) * 0.02
    const engagementBonus = (dailyEngagement / 8) * 0.015

    const monthlyGrowthRate = (baseGrowth + reelsBonus + postingBonus + engagementBonus) * qualityMultiplier
    const monthlyGrowth = Math.round(monthlyGrowthRate * 100)

    let futureFollowers = followers
    for (let i = 0; i < 6; i++) {
      futureFollowers = Math.round(futureFollowers * (1 + monthlyGrowthRate))
    }

    const baseEngagement = 3
    const engagementRate = Math.min(baseEngagement + (contentQuality * 0.3) + (dailyEngagement * 0.2), 8)

    const cpm = 20
    const potentialRevenue = Math.round((futureFollowers / 1000) * cpm * (engagementRate / 3))

    const score = Math.min(Math.round(
      (contentQuality * 10) +
      (Math.min(postsPerWeek, 7) / 7 * 30) +
      (reelsRatio / 100 * 20) +
      (dailyEngagement / 4 * 20) +
      (engagementRate * 2.5)
    ), 100)

    setResults({
      monthlyGrowth,
      futureFollowers,
      engagementRate: Math.round(engagementRate * 10) / 10,
      potentialRevenue,
      score
    })
    setShowResults(true)
  }

  const times = PEAK_TIMES[language]

  return (
    <div className="animate-in fade-in slide-in-from-bottom-3 duration-300">
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-xl font-black tracking-tight mb-1">
          📱 <span className="gradient-text">{language === 'ar' ? 'محاكي النمو' : 'Growth Simulator'}</span>
        </h1>
        <p className="text-sm text-muted-foreground">
          {language === 'ar' ? 'محاكي ذكي لنمو حسابك وأرباحك بدقة احترافية' : 'Smart simulator for your account growth and revenue'}
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Left Column - Simulator */}
        <div className="glass-card rounded-2xl p-5 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="flex items-center gap-2.5 mb-5 text-sm font-bold">
            <span className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center text-base">⚙️</span>
            {language === 'ar' ? 'المحاكي الذكي' : 'Smart Simulator'}
          </div>

          {/* Sliders */}
          {[
            { label: language === 'ar' ? 'المتابعون' : 'Followers', icon: '👥', value: followers, setValue: setFollowers, min: 1000, max: 500000, step: 500, format: formatNumber },
            { label: language === 'ar' ? 'منشورات/أسبوع' : 'Posts/Week', icon: '📅', value: postsPerWeek, setValue: setPostsPerWeek, min: 1, max: 21, step: 1, format: String },
            { label: language === 'ar' ? 'نسبة الريلز' : 'Reels Ratio', icon: '🎬', value: reelsRatio, setValue: setReelsRatio, min: 0, max: 100, step: 5, format: (v: number) => v + '%' },
            { label: language === 'ar' ? 'جودة المحتوى' : 'Content Quality', icon: '✨', value: contentQuality, setValue: setContentQuality, min: 1, max: 10, step: 1, format: (v: number) => v + '/10' },
            { label: language === 'ar' ? 'تفاعل يومي' : 'Daily Engagement', icon: '💬', value: dailyEngagement, setValue: setDailyEngagement, min: 0, max: 8, step: 1, format: (v: number) => v + 'h' }
          ].map((slider, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-muted-foreground font-semibold">
                  {slider.icon} {slider.label}
                </span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-accent">
                  {slider.format(slider.value)}
                </span>
              </div>
              <input
                type="range"
                min={slider.min}
                max={slider.max}
                step={slider.step}
                value={slider.value}
                onChange={(e) => slider.setValue(Number(e.target.value))}
                className="w-full h-1 bg-border rounded-full appearance-none cursor-pointer accent-primary [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-primary [&::-webkit-slider-thumb]:to-accent [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-primary/50 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-background [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:transition-transform"
              />
            </div>
          ))}

          {/* Run Button */}
          <button
            onClick={runSimulation}
            className="gradient-btn w-full py-3 rounded-xl text-white text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/30 hover:-translate-y-0.5 transition-all mt-2"
          >
            <span className="relative z-10 flex items-center gap-2">
              🚀 {language === 'ar' ? 'تشغيل المحاكاة' : 'Run Simulation'}
            </span>
          </button>

          {/* Results */}
          {showResults && (
            <div className="mt-5 bg-gradient-to-br from-primary/10 to-accent/5 border border-primary/20 rounded-xl p-4 animate-in fade-in slide-in-from-bottom-2">
              {[
                { label: language === 'ar' ? '📈 نمو شهري' : '📈 Monthly Growth', value: `+${results.monthlyGrowth}%`, color: 'text-green' },
                { label: language === 'ar' ? '👥 بعد 6 أشهر' : '👥 After 6 Months', value: formatNumber(results.futureFollowers), color: 'text-accent' },
                { label: language === 'ar' ? '💬 معدل التفاعل' : '💬 Engagement Rate', value: `${results.engagementRate}%`, color: 'text-orange' },
                { label: language === 'ar' ? '💰 أرباح محتملة' : '💰 Potential Revenue', value: `$${results.potentialRevenue}`, color: 'text-gold' },
                { label: language === 'ar' ? '⚡ نقاط الأداء' : '⚡ Performance Score', value: `${results.score}/100`, color: 'text-accent' }
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                  <span className={cn("text-sm font-bold", item.color)}>{item.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Content Types */}
          <div className="glass-card rounded-2xl p-5">
            <div className="flex items-center gap-2.5 mb-4 text-sm font-bold">
              <span className="w-8 h-8 rounded-lg bg-pink/15 flex items-center justify-center text-base">🎬</span>
              {language === 'ar' ? 'أنواع المحتوى' : 'Content Types'}
            </div>

            <div className="space-y-2">
              {CONTENT_TYPES.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedContentType(type.id)}
                  className={cn(
                    "w-full flex items-center gap-3 p-3 rounded-xl border transition-all",
                    selectedContentType === type.id
                      ? "bg-primary/10 border-primary/30"
                      : "bg-card border-border hover:border-primary/20"
                  )}
                >
                  <span className="text-2xl">{type.icon}</span>
                  <div className="flex-1 text-right">
                    <div className="text-sm font-bold">{type.name[language]}</div>
                    <div className="text-[10px] text-muted-foreground">{type.desc[language]}</div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-accent">
                    {type.badge} {language === 'ar' ? 'وصول' : 'reach'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Peak Times */}
          <div className="glass-card rounded-2xl p-5">
            <div className="flex items-center gap-2.5 mb-4 text-sm font-bold">
              <span className="w-8 h-8 rounded-lg bg-gold/15 flex items-center justify-center text-base">⏰</span>
              {language === 'ar' ? 'أوقات الذروة' : 'Peak Times'}
            </div>

            <div className="space-y-3 overflow-x-auto">
              {['monday', 'friday'].map((day, dayIndex) => (
                <div key={day} className="flex items-center gap-2 min-w-[440px]">
                  <div className="text-[10px] text-muted-foreground w-14 flex-shrink-0">
                    {language === 'ar' ? (day === 'monday' ? 'الإثنين' : 'الجمعة') : (day === 'monday' ? 'Monday' : 'Friday')}
                  </div>
                  <div className="flex gap-1 flex-1">
                    {times[day as 'monday' | 'friday'].map((time, i) => {
                      const heat = times.heat[dayIndex][i]
                      return (
                        <div
                          key={i}
                          className={cn(
                            "flex-1 py-1 rounded text-[8px] text-center font-bold transition-colors",
                            heat === 2 && "bg-primary/20 border border-primary/30 text-accent",
                            heat === 1 && "bg-orange/15 border border-orange/25 text-orange",
                            heat === 0 && "bg-border text-muted-foreground"
                          )}
                        >
                          {time}
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4 mt-4 text-[10px] flex-wrap">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded bg-primary/20 border border-primary/30" />
                {language === 'ar' ? 'ذروة' : 'Peak'}
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded bg-orange/15 border border-orange/25" />
                {language === 'ar' ? 'جيد' : 'Good'}
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded bg-border" />
                {language === 'ar' ? 'منخفض' : 'Low'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
