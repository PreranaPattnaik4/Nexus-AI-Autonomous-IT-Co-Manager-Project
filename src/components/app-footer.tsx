import Link from "next/link";
import { Logo } from "./icons";

export function AppFooter() {
  return (
    <footer className="border-t bg-card text-card-foreground">
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
              <li><Link href="/faq" className="hover:text-primary">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
              <li><Link href="/about" className="hover:text-primary">About NexusAI</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">About the Project</h3>
            <p className="text-sm text-muted-foreground">
              This project was built for the SuperHack 2025 (Google Cloud +
              Firebase AI Challenge) to demonstrate the power of agentic AI.
            </p>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center text-xs text-muted-foreground">
          © 2025 Nexus AI | Built by FutureCoders with Google Gemini + Firebase
        </div>
      </div>
    </footer>
  );
}

    