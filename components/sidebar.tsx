'use client'

import { cn } from '@/lib/utils'
import { useAppStore } from '@/lib/store'
import { NAV_ITEMS } from '@/lib/data'

export function Sidebar() {
  const { language, activePanel, setActivePanel, sidebarOpen, setSidebarOpen } = useAppStore()

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:relative inset-y-0 right-0 z-50 w-[260px] flex-shrink-0",
          "bg-background/95 backdrop-blur-xl border-l border-border",
          "flex flex-col overflow-hidden transition-transform duration-300",
          "lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo Section */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-xl gradient-btn flex items-center justify-center text-2xl shadow-lg shadow-primary/30">
              <span className="relative z-10">✦</span>
            </div>
            <div>
              <div className="text-lg font-black">
                <span className="gradient-text">AI Growth Pro</span>
              </div>
            </div>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-card border border-border rounded-xl p-2.5 text-center">
              <div className="text-sm font-black gradient-text">12.5K</div>
              <div className="text-[10px] text-muted-foreground">
                {language === 'ar' ? 'متابع' : 'Followers'}
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl p-2.5 text-center">
              <div className="text-sm font-black gradient-text">4.2%</div>
              <div className="text-[10px] text-muted-foreground">
                {language === 'ar' ? 'تفاعل' : 'Engagement'}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-2 scrollbar-none">
          <div className="text-[10px] font-bold text-muted-foreground tracking-widest px-3 py-2">
            {language === 'ar' ? 'القائمة الرئيسية' : 'MAIN MENU'}
          </div>

          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActivePanel(item.id)
                setSidebarOpen(false)
              }}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold",
                "transition-all duration-200 mb-0.5 relative overflow-hidden",
                "border border-transparent text-muted-foreground",
                "hover:bg-primary/5 hover:text-foreground",
                activePanel === item.id && [
                  "text-foreground bg-primary/10 border-primary/20",
                  "after:absolute after:left-0 after:top-[22%] after:bottom-[22%] after:w-[3px]",
                  "after:rounded-sm after:bg-gradient-to-b after:from-primary after:to-accent"
                ]
              )}
            >
              <span className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center text-base",
                "bg-white/5 transition-colors",
                activePanel === item.id && "bg-primary/20"
              )}>
                {item.icon}
              </span>
              <span>{item.label[language]}</span>
              {item.badge && (
                <span className="mr-auto gradient-btn text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  <span className="relative z-10">{item.badge}</span>
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-border">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="gradient-btn w-full py-3 rounded-xl text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/30 hover:-translate-y-0.5 transition-transform"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span>📱</span>
              {language === 'ar' ? 'تابعنا على إنستغرام' : 'Follow on Instagram'}
            </span>
          </a>
        </div>
      </aside>
    </>
  )
}
