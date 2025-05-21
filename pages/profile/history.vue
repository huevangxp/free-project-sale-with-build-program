<template>
    <div class="px-2 my-4">
        <v-card>
            <v-card-title class="bg-primary mb-6" dark>
                <h4> <v-icon size="30" @click="$router.back()">mdi-arrow-left</v-icon> ປະຫວັດການຊື້ເຄື່ອງ</h4>
            </v-card-title>
            <v-card-title>
                <v-row dense>
                    <v-col cols="4">
                       <v-card elevation="3" rounded="xl">
                        <v-card-title class=" ">
                            <h6 class="text-center"> ຈຳນວນເງິນ</h6>
                            <h5 class="text-center text-primary">10 000 000</h5>
                            <h6 class="text-center">ກິບ</h6>
                        </v-card-title>
                       </v-card>
                    </v-col>
                    <v-col cols="4" >
                        <v-card elevation="3" rounded="xl" class="bg-info">
                        <v-card-title class=" ">
                            <h6 class="text-center text-white"> ຈຳນວນເຄື່ອງ</h6>
                            <h5 class="text-center text-white">10 000</h5>
                            <h6 class="text-center text-white">ອັນ</h6>
                        </v-card-title>
                       </v-card>
                    </v-col>
                    <v-col cols="4">
                        <v-card elevation="3" rounded="xl" class="bg-primary">
                        <v-card-title >
                            <h6 class="text-center text-white"> ເງິນກຳໄລ</h6>
                            <h5 class="text-center text-white">5 000 000</h5>
                            <h6 class="text-center text-white">ກິບ</h6>
                        </v-card-title>
                       </v-card>
                    </v-col>
                </v-row>
            </v-card-title>
            <v-card-text>
                <v-row dense>
                    <v-col cols="8" md="6">
                            <v-text-field placeholder="ຊື້ເຄື່ອງ" variant="solo" color="primary" elevation="3" rounded="xl"></v-text-field>
                    </v-col>
                    <v-col cols="4" md="6">
                           <v-btn color="primary" height="55" block elevation="3" rounded="xl" style="font-size: 16px;">ຄົ້ນຫາ</v-btn>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
        <v-card class="mt-5">
            <v-card-title class="bg-primary mb-4" dark>
                <h4> <v-icon size="30" @click="$router.back()">mdi-arrow-left</v-icon> ປະຫວັດການຊື້ເຄື່ອງ</h4>
            </v-card-title>
            <v-card-text>

                <v-row >
                    <v-col cols="12" v-for="(item,i) in 6" :key="i">
                        <v-card elevation="3" rounded="xl" class="d-flex align-center">
                            <div>
                                <v-img src="https://thebeautyinsideout.com/wp-content/uploads/2021/11/Dove-Soap.jpg" height="120" width="120" cover></v-img>

                            </div>
                            <v-card-title>
                                <h4 class="text-primary">ປະຫວັດການຊື້ເຄື່ອງ</h4>
                                <p style="font-size: 15px;">ຈຳນວນ <span class="text-primary">100</span> </p>
                                <p style="font-size: 15px;">ລາຄາລວມ <span class="text-primary">100 000</span> ກິບ</p>
                                <p style="font-size: 15px;">ວັນທີ <span class="text-primary">2025-05-21</span></p>
                            </v-card-title>
                        </v-card>
                    </v-col>
                </v-row>
                
            </v-card-text>
        </v-card>
    </div>
</template>