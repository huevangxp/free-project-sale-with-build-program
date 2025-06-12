<template>
    <div class="px-2 my-4">
        <v-card elevation="3"  class="mt-4">
            <v-card-title class="bg-primary mb-4" dark>
                <h4>ເພີ່ມວິດີໂອ</h4>
            </v-card-title>
            <v-card-text class="pb-0">
                <v-row dense>
                    <v-col cols="12">
                        <v-text-field v-model="title" placeholder="ຊື້" variant="filled" color="primary" elevation="3"
                            prepend-inner-icon="mdi-account"
                            :rules="[(v) => !!v || 'ກະລຸນາປ້ອນຊື້ວິດີໂອ']"
                           ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="video_id" placeholder="ວິດີໂອໄອດີ" variant="filled" color="primary" elevation="3"
                            prepend-inner-icon="mdi-video"
                            :rules="[(v) => !!v || 'ກະລຸນາປ້ອນວິດີໂອໄອດີ']"
                           ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="link" placeholder="ວິດີໂອລີ້ງ" variant="filled" color="primary" elevation="3"
                            prepend-inner-icon="mdi-video"
                            :rules="[(v) => !!v || 'ກະລຸນາປ້ອນວິດີໂອລີ້ງ']"
                           ></v-text-field>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions class="d-flex align-center justify-center pb-6">
                <v-btn color="red" variant="outlined" size="large" width="185" class="rounded-xl" @click="$router.back()">ຍົກເລິກ</v-btn>
                <v-btn color="primary" variant="elevated" size="large" elevation="0" width="185" class="rounded-xl" @click="handleAddVideo">ເພີ່ມວິດີໂອ</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script setup>

import { useApiVideoStore } from '@/stores/apiVideo'

const title = ref('ຫົວຂໍ້ຂາຍເຄື່ອງ')
const video_id = ref('7514213853316648210')
const link = ref('https://www.tiktok.com/@anuwat662/video/7514213853316648210?is_from_webapp=1&sender_device=pc')

const { addVideo } = useApiVideoStore()

const handleAddVideo = async () => {
    try {
        
        const data = {
            title: title.value,
            video_id: video_id.value,
            link: link.value
        }

        await addVideo(data)

    } catch (error) {
      console.log(error)
    }  
   }



</script>
