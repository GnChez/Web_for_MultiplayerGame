<template>
  <v-app id="inspire" class="centered">
    <v-content>
      <v-container fluid fill-height>
        <v-row class="centered">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12 centered" style="padding-bottom: 10px">
            <br>    
              <v-card-text>
                <p class="secondfont">Enter the email address associated with your account<br>and we'll send you a link to reset your password</p>
                <br>
                <br>
                <br>
                <v-form>
                  <v-text-field
                    class="secondfont"
                    v-model="email"
                    name="email"
                    label="EMAIL"
                    type="email"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions class="centered">
                <v-btn class="enter-button" @click="sendEmail()">SEND EMAIL</v-btn>
                
              </v-card-actions>
              <br>
              <div class="secondfont">
                  <p class="secondfont">Don't Have an Account? <router-link class="light-blue-colors" to="/register" style="color: inherit; text-decoration: none;">Sign Up</router-link></p>
                </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { useAppStore } from "../stores/app";
export default {
  name: "ForgotPasswordForm",
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
    sendEmail() {
        this.loading = true;
        this.appStore
            .forgotPassword(this.email)
            .then(() => {
            this.loading = false;
            this.$router.push("/login");
            })
            .catch(() => {
            this.loading = false;
            });
    }
  },
};
</script>
