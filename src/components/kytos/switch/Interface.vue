<template>
  <div :id="id" class="k-interface" @click="open_interface">
    <div class="left_div">
      <div class="usage" :class="utilization_color_class"></div>
      <div class="details" :title="mac">
        <div class="name">{{ name }} ({{ port_number }})</div>
        <div class="x_bytes">
          <div class="padding-top-bottom"></div>
          <div class="tx_bytes">{{ $filters.humanize_bytes(tx_bytes) }} T&nbsp;</div>
          <div class="padding-middle"></div>
          <div class="rx_bytes">{{ $filters.humanize_bytes(rx_bytes) }} R&nbsp;</div>
          <div class="padding-top-bottom"></div>
        </div>
      </div>
    </div>
    <div class="chart">
      <k-chart-timeseries v-if="chartJsonData" :interface_id="interface_id" :jsonData="chartJsonData" :showGrid="true"
        :showAxis="true" :plotArea="true" :chartHeight="100"></k-chart-timeseries>
      <div class="warn" v-else>&nbsp;Interface speed is unavailable</div>
    </div>
  </div>
</template>

<script>
import KytosBase from '../base/KytosBase'
import InterfaceInfo from '../../../kytos/interfaceInfo.vue'
import { mapState } from 'pinia';
import { useInterfaceStore } from '../../../stores/interfaceStore';

/**
 * Representation of the interfaces used.
 */

export default {
  name: 'k-interface',
  mixins: [KytosBase],
  props: {
    name: {
      type: String,
      required: true,
    },
    mac: {
      type: String,
      required: true,
    },
    speed: {
      type: Number,
      required: false,
    },
    port_number: {
      type: Number,
      required: true,
    },
    interface_id: {
      type: String,
      required: true,
    },
    interface_switch: {
      type: String,
      required: true,
    },
    content_switch: {
      type: Object,
      required: true,
    },
    enabled: {
      type: Boolean,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
    lldp: {
      type: Boolean,
      required: true,
    },
    nni: {
      type: Boolean,
      required: true,
    },
    uni: {
      type: Boolean,
      required: true,
    },
    metadata: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      chartJsonData: [],
      interval: null,
      tx_bytes: null,
      rx_bytes: null,
    }
  },
  computed: {
    utilization_color_class: function () {
      if (this.speed === null) return ''

      // Calculate highest interface utilization (tx or rx)
      let max_Bps = Math.max(this.tx_bytes, this.rx_bytes)
      let utilization = max_Bps / this.speed

      if (utilization > 0.8) return 'high'
      if (utilization > 0.5) return 'medium'
      return 'low'
    },
    ...mapState(useInterfaceStore, ['interfaceChartData'])
  },
  methods: {
    open_interface() {
      var content = {
        "component": InterfaceInfo,
        "content": this,
        "icon": "cog",
        "title": "Interface Details",
        "subtitle": this.name
      }
      this.$kytos.eventBus.$emit("showInfoPanel", content)

    },
  },
  mounted() {
    this.chartJsonData = this.interfaceChartData?.[this.interface_switch]?.[this.port_number];
  },

  watch: {
    chartJsonData: {
      handler: function (newVal) {
        let data = this.chartJsonData;
        if (data.length > 1) {
          let last_index = data.length - 1;
          let delta_tx = data[last_index].tx_bytes - data[last_index - 1].tx_bytes;
          let delta_rx = data[last_index].rx_bytes - data[last_index - 1].rx_bytes;
          let delta_time_tx = data[last_index].timestamp.getTime() - data[last_index-1].timestamp.getTime();
          let delta_time_rx = data[last_index].timestamp.getTime() - data[last_index-1].timestamp.getTime();
          this.tx_bytes = Math.round(((delta_tx * 1000 * 8/delta_time_tx) + Number.EPSILON) * 100) / 100;
          this.rx_bytes = Math.round(((delta_rx * 1000 * 8/delta_time_rx) + Number.EPSILON) * 100) / 100;
        }
      },
      deep: true
    }
  }
}
</script>

<style lang="sass">

@use '../../../assets/styles/dark-theme-variables'

.k-interface
  display: flex
  flex-direction: row
  cursor: pointer
  padding-top: 0.3em
  width: 100%
  color: dark-theme-variables.$fill-text
  background-color: dark-theme-variables.$fill-panel

  &:hover *
   color: dark-theme-variables.$fill-link-h
   background: dark-theme-variables.$fill-bar

  .left_div
    flex-grow: 1
    display: flex
    flex-direction: row
    cursor: pointer

    .usage
      flex-shrink: 0
      min-width: 4px

      &.high
        background-color: dark-theme-variables.$kytos-red
      &.medium
        background-color: dark-theme-variables.$kytos-yellow
      &.low
        background-color: dark-theme-variables.$kytos-green

  .details
    flex-grow: 1
    background-color: dark-theme-variables.$fill-input-bg
    display: flex
    gap: 0px
    flex-direction: column

    .name
      font-size: 0.7em
      display: block
      overflow: hidden
      height: 20px
      padding: 5px 5px 5px
      flex: 0 0 auto
      word-break: break-all
      text-align: center

    .x_bytes
      font-size: 0.7em
      font-family: monospace
      white-space: nowrap
      flex: 1
      display: flex
      flex-direction: column
      justify-content: center
      align-items: flex-end

      .tx_bytes
        color: #66FFFF
        flex: 4

      .rx_bytes
        color: #FF66FF
        flex: 4

      .padding-middle
        min-height: 5px
        flex: 2

      .padding-top-bottom
        min-height: 2.5px
        flex: 1

  .warn
    color: dark-theme-variables.$kytos-yellow
    flex: 1 0 auto
    width: 100%
    align-self: center
    justify-content: center

  .chart
    min-width: 322px
    flex-grow: 10


</style>
