<template>
  <v-app class= "yellow-layouts">
    <AppBar v-if="!showAppBar"/>
    <div class="ma-5 fixedHeight">
      <router-view />
    </div>
    <Footer v-if="!showFooter"/>
  </v-app>
</template>

<script>
import AppBar from '@/layouts/AppBar.vue';
import Footer from '@/layouts/Footer.vue';
export default {
  components:
    { AppBar, Footer },
    data() {
    return {
      showAppBar: false,
      showFooter: false,
      allowedRoutes: ['/login', '/register','/forgotpassword'],
      allowedFRoutes: []
    };
  },
  watch: {
    '$route'(to, from) {
      // Lógica para determinar si mostrar o no el app-bar basado en la ruta
      this.showAppBar = this.allowedRoutes.includes(to.path);
      this.showFooter = this.allowedFRoutes.includes(to.path);
    },
  },
}
</script>
<style>
  @font-face {
  font-family: 'oswald-regular';
  src: url('@/assets/fonts/Oswald/static/Oswald-Regular.ttf') format('truetype');
  }
  @font-face {
  font-family: 'oswald-bold';
  src: url('@/assets/fonts/Oswald/static/Oswald-Bold.ttf') format('truetype');
  }
  @font-face {
    font-family: 'lexend-regular';
    src: url('@/assets/fonts/Lexend/static/Lexend-Regular.ttf') format('truetype');
  }
  @font-face {
    font-family: 'lexend-bold';
    src: url('@/assets/fonts/Lexend/static/Lexend-Bold.ttf') format('truetype');
  }
  .fixedHeight {
    min-height: 80vh;
  }
</style>