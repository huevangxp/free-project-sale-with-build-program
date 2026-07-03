<template>
  <div
    class="product-container pb-16 bg-grey-lighten-5"
    style="min-height: 100vh"
  >
    <!-- Profile Header -->
    <div
      class="bg-primary pt-10 pb-16 rounded-b-xl px-4 text-center position-relative"
    >
      <!-- Logout (top right) -->
      <v-btn
        icon
        variant="tonal"
        color="white"
        size="small"
        class="position-absolute"
        style="top: 12px; right: 12px"
        @click="logout"
      >
        <v-icon size="20">mdi-logout</v-icon>
      </v-btn>

      <v-avatar
        size="100"
        class="mb-3 border-2 border-white"
        color="white"
        elevation="0"
      >
        <v-img
          v-if="profile.avatar"
          :src="'http://localhost:8000/' + profile.avatar"
          cover
        />
        <span v-else class="text-h3 text-primary font-weight-bold">
          {{ firstLetter }}
        </span>
      </v-avatar>

      <h2 class="text-white text-h5 font-weight-bold mb-1">
        {{ profile.username }}
      </h2>

      <v-chip
        color="white"
        variant="flat"
        size="small"
        class="text-primary font-weight-bold px-4"
      >
        Code: {{ profile.code }}
      </v-chip>
    </div>

    <!-- Info Card -->
    <v-container class="mt-n12 px-4">
      <v-card class="rounded-xl mb-4" border flat color="white">
        <v-card-text class="pa-4">
          <v-row dense>
            <v-col cols="4" class="text-center border-e">
              <div class="text-caption text-medium-emphasis mb-1">
                <span>ລູກທິມ</span>
              </div>
              <div class="text-h6 font-weight-bold text-primary">
                {{ team }}
              </div>
            </v-col>
            <v-col cols="8" class="pl-4">
              <div class="d-flex align-center mb-2">
                <v-icon size="small" color="grey" class="mr-2"
                  >mdi-email-outline</v-icon
                >
                <span class="text-body-2 text-truncate">{{
                  profile.email
                }}</span>
              </div>
              <div class="d-flex align-center">
                <v-icon size="small" color="grey" class="mr-2"
                  >mdi-phone-outline</v-icon
                >
                <span class="text-body-2">{{ profile.phone }}</span>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <!-- Menu Grid -->
      <div class="d-flex align-center mb-3 mt-6">
        <v-icon color="primary" class="mr-2">mdi-cog</v-icon>
        <h3 class="text-subtitle-1 font-weight-bold text-primary">
          <span>ຈັດການ</span>
        </h3>
      </div>

      <v-card class="rounded-xl mb-4" border flat color="white">
        <v-list class="py-0 bg-transparent">
          <template v-for="(item, i) in items" :key="i">
            <v-list-item :to="item.link" class="px-4 py-2 menu-line" link>
              <template #prepend>
                <v-avatar
                  size="42"
                  :color="item.color + '-lighten-5'"
                  class="mr-3"
                >
                  <v-icon size="22" :color="item.color">{{ item.icon }}</v-icon>
                </v-avatar>
              </template>

              <v-list-item-title class="font-weight-bold">
                {{ item.title }}
              </v-list-item-title>
              <v-list-item-subtitle class="text-caption">
                {{ item.description }}
              </v-list-item-subtitle>

              <template #append>
                <v-icon color="grey-lighten-1">mdi-chevron-right</v-icon>
              </template>
            </v-list-item>

            <v-divider v-if="i < items.length - 1" class="mx-4"></v-divider>
          </template>
        </v-list>
      </v-card>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useApiAuthStore } from "@/stores/apiAuth";
import { useApiCartStore } from "@/stores/apiCart";

const apiAuthStore = useApiAuthStore();
const { profile, team } = storeToRefs(apiAuthStore);
const { fetchCart } = useApiCartStore();

const firstLetter = computed(
  () => profile.value?.username?.charAt(0).toUpperCase() || ""
);

onMounted(() => {
  apiAuthStore.getProfile();
  apiAuthStore.getTeamByMycodeInvite();
});

const logout = async () => {
  try {
    const tokenCookie = useCookie("token");
    const idCookie = useCookie("id");

    tokenCookie.value = null;
    idCookie.value = null;

    await navigateTo("/login");
    fetchCart();
  } catch (error) {
    console.log(error);
  }
};

const items = [
  {
    icon: "mdi-account-group",
    title: "ທິມງານ",
    color: "blue-grey",
    description: "ທິມງານທັງຫມົດ",
    link: "/profile/team",
  },
  {
    icon: "mdi-history",
    title: "ປະຫວັດ",
    color: "blue-grey",
    description: "ປະຫວັດການຊື້",
    link: "/profile/history",
  },
  {
    icon: "mdi-card-account-details",
    title: "KYC",
    color: "blue-grey",
    description: "ຢືນຢັນຕົວຕົນ",
    link: "/profile/kyc",
  },
  {
    icon: "mdi-video",
    title: "ວິດີໂອ",
    color: "blue-grey",
    description: "ບັນທຶກວິດີໂອ",
    link: "/profile/video",
  },
  {
    icon: "mdi-lock-reset",
    title: "ລະຫັດຜ່ານ",
    color: "blue-grey",
    description: "ປ່ຽນລະຫັດຜ່ານ",
    link: "/profile/change_password",
  },
  
];
</script>

<style scoped>
.product-container {
  background-color: #f8f9fa;
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.border-2 {
  border: 2px solid white;
}
/* Modern, shadow-free menu list rows */
.menu-line {
  transition: background-color 0.2s ease;
}
.menu-line:hover {
  background-color: rgba(var(--v-theme-primary), 0.04) !important;
}
/* Never render Vuetify elevation shadows on this page */
:deep(.v-card) {
  box-shadow: none !important;
}
</style>
