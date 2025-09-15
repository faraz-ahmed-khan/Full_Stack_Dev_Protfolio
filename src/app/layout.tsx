import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  title: 'Faraz Ahmed Khan - Portfolio',
  description: '3D Animated Portfolio of Faraz Ahmed Khan - Full Stack Developer & UI/UX Designer',
  keywords: ['Faraz Ahmed Khan', 'Portfolio', 'Full Stack Developer', 'UI/UX Designer', '3D Animation'],
  authors: [{ name: 'Faraz Ahmed Khan' }],
  creator: 'Faraz Ahmed Khan',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://farazahmedkhan.dev',
    title: 'Faraz Ahmed Khan - Portfolio',
    description: '3D Animated Portfolio of Faraz Ahmed Khan - Full Stack Developer & UI/UX Designer',
    siteName: 'Faraz Ahmed Khan Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Faraz Ahmed Khan - Portfolio',
    description: '3D Animated Portfolio of Faraz Ahmed Khan - Full Stack Developer & UI/UX Designer',
    creator: '@farazahmedkhan',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}