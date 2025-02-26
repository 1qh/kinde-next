import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { LoginLink, LogoutLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs/components'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { ThemeProvider } from 'next-themes'

import './globals.css'

const font = Inter({ subsets: ['vietnamese'] })

export const metadata: Metadata = {
  description: ''
}

export const viewport: Viewport = {
  themeColor: [
    { color: 'white', media: '(prefers-color-scheme: light)' },
    { color: 'black', media: '(prefers-color-scheme: dark)' }
  ]
}

const Layout = async ({ children }: { readonly children: React.ReactNode }) => {
  const { isAuthenticated } = getKindeServerSession()
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`flex min-h-screen bg-background tracking-[-0.039em] text-foreground antialiased ${font.className}`}>
        <ThemeProvider attribute='class' defaultTheme='light' enableSystem>
          <div className='flex w-full flex-col'>
            {(await isAuthenticated()) ? (
              <LogoutLink>Log out</LogoutLink>
            ) : (
              <>
                <RegisterLink>Sign up</RegisterLink>
                <LoginLink>Log in</LoginLink>
              </>
            )}
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

export default Layout
