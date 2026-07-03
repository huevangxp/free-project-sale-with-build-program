<template>
  <v-layout class="overflow-visible" style="min-height: 80px" fixed app>
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
        <v-icon size="24" :color="route.path === '/' ? 'primary' : 'grey'"
          >mdi-home</v-icon
        >
        <span
          :class="route.path === '/' ? 'text-primary' : 'text-grey'"
          class="text-caption mt-1"
          >ໜ້າຫຼັກ</span
        >
      </v-btn>

      <v-btn
        value="promotion"
        to="/promotion"
        class="nav-btn"
        :active="route.path === '/promotion'"
      >
        <v-icon
          size="24"
          :color="route.path === '/promotion' ? 'primary' : 'grey'"
          >mdi-view-grid</v-icon
        >
        <span
          :class="route.path === '/promotion' ? 'text-primary' : 'text-grey'"
          class="text-caption mt-1"
          >ໂປຣໂມຊັ່ນ</span
        >
      </v-btn>

      <!-- Central Floating Button -->
      <!-- <div class="position-relative d-flex justify-center" style="width: 80px">
        <v-btn
          icon
          class="floating-btn"
          color="primary"
          size="x-large"
          elevation="4"
          to="/scan"
          style="position: absolute; top: -25px"
        >
          <v-icon size="32" color="white">mdi-magnify</v-icon>
        </v-btn>
      </div> -->

      <v-btn
        value="product"
        to="/product"
        class="nav-btn"
        :active="route.path === '/product'"
      >
        <v-icon
          size="24"
          :color="route.path === '/product' ? 'primary' : 'grey'"
          >mdi-cart-outline</v-icon
        >
        <span
          :class="route.path === '/product' ? 'text-primary' : 'text-grey'"
          class="text-caption mt-1"
          >ສິນຄ້າ</span
        >
      </v-btn>

      <v-btn
        value="chat"
        to="/chat"
        class="nav-btn"
        :active="route.path === '/chat'"
      >
        <v-badge
          v-if="chatStore.unreadCount > 0"
          color="error"
          :content="chatStore.unreadCount"
          offset-x="8"
          offset-y="8"
        >
          <v-icon size="24" :color="route.path === '/chat' ? 'primary' : 'grey'"
            >mdi-chat-outline</v-icon
          >
        </v-badge>
        <v-icon
          v-else
          size="24"
          :color="route.path === '/chat' ? 'primary' : 'grey'"
          >mdi-chat-outline</v-icon
        >
        <span
          :class="route.path === '/chat' ? 'text-primary' : 'text-grey'"
          class="text-caption mt-1"
          >Chat</span
        >
      </v-btn>
      <!-- <v-btn
        value="profile/history"
        to="/profile/history"
        class="nav-btn"
        :active="route.path === '/profile/history'"
      >
        <v-icon
          size="24"
          :color="route.path === '/profile/history' ? 'primary' : 'grey'"
          >mdi-history</v-icon
        >
        <span
          :class="
            route.path === '/profile/history' ? 'text-primary' : 'text-grey'
          "
          class="text-caption mt-1"
          >History</span
        >
      </v-btn> -->

      <v-btn
        value="profile"
        to="/profile"
        class="nav-btn"
        :active="route.path === '/profile'"
      >
        <v-icon
          size="24"
          :color="route.path === '/profile' ? 'primary' : 'grey'"
          >mdi-account</v-icon
        >
        <span
          :class="route.path === '/profile' ? 'text-primary' : 'text-grey'"
          class="text-caption mt-1"
          >Profile</span
        >
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
  padding: 0 12px;
}
.nav-btn :deep(.v-btn__content) {
  flex-direction: column;
  opacity: 1 !important;
}
.floating-btn {
  border: 4px solid white;
}
</style>
