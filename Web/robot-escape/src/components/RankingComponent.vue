<template>
  <v-card v-if="!cambiar">
    <v-toolbar class="gray-layouts white-colors">
      <v-toolbar-title class="medium-font secondfont-bold centered bigfont"
        >Global Ranking</v-toolbar-title
      >
    </v-toolbar>
    <v-list class="secondfont-bold">
      <v-list-item class="medium-font">
        <v-list-item-content
          style="display: grid; grid-template-columns: 1fr 2fr 2fr 1fr"
        >
          <v-list-item-title class="cells">Position</v-list-item-title>
          <v-list-item-title class="cells">Player 1</v-list-item-title>
          <v-list-item-title class="cells">Player 2</v-list-item-title>
          <v-list-item-title>Time</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        class="secondfont"
        v-for="(equipo, index) in players"
        :key="index"
        @click="especifico(equipo)"
      >
        <v-list-item-content
          style="display: grid; grid-template-columns: 1fr 2fr 2fr 1fr"
        >
          <div>{{ index + 1 }}</div>
          <div>{{ equipo.player1 }}</div>
          <div>{{ equipo.player2 }}</div>
          <div>{{ equipo.time }}</div>
        </v-list-item-content>
        <v-divider class="divider"></v-divider>
      </v-list-item>
    </v-list>
  </v-card>
  <v-card v-else style="padding: 20px; margin: 10px; min-width: max-content;">
    <v-btn class="simplified-enter-button white-colors" @click="especifico()" style="margin-bottom: 20px;">RETURN</v-btn>
    <v-divider style="margin-bottom: 20px;"></v-divider>
    <div class="partida secondfont" style="padding: 20px;">
        <div class="mainData">
            <v-card-title class="bigger-font" >Partida {{ partida.match }}</v-card-title>
            
  
            <v-card-subtitle class="biggest-font" >{{ formatTime(partida.time) }}</v-card-subtitle>
            <v-card-subtitle style="margin-bottom: 40px;" class="secondfont">TOTAL TIME</v-card-subtitle>
        </div>
      
        <v-row v-for="(data, index) in datos" :key="index" style="margin-bottom: 20px; white-space: nowrap;">
      <v-col cols="1" class="secondfont-bold" style="padding-right: 10px;"> STAGE {{ data.stage }} </v-col>
      <v-col style="display: flex; padding: 0 10px;">
        <Bar
          id="my-chart-id"
          :options="data.options"
          :data="data.data"
          :plugins="plugins"
          style="max-height: 40px"
        />
      </v-col>
      <v-col class="secondfont-bold" cols="1" style="padding-left: 10px;">
        {{ formatTime(data.time) }}
      </v-col>
    </v-row>
    </div>
  </v-card>
</template>

<script>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { lista } from "../datos";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "BarChart",
  components: { Bar },
  data() {
    return {
      cambiar: false,
      partida: null,
      players: [
        { player1: "Jugador 1", player2: "CARLOS", time: 60, match: "1" },
        { player1: "Jugador 2", player2: "CARLOS", time: 45, match: "2" },
        { player1: "Jugador 3", player2: "CARLOS", time: 75, match: "3" },
        { player1: "Jugador 4", player2: "CARLOS", time: 3541210, match: "4" },
      ],
      datos: [],
    };
  },
  methods: {
    especifico(equipo) {
      this.cambiar = !this.cambiar;
      if (this.cambiar) {
        this.partida = equipo;
      }
    },
    formatTime(seconds) {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;
      return `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(
        remainingSeconds
      )}`;
    },
    padZero(value) {
      return value < 10 ? "0" + value : value;
    },
    cargado(datos) {
      let suma = [];
      datos.forEach((dato, index) => {
        dato.data.datasets.forEach((dataset) => {
          suma[index] += dataset.data[0];
        });
      });
      datos.forEach((dato, index) => {
        dato.options.scales.x.max = suma[index];
      });
    },
  },
  mounted() {
    this.datos = lista.datos;
    this.cargado(this.datos);
  },
};
</script>

<style>
.divider {
  margin: 10px;
}
.cells {
  padding-right: 40px;
}
.mainData {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>
