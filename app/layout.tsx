import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import WhatsAppButton from '@/components/whatsapp-button'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Wedding & Events - Your Wedding, Your Way',
  description: 'Find the best wedding venues and event services in Pakistan. Explore trusted vendors, compare prices, and plan your perfect celebration.',
  keywords: 'wedding venues, event planning, wedding vendors, Karachi weddings, Pakistan weddings',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
          <WhatsAppButton />
        </Providers>
      </body>
    </html>
  )
}
