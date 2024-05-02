<template>
  <v-menu min-width="200px" rounded>
    <template v-slot:activator="{ props }">
      <v-btn style="z-index: 20" position="absolute" icon v-bind="props">
        <v-avatar color="brown" size="large">
        </v-avatar>
      </v-btn>
    </template>
    <v-card>
      <v-card-text>
        <div class="mx-auto text-center myfont">
          <v-badge
            :icon="`${mdiPencil}`"
            class="av"
            location="bottom end"
            offset-x="15"
            offset-y="7"
            @click="dialogL = true"
          >
            <v-avatar color="brown" size="100" @click="dialogL = true">
            </v-avatar>
          </v-badge>
          <h2 class="mt-2">{{ user.name }}</h2>
          <p class="text-caption mt-1">
            {{ user.email }}
          </p>
          <v-divider class="my-3"></v-divider>
          <v-btn @click="perfil()" rounded variant="text"> Perfil </v-btn>
          <v-divider class="my-3"></v-divider>
          <v-btn @click="logout()" rounded variant="text">
            Tancar sessió
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script >
import { useAppStore } from '@/stores/app';
import { mdiPencil } from '@mdi/js'
export default {
  data() {
    const appStore = useAppStore()
    const user = appStore.getLoginInfo();

    return {
      rules: [
        value => {
          return !value || !value.length || value[0].size < 1000000 || 'La mida excedeix els 1 MB!'
        },
      ],

      mdiPencil,
      dialogL: false,
      boton: null
    };
  },
  computed: {
  },
  setup() {
    const store = useAppStore()
    const user = store.getLoginInfo;
    return {
      user, store,
    }
  },
  methods:
  {
    closeDialog() {
      this.dialogL = false;
      this.picture = '';
    },
    logout() {
      this.store.logout().then((result) => {
        if (result) {
          console.log("Login Session: ", this.store.getLoginInfo)
          this.$router.push({ name: "Home" });
        }
      })

    },
    perfil() {
      this.$router.push({ name: "Profile" });
    }
  }
}

</script>

<style>
.closable-card {
  cursor: pointer;
}
.closable-card:hover {
  background-color: #143360 !important;
}
#lateral .v-btn--example {
  bottom: 0;
  position: absolute;
  margin: 0 0 16px 16px;
}
</style>

