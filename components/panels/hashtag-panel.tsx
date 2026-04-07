'use client'

import { useState, useMemo } from 'react'
import { useAppStore } from '@/lib/store'
import { HASHTAG_DB } from '@/lib/data'
import { cn } from '@/lib/utils'
import { Search, Copy, Trash2 } from 'lucide-react'

const ALL_HASHTAGS = Object.values(HASHTAG_DB).flat()

const SIZE_COLORS = {
  mega: { bg: 'bg-destructive/10', border: 'border-destructive/20', text: 'text-destructive' },
  large: { bg: 'bg-orange/10', border: 'border-orange/20', text: 'text-orange' },
  med: { bg: 'bg-cyan/10', border: 'border-cyan/20', text: 'text-cyan' },
  niche: { bg: 'bg-green/10', border: 'border-green/20', text: 'text-green' },
}

export function HashtagPanel() {
  const { language } = useAppStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedNiche, setSelectedNiche] = useState('')
  const [sizeFilter, setSizeFilter] = useState<string | null>(null)
  const [selectedHashtags, setSelectedHashtags] = useState<typeof ALL_HASHTAGS>([])
  const [copied, setCopied] = useState(false)

  const filteredHashtags = useMemo(() => {
    let results = selectedNiche ? HASHTAG_DB[selectedNiche] || [] : ALL_HASHTAGS

    if (searchQuery) {
      results = results.filter(h => h.t.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    if (sizeFilter) {
      results = results.filter(h => h.s === sizeFilter)
    }

    return results
  }, [searchQuery, selectedNiche, sizeFilter])

  const toggleHashtag = (hashtag: typeof ALL_HASHTAGS[0]) => {
    if (selectedHashtags.find(h => h.t === hashtag.t)) {
      setSelectedHashtags(prev => prev.filter(h => h.t !== hashtag.t))
    } else if (selectedHashtags.length < 30) {
      setSelectedHashtags(prev => [...prev, hashtag])
    }
  }

  const copyHashtags = () => {
    const text = selectedHashtags.map(h => h.t).join(' ')
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const counts = useMemo(() => ({
    mega: selectedHashtags.filter(h => h.s === 'mega').length,
    med: selectedHashtags.filter(h => h.s === 'large' || h.s === 'med').length,
    niche: selectedHashtags.filter(h => h.s === 'niche').length,
  }), [selectedHashtags])

  return (
    <div className="animate-in fade-in slide-in-from-bottom-3 duration-300">
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-xl font-black tracking-tight mb-1">
          🔍 <span className="gradient-text">{language === 'ar' ? 'محلل الهاشتاق' : 'Hashtag Analyzer'}</span>
        </h1>
        <p className="text-sm text-muted-foreground">
          {language === 'ar' ? 'ابحث وأنشئ مجموعات هاشتاق مثلى لنيشك' : 'Search and create optimal hashtag sets for your niche'}
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Left Column - Search */}
        <div className="space-y-4">
          {/* Search Card */}
          <div className="glass-card rounded-2xl p-5">
            <div className="flex items-center gap-2.5 mb-4 text-sm font-bold">
              <span className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center text-base">🔎</span>
              {language === 'ar' ? 'البحث الذكي' : 'Smart Search'}
            </div>

            {/* Search Input */}
            <div className="relative mb-3">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'ar' ? '🔍 ابحث بالعربي أو الإنجليزي...' : '🔍 Search in any language...'}
                className="w-full bg-secondary border border-border text-foreground pr-10 pl-4 py-2.5 rounded-xl text-sm outline-none focus:border-primary/50 focus:bg-primary/5 transition-all placeholder:text-muted-foreground"
              />
            </div>

            {/* Niche Filter */}
            <select
              value={selectedNiche}
              onChange={(e) => setSelectedNiche(e.target.value)}
              className="w-full bg-secondary border border-border text-foreground px-4 py-2.5 rounded-xl text-sm outline-none focus:border-primary/50 cursor-pointer appearance-none mb-3"
            >
              <option value="">{language === 'ar' ? '📂 النيش' : '📂 Niche'}</option>
              <option value="fitness">{language === 'ar' ? '💪 لياقة' : '💪 Fitness'}</option>
              <option value="food">{language === 'ar' ? '🍔 طعام' : '🍔 Food'}</option>
              <option value="travel">{language === 'ar' ? '✈️ سفر' : '✈️ Travel'}</option>
              <option value="fashion">{language === 'ar' ? '👗 موضة' : '👗 Fashion'}</option>
              <option value="business">{language === 'ar' ? '📈 أعمال' : '📈 Business'}</option>
              <option value="beauty">{language === 'ar' ? '💄 جمال' : '💄 Beauty'}</option>
            </select>

            {/* Size Filters */}
            <div className="flex gap-2 flex-wrap mb-4">
              {[
                { key: 'mega', label: '🔴 +1M' },
                { key: 'large', label: '🟠 +500K' },
                { key: 'med', label: '🔵 +100K' },
                { key: 'niche', label: '🟢 +10K' }
              ].map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setSizeFilter(sizeFilter === filter.key ? null : filter.key)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-bold border transition-all",
                    sizeFilter === filter.key
                      ? "bg-primary/15 border-primary/35 text-accent"
                      : "bg-card border-border text-muted-foreground hover:border-primary/30"
                  )}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Results */}
            <div className="max-h-48 overflow-y-auto">
              {filteredHashtags.length === 0 ? (
                <div className="text-center py-6 text-sm text-muted-foreground">
                  {language === 'ar' ? 'ابدأ بالبحث أو اختر تصفية' : 'Start searching or select a filter'}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {filteredHashtags.map((hashtag) => {
                    const isSelected = selectedHashtags.find(h => h.t === hashtag.t)
                    const colors = SIZE_COLORS[hashtag.s]
                    return (
                      <button
                        key={hashtag.t}
                        onClick={() => toggleHashtag(hashtag)}
                        className={cn(
                          "px-2.5 py-1 rounded-lg text-xs font-bold border transition-all",
                          isSelected
                            ? "bg-primary/20 border-primary/40 text-accent"
                            : cn(colors.bg, colors.border, colors.text, "hover:opacity-80")
                        )}
                      >
                        {hashtag.t} <span className="opacity-60">{hashtag.c}</span>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Strategy Card */}
          <div className="glass-card rounded-2xl p-5">
            <div className="flex items-center gap-2.5 mb-4 text-sm font-bold">
              <span className="w-8 h-8 rounded-lg bg-orange/15 flex items-center justify-center text-base">📊</span>
              {language === 'ar' ? 'استراتيجية الـ 30 هاشتاق' : '30 Hashtag Strategy'}
            </div>

            <div className="bg-secondary/50 rounded-xl p-3 mb-4 text-center">
              <span className="text-lg font-black gradient-text">30</span>
              <span className="text-sm text-muted-foreground"> = </span>
              <span className="text-sm font-bold text-destructive">10</span>
              <span className="text-xs text-muted-foreground"> {language === 'ar' ? 'ميغا' : 'Mega'} + </span>
              <span className="text-sm font-bold text-cyan">10</span>
              <span className="text-xs text-muted-foreground"> {language === 'ar' ? 'متوسط' : 'Medium'} + </span>
              <span className="text-sm font-bold text-green">10</span>
              <span className="text-xs text-muted-foreground"> {language === 'ar' ? 'نيش' : 'Niche'}</span>
            </div>

            <div className="space-y-2">
              <div className="flex gap-3 p-3 bg-secondary/50 rounded-xl">
                <span className="text-lg">🎯</span>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">{language === 'ar' ? 'المزيج الذهبي:' : 'Golden Mix:'}</strong> {language === 'ar' ? 'تنوع الأحجام يضمن الوصول لأكبر جمهور.' : 'Size diversity ensures maximum audience reach.'}
                </p>
              </div>
              <div className="flex gap-3 p-3 bg-secondary/50 rounded-xl">
                <span className="text-lg">⚠️</span>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">{language === 'ar' ? 'غيّر المجموعة' : 'Change the set'}</strong> {language === 'ar' ? 'كل 5-7 منشورات تجنباً لعقوبة spam.' : 'every 5-7 posts to avoid spam penalties.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Selected */}
        <div className="glass-card rounded-2xl p-5 flex flex-col">
          <div className="flex items-center gap-2.5 mb-4 text-sm font-bold">
            <span className="w-8 h-8 rounded-lg bg-gold/15 flex items-center justify-center text-base">📋</span>
            {language === 'ar' ? 'مجموعتك' : 'Your Set'} (<span className="text-accent">{selectedHashtags.length}</span>/30)
          </div>

          {/* Counts */}
          <div className="flex gap-2 mb-4">
            <div className="flex-1 text-center bg-primary/10 rounded-lg p-2 border border-primary/20">
              <div className="text-base font-black text-accent">{counts.mega}</div>
              <div className="text-[9px] text-muted-foreground">{language === 'ar' ? 'ميغا' : 'Mega'}</div>
            </div>
            <div className="flex-1 text-center bg-cyan/10 rounded-lg p-2 border border-cyan/20">
              <div className="text-base font-black text-cyan">{counts.med}</div>
              <div className="text-[9px] text-muted-foreground">{language === 'ar' ? 'متوسط' : 'Medium'}</div>
            </div>
            <div className="flex-1 text-center bg-green/10 rounded-lg p-2 border border-green/20">
              <div className="text-base font-black text-green">{counts.niche}</div>
              <div className="text-[9px] text-muted-foreground">{language === 'ar' ? 'نيش' : 'Niche'}</div>
            </div>
          </div>

          {/* Selected Hashtags */}
          <div className="flex-1 min-h-[120px] mb-4">
            {selectedHashtags.length === 0 ? (
              <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                👆 {language === 'ar' ? 'اضغط على الهاشتاقات لإضافتها' : 'Click hashtags to add them'}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {selectedHashtags.map((hashtag) => {
                  const colors = SIZE_COLORS[hashtag.s]
                  return (
                    <button
                      key={hashtag.t}
                      onClick={() => toggleHashtag(hashtag)}
                      className={cn(
                        "px-2.5 py-1 rounded-lg text-xs font-bold border transition-all hover:opacity-70",
                        colors.bg, colors.border, colors.text
                      )}
                    >
                      {hashtag.t} ×
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* Progress */}
          <div className="mb-4">
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-muted-foreground">{language === 'ar' ? 'اكتمال المجموعة' : 'Set Completion'}</span>
              <span className="text-orange font-bold">{Math.round((selectedHashtags.length / 30) * 100)}%</span>
            </div>
            <div className="h-1 bg-border rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                style={{ width: `${(selectedHashtags.length / 30) * 100}%` }}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={copyHashtags}
              disabled={selectedHashtags.length === 0}
              className="gradient-btn flex-1 py-3 rounded-xl text-white text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/30 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Copy className="w-4 h-4" />
                {copied ? (language === 'ar' ? 'تم النسخ!' : 'Copied!') : (language === 'ar' ? 'نسخ الكل' : 'Copy All')}
              </span>
            </button>
            <button
              onClick={() => setSelectedHashtags([])}
              disabled={selectedHashtags.length === 0}
              className="px-4 py-3 rounded-xl border border-border bg-card text-muted-foreground hover:border-destructive/50 hover:text-destructive transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
