<template>
  <k-toolbar-item name="k-status-menu" icon="signal" tooltip="Status Menu" data-test="main-statusmenu">
    <div class="k-status-menu">
      <div class="k-status-title">
        <icon icon="signal"></icon>
        <div class="panel-title">
          <h1> Status Menu </h1>
        </div>
      </div>
      <div class="k-status-wrapper">
        <k-accordion>
          <!-- Refresh Menu Button: Makes new API requests -->
          <k-accordion-item title="Refresh" data-test="refresh_accordion">
            <k-button icon="rotate-right" title="Refresh" tooltip="Refresh" @click="refresh()" data-test="refresh_button"></k-button>
          </k-accordion-item>
          <!--
            Sections/Tables:
            Each follow the same structure as seen below
            here are three sections: Switches, Links, and Interfaces
          -->
          <k-accordion-item title="Tables" data-test="tables_accordion">
            <k-accordion-item title="Switches" data-test="switches_accordion">
              <!-- Buttons for choosing data to display -->
              <k-accordion-item title="Filters" data-test="switchfilters_accordion">
                <k-button-group>
                  <!-- Normal API Data -->
                  <k-button :class="selectedSwitchData('ORIGINAL')" icon="database" title="Show-All" tooltip="Show-All"
                    @click="changeSwitchData('ORIGINAL')" data-test="switch_all"></k-button>
                  <!-- Data that was pre selected by user -->
                  <k-button :class="selectedSwitchData('PRE_SELECTED')" icon="clipboard-check" title="Show-Selected"
                    tooltip="Show-Selected" @click="changeSwitchData('PRE_SELECTED')" data-test="switch_selected"></k-button>
                </k-button-group>
              </k-accordion-item>
              <div class="data_status_table">
                <!-- Table containing data -->
                <table data-test="switch_table">
                  <thead>
                    <tr>
                      <th rowspan="2"></th>
                      <th>Name</th>
                      <th>Status</th>
                      <th>Reason</th>
                      <th>Enabled</th>
                      <th>Active</th>
                    </tr>
                    <tr>
                      <th>
                        <input v-model="switchTextFilter[0][1]" data-test="switchName_Filter"></input>
                      </th>
                      <th>
                        <input v-model="switchTextFilter[1][1]" data-test="switchStatus_Filter"></input>
                      </th>
                      <th>
                        <input v-model="switchTextFilter[2][1]" data-test="switchReason_Filter"></input>
                      </th>
                      <th>
                        <input v-model="switchTextFilter[3][1]" data-test="switchEnabled_Filter"></input>
                      </th>
                      <th>
                        <input v-model="switchTextFilter[4][1]" data-test="switchActive_Filter"></input>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(value, key, index) in filtered_switchData" :key="value.dpid" @click="show_infoPanel(value.dpid)" :data-test="'switchRow_' + index">
                      <td><k-button class="statusTableButton" :icon="isStoredS(value, key)"
                          @click.stop="add_remove_Switches(value, key)"></k-button></td>
                      <td>{{ value.name }}</td>
                      <td :class="statusColor(value)">{{ value.status }}</td>
                      <td>{{ splitStatusReasons(value.status_reason) }}</td>
                      <td>{{ value.enabled }}</td>
                      <td>{{ value.active }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </k-accordion-item>
            <k-accordion-item title="Links" data-test="links_accordion">
              <k-accordion-item title="Filters" data-test="linkfilters_accordion">
                <k-button-group>
                  <k-button :class="selectedLinkData('ORIGINAL')" icon="database" title="Show-All" tooltip="Show-All"
                    @click="changeLinkData('ORIGINAL')" data-test="link_all"></k-button>
                  <k-button :class="selectedLinkData('PRE_SELECTED')" icon="clipboard-check" title="Show-Selected"
                    tooltip="Show-Selected" @click="changeLinkData('PRE_SELECTED')" data-test="link_selected"></k-button>
                </k-button-group>
              </k-accordion-item>
              <div class="data_status_table">
                <table data-test="link_table">
                  <thead>
                    <tr>
                      <th rowspan="2"></th>
                      <th>Name</th>
                      <th>Status</th>
                      <th>Reason</th>
                      <th>Enabled</th>
                      <th>Active</th>
                    </tr>
                    <tr>
                      <th>
                        <input v-model="linkTextFilter[0][1]" data-test="linkName_Filter"></input>
                      </th>
                      <th>
                        <input v-model="linkTextFilter[1][1]" data-test="linkStatus_Filter"></input>
                      </th>
                      <th>
                        <input v-model="linkTextFilter[2][1]" data-test="linkReason_Filter"></input>
                      </th>
                      <th>
                        <input v-model="linkTextFilter[3][1]" data-test="linkEnabled_Filter"></input>
                      </th>
                      <th>
                        <input v-model="linkTextFilter[4][1]" data-test="linkActive_Filter"></input>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(value, key, index) in filtered_linkData" :key="value.id" @click="show_infoPanelLink(value.id)" :data-test="'linkRow_' + index">
                      <td><k-button class="statusTableButton" :icon="isStoredL(value, key)"
                          @click.stop="add_remove_Links(value, key)"></k-button></td>
                      <td>{{ value.name }}</td>
                      <td :class="statusColor(value)">{{ value.status }}</td>
                      <td>{{ splitStatusReasons(value.status_reason) }}</td>
                      <td>{{ value.enabled }}</td>
                      <td>{{ value.active }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </k-accordion-item>
            <k-accordion-item title="Interfaces" data-test="interfaces_accordion">
              <k-accordion-item title="Filters" data-test="interfacefilters_accordion">
                <k-button-group>
                  <k-button :class="selectedInterfaceData('ORIGINAL')" icon="database" title="Show-All"
                    tooltip="Show-All" @click="changeInterfaceData('ORIGINAL')" data-test="interface_all"></k-button>
                  <k-button :class="selectedInterfaceData('PRE_SELECTED')" icon="clipboard-check" title="Show-Selected"
                    tooltip="Show-Selected" @click="changeInterfaceData('PRE_SELECTED')" data-test="interface_selected"></k-button>
                </k-button-group>
              </k-accordion-item>
              <div class="data_status_table">
                <table data-test="interface_table">
                  <thead>
                    <tr>
                      <th rowspan="2"></th>
                      <th>Switch/Node</th>
                      <th>Port</th>
                      <th>Status</th>
                      <th>Reason</th>
                      <th>Enabled</th>
                      <th>Active</th>
                    </tr>
                    <tr>
                      <th>
                        <input v-model="interfaceTextFilter[0][1]" data-test="interfaceNode_Filter"></input>
                      </th>
                      <th>
                        <input v-model="interfaceTextFilter[1][1]" data-test="interfacePort_Filter"></input>
                      </th>
                      <th>
                        <input v-model="interfaceTextFilter[2][1]" data-test="interfaceStatus_Filter"></input>
                      </th>
                      <th>
                        <input v-model="interfaceTextFilter[3][1]" data-test="interfaceReason_Filter"></input>
                      </th>
                      <th>
                        <input v-model="interfaceTextFilter[4][1]" data-test="interfaceEnabled_Filter"></input>
                      </th>
                      <th>
                        <input v-model="interfaceTextFilter[5][1]" data-test="interfaceActive_Filter"></input>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(value, key, index) in filtered_interfaceData" :key="value.id"
                      @click="show_infoPanelInterface(value.id)" :data-test="'interfaceRow_' + index">
                      <td><k-button class="statusTableButton" :icon="isStoredI(value, key)"
                          @click.stop="add_remove_Interfaces(value, key)"></k-button></td>
                      <td>{{ value.switch }}</td>
                      <td>{{ value.port }}</td>
                      <td :class="statusColor(value)">{{ value.status }}</td>
                      <td>{{ splitStatusReasons(value.status_reason) }}</td>
                      <td>{{ value.enabled }}</td>
                      <td>{{ value.active }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </k-accordion-item>
          </k-accordion-item>
        </k-accordion>
      </div>
    </div>
  </k-toolbar-item>
</template>

<script>
import KytosBase from '../base/KytosBase'
import KytosBaseWithIcon from '../base/KytosBaseWithIcon'

/**
 * Menu with a collection of tables displaying the network devices and their status. The menu can be shown or
 * hidden using the shortcut *Ctrl+Shift+S*.
 */
export default {
  name: 'k-status-menu',
  mixins: [KytosBaseWithIcon],
  data() {
    return {
      show: false,
      menuBarInfo: { eventName: 'StatusMenu', icon: 'signal', tooltip: 'Status Menu' },
      currentSwitchData: "",
      currentLinkData: "",
      currentInterfaceData: "",
      switches: {},
      links: {},
      interfaces: {},
      switchTextFilter: [
        ["name", ""],
        ["status", ""],
        ["status_reason", ""],
        ["enabled", ""],
        ["active", ""]
      ],
      linkTextFilter: [
        ["name", ""],
        ["status", ""],
        ["status_reason", ""],
        ["enabled", ""],
        ["active", ""]
      ],
      interfaceTextFilter: [
        ["switch", ""],
        ["port", ""],
        ["status", ""],
        ["status_reason", ""],
        ["enabled", ""],
        ["active", ""]
      ],
      selectedSwitches: {},
      selectedLinks: {},
      selectedInterfaces: {},
      change: 1
    }
  },
  methods: {
    refresh() {
      // Refreshes all table data
      this.get_topology()
    },
    statusColor(data) {
      /**
       * @param {Object} data - The normal table row object containing:
       * @param {string} data.status - The status of the device the Object references.
       * @param {string} data.status_reason - The status_reason of the device the Object references.
       * @param {boolean} data.enabled - State of the device the Object references. Enabled or Disabled.
       * @returns {string} Returns a string that acts as the class for current HTML element.
       * @description Sets color for current status table cell.
       */
      switch (true) {
        case (!data.enabled):
          return "darkWhite"
        case (data.status_reason.includes("maintenance")):
          return "yellow";
        case (data.status == "UP"):
          return "green";
        case (data.status == "DOWN"):
          return "red";
      }
    },
    /**
     * @param {Object} item - The normal table row object containing:
     * @param {string} item.dpid - The data path id of the device the Object references.
     * @param {string} item.id - The id of the device the Object references.
     * @param {string} index - The index of the current table row Object. Usually id or name.
     * @returns {string} Returns a string that acts as the icon for current HTML element.
     * @description Sets the current "Hidden/Selected" table column button icon by verifying if Object id
     *              is found within current list. Split for each individual table: Switches, Links, and Interfaces.
     */
    isStoredS(item, index) {
      if (this.selectedSwitches[index]?.dpid == item.dpid) {
        return "check-square"
      } else {
        return "square"
      }
    },
    isStoredL(item, index) {
      if (this.selectedLinks[index]?.id == item.id) {
        return "check-square"
      } else {
        return "square"
      }
    },
    isStoredI(item, index) {
      if (this.selectedInterfaces[index]?.id == item.id) {
        return "check-square"
      } else {
        return "square"
      }
    },
    /**
     * @param {string} data - The name of the selected data.
     * @returns {string} Returns a string that acts as the class for current HTML element.
     * @description Highlights selected data button.
     *              Split for each individual table: Switches, Links, and Interfaces.
     */
    selectedSwitchData(data) {
      if (this.currentSwitchData == data) {
        return "selectedButton"
      }
    },
    selectedLinkData(data) {
      if (this.currentLinkData == data) {
        return "selectedButton"
      }
    },
    selectedInterfaceData(data) {
      if (this.currentInterfaceData == data) {
        return "selectedButton"
      }
    },
    show_infoPanel(s) {
      /**
       * @event showInfoPanel
       * @param {Object} s - The switch data from the current row used to generate the info panel.
       * @description Displays info panel when table row is clicked.
       */
      var content = {
        component: 'kytos-topology-k-info-panel-switch_info',
        content: this.switches[s],
        icon: "cog",
        title: "Switch Details",
        subtitle: this.switches[s].metadata.node_name || '',
        subtitle_2: this.switches[s].connection,
      }
      this.$kytos.eventBus.$emit("showInfoPanel", content)
    },
    show_infoPanelLink(l) {
      /**
       * @event showInfoPanel
       * @param {Object} l - The link data from the current row used to generate the info panel.
       * @description Displays info panel when table row is clicked.
       */
      var link = this.links[l]
      var subtitle = ""
      if (link.metadata.link_name !== undefined && link.metadata.link_name.length !== 0) {
        subtitle = link.metadata.link_name
      }
      else {
        subtitle = link.id
        if (subtitle.length > 16) subtitle = subtitle.substr(0, 16) + "..."
      }
      var content = {
        component: 'kytos-topology-k-info-panel-link_info',
        content: link,
        icon: "cog",
        title: "Link Details",
        subtitle: subtitle
      }
      this.$kytos.eventBus.$emit("showInfoPanel", content)
    },
    show_infoPanelInterface(i) {
      /**
       * @event showInfoPanel
       * @param {Object} i - The interface data from the current row used to generate the info panel.
       * @description Displays info panel when table row is clicked.
       */
      var content = {
        component: 'k-interface-info',
        content: this.interfaces[i],
        icon: "cog",
        title: "Interface Details",
        subtitle: i
      }
      this.$kytos.eventBus.$emit("showInfoPanel", content)
    },
    /**
     * @param {string} data - The name of the selected data.
     * @description Changes the current data value stored in memory to the data param.
     *              Split for each individual table: Switches, Links, and Interfaces.
     */
    changeSwitchData(data) {
      this.currentSwitchData = data
    },
    changeLinkData(data) {
      this.currentLinkData = data
    },
    changeInterfaceData(data) {
      this.currentInterfaceData = data
    },
    /**
     * @param {Object} item - The normal table row object containing:
     * @param {string} item.dpid - The data path id of the device the Object references.
     * @param {string} item.id - The id of the device the Object references.
     * @param {string} index - The index of the current table row Object. Usually id or name.
     * @description Adds and Removes elements from the respective "selected" list based on id.
     *              Split for each individual table: Switches, Links, and Interfaces.
     */
    add_remove_Switches(item, index) {
      if (this.selectedSwitches[index]?.dpid == item.dpid) {
        delete this.selectedSwitches[index]
      } else {
        this.selectedSwitches[index] = item;
      }
      this.change = this.change * -1
      this.$forceUpdate();
    },
    add_remove_Links(item, index) {
      if (this.selectedLinks[index]?.id == item.id) {
        delete this.selectedLinks[index]
      } else {
        this.selectedLinks[index] = item;
      }
      this.change = this.change * -1
      this.$forceUpdate();
    },
    add_remove_Interfaces(item, index) {
      if (this.selectedInterfaces[index]?.id == item.id) {
        delete this.selectedInterfaces[index]
      } else {
        this.selectedInterfaces[index] = item;
      }
      this.change = this.change * -1
      this.$forceUpdate();
    },
    //API Requests for Switch, Link, and Interface data.
    async get_topology() {
      try {
        const response = await this.$http.get(this.$kytos_server_api + "kytos/topology/v3");
        this.switches = response.data['topology']['switches']
        this.links = response.data['topology']['links'];
        this.interfaces = {}
        for (var swid in this.switches) {
          for (var intfid in this.switches[swid]["interfaces"]) {
            this.interfaces[intfid] = this.switches[swid]["interfaces"][intfid];
            this.interfaces[intfid]["interface_id"] = intfid;
            this.interfaces[intfid]["dpid"] = swid;
            this.interfaces[intfid]["content_switch"] = this.switches[swid];
          }
        }
      } catch (err) {
        this.$http_helpers.post_error(this, err, 'Could not retrieve topology');
      }
    },
    //Formats status reason data for table
    splitStatusReasons(statusReasons) {
      return statusReasons.toString()
    }
  },
  computed: {
    /**
     * @property {Object} Data - The normal table row object containing:
     * @property {string} Data.name - The name of the Object.
     * @property {string} Data.status - The status of the device the Object references.
     * @property {string} Data.status_reason - The status_reason of the device the Object references.
     * @property {boolean} Data.enabled - State of the device the Object references. Enabled or Disabled.
     * @property {boolean} Data.active - State of the device the Object references. Active or Inactive.
     * @property {string} Data.id - The ID of the Object.
     * @description The data being generated by these computed properties is fed into the tables.
     *              All table data follows the same structure as seen above.
     *              Split for each individual table: Switches, Links, and Interfaces.
     */
    //Base Data
    switchData: function () {
      var switch_table_data = {}
      if (Object.keys(this.switches).length != 0) {
        for (const s in this.switches) {
          switch_table_data[s] = {}
          if (this.switches[s].metadata.node_name != undefined && this.switches[s].metadata.node_name != "") {
            switch_table_data[s]["name"] = this.switches[s].metadata.node_name
          } else {
            switch_table_data[s]["name"] = this.switches[s].dpid
          }
          switch_table_data[s]["status"] = this.switches[s].status
          switch_table_data[s]["status_reason"] = this.switches[s].status_reason.includes("maintenance") ? this.switches[s].status_reason : "N/A"
          switch_table_data[s]["enabled"] = this.switches[s].enabled
          switch_table_data[s]["active"] = this.switches[s].active
          switch_table_data[s]["dpid"] = this.switches[s].dpid
        }
      }
      return switch_table_data
    },
    linkData: function () {
      var link_table_data = {}
      if (Object.keys(this.links).length != 0) {
        for (const l in this.links) {
          link_table_data[l] = {}
          if (this.links[l].metadata.link_name != undefined && this.links[l].metadata.link_name != "") {
            link_table_data[l]["name"] = this.links[l].metadata.link_name
          } else {
            link_table_data[l]["name"] = this.links[l].id
          }
          link_table_data[l]["status"] = this.links[l].status
          link_table_data[l]["status_reason"] = this.links[l].status_reason.includes("maintenance") ? this.links[l].status_reason : "N/A"
          link_table_data[l]["enabled"] = this.links[l].enabled
          link_table_data[l]["active"] = this.links[l].active
          link_table_data[l]["id"] = this.links[l].id
        }
      }
      return link_table_data
    },
    interfaceData: function () {
      var interface_table_data = {}
      if ((Object.keys(this.switches).length != 0) && (Object.keys(this.interfaces).length != 0)) {
        for (const i in this.interfaces) {
          interface_table_data[i] = {}
          if (this.interfaces[i].metadata.port_name != undefined && this.interfaces[i].metadata.port_name != "") {
            interface_table_data[i]["port"] = this.interfaces[i].metadata.port_name
          } else {
            interface_table_data[i]["port"] = this.interfaces[i].name
          }
          interface_table_data[i]["status"] = this.interfaces[i].status
          interface_table_data[i]["status_reason"] = this.interfaces[i].status_reason.includes("maintenance") ? this.interfaces[i].status_reason : "N/A"
          interface_table_data[i]["enabled"] = this.interfaces[i].enabled
          interface_table_data[i]["active"] = this.interfaces[i].active
          interface_table_data[i]["switch"] = this.interfaces[i].switch
          interface_table_data[i]["id"] = this.interfaces[i].id
        }
      }
      return interface_table_data
    },
    //Filtered Data
    filtered_switchData: function () {
      var current_data = {}
      var updater = this.change
      //Selects Data to filter from selectedSwitches.
      switch (this.currentSwitchData) {
        case "ORIGINAL":
          current_data = structuredClone(this.$kytos.toRaw(this.switchData))
          break;
        case "PRE_SELECTED":
          current_data = structuredClone(this.$kytos.toRaw(this.selectedSwitches))
          break;
        default:
          current_data = structuredClone(this.$kytos.toRaw(this.switchData))
          break;
      }
      //Filters Data based on current textFilter.
      for (const element of this.switchTextFilter) {
        if (element[1] != "") {
          for (const s in current_data) {
            var separatedFilter = element[1].toString()
            var separatedProperty = current_data[s][element[0]].toString()
            if (!(separatedProperty.includes(separatedFilter) || separatedFilter.includes(separatedProperty))) {
              delete current_data[s]
            }
          }
        }
      }
      return current_data
    },
    filtered_linkData: function () {
      var current_data = {}
      var updater = this.change
      //Selects Data to filter from selectedLinks.
      switch (this.currentLinkData) {
        case "ORIGINAL":
          current_data = structuredClone(this.$kytos.toRaw(this.linkData))
          break;
        case "PRE_SELECTED":
          current_data = structuredClone(this.$kytos.toRaw(this.selectedLinks))
          break;
        default:
          current_data = structuredClone(this.$kytos.toRaw(this.linkData))
          break;
      }
      //Filters Data based on current textFilter.
      for (const element of this.linkTextFilter) {
        if (element[1] != "") {
          for (const l in current_data) {
            var separatedFilter = element[1].toString()
            var separatedProperty = current_data[l][element[0]].toString()
            if (!(separatedProperty.includes(separatedFilter) || separatedFilter.includes(separatedProperty))) {
              delete current_data[l]
            }
          }
        }
      }
      return current_data
    },
    filtered_interfaceData: function () {
      var current_data = {}
      var updater = this.change
      //Selects Data to filter from selectedInterfaces.
      switch (this.currentInterfaceData) {
        case "ORIGINAL":
          current_data = structuredClone(this.$kytos.toRaw(this.interfaceData))
          break;
        case "PRE_SELECTED":
          current_data = structuredClone(this.$kytos.toRaw(this.selectedInterfaces))
          break;
        default:
          current_data = structuredClone(this.$kytos.toRaw(this.interfaceData))
          break;
      }
      //Filters Data based on current textFilter.
      for (const element of this.interfaceTextFilter) {
        if (element[1] != "") {
          for (const i in current_data) {
            var separatedFilter = element[1].toString()
            var separatedProperty = current_data[i][element[0]].toString()
            if (!(separatedProperty.includes(separatedFilter) || separatedFilter.includes(separatedProperty))) {
              delete current_data[i]
            }
          }
        }
      }
      return current_data
    }
  },
  created() {
    this.get_topology();
  },
  //Extracts data from localStorage (if available) when first mounted.
  mounted() {
    if (JSON.parse(localStorage.getItem('kytos/ui/switchTextFilter'))) {
      this.switchTextFilter = JSON.parse(localStorage.getItem('kytos/ui/switchTextFilter'));
    }
    if (JSON.parse(localStorage.getItem('kytos/ui/linkTextFilter'))) {
      this.linkTextFilter = JSON.parse(localStorage.getItem('kytos/ui/linkTextFilter'));
    }
    if (JSON.parse(localStorage.getItem('kytos/ui/interfaceTextFilter'))) {
      this.interfaceTextFilter = JSON.parse(localStorage.getItem('kytos/ui/interfaceTextFilter'));
    }
    if (JSON.parse(localStorage.getItem('kytos/ui/currentSwitchData'))) {
      this.currentSwitchData = JSON.parse(localStorage.getItem('kytos/ui/currentSwitchData'));
    }
    if (JSON.parse(localStorage.getItem('kytos/ui/currentLinkData'))) {
      this.currentLinkData = JSON.parse(localStorage.getItem('kytos/ui/currentLinkData'));
    }
    if (JSON.parse(localStorage.getItem('kytos/ui/currentInterfaceData'))) {
      this.currentInterfaceData = JSON.parse(localStorage.getItem('kytos/ui/currentInterfaceData'));
    }
    if (JSON.parse(localStorage.getItem('kytos/ui/selectedSwitches'))) {
      this.selectedSwitches = JSON.parse(localStorage.getItem('kytos/ui/selectedSwitches'));
    }
    if (JSON.parse(localStorage.getItem('kytos/ui/selectedLinks'))) {
      this.selectedLinks = JSON.parse(localStorage.getItem('kytos/ui/selectedLinks'));
    }
    if (JSON.parse(localStorage.getItem('kytos/ui/selectedInterfaces'))) {
      this.selectedInterfaces = JSON.parse(localStorage.getItem('kytos/ui/selectedInterfaces'));
    }
  },
  //Watches to see if data is changed to then store it within localStorage.
  watch: {
    switchTextFilter(newVal) {
      localStorage.setItem('kytos/ui/switchTextFilter', JSON.stringify(newVal))
    },
    linkTextFilter(newVal) {
      localStorage.setItem('kytos/ui/linkTextFilter', JSON.stringify(newVal))
    },
    interfaceTextFilter(newVal) {
      localStorage.setItem('kytos/ui/interfaceTextFilter', JSON.stringify(newVal))
    },
    currentSwitchData(newVal) {
      localStorage.setItem('kytos/ui/currentSwitchData', JSON.stringify(newVal))
    },
    currentLinkData(newVal) {
      localStorage.setItem('kytos/ui/currentLinkData', JSON.stringify(newVal))
    },
    currentInterfaceData(newVal) {
      localStorage.setItem('kytos/ui/currentInterfaceData', JSON.stringify(newVal))
    },
    selectedSwitches: {
      handler: function () {
        localStorage.setItem('kytos/ui/selectedSwitches', JSON.stringify(this.selectedSwitches))
      },
      deep: true
    },
    selectedLinks: {
      handler: function () {
        localStorage.setItem('kytos/ui/selectedLinks', JSON.stringify(this.selectedLinks))
      },
      deep: true
    },
    selectedInterfaces: {
      handler: function () {
        localStorage.setItem('kytos/ui/selectedInterfaces', JSON.stringify(this.selectedInterfaces))
      },
      deep: true
    },
  }
}

</script>

<style lang="sass">

  @use '../../../assets/styles/dark-theme-variables'
  
  .k-status-menu
    -webkit-order: 4
    -ms-flex-order: 4
    order: 4
    display: flex
    flex-direction: column
    min-height: calc(100% - 45px)
    padding: 10px
    position: fixed
    right: 0
    top: 0
    background-color: dark-theme-variables.$fill-panel
    width: calc(100% - 300px)
    z-index: 998
    box-shadow: 10px 0px 20px 5px rgba(0, 0, 0, 0.4)
  
  .k-status-title
    display: flex
    flex-direction: row
    align-items: center
  
    svg
      fill: dark-theme-variables.$fill-icon
      width: 50px
      height: 50px
      padding: 10px
      margin-right: 5px
  
  .panel-title
    padding: 0
    margin: 0
    color: dark-theme-variables.$fill-text
  
    & > h1
      font-size: 1.2em
      font-weight: bold
      color: dark-theme-variables.$fill-text
  
  .k-status-wrapper
    -webkit-flex: 1 1 auto
    overflow-y: auto
    height: 0px
  
  .data_status_table
    color: #ccc
    text-align: center
    margin: 0 auto
    display: block
    padding: 0.5em 0 1em 0.3em
    font-size: 0.8em
    overflow-x: hidden
    overflow-y: auto
  
  .data_status_table table
    display: table
    width: 100%
  
  .data_status_table thead
    font-weight: bold
    background: #554077
  
  .data_status_table th
    padding: 0.6em 0 0.6em 0
    vertical-align: middle
    border: 1px solid
    color: #b3b3b3
    border-color: #322c5d
  
  .data_status_table td
    vertical-align: middle
    padding: 0.45em 0 0.45em 0
    word-break: break-all
  
  .data_status_table tbody tr:hover
    color: #eee
    background-color: #666
  
  .yellow
    background-color: #f9a825
    color: #222
  
  .green
    background-color: #8bc34a
    color: #222
  
  .red
    background-color: #dd2c00
    color: #222
  
  .darkWhite
    background-color: #CCC
    color: #222
  
  .selectedButton
    color: dark-theme-variables.$fill-button-hover
    background: dark-theme-variables.$fill-button-bg-h
  
  .statusTableButton
    margin: auto
    float: none
    width: 100%
    box-sizing: border-box
  
  </style>