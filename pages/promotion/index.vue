<template>
  <div
    class="product-container pb-16 bg-grey-lighten-5"
    style="min-height: 100vh"
  >
    <div class="pt-4 px-2">
      <HomeSlide />
    </div>

    <v-container fluid class="px-4 mt-4">
      <div class="d-flex align-center justify-space-between mb-4">
        <div class="d-flex align-center">
          <v-icon color="primary" class="mr-2">mdi-image-multiple</v-icon>
          <h2 class="text-h6 font-weight-bold text-primary">
            <span>ຮູບໂຄສະນາ</span>
          </h2>
        </div>
      </div>

      <v-row dense>
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
              class="promotion-card rounded-xl fill-height border-0"
              elevation="0"
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
                  @click.stop="downloadImage(item.image)"
                >
                  <v-icon color="primary" size="20">mdi-download</v-icon>
                </v-btn>
              </div>

              <div class="px-3 pb-3 pt-1">
                <div class="d-flex align-center">
                  <v-icon color="error" size="20" class="mr-1"
                    >mdi-heart</v-icon
                  >
                  <span
                    class="text-subtitle-2 font-weight-bold text-grey-darken-1"
                    >29</span
                  >
                </div>
              </div>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
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
