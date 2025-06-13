<template>
    <div class="px-2 my-4">
        <v-row dense>
            <v-col cols="12">
                <v-card class="d-flex align-center justify-center mx-4" color="#f5f5f5" elevation="0"  rounded="xl" height="200">
                    <v-icon size="50" color="primary">mdi-image</v-icon>
                </v-card>
            </v-col>
            <v-col cols="12" >
                <v-text-field variant="filled" color="primary" placeholder="ຊື່" 
                    prepend-inner-icon="mdi-account" class="mx-4" ></v-text-field>
                <v-text-field variant="filled" placeholder="ເບິໂທ" color="primary" 
                    prepend-inner-icon="mdi-cellphone" class="mx-4" ></v-text-field>
            </v-col>
            <v-col cols="12" >
                <v-text-field variant="filled" placeholder="ອີເມວ" color="primary" 
                    prepend-inner-icon="mdi-email" class="mx-4" ></v-text-field>
                <v-textarea variant="filled" placeholder="ທີຢູ່" color="primary" 
                    prepend-inner-icon="mdi-map-marker" class="mx-4" ></v-textarea>

                <v-text-field variant="filled" disabled placeholder="Beginner" color="primary" 
                    prepend-inner-icon="mdi-star" class="mx-4" ></v-text-field>
                <v-text-field variant="filled" placeholder="ບັດປະຈຳຕົວ" color="primary" 
                    prepend-inner-icon="mdi-card-account-details" class="mx-4" ></v-text-field>
                <v-card class="mx-4 mb-4 d-flex align-center justify-center" color="#f5f5f5" elevation="0" rounded="xl" height="200" >
                    <div class="text-center">
                        <v-icon size="50" color="primary">mdi-image</v-icon>
                        <p >ເລືອກບັດປະຈຳຕົວ</p>
                    </div>
                </v-card>
                <v-text-field variant="filled" placeholder="ບັດທະນາຄານ" color="primary" 
                    prepend-inner-icon="mdi-card-account-details" class="mx-4" ></v-text-field>
                    <v-card class="mx-4 mb-4 d-flex align-center justify-center" color="#f5f5f5" elevation="0" rounded="xl" height="200" >
                    <div class="text-center">
                        <v-icon size="50" color="primary">mdi-image</v-icon>
                        <p>ເລືອກບັດທະນາຄານ</p>
                    </div>
                </v-card>
            </v-col>
        </v-row>
        <div>
            <v-card-actions class="d-flex align-center justify-center">
                <v-btn color="red" variant="outlined" size="large" width="165" class="rounded-xl"
                    to="/login"> <v-icon class="mr-2">mdi-cancel</v-icon> ຍົກເລິກ</v-btn>
                <v-btn color="primary" variant="elevated" size="large" width="165" class="rounded-xl"> <v-icon class="mr-2">mdi-content-save</v-icon> ບັນທີກ</v-btn>
            </v-card-actions>
        </div>
    </div>
</template>