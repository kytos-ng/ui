<template>
  <div class="chart-timeseries" :id="plotId"></div>
</template>

<script>
import KytosBase from "../base/KytosBase";
import * as d3 from 'd3';

export default {
  name: "k-chart-timeseries",
  mixins: [KytosBase],
  props: {
    chartHeight: {
      type: Number,
      required: true
    },
    interface_id: {
      type: String,
      required: true
    },
    jsonData: {
      type: Object,
      required: true
    },
    showGrid: {
      type: Boolean,
      default: true
    },
    showAxis: {
      type: Boolean,
      default: true
    },
    plotArea: {
      type: Boolean,
      default: true
    },
    display_legend: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      margin: {top: 10, right: 30, bottom: 30, left: 30},
      data: null,
      chart: null,
      x: null,
      y: null,
      xaxis: null,
      yaxis: null,
      xgrid: null,
      ygrid: null,
      txline: null,
      rxline: null,
      txarea: null,
      rxarea: null,
      updatedHeight: null,
      baseChartWidth: 322
    }
  },
  computed: {
    height () {
      return this.updatedHeight - this.margin.top - this.margin.bottom
    },
    dpid () {
      return this.interface_id.split(":").slice(0,-1).join(":")
    },
    legend_height () {
      return (this.display_legend) ? 40 : 0
    },
    plotId () { 
      return "timeseries-" + this.uuid4();
    },
    maxSpeed () { return Number(this.jsonData.speed) || 0 }
  },
  methods: {
    width () {
      return this.baseChartWidth - this.margin.left - this.margin.right
    },
    buildLine (yParam) {
      let x = this.x
      let y = this.y
      return d3.line().curve(d3.curveMonotoneX)
        .x(function(d) { return x(d.timestamp) })
        .y(function(d) { return y(d[yParam]) })
    },
    buildArea (yParam) {
      let x = this.x
      let y = this.y
      return d3.area().curve(d3.curveMonotoneX)
          .x(function(d) { return x(d.timestamp) })
          .y0(this.height)
          .y1(function(d) { return y(d[yParam]) })
    },
    parseJsonData () {
      let data = [];
      let transformed_data = [];
      this.jsonData.forEach((element) => {
        data.push({"timestamp": element.timestamp,
                   "tx_bytes": element.tx_bytes,
                   "rx_bytes": element.rx_bytes});
      });
      transformed_data = this.calculateBPS(data);
      this.data = transformed_data;
    },
    calculateBPS (data) {
      let transformed_data = [];
      if (data.length < 2) {
        return [{
          "timestamp": 0,
          "tx_bytes": 0,
          "rx_bytes": 0
        }]
      }
      for (let i = 1; i < (data.length); i++) {
        let initial = data[i - 1];
        let final = data[i];
        let delta_tx = final.tx_bytes - initial.tx_bytes;
        let delta_rx = final.rx_bytes - initial.rx_bytes;
        let delta_time = final.timestamp.getTime() - initial.timestamp.getTime();
        let bpsT = delta_tx / delta_time;
        let bpsR = delta_rx / delta_time;
        let midpoint_time = new Date((final.timestamp.getTime() + initial.timestamp.getTime()) / 2);
        transformed_data.push({
          "timestamp": midpoint_time,
          "tx_bytes": bpsT,
          "rx_bytes": bpsR
        })
      }
      return transformed_data;
    },
    updateMargins () {
      this.updatedHeight = this.chartHeight
      this.margin.left = this.baseChartWidth * 0.02
      this.margin.right = this.baseChartWidth * 0.05
      this.margin.top = this.updatedHeight * 0.08
      this.margin.bottom = this.updatedHeight * 0.05
      if (this.showAxis) {
        this.margin.left = this.baseChartWidth * 0.19
        this.margin.bottom = this.updatedHeight * 0.2
      }
    },
    init () {
      // Init x axis
      this.x = d3.scaleTime().range([0, this.width()]).nice();
      // Init y axis
      this.y = d3.scaleLinear().range([this.height, 0]).nice();

      // Init x axis
      this.xaxis = d3.axisBottom(this.x)
        .ticks(7)

      // Init y axis
      let humanize_bytes = this.$filters.humanize_bytes
      this.yaxis = d3.axisLeft(this.y)
        .ticks(5)
        .tickFormat(function(v) { return humanize_bytes(v * 8) })

      // Init x grid
      this.xgrid = d3.axisBottom(this.x)
        .ticks(20)
        .tickSize(-this.height)
        .tickFormat("")

      // Init y grid
      this.ygrid = d3.axisLeft(this.y)
        .tickSize(-this.width())
        .tickFormat("")

      // init lines and areas
      this.txline = this.buildLine("tx_bytes")
      this.rxline = this.buildLine("rx_bytes")
      this.txarea = this.buildArea("tx_bytes")
      this.rxarea = this.buildArea("rx_bytes")

      this.chart = d3.select("#" + this.plotId)
        .append("svg")
          .attr("preserveAspectRatio", "xMinYMin meet")
          .attr("viewBox", "0 0 " + (this.width() + this.margin.right + this.margin.left) + " " + (this.height + this.margin.top + this.margin.bottom))
          .classed("svg-content", true)
          .append("g")
          .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")

    },
    initChartData () {
      if (this.display_legend == true){
        // Legend
        var legend_position = this.height + this.margin.top + this.margin.bottom
        var data = ["rx","tx"]
        this.legend = this.chart
          .selectAll("g")
          .data(data)
          .enter()
          .append("g")
          .attr("transform", function(d, i) {
            return "translate(" + i* 100 + ","+legend_position+")";
          })

        this.legend.append("rect")
        .attr("width", 18)
        .attr("height", 18)
        .attr("class", function(d){
          return d + " line area"
        })

        this.legend.append("text")
          .data(data)
          .attr("x", 24)
          .attr("y", 9)
          .attr("dy", ".35em")
          .text(function(d) {
            return d + " bytes";
        });
      }
      // X scale domain
      this.x.domain(d3.extent(this.data, function(d) { return d.timestamp })).nice()

      // Y scale domain
      let max_y = d3.max(this.data, function(d) { return Math.max(d.tx_bytes, d.rx_bytes) })
      max_y = Math.max(max_y, this.maxSpeed)
      this.y.domain([0, max_y])

      // X gridlines
      this.chart.append("g")
        .attr("transform", "translate(0," + this.height + ")")
        .classed("x grid", true)
        .classed("hidden", !this.showGrid)
        .call(this.xgrid)

      // Y gridlines
      this.chart.append("g")
        .classed("y grid", true)
        .classed("hidden", !this.showGrid)
        .call(this.ygrid)

      // X Axis
      this.chart.append("g")
        .attr("transform", "translate(0," + this.height + ")")
        .classed("x axis", true)
        .classed("hidden", !this.showAxis)
        .call(this.xaxis)

      // Y Axis
      this.chart.append("g")
        .classed("y axis", true)
        .classed("hidden", !this.showAxis)
        .call(this.yaxis)

      // TX Area plot
      this.chart.append("path")
        .classed("rx area", true)
        .classed("hidden", !this.plotArea)
        .attr("d", this.rxarea(this.data))

      // RX Area plot
      this.chart.append("path")
        .classed("tx area", true)
        .classed("hidden", !this.plotArea)
        .attr("d", this.txarea(this.data))

      // RX Line plot
      this.chart.append("path")
        .classed("rx line", true)
        .attr("d", this.rxline(this.data))

      // TX Line plot
      this.chart.append("path")
        .classed("tx line", true)
        .attr("d", this.txline(this.data))


    },
    updateChart () {
      // Set x scale domain
      this.x.domain(d3.extent(this.data, function(d) { return d.timestamp })).nice()

      // Set y scale domain
      let max_y = d3.max(this.data, function(d) { return Math.max(d.tx_bytes, d.rx_bytes) })
      max_y = Math.max(max_y, this.maxSpeed)
      this.y.domain([0, max_y])

      // Select the section we want to apply our changes to
      let container = d3.select("#" + this.plotId).transition()

      // Make the changes
      container.selectAll(".rx.area")
        .duration(750)
        .attr("d", this.rxarea(this.data))
      container.selectAll(".tx.area")
        .duration(750)
        .attr("d", this.txarea(this.data))
      container.selectAll(".rx.line")
        .duration(750)
        .attr("d", this.rxline(this.data))
      container.selectAll(".tx.line")
        .duration(750)
        .attr("d", this.txline(this.data))
      container.selectAll(".x.grid")
        .duration(750)
        .call(this.xgrid)
      container.selectAll(".y.grid")
        .duration(750)
        .call(this.ygrid)
      container.selectAll(".x.axis")
        .duration(750)
        .call(this.xaxis)
      container.selectAll(".y.axis")
        .duration(750)
        .call(this.yaxis)

      // Hide Elements that need to be hidden
      this.toggleElements()
    },
    toggleElements () {
      let container = d3.select("#" + this.plotId)
      container.select(".rx.area").classed("hidden", !this.plotArea)
      container.select(".tx.area").classed("hidden", !this.plotArea)
      container.select(".x.grid").classed("hidden", !this.showGrid)
      container.select(".y.grid").classed("hidden", !this.showGrid)
      container.select(".x.axis").classed("hidden", !this.showAxis)
      container.select(".y.axis").classed("hidden", !this.showAxis)
    }
  },
  mounted () {
    this.parseJsonData()
    this.updateMargins()
    this.init()
    this.initChartData()
    this.toggleElements()
  },
  updated () {
    this.parseJsonData()
    this.updateChart()
  },
  watch: {
    jsonData: {
      handler: function () {
        this.parseJsonData()
        this.updateChart()
      },
      deep: true
    },
    chartHeight () {
      this.updateMargins()
    }
  }
}
</script>

<style lang="sass">

@use "../../../assets/styles/dark-theme-variables"

.chart-timeseries
  width: 100%
  float: left
  background-color: dark-theme-variables.$fill-bar
  display: inline-block
  position: relative
  padding-bottom: 31.0559%
  overflow: hidden
  vertical-align: top

  text
    fill: grey
    font-size: 0.85

  .grid
    line
      stroke: grey
      stroke-opacity: 0.7

    path
      stroke-width: 0

  .axis
    font-size: 0.9em

    path
      fill: none
      stroke-width: 1
      stroke: #00FFFF

  .area
    stroke-width: 0
    fill-opacity: 0.4

  .line
    stroke-width: 2
    fill: transparent

  .rx
    &.line
      stroke: #FF00FF
    &.area
      fill: #FF00FF

  .tx
    &.line
      stroke: #00FFFF
    &.area
      fill: #00FFFF

  .hidden
    display: none

  .tick text 
    font-size: 10px

  .svg-content
    display: inline-block
    position: absolute
    top: 0
    left: 0

</style>
