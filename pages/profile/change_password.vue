<template>
    <div class="px-2 my-4">
        <v-card elevation="3" rounded="xl">
            <v-card-title class="bg-primary mb-4" dark>
                <h4>ປ່ຽນລະຫັດຜ່ານ</h4>
            </v-card-title>
            <v-card-text>
                <v-row dense>
                    <v-col cols="12">
                        <v-text-field placeholder="ລະຫັດຜ່ານເກົ່າ" variant="solo" color="primary" elevation="3"
                            rounded="xl"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field placeholder="ລະຫັດຜ່ານໃໝ່" variant="solo" color="primary" elevation="3"
                            rounded="xl"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field placeholder="ຢືນຢັນລະຫັດຜ່ານໃໝ່" variant="solo" color="primary" elevation="3"
                            rounded="xl"></v-text-field>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions class="d-flex align-center justify-center pb-6">
                <v-btn color="red" variant="outlined" size="large" width="185" class="rounded-xl" @click="$router.back()">ຍົກເລິກ</v-btn>
                <v-btn color="primary" variant="elevated" size="large" width="185" class="rounded-xl">ປ່ຽນລະຫັດຜ່ານ</v-btn>
            </v-card-actions>
          
        </v-card>
    </div>
</template>