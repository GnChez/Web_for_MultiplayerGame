<template>
  <v-content>
    <v-container fluid fill-height>
      <v-row class="centered">
        <v-card class="elevation-12 centered" style="padding-bottom: 10px">
          <br />
          <v-card-text>
            <p class="secondfont">
              Before changing your username, first verify<br />it is available
            </p>
            <br />
            <br />
            <br />
            <v-form>
              <v-text-field
                class="secondfont"
                v-model="username"
                name="username"
                label="NEW USERNAME"
                type="text"
                :color="verified === null ? '' : verified ? 'green' : 'red'"
                :rules="usernameRules"
                @input="verifyUsername"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions class="centered">
            <v-btn
              class="enter-button centered"
              :disabled="!verified"
              @click="updateUsername()"
              >UPDATE</v-btn
            >
          </v-card-actions>
          <br />
        </v-card>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import { useAppStore } from "../stores/app";
import { isUsernameAvailable, updateUsername } from "@/communicationsManager";
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
      verified: null,
      username: "",
      password: "",
      loading: false,
      usernameRules: [],
    };
  },
  methods: {
    async verifyUsername() {
      if (this.username == "" || this.username == null) {
        this.verified = false;
        this.usernameRules = ["Username cannot be empty"];
        return;
      }
      isUsernameAvailable(this.username).then((isAvailable) => {
        if (!isAvailable) {
          this.verified = false;
          this.usernameRules = ["Username being used"];
        } else {
          this.verified = true;
          this.usernameRules = [];
        }
      });
    },
    updateUsername() {
        updateUsername(this.appStore.getLoginInfo.data,this.username).then(() => {
            this.appStore.setUsername(this.username);
            this.$router.push("/profile");
        });
    },
  },
};
</script>
