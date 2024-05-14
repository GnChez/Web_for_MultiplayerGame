<template>
  <v-card class="rounded-lg">
    <v-row>
      <!-- Left column for the text -->
      <v-col cols="6" class="description-column">
        <div class="secondfont">
          <h1>LET US KNOW YOUR DOUBTS!</h1>
          <br>
          <p>Fill in the form to get in touch with us. All fields are required to ensure the best possible response to
            your inquiry.</p>
        </div>
      </v-col>

      <!-- Right column for the form -->
      <v-col cols="6" class="centered secondfont">
        <form class="form_contact" @submit.prevent="sendEmail">
          <v-text-field class="textfields" v-model="state.name" :error-messages="v$.name.$errors.map(e => e.$message)"
            label="Name" required @blur="v$.name.$touch" @input="v$.name.$touch"></v-text-field>

          <v-text-field class="textfields" v-model="state.lastname"
            :error-messages="v$.name.$errors.map(e => e.$message)" label="Last Name" required @blur="v$.name.$touch"
            @input="v$.name.$touch"></v-text-field>

          <v-text-field class="textfields" v-model="state.email" :error-messages="v$.email.$errors.map(e => e.$message)"
            label="E-mail" required @blur="v$.email.$touch" @input="v$.email.$touch"></v-text-field>

          <v-text-field class="textfields" v-model="state.subject" :counter="120"
            :error-messages="v$.name.$errors.map(e => e.$message)" label="Subject" required @blur="v$.name.$touch"
            @input="v$.name.$touch"></v-text-field>

          <v-textarea class="textfields" v-model="state.message" :counter="255"
            :error-messages="v$.name.$errors.map(e => e.$message)" label="Message" required @blur="v$.name.$touch"
            @input="v$.name.$touch"></v-textarea>

          <v-btn type="submit" class="me-4 form_button">
            Send
          </v-btn>
        </form>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import { reactive, watch } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { email, required } from '@vuelidate/validators'
import { useAppStore } from '@/stores/app'
import emailjs from 'emailjs-com';

const appStore = useAppStore()

const initialState = {
  name: '',
  lastname: '',
  email: '',
  subject: '',
  message: '',
}

if (appStore.isAuthenticated) {
  initialState.name = appStore.getLoginInfo.name
  initialState.lastname = appStore.getLoginInfo.surname
  initialState.email = appStore.getLoginInfo.email
}


const state = reactive({
  ...initialState,
})

const rules = {
  name: { required },
  email: { required, email },
}

const v$ = useVuelidate(rules, state)

const sendEmail = async (e) => {
  e.preventDefault();
  console
  emailjs.sendForm('service_8ncygz4', 'template_999xbds', e.target, 'KVD-Qkw2Q00oW7KUu', { name: state.name, lastname: state.lastname, email: state.email, subject: state.subject, message: state.message })
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
    }, (error) => {
      console.log('FAILED...', error);
    });
  state.name = ''
  state.lastname = ''
  state.email = ''
  state.subject = ''
  state.message = ''
  // reset other fields as necessary
}
</script>

<style scoped>
.v-card {
  background-color: white;
  border-radius: 10px;
  padding: 60px;
  width: 60%;
}

.form_contact {
  width: 100%;
  margin-left: 20%;
  margin-right: 20%;
  margin-bottom: 10%;
}

.form_button {
  background-color: #3f51b5;
  color: white;
  border-radius: 10px;
  margin-top: 30px;
}

.description-column {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  padding-bottom: 15%;
}
</style>