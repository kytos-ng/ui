<template>
    <k-accordion>
      <div class="button_container">
        <k-button tooltip="Go back to switch info" title="< Back to switch" :on_click="back_switch"></k-button>
        <k-button :on_click="bt_state_toggle" :title="next_state"></k-button>
      </div>
      <template v-if="show_modal_state_toggle">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">
              <div class="modal-header">
                <slot name="header">
                </slot>
              </div>
              <div class="modal-body">
                <slot name="body">
                  {{next_state}} Interface {{metadata_items.port_name !== undefined && metadata_items.port_name.length !== 0? metadata_items.port_name : metadata.interface_id}}?
                </slot>
              </div>
              <div class="modal-footer">
                <slot name="footer">
                  <k-button tooltip="Cancel" title="Cancel" :on_click="modal_cancel_state_toggle">
                  </k-button>
                  <k-button id="modal-delete" :title="next_state" :on_click="modal_proceed_state_toggle">
                  </k-button>
                </slot>
              </div>
            </div>
          </div>
        </div>
      </template>
      <k-accordion-item title="Interface Plot" v-if="chartJsonData">
        <k-button-group>
            <!-- input type="text" class="k-input" placeholder="Zoom" disabled -->
            <k-button title="5" tooltip="5 minutes" v-on:click.native="change_plotRange(5)"></k-button>
            <k-button title="10" tooltip="10 minutes" v-on:click.native="change_plotRange(10)"></k-button>
            <k-button title="15" tooltip="15 minutes" v-on:click.native="change_plotRange(15)"></k-button>
            <k-button title="60" tooltip="60 minutes" v-on:click.native="change_plotRange(60)"></k-button>
            <k-button title="120" tooltip="120 minutes" v-on:click.native="change_plotRange(120)"></k-button>
          </k-button-group>
        <k-chart-timeseries :interface_id="metadata.interface_id" :jsonData="chartJsonData" :display_legend="true" :chartHeight="200" ></k-chart-timeseries>
      </k-accordion-item>

      <k-accordion-item title="Basic Details">
          <k-property-panel>
              <k-property-panel-item :name="key" :value="value" :key="key" v-if="content" v-for="(value, key) in this.metadata"></k-property-panel-item>
          </k-property-panel>
      </k-accordion-item>
      <k-accordion-item title="Available Tags">
        <div class="metadata_table">
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Value Ranges</th>  
              </tr>
            </thead>
            <tbody>
              <tr v-for="(value, key) in this.available_tags">
                <td >{{key}}</td>
                <td style="text-align: left;">{{value}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </k-accordion-item>
      <k-accordion-item title="Tag ranges">
        <div class="metadata_table">
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Value Ranges</th>  
              </tr>
            </thead>
            <tbody>
              <tr v-for="(value, key) in this.tag_ranges">
                <td >{{key}}</td>
                <td style="text-align: left;">{{value}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style="color:#ccc;text-align: center;"> Set tag_ranges </div>
        <div class="metric">
          <k-dropdown title="Tag type" :options="get_tag_types()" :value.sync ="new_tag_type"></k-dropdown>
        </div>
        <k-textarea title="Set tag_ranges" icon="arrow-right" placeholder="Eg. [[100, 200], [400, 4095]]" :value.sync="new_tag_ranges"></k-textarea>
        <div class="metadata_container">
          <k-button title="Set tag_ranges" :on_click="set_tag_ranges"></k-button>
        </div>
      </k-accordion-item>
      <k-accordion-item title="Metadata" v-if="Object.keys(this.metadata_items).length !== 0">
         <div class="metadata_table">
            <table>
              <thead>
                <tr>
                  <th>Key</th>
                  <th>Value</th>  
                </tr>
              </thead>
              <tbody>
                <tr v-for="(value, key) in this.metadata_items">
                  <td >{{key}}</td>
                  <td >{{value}}</td>
                </tr>
              </tbody>
            </table>
         </div>
      </k-accordion-item>
      <k-accordion-item title="Metadata actions"> 
         <k-textarea title="Add metadata" icon="arrow-right" placeholder='Eg. {"node_name": "some_name", "address": "some_address"}' :value.sync="to_add"></k-textarea>
         <div class="metadata_container">
              <k-button title="Add metadata" :on_click="bt_add_metadata"></k-button>
         </div>
         <k-input title="Delete metadata" icon="arrow-right" placeholder="Eg. node_name" :value.sync="to_delete"></k-input>
         <div class="metadata_container">
              <k-button title="Remove metadata" :on_click="bt_rmv_metadata"></k-button>
         </div>
      </k-accordion-item>

    </k-accordion>
</template>

<script>
import KytosBaseWithIcon from "../components/kytos/base/KytosBaseWithIcon"
import {json} from "d3-request"

export default {
  name: 'k-interface-info',
  mixins: [KytosBaseWithIcon],
  props: ["content"],
  data () {
    return {
      display: false,
      metadata_items: [],
      metadata: {"enabled": "",
                 "active": "",
                 "interface_id": "",
                 "name": "",
                 "port_number": "",
                 "dpid": "",
                 "mac": "",
                 "speed": "",
                 "lldp": "",
                 "nni": "",
                 "uni": "",},
      chartJsonData: null,
      interval: null,
      plotRange: null,
      next_state: "",
      to_add: "",
      to_delete: "",
      new_tag_ranges: "",
      new_tag_type: "",
      tag_ranges: {},
      available_tags: {},
      show_modal_state_toggle: false,
      content_switch: []
    }
  },
  computed: {
    endpoint () {
      // TODO: of_stats/kronos must implement the endpoint
      //let url = this.$kytos_server_api + "kytos/of_stats/v1/"
      //return url + this.metadata.dpid + "/ports/" + this.metadata.port_number
    }
  },
  methods: {
    update_interface_content () {
      var self = this
      let filter = this.$root.$options.filters.humanize_bytes      
      Object.keys(this.metadata).forEach(function (key) {
        let value = self.content[key]
        if (key == 'speed') {
          value = (value === null) ? 'Unavailable' : filter(value * 8)
        }
        self.metadata[key] = String(value)
      });
    },
    parseInterfaceData (data) {
      if (!data) {
        var msg = "Error while trying to fetch interface data."
        this.$kytos.$emit('statusMessage', msg, true)
      } else {
        this.chartJsonData = data["data"]
      }
    },
    build_url() {
        var parameters_url = "";
        if (this.plotRange !== null) {
            var unix = Math.round(+new Date()/1000);
            var start = unix - (this.plotRange * 60);
            parameters_url = parameters_url + "?start=" + start + "&end=" + unix;
        }
        var endpoint_url = this.endpoint + parameters_url;
        return endpoint_url;
    },
    update_chart() {
        // TODO: of_stats/kronos must implement the endpoint
        //json(this.build_url(), this.parseInterfaceData)
    },
    change_plotRange(range) {
        this.plotRange = range
        this.update_chart()
    },
    update_content_switch(){
      if(this.content === undefined) return
      this.content_switch = this.content["content_switch"]
    },
    back_switch() {
      let panel_content = {component: 'kytos-topology-k-info-panel-switch_info',
                           content: this.content_switch,
                           icon: "cog",
                           title: "Switch Details",
                           subtitle: this.content_switch.connection,}
      this.$kytos.$emit("showInfoPanel", panel_content)
    },
    get_metadata() {
      if(this.content === undefined) return
      this.metadata_items = this.content.metadata
    },
    get_next_state() {
      this.next_state = this.metadata.enabled == 'true'? 'Disable' : 'Enable'
    },
    bt_state_toggle(){
      this.show_modal_state_toggle = true;
    },
    modal_cancel_state_toggle(){
      this.show_modal_state_toggle = false;
    },
    modal_proceed_state_toggle(){
      this.show_modal_state_toggle = false;
      this.state_toggle_interface();
    },
    state_toggle_interface(){
      var _this = this
      let request = $.ajax({
                       type:"POST",
                       url: this.$kytos_server_api + "kytos/topology/v3/interfaces/" + this.metadata.interface_id
                             + "/" + this.next_state.toLowerCase(),
                       async: true,});
      request.done(function() {
        let notification = {
          title: 'Interface ' + _this.next_state + 'd: Succeed',
          description: 'The interface ' + _this.metadata.interface_id + ' was ' + _this.next_state.toLowerCase() + 'd.',
          icon: 'cog',
        }
        _this.next_state = _this.next_state == 'Enable'? 'Disable' : 'Enable'
        _this.metadata['enabled'] = _this.next_state == 'Enable'? 'false' : 'true'
        _this.$kytos.$emit("setNotification", notification)
      });
      request.fail(function(data) {
        let notification = {
          title: 'Interface ' + _this.next_state + 'd: Failed',
          description: data.status + ': ' + ( data.responseJSON !== undefined ? data.responseJSON.description : data.responseText ) + '. The interface ' + _this.metadata.interface_id + ' was not ' + _this.next_state.toLowerCase() + 'd.',
          icon: 'cog',
        }
        _this.$kytos.$emit("setNotification", notification)
      })
    },
    bt_add_metadata() {
      var _this = this
      let request = $.ajax({
                       type: "POST",
                       url: this.$kytos_server_api + "kytos/topology/v3/interfaces/" + this.metadata.interface_id
                             + "/metadata",
                       async: true,
                       data: this.to_add,
                       dataType: "json",
                       contentType: "application/json; charset=utf-8",
      });
      request.done(function() {
        let notification = {
             icon: 'cog',
             title: 'Add metadata: Success',
             description: '"' + _this.to_add + '" was added to the metadata. Interface: ' + _this.metadata.interface_id,
        }
        _this.$kytos.$emit("setNotification", notification)
        let temp = JSON.parse(_this.to_add)
        var item = ""
        for (item in temp){
          _this.content.metadata[item] = temp[item]
        }
        _this.to_add = ''
      });
      request.fail(function(data) {
        let notification = {
             icon: 'cog',
             title: 'Add metadata: Failure',
             description: data.status + ': ' + ( data.responseJSON !== undefined ? data.responseJSON.description : data.responseText ) + ' "' + _this.to_add + '" was not added to the metadata. Interface: ' + _this.metadata.interface_id,
        }
        _this.$kytos.$emit("setNotification", notification)
      });
    },
    bt_rmv_metadata() {
      var _this = this
      let request = $.ajax({
                       type: "DELETE",
                       url: this.$kytos_server_api + "kytos/topology/v3/interfaces/" + this.metadata.interface_id
                             + "/metadata/" + this.to_delete,
                       async: true,
      });
      request.done(function() {
        let notification = {
             icon: 'cog',
             title: 'Delete metadata: Success',
             description: '"' + _this.to_delete + '" was deleted from the metadata. Interface: ' + _this.metadata.interface_id,
        }
        _this.$kytos.$emit("setNotification", notification)
        delete _this.content.metadata[_this.to_delete]
        _this.to_delete = ''
      });
      request.fail(function(data) {
        let notification = {
             icon: 'cog',
             title: 'Delete metadata: Failure',
             description: data.status + ': ' + ( data.responseJSON !== undefined ? data.responseJSON.description : data.responseText ) + ' "' + _this.to_delete + '" was not deleted from the metadata. Interface: ' + _this.metadata.interface_id,
        }
        _this.$kytos.$emit("setNotification", notification)
      });
    },
    set_tag_ranges() {
      var _this = this
      let ranges_list = JSON.parse(this.new_tag_ranges)
      let payload = {tag_type: this.new_tag_type, tag_ranges: ranges_list}
      let intf_id = this.metadata.interface_id
      let api = this.$kytos_server_api
      let request = $.ajax({
                       type: "POST",
                       url: api + "kytos/topology/v3/interfaces/" + intf_id
                             + "/tag_ranges",
                       async: true,
                       data: JSON.stringify(payload),
                       dataType: "json",
                       contentType: "application/json; charset=utf-8",
      })
      request.done(function() {
        let new_available_tags = {}
        let _request = $.ajax({
                       type: "GET",
                       url: api + "kytos/topology/v3/interfaces/" + intf_id
                             + "/tag_ranges",
                       async: true
        })
        _request.done(function(data) {
          new_available_tags = data[intf_id]["available_tags"][_this.new_tag_type]
          _this.content['tag_ranges'][_this.new_tag_type] = _this.new_tag_ranges
          _this.content['available_tags'][_this.new_tag_type] = new_available_tags
          let notification = {
            title: 'Set ' + intf_id + ' tag_range: Succeed',
            description: 'For TAG type "' + _this.new_tag_type + '", a new tag_range was set: ' 
                         + _this.new_tag_ranges,
            icon: 'cog',
          }
          _this.$kytos.$emit("setNotification", notification)
        })
        _request.fail(function(data) {
          let notification = {
            title: 'Set ' + intf_id + ' tag_range: Succeed',
            description: data.status + ': ' + ( data.responseJSON !== undefined ? data.responseJSON.description : data.responseText ) + ' "tag_ranges" change was successful '
                         + 'but there was an error obtaining the resized "available_tags". Try refreshing the page.',
            icon: 'cog',
          }
          _this.$kytos.$emit("setNotification", notification)
        })
      });
      request.fail(function(data) {
        let notification = {
          title: 'Set ' + intf_id + ' tag_range: Failed',
          description: data.status + ': ' + ( data.responseJSON !== undefined ? data.responseJSON.description : data.responseText ) + ' "tag_ranges" was not set.',
          icon: 'cog',
        }
        _this.$kytos.$emit("setNotification", notification)
      });
    },
    get_tag_types() {
      let _result = [
        {value: "vlan", description: "vlan", selected: true},
        {value: "vlan_qinq", description: "vlan_qinq"},
        {value: "mpls", description: "mpls"},
      ];
      return _result;
    },
    get_tag_ranges_endpoint() {
      var _this = this
      if(this.content === undefined) return
      let request = $.ajax({
                       type: "GET",
                       url: this.$kytos_server_api + "kytos/topology/v3/interfaces/"
                              + this.metadata.interface_id + "/tag_ranges",
                       async: true
      })
      request.done(function(data) {
        _this.content['tag_ranges'] = data[_this.metadata.interface_id]['tag_ranges']
        _this.content['available_tags'] = data[_this.metadata.interface_id]['available_tags']
        _this.tag_ranges = _this.content.tag_ranges
        _this.available_tags = _this.content.available_tags
      })
    },
    get_tag_ranges_content() {
      if(this.content === undefined) return
      this.tag_ranges = this.content.tag_ranges
      this.available_tags = this.content.available_tags
    },
  },
  mounted () {
    this.update_interface_content()
    this.update_chart()
    this.update_content_switch()
    this.interval = setInterval(this.update_chart, 60000)
    this.get_metadata()
    this.get_next_state()
    this.get_tag_ranges_endpoint()
  },
  beforeDestroy () {
    clearInterval(this.interval)
  },
  watch: {
    content () {
      if (this.content) {
        this.update_interface_content()
        this.update_chart()
        this.update_content_switch()
        this.get_metadata()
        this.get_next_state()
        this.get_tag_ranges_content()
      }
    }
  }
}
</script>
<style lang="sass">
@import '../assets/styles/variables'

.metadata_table 
  color: #ccc
  max-height: 250px
  text-align: center
  margin: 0 auto
  display: block
  padding: 0.5em 0 1em 0.3em
  font-size: 0.8em
  overflow-x: hidden
  overflow-y: auto

.metadata_table table
  display: table
  width: 100%

.metadata_table thead
  font-weight: bold
  background: #554077

.metadata_table th
  padding: 0.6em 0 0.6em 0

.metadata_table td
  vertical-align: middle
  padding: 0.45em 0 0.45em 0
  word-break: break-all
  line-height: 20px

.metadata_table tbody tr:nth-child(even)
  background: #313131

.metadata_table tbody tr:hover
    color: #eee
    background-color: #666

.metadata_container 
  width: 100%
  display: flex
  justify-content: center

.metadata_container .k-button
  width: 150px

.button_container
  display: flex
  justify-content: space-between

.metric .k-dropdown
  height: 20px
  width: 100%
  overflow: hidden
  display: flex
  flex-wrap: wrap

.metric .k-dropdown__title
  width: 15%

.metric .k-dropdown__select
  width: 82%
</style>
