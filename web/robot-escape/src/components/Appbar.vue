<template>
  <v-container class="pa-0">
    <v-app-bar :elevation="5" class="py-1 px-10 black-layouts">
      <v-spacer> </v-spacer>
      <template v-slot:prepend>
        <div @click="redirect('/')" id="clickable">
          <v-img
            class="mx-2"
            src="@/assets/images/robot.png"
            max-height="40"
            width="40"
            contain
          >
          </v-img>
          <v-btn
            variant="flat"
            :ripple="false"
            class="black-layouts white-colors"
          >
            <h2>ROBOT ESCAPE</h2>
          </v-btn>
        </div>

        <div v-for="(button, index) in opciones" id="no-background-hover">
          <v-btn
            class="black-layouts white-colors secondfont"
            :key="index"
            :ripple="false"
            variant="flat"
            @click="redirect(button.ruta)"
          >
            <a>{{ button.text }}</a>
          </v-btn>
        </div>
      </template>

      <template v-slot:append>
        <v-btn variant="flat" class="mx-5" @click="download()"
          ><v-icon icon="$descargar" size="x-large"></v-icon>
          Download
        </v-btn>
        <v-btn
          variant="outlined"
          v-if="!logged"
          @click="redirect('/login')"
          class="black-layouts white-colors"
        >
          Sign in
        </v-btn>
        <v-menu v-if="logged" open-on-hover offset-y bottom class="custom-menu">
          <template v-slot:activator="{ props }">
            
            <v-btn style="justify-content: space-between;" class="black-layouts white-colors" v-bind="props">
              <p class="secondfont white-colors">{{ this.username }}</p><v-icon icon="$menu" size="x-large"></v-icon>
            </v-btn>
          </template>
          <v-list class="text-center gray-layouts menu-divider custom-list">
            <v-divider class="yellow-colors menu-divider"></v-divider>
            <v-list-item
              class="white-colors"
              v-for="(item, index) in menuOptions"
              @click="redirect(item.ruta)"
              :key="index.text"
              :value="index.text"
            >
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item>
            <v-list-item
              class="white-colors"
              @click="logout()"
              key="Logout"
              value="Logout"
            >
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
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
      username: "",
      logged: false,
      menuOptions: [{ text: "Profile", ruta: "/profile" }],
      opciones: [
        { text: "FAQ", ruta: "/faq" },
        { text: "About us", ruta: "/aboutus" },
        { text: "Rankings", ruta: "/rankings" },
        { text: "Contact us", ruta: "/contactus" },
      ],
    };
  },
  mounted() {
    this.$nextTick(() => {
      if (this.appStore.isAuthenticated) {
        this.logged = true;
        this.username = this.appStore.getLoginInfo.data.username;
      }
    });
  },
  watch: {
    'appStore.isAuthenticated': function(newVal) {
      this.logged = newVal;
      this.username = this.appStore.getLoginInfo.username;
    },
    'appStore.getLoginInfo.data.username': function(newVal) {
      if (newVal) {
        this.username = newVal;
      }
    }
  },
  methods: {
    redirect(ruta) {
      this.$router.push(ruta);
    },
    download() {
      downloadGame();
    },
    logout() {
      this.appStore.logout();
      this.$router.push({ path: "/" });
    },
  },
};
</script>
<style lang="css">
#no-background-hover:hover {
  border-bottom: solid white;
}

#clickable {
  cursor: pointer;
  display: flex;
}
.custom-menu .v-menu__content {
  border-radius: 10px; /* adjust as needed */
  background-color: #f0f0f0; /* adjust as needed */
}

.thick-divider {
  border-top-width: 2px; /* adjust as needed */
}

.custom-list {
  border-bottom: 2px solid white; /* adjust as needed */
}
</style>
