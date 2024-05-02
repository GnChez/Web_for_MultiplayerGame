<template>
  <v-app>
    <AppBar v-if="!showAppBar"/>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import AppBar from './layouts/AppBar.vue';
export default {
  components:
    { AppBar },
    data() {
    return {
      showAppBar: false,
      allowedRoutes: ['/login', '/register'],
    };
  },
  watch: {
    '$route'(to, from) {
      // Lógica para determinar si mostrar o no el app-bar basado en la ruta
      this.showAppBar = this.allowedRoutes.includes(to.path);
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
</style>