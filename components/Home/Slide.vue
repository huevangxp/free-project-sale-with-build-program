<template>
  <div class="slide-container py-4">
    <v-container fluid class="pa-0">
      <v-card
        class="mx-4 rounded-xl overflow-hidden"
        elevation="6"
        :height="carouselHeight"
      >
        <v-carousel
          :height="carouselHeight"
          cycle
          interval="5000"
          :show-arrows="!mobile"
          hide-delimiter-background
          show-arrows-on-hover
          delimiter-icon="mdi-circle-small"
        >
          <v-carousel-item
            v-for="(item, i) in image"
            :key="i"
            :src="'http://localhost:8000/' + item.image"
            cover
          >
            <template v-slot:placeholder>
              <div
                class="d-flex align-center justify-center fill-height bg-grey-lighten-4"
              >
                <v-progress-circular
                  indeterminate
                  color="primary"
                ></v-progress-circular>
              </div>
            </template>
          </v-carousel-item>
        </v-carousel>
      </v-card>
    </v-container>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useDisplay } from "vuetify";
import { storeToRefs } from "pinia";
import { useApiSliderImageStore } from "@/stores/apiSliderImage";

const { mobile, name } = useDisplay();

const carouselHeight = computed(() => {
  switch (name.value) {
    case "xs":
      return 200;
    case "sm":
      return 300;
    case "md":
      return 400;
    case "lg":
      return 450;
    case "xl":
      return 500;
    case "xxl":
      return 600;
    default:
      return 400;
  }
});

const apiSliderImageStore = useApiSliderImageStore();
const { image } = storeToRefs(apiSliderImageStore);

const { fetchSliderImages } = apiSliderImageStore;

onMounted(() => {
  fetchSliderImages();
});
</script>

<style scoped>
.slide-container {
  /* Add a subtle background pattern or gradient if desired, 
     but keeping it clean for now to match the product page */
}

/* Customizing carousel delimiters */
:deep(.v-carousel__controls) {
  padding-bottom: 16px;
}
:deep(.v-btn--icon.v-btn--density-default) {
  width: 12px;
  height: 12px;
  margin: 0 4px;
}
:deep(.v-btn__content) {
  font-size: 8px;
}
:deep(.v-btn--active .v-btn__content) {
  color: white;
}
</style>
