<template>
  <div
    class="product-container pb-16 bg-grey-lighten-5"
    style="min-height: 100vh"
  >
    <!-- Profile Header -->
    <div
      class="bg-primary pt-8 pb-16 rounded-b-xl px-4 text-center position-relative"
    >
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
      <v-card class="rounded-xl mb-4" elevation="0" color="white">
        <v-card-text class="pa-4">
          <v-row dense>
            <v-col cols="4" class="text-center border-e">
              <div class="text-caption text-medium-emphasis mb-1">ລູກທິມ</div>
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
        <h3 class="text-subtitle-1 font-weight-bold text-primary">ຈັດການ</h3>
      </div>

      <v-row dense>
        <v-col cols="6" sm="4" v-for="(item, i) in items" :key="i">
          <v-card
            class="rounded-xl fill-height border-0"
            elevation="0"
            color="white"
            :to="item.link"
            link
          >
            <div class="pa-4 d-flex flex-column align-center text-center h-100">
              <v-avatar
                size="50"
                :color="item.color + '-lighten-5'"
                class="mb-3"
              >
                <v-icon size="28" :color="item.color">{{ item.icon }}</v-icon>
              </v-avatar>
              <div class="text-subtitle-2 font-weight-bold mb-1">
                {{ item.title }}
              </div>
              <div class="text-caption text-medium-emphasis line-clamp-2">
                {{ item.description }}
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <v-btn
        block
        color="error"
        variant="tonal"
        size="large"
        rounded="xl"
        class="mt-6 mb-4"
        prepend-icon="mdi-logout"
        @click="logout"
      >
        ອອກຈາກລະບົບ
      </v-btn>
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
    color: "blue",
    description: "ທິມງານທັງຫມົດ",
    link: "/profile/team",
  },
  {
    icon: "mdi-history",
    title: "ປະຫວັດ",
    color: "green",
    description: "ປະຫວັດການຊື້",
    link: "/history",
  },
  {
    icon: "mdi-card-account-details",
    title: "KYC",
    color: "orange",
    description: "ຢືນຢັນຕົວຕົນ",
    link: "/profile/kyc",
  },
  {
    icon: "mdi-video",
    title: "ວິດີໂອ",
    color: "purple",
    description: "ບັນທຶກວິດີໂອ",
    link: "/profile/video",
  },
  {
    icon: "mdi-lock-reset",
    title: "ລະຫັດຜ່ານ",
    color: "red",
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
</style>
