<template >
    <v-card class="rounded-lg">
        <div class="centered secondfont">
            <form class="form_contact">
                <v-text-field
                class="textfields"
                    v-model="state.name"
                    :counter="10"
                    :error-messages="v$.name.$errors.map(e => e.$message)"
                    label="Name"
                    required
                    @blur="v$.name.$touch"
                    @input="v$.name.$touch"
                ></v-text-field>

                <v-text-field
                class="textfields"
                    v-model="state.lastname"
                    :counter="10"
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

                <v-text-field
                    class="textfields"
                    v-model="state.message"
                    :counter="10"
                    :error-messages="v$.name.$errors.map(e => e.$message)"
                    label="Message"
                    required
                    @blur="v$.name.$touch"
                    @input="v$.name.$touch"
                ></v-text-field>

                
                <v-btn class="me-4 form_button" @click="v$.$validate">
                    send
                </v-btn>
            </form>
        </div>
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

    function clear() {
        v$.value.$reset()

        for (const [key, value] of Object.entries(initialState)) {
            state[key] = value
        }
    }
</script>

<style scoped>
.v-card {
    background-color: white;
    border-radius: 10px;
    padding: 40px;
    width:30%;
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
}
</style>