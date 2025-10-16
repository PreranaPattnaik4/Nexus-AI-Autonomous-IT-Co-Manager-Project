import { submitChatMessage } from '@/lib/actions';
import { StreamData, StreamingTextResponse } from 'ai';
 
export async function POST(req: Request) {
  const { messages } = await req.json();

  const lastMessage = messages[messages.length - 1];
 
  const { output } = await submitChatMessage(lastMessage.content);
 
  return new StreamingTextResponse(output);
}
