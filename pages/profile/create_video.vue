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
            <span>ເພີ່ມວິດີໂອ</span>
          </h2>
        </div>
      </div>

      <!-- Form Card -->
      <v-card class="rounded-xl pa-4" elevation="0" color="white">
        <v-card-text class="pa-0">
          <div class="d-flex align-center mb-6">
            <v-avatar color="primary-lighten-5" size="48" class="mr-3">
              <v-icon color="primary" size="24">mdi-video-plus</v-icon>
            </v-avatar>
            <div>
              <div class="text-subtitle-1 font-weight-bold">
                <span>ຂໍ້ມູນວິດີໂອ</span>
              </div>
              <div class="text-caption text-medium-emphasis">
                <span>ກະລຸນາປ້ອນຂໍ້ມູນວິດີໂອຂອງທ່ານ</span>
              </div>
            </div>
          </div>

          <v-row dense>
            <v-col cols="12">
              <div class="text-caption font-weight-bold mb-1 ml-1">ຫົວຂໍ້</div>
              <v-text-field
                v-model="title"
                placeholder="ປ້ອນຫົວຂໍ້ວິດີໂອ"
                variant="outlined"
                density="comfortable"
                color="primary"
                rounded="lg"
                prepend-inner-icon="mdi-format-title"
                :rules="[(v) => !!v || 'ກະລຸນາປ້ອນຫົວຂໍ້ວິດີໂອ']"
                bg-color="grey-lighten-5"
                hide-details="auto"
                class="mb-3"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <div class="text-caption font-weight-bold mb-1 ml-1">
                ວິດີໂອ ID
              </div>
              <v-text-field
                v-model="video_id"
                placeholder="ປ້ອນວິດີໂອ ID"
                variant="outlined"
                density="comfortable"
                color="primary"
                rounded="lg"
                prepend-inner-icon="mdi-identifier"
                :rules="[(v) => !!v || 'ກະລຸນາປ້ອນວິດີໂອ ID']"
                bg-color="grey-lighten-5"
                hide-details="auto"
                class="mb-3"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <div class="text-caption font-weight-bold mb-1 ml-1">
                ລິ້ງວິດີໂອ
              </div>
              <v-text-field
                v-model="link"
                placeholder="ປ້ອນລິ້ງວິດີໂອ"
                variant="outlined"
                density="comfortable"
                color="primary"
                rounded="lg"
                prepend-inner-icon="mdi-link-variant"
                :rules="[(v) => !!v || 'ກະລຸນາປ້ອນລິ້ງວິດີໂອ']"
                bg-color="grey-lighten-5"
                hide-details="auto"
                class="mb-4"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions class="d-flex flex-column pa-0 mt-2">
          <v-btn
            block
            color="primary"
            variant="flat"
            size="large"
            rounded="xl"
            elevation="0"
            class="mb-3"
            @click="handleAddVideo"
            height="48"
          >
            ເພີ່ມວິດີໂອ
          </v-btn>
          <v-btn
            block
            color="grey-darken-1"
            variant="text"
            size="large"
            rounded="xl"
            @click="$router.back()"
          >
            ຍົກເລິກ
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { useApiVideoStore } from "@/stores/apiVideo";

const title = ref("ຫົວຂໍ້ຂາຍເຄື່ອງ");
const video_id = ref("7514213853316648210");
const link = ref(
  "https://www.tiktok.com/@anuwat662/video/7514213853316648210?is_from_webapp=1&sender_device=pc"
);

const { addVideo } = useApiVideoStore();

const handleAddVideo = async () => {
  try {
    const data = {
      title: title.value,
      video_id: video_id.value,
      link: link.value,
    };
    await addVideo(data);
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
