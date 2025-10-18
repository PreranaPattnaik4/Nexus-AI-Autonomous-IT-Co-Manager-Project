
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';

const faqData = [
  {
    question: "What is Nexus AI?",
    answer: "Nexus AI is a proactive, agentic AI solution for IT management. It goes beyond simple automation by understanding high-level goals, planning multi-step tasks, and autonomously executing them to manage your IT infrastructure."
  },
  {
    question: "How do I give a goal to the AI?",
    answer: "On the dashboard, use the 'Goal-Based Task Management' form. Type your objective in natural language, like 'Ensure all production servers are patched,' and the AI will create an actionable plan."
  },
  {
    question: "Is this tool running real commands on my systems?",
    answer: "No. For this demo, all actions are simulated. Nexus AI shows you the commands it *would* run, but no actual changes are made to any of your infrastructure, ensuring a safe environment for exploration."
  },
  {
    question: "What happens when a task fails?",
    answer: "If a task fails, you can use the 'Retry with AI' button. The AI will analyze the failure logs, formulate a new, corrected plan, and re-initiate the task in a self-healing loop."
  }
];

export default function FaqPage() {
  return (
    <div className="space-y-6">
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                <CardTitle>Frequently Asked Questions</CardTitle>
                </div>
                <CardDescription>
                Find answers to common questions about Nexus AI.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full">
                {faqData.map((faq, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>
                        {faq.answer}
                    </AccordionContent>
                    </AccordionItem>
                ))}
                </Accordion>
            </CardContent>
        </Card>
    </div>
  );
}
