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
        >
          {{ link }}
        </v-btn>
        <v-col class="text-center mt-4 white-colors" cols="12">
          {{ new Date().getFullYear() }} — <strong>Robot Escape</strong>
        </v-col>
      </v-row>
    </v-footer>
  </template>
  
  <script>
    export default {
      data: () => ({
        links: [
          'Home',
          'About Us',
          'Team',
          'Services',
          'Blog',
          'Contact Us',
        ],
      }),
    }
  </script>