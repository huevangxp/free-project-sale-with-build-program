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
          <span>ບັນທິກວິດີໂອ</span>
        </h2>
      </div>

      <!-- Search + add -->
      <v-row dense align="center" class="mb-4">
        <v-col cols="8">
          <v-text-field
            v-model="search"
            placeholder="ຄົ້ນຫາວິດີໂອ..."
            variant="solo-filled"
            density="comfortable"
            hide-details
            clearable
            prepend-inner-icon="mdi-magnify"
            rounded="lg"
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
            rounded="lg"
            class="text-capitalize font-weight-bold"
            to="/profile/create_video"
          >
            <v-icon start>mdi-plus</v-icon>
            ເພີ່ມ
          </v-btn>
        </v-col>
      </v-row>

      <!-- Video list -->
      <div class="d-flex align-center mb-3 px-2">
        <v-icon color="primary" class="mr-2">mdi-video-outline</v-icon>
        <h3 class="text-subtitle-1 font-weight-bold text-primary">
          <span>ລາຍການວິດີໂອ</span>
        </h3>
        <v-spacer></v-spacer>
        <span class="text-caption text-medium-emphasis">
          {{ filteredVideos.length }}
        </span>
      </div>

      <!-- Loading skeletons -->
      <v-row v-if="loading && videos.length === 0" dense>
        <v-col cols="12" sm="6" md="4" v-for="n in 6" :key="n">
          <v-card class="rounded-xl" border flat>
            <v-skeleton-loader
              type="list-item-avatar-two-line"
            ></v-skeleton-loader>
          </v-card>
        </v-col>
      </v-row>

      <!-- Cards -->
      <v-row v-else dense>
        <v-col
          cols="12"
          sm="6"
          md="4"
          v-for="(item, i) in filteredVideos"
          :key="i"
        >
          <v-card
            class="video-card rounded-xl"
            border
            flat
            color="white"
            @click="openVideo(item)"
            link
          >
            <div class="d-flex align-center pa-3">
              <!-- Play thumbnail -->
              <div class="video-thumb mr-3">
                <v-icon color="white" size="28">mdi-play</v-icon>
              </div>

              <div class="flex-grow-1 min-width-0">
                <div class="text-subtitle-2 font-weight-bold text-truncate mb-1">
                  <span>{{ item.title }}</span>
                </div>
                <div class="d-flex align-center">
                  <v-icon size="13" color="grey" class="mr-1"
                    >mdi-calendar-clock</v-icon
                  >
                  <span class="text-caption text-medium-emphasis">
                    {{ formatDate(item.createdAt) }}
                  </span>
                </div>
              </div>

              <v-icon color="grey-lighten-1">mdi-chevron-right</v-icon>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <!-- Empty state -->
      <div
        v-if="!loading && filteredVideos.length === 0"
        class="d-flex flex-column align-center justify-center py-16 text-center"
      >
        <v-icon size="64" color="grey-lighten-1" class="mb-3"
          >mdi-video-off-outline</v-icon
        >
        <h3 class="text-subtitle-1 font-weight-bold text-medium-emphasis">
          <span>{{ search ? "ບໍ່ພົບວິດີໂອ" : "ບໍ່ມີວິດີໂອ" }}</span>
        </h3>
        <p class="text-body-2 text-medium-emphasis">
          <span>ກະລຸນາເພີ່ມວິດີໂອໃໝ່</span>
        </p>
      </div>
    </div>

    <!-- Video dialog -->
    <v-dialog
      v-model="dialog"
      width="600"
      transition="dialog-bottom-transition"
    >
      <v-card rounded="xl" class="overflow-hidden">
        <div
          class="d-flex align-center justify-space-between pa-4 bg-primary text-white"
        >
          <div class="d-flex align-center min-width-0">
            <v-icon class="mr-2">mdi-play-circle</v-icon>
            <span class="text-subtitle-1 font-weight-bold text-truncate">
           <div>   {{ link.title || "ວິດີໂອ" }}</div>
            </span>
          </div>
          <v-btn
            icon
            variant="tonal"
            color="white"
            size="small"
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>

        <div class="d-flex justify-center" style="background: #000">
          <iframe
            :src="`https://www.tiktok.com/embed/${link.video_id}`"
            style="width: 100%; max-width: 440px; height: 550px; border: none"
            allow="encrypted-media"
            loading="lazy"
          ></iframe>
        </div>
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
const loading = ref(true);
const search = ref("");

const filteredVideos = computed(() => {
  const q = (search.value || "").trim().toLowerCase();
  if (!q) return videos.value;
  return videos.value.filter((v) => (v.title || "").toLowerCase().includes(q));
});

onMounted(async () => {
  try {
    await fetchVideos();
  } finally {
    loading.value = false;
  }
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
.min-width-0 {
  min-width: 0;
}
.video-card {
  transition: background-color 0.2s ease, border-color 0.2s ease,
    transform 0.2s ease;
}
.video-card:hover {
  transform: translateY(-2px);
  border-color: rgba(var(--v-theme-primary), 0.4) !important;
  background-color: rgba(var(--v-theme-primary), 0.03) !important;
}
/* Modern play thumbnail */
.video-thumb {
  width: 56px;
  height: 56px;
  flex-shrink: 0;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    rgb(var(--v-theme-primary)) 0%,
    #2d7a74 100%
  );
}
</style>
