<template>
    <div class="px-2 my-4 ">
         <v-card elevation="0" rounded="xl">
            <v-card-title class="d-flex align-center justify-center">
                <v-avatar size="200" elevation="3">
                    <v-img src="https://brandmark.io/logo-rank/random/pepsi.png"></v-img>
                </v-avatar>
            </v-card-title>
            <v-card-title class="d-flex align-center justify-center">
                <h4>ເຂົ້າສູ່ລະບົບ</h4>
            </v-card-title>
            <v-card-title>
                <v-card elevation="3" rounded="xl" height="60" class="d-flex align-center " to="/login/login">
                   <v-card-title>
                       <h4>ເຂົ້າສູ່ລະບົບ</h4>
                   </v-card-title>
                </v-card>
            </v-card-title>
            <v-card-title>
                <v-card elevation="3" rounded="xl" height="60" class="d-flex align-center " to="/login/register">
                   <v-card-title>
                       <h4>ລົງທະບຽນ</h4>
                   </v-card-title>
                </v-card>
            </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <div class="d-flex align-center justify-center" color="primary"  >
                <h4>ຖ້າທ່ານລຶມລະຫັດຜ່ານ <v-btn color="red" variant="text">ໄປທີ່ນີ້</v-btn></h4>
            </div>
          </v-card-actions>
         </v-card>
    </div>
</template>