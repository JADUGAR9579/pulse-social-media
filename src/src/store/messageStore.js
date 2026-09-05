import { create } from 'zustand';
import { MOCK_CONVERSATIONS, MOCK_MESSAGES } from '../mock/messages';
import dayjs from 'dayjs';

export const useMessageStore = create((set, get) => ({
  conversations: [],
  messages: {}, // { convId: Message[] }
  activeConvId: null,
  isLoadingConvs: false,
  isLoadingMsgs: false,
  typing: {}, // { convId: boolean }

  get totalUnread() {
    return get().conversations.reduce((acc, c) => acc + (c.unread ?? 0), 0);
  },

  async loadConversations() {
    set({ isLoadingConvs: true });
    await new Promise((r) => setTimeout(r, 500));
    set({ conversations: MOCK_CONVERSATIONS, isLoadingConvs: false });
  },

  async openConversation(convId) {
    set({ activeConvId: convId, isLoadingMsgs: true });
    await new Promise((r) => setTimeout(r, 350));
    const msgs = MOCK_MESSAGES[convId] ?? [];
    set((s) => ({
      messages: { ...s.messages, [convId]: msgs },
      isLoadingMsgs: false,
      // Clear unread on open
      conversations: s.conversations.map((c) =>
        c.id === convId ? { ...c, unread: 0 } : c
      ),
    }));

    // Simulate the other user typing after 3s
    setTimeout(() => get().simulateTyping(convId), 3000);
  },

  sendMessage(convId, text, senderId) {
    if (!text.trim()) return;

    const msg = {
      id: `msg_${Date.now()}`,
      senderId,
      text: text.trim(),
      sentAt: dayjs().toISOString(),
      seen: false,
    };

    set((s) => ({
      messages: {
        ...s.messages,
        [convId]: [...(s.messages[convId] ?? []), msg],
      },
      conversations: s.conversations.map((c) =>
        c.id === convId
          ? { ...c, lastMessage: { text: msg.text, sentAt: msg.sentAt, senderId } }
          : c
      ),
    }));

    // Simulate a reply after 2–4s
    get().simulateReply(convId);
  },

  simulateTyping(convId) {
    set((s) => ({ typing: { ...s.typing, [convId]: true } }));
    setTimeout(
      () => set((s) => ({ typing: { ...s.typing, [convId]: false } })),
      2500
    );
  },

  simulateReply(convId) {
    const REPLIES = [
      'That\'s awesome! 🙌',
      'Totally makes sense — great point.',
      'Haha yes exactly 😄',
      'Love it! Let\'s sync up soon.',
      'Noted! Will take a look.',
      '💯',
    ];

    setTimeout(() => {
      get().simulateTyping(convId);
      setTimeout(() => {
        const conv = get().conversations.find((c) => c.id === convId);
        if (!conv) return;
        const reply = {
          id: `msg_reply_${Date.now()}`,
          senderId: conv.participant.id,
          text: REPLIES[Math.floor(Math.random() * REPLIES.length)],
          sentAt: dayjs().toISOString(),
          seen: false,
        };
        set((s) => ({
          messages: {
            ...s.messages,
            [convId]: [...(s.messages[convId] ?? []), reply],
          },
        }));
      }, 2800);
    }, 1500);
  },

  closeConversation() {
    set({ activeConvId: null });
  },
}));
