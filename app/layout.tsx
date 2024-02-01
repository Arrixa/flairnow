import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import NavBar from './(main)/_components/nav/NavBar'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { cn } from "../utils/utils"

export const metadata: Metadata = {
  title: 'FlairNow',
  description: 'Talent management system',
  icons: {
    icon: [
      {
        url: '/FlairNow-Logo-Square.svg',
        href: '/FlairNow-Logo-Square.svg',
      },
    ],
  },
};

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {

  return (
    <html lang="en">  
      <body  className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
        >
        <Providers>
          {children}
          <ToastContainer />
        </Providers>
      </body>
    </html>
  )
}


