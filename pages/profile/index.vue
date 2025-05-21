<template>
    <div class="px-2 my-4">
        <v-card elevation="3" rounded="xl" class="d-flex align-center">
            <v-card-title>
                 <v-img src="https://img.freepik.com/premium-photo/portrait-serious-african-guy-looking-camera_116547-37326.jpg?semt=ais_hybrid&w=740" height="150" width="120" cover></v-img>
            </v-card-title>
        <div>
            <v-card-text>
                <h2 class="text-primary d-flex align-center justify-space-between" style="width: 100%;"><div>ທ່ານ ລີຟອງ ວ່າງ</div> 
                </h2>
                <h4>ອີເມວ: <span class="text-primary">lisfoom@gmail.com</span></h4>
                <h4>ເບິໂທ: <span class="text-primary">085555555</span></h4>
                <h4>ສະຖານະ: <span class="text-primary">VIP</span></h4>
                <h4>ລູກທິມ: <span class="text-red">100</span> ຄົນ</h4>
            </v-card-text>
          
        </div>
        </v-card>
        <v-card elevation="3" rounded="xl" color="primary" dark class="my-4">
            <v-card-title>
                <h4>ລູກຄ້າຊື້ສິນຄ້າຫຼາຍທີ່ສຸດ</h4>
            </v-card-title>
        </v-card>
        <v-row dense>
            <v-col cols="6" md="6" v-for="(item,i) in items" :key="i">
                <v-card elevation="3" rounded="xl" :to="item.link">
                    <v-card-title class="d-flex justify-center  align-center ">
                        <h4 class="text-primary">{{ item.title }}</h4>
                         
                    </v-card-title>
                    <v-card-title class="d-flex justify-center  align-center ">
                            <v-icon size="100" color="primary">{{ item.icon }}</v-icon>
                    </v-card-title>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script setup lang="ts">

const items = [
    {
        icon: 'mdi-account',
        title: 'ທິມງານ',
        link: '/profile/team'
    },
    {
        icon: 'mdi-history',
        title: 'ປະຫວັດການຊື້ເຄື່ອງ',
        link: '/profile/history'
    },
    {
        icon: 'mdi-information',
        title: 'KYC',
        link: '/profile'
    },
    {
        icon: 'mdi-video',
        title: 'ບັນທິກວິດີໂອ',
        link: '/profile/video'
    },
    {
        icon: 'mdi-currency-usd',
        title: 'ລາຍໄດ້ຈາກການຂາຍ',
        link: '/profile'
    },
    {
        icon: 'mdi-form-textbox-password',
        title: 'ປ່ຽນລະຫັດຜ່ານ',
        link: '/profile/change_password'
    },
]

</script>