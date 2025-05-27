<template>
    <div class="px-2 my-4">
        <v-row dense>
            <v-col cols="6">
                <v-card class="d-flex align-center justify-center" elevation="3" rounded="xl" height="150">
                    <v-icon size="50" color="primary">mdi-plus</v-icon>
                </v-card>
            </v-col>
            <v-col cols="6" md="6">
                <v-text-field variant="solo" color="primary" placeholder="ຊື່" elevation="3" rounded="xl"
                    prepend-inner-icon="mdi-account" class="mx-4" icon-color="primary"></v-text-field>
                <v-text-field variant="solo" placeholder="ເບິໂທ" color="primary" elevation="3" rounded="xl"
                    prepend-inner-icon="mdi-cellphone" class="mx-4" icon-color="primary"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
                <v-text-field variant="solo" placeholder="ອີເມວ" color="primary" elevation="3" rounded="xl"
                    prepend-inner-icon="mdi-email" class="mx-4" icon-color="primary"></v-text-field>
                <v-textarea variant="solo" placeholder="ທີຢູ່" color="primary" elevation="3" rounded="xl"
                    prepend-inner-icon="mdi-map-marker" class="mx-4" icon-color="primary"></v-textarea>

                <v-text-field variant="solo" disabled placeholder="Beginner" color="primary" elevation="3" rounded="xl"
                    prepend-inner-icon="mdi-star" class="mx-4" icon-color="primary"></v-text-field>
                <v-text-field variant="solo" placeholder="ບັດປະຈຳຕົວ" color="primary" elevation="3" rounded="xl"
                    prepend-inner-icon="mdi-card-account-details" class="mx-4" icon-color="primary"></v-text-field>
                <v-card class="mx-4 mb-4 d-flex align-center justify-center" height="200" elevation="3" rounded="xl">
                    <div class="text-center">
                        <v-icon size="50" color="primary">mdi-plus</v-icon>
                        <p>ເລືອກບັດປະຈຳຕົວ</p>
                    </div>
                </v-card>
                <v-text-field variant="solo" placeholder="ບັດທະນາຄານ" color="primary" elevation="3" rounded="xl"
                    prepend-inner-icon="mdi-card-account-details" class="mx-4" icon-color="primary"></v-text-field>
                    <v-card class="mx-4 mb-4 d-flex align-center justify-center" height="200" elevation="3" rounded="xl">
                    <div class="text-center">
                        <v-icon size="50" color="primary">mdi-plus</v-icon>
                        <p>ເລືອກບັດທະນາຄານ</p>
                    </div>
                </v-card>
            </v-col>
        </v-row>
        <div>
            <v-card-actions class="d-flex align-center justify-center">
                <v-btn color="red" variant="outlined" size="large" width="165" class="rounded-xl"
                    to="/login">ຍົກເລິກ</v-btn>
                <v-btn color="primary" variant="elevated" size="large" width="165" class="rounded-xl">ບັນທີກ</v-btn>
            </v-card-actions>
        </div>
    </div>
</template>