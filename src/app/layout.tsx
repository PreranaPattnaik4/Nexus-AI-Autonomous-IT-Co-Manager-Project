import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { AppSidebar } from '@/components/app-sidebar';
import { AppHeader } from '@/components/app-header';
import { AppFooter } from '@/components/app-footer';
import { Inter, Source_Code_Pro } from 'next/font/google';
import { cn } from '@/lib/utils';
import { ChatDialog } from '@/components/chat-dialog';

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
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
          fontMono.variable
        )}
        suppressHydrationWarning
      >
        <FirebaseClientProvider>
          <div className="flex min-h-screen w-full bg-muted/40">
            <AppSidebar />
            <div className="flex flex-1 flex-col">
              <AppHeader />
              <main className="flex-1 p-4 sm:p-6 lg:p-8 relative">
                {children}
                <ChatDialog />
              </main>
              <AppFooter />
            </div>
          </div>
        </FirebaseClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
