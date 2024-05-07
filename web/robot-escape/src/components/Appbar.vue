<template>
  <v-container class="pa-0">
    <v-app-bar :elevation="5" class="py-1 px-10 black-layouts">
      <v-spacer> </v-spacer>
      <template v-slot:prepend>
        <div @click='redirect("/home")' id="clickable">
          <v-img class="mx-2" src="@/assets/images/robot.png" max-height="40" width="40" contain>
          </v-img>
          <v-btn variant="flat" :ripple="false" class="black-layouts white-colors">
            <h2>ROBOT ESCAPE</h2>
          </v-btn>
        </div>

        <div v-for="(button, index) in opciones" id="no-background-hover">
          <v-btn class="black-layouts white-colors secondfont" :key="index" :ripple="false" variant="flat"
            @click="redirect(button.ruta)">
            <a>{{ button.text }}</a>
            
          </v-btn>
        </div>
      </template>

      <template v-slot:append>
        <v-btn variant="plain"><v-icon icon="$eye" size="x-large" @click="showUserData()"
            class="black-layouts white-colors"></v-icon>
          Show User Data
        </v-btn>
        <v-btn variant="flat" class="mx-5" @click="download"><v-icon icon="$descargar" size="x-large"></v-icon>
          Download
        </v-btn>
        <v-btn variant="outlined" v-if="!logged" @click="redirect('/login')" class="black-layouts white-colors">
          Sign in
        </v-btn>

      </template>
    </v-app-bar>
  </v-container>
</template>
<script>
import { useAppStore } from "@/stores/app";
import { downloadGame } from "@/communicationsManager";
export default {
  setup() {
    const appStore = useAppStore();
    return {
      appStore,
    };
  },
  data() {
    return {
      logged: false,
      opciones: [
        { text: "FAQ", ruta: "/faq" },
        { text: "About us", ruta: "/aboutus" },
        { text: "Ranking", ruta: "/rankings" },
        { text: "Contact us", ruta: "/contactus" },]
    };
  },
  methods: {
    redirect(ruta) {
      this.$router.push(ruta);
    },
    showUserData() {
      const userData = this.appStore.getLoginInfo();
      console.log(userData);
    }, download() {
      downloadGame()
    }
  },
};
</script>
<style lang="css">
#no-background-hover:hover {
  border-bottom: solid white;
}

#clickable {
  cursor: pointer;
  display: flex
}
</style>
