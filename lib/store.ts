'use client'

import { create } from 'zustand'
import type { Language } from './data'

interface AppState {
  language: Language
  activePanel: string
  sidebarOpen: boolean
  setLanguage: (lang: Language) => void
  setActivePanel: (panel: string) => void
  setSidebarOpen: (open: boolean) => void
}

export const useAppStore = create<AppState>((set) => ({
  language: 'ar',
  activePanel: 'home',
  sidebarOpen: false,
  setLanguage: (language) => set({ language }),
  setActivePanel: (activePanel) => set({ activePanel }),
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
}))
