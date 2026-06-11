import type { Metadata } from 'next'
import { Inter, Inria_Serif, Playfair_Display } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { ProfilePanel } from '@/components/layout/ProfilePanel'
import { Footer } from '@/components/layout/Footer'
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const inria = Inria_Serif({ subsets: ['latin'], weight: ['300', '400', '700'], variable: '--font-inria' })
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: {
    default: 'Pranav Khaire — Creative Builder & Software Engineer',
    template: '%s — Pranav Khaire',
  },
  description: 'Creative Builder · Software Engineer · Design Engineer. Product, code & craft. Building editorial interfaces, interactive systems, and design-driven products.',
  openGraph: {
    title: 'Pranav Khaire — Creative Builder & Software Engineer',
    description: 'Creative Builder · Software Engineer · Design Engineer. Product, code & craft.',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${inria.variable} ${playfair.variable} antialiased noise-overlay`}
      >
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-E9VQ23C49B" />
        <Script id="google-analytics">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-E9VQ23C49B');`}
        </Script>
        <SmoothScrollProvider>
          <Navbar />
          <ProfilePanel />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
