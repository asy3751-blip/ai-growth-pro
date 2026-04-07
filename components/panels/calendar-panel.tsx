'use client'

import { useState } from 'react'
import { useAppStore } from '@/lib/store'
import { cn } from '@/lib/utils'

const CALENDAR_DATA = [
  { day: 1, type: 'reels', icon: '🎬', color: 'bg-primary/20 border-primary/30' },
  { day: 2, type: 'story', icon: '⭕', color: 'bg-orange/20 border-orange/30' },
  { day: 3, type: 'post', icon: '📷', color: 'bg-cyan/20 border-cyan/30' },
  { day: 5, type: 'reels', icon: '🎬', color: 'bg-primary/20 border-primary/30' },
  { day: 6, type: 'story', icon: '⭕', color: 'bg-orange/20 border-orange/30' },
  { day: 7, type: 'carousel', icon: '🖼️', color: 'bg-green/20 border-green/30' },
  { day: 8, type: 'reels', icon: '🎬', color: 'bg-primary/20 border-primary/30' },
  { day: 9, type: 'story', icon: '⭕', color: 'bg-orange/20 border-orange/30' },
  { day: 10, type: 'post', icon: '📷', color: 'bg-cyan/20 border-cyan/30' },
  { day: 12, type: 'reels', icon: '🎬', color: 'bg-primary/20 border-primary/30' },
  { day: 13, type: 'carousel', icon: '🖼️', color: 'bg-green/20 border-green/30' },
  { day: 15, type: 'reels', icon: '🎬', color: 'bg-primary/20 border-primary/30' },
  { day: 16, type: 'story', icon: '⭕', color: 'bg-orange/20 border-orange/30' },
  { day: 17, type: 'live', icon: '🔴', color: 'bg-destructive/20 border-destructive/30' },
  { day: 19, type: 'reels', icon: '🎬', color: 'bg-primary/20 border-primary/30' },
  { day: 20, type: 'carousel', icon: '🖼️', color: 'bg-green/20 border-green/30' },
  { day: 22, type: 'reels', icon: '🎬', color: 'bg-primary/20 border-primary/30' },
  { day: 23, type: 'story', icon: '⭕', color: 'bg-orange/20 border-orange/30' },
  { day: 24, type: 'post', icon: '📷', color: 'bg-cyan/20 border-cyan/30' },
  { day: 26, type: 'reels', icon: '🎬', color: 'bg-primary/20 border-primary/30' },
  { day: 27, type: 'carousel', icon: '🖼️', color: 'bg-green/20 border-green/30' },
  { day: 28, type: 'live', icon: '🔴', color: 'bg-destructive/20 border-destructive/30' },
  { day: 29, type: 'reels', icon: '🎬', color: 'bg-primary/20 border-primary/30' },
  { day: 30, type: 'story', icon: '⭕', color: 'bg-orange/20 border-orange/30' },
  { day: 31, type: 'post', icon: '📷', color: 'bg-cyan/20 border-cyan/30' },
]

const DAY_DETAILS: Record<number, { type: string; time: string; topic: { ar: string; en: string }; hook: { ar: string; en: string }; cta: { ar: string; en: string } }> = {
  1: { type: '🎬 Reels', time: '7:00 PM', topic: { ar: 'محتوى ترفيهي في نيشك', en: 'Entertainment content in your niche' }, hook: { ar: 'افتح بسؤال يوقف التمرير', en: 'Open with a scroll-stopping question' }, cta: { ar: 'احفظ هذا الريلز', en: 'Save this reel' } },
  5: { type: '🎬 Reels', time: '6:00 PM', topic: { ar: '5 نصائح في 60 ثانية', en: '5 tips in 60 seconds' }, hook: { ar: 'رقم 3 سيفاجئك!', en: 'Number 3 will surprise you!' }, cta: { ar: 'شارك مع شخص يحتاج', en: 'Share with someone who needs this' } },
  7: { type: '🖼️ Carousel', time: '7:00 PM', topic: { ar: 'دليل خطوة بخطوة', en: 'Step-by-step guide' }, hook: { ar: 'اسحب لليمين', en: 'Swipe right' }, cta: { ar: 'احفظ للرجوع إليه', en: 'Save for later' } },
  17: { type: '🔴 Live', time: '8:00 PM', topic: { ar: 'جلسة أسئلة وأجوبة', en: 'Q&A Session' }, hook: { ar: 'اطرح سؤالك في التعليقات', en: 'Drop your question in comments' }, cta: { ar: 'فعّل الإشعارات', en: 'Turn on notifications' } },
}

const WEEK_DAYS = {
  ar: ['أح', 'إث', 'ثل', 'أر', 'خم', 'جم', 'سب'],
  en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
}

export function CalendarPanel() {
  const { language } = useAppStore()
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  
  const calendarMap = new Map(CALENDAR_DATA.map(d => [d.day, d]))
  const dayDetails = selectedDay ? DAY_DETAILS[selectedDay] : null
  const weekDays = WEEK_DAYS[language]

  // Generate calendar grid (31 days, starting from Saturday)
  const daysInMonth = 31
  const startOffset = 6 // Month starts on Saturday (index 6)
  const totalCells = startOffset + daysInMonth
  const cells = Array.from({ length: Math.ceil(totalCells / 7) * 7 }, (_, i) => {
    const dayNum = i - startOffset + 1
    if (dayNum < 1 || dayNum > daysInMonth) return null
    return dayNum
  })

  return (
    <div className="animate-in fade-in slide-in-from-bottom-3 duration-300">
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-xl font-black tracking-tight mb-1">
          📅 <span className="gradient-text">{language === 'ar' ? 'جدول النشر' : 'Content Calendar'}</span>
        </h1>
        <p className="text-sm text-muted-foreground">
          {language === 'ar' ? 'خطط محتواك الشهري بذكاء ودقة' : 'Plan your monthly content with precision'}
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Calendar */}
        <div className="glass-card rounded-2xl p-5">
          <div className="flex items-center gap-2.5 mb-4 text-sm font-bold">
            <span className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center text-base">📆</span>
            {language === 'ar' ? 'مارس 2025' : 'March 2025'}
          </div>

          {/* Week days header */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((day) => (
              <div key={day} className="text-center text-[10px] font-bold text-muted-foreground py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {cells.map((day, i) => {
              if (day === null) {
                return <div key={i} className="aspect-square" />
              }

              const calDay = calendarMap.get(day)
              const isSelected = selectedDay === day
              const hasContent = !!calDay

              return (
                <button
                  key={i}
                  onClick={() => setSelectedDay(day)}
                  className={cn(
                    "aspect-square rounded-lg text-xs font-bold flex flex-col items-center justify-center gap-0.5 transition-all relative",
                    isSelected && "ring-2 ring-primary ring-offset-2 ring-offset-background",
                    hasContent ? calDay.color : "bg-secondary/50 hover:bg-secondary"
                  )}
                >
                  {day}
                  {hasContent && (
                    <span className="text-[8px]">{calDay.icon}</span>
                  )}
                </button>
              )
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-3 mt-4 text-[10px]">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-primary/20 border border-primary/30" />
              <span>🎬 Reels</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-green/20 border border-green/30" />
              <span>🖼️ Carousel</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-orange/20 border border-orange/30" />
              <span>⭕ Story</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-cyan/20 border border-cyan/30" />
              <span>📷 Post</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-destructive/20 border border-destructive/30" />
              <span>🔴 Live</span>
            </div>
          </div>
        </div>

        {/* Day Details */}
        <div className="space-y-4">
          {/* Selected Day Details */}
          <div className="glass-card rounded-2xl p-5">
            <div className="flex items-center gap-2.5 mb-4 text-sm font-bold">
              <span className="w-8 h-8 rounded-lg bg-gold/15 flex items-center justify-center text-base">📝</span>
              {language === 'ar' ? 'تفاصيل اليوم' : 'Day Details'}
            </div>

            {selectedDay && dayDetails ? (
              <div className="space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black gradient-text">{selectedDay} {language === 'ar' ? 'مارس' : 'March'}</span>
                  <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-accent text-xs font-bold">
                    {dayDetails.type}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="p-3 bg-secondary/50 rounded-xl">
                    <div className="text-[10px] text-muted-foreground mb-1">⏰ {language === 'ar' ? 'وقت النشر' : 'Post Time'}</div>
                    <div className="text-sm font-bold">{dayDetails.time}</div>
                  </div>

                  <div className="p-3 bg-secondary/50 rounded-xl">
                    <div className="text-[10px] text-muted-foreground mb-1">📌 {language === 'ar' ? 'الموضوع' : 'Topic'}</div>
                    <div className="text-sm font-bold">{dayDetails.topic[language]}</div>
                  </div>

                  <div className="p-3 bg-secondary/50 rounded-xl">
                    <div className="text-[10px] text-muted-foreground mb-1">🪝 {language === 'ar' ? 'الهوك' : 'Hook'}</div>
                    <div className="text-sm font-bold">{dayDetails.hook[language]}</div>
                  </div>

                  <div className="p-3 bg-secondary/50 rounded-xl">
                    <div className="text-[10px] text-muted-foreground mb-1">📣 CTA</div>
                    <div className="text-sm font-bold">{dayDetails.cta[language]}</div>
                  </div>
                </div>
              </div>
            ) : selectedDay ? (
              <div className="text-center py-8 text-sm text-muted-foreground">
                {language === 'ar' ? 'لا يوجد محتوى مجدول لهذا اليوم' : 'No content scheduled for this day'}
              </div>
            ) : (
              <div className="text-center py-8 text-sm text-muted-foreground">
                👆 {language === 'ar' ? 'اختر يوماً لعرض التفاصيل' : 'Select a day to view details'}
              </div>
            )}
          </div>

          {/* Monthly Stats */}
          <div className="glass-card rounded-2xl p-5">
            <div className="flex items-center gap-2.5 mb-4 text-sm font-bold">
              <span className="w-8 h-8 rounded-lg bg-green/15 flex items-center justify-center text-base">📊</span>
              {language === 'ar' ? 'إحصائيات الشهر' : 'Monthly Stats'}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-primary/10 rounded-xl border border-primary/20">
                <div className="text-2xl font-black text-accent">25</div>
                <div className="text-[10px] text-muted-foreground">{language === 'ar' ? 'إجمالي المنشورات' : 'Total Posts'}</div>
              </div>
              <div className="text-center p-3 bg-destructive/10 rounded-xl border border-destructive/20">
                <div className="text-2xl font-black text-destructive">12</div>
                <div className="text-[10px] text-muted-foreground">{language === 'ar' ? 'ريلز' : 'Reels'}</div>
              </div>
              <div className="text-center p-3 bg-green/10 rounded-xl border border-green/20">
                <div className="text-2xl font-black text-green">5</div>
                <div className="text-[10px] text-muted-foreground">{language === 'ar' ? 'كاروسيل' : 'Carousels'}</div>
              </div>
              <div className="text-center p-3 bg-orange/10 rounded-xl border border-orange/20">
                <div className="text-2xl font-black text-orange">2</div>
                <div className="text-[10px] text-muted-foreground">{language === 'ar' ? 'بث مباشر' : 'Lives'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
