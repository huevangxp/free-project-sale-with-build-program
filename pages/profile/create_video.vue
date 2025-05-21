<template>
    <div class="px-2 my-4">
        <v-card elevation="3" rounded="xl">
            <v-card-title class="d-flex align-center justify-space-between">
                <h4 class="text-primary">ລູກຄ້າ</h4>
                <v-btn color="red" elevation="0" rounded="xl" variant="outlined">ຍົກເລິກ</v-btn>
            </v-card-title>
          
        </v-card>
        <v-card elevation="3"  class="mt-4">
            <v-card-title class="bg-primary mb-4" dark>
                <h4>ເພີ່ມວິດີໂອ</h4>
            </v-card-title>
            <v-card-text class="pb-0">
                <v-row dense>
                    <v-col cols="12">
                        <v-text-field placeholder="ຊື້" variant="solo" color="primary" elevation="3"
                            prepend-inner-icon="mdi-account"
                            rounded="xl"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field placeholder="ວິດີໂອ" variant="solo" color="primary" elevation="3"
                            prepend-inner-icon="mdi-video"
                            rounded="xl"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field placeholder="ວິດີໂອ" variant="solo" color="primary" elevation="3"
                            prepend-inner-icon="mdi-video"
                            rounded="xl"></v-text-field>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions class="d-flex align-center justify-center pb-6">
                <v-btn color="red" variant="outlined" size="large" width="185" class="rounded-xl" @click="$router.back()">ຍົກເລິກ</v-btn>
                <v-btn color="primary" variant="elevated" size="large" width="185" class="rounded-xl">ເພີ່ມວິດີໂອ</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>