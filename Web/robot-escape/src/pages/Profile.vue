<template>
  <v-container class="black-layouts white-colors secondfont">
    <v-divider class="section-divider"></v-divider>
    <v-row class="rows center">
      <v-col cols="12" sm="6" class="center">
        <p class="secondfont-bold">Username</p>
      </v-col>
      <v-col cols="12" sm="6" class="centeraligned-col">
        <v-form class="secondfont">
          <p>{{ this.username }}</p>
          <v-btn
            class="profile-button"
            color="primary"
            @click="redirect('/changeusername')"
            >Change Username</v-btn
          >
        </v-form>
      </v-col>
    </v-row>
    <v-divider class="section-divider"></v-divider>
    <v-row class="rows">
      <v-col cols="12" sm="6" class="center">
        <p class="secondfont-bold">Password</p>
      </v-col>
      <v-col cols="12" sm="6" class="centeraligned-col">
        <v-form>
          <v-btn
            class="profile-button"
            color="primary"
            @click="redirect('/forgotpassword')"
            >Reset Password</v-btn
          >
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useAppStore } from '@/stores/app';

export default {
  setup() {
    const appStore = useAppStore();
    return {
      appStore,
    };
  },
  computed: {
    username() {
      return this.appStore.getLoginInfo.data.username || 'Not defined';
    },
  },
  data() {
    return {
      username: 'Not defined',
      password: '',
    };
  },
  created() {
    this.updateUsername();
  },
  methods: {
    redirect(ruta) {
      this.$router.push(ruta);
    },
    updateUsername() {
      this.username = this.appStore.getLoginInfo.data.username || 'Not defined';
    },
    // ...
  },
  watch: {
    'appStore.getLoginInfo.data.username': {
      immediate: true,
      handler() {
        this.updateUsername();
      },
    },
  },
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
