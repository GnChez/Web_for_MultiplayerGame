<template>
  <v-card v-if="!cambiar">
    <v-toolbar class="black-layouts white-colors">
      <v-toolbar-title class="medium-font secondfont-bold centered bigfont"
        >Global Ranking</v-toolbar-title
      >
    </v-toolbar>
    <v-list class="secondfont-bold">
      <v-list-item class="medium-font">
        <v-list-item-content
          style="display: grid; grid-template-columns: 1fr 2fr 2fr 1fr 1fr"
        >
          <v-list-item-title class="cells">Position</v-list-item-title>
          <v-list-item-title class="cells">Player 1</v-list-item-title>
          <v-list-item-title class="cells">Player 2</v-list-item-title>
          <v-list-item-title>Time</v-list-item-title>
          <v-list-item-title>Date</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        class="secondfont hoverable-list-item"
        v-for="(match, index) in matches"
        :key="index"
        @click="especifico(match)"
      >
        <v-list-item-content
          style="display: grid; grid-template-columns: 1fr 2fr 2fr 1fr 1fr; align-items: center;"
        >
          <div class="medium-font">{{ getMedal(index + 1) }}</div>
          <div>{{ match.host_username }}</div>
          <div>{{ match.client_username }}</div>
          <div>{{ match.time }}</div>
          <div>{{ this.formatDate(match.complete_date) }}</div>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
  <v-card v-else style="padding: 20px; margin: 10px; min-width: max-content">
    <div
      style="
        background: lightgray;
        padding: 10px;
        display: flex;
        align-items: center;
      "
    >
      <v-btn
        class="return-button gray-colors secondfont-bold"
        style="background: lightgray"
        @click="especifico()"
        >RETURN</v-btn
      >
    </div>
    <div class="partida secondfont" style="padding: 20px">
      <div class="mainData">
        <v-card-title class="bigger-font"
          >{{ partida.host_username }} 🏆
          {{ partida.client_username }}</v-card-title
        >
        <v-card-subtitle class="biggest-font">{{
          partida.time
        }}</v-card-subtitle>
        <v-card-subtitle style="margin-bottom: 40px" class="secondfont"
          >TOTAL TIME</v-card-subtitle
        >
      </div>
      <v-row
        class="d-flex justify-space-between"
        style="margin-bottom: 20px; background: lightgray; white-space: nowrap"
      >
        <v-col cols="3" class="secondfont-bold text-left">STAGE</v-col>
        <v-col cols="6" class="secondfont-bold text-center"
          >TIME PER ROOM</v-col
        >
        <v-col cols="3" class="secondfont-bold text-right">STAGE TIME</v-col>
      </v-row>
      <v-row
        v-for="(stage, index) in datapack"
        :key="index"
        style="margin-bottom: 20px; white-space: nowrap"
      >
        <v-col cols="1" class="secondfont-bold" style="padding-right: 10px">
          {{ stage.stage }}
        </v-col>
        <v-col style="display: flex; padding: 0 10px" class="centered">
          <Bar
            id="my-chart-id"
            :key="this.bar_stats"
            :options="stage.options"
            :data="stage.data"
            :plugins="plugins"
            style="max-height: 40px"
          />
        </v-col>
        <v-col class="secondfont-bold" cols="1" style="padding-left: 10px">
          {{ stage.time }}
        </v-col>
      </v-row>
      <div class="centered">
        <v-card-text class="secondfont"
          >Date: {{ formatDate(partida.complete_date) }}</v-card-text
        >
      </div>
    </div>
  </v-card>
  <v-card v-if="!cambiar && auth" class="personalGameData">
    <div
      style="
        background: gray;
        padding: 10px;
        display: flex;
        align-items: center;
      "
      class="centered"
    >
      <v-card-title class="centered white-colors secondfont-bold"
        >PERSONAL DATA</v-card-title
      >
    </div>
    <div class="partida secondfont grid-container" style="padding: 20px">
      <div class="grid-item centered">
        <v-card-text class="secondfont-bold">Hours Played</v-card-text>
        <v-card-text class="bigger-font secondfont-bold">{{
          this.secondsToHours(this.stats.timeplayed)
        }}</v-card-text>
      </div>
      <div class="grid-item centered">
        <v-card-text class="secondfont-bold">Games</v-card-text>
        <v-card-text class="bigger-font secondfont-bold">{{
          stats.matchs_registered
        }}</v-card-text>
      </div>
      <div class="grid-item centered">
        <v-card-text class="secondfont-bold">Frequent Partner</v-card-text>
        <v-card-text class="bigger-font secondfont-bold">{{
          this.stats.frequent_Partner
        }}</v-card-text>
      </div>
      <div class="grid-item centered">
        <v-card-text class="secondfont-bold">Best Time</v-card-text>
        <v-card-text class="bigger-font secondfont-bold">{{
          this.stats.bestTime
        }}</v-card-text>
      </div>
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
  scales,
} from "chart.js";
import { colors } from "../stackcolors";
import {
  getTopMatches,
  getPersonalStatsData,
} from "@/communicationsManager.js";
import { useAppStore } from "@/stores/app";

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
      bar_stats: 0,
      auth: false,
      stats: {
        timeplayed: 0,
        matchs_registered: 0,
        frequent_Partner: "Undefined",
        bestTime: "Undefined",
      },

      datapack: [],
      cambiar: false,
      partida: null,
      matches: [],
    };
  },
  setup() {
    const appStore = useAppStore();
    return {
      appStore,
    };
  },
  mounted() {
    this.auth = this.appStore.isAuthenticated;
    console.log(this.appStore.getLoginInfo);
    if (this.auth) {
      this.getPersonalStatsData(this.appStore.getLoginInfo.data.id);
    }
  },
  // ...
  created() {
    this.getTopMatches();
  },
  methods: {
    async getPersonalStatsData(playerId) {
      try {
        const statsReturn = await getPersonalStatsData(playerId);
        if (statsReturn != null) {
          console.log(statsReturn)
          this.stats = {
            timeplayed: statsReturn.timePlayed,
            matchs_registered: statsReturn.matchs_registered,
            frequent_Partner: statsReturn.frequentPartner,
            bestTime: statsReturn.bestTime,
          };
        }
        else {
          this.stats = {
            timeplayed: 0,
            matchs_registered: 0,
            frequent_Partner: "Undefined",
            bestTime: "Undefined",
          }
        }
      } catch (error) {
        console.error("Failed to get personal stats:", error);
      }
    },
    async getTopMatches() {
      try {
        const matches = await getTopMatches();
        this.matches = matches;
        console.log(this.matches);
      } catch (error) {
        console.error("Failed to get top matches:", error);
      }
    },
    getMedal(position) {
      switch (position) {
        case 1:
          return '🥇';
        case 2:
          return '🥈';
        case 3:
          return '🥉';
        default:
          return position;
      }
    },
    especifico(match) {
      this.cambiar = !this.cambiar;
      if (this.cambiar) {
        this.partida = match;
        this.datapack = this.buildDataPack(match);
        this.bar_stats++;
        this.cargado(this.datapack);
        console.log(this.datapack);
      }
    },
    secondsToHours(seconds) {
      const hours = seconds / 3600;
      return hours.toFixed(1);
    },
    formatTime(seconds) {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;
      return `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(
        remainingSeconds
      )}`;
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();

      return `${day}/${month}/${year}`;
    },
    timeToSeconds(time) {

      console.log("Tiempos: " + time);
      const [hours, minutes, seconds] = time.split(":").map(Number);

      return hours * 3600 + minutes * 60 + seconds;
    },
    padZero(value) {
      return value < 10 ? "0" + value : value;
    },
    cargado(datapack) {
      let suma = [];
      datapack.forEach((dato, index) => {
        dato.data.datasets.forEach((dataset) => {
          suma[index] =
            (suma[index] || 0) + dataset.data[0];
        });
      });
      console.log(suma);
      datapack.forEach((dato, index) => {
        dato.options.scales.x.max = suma[index];
      });
    },
    buildDataPack(matches) {
      console.log("MATCHES:")
      console.log(matches)
      let i = 0;
      return matches.stages.map((stage) => ({
        stage: stage.name,
        data: {
          labels: [stage.name],
          datasets: stage.rooms.map((room) => ({
            label: room.name,
            data: [this.timeToSeconds(room.time)],
            backgroundColor: colors[i % colors.length].backgroundColor,
            hoverBackgroundColor:
              colors[i++ % colors.length].hoverBackgroundColor,
          })),
        },
        time: stage.time,
        options: {
          indexAxis: "y",
          scales: {
            x: {
              stacked: true,
              display: false,
            },
            y: {
              stacked: true,
              display: false,
            },
          },
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  let label = context.dataset.label || "";

                  if (label) {
                    label += " \n ";
                  }
                  if (context.parsed.y !== null) {
                    label += " Time: " + context.dataset.data + "s";
                  }
                  return label;
                },
              },
              bodyFont: {
                weight: "bold",
              },
              backgroundColor: "midnightblue",
            },
          },
        },
      }));
    },

    beforeRouteLeave(to, from, next) {
      if (this.cambiar) {
        this.cambiar = false;
        next(false);
      } else {
        next();
      }
    },
  },
};
</script>

<style>
.cells {
  padding-right: 40px;
}

.mainData {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.hoverable-list-item:hover {
  background-color: lightgray;
}
.return-button {
  border: none;
  box-shadow: none;
  width: 100%;
}
.personalGameData {
  position: relative;
  margin: 30px;
}
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 10px;
}
.grid-item {
  flex-direction: column;
}
.inline-text {
  display: flex;
  flex-direction: row;
  align-items: baseline;
}
</style>
