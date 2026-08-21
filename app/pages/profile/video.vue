<template>
  <div
    class="product-container pb-16 bg-grey-lighten-5"
    style="min-height: 100vh"
  >
    <div class="pt-4 px-2">
      <!-- Header -->
      <div class="d-flex align-center justify-space-between mb-4 px-2">
        <div class="d-flex align-center">
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
            <span>ບັນທິກວິດີໂອ</span>
          </h2>
        </div>
      </div>

      <!-- Actions -->
      <v-container fluid class="pa-0 mb-4">
        <v-row dense align="center">
          <v-col cols="8">
            <v-text-field
              placeholder="ຄົ້ນຫາວິດີໂອ..."
              variant="solo"
              density="comfortable"
              hide-details
              prepend-inner-icon="mdi-magnify"
              class="rounded-lg"
              bg-color="white"
              flat
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-btn
              color="primary"
              height="48"
              block
              elevation="0"
              class="rounded-lg text-capitalize"
              to="/profile/create_video"
            >
              <v-icon start>mdi-plus</v-icon>
              ເພີ່ມ
            </v-btn>
          </v-col>
        </v-row>
      </v-container>

      <!-- Video List -->
      <v-container fluid class="pa-0">
        <div class="d-flex align-center mb-3 px-2">
          <v-icon color="primary" class="mr-2">mdi-video-outline</v-icon>
          <h3 class="text-subtitle-1 font-weight-bold text-primary">
            <span>ລາຍການວິດີໂອ</span>
          </h3>
        </div>

        <v-row dense>
          <v-col cols="12" sm="6" md="4" v-for="(item, i) in videos" :key="i">
            <v-card
              class="video-card rounded-xl border-0"
              elevation="0"
              color="white"
              @click="openVideo(item)"
              link
            >
              <div class="d-flex align-center pa-3">
                <v-avatar
                  size="60"
                  color="primary-lighten-5"
                  class="rounded-lg mr-3"
                >
                  <v-icon color="primary" size="32"
                    >mdi-play-circle-outline</v-icon
                  >
                </v-avatar>

                <div class="flex-grow-1 overflow-hidden">
                  <div
                    class="text-subtitle-2 font-weight-bold text-truncate mb-1"
                  >
                    <span>{{ item.title }}</span>
                  </div>
                  <div class="d-flex align-center">
                    <v-icon size="14" color="grey" class="mr-1"
                      >mdi-calendar-clock</v-icon
                    >
                    <span class="text-caption text-medium-emphasis">
                      <span>{{ formatDate(item.createdAt) }}</span>
                    </span>
                  </div>
                </div>

                <v-btn icon variant="text" color="primary" size="small">
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
              </div>
            </v-card>
          </v-col>
        </v-row>

        <!-- Empty State -->
        <div
          v-if="videos.length === 0"
          class="d-flex flex-column align-center justify-center py-16"
        >
          <v-icon size="64" color="grey-lighten-2" class="mb-4"
            >mdi-video-off-outline</v-icon
          >
          <h3 class="text-h6 text-grey-darken-1 font-weight-medium">
            <span>ບໍ່ມີວິດີໂອ</span>
          </h3>
          <p class="text-body-2 text-grey-lighten-1">
            <span>ກະລຸນາເພີ່ມວິດີໂອໃໝ່</span>
          </p>
        </div>
      </v-container>
    </div>

    <!-- Video Dialog -->
    <v-dialog v-model="dialog" width="600">
      <v-card rounded="xl">
        <v-card-title
          class="bg-primary text-white py-3 px-4 d-flex align-center justify-space-between"
        >
          <span class="text-h6 font-weight-bold text-truncate pr-4">{{
            link.title || "ວິດີໂອ"
          }}</span>
          <v-btn
            icon
            variant="text"
            color="white"
            density="compact"
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="pa-0 bg-black d-flex justify-center">
          <iframe
            :src="`https://www.tiktok.com/embed/${link.video_id}`"
            style="width: 100%; max-width: 440px; height: 550px; border: none"
            allow="encrypted-media"
            loading="lazy"
          ></iframe>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useApiVideoStore } from "@/stores/apiVideo";
import { useFormat } from "@/composables/useFormat";

const { formatDate } = useFormat();
const { fetchVideos } = useApiVideoStore();
const { videos } = storeToRefs(useApiVideoStore());

const link = ref({});
const dialog = ref(false);

onMounted(() => {
  fetchVideos();
});

const openVideo = (item) => {
  try {
    link.value = item;
    dialog.value = true;
  } catch (error) {
    console.log(error);
  }
};
</script>

<style scoped>
.product-container {
  background-color: #f8f9fa;
}
.video-card {
  transition: all 0.3s ease;
}
.video-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05) !important;
}
</style>
