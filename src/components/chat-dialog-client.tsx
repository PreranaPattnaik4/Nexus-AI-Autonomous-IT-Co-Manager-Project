
'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

const ChatDialog = dynamic(() => import('./chat-dialog').then(mod => mod.ChatDialog), {
    ssr: false,
});

export default function ChatDialogClient() {
    const pathname = usePathname();

    // Do not render the floating chat dialog button on the dedicated chat page
    if (pathname === '/chat') {
        return null;
    }

    return <ChatDialog />;
}
