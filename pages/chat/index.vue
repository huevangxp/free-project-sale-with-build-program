<script setup>
import { useApiChatStore } from "~/stores/apiChat";

definePageMeta({ layout: "default" });

const chatStore = useApiChatStore();
const { $socket, $axios } = useNuxtApp();

const messageInput = ref("");
const isTyping = ref(false);
const messagesContainer = ref(null);
const userId = useCookie("id");

// Connect and join room
onMounted(async () => {
  if (!userId.value) {
    navigateTo("/login");
    return;
  }

  $socket.connect();
  $socket.emit("join-room", userId.value);

  // Load existing messages
  await chatStore.getMessages(userId.value);
  scrollToBottom();

  // Mark admin messages as read
  $socket.emit("mark-read", {
    user_id: userId.value,
    sender_type: "admin",
  });

  // Listen for new messages
  $socket.on("new-message", (message) => {
    chatStore.addMessage(message);
    scrollToBottom();

    // If message is from admin, mark as read immediately (since we're in the chat)
    if (message.sender_type === "admin") {
      $socket.emit("mark-read", {
        user_id: userId.value,
        sender_type: "admin",
      });
    }
  });

  // Typing indicators
  $socket.on("user-typing", (data) => {
    if (data.sender_type === "admin") {
      isTyping.value = true;
    }
  });

  $socket.on("user-stop-typing", (data) => {
    if (data.sender_type === "admin") {
      isTyping.value = false;
    }
  });

  // Read receipts
  $socket.on("messages-read", (data) => {
    chatStore.messages.forEach((msg) => {
      if (msg.sender_type !== data.sender_type) {
        msg.is_read = true;
      }
    });
  });
});

onUnmounted(() => {
  $socket.off("new-message");
  $socket.off("user-typing");
  $socket.off("user-stop-typing");
  $socket.off("messages-read");
  $socket.disconnect();
});

// Send message
const sendMessage = () => {
  if (!messageInput.value.trim()) return;

  $socket.emit("send-message", {
    user_id: userId.value,
    sender_type: "user",
    message: messageInput.value.trim(),
  });

  messageInput.value = "";
  $socket.emit("stop-typing", { user_id: userId.value });
};

// Typing handler
let typingTimeout = null;
const handleTyping = () => {
  $socket.emit("typing", {
    user_id: userId.value,
    sender_type: "user",
    username: useCookie("username")?.value || "Customer",
  });

  clearTimeout(typingTimeout);
  typingTimeout = setTimeout(() => {
    $socket.emit("stop-typing", { user_id: userId.value });
  }, 1500);
};

// Scroll to bottom
const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });
};

// Format time
const formatMessageTime = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const formatDateSeparator = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) return "Today";
  if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// Check if we need date separator
const shouldShowDate = (index) => {
  if (index === 0) return true;
  const curr = new Date(chatStore.messages[index].createdAt).toDateString();
  const prev = new Date(chatStore.messages[index - 1].createdAt).toDateString();
  return curr !== prev;
};
</script>

<template>
  <div class="chat-page-customer">
    <!-- Chat Header -->
    <div class="chat-top-bar">
      <div class="chat-top-left">
        <NuxtLink to="/profile" class="back-link">
          <v-icon size="20">mdi-arrow-left</v-icon>
        </NuxtLink>
        <div class="admin-avatar-wrap">
          <v-avatar size="40" color="transparent">
            <v-img src="/logo.png"></v-img>
          </v-avatar>
          <span class="online-indicator"></span>
        </div>
        <div class="admin-info">
          <span class="admin-name">ຝ່າຍບໍລິການລູກຄ້າ</span>
          <span v-if="isTyping" class="admin-status typing">
            <span class="dot-typing"
              ><span></span><span></span><span></span
            ></span>
            ກຳລັງພິມ...
          </span>
          <span v-else class="admin-status">ອອນລາຍ</span>
        </div>
      </div>
    </div>

    <!-- Messages Container -->
    <div ref="messagesContainer" class="messages-area">
      <!-- Welcome message -->
      <div class="welcome-bubble">
        <v-icon size="32" color="primary">mdi-hand-wave</v-icon>
        <p>Welcome! How can we help you today?</p>
      </div>

      <template v-for="(msg, index) in chatStore.messages" :key="msg.id">
        <!-- Date Separator -->
        <div v-if="shouldShowDate(index)" class="date-separator">
          <span>{{ formatDateSeparator(msg.createdAt) }}</span>
        </div>

        <!-- Message -->
        <div
          class="msg-row"
          :class="{
            'my-msg': msg.sender_type === 'user',
            'their-msg': msg.sender_type === 'admin',
          }"
        >
          <!-- Admin avatar for admin messages -->
          <v-avatar
            v-if="msg.sender_type === 'admin'"
            size="30"
            color="transparent"
            class="msg-avatar"
          >
            <v-img src="/logo.png"></v-img>
          </v-avatar>

          <div class="msg-content">
            <div class="msg-bubble">
              <p>{{ msg.message }}</p>
            </div>
            <div class="msg-info">
              <span class="msg-time">{{
                formatMessageTime(msg.createdAt)
              }}</span>
              <v-icon
                v-if="msg.sender_type === 'user'"
                size="13"
                :color="msg.is_read ? '#4FC3F7' : '#bbb'"
              >
                {{ msg.is_read ? "mdi-check-all" : "mdi-check" }}
              </v-icon>
            </div>
          </div>
        </div>
      </template>

      <!-- Typing indicator -->
      <div v-if="isTyping" class="msg-row their-msg">
        <v-avatar size="30" color="transparent" class="msg-avatar">
          <v-img src="/logo.png"></v-img>
        </v-avatar>
        <div class="msg-content">
          <div class="msg-bubble typing-indicator-bubble">
            <span class="typing-dots">
              <span></span><span></span><span></span>
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Input Area -->
    <div class="chat-input-bar">
      <div class="input-container">
        <input
          v-model="messageInput"
          type="text"
          placeholder="Type your message..."
          class="chat-text-input"
          @keyup.enter="sendMessage"
          @input="handleTyping"
        />
        <button
          class="send-button"
          :class="{ active: messageInput.trim() }"
          :disabled="!messageInput.trim()"
          @click="sendMessage"
        >
          <v-icon size="20" :color="messageInput.trim() ? '#fff' : '#999'"
            >mdi-send</v-icon
          >
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-page-customer {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 80px);
  max-width: 700px;
  margin: 0 auto;
  background: #f8f9fd;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.06);
}

/* ============ Top Bar ============ */
.chat-top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  background: #fff;
  border-bottom: 1px solid #f0f0f5;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.03);
}

.chat-top-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.back-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: #f0f2f5;
  color: #555;
  text-decoration: none;
  transition: all 0.2s;
}

.back-link:hover {
  background: #e0e2e5;
}

.admin-avatar-wrap {
  position: relative;
}

.online-indicator {
  position: absolute;
  bottom: 1px;
  right: 1px;
  width: 10px;
  height: 10px;
  background: #4caf50;
  border-radius: 50%;
  border: 2px solid #fff;
}

.admin-info {
  display: flex;
  flex-direction: column;
}

.admin-name {
  font-size: 15px;
  font-weight: 700;
  color: #1a1a2e;
}

.admin-status {
  font-size: 11px;
  color: #4caf50;
  font-weight: 500;
}

.admin-status.typing {
  color: #3a9d95;
  display: flex;
  align-items: center;
  gap: 5px;
}

.dot-typing {
  display: inline-flex;
  gap: 2px;
}

.dot-typing span {
  width: 4px;
  height: 4px;
  background: #3a9d95;
  border-radius: 50%;
  animation: dotBounce 1.2s infinite;
}

.dot-typing span:nth-child(2) {
  animation-delay: 0.2s;
}
.dot-typing span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes dotBounce {
  0%,
  80%,
  100% {
    transform: translateY(0);
    opacity: 0.3;
  }
  40% {
    transform: translateY(-4px);
    opacity: 1;
  }
}

/* ============ Messages Area ============ */
.messages-area {
  flex: 1;
  overflow-y: auto;
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  scrollbar-width: thin;
  scrollbar-color: #ddd transparent;
}

.welcome-bubble {
  align-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 20px 28px;
  background: linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 100%);
  border-radius: 20px;
  margin-bottom: 16px;
  text-align: center;
}

.welcome-bubble p {
  margin: 0;
  font-size: 14px;
  color: #555;
  font-weight: 500;
}

/* Date Separator */
.date-separator {
  text-align: center;
  margin: 16px 0;
}

.date-separator span {
  padding: 4px 14px;
  background: #e0f2f1;
  border-radius: 100px;
  font-size: 11px;
  color: #777;
  font-weight: 600;
}

/* Message Rows */
.msg-row {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  max-width: 80%;
  animation: msgAppear 0.25s ease-out;
}

@keyframes msgAppear {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.msg-row.my-msg {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.msg-row.their-msg {
  align-self: flex-start;
}

.msg-avatar {
  flex-shrink: 0;
}

.msg-content {
  display: flex;
  flex-direction: column;
}

.msg-bubble {
  padding: 10px 16px;
  border-radius: 18px;
  word-break: break-word;
}

.msg-bubble p {
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
}

.my-msg .msg-bubble {
  background: linear-gradient(135deg, #3a9d95 0%, #2e7d77 100%);
  color: #fff;
  border-bottom-right-radius: 6px;
}

.their-msg .msg-bubble {
  background: #fff;
  color: #333;
  border-bottom-left-radius: 6px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
}

.typing-indicator-bubble {
  padding: 14px 20px;
}

.typing-dots {
  display: inline-flex;
  gap: 4px;
}

.typing-dots span {
  width: 7px;
  height: 7px;
  background: #999;
  border-radius: 50%;
  animation: dotBounce 1.2s infinite;
}

.typing-dots span:nth-child(2) {
  animation-delay: 0.2s;
}
.typing-dots span:nth-child(3) {
  animation-delay: 0.4s;
}

.msg-info {
  display: flex;
  align-items: center;
  gap: 3px;
  margin-top: 3px;
  padding: 0 4px;
}

.my-msg .msg-info {
  justify-content: flex-end;
}

.msg-time {
  font-size: 10px;
  color: #aaa;
}

/* ============ Input Bar ============ */
.chat-input-bar {
  padding: 12px 16px;
  background: #fff;
  border-top: 1px solid #f0f0f5;
}

.input-container {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #f0f2f5;
  border-radius: 25px;
  padding: 4px 6px 4px 18px;
  transition: all 0.2s;
}

.input-container:focus-within {
  background: #e0f2f1;
  box-shadow: 0 0 0 2px rgba(58, 157, 149, 0.15);
}

.chat-text-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 14px;
  color: #333;
  outline: none;
  padding: 10px 0;
}

.chat-text-input::placeholder {
  color: #aaa;
}

.send-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.25s;
  flex-shrink: 0;
}

.send-button.active {
  background: linear-gradient(135deg, #3a9d95 0%, #2e7d77 100%);
  box-shadow: 0 2px 10px rgba(58, 157, 149, 0.4);
  transform: scale(1.05);
}

.send-button:disabled {
  cursor: default;
}

/* ============ Mobile ============ */
@media (max-width: 600px) {
  .chat-page-customer {
    border-radius: 0;
    height: 100vh;
    max-width: 100%;
  }

  .msg-row {
    max-width: 90%;
  }
}
</style>
