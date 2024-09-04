import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import { languages } from '../i18n-config'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AnyMem',
  description: 'Learn and memorize anything with AnyMem',
}

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

export default function RootLayout({
  children,
  params: { lng }
}: {
  children: React.ReactNode
  params: { lng: string }
}) {
  return (
    <html lang={lng}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
