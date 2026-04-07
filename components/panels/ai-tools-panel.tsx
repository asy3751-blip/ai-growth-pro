'use client'

import { useState, useCallback } from 'react'
import { useAppStore } from '@/lib/store'
import { AI_TOOLS, CATEGORIES, type Tool, type ToolField } from '@/lib/data'
import { cn } from '@/lib/utils'
import { X, Copy, RefreshCw, ChevronLeft } from 'lucide-react'

const COLOR_MAP: Record<string, string> = {
  'v-purple': 'bg-primary/15 border-primary/25 text-accent',
  'v-pink': 'bg-pink/15 border-pink/25 text-pink',
  'v-cyan': 'bg-cyan/15 border-cyan/25 text-cyan',
  'v-green': 'bg-green/15 border-green/25 text-green',
  'v-orange': 'bg-orange/15 border-orange/25 text-orange',
  'v-gold': 'bg-gold/15 border-gold/25 text-gold',
  'v-teal': 'bg-teal/15 border-teal/25 text-teal',
  'v-red': 'bg-destructive/15 border-destructive/25 text-destructive',
}

const ICON_BG_MAP: Record<string, string> = {
  'v-purple': 'bg-primary/15',
  'v-pink': 'bg-pink/15',
  'v-cyan': 'bg-cyan/15',
  'v-green': 'bg-green/15',
  'v-orange': 'bg-orange/15',
  'v-gold': 'bg-gold/15',
  'v-teal': 'bg-teal/15',
  'v-red': 'bg-destructive/15',
}

export function AIToolsPanel() {
  const { language } = useAppStore()
  const [activeFilter, setActiveFilter] = useState('الكل')
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null)
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({})
  const [result, setResult] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const categories = CATEGORIES[language]
  const allCat = categories[0]

  const filteredTools = AI_TOOLS.filter(tool => {
    if (activeFilter === allCat || activeFilter === 'All' || activeFilter === 'الكل') return true
    return tool.cat[language] === activeFilter
  })

  const handleFieldChange = (key: string, value: string) => {
    setFieldValues(prev => ({ ...prev, [key]: value }))
  }

  const handleGenerate = useCallback(async () => {
    if (!selectedTool) return

    setIsLoading(true)
    setResult('')

    try {
      const prompt = selectedTool.prompt(fieldValues, language)

      const response = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 2048,
          messages: [{ role: 'user', content: prompt }]
        })
      })

      const data = await response.json()

      if (data.error) {
        setResult(language === 'ar' 
          ? 'حدث خطأ. تأكد من إضافة ANTHROPIC_API_KEY في متغيرات البيئة.'
          : 'An error occurred. Make sure ANTHROPIC_API_KEY is set in environment variables.')
      } else if (data.content && data.content[0]) {
        setResult(data.content[0].text)
      }
    } catch (error) {
      setResult(language === 'ar' 
        ? 'حدث خطأ في الاتصال. حاول مرة أخرى.'
        : 'Connection error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }, [selectedTool, fieldValues, language])

  const handleCopy = () => {
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const renderField = (field: ToolField) => {
    const label = field.label[language]
    const placeholder = field.ph?.[language] || ''

    if (field.type === 'inp') {
      return (
        <div key={field.key} className="mb-4">
          <label className="text-xs font-bold text-muted-foreground mb-1.5 block">{label}</label>
          <input
            type="text"
            value={fieldValues[field.key] || ''}
            onChange={(e) => handleFieldChange(field.key, e.target.value)}
            placeholder={placeholder}
            className="w-full bg-secondary border border-border text-foreground px-3.5 py-2.5 rounded-xl text-sm outline-none focus:border-primary/50 focus:bg-primary/5 focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-muted-foreground"
          />
        </div>
      )
    }

    if (field.type === 'ta') {
      return (
        <div key={field.key} className="mb-4">
          <label className="text-xs font-bold text-muted-foreground mb-1.5 block">{label}</label>
          <textarea
            rows={field.rows || 3}
            value={fieldValues[field.key] || ''}
            onChange={(e) => handleFieldChange(field.key, e.target.value)}
            placeholder={placeholder}
            className="w-full bg-secondary border border-border text-foreground px-3.5 py-2.5 rounded-xl text-sm outline-none focus:border-primary/50 focus:bg-primary/5 focus:ring-2 focus:ring-primary/10 transition-all resize-none leading-relaxed placeholder:text-muted-foreground"
          />
        </div>
      )
    }

    if (field.type === 'select') {
      return (
        <div key={field.key} className="mb-4">
          <label className="text-xs font-bold text-muted-foreground mb-1.5 block">{label}</label>
          <select
            value={fieldValues[field.key] || ''}
            onChange={(e) => handleFieldChange(field.key, e.target.value)}
            className="w-full bg-secondary border border-border text-foreground px-3.5 py-2.5 rounded-xl text-sm outline-none focus:border-primary/50 cursor-pointer appearance-none"
          >
            <option value="">{language === 'ar' ? 'اختر...' : 'Select...'}</option>
            {field.opts?.map((opt, i) => {
              const optLabel = typeof opt === 'string' ? opt : opt[language]
              return <option key={i} value={optLabel}>{optLabel}</option>
            })}
          </select>
        </div>
      )
    }

    if (field.type === 'chips') {
      return (
        <div key={field.key} className="mb-4">
          <label className="text-xs font-bold text-muted-foreground mb-1.5 block">{label}</label>
          <div className="flex flex-wrap gap-2">
            {field.opts?.map((opt, i) => {
              const optLabel = typeof opt === 'string' ? opt : opt[language]
              const isSelected = fieldValues[field.key] === optLabel
              return (
                <button
                  key={i}
                  onClick={() => handleFieldChange(field.key, optLabel)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-bold border transition-all",
                    isSelected
                      ? "bg-primary/15 border-primary/35 text-accent"
                      : "bg-card border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
                  )}
                >
                  {optLabel}
                </button>
              )
            })}
          </div>
        </div>
      )
    }

    return null
  }

  // Tool Detail View
  if (selectedTool) {
    return (
      <div className="animate-in fade-in slide-in-from-bottom-3 duration-300">
        {/* Header */}
        <button
          onClick={() => {
            setSelectedTool(null)
            setResult('')
            setFieldValues({})
          }}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ChevronLeft className="w-4 h-4" />
          {language === 'ar' ? 'العودة للأدوات' : 'Back to Tools'}
        </button>

        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-start gap-4 mb-6">
            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-3xl", ICON_BG_MAP[selectedTool.color])}>
              {selectedTool.emoji}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-lg font-black">{selectedTool.name[language]}</h2>
                <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full border", COLOR_MAP[selectedTool.color])}>
                  {selectedTool.badge[language]}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{selectedTool.desc[language]}</p>
            </div>
          </div>

          {/* Form Fields */}
          {selectedTool.fields.map(renderField)}

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="gradient-btn w-full py-3 rounded-xl text-white text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/30 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            <span className="relative z-10 flex items-center gap-2">
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {language === 'ar' ? 'جاري التوليد...' : 'Generating...'}
                </>
              ) : (
                <>
                  <span>✨</span>
                  {language === 'ar' ? 'توليد' : 'Generate'}
                </>
              )}
            </span>
          </button>

          {/* Result */}
          {result && (
            <div className="mt-5 bg-secondary/50 border border-primary/20 rounded-xl p-4 animate-in fade-in slide-in-from-bottom-2">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold text-accent tracking-wider">
                  {language === 'ar' ? '✨ النتيجة' : '✨ RESULT'}
                </span>
                <div className="flex gap-1.5">
                  <button
                    onClick={handleCopy}
                    className="px-2.5 py-1 rounded-lg border border-border bg-card text-muted-foreground text-xs font-bold hover:border-primary/40 hover:text-accent transition-colors flex items-center gap-1"
                  >
                    <Copy className="w-3 h-3" />
                    {copied ? (language === 'ar' ? 'تم!' : 'Copied!') : (language === 'ar' ? 'نسخ' : 'Copy')}
                  </button>
                  <button
                    onClick={handleGenerate}
                    className="px-2.5 py-1 rounded-lg border border-border bg-card text-muted-foreground text-xs font-bold hover:border-primary/40 hover:text-accent transition-colors flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" />
                    {language === 'ar' ? 'إعادة' : 'Retry'}
                  </button>
                </div>
              </div>
              <div className="text-sm text-foreground leading-relaxed whitespace-pre-wrap break-words">
                {result}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Tools Grid View
  return (
    <div className="animate-in fade-in slide-in-from-bottom-3 duration-300">
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-xl font-black tracking-tight mb-1">
          <span className="gradient-text">{language === 'ar' ? 'مولّدات المحتوى' : 'Content Generators'}</span>
        </h1>
        <p className="text-sm text-muted-foreground">
          {language === 'ar' ? '16 أداة ذكية مدعومة بـ Claude AI' : '16 smart tools powered by Claude AI'}
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex gap-2 flex-wrap mb-5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={cn(
              "px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all",
              activeFilter === cat
                ? "bg-primary/15 border-primary/35 text-accent"
                : "bg-card border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredTools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => setSelectedTool(tool)}
            className="glass-card rounded-2xl p-4 text-right hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-black/20 transition-all duration-200 group relative overflow-hidden"
          >
            <div className={cn("absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-primary to-accent")} />
            
            <div className="flex items-start justify-between gap-2 mb-3">
              <span className={cn(
                "w-11 h-11 rounded-xl flex items-center justify-center text-2xl transition-transform group-hover:scale-110 group-hover:-rotate-3",
                ICON_BG_MAP[tool.color]
              )}>
                {tool.emoji}
              </span>
              <span className={cn("text-[9px] font-bold px-2 py-0.5 rounded-full border whitespace-nowrap", COLOR_MAP[tool.color])}>
                {tool.badge[language]}
              </span>
            </div>

            <div className="text-sm font-bold mb-1">{tool.name[language]}</div>
            <div className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">{tool.desc[language]}</div>

            <div className="flex items-center justify-between mt-3">
              <span className="text-[9px] text-muted-foreground font-bold">{tool.cat[language]}</span>
              <span className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-sm group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent group-hover:border-transparent transition-all">
                ←
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
