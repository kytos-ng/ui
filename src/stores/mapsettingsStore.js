import { defineStore } from "pinia";

export const useMapSettingsStore = defineStore("mapsettings", {
  state: () => {
    return {
      mapOpacity: parseInt((localStorage.getItem('kytos/ui/MapBoxSettings/mapOpacity') || 100), 10),
      mapStyle: (localStorage.getItem('kytos/ui/MapBoxSettings/mapStyle') || "")
    };
  },
  actions: {
    changeMapOpacity(newOpacity) {
      localStorage.setItem('kytos/ui/MapBoxSettings/mapOpacity', String(newOpacity));
      this.mapOpacity = newOpacity;
    },
    changeMapStyle(newStyle) {
      localStorage.setItem('kytos/ui/MapBoxSettings/mapStyle', newStyle);
      this.mapStyle = newStyle;
    }
  }
});
