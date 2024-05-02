<template>
    <v-container class="pa-0">
        <v-app-bar :elevation="5" class="py-1 px-10">
            <v-spacer> </v-spacer>
            <template v-slot:prepend>
                <v-img class="mx-2" src="https://i.imgur.com/qgGY4tB.png" max-height="40" width="40" contain>
                </v-img>
                <v-btn variant="flat" :ripple="false">
                    <h2>ROBOT ESCAPE</h2>
                </v-btn>
                <div v-for="(button, index) in opciones" id="no-background-hover">
                    <v-btn :key="index"  :ripple="false" variant="flat">
                        <a>{{ button }}</a>
                    </v-btn>
                </div>
            </template>

            <template v-slot:append>
                <v-btn variant="plain"><v-icon icon="$descargar" size="x-large"></v-icon>
                    Download
                </v-btn>
                <v-btn variant="outlined">

                    Sign in
                </v-btn>
            </template>
        </v-app-bar>
    </v-container>
</template>
<script>
export default {
    data() {
        return {
            opciones: ["FAQ", "About us", "Ranking"]
        };
    },
    methods: {
    }
};
</script>
<style lang="css">
#no-background-hover:hover {
    border-bottom: solid black;
    
}
</style>