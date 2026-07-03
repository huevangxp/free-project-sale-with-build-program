<template>
  <div
    class="product-container pb-16 bg-grey-lighten-5"
    style="min-height: 100vh"
  >
    <Header />
    <div class="pt-4 px-2">
      <HomeSlide />
    </div>

    <v-container fluid class="px-4 mt-4">
      <!-- Section header -->
      <div class="d-flex align-center mb-4">
        <v-sheet
          color="primary"
          rounded="lg"
          class="d-flex align-center justify-center mr-3"
          height="40"
          width="40"
        >
          <v-icon color="white">mdi-image-multiple</v-icon>
        </v-sheet>
        <div>
          <h2 class="text-h6 font-weight-bold text-primary">
            <span>ຮູບໂຄສະນາ</span>
          </h2>
          <span class="text-caption text-medium-emphasis">
            {{ promotions.length }} ຮູບພາບ
          </span>
        </div>
      </div>

      <!-- Loading skeletons -->
      <v-row v-if="loading && promotions.length === 0" dense>
        <v-col cols="12" sm="6" md="4" lg="3" v-for="n in 8" :key="n">
          <v-skeleton-loader
            type="image"
            class="rounded-xl"
          ></v-skeleton-loader>
        </v-col>
      </v-row>

      <!-- Grid -->
      <v-row v-else dense>
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          v-for="(item, i) in promotions"
          :key="i"
        >
          <v-hover v-slot="{ isHovering, props }">
            <v-card
              v-bind="props"
              class="promotion-card rounded-xl overflow-hidden"
              :elevation="isHovering ? 6 : 0"
              color="white"
            >
              <div class="position-relative">
                <v-img
                  :src="'http://localhost:8000/' + item.image"
                  aspect-ratio="1"
                  cover
                  class="promotion-image"
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

                  <!-- Bottom gradient + like count overlay -->
                  <div class="promotion-overlay d-flex align-end pa-3">
                    <v-chip
                      color="white"
                      size="small"
                      class="font-weight-bold"
                      label
                    >
                      <v-icon start size="16" color="error">mdi-heart</v-icon>
                      29
                    </v-chip>
                  </div>
                </v-img>

                <!-- Download button -->
                <v-btn
                  icon
                  variant="flat"
                  color="white"
                  size="small"
                  class="position-absolute top-0 right-0 ma-3 rounded-circle"
                  style="z-index: 2"
                  elevation="2"
                  @click.stop="downloadImage(item.image)"
                >
                  <v-icon color="primary" size="20">mdi-download</v-icon>
                </v-btn>
              </div>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>

      <!-- Empty state -->
      <div
        v-if="!loading && promotions.length === 0"
        class="text-center py-16 text-medium-emphasis"
      >
        <v-icon size="64" color="grey-lighten-1">mdi-image-off-outline</v-icon>
        <p class="text-body-2 mt-2">ຍັງບໍ່ມີຮູບໂຄສະນາ</p>
      </div>
    </v-container>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useApiPromotionStore } from "@/stores/apiPromotion";

const apiPromotionStore = useApiPromotionStore();
const { promotions } = storeToRefs(apiPromotionStore);

const { fetchPromotions } = apiPromotionStore;

onMounted(() => {
  fetchPromotions();
});

const downloadImage = (image) => {
  const link = document.createElement("a");
  link.href = "http://localhost:8000/" + image;
  link.download = image;
  link.click();
};
</script>

<style scoped>
.product-container {
  background-color: #f8f9fa;
}
.promotion-card {
  transition: all 0.3s ease;
  overflow: hidden;
}
.promotion-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05) !important;
}
.promotion-image {
  transition: transform 0.3s ease;
}
.zoom-effect {
  transform: scale(1.05);
}
</style>
