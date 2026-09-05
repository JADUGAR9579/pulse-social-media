import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useMessageStore } from '../../store/messageStore';
import ConversationList from '../../components/messaging/ConversationList';
import ChatWindow from '../../components/messaging/ChatWindow';
import { cn } from '../../lib/cn';

export default function Messages() {
  const { loadConversations, activeConvId } = useMessageStore();

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  return (
    <>
      <Helmet><title>Messages · Pulse</title></Helmet>

      <div className="flex h-screen overflow-hidden">
        {/* Left — conversation list */}
        <div
          className={cn(
            'flex w-full flex-col border-r border-border md:w-[340px] md:flex-shrink-0',
            activeConvId ? 'hidden md:flex' : 'flex'
          )}
        >
          <div className="glass sticky top-0 z-30 border-b border-border px-4 py-3">
            <h1 className="font-display text-xl font-semibold">Messages</h1>
          </div>
          <div className="flex-1 overflow-y-auto">
            <ConversationList />
          </div>
        </div>

        {/* Right — chat window */}
        <div
          className={cn(
            'flex flex-1 flex-col',
            activeConvId ? 'flex' : 'hidden md:flex'
          )}
        >
          <ChatWindow />
        </div>
      </div>
    </>
  );
}
