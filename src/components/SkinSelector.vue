<template>
  <DataView v-if="data?.length > 0" :value="data.filter(x => x.unlocked || x.childSkins.some(y => y.unlocked))"
            :num-scroll="1" :circular="true" layout="grid">
    <template #grid="slotProps">
      <div class="p-xl-3 p-lg-4">
        <div
            :class="`card ${!slotProps.data.unlocked ? 'disable' : '' } ${slotProps.data.id === selectedSkinId ? 'selected' : slotProps.data.childSkins?.some(x => x.id === selectedSkinId) ? 'chroma-selected' : ''} p-m-1 p-d-flex p-flex-column`"
            v-on:click="() => {if(slotProps.data.unlocked) selectSkin(slotProps.data.id)}">
          <div>
            <img
                :src="slotProps.data.tilePath?.toLowerCase().replace('/lol-game-data/assets/', 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/')"
                alt="Image" :style="{width: '100%'}"/>
          </div>
          <div v-if="slotProps.data.childSkins?.length > 0"
               class="chroma-selector-container p-d-flex p-justify-center p-align-end">
            <Button icon="pi pi-palette" class="chroma-selector p-button-rounded p-button-text"
                    v-on:click="openChromaSelection($event, slotProps.data.id)"></Button>
          </div>
          <div class="p-px-1">
            <h3 class="p-my-1">{{ slotProps.data.name }}</h3>
          </div>
        </div>
      </div>
    </template>
  </DataView>
  <div v-else class="p-d-flex p-justify-center">
    <h1>Waiting until champion has been selected...</h1>
  </div>
  <OverlayPanel ref="chromaOverlay" appendTo="body" id="overlay_panel" :dismissable="true"
                :style="{'max-width': '25vw'}">
    <Carousel :value="chromas" :num-scroll="1" :num-visible="1" :showNavigators="true">
      <template #item="slotProps">
        <div :class="`card ${slotProps.data.id === selectedSkinId ? 'selected' : ''}`"
             v-on:click="() => selectSkin(slotProps.data.id)">
          <img
              :src="(slotProps.data.chromaPreviewPath ?? slotProps.data.splashPath)?.toLowerCase().replace('/lol-game-data/assets/', 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/')"
              alt="Image" :style="{width: '100%'}"/>
        </div>
      </template>
    </Carousel>
  </OverlayPanel>
</template>

<script>
import LeagueConnector from "@/utils/leagueConnector";

export default {
  name: "SkinSelector",
  data() {
    return {
      leagueConnector: LeagueConnector.getInstance(),
      selectedSkinId: -1,
      chromaSelectorSkinId: -1,
      data: [],
    }
  },
  computed: {
    chromas() {
      return [
        this.data.find(x => x.id === this.chromaSelectorSkinId && x.chromaPreviewPath && x.unlocked),
        ...this.data.find(x => x.id === this.chromaSelectorSkinId)?.childSkins?.filter(x => x.unlocked)
      ]
          .filter(x => x)
    }
  },
  methods: {
    selectSkin: function (id) {
      this.selectedSkinId = id;
      this.leagueConnector.sendRequest("PATCH", "lol-champ-select/v1/session/my-selection", {"selectedSkinId": id})
    },
    openChromaSelection: function (event, skinId) {
      event.stopPropagation();
      this.$refs.chromaOverlay.toggle(event);
      this.chromaSelectorSkinId = skinId;
    }
  },
  created() {
    setInterval(() => {
      this.leagueConnector.sendRequest("GET", "lol-champ-select/v1/skin-carousel-skins").then(response => this.data = response.data);
      this.leagueConnector.sendRequest("GET", "lol-champ-select/v1/skin-selector-info").then(response => this.selectedSkinId = response.data?.selectedSkinId)
    }, 5000)
  }
}
</script>

<style scoped>
.card {
  height: 100%;
  border: 1px solid var(--surface-border);
  border-radius: 4px;
  cursor: pointer;
}

.card:hover {
  border-width: 2px
}

.card.selected {
  border-width: 2px;
  border-color: var(--primary-color);
}

.card.chroma-selected {
  border-width: 2px;
  border-color: var(--purple-500);
}

.chroma-selector-container {
  height: 0;
}

.chroma-selector {
  margin-bottom: -0.4rem;
  background-color: var(--surface-card) !important;
}

.disable img {
  filter: grayscale(100%);
}
</style>