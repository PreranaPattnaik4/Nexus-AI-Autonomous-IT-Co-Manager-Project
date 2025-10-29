import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import { AppSidebar } from '@/components/app-sidebar';
import { AppHeader } from '@/components/app-header';
import { AppFooter } from '@/components/app-footer';
import { Inter, Source_Code_Pro } from 'next/font/google';
import { cn } from '@/lib/utils';
import ChatDialogClient from '@/components/chat-dialog-client';
import { AuthProvider } from '@/components/auth/auth-provider';

const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const fontMono = Source_Code_Pro({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Nexus AI',
  description: 'Agentic AI for IT Management',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
          fontMono.variable
        )}
        suppressHydrationWarning
      >
        <AuthProvider>
          <div className="flex min-h-screen w-full bg-muted/40">
            <AppSidebar />
            <div className="flex flex-1 flex-col">
              <AppHeader />
              <main className="flex-1 p-4 sm:p-6 lg:p-8 relative">
                {children}
              </main>
              <AppFooter />
            </div>
          </div>
          <ChatDialogClient />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
