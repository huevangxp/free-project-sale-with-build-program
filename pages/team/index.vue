<template>
    <div class="px-2 my-4">
        <v-card elevation="3" rounded="xl" color="primary" dark>
            <v-card-title class="d-flex align-center justify-space-between">
                <h4>ທິມງານ VIP</h4>
                <v-avatar color="white" size="small" ><v-icon size="20">mdi-arrow-right</v-icon></v-avatar>
            </v-card-title>
           
        </v-card>
        <v-row class="my-4" dense >
            <v-col cols="12"   v-for="(item,i) in items" :key="i">
                <v-card elevation="3" rounded="xl" class="d-flex align-center" >
                  <div>
                    <v-img
                        :src="item.src"
                        height="120"
                        width="120"
                        cover
                    ></v-img>
                  </div>

                    <div>
                        <v-card-title>
                        <h4>
                            {{ item.title }}
                        </h4>
                        
                    </v-card-title>
                    <v-card-text>
                        <h3 class="mb-2 text-primary">
                            {{ item.role }}
                        </h3>
                        <h4>
                            ຊື້: <span class="text-red">{{ item.team }}</span> ອັນ
                        </h4>
                    </v-card-text>
                 
                    </div>
                </v-card>
            </v-col>
        </v-row>
        <v-card elevation="3" rounded="xl" color="primary" dark>
            <v-card-title class="d-flex align-center justify-space-between">
                <h4>ທິມງານ Diamond</h4>
                <v-avatar color="white" size="small" ><v-icon size="20">mdi-arrow-right</v-icon></v-avatar>
            </v-card-title>
           
        </v-card>
        <v-row class="my-4" dense >
            <v-col cols="6"   v-for="(item,i) in items" :key="i">
                <v-card elevation="3" rounded="xl" >
                  <div size="120"  class="mx-auto" >
                    <v-img
                        :src="item.src"
                        height="120"
                        cover
                    ></v-img>
                  </div>

                    <div>
                        <v-card-title>
                        <h4>
                            {{ item.title }}
                        </h4>
                        
                    </v-card-title>
                    <v-card-text>
                        <h3 class="mb-2 text-primary">
                            {{ item.role }}
                        </h3>
                        <h4>
                            ຊື້: <span class="text-red">{{ item.team }}</span> ອັນ
                        </h4>
                    </v-card-text>
                 
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script setup>
    const items = [
        {
            src: 'https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D',
            title: 'ທ່ານ ລີຟອງ ວ່າງ',
            role: 'VIP 1',
            team: 40,
            
        },
        {
            src: 'https://img.freepik.com/free-photo/portrait-dark-skinned-confident-man-with-curly-afro-hairstyle-has-calm-face-expression_273609-8520.jpg?semt=ais_hybrid&w=740',
            title: 'ທ່ານ ຕູ້ເລົ່າ',
            role: 'VIP 2',
            team: 30,
        },
        {
            src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStXI4aFavbIuTn76SefZMBOiFM4JrqzPQFVsDm9X4fkqZ1cMCxXX09CcPgopgprcuz8hw&usqp=CAU',
            title: 'ທ່ານ ກະເຢັ່ງ ເລົ່າ',
            role: 'VIP 3',
            team: 20,
        },
         
    ]
</script>

