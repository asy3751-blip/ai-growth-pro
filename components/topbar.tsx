'use client'

import { cn } from '@/lib/utils'
import { useAppStore } from '@/lib/store'
import { Menu } from 'lucide-react'

export function Topbar() {
  const { language, setLanguage, setSidebarOpen } = useAppStore()

  return (
    <header className="h-[60px] bg-background/95 backdrop-blur-xl border-b border-border flex items-center px-4 lg:px-6 gap-3 flex-shrink-0 z-10">
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden w-9 h-9 rounded-lg border border-border bg-card text-muted-foreground flex items-center justify-center hover:border-primary hover:text-foreground transition-colors"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Logo (mobile) */}
      <div className="lg:hidden flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg gradient-btn flex items-center justify-center text-base">
          <span className="relative z-10">✦</span>
        </div>
        <span className="text-sm font-black gradient-text">AI Growth Pro</span>
      </div>

      {/* Desktop title */}
      <div className="hidden lg:flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg gradient-btn flex items-center justify-center text-base">
          <span className="relative z-10">✦</span>
        </div>
        <span className="text-base font-black gradient-text">AI Growth Pro</span>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Live pill */}
      <div className="hidden sm:flex items-center gap-1.5 bg-primary/10 border border-primary/20 rounded-full px-3 py-1.5 text-[11px] font-bold text-accent">
        <span className="w-1.5 h-1.5 rounded-full bg-green animate-blink shadow-sm shadow-green" />
        {language === 'ar' ? 'مباشر' : 'Live'}
      </div>

      {/* Language Toggle */}
      <div className="flex bg-card border border-border rounded-lg overflow-hidden">
        <button
          onClick={() => setLanguage('ar')}
          className={cn(
            "px-3 py-1.5 text-xs font-bold transition-colors",
            language === 'ar' 
              ? "gradient-btn text-white" 
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <span className={language === 'ar' ? "relative z-10" : ""}>AR</span>
        </button>
        <button
          onClick={() => setLanguage('en')}
          className={cn(
            "px-3 py-1.5 text-xs font-bold transition-colors",
            language === 'en' 
              ? "gradient-btn text-white" 
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <span className={language === 'en' ? "relative z-10" : ""}>EN</span>
        </button>
      </div>
    </header>
  )
}
