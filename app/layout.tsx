import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import Appbar from './components/Appbar'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { cn } from "../lib/utils"

export const metadata: Metadata = {
  title: 'FlairNow',
  description: 'Talent management system',
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        href: '/favicon.ico',
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
    <html lang="en" className="dark">
      <body  className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
        >
        <Providers>
          <Appbar />
          {children}
          <ToastContainer />
        </Providers>
      </body>
    </html>
  )
}

// Add authorization logic
// Logged in
// Associated with a client = client dashboard
// Not associated with a client = user profile 
// New file: Redirect
// Similar logic in the client dashboard - differ info available depending on role, ie. what's viewed on Sidebar 
// So every link in the side bar should have a role
// File with const side bar items, then map through it and make the side bar dynamically 
// Better to have it in the db as its own table, with a default schema
// But for now in a const
// SIDE BAR: nav item icon route and role
// View and edit for each function. Based on the role this function (action, eg invite a new user, delete a user) can be viewed and this can be viewed and edited
// RBAC in SaaS + multi-tenant 
// Of CRUD what of those does the user have permission
// Each function built seperately 
// Deactivate = update, with status = inactive = not visible
// Give the option to see active & inactive. Select option of active, inactive or both
