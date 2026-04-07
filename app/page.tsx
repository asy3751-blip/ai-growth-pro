'use client'

import { Sidebar } from '@/components/sidebar'
import { Topbar } from '@/components/topbar'
import { HomePanel } from '@/components/panels/home-panel'
import { AIToolsPanel } from '@/components/panels/ai-tools-panel'
import { InstagramPanel } from '@/components/panels/instagram-panel'
import { HashtagPanel } from '@/components/panels/hashtag-panel'
import { RevenuePanel } from '@/components/panels/revenue-panel'
import { CalendarPanel } from '@/components/panels/calendar-panel'
import { useAppStore } from '@/lib/store'

export default function Home() {
  const { activePanel } = useAppStore()

  return (
    <div className="h-dvh overflow-hidden flex relative">
      {/* Aurora Background */}
      <div className="aurora" />

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden min-w-0 relative z-10">
        <Topbar />
        
        <div className="flex-1 overflow-y-auto p-4 lg:p-6 scrollbar-thin">
          {activePanel === 'home' && <HomePanel />}
          {activePanel === 'ai' && <AIToolsPanel />}
          {activePanel === 'insta' && <InstagramPanel />}
          {activePanel === 'hash' && <HashtagPanel />}
          {activePanel === 'money' && <RevenuePanel />}
          {activePanel === 'cal' && <CalendarPanel />}
        </div>
      </main>
    </div>
  )
}
