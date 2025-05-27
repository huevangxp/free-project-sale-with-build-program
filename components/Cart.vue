<template>
    <div>
        <v-row class="my-4" dense>
            <v-col cols="12" v-for="(item, i) in items" :key="i">
                <v-card class="rounded-xl d-flex align-center" elevation="3">
                    <div>
                        <v-img :src="item.src" width="150" height="130" cover></v-img>
                    </div>

                    <v-card-title>
                        <h3 class="text-primary">
                            {{ item.title }}
                        </h3>
                        <lazy-prose-h5 class="text-red">
                            {{ formatMoneyLAK(item.price) }}
                        </lazy-prose-h5>
                        <p class="fontsize text-primary">
                            {{ formatDate(item.date) }}
                        </p>

                    </v-card-title>
                    <v-card-title>
                        <h4>

                            <v-btn color="primary" elevation="0" rounded="xl" variant="text"><v-icon
                                    size="20">mdi-plus</v-icon></v-btn>
                        </h4>
                        <h4 class="text-center">
                            1
                        </h4>
                        <v-btn color="primary" elevation="0" rounded="xl" variant="text"><v-icon
                                size="20">mdi-minus</v-icon></v-btn>
                    </v-card-title>

                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script setup>

import { useFormat } from '@/composables/useFormat';
const { formatMoneyLAK, formatNumber, formatDate } = useFormat();

const items = [
    {
        src: 'https://i.pinimg.com/736x/aa/94/c6/aa94c694ded179d97311cadbf26cbb01.jpg',
        title: 'ສະບູ',
        price: 10000,
        description: 'Description 1',
        date: new Date(),
    },
    {
        src: 'https://cdn.shopify.com/s/files/1/0623/4688/7385/files/soap_bar_600x600.jpg?v=1682486305',
        title: 'ສະບູ',
        price: 10000,
        description: 'Description 2',
        date: new Date(),
    },
    {
        src: 'https://m.media-amazon.com/images/I/71ECuJ8sqdL._AC_UF1000,1000_QL80_.jpg',
        title: 'ສະບູ',
        price: 10000,
        description: 'Description 3',
        date: new Date(),
    },
    {
        src: 'https://i5.walmartimages.com/seo/Dove-Shea-Butter-Beauty-Cream-Moisturizing-Bar-Soap-with-Vanilla-Scent_c3c85a38-2507-421b-8590-f16a35e8c487.cb095ab01faff492695f18981601cb6f.jpeg',
        title: 'ສະບູ',
        price: 10000,
        description: 'Description 4',
        date: new Date(),
    },
]
</script>
 
<style scoped>
.fontsize {
    font-size: 15px;
}
</style>