<template>
    <div class=" my-4">
        <div>
            <v-row dense >
                <v-col v-for="i in 3" cols="4" md="4">
                <v-card class="d-flex align-center justify-center" elevation="3" rounded="xl">
                   <div>
                    <v-img
                        src="https://satopradhan.com/cdn/shop/files/Preview-1Almond_SheaSoap.jpg?v=1713608647"
                        cover
                        height="40" 
                        width="40"
                    ></v-img>

                   </div>
                    <v-card-title class="text-center">ສະບຸ</v-card-title>
                </v-card>
                </v-col>
            </v-row>
        </div>
        <v-card class="my-4 " color="primary" dark elevation="3" rounded="xl" >
           <v-card-title class="d-flex align-center justify-space-between">
            <h4>ສິນຄ້າ</h4>
            <v-avatar color="white" size="small" @click="navigateTo('/product')"><v-icon size="20">mdi-arrow-right</v-icon></v-avatar>
           </v-card-title>
          
        </v-card>
        <v-row dense>
            <v-col cols="6" md="4" v-for="(item,i) in items" :key="i">
                <v-card class="rounded-xl" elevation="3">
                    <v-img
                        :src="item.src"
                        height="120"
                        cover
                    ></v-img>

                    <v-card-title>
                        <h4>
                            {{ item.title }}
                        </h4>
                    </v-card-title>
                    <v-card-text>
                        <h2 class="text-primary">
                            {{ item.price }}
                        </h2>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script setup>
    const items = [
        {
            src: 'https://i.pinimg.com/736x/aa/94/c6/aa94c694ded179d97311cadbf26cbb01.jpg',
            title: 'ສະບູ',
            price: '10000',
            description: 'Description 1',
        },
        {
            src: 'https://cdn.shopify.com/s/files/1/0623/4688/7385/files/soap_bar_600x600.jpg?v=1682486305',
            title: 'Product 2',
            price: '10000',
            description: 'Description 2',
        },
        {
            src: 'https://m.media-amazon.com/images/I/71ECuJ8sqdL._AC_UF1000,1000_QL80_.jpg',
            title: 'Product 3',
            price: '10000',
            description: 'Description 3',
        },
        {
            src: 'https://i5.walmartimages.com/seo/Dove-Shea-Butter-Beauty-Cream-Moisturizing-Bar-Soap-with-Vanilla-Scent_c3c85a38-2507-421b-8590-f16a35e8c487.cb095ab01faff492695f18981601cb6f.jpeg',
            title: 'Product 4',
            price: '10000',
            description: 'Description 4',
        },
    ]
</script>

    