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
    <html lang="en" className="dark" style={{ colorScheme: 'dark' }} suppressHydrationWarning>
      <body className={inter.className} style={{ colorScheme: 'dark' }}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <RocketLoader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}