import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AuthProvider } from '@/lib/auth-context'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'The Watch Tower - Public Project Transparency Platform',
  description: 'Monitor government infrastructure projects across Jigawa State. Track progress, budgets, and timelines in real-time. Promote transparency and accountability in public project delivery.',
  generator: 'v0.app',
  keywords: ['transparency', 'government projects', 'civic tech', 'Nigeria', 'Jigawa'],
  metadataBase: new URL('https://thewatchtower.vercel.app'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="font-sans antialiased" suppressHydrationWarning>
        <AuthProvider>
          {children}
        </AuthProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
