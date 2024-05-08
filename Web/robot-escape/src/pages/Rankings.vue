<template>
    <v-card v-if="!cambiar">
        <v-list>
            <v-list-item v-for="(equipo, index) in players" :key="index" @click="especifico(equipo)">
                <v-list-item-content>{{ index + 1 }} {{ equipo.player1 }} - {{ equipo.player2 }} : {{ equipo.time }}
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-card>
    <v-card v-else>
        <v-btn @click="especifico()">Regresar</v-btn>
        <v-divider></v-divider>
        <v-card-title>Partida {{ partida.match }}</v-card-title>
        <v-card-subtitle>{{ formatTime(partida.time) }}</v-card-subtitle>
        <v-row v-for="(data, index) in datos">
            <v-col cols=1>
                STAGE {{ data.stage }}
            </v-col>
            <v-col style="display:flex;">
                <Bar id="my-chart-id" :options="data.options" :data="data.data" :plugins="plugins"
                    style="max-height:40px;" />
            </v-col>
            <v-col cols=1>
                {{ formatTime(data.time) }}
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { lista } from '../datos'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    name: 'BarChart',
    components: { Bar },
    data() {
        return {
            cambiar: false,
            partida: null,
            players: [
                { player1: 'Jugador 1', player2: "CARLOS", time: 60, match: "1" },
                { player1: 'Jugador 2', player2: "CARLOS", time: 45, match: "2" },
                { player1: 'Jugador 3', player2: "CARLOS", time: 75, match: "3" },
                { player1: 'Jugador 4', player2: "CARLOS", time: 3541210, match: "4" },
            ],
            datos: []

        };
    }, methods: {
        especifico(equipo) {
            this.cambiar = !this.cambiar;
            if (this.cambiar) {
                this.partida = equipo;
            }
        }, formatTime(seconds) {
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            const remainingSeconds = seconds % 60;
            return `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(remainingSeconds)}`;
        },
        padZero(value) {
            return value < 10 ? '0' + value : value;
        }, cargado(datos) {
            let suma = [];
            datos.forEach((dato,index) => {
                dato.data.datasets.forEach(dataset => {
                    suma[index] += dataset.data[0];
                });
            });
            datos.forEach((dato,index) => {
                dato.options.scales.x.max = suma[index];
            });
        }
    }, mounted() {
        this.datos = lista.datos;
        this.cargado(this.datos);
    },
};
</script>