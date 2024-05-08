<template>
    <v-footer class="dark-blue-layouts">
      <v-row justify="center" no-gutters>
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
        <v-col class="text-center mt-4 white-colors" cols="12">
          <strong>™ & © {{ new Date().getFullYear() }} Quadrinomial Creations, Inc. Todos los derechos reservados.Quadrinomial Creations y Robot Escape son marcas comerciales o marcas registradas de Quadrinomial Creations, Inc.</strong>
        </v-col>
      </v-row>
    </v-footer>
  </template>
  
  <script>
    export default {
      data: () => ({
        links: [
          {
            page: 'Home',
            route: '/home',
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