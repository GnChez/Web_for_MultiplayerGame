<template>
  <v-app id="inspire" class="centered">
    <v-content>
      <v-container fluid fill-height>
        <v-row class="centered">
          <v-col cols="12" sm="8" md="4">
            <v-card
              class="elevation-12 centered"
              style="padding-bottom: 10px; width: max-content"
            >
              <v-toolbar>
                <v-toolbar-title
                  class="medium-font secondfont-bold bigfont centered"
                  >Sign up</v-toolbar-title
                >
              </v-toolbar>
              <v-stepper v-model="step">
                <v-stepper-header>
                  <v-stepper-item
                    title="What's your email?"
                    :complete="step > 1"
                    value="1"
                  ></v-stepper-item>

                  <v-divider></v-divider>

                  <v-stepper-item
                    title="Set your personal data"
                    :complete="step > 2"
                    value="2"
                  ></v-stepper-item>

                  <v-divider></v-divider>

                  <v-stepper-item
                    title="Choose your user data"
                    :complete="step >= 3"
                    value="3"
                  ></v-stepper-item>
                </v-stepper-header>
              </v-stepper>
              <v-stepper-items> </v-stepper-items>
              <v-stepper-items>
                <v-stepper-content step="1" v-if="step === 1">
                  <v-card-text>
                    <v-form>
                      <v-text-field
                        class="secondfont"
                        id="email"
                        name="email"
                        label="EMAIL"
                        v-model="email"
                        :rules="emailRules"
                        required
                      >
                      </v-text-field>
                      <div>
                        <v-card-actions class="centered">
                          <v-btn
                            class="enter-button"
                            @click="verifyEmailAndProceed()"
                            :disabled="loading"
                            >NEXT</v-btn
                          >
                        </v-card-actions>
                        <div class="secondfont light-blue-colors">
                          <router-link
                            to="/login"
                            style="color: inherit; text-decoration: none"
                            >Already Have an Account? Log in</router-link
                          >
                        </div>
                      </div>
                    </v-form>
                  </v-card-text>
                </v-stepper-content>
                <v-stepper-content step="2" v-if="step === 2">
                  <v-card-text>
                    <v-form>
                      <v-text-field
                        class="secondfont"
                        v-model="name"
                        name="name"
                        label="FIRST NAME"
                        type="text"
                        :rules="textRules"
                        required
                      ></v-text-field>
                      <v-text-field
                        class="secondfont"
                        v-model="surname"
                        id="surname"
                        name="surname"
                        label="LAST NAME"
                        type="tesxt"
                        :rules="textRules"
                        required
                      ></v-text-field>
                      <div>
                        <v-card-actions class="centered">
                          <v-btn class="enter-button" @click="setStep(1)"
                            >BACK</v-btn
                          >
                          <v-btn
                            class="enter-button"
                            @click="verifyNameAndProceed()"
                            :disabled="loading"
                            >NEXT</v-btn
                          >
                        </v-card-actions>
                      </div>
                    </v-form>
                  </v-card-text>
                </v-stepper-content>
                <v-stepper-content step="3" v-if="step === 3">
                  <v-card-text>
                    <v-form>
                      <v-text-field
                        class="secondfont"
                        v-model="username"
                        name="username"
                        label="USERNAME"
                        type="text"
                        :rules="textRules"
                        required
                      ></v-text-field>
                      <v-text-field
                        class="secondfont"
                        v-model="password"
                        id="password"
                        name="password"
                        label="PASSWORD"
                        type="password"
                        :rules="passwordRules"
                        required
                      ></v-text-field>
                      <v-card-actions class="centered">
                        <v-btn class="enter-button" @click="setStep(2)"
                          >BACK</v-btn
                        >
                        <v-btn
                          class="enter-button"
                          @click="verifyUserDataAndProceed()"
                          >REGISTER</v-btn
                        >
                      </v-card-actions>
                    </v-form>
                  </v-card-text>
                </v-stepper-content>
              </v-stepper-items>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { useAppStore } from "../stores/app";
import { registerUser, isEmailAvailable, isUsernameAvailable } from "../communicationsManager";
export default {
  name: "RegisterForm",
  setup() {
    const appStore = useAppStore();
    return {
      appStore,
    };
  },
  data() {
    return {
      step: 1,
      name: "",
      surname: "",
      username: "",
      password: "",
      email: "",
      loading: false,
      emailAvailable: true,
      textRules: [(v) => !!v || "This field is required"],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => (v && v.length >= 8) || "Password must be at least 8 characters",
        (v) => /[a-z]/.test(v) || "Password must contain a lowercase letter",
        (v) => /[A-Z]/.test(v) || "Password must contain an uppercase letter",
        (v) => /[0-9]/.test(v) || "Password must contain a number",
      ],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) =>
          /.+@.+\..+/.test(v) || "E-mail must be valid  Ex: juan@gmail.com",
      ],
    };
  },
  methods: {
    setStep(newStep) {
      if (!this.loading) {
        this.step = newStep;
      }
    },
    verifyUserDataAndProceed() {
      console.log("Verifying user data");
      if (!this.username || !this.password) {
        this.$refs.usernameInput.validate();
        this.$refs.passwordInput.validate();
        return;
      }
      console.log("Is it available?")
      this.loading = true;
      isUsernameAvailable(this.username)
        .then((isAvailable) => {
          if (!isAvailable) {
            this.loading = false;
            this.textRules = [
              ...this.textRules,
              () =>
                "This username is already in use. Please choose another username.",
            ];
            this.$refs.usernameInput.validate();
          } else {
            // If username is available, proceed with registration
            this.register();
          }
        })
        .catch((error) => {
          this.loading = false;
          console.error("Error checking username availability:", error);
        });
    },
    verifyEmailAndProceed() {
      console.log("Verifying email");
      if (!this.email) {
        this.$refs.emailInput.validate();
        return;
      }
      this.loading = true;
      isEmailAvailable(this.email)
        .then((isAvailable) => {
          this.loading = false;
          if (isAvailable) {
            this.setStep(2);
          } else {
            this.emailAvailable = false;
            this.emailRules = [
              ...this.emailRules,
              () =>
                "This email is already in use. Please choose another email.",
            ];
            this.$refs.emailInput.validate();
          }
        })
        .catch((error) => {
          this.loading = false;
          console.error("Error checking email availability:", error);
        });
    },
    verifyNameAndProceed() {
      if (!this.name || !this.surname) {
        this.$refs.nameInput.validate();
        this.$refs.surnameInput.validate();
        return;
      }
      this.setStep(3);
    },
    register() {
      if (
        this.name === "" ||
        this.surname === "" ||
        this.username === "" ||
        this.password === "" ||
        this.email === ""
      ) {
        return;
      }
      const userData = {
        name: this.name,
        surname: this.surname,
        username: this.username,
        password: this.password,
        email: this.email,
      };
      registerUser(userData);
    },
  },
};
</script>
