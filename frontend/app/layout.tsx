import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import RocketLoader from '@/components/rocket-loader'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rudra Maria | Full Stack Developer',
  description: 'Portfolio of Rudra Maria, a Full Stack Developer specializing in modern web technologies',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <RocketLoader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}