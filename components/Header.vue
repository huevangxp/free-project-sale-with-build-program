<template>
  <div class="header-container bg-primary pt-4 pb-6 px-4 rounded-b-xl">
    <div class="d-flex align-center justify-space-between mb-4">
      <div>
        <h1 class="text-h5 font-weight-bold text-white mb-1">Welcome</h1>
        <p class="text-body-2 text-white text-opacity-80">
          Find your favorite products
        </p>
      </div>
      <div class="d-flex align-center">
        <v-btn
          icon
          variant="flat"
          color="rgba(255,255,255,0.2)"
          class="mr-3 rounded-circle"
          size="small"
          to="/cart"
        >
          <v-badge
            color="error"
            :content="cart.length"
            v-if="cart.length > 0"
            dot
            offset-x="2"
            offset-y="2"
          >
            <v-icon color="white" size="20">mdi-cart-outline</v-icon>
          </v-badge>
          <v-icon v-else color="white" size="20">mdi-cart-outline</v-icon>
        </v-btn>

        <v-btn
          v-if="isLoggedIn"
          icon
          variant="flat"
          color="rgba(255,255,255,0.2)"
          class="rounded-circle"
          size="small"
          @click="dialogOpen"
        >
          <v-icon color="white" size="20">mdi-logout-variant</v-icon>
        </v-btn>
      </div>
    </div>

    <v-text-field
      placeholder="Search for products..."
      prepend-inner-icon="mdi-magnify"
      variant="solo"
      density="comfortable"
      hide-details
      class="search-bar rounded-pill"
      bg-color="white"
      flat
    ></v-text-field>

    <v-dialog v-model="dialog" width="400">
      <v-card class="rounded-xl">
        <v-card-title
          class="d-flex align-center justify-center bg-primary text-white py-4"
        >
          <h4 class="text-h6 font-weight-bold">ອອກຈາກລະບົບ</h4>
        </v-card-title>
        <v-card-text class="text-center py-6">
          <p class="text-body-1">ທ່ານຕ້ອງການອອກຈາກລະບົບບໍ?</p>
        </v-card-text>
        <v-card-actions class="d-flex align-center justify-center pb-6 px-6">
          <v-btn
            color="grey-darken-1"
            variant="tonal"
            class="rounded-pill px-6 mr-2"
            @click="dialog = false"
            height="45"
          >
            ຍົກເລິກ
          </v-btn>
          <v-btn
            color="error"
            variant="flat"
            class="rounded-pill px-6"
            elevation="0"
            @click="logout"
            height="45"
          >
            ອອກຈາກລະບົບ
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useApiCartStore } from "@/stores/apiCart";
const apiCartStore = useApiCartStore();

const { fetchCart } = apiCartStore;

const dialog = ref(false);
const tokenCookie = useCookie("token");

const isLoggedIn = computed(() => {
  return (
    tokenCookie.value !== null &&
    tokenCookie.value !== undefined &&
    tokenCookie.value !== ""
  );
});

const { cart } = storeToRefs(apiCartStore);

onMounted(() => {
  fetchCart();
});

const dialogOpen = () => {
  dialog.value = true;
};

const logout = async () => {
  try {
    // Clear all cookies
    const tokenCookie = useCookie("token");
    const idCookie = useCookie("id");
    const phoneCookie = useCookie("phone");
    const emailCookie = useCookie("email");
    const roleCookie = useCookie("role");
    const usernameCookie = useCookie("username");

    tokenCookie.value = null;
    idCookie.value = null;
    phoneCookie.value = null;
    emailCookie.value = null;
    roleCookie.value = null;
    usernameCookie.value = null;

    dialog.value = false;
    // Navigate to login page
    await navigateTo("/login");
    fetchCart();
  } catch (error) {
    console.log(error);
  }
};
</script>

<style scoped>
.header-container {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}
:deep(.v-field__input) {
  font-size: 0.95rem;
}
:deep(.v-field--variant-solo) {
  box-shadow: none !important;
}
</style>
