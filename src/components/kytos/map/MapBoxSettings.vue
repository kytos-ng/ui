<template>
    <k-toolbar-item name="mapbox-settings" icon="desktop" tooltip="MapBox Settings">
      <k-context-panel title_color="#554077" title="MapBox Settings" icon="cog">
        <k-accordion>
          <k-accordion-item title="Custom Labels">
            <k-dropdown title="Switch Labels:" icon="circle" :options="switchLabels" :event="{name: 'topology-toggle-label', content: {node_type: 'switch'}}"></k-dropdown>
            <k-dropdown title="Interface Labels:" icon="plug" :options="interfaceLabels" :event="{name: 'topology-toggle-label', content: {node_type: 'interface'}}"></k-dropdown>
          </k-accordion-item>

          <k-accordion-item title="Background">
            <k-button-group>
              <k-button tooltip="Map Background" icon="desktop" @click="emitMapDefaultBackground"></k-button>
              <k-button tooltip="Image Background (disabled)" icon="image" :is-disabled="true"></k-button>
              <k-button tooltip="No Background" icon="window-close" @click="emitMapNoBackground"></k-button>
            </k-button-group>
            <k-slider icon="adjust" :initial-value="mapOpacity" :action="emitMapOpacity"></k-slider>
          </k-accordion-item>
        </k-accordion>
      </k-context-panel>
    </k-toolbar-item>
</template>

<script>
export default {

  methods: {
    emitMapNoBackground () {
      this.$kytos.eventBus.$emit('change-map-no-background')
    },
    emitMapDefaultBackground () {
      this.$kytos.eventBus.$emit('change-map-default-background')
    },
    emitMapOpacity (value) {
      this.$kytos.eventBus.$emit('change-map-opacity', value)
    },
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
    toggleLabel (type, label) {
      this.$kytos.eventBus.$emit('topology-toggle-label', type, label)
    },
  },
  created: function() {
    // Registering listeners
    this.$kytos.eventBus.$on('menu-add-switch-label', this.addSwitchLabel)
    this.$kytos.eventBus.$on('menu-add-interface-label', this.addInterfaceLabel)
  },
  data: function() {
      return {
        switchLabels: [],
        interfaceLabels: [],
        mapOpacity: 100,
      }
  },
  //Extracts data from localStorage (if available) when first mounted.
  mounted() {
    switchLabels_storage = JSON.parse(localStorage.getItem('kytos/ui/MapBoxSettings/switchLabels'));
    interfaceLabels_storage = JSON.parse(localStorage.getItem('kytos/ui/MapBoxSettings/interfaceLabels'));
    mapOpacity_storage = JSON.parse(localStorage.getItem('kytos/ui/MapBoxSettings/mapOpacity'));
    if (switchLabels_storage) {
      this.switchLabels = switchLabels_storage;
    }
    if (interfaceLabels_storage) {
      this.interfaceLabels = interfaceLabels_storage;
    }
    if (mapOpacity_storage) {
      this.mapOpacity = mapOpacity_storage;
    }
  },
  //Watches to see if data is changed to then store it within localStorage.
  watch: {
    switchLabels: {
      handler: function (newVal) {
        localStorage.setItem('kytos/ui/MapBoxSettings/switchLabels', JSON.stringify(newVal))
      },
      deep: true
    },
    interfaceLabels: {
      handler: function (newVal) {
        localStorage.setItem('kytos/ui/MapBoxSettings/interfaceLabels', JSON.stringify(newVal))
      },
      deep: true
    },
    mapOpacity: {
      handler: function (newVal) {
        localStorage.setItem('kytos/ui/MapBoxSettings/mapOpacity', JSON.stringify(newVal))
      }
    },
  }  
}
</script>
