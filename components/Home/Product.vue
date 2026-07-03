<template>
  <div class="product-container pb-16 bg-grey-lighten-5">
   

    <!-- Product Grid -->
    <v-container fluid class="px-4 mt-2">
      <div class="d-flex align-center justify-space-between mb-4">
        <div class="d-flex align-center">
          <v-icon color="primary" class="mr-2">mdi-view-grid</v-icon>
          <h2 class="text-h6 font-weight-bold text-primary">
            <span>ສິນຄ້າທັງໝົດ</span>
          </h2>
        </div>
        <div
          class="d-flex align-center text-primary cursor-pointer"
          @click="navigateTo('/product')"
        >
          <span class="text-body-2 font-weight-medium"
            ><span>ເບິ່ງທັງໝົດ</span></span
          >
          <v-icon size="small" class="ml-1">mdi-arrow-right</v-icon>
        </div>
      </div>

      <v-row dense>
        <v-col
          cols="6"
          sm="4"
          md="3"
          lg="2"
          v-for="(item, i) in products"
          :key="i"
        >
          <v-hover v-slot="{ isHovering, props }">
            <v-card
              v-bind="props"
              class="product-card rounded-xl fill-height d-flex flex-column border-0"
              elevation="0"
              @click="openDialogAddCart(item)"
              color="white"
            >
              <div class="position-relative pa-2">
                <v-card
                  class="rounded-xl bg-grey-lighten-4 overflow-hidden"
                  elevation="0"
                >
                  <v-img
                    :src="'http://localhost:8000/' + item.image"
                    aspect-ratio="1"
                    cover
                    class="product-image"
                    :class="{ 'zoom-effect': isHovering }"
                  >
                    <template v-slot:placeholder>
                      <div
                        class="d-flex align-center justify-center fill-height bg-grey-lighten-4"
                      >
                        <v-progress-circular
                          indeterminate
                          color="primary"
                          size="24"
                        ></v-progress-circular>
                      </div>
                    </template>
                  </v-img>
                </v-card>

                <v-btn
                  icon
                  variant="flat"
                  color="white"
                  size="small"
                  class="position-absolute top-0 right-0 mt-4 mr-4 rounded-circle"
                  style="z-index: 2"
                  elevation="1"
                >
                  <v-icon color="grey" size="20">mdi-heart-outline</v-icon>
                </v-btn>
              </div>

              <div class="px-3 pb-3 d-flex flex-column flex-grow-1">
                <div
                  class="text-subtitle-2 font-weight-bold mb-1 text-truncate-2"
                  style="min-height: 40px"
                >
                  <span>{{ item.title }}</span>
                </div>

                <div class="d-flex align-center justify-space-between mt-auto">
                  <div class="text-subtitle-1 font-weight-bold text-primary">
                    <span>{{ formatMoneyLAK(item.price) }}</span>
                  </div>
                  <v-btn
                    icon
                    variant="flat"
                    color="primary"
                    size="small"
                    class="rounded-circle"
                    elevation="0"
                  >
                    <v-icon size="18" color="white">mdi-cart-outline</v-icon>
                  </v-btn>
                </div>
              </div>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>

    <!-- Add to Cart Dialog -->
    <v-dialog
      v-model="dialogAddCart"
      max-width="450"
      transition="dialog-bottom-transition"
    >
      <v-card class="rounded-xl overflow-hidden">
        <div class="position-relative">
          <v-img
            :src="'http://localhost:8000/' + itemDialog.image"
            height="300"
            cover
          >
            <div
              class="d-flex flex-column fill-height justify-end pa-4"
              style="
                background: linear-gradient(
                  to top,
                  rgba(0, 0, 0, 0.7),
                  transparent
                );
              "
            >
              <h3 class="text-h5 font-weight-bold text-white">
                <span>{{ itemDialog.title }}</span>
              </h3>
            </div>
          </v-img>
          <v-btn
            icon="mdi-close"
            variant="flat"
            color="white"
            size="small"
            class="position-absolute top-0 right-0 ma-3"
            @click="closeDialog"
          ></v-btn>
        </div>

        <v-card-text class="pt-4 pb-2">
          <div class="d-flex justify-space-between align-center mb-4">
            <span class="text-medium-emphasis">ລາຄາ</span>
            <h3 class="text-h4 font-weight-bold text-primary">
              <span>{{ formatMoneyLAK(itemDialog.price) }}</span>
            </h3>
          </div>

          <p
            class="text-body-2 text-medium-emphasis mb-4 bg-grey-lighten-5 pa-3 rounded-lg"
          >
            <span>{{ itemDialog.description || "ບໍ່ມີຄຳອະທິບາຍ" }}</span>
          </p>

          <v-divider class="mb-4"></v-divider>

          <!-- Profit Info -->
          <div
            class="bg-teal-lighten-5 rounded-lg pa-3 mb-4 border-dashed"
            style="border-color: rgba(0, 128, 128, 0.2)"
          >
            <div
              class="text-subtitle-2 font-weight-bold text-primary mb-2 d-flex align-center"
            >
              <v-icon start size="small" color="primary">mdi-chart-line</v-icon>
              <span>ກຳໄລ່ຈາກການຊື້ສິນຄ້າ</span>
            </div>
            <div class="text-caption text-medium-emphasis pl-1">
              <div class="d-flex justify-space-between mb-1">
                <span>10 ລົງມາ:</span>
                <span class="font-weight-bold text-secondary"
                  >{{ formatMoneyLAK(0) }} ກິບ / ອັນ</span
                >
              </div>
              <div
                v-for="(d, index) in discount"
                :key="index"
                class="d-flex justify-space-between mb-1"
              >
                <span>{{ d.product_amount }} ຂື້ນໄປ:</span>
                <span class="font-weight-bold text-secondary"
                  >{{ formatMoneyLAK(d.discount_price) }} ກິບ / ອັນ</span
                >
              </div>
            </div>
          </div>
        </v-card-text>

        <v-card-actions class="pa-4 pt-0">
          <v-row dense align="center">
            <v-col cols="4">
              <v-text-field
                v-model.number="quantity"
                type="number"
                variant="outlined"
                density="compact"
                hide-details
                label="ຈຳນວນ"
                min="1"
                class="centered-input rounded-lg"
                color="primary"
              ></v-text-field>
            </v-col>
            <v-col cols="8">
              <v-btn
                block
                color="primary"
                size="large"
                rounded="pill"
                elevation="0"
                :disabled="quantity <= 0"
                @click="addProductToCart"
              >
                <v-icon start>mdi-cart-arrow-down</v-icon>
                ເພີ່ມເຂົ້າກະຕ່າ
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
import { useApiProductTypeStore } from "@/stores/apiProductType";
import { useApiProductStore } from "@/stores/apiProduct";
import { useApiCartStore } from "@/stores/apiCart";
import { useApiSetProfitStore } from "@/stores/apiSetProfit";
import { useApiDiscountStore } from "@/stores/apiDiscount";

const apiDiscountStore = useApiDiscountStore();
const { getDiscount } = apiDiscountStore;
const { discount } = storeToRefs(apiDiscountStore);

const apiSetProfitStore = useApiSetProfitStore();
const { setProfit } = apiSetProfitStore;
const { profit } = storeToRefs(apiSetProfitStore);

const apiProductTypeStore = useApiProductTypeStore();
const { types } = storeToRefs(apiProductTypeStore);

const apiProductStore = useApiProductStore();
const { products } = storeToRefs(apiProductStore);

const apiCartStore = useApiCartStore();
const { addCart } = apiCartStore;
const { fetchCart } = apiCartStore;
const { fetchProductTypes } = apiProductTypeStore;
const { fetchProducts } = apiProductStore;

onMounted(() => {
  fetchProductTypes();
  fetchProducts();
  fetchCart();
  setProfit();
});

const { formatMoneyLAK } = useFormat();

const dialogAddCart = ref(false);
const itemDialog = ref({});
const quantity = ref(1);

const openDialogAddCart = (item) => {
  dialogAddCart.value = true;
  itemDialog.value = item;
  quantity.value = 1; // Reset quantity
  getDiscount(item.id);
};

const closeDialog = () => {
  dialogAddCart.value = false;
};

const addProductToCart = async () => {
  try {
    const token = useCookie("token");
    const userId = useCookie("id");

    if (!token.value || !userId.value) {
      return navigateTo("/login");
    }

    if (quantity.value === 0) {
      console.log("Quantity must be more than 0");
      return;
    }

    let discountPrice = itemDialog.value.price;

    console.log(discount.value);

    discount.value.map((item) => {
      if (quantity.value >= item.product_amount) {
        discountPrice = item.discount_price;
      }
    });

    const data = {
      user_id: userId.value,
      product_id: itemDialog.value.id,
      product_amount: quantity.value,
      price: discountPrice,
      profit: itemDialog.value.price, // You might want to adjust this if profit is affected by discount
    };

    // console.log('Cart Data:', data);

    await addCart(data);
    await fetchCart(userId.value);
    dialogAddCart.value = false;
  } catch (error) {
    console.error("Error adding product to cart:", error);
  }
};
</script>

<style scoped>
.product-container {
  background-color: #f8f9fa; /* Light grey background for the whole section */
}
.product-card {
  transition: all 0.3s ease;
  overflow: hidden;
}
.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05) !important;
}
.border-dashed {
  border: 1px dashed;
}
:deep(.centered-input input) {
  text-align: center;
}
.text-truncate-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.product-image {
  transition: transform 0.3s ease;
}
.zoom-effect {
  transform: scale(1.05);
}
</style>
