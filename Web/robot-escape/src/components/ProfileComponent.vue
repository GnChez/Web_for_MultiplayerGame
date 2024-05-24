<template>
    <v-container class="black-layouts white-colors secondfont">
      <v-divider class="section-divider"></v-divider>
      <v-row class="rows center">
        <v-col cols="12" sm="6" class="center">
          <p class="secondfont-bold">Username</p>
        </v-col>
        <v-col cols="12" sm="6" class="centeraligned-col">
          <v-form class="secondfont">
            <p class="secondfont-bold" style="font-size: 20px;">{{ username }}</p>
            <br>
            <div class="centered">
              <v-btn
              class="profile-button simplified-enter-button"
              @click="redirect('/changeusername')"
              >Change Username</v-btn
            >
            </div>
            
          </v-form>
        </v-col>
      </v-row>
      <v-divider class="section-divider"></v-divider>
      <v-row class="rows">
        <v-col cols="12" sm="6" class="center">
          <p class="secondfont-bold">Password</p>
        </v-col>
        <v-col cols="12" sm="6" class="centeraligned-col">
          <v-form class="secondfont">
            <div class="centered">
              <v-btn
              class="profile-button simplified-enter-button"
              
              @click="redirect('/forgotpassword')"
              >Reset Password</v-btn
            >
            </div>  
            
          </v-form>
        </v-col>
      </v-row>
      <v-divider class="section-divider"></v-divider>
    </v-container>
  </template>
  
  <script>
  import { computed, watch } from 'vue';
  import { useAppStore } from '@/stores/app';
  
  export default {
    setup() {
      const appStore = useAppStore();
      const username = appStore.getLoginInfo.data.username;
  
      // Watch for changes in username to log them
      watch(username, (newValue, oldValue) => {
        console.log("Username changed from", oldValue, "to", newValue);
      });
  
      return {
        username,
        
      };
    },
    methods: {
      redirect(ruta) {
          this.$router.push(ruta);
        },
    }
  };
  </script>
  
  <style scoped>
  .rows {
    margin: 50px;
  }
  .centeraligned-col {
    text-align: center;
    justify-content: center;
  }
  .section-divider {
    background-color: white;
  }
  .profile-button {
    margin: 15px;
  }
  .center {
    display: flex;
    text-align: center;
    align-items: center;
  }
  </style>
  