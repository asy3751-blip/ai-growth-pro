import type { Metadata, Viewport } from 'next'
import { Cairo } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ServiceWorkerRegister } from '@/components/service-worker-register'
import './globals.css'

const cairo = Cairo({ 
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo'
})

export const metadata: Metadata = {
  title: 'AI Growth Pro',
  description: 'منصة شاملة لنمو الأعمال على إنستغرام مع أدوات ذكاء اصطناعي متعددة',
  generator: 'v0.app',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'AI Growth Pro',
  },
}

export const viewport: Viewport = {
  themeColor: '#08080f',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl" className="dark">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-512x512.jpg" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body className={`${cairo.variable} font-sans antialiased`}>
        {children}
        <Analytics />
        <ServiceWorkerRegister />
      </body>
    </html>
  )
}
