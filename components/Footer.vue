<template>
  <v-layout class="overflow-visible" style="min-height: 40px" fixed app>
    <v-bottom-navigation
      bg-color="white"
      mode="shift"
      fixed
      app
      grow
      height="70"
      class="rounded-t-xl footer-shadow"
    >
      <v-btn value="home" to="/" class="nav-btn" :active="route.path === '/'">
        <div class="nav-pill" :class="{ 'nav-pill--active': route.path === '/' }">
          <v-icon
            size="26"
            :color="route.path === '/' ? 'primary' : 'grey-darken-1'"
            >mdi-home</v-icon
          >
        </div>
      </v-btn>

      <v-btn
        value="promotion"
        to="/promotion"
        class="nav-btn"
        :active="route.path === '/promotion'"
      >
        <div
          class="nav-pill"
          :class="{ 'nav-pill--active': route.path === '/promotion' }"
        >
          <v-icon
            size="26"
            :color="route.path === '/promotion' ? 'primary' : 'grey-darken-1'"
            >mdi-view-grid</v-icon
          >
        </div>
      </v-btn>

      <v-btn
        value="product"
        to="/product"
        class="nav-btn"
        :active="route.path === '/product'"
      >
        <div
          class="nav-pill"
          :class="{ 'nav-pill--active': route.path === '/product' }"
        >
          <v-icon
            size="26"
            :color="route.path === '/product' ? 'primary' : 'grey-darken-1'"
            >mdi-cart-outline</v-icon
          >
        </div>
      </v-btn>

      <v-btn
        value="chat"
        to="/chat"
        class="nav-btn"
        :active="route.path === '/chat'"
      >
        <div
          class="nav-pill"
          :class="{ 'nav-pill--active': route.path === '/chat' }"
        >
          <v-badge
            v-if="chatStore.unreadCount > 0"
            color="error"
            :content="chatStore.unreadCount"
            offset-x="6"
            offset-y="6"
          >
            <v-icon
              size="26"
              :color="route.path === '/chat' ? 'primary' : 'grey-darken-1'"
              >mdi-chat-outline</v-icon
            >
          </v-badge>
          <v-icon
            v-else
            size="26"
            :color="route.path === '/chat' ? 'primary' : 'grey-darken-1'"
            >mdi-chat-outline</v-icon
          >
        </div>
      </v-btn>

      <v-btn
        value="profile"
        to="/profile"
        class="nav-btn"
        :active="route.path === '/profile'"
      >
        <div
          class="nav-pill"
          :class="{ 'nav-pill--active': route.path === '/profile' }"
        >
          <v-icon
            size="26"
            :color="route.path === '/profile' ? 'primary' : 'grey-darken-1'"
            >mdi-account</v-icon
          >
        </div>
      </v-btn>
    </v-bottom-navigation>
  </v-layout>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useApiChatStore } from "~/stores/apiChat";

const route = useRoute();
const chatStore = useApiChatStore();
const token = useCookie("token");
const userId = useCookie("id");

onMounted(async () => {
  if (token.value && userId.value) {
    await chatStore.getUnreadCount(userId.value as string);
  }
});
</script>

<style scoped>
.footer-shadow {
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.05) !important;
  border-top: 1px solid rgba(0, 0, 0, 0.02);
}
.nav-btn {
  min-width: auto !important;
  padding: 0 8px;
}
.nav-btn :deep(.v-btn__content) {
  opacity: 1 !important;
}
/* Modern Material-3 style pill highlight behind the active icon */
.nav-pill {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 34px;
  border-radius: 999px;
  transition: background-color 0.25s ease, transform 0.25s ease;
}
.nav-pill--active {
  background-color: rgba(var(--v-theme-primary), 0.12);
  transform: translateY(-1px);
}
</style>
