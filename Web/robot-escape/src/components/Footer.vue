<template>
    <v-footer class="footer black-layouts">
      <v-row justify="center" no-gutters>
        <v-col class="copyright-div text-center mt-4" cols="12">
          <strong class="copyright-text">™ & © {{ new Date().getFullYear() }} Quadrinomial Creations, Inc. Todos los derechos reservados.Quadrinomial Creations y Robot Escape son marcas comerciales o marcas registradas de Quadrinomial Creations, Inc.</strong>
        </v-col>
        <v-btn
          v-for="link in links"
          :key="link"
          class="mx-2"
          color="white"
          rounded="xl"
          variant="text"
          :to="link.route"
        >
          {{ link.page }}
        </v-btn>
        
      </v-row>
    </v-footer>
  </template>
  
  <script>
    export default {
      data: () => ({
        links: [
          {
            page: 'Home',
            route: '/',
          },
          {
            page: 'About Us',
            route: '/aboutus',
          },
          {
            page: 'FAQ',
            route: '/faq',
          },
          {
            page: 'Rankings',
            route: '/rankings',
          },
          {
            page: 'Contact Us',
            route: '/contactus',
          }
        ],
      }),
    }
  </script>

<style scoped>
.copyright-text {
  font-size: 12px; /* Adjust this value to your liking */
  color: lightgrey;
}

.copyright-div{
  margin: 60px;
}
.footer{
  padding: 30px;
}
</style>