'use client';

import dynamic from 'next/dynamic';

const ChatDialog = dynamic(() => import('./chat-dialog').then(mod => mod.ChatDialog), {
    ssr: false,
});

export default function ChatDialogClient() {
    return <ChatDialog />;
}
