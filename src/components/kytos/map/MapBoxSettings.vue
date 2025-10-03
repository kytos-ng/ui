<template>
    <k-toolbar-item name="mapbox-settings" icon="desktop" tooltip="MapBox Settings">
      <k-context-panel title_color="#554077" title="MapBox Settings" icon="cog">
        <k-accordion>
          <k-accordion-item title="Custom Labels">
            <k-dropdown title="Switch Labels:" icon="circle" :options="switchLabels" v-model:value="current_switch_label" :action="onChangeSwitchLabel"></k-dropdown>
            <k-dropdown title="Interface Labels:" icon="plug" :options="interfaceLabels" v-model:value="current_interface_label" :action="onChangeInterfaceLabel"></k-dropdown>
          </k-accordion-item>

          <k-accordion-item title="Background">
            <k-button-group>
              <k-button tooltip="Map Background" icon="desktop" @click="changeMapStyle('change_map_default_background')"></k-button>
              <k-button tooltip="Image Background (disabled)" icon="image" :is-disabled="true"></k-button>
              <k-button tooltip="No Background" icon="window-close" @click="changeMapStyle('change_map_no_background')"></k-button>
            </k-button-group>
            <k-slider icon="adjust" :initial-value="mapOpacity" :action="changeMapOpacity"></k-slider>
          </k-accordion-item>
        </k-accordion>
      </k-context-panel>
    </k-toolbar-item>
</template>

<script>
import { mapWritableState, mapActions } from 'pinia'
import { useMapSettingsStore } from '../../../stores/mapsettingsStore'
import { useTopologySettingsStore } from '../../../stores/topologysettingsStore'

export default {
  methods: {
    addSwitchLabel (content) {
      let value = content.value
      let exist = this.switchLabels.filter(label => label.value == value)
      if (exist.length == 0)
        this.switchLabels.push({value: value,
                                description: content.description,
                                selected: content.selected})
    },
    addInterfaceLabel (content) {
      let value = content.value
      let exist = this.interfaceLabels.filter(label => label.value == value)
      if (exist.length == 0)
        this.interfaceLabels.push({value: value,
                                   description: content.description,
                                   selected: content.selected})
    },
    ...mapActions(useMapSettingsStore, ['changeMapOpacity', 'changeMapStyle']),
    ...mapActions(useTopologySettingsStore, ['onChangeSwitchLabel', 'onChangeInterfaceLabel'])
  },
  computed: {
    ...mapWritableState(useMapSettingsStore, ['mapOpacity']),
    ...mapWritableState(useTopologySettingsStore, ['current_switch_label', 'current_interface_label']),
  },
  data: function() {
      return {
        switchLabels: [],
        interfaceLabels: []
      }
  },
  created() {
    // Registering listeners
    this.$kytos.eventBus.$on('menu-add-switch-label', this.addSwitchLabel)
    this.$kytos.eventBus.$on('menu-add-interface-label', this.addInterfaceLabel)
  }
}
</script>