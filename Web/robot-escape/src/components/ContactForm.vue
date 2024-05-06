<template>
    <v-card class="rounded-lg">
      <v-row>
        <!-- Left column for the text -->
        <v-col cols="6" class="description-column">
          <div class="secondfont">
            <h1>LET US KNOW YOUR DOUBTS!</h1>
            <br>
            <p>Fill in the form to get in touch with us. All fields are required to ensure the best possible response to your inquiry.</p>
          </div>
        </v-col>
  
        <!-- Right column for the form -->
        <v-col cols="6" class="centered secondfont">
          <form class="form_contact">
            <v-text-field
              class="textfields"
              v-model="state.name"
              :error-messages="v$.name.$errors.map(e => e.$message)"
              label="Name"
              required
              @blur="v$.name.$touch"
              @input="v$.name.$touch"
            ></v-text-field>
  
            <v-text-field
              class="textfields"
              v-model="state.lastname"
              :error-messages="v$.name.$errors.map(e => e.$message)"
              label="Last Name"
              required
              @blur="v$.name.$touch"
              @input="v$.name.$touch"
            ></v-text-field>
  
            <v-text-field
              class="textfields"
              v-model="state.email"
              :error-messages="v$.email.$errors.map(e => e.$message)"
              label="E-mail"
              required
              @blur="v$.email.$touch"
              @input="v$.email.$touch"
            ></v-text-field>
  
            <v-text-field
              class="textfields"
              v-model="state.header"
              :counter="10"
              :error-messages="v$.name.$errors.map(e => e.$message)"
              label="Header"
              required
              @blur="v$.name.$touch"
              @input="v$.name.$touch"
            ></v-text-field>
  
            <v-textarea
              class="textfields"
              v-model="state.message"
              :counter="255"
              :error-messages="v$.name.$errors.map(e => e.$message)"
              label="Message"
              required
              @blur="v$.name.$touch"
              @input="v$.name.$touch"
            ></v-textarea>
  
            <v-btn class="me-4 form_button" @click="v$.$validate">
              Send
            </v-btn>
          </form>
        </v-col>
      </v-row>
    </v-card>
  </template>

<script setup>
    import { reactive } from 'vue'
    import { useVuelidate } from '@vuelidate/core'
    import { email, required } from '@vuelidate/validators'

    const initialState = {
        name: '',
        lastname: '',
        email: '',
        header: '',
        message: '',
    }

    const state = reactive({
        ...initialState,
    })

    const rules = {
        name: { required },
        email: { required, email },
        select: { required },
        items: { required },
        checkbox: { required },
    }

    const v$ = useVuelidate(rules, state)
</script>

<style scoped>
.v-card {
    background-color: white;
    border-radius: 10px;
    padding: 60px;
    width:60%;
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