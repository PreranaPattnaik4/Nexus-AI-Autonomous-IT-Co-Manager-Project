
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Mail } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="space-y-6">
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    <CardTitle>Contact Us</CardTitle>
                </div>
                <CardDescription>
                    Get in touch with the Nexus AI team.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
                <p>
                    For inquiries, support, or feedback, please reach out to us. We'd love to hear from you!
                </p>
                <div>
                    <h3 className="font-semibold">Email</h3>
                    <a href="mailto:contact@nexusai.dev" className="text-primary hover:underline">contact@nexusai.dev</a>
                </div>
                <div>
                    <h3 className="font-semibold">Project Repository</h3>
                    <a href="https://github.com/example/nexus-ai" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        View on GitHub
                    </a>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
