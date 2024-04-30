<template>
  <v-app id="inspire" class="centered">
    <v-content>
      <v-container fluid fill-height>
        <v-row class="centered">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12 centered" style="padding-bottom: 10px; width: max-content;">
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
                    @click.native="setStep(1)"
                  ></v-stepper-item>

                  <v-divider></v-divider>

                  <v-stepper-item
                    title="Set your personal data"
                    :complete="step > 2"
                    value="2"
                    @click.native="setStep(2)"
                  ></v-stepper-item>

                  <v-divider></v-divider>

                  <v-stepper-item
                    title="Choose your user data"
                    :complete="step >= 3"
                    value="3"
                    @click.native="setStep(3)"
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
                        v-model="email"
                        id="email"
                        name="email"
                        label="EMAIL"
                        type="email"
                      ></v-text-field>
                      <div>
                        <v-card-actions class="centered">
                        <v-btn class="enter-button" @click="setStep(2)"
                          >NEXT</v-btn>
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
                      ></v-text-field>
                      <v-text-field
                        class="secondfont"
                        v-model="surname"
                        id="surname"
                        name="surname"
                        label="LAST NAME"
                        type="tesxt"
                      ></v-text-field>
                      <div>
                        <v-card-actions class="centered">
                        <v-btn class="enter-button" @click="setStep(1)" 
                          >BACK</v-btn>
                        <v-btn class="enter-button" @click="setStep(3)"
                          >NEXT</v-btn>
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
                      ></v-text-field>
                      <v-text-field
                        class="secondfont"
                        v-model="password"
                        id="password"
                        name="password"
                        label="PASSWORD"
                        type="password"
                      ></v-text-field>
                      <v-card-actions class="centered">
                        <v-btn class="enter-button" @click="setStep(2)" style="border:2px purple solid;"
                          >BACK</v-btn>
                        <v-btn class="enter-button" @click="register"
                          >REGISTER</v-btn>
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
import { registerUser } from "../communicationsManager";
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
      step:1,
      name: "",
      surname: "",
      username: "",
      password: "",
      email: "",
      loading: false,
    };
  },
  methods: {
    setStep(newStep) {
      this.step = newStep;
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
