<template>
    <div class="px-2 my-4">
        <v-card>
            <v-card-title class="bg-primary mb-2">
                <h4>ການຈ່າຍເງິນ</h4>
            </v-card-title>
            <!-- {{ order }} -->
            <v-card-text>
               <v-card color="#f5f5f5" elevation="0" rounded="xl" height="400" class="d-flex align-center justify-center" @click="uploadImage">
                  <div v-if="!imageUrl" class="text-center">
                    <v-icon size="50" color="primary">mdi-image</v-icon>
                    <v-card-title>
                        <h4>ອັບໂຫຼດຮູບຈ່າຍເງິນ</h4>
                    </v-card-title>
                  </div>
                  <v-img v-else :src="imageUrl" cover height="100%"></v-img>
               </v-card>
               <v-file-input 
                 ref="fileInput"
                 v-model="imageFile" 
                 id="picture" 
                 variant="solo" 
                 color="primary" 
                 elevation="3" 
                 rounded="xl" 
                 class="d-none" 
                 accept="image/*"
                 @change="handleUploadImage"
               ></v-file-input>
            </v-card-text>
            <v-card-actions class="px-4">
                <v-spacer></v-spacer>
                <v-btn color="red" rounded="pill" size="large" variant="outlined" @click="navigateTo('/pay')">
                    <v-icon size="30">mdi-close</v-icon> ຍົກເລິກ
                </v-btn>
                <v-btn color="primary" rounded="pill" size="large" variant="elevated" :disabled="!imageFile" @click="submitPayment">
                    <v-icon size="30">mdi-check-decagram</v-icon> ອານຸຍາດ
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useApiOrderStore } from '@/stores/apiOrder';
const { getOrderId, orderPayment } = useApiOrderStore()
const { order } = storeToRefs(useApiOrderStore())
// const {  } = useApiOrderStore()
 
const fileInput = ref<HTMLInputElement | null>(null);
const imageFile = ref<File | null>(null);
const imageUrl = ref<string>('');

const uploadImage = () => {
    fileInput.value?.click();
}

const handleUploadImage = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
        // imageFile.value = input.files[0];
        imageUrl.value = URL.createObjectURL(input.files[0]);
    }
}

const submitPayment = () => {
   try {
    const data = {
        image: imageFile.value,
        id: order.value.id
    }
    orderPayment(data)

    
   } catch (error) {
    console.log(error)
   }
}

// Clean up the object URL when component unmounts
onUnmounted(() => {
    if (imageUrl.value) {
        URL.revokeObjectURL(imageUrl.value);
    }
    getOrderId()
});
</script>