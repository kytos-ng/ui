import { defineStore } from "pinia";

export const useTopologySettingsStore = defineStore("topologysettings", {
  state: () => {
    return {
        current_switch_label: (localStorage.getItem('kytos/ui/MapBoxSettings/selectedSwitchLabel') || ""),
        current_interface_label: (localStorage.getItem('kytos/ui/MapBoxSettings/selectedInterfaceLabel') || "")
    };
  },
  actions: {
    onChangeSwitchLabel(newSwitchLabel) {
      localStorage.setItem('kytos/ui/MapBoxSettings/selectedSwitchLabel', newSwitchLabel);
    },
    onChangeInterfaceLabel(newInterfaceLabel) {
      localStorage.setItem('kytos/ui/MapBoxSettings/selectedInterfaceLabel', newInterfaceLabel);
    }
  }
});