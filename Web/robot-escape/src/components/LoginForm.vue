<template>
    <v-content>
      <v-container fluid fill-height>
        <v-row class="centered">
          <v-col cols="12" sm="8" md="4" >
            <v-card class="elevation-12 centered" style="padding-bottom: 10px;" >
              <v-toolbar >
                <v-toolbar-title  class=" medium-font secondfont-bold bigfont centered">Sign in</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    class="secondfont"
                    v-model="username"
                    name="username"
                    label="USERNAME"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    class="secondfont"
                    v-model="password"
                    id="password"
                    name="password"
                    label="PASSWORD"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions class="centered">
                <v-btn
                  class="enter-button centered"
                  @click="login"
                  >🡺</v-btn
                >
              </v-card-actions>
              <br>
              <div>
                <div class="secondfont light-blue-colors">
                  <router-link to="/forgotpassword" style="color: inherit; text-decoration: none;">Can't Sign In?</router-link>
                </div>
                <div class="secondfont">
                  <p class="secondfont">Don't Have an Account? <router-link class="light-blue-colors" to="/register" style="color: inherit; text-decoration: none;">Sign Up</router-link></p>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
</template>

<script>
import { useAppStore } from "../stores/app";
export default {
  name: "LoginForm",
  setup() {
    const appStore = useAppStore();
    return {
      appStore,
    };
  },
  data() {
    return {
      username: "",
      password: "",
      loading: false,
    };
  },
  methods: {
    login() {
      this.loading = true;
      this.appStore.setUsername(this.username);
      this.appStore.setPassword(this.password);
      this.appStore
        .login()
        .then((result) => {
          if (result) {
            console.log(result);
            this.$router.push({ path: "/" });
          } else {
            console.log("Login failed");
          }
        })
        .catch((error) => {
          console.error("Error during login:", error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
