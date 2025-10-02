<template>
  <div id="k-map" ref="mapContainer" data-test="map-container">
  </div>
  <component v-bind:is="this.extraComponent" v-bind:map="this.map" v-bind:original_graph="this.topology.graph" data-test="map-topology"></component>
</template>

<script>
import KytosBase from '../base/KytosBase';
import KytosBaseWithIcon from '../base/KytosBaseWithIcon';
import KytosTopology from '../topology/Topology.vue';
import "mapbox-gl/dist/mapbox-gl.css";
import { useMapSettingsStore } from '../../../stores/mapsettingsStore';

export default {
  name: 'k-map',
  mixins: [KytosBaseWithIcon],
  data () {
    return {
      map: undefined,
      map_center: [-104.991531, 39.742043],
      map_zoom: 2,
      map_style_empty: "mapbox://styles/mapbox/empty-v9",
      map_style_kytos: "mapbox://styles/kytos/cj9e4mbtm6s532smy6767uftz",
      extraComponent: undefined,
      topology: {
        url: this.$kytos_server_api + "kytos/topology/v3/",
        graph: null
      }
    }
  },
  methods: {
    setListeners () {
      /**
       * Change the map opacity based on number value.
       *
       * @event change-map-opacity
       * @type {Number} The Opacity number
       */
      this.$kytos.eventBus.$on("change-map-no-background", this.setEmptyMapStyle);
      this.$kytos.eventBus.$on("change-map-default-background", this.setKytosMapStyle);
    },
    changeMapOpacity (value) {
      value = parseInt(value, 10)
      // This if is due to a mapboxgl bug reported at:
      // https://github.com/mapbox/mapbox-gl-js/issues/2074
      // Because of this bug if background-opacity is set to 1, then the map is
      // hidden but its labels are not.
      if (value == 0) {
        this.map.setPaintProperty("background", "background-opacity", 0.9999)
      } else {
        value = 1 - value / 100
        this.map.setPaintProperty("background", "background-opacity", value)
      }
    },
    setEmptyMapStyle(){
      this.map.setStyle(this.map_style_empty);
    },
    setKytosMapStyle(){
      this.map.setStyle(this.map_style_kytos);
    },
    // Empty mapbox style: "mapbox://styles/mapbox/empty-v9",
    // Kytos mapbox style: "mapbox://styles/kytos/cj9e4mbtm6s532smy6767uftz"
    // Dark style: "mapbox://styles/mapbox/dark-v10",
    async loadMap () {
      const map = new this.$mapboxgl.Map({
        accessToken: "pk.eyJ1Ijoia3l0b3MiLCJhIjoiY2o5ZTRsbHpnMjd3ZjMzbnJxc2xqa2hibyJ9.bBZPeP_YLA5oP0heHRpL6A",
        container: this.$refs.mapContainer,
        style: this.map_style_kytos,
        center: this.map_center,
        zoom: this.map_zoom,
        hash: false
      });
      
      map.dragRotate.disable();
      map.on("load", async () => {
        map.addLayer({
          id: "kytos-background",
          type: "background",
          paint: {
            "background-color": "#222",
            "background-opacity": 0
          },
          style: {
            "transition": {
              "duration": 0,
              "delay": 0
            }
          }
        });
        this.getTopology();

        const store = useMapSettingsStore();

        let setMapFuncs = {
          "": () => {},
          "change_map_no_background": () => {this.map.setStyle(this.map_style_empty)},
          "change_map_default_background": () => {this.map.setStyle(this.map_style_kytos)}
        }

        // Change map to current pinia store data.
        this.changeMapOpacity(store.mapOpacity);

        // Subscribe to store and update map based changes to it.
        let prevStyle = "";
        store.$subscribe((mutation, state) => {
          this.changeMapOpacity(state.mapOpacity);
          if (state.mapStyle != prevStyle) {
            setMapFuncs[state.mapStyle]();
          }
          prevStyle = state.mapStyle;
        })
      });

      this.map = map;
    },
    async getTopology () {
      console.log("Fetching topology data")

      this.$http.get(this.topology.url)
        .then(response => {
          this.topology.graph = response.data.topology
          this.extraComponent = KytosTopology
        })
        .catch(error => {
          var msg = "Error while trying to load the topology"
          this.$kytos.eventBus.$emit("statusMessage", msg, true)
          throw error
        });

    }
  },
  async mounted () {
    this.loadMap();
    this.setListeners();
  },
  unmounted() {
    this.map?.remove();
    this.map = null;
  }
}
</script>

<style lang="sass">
#k-map
  background-color: #222
  display: -webkit-flex
  display: flex
  width: 100%
  height: 100vh
  overflow: hidden
  position: absolute
  top: 0
  left: 0
  z-index: 0

  canvas
    position: absolute
    width: 100%
    height: 100%
    z-index: 1

.mapboxgl-ctrl-attrib
  top: -25px
.mapboxgl-control-container
  display: none
</style>
