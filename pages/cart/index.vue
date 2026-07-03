<template>
  <div
    class="product-container pb-16 bg-grey-lighten-5"
    style="min-height: 100vh"
  >
    <!-- Header Section -->
    <div class="bg-primary pt-4 pb-6 px-4 rounded-b-xl">
      <div class="d-flex align-center justify-space-between mb-4">
        <div>
          <h1 class="text-h5 font-weight-bold text-white mb-1">
            <span>ກະຕ່າສິນຄ້າ</span>
          </h1>
          <p class="text-body-2 text-white text-opacity-80">
            <span>ກວດສອບລາຍການສິນຄ້າຂອງທ່ານ</span>
          </p>
        </div>
        <div class="d-flex align-center">
          <v-btn icon variant="text" color="white" @click="$router.back()">
            <v-icon size="28">mdi-arrow-left</v-icon>
          </v-btn>
        </div>
      </div>
    </div>

    <v-container fluid class="px-4 mt-n8">
      <!-- Summary Card -->
      <v-card class="rounded-xl mb-4" border flat color="white">
        <v-card-text class="pa-4">
          <div class="d-flex align-center justify-space-between mb-4">
            <div class="d-flex align-center">
              <v-avatar color="primary-lighten-5" size="40" class="mr-3">
                <v-icon color="primary" size="24">mdi-cart-outline</v-icon>
              </v-avatar>
              <div>
                <div class="text-subtitle-1 font-weight-bold">
                  <span>ລາຍການທັງໝົດ</span>
                </div>
                <div class="text-caption text-medium-emphasis">
                  <span>{{ formatNumber(cart.length) }} ລາຍການ</span>
                </div>
              </div>
            </div>
            <div class="text-right">
              <div class="text-caption text-medium-emphasis">
                <span>ລວມທັງໝົດ</span>
              </div>
              <div class="text-h6 font-weight-bold text-primary">
                <span>{{ formatMoneyLAK(totalAmount) }}</span>
              </div>
            </div>
          </div>

          <v-divider class="mb-4 border-opacity-10"></v-divider>

          <v-row dense>
            <v-col cols="6">
              <div
                class="d-flex flex-column align-center pa-3 bg-grey-lighten-5 rounded-lg"
              >
                <span class="text-medium-emphasis mb-1">ຕ້ອງຈ່າຍ</span>
                <span class="text-subtitle-1 font-weight-bold text-warning">
                  <span>{{ formatMoneyLAK(paymentDue) }}</span>
                </span>
              </div>
            </v-col>
            <v-col cols="6">
              <div
                class="d-flex flex-column align-center pa-3 bg-grey-lighten-5 rounded-lg"
              >
                <span class="text-medium-emphasis mb-1">ກຳໄລ</span>
                <span class="text-subtitle-1 font-weight-bold text-success">
                  {{ formatMoneyLAK(totalProfit) }}
                </span>
              </div>
            </v-col>
          </v-row>

          <v-btn
            block
            color="primary"
            size="large"
            rounded="xl"
            elevation="0"
            class="mt-4"
            @click="handleNext"
          >
            <v-icon start>mdi-qrcode-scan</v-icon>
            ຊຳລະເງິນ
          </v-btn>
        </v-card-text>
      </v-card>

      <!-- Cart Items -->
      <div v-if="cart.length > 0">
        <div class="d-flex align-center mb-3 px-2">
          <v-icon color="primary" class="mr-2"
            >mdi-package-variant-closed</v-icon
          >
          <h3 class="text-subtitle-1 font-weight-bold text-primary">
            <span>ລາຍການສິນຄ້າ</span>
          </h3>
        </div>

        <v-card
          v-for="(item, i) in cart"
          :key="i"
          class="mb-3 rounded-xl"
          border
          flat
          color="white"
        >
          <div class="d-flex pa-3">
            <!-- Product Image -->
            <div class="position-relative mr-3">
              <v-avatar size="80" rounded="lg" class="bg-grey-lighten-4">
                <v-img
                  :src="'http://localhost:8000/' + item.product.image"
                  cover
                >
                  <template v-slot:placeholder>
                    <div class="d-flex align-center justify-center fill-height">
                      <v-progress-circular
                        indeterminate
                        color="primary"
                        size="20"
                      ></v-progress-circular>
                    </div>
                  </template>
                </v-img>
              </v-avatar>
              <v-badge
                :content="item.all_quantity"
                color="primary"
                offset-x="10"
                offset-y="10"
                class="position-absolute top-0 right-0"
              ></v-badge>
            </div>

            <!-- Product Details -->
            <div
              class="flex-grow-1 overflow-hidden d-flex flex-column justify-space-between"
            >
              <div>
                <div
                  class="text-subtitle-2 font-weight-bold text-truncate mb-1"
                >
                  <span>{{ item.product.title }}</span>
                </div>
                <!-- Promotion Status Chip -->
                <div class="mb-1">
                  <v-chip
                    size="x-small"
                    :color="checkPromotion(item) ? 'success' : 'warning'"
                    variant="flat"
                    class="font-weight-bold"
                  >
                    {{
                      checkPromotion(item) ? "ຮອດເປົ້າແລ້ວ" : "ຍັງບໍ່ຮອດເປົ້າ"
                    }}
                    <span
                      v-if="!checkPromotion(item) && item.product.target"
                      class="ml-1"
                    >
                      (ຂາດ {{ item.product.target - item.all_quantity }})
                    </span>
                  </v-chip>
                </div>
                <div class="d-flex align-center justify-space-between">
                  <span class="text-medium-emphasis">ລາຄາຕໍ່ໜ່ວຍ</span>
                  <span class="font-weight-bold">
                    <span>{{ formatMoneyLAK(item.price_by_init) }}</span>
                  </span>
                </div>
              </div>

              <div class="d-flex align-center justify-space-between mt-2">
                <div
                  class="d-flex align-center bg-grey-lighten-5 rounded-pill px-1"
                >
                  <v-btn
                    icon
                    size="x-small"
                    variant="text"
                    color="primary"
                    :disabled="item.all_quantity <= 1"
                    @click="minusQuantity(item.id)"
                  >
                    <v-icon>mdi-minus</v-icon>
                  </v-btn>
                  <span class="text-body-2 font-weight-bold mx-2">
                    <span>{{ item.all_quantity }}</span>
                  </span>
                  <v-btn
                    icon
                    size="x-small"
                    variant="text"
                    color="primary"
                    @click="plusQuantity(item.id)"
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </div>
                <div class="text-subtitle-2 font-weight-bold text-primary">
                  <span>{{ formatMoneyLAK(item.all_price) }}</span>
                </div>
              </div>
            </div>
          </div>
        </v-card>
      </div>

      <!-- Empty State -->
      <div v-else class="d-flex flex-column align-center justify-center py-16">
        <v-icon size="64" color="grey-lighten-2" class="mb-4"
          >mdi-cart-off</v-icon
        >
        <h3 class="text-h6 text-grey-darken-1 font-weight-medium">
          <span>ກະຕ່າວ່າງເປົ່າ</span>
        </h3>
        <p class="text-body-2 text-grey-lighten-1 mb-4">
          <span>ເລືອກຊື້ສິນຄ້າທີ່ທ່ານຕ້ອງການ</span>
        </p>
        <v-btn color="primary" variant="tonal" rounded="xl" to="/product">
          <span>ໄປໜ້າສິນຄ້າ</span>
        </v-btn>
      </div>
      <!-- Warning Dialog -->
      <v-dialog v-model="showDialog" max-width="320">
        <v-card class="rounded-xl pa-4 text-center">
          <div class="d-flex justify-center mb-2">
            <v-icon color="warning" size="48">mdi-alert-circle-outline</v-icon>
          </div>
          <div class="text-h6 font-weight-bold mb-2">ແຈ້ງເຕືອນ</div>
          <div class="text-body-1 text-medium-emphasis mb-4">
            ກະລຸນາເພີ່ມສິນຄ້າໃສ່ກະຕ່າກ່ອນ!
          </div>
          <v-btn
            color="primary"
            variant="flat"
            block
            rounded="xl"
            @click="showDialog = false"
          >
            ຕົກລົງ
          </v-btn>
        </v-card>
      </v-dialog>

      <!-- Promotion Warning Dialog -->
      <v-dialog v-model="showPromotionDialog" max-width="320">
        <v-card class="rounded-xl pa-4 text-center">
          <div class="d-flex justify-center mb-2">
            <v-icon color="warning" size="48">mdi-alert-circle-outline</v-icon>
          </div>
          <div class="text-h6 font-weight-bold mb-2">ແຈ້ງເຕືອນ</div>
          <div class="text-body-1 text-medium-emphasis mb-4">
            ມີສິນຄ້າບາງລາຍການຍັງບໍ່ຮອດເປົ້າ promotion.
            ຕ້ອງການດຳເນີນການຕໍ່ຫຼືບໍ່?
          </div>
          <v-row dense>
            <v-col cols="6">
              <v-btn
                color="grey-darken-1"
                variant="tonal"
                block
                rounded="xl"
                @click="showPromotionDialog = false"
              >
                ກັບຄືນ
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn
                color="primary"
                variant="flat"
                block
                rounded="xl"
                @click="proceedAnyway"
              >
                ຢືນຢັນ
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script setup>
import { useFormat } from "@/composables/useFormat";
import { storeToRefs } from "pinia";
import { useApiCartStore } from "@/stores/apiCart";

const { formatMoneyLAK, formatNumber } = useFormat();

const apiCartStore = useApiCartStore();
const { cart } = storeToRefs(apiCartStore);

onMounted(() => {
  apiCartStore.fetchCart();
});

const plusQuantity = (id) => {
  apiCartStore.plusQuantity(id);
};
const totalAmount = computed(() =>
  cart.value.reduce(
    (total, item) => total + item.product.price * item.all_quantity,
    0,
  ),
);

const paymentDue = computed(() =>
  cart.value.reduce((total, item) => total + Number(item.all_price), 0),
);

const totalProfit = computed(() => totalAmount.value - paymentDue.value);
const minusQuantity = (id) => {
  apiCartStore.minusQuantity(id);
};

// Dialog state
const showDialog = ref(false);
const showPromotionDialog = ref(false);

// Check if item meets promotion target
// Assuming 'target' is the field for promotion goal in product
const checkPromotion = (item) => {
  const target = item.product.target || 1; // Default to 1 if no target
  return item.all_quantity >= target;
};

// Computed property for items not meeting target
const unmetPromotionItems = computed(() => {
  return cart.value.filter((item) => !checkPromotion(item));
});

// Handle next button click
const handleNext = () => {
  if (cart.value.length === 0) {
    showDialog.value = true;
    return;
  }

  // Check for promotion targets
  if (unmetPromotionItems.value.length > 0) {
    showPromotionDialog.value = true;
  } else {
    navigateTo("/pay");
  }
};

const proceedAnyway = () => {
  showPromotionDialog.value = false;
  navigateTo("/pay");
};
</script>

<style scoped>
.product-container {
  background-color: #f8f9fa;
}
</style>
