import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import SideNav from '../_components/common/SideNav'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pos Admin',
  description: 'Pos Admin desc',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
          <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="w-full flex-none md:w-64">
              <SideNav/>
              <Toaster position='top-center'/>
            </div>
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
          </div>
      </body>
    </html>
  )
}
