<template>
  <div
    class="product-container pb-16 bg-grey-lighten-5"
    style="min-height: 100vh"
  >
    <div class="pt-4 px-2">
      <!-- Header -->
      <div class="d-flex align-center mb-4 px-2">
        <v-btn
          icon
          variant="text"
          color="primary"
          class="mr-2"
          @click="$router.back()"
        >
          <v-icon size="28">mdi-arrow-left</v-icon>
        </v-btn>
        <h2 class="text-h6 font-weight-bold text-primary">
          <span>ຕັ້ງຄ່າ</span>
        </h2>
      </div>

      <v-container class="px-2 py-0">
        <!-- Account -->
        <div class="text-caption font-weight-bold text-medium-emphasis mb-2 ml-2">
          <span>ບັນຊີ</span>
        </div>
        <v-card class="rounded-xl mb-4" border flat color="white">
          <v-list class="py-0 bg-transparent">
            <template v-for="(item, i) in accountItems" :key="i">
              <v-list-item :to="item.link" class="px-4 py-2 setting-line" link>
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
              <v-divider
                v-if="i < accountItems.length - 1"
                class="mx-4"
              ></v-divider>
            </template>
          </v-list>
        </v-card>

        <!-- Preferences -->
        <div class="text-caption font-weight-bold text-medium-emphasis mb-2 ml-2">
          <span>ການຕັ້ງຄ່າ</span>
        </div>
        <v-card class="rounded-xl mb-4" border flat color="white">
          <v-list class="py-0 bg-transparent">
            <v-list-item class="px-4 py-2">
              <template #prepend>
                <v-avatar size="42" color="teal-lighten-5" class="mr-3">
                  <v-icon size="22" color="teal">mdi-bell-outline</v-icon>
                </v-avatar>
              </template>
              <v-list-item-title class="font-weight-bold">
                ການແຈ້ງເຕືອນ
              </v-list-item-title>
              <template #append>
                <v-switch
                  v-model="notifications"
                  color="primary"
                  hide-details
                  density="compact"
                  inset
                ></v-switch>
              </template>
            </v-list-item>

            <v-divider class="mx-4"></v-divider>

            <v-list-item class="px-4 py-2">
              <template #prepend>
                <v-avatar size="42" color="indigo-lighten-5" class="mr-3">
                  <v-icon size="22" color="indigo">mdi-translate</v-icon>
                </v-avatar>
              </template>
              <v-list-item-title class="font-weight-bold">ພາສາ</v-list-item-title>
              <template #append>
                <span class="text-body-2 text-medium-emphasis">ລາວ</span>
              </template>
            </v-list-item>
          </v-list>
        </v-card>

        <!-- Logout -->
        <v-btn
          block
          color="error"
          variant="tonal"
          size="large"
          rounded="xl"
          class="mb-4"
          prepend-icon="mdi-logout"
          @click="logout"
        >
          ອອກຈາກລະບົບ
        </v-btn>
      </v-container>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useApiCartStore } from "@/stores/apiCart";

const { fetchCart } = useApiCartStore();

const notifications = ref(true);

const accountItems = [
  {
    icon: "mdi-card-account-details-outline",
    title: "ຢືນຢັນຕົວຕົນ (KYC)",
    color: "orange",
    description: "ຂໍ້ມູນຢືນຢັນຕົວຕົນ",
    link: "/profile/kyc",
  },
  {
    icon: "mdi-lock-reset",
    title: "ປ່ຽນລະຫັດຜ່ານ",
    color: "red",
    description: "ອັບເດດລະຫັດຜ່ານ",
    link: "/profile/change_password",
  },
];

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
</script>

<style scoped>
.product-container {
  background-color: #f8f9fa;
}
.setting-line {
  transition: background-color 0.2s ease;
}
.setting-line:hover {
  background-color: rgba(var(--v-theme-primary), 0.04) !important;
}
:deep(.v-card) {
  box-shadow: none !important;
}
</style>
