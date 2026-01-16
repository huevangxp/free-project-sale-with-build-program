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
            <span>ຊຳລະເງິນ</span>
          </h1>
          <p class="text-body-2 text-white text-opacity-80">
            <span>ສະແກນ QR Code ເພື່ອຊຳລະເງິນ</span>
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
      <!-- Payment Card -->
      <v-card class="rounded-xl mb-4" elevation="4" color="white">
        <v-card-text class="pa-4 text-center">
          <div class="d-flex justify-center mb-6 mt-2">
            <v-card class="rounded-xl pa-2" elevation="0" border>
              <v-img
                src="/static/qr.png"
                height="250"
                width="250"
                cover
                class="rounded-lg"
              ></v-img>
            </v-card>
          </div>

          <div class="text-h6 font-weight-bold text-primary mb-1">
            <span>ສະແກນເພື່ອຈ່າຍ</span>
          </div>
          <div class="text-caption text-medium-emphasis mb-6">
            <span>ກະລຸນາສະແກນ QR Code ຜ່ານແອັບທະນາຄານ</span>
          </div>

          <v-divider class="mb-4 border-opacity-10"></v-divider>

          <v-row dense class="mb-4">
            <v-col cols="6">
              <div
                class="d-flex flex-column align-center pa-3 bg-grey-lighten-5 rounded-lg"
              >
                <span class="text-caption text-medium-emphasis mb-1"
                  >ຈຳນວນສິນຄ້າ</span
                >
                <span class="text-subtitle-1 font-weight-bold text-primary">
                  {{ formatNumber(cart.length) }}
                  <span class="text-caption">ອັນ</span>
                </span>
              </div>
            </v-col>
            <v-col cols="6">
              <div
                class="d-flex flex-column align-center pa-3 bg-grey-lighten-5 rounded-lg"
              >
                <span class="text-caption text-medium-emphasis mb-1"
                  >ລວມທັງໝົດ</span
                >
                <span class="text-subtitle-1 font-weight-bold text-primary">
                  {{ formatMoneyLAK(totalAmount) }}
                </span>
              </div>
            </v-col>
            <v-col cols="6">
              <div
                class="d-flex flex-column align-center pa-3 bg-grey-lighten-5 rounded-lg"
              >
                <span class="text-caption text-medium-emphasis mb-1"
                  >ຕ້ອງຈ່າຍ</span
                >
                <span class="text-subtitle-1 font-weight-bold text-warning">
                  {{ formatMoneyLAK(paymentDue) }}
                </span>
              </div>
            </v-col>
            <v-col cols="6">
              <div
                class="d-flex flex-column align-center pa-3 bg-grey-lighten-5 rounded-lg"
              >
                <span class="text-caption text-medium-emphasis mb-1">ກຳໄລ</span>
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
            class="mb-3"
            @click="openDialogSubmit"
            height="56"
          >
            <v-icon start size="24">mdi-check-circle-outline</v-icon>
            ແຈ້ງການໂອນເງິນ
          </v-btn>

          <v-btn
            block
            variant="text"
            color="grey-darken-1"
            size="large"
            rounded="xl"
            to="/cart"
          >
            ກັບຄືນໄປກະຕ່າ
          </v-btn>
        </v-card-text>
      </v-card>
    </v-container>

    <!-- Confirm Dialog -->
    <v-dialog v-model="dialogSubmit" width="400">
      <v-card rounded="xl">
        <v-card-title
          class="bg-primary text-white py-3 px-4 d-flex align-center justify-space-between"
        >
          <span class="text-h6 font-weight-bold">ລາຍລະອຽດການໂອນ</span>
          <v-btn
            icon
            variant="text"
            color="white"
            density="compact"
            @click="dialogSubmit = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="pa-4">
          <div class="text-body-2 text-medium-emphasis mb-2">
            ໝາຍເຫດເພີ່ມເຕີມ
          </div>
          <v-textarea
            v-model="note"
            placeholder="ແຈ້ງ: ເບີຜູ້ຝາກ, ເບີຜູ້ຮັບ, ສາຂາບໍລິສັດຂົນສົ່ງ..."
            variant="outlined"
            color="primary"
            rounded="lg"
            bg-color="grey-lighten-5"
            rows="4"
            hide-details
          ></v-textarea>
        </v-card-text>
        <v-card-actions class="pa-4 pt-0">
          <v-row dense>
            <v-col cols="6">
              <v-btn
                block
                color="grey-darken-1"
                variant="tonal"
                size="large"
                rounded="xl"
                @click="dialogSubmit = false"
              >
                ຍົກເລີກ
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn
                block
                color="primary"
                variant="flat"
                size="large"
                rounded="xl"
                elevation="0"
                :disabled="note.length === 0"
                @click="submitPayment"
              >
                ຢືນຢັນ
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { useFormat } from "@/composables/useFormat";
import { storeToRefs } from "pinia";
import { useApiCartStore } from "@/stores/apiCart";

const { formatMoneyLAK, formatNumber } = useFormat();

const { checkout, fetchCart } = useApiCartStore();
const { cart } = storeToRefs(useApiCartStore());

const note = ref("");
const dialogSubmit = ref(false);

onMounted(() => {
  fetchCart();
});

const totalAmount = computed(() =>
  cart.value.reduce(
    (total, item) => total + item.product.price * item.all_quantity,
    0
  )
);

const paymentDue = computed(() =>
  cart.value.reduce((total, item) => total + Number(item.all_price), 0)
);

const totalProfit = computed(() =>
  cart.value.reduce(
    (total, item) => total + Number(item.profit) * item.all_quantity,
    0
  )
);

const openDialogSubmit = () => {
  dialogSubmit.value = true;
};

const submitPayment = () => {
  try {
    const data = {
      user_id: useCookie("id").value,
      notes: note.value,
    };
    checkout(data);
    dialogSubmit.value = false;
    navigateTo("/pay/comfirm");
  } catch (error) {
    console.log(error);
  }
};
</script>

<style scoped>
.product-container {
  background-color: #f8f9fa;
}
</style>
