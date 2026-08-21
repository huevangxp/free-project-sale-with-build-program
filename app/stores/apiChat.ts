import { defineStore } from "pinia";

interface ChatMessage {
  id: string;
  user_id: string;
  sender_type: "user" | "admin";
  message: string;
  is_read: boolean;
  createdAt: string;
  updatedAt: string;
  user?: any;
}

export const useApiChatStore = defineStore("apiChat", {
  state: () => ({
    messages: [] as ChatMessage[],
    unreadCount: 0,
    loading: false,
  }),
  actions: {
    async getMessages(userId: string) {
      try {
        this.loading = true;
        const { $axios } = useNuxtApp();
        const res = await $axios.get(`/chats/messages/${userId}`);
        this.messages = res.data.data;
      } catch (error) {
        console.error("getMessages error:", error);
      } finally {
        this.loading = false;
      }
    },

    async getUnreadCount(userId: string) {
      try {
        const { $axios } = useNuxtApp();
        const res = await $axios.get(
          `/chats/unread/${userId}?sender_type=admin`,
        );
        this.unreadCount = res.data.data;
      } catch (error) {
        console.error("getUnreadCount error:", error);
      }
    },

    addMessage(message: ChatMessage) {
      const exists = this.messages.find(
        (m: ChatMessage) => m.id === message.id,
      );
      if (!exists) {
        this.messages.push(message);
      }
    },
  },
});
