<template>
  <div style="height: 100vh" class="p-d-flex p-flex-column">
    <ControlBar/>
    <Toast class="p-mt-5"/>
    <Card class="p-br-0 main p-d-flex h-full">
      <template #content>
        <!--        <Settings :settings="settings" v-on:save-settings="saveSettings"/>-->
        <SkinSelector v-if="clientPath"></SkinSelector>
        <div v-else class="p-d-flex p-justify-center">
          <h1>Waiting for the client to start...</h1>
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
import ControlBar from "./components/ControlBar";
import * as path from "path";
import {exec} from "child_process";
import LeagueConnector from "@/utils/leagueConnector";
import SkinSelector from "@/components/SkinSelector";

export default {
  name: 'App',
  components: {
    SkinSelector,
    /*Settings,*/
    ControlBar,
  },
  data() {
    return {
      clientPath: undefined,
      //Default settings
      /*settings: {
        leagueLocation: 'C:\\Riot Games\\League of Legends',
        maxBackups: 5,
        automaticBackups: {
          enabled: false,
          time: "18:00",
          frequency: null
        }
      }*/
    }
  },
  methods: {
    checkIsClientRunning: function () {
      exec(`wmic process where "name='LeagueClient.exe'" get ExecutablePath /FORMAT:list`, null, (error, stdout) => {
        let [, execPath] = stdout.toString().split("ExecutablePath=");
        this.clientPath = execPath ? path.dirname(execPath) : undefined;
        LeagueConnector.getInstance().setClientLocation(this.clientPath);
      })
    }
    /*saveSettings: function (newSettings) {
      fs.writeFileSync("settings.json", JSON.stringify(newSettings), () => {});

      this.settings = JSON.parse(JSON.stringify(newSettings));
      ipcRenderer.send("save-settings");
    },*/
  },
  created() {
    this.checkIsClientRunning()
    setInterval(() => {
      this.checkIsClientRunning()
    }, 5000)

    /*if (fs.existsSync("settings.json")) {
      Object.assign(
          this.settings,
          JSON.parse(
              fs.readFileSync("settings.json", {encoding: "utf-8", flag: "r"})
          ) || {}
      )
    }*/
  }
}
</script>

<style>
.main {
  flex: 1 1 0;
  overflow-y: auto;
  overflow-x: hidden;
  border-left: 1px solid #383838;
  background: var(--surface-b) !important;
}

.main > .p-card-body {
  width: 100%;
}

.main > .p-card-body > .p-card-content {
  padding: 0 0 1rem 0;
}

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: var(--surface-b);
  border-radius: 5px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background-color: var(--primary-color);
  border-radius: 5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background-color: var(--blue-400);
}

.p-br-0 {
  border-radius: 0 !important;
}

.p-br-50 {
  border-radius: 50% !important;
}

.p-button.p-button-plain:focus {
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.6);
}

body {
  margin: 0;
}
</style>
