<template>
    <div class="px-2 my-4">
        <v-card>
            <v-card-title class="bg-primary mb-6" dark>
                <h4> <v-icon size="30" @click="$router.back()">mdi-arrow-left</v-icon> ບັນທິກວິດີໂອ</h4>
            </v-card-title>
            <v-card-text>
                <v-row dense>
                    <v-col cols="8" md="6">
                        <v-text-field placeholder="ຊື້ເຄື່ອງ" variant="solo" color="primary" elevation="3"
                            rounded="xl"></v-text-field>
                    </v-col>
                    <v-col cols="4" md="6">
                        <v-btn color="primary" height="55" block elevation="3" rounded="xl"
                            style="font-size: 16px;" to="/profile/create_video">ເພີ່ມວິດີໂອ</v-btn>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>

        <v-card elevation="3" class="mt-4">
            <v-card-title>
                <h4>ລູກຄ້າ</h4>
            </v-card-title>
            <v-card-title>
                <v-row dense>
                    <v-col cols="12" v-for="(item,i) in videos" :key="i">
                        <v-card elevation="3" rounded="xl" class="d-flex align-center" @click="openVideo(item)">
                            <v-card-title>
                                <v-icon size="100" color="primary">mdi-video</v-icon>
                            </v-card-title>
                          
                            <v-card-title>
                                <h4 class="text-primary">{{ item.title }}</h4>
                                <h6>ວັນທີ <span class="text-red">{{ formatDate(item.createdAt) }}</span></h6>
                                <v-btn color="primary" size="small" elevation="0" rounded="xl"
                                   >ເບີ່ງ</v-btn>
                            </v-card-title>
                           
                        </v-card>
                    </v-col>
                </v-row>
            </v-card-title>
        </v-card>

    </div>

    <v-dialog v-model="dialog" width="600">
        <v-card>
            <v-card-title class="d-flex align-center justify-space-between">
                <h4 class="text-primary">ລູກຄ້າ</h4>
                <v-icon size="30" color="red" @click="dialog = false">mdi-close</v-icon>
            </v-card-title>
            <v-card-text>
                <iframe 
                              :src="`https://www.tiktok.com/embed/${link.video_id}`"
                            style="width: 100%; max-width: 440px; height: 550px; border: none;" 
                            allow="encrypted-media" 
                            loading="lazy"
                            ></iframe>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script setup>

import { storeToRefs } from 'pinia'
import { useApiVideoStore } from '@/stores/apiVideo'
// import useFormat to use formatDate
import { useFormat } from '@/composables/useFormat';

const {  formatDate } = useFormat();

const { fetchVideos } = useApiVideoStore()
const { videos } = storeToRefs(useApiVideoStore())

const link = ref({})

onMounted(() => {
    fetchVideos()
})

const dialog = ref(false)

const openVideo = (item) => {
    try {
        dialog.value = true
         link.value = item
        } catch (error) {
        console.log(error)
    }
}
</script>
