
'use client';

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Logo } from './icons';
import AboutPage from '@/app/about/page';
import ContactPage from '@/app/contact/page';
import HelpPage from '@/app/help/page';
import { Github, Linkedin, Twitter, LifeBuoy, Info, Mail } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

export function AppFooter() {
  return (
    <footer className="border-t bg-background text-card-foreground">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-2">
              <Logo className="h-8 w-8 text-primary" />
              <h2 className="text-lg font-bold">Nexus AI</h2>
            </div>
            <p className="text-sm text-muted-foreground pr-8">
              Nexus AI is an autonomous IT co-manager that uses agentic AI to
              understand goals, create plans, and execute tasks across your
              infrastructure.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Dialog>
                   <DialogTrigger asChild>
                      <Button variant="link" className="p-0 h-auto font-normal text-muted-foreground hover:text-primary"><Info className="w-4 h-4 mr-2"/>About Us</Button>
                   </DialogTrigger>
                  <DialogContent className="sm:max-w-2xl">
                    <DialogHeader>
                      <VisuallyHidden>
                        <DialogTitle>About Us</DialogTitle>
                        <DialogDescription>Information about Nexus AI.</DialogDescription>
                      </VisuallyHidden>
                    </DialogHeader>
                    <AboutPage />
                  </DialogContent>
                </Dialog>
              </li>
              <li>
                <Dialog>
                   <DialogTrigger asChild>
                    <Button variant="link" className="p-0 h-auto font-normal text-muted-foreground hover:text-primary"><Mail className="w-4 h-4 mr-2"/>Contact</Button>
                   </DialogTrigger>
                  <DialogContent className="sm:max-w-2xl">
                    <DialogHeader>
                        <VisuallyHidden>
                            <DialogTitle>Contact Us</DialogTitle>
                            <DialogDescription>Contact form to send an inquiry.</DialogDescription>
                        </VisuallyHidden>
                    </DialogHeader>
                    <ContactPage />
                  </DialogContent>
                </Dialog>
              </li>
               <li>
                <a href="mailto:contact@example.com" className="inline-flex items-center text-muted-foreground hover:text-primary">
                    <Mail className="w-4 h-4 mr-2"/> Mail Us: contact@example.com
                </a>
              </li>
              <li>
                <Dialog>
                   <DialogTrigger asChild>
                    <Button variant="link" className="p-0 h-auto font-normal text-muted-foreground hover:text-primary"><LifeBuoy className="w-4 h-4 mr-2"/>Help & Support</Button>
                   </DialogTrigger>
                  <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <VisuallyHidden>
                            <DialogTitle>Help & Support</DialogTitle>
                            <DialogDescription>Help, support, and FAQ for Nexus AI.</DialogDescription>
                        </VisuallyHidden>
                    </DialogHeader>
                    <HelpPage />
                  </DialogContent>
                </Dialog>
              </li>
            </ul>
          </div>
           <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Linkedin className="h-5 w-5" />
                 <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Github className="h-5 w-5" />
                 <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center text-xs text-muted-foreground">
          © 2025 Nexus AI | Built by FutureCoders with Google Gemini + Firebase
        </div>
      </div>
    </footer>
  );
}
