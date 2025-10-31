import { createApp } from 'vue'
import VueHotkey from 'v-hotkey3'
import App from './App.vue'
import * as packageInfo from '../package.json';
import eventBus from './event-bus'
import { toRaw } from 'vue';

const {version} = packageInfo;

const kytos = createApp(App)

kytos.use(VueHotkey)

import $ from 'jquery';
window.$ = window.jQuery = $;
import axios from 'axios';
kytos.config.globalProperties.$http = axios;

import * as d3 from 'd3';
window.d3 = window.D3 = d3;
window.kytos_server = location.protocol + "//" + location.host + "/";
window.kytos_server_api = location.protocol + "//" + location.host + "/api/";

import KytosToolbarItem from './components/kytos/misc/ToolbarItem.vue';
import KytosToolbar from './components/kytos/napp/Toolbar.vue';
import KytosNappsInfoPanel from './components/kytos/napp/NappsInfoPanel.vue';
import KytosActionMenuItem from './components/kytos/napp/ActionMenuItem.vue';
import KytosMap from './components/kytos/map/Map.vue';
import KytosTopology from './components/kytos/topology/Topology.vue';
import KytosTabs from './components/kytos/tabs/tabs.vue';
import KytosTerminal from './components/kytos/terminal/Terminal.vue';
import KytosLogging from './components/kytos/logging/Logging.vue';
import KytosButton from './components/kytos/inputs/buttons/Button.vue';
import KytosButtonGroup from './components/kytos/inputs/buttons/ButtonGroup.vue';
import KytosDropdown from './components/kytos/inputs/Dropdown.vue';
import KytosContextPanel from './components/kytos/misc/ContextPanel.vue';
import KytosMenubar from './components/kytos/misc/Menubar.vue';
import KytosModal from './components/kytos/misc/Modal.vue';
import KytosActionMenu from './components/kytos/misc/ActionMenu.vue';
import KytosInfoPanel from './components/kytos/misc/InfoPanel.vue';
import KytosStatusBar from './components/kytos/misc/StatusBar.vue';
import KytosInput from './components/kytos/inputs/Input.vue';
import KytosInputAutocomplete from './components/kytos/inputs/InputAutocomplete.vue';
import KytosStatusMenu from './components/kytos/misc/StatusMenu.vue';

import KytosTextarea from './components/kytos/inputs/Textarea.vue';
import KytosCheckbox from './components/kytos/inputs/Checkbox.vue';
import MapBoxSettings from './components/kytos/map/MapBoxSettings.vue';

import KytosSelect from './components/kytos/inputs/Select.vue';
import KytosSlider from './components/kytos/inputs/Slider.vue';
import KytosAccordion from './components/kytos/accordion/Accordion.vue';
import KytosAccordionItem from './components/kytos/accordion/AccordionItem.vue';
import KytosPropertyPanel from './components/kytos/ppanel/PropertyPanel.vue';
import KytosPropertyPanelItem from './components/kytos/ppanel/PropertyPanelItem.vue';

import KytosInterface from './components/kytos/switch/Interface.vue';
import KytosFlow from './components/kytos/switch/Flow.vue';

import KytosSwitchRadar from './kytos/switchRadar.vue';
import KytosInterfaceInfo from './kytos/interfaceInfo.vue';

import KytosChartTimeseries from './components/kytos/chart/Timeseries.vue';
import KytosChartRadar from './components/kytos/chart/RadarChart.vue';

import KytosTable from './components/kytos/table/Table.vue';

import KytosNotification from "./components/kytos/misc/Notification.vue";

import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import http_helpers from './helpers/http-helpers';

library.add(fas, far, fab)
dom.watch();

kytos.component('k-menubar', KytosMenubar);
kytos.component('k-modal', KytosModal);
kytos.component('k-map', KytosMap);
kytos.component('mapbox-settings', MapBoxSettings);
kytos.component('k-topology', KytosTopology);
kytos.component('k-context-panel', KytosContextPanel);
kytos.component('k-tabs', KytosTabs);
kytos.component('k-terminal', KytosTerminal);
kytos.component('k-logging', KytosLogging);
kytos.component('k-button', KytosButton);
kytos.component('k-dropdown', KytosDropdown);
kytos.component('k-button-group', KytosButtonGroup);
kytos.component('k-action-menu', KytosActionMenu);
kytos.component('k-input', KytosInput);
kytos.component('k-input-auto', KytosInputAutocomplete);
kytos.component('k-textarea', KytosTextarea);
kytos.component('k-checkbox', KytosCheckbox);
kytos.component('k-status-bar', KytosStatusBar);
kytos.component('k-status-menu', KytosStatusMenu);

kytos.component('k-select', KytosSelect)
kytos.component('k-slider', KytosSlider);
kytos.component('k-accordion', KytosAccordion);
kytos.component('k-accordion-item', KytosAccordionItem);
kytos.component('k-property-panel', KytosPropertyPanel);
kytos.component('k-property-panel-item', KytosPropertyPanelItem);
kytos.component('k-info-panel', KytosInfoPanel);
kytos.component('k-toolbar', KytosToolbar);
kytos.component('k-toolbar-item', KytosToolbarItem);
kytos.component('k-action-menu-item', KytosActionMenuItem);
kytos.component('k-napps-info-panel', KytosNappsInfoPanel);

kytos.component('k-interface', KytosInterface);
kytos.component('k-flow', KytosFlow);

kytos.component('k-switch-radar', KytosSwitchRadar);
kytos.component('k-interface-info', KytosInterfaceInfo);

kytos.component('k-chart-timeseries', KytosChartTimeseries)
kytos.component('k-chart-radar', KytosChartRadar)

kytos.component('k-table', KytosTable)
kytos.component('k-notification', KytosNotification)

// Preserve extra whitespaces
kytos.config.compilerOptions.whitespace = 'preserve';

kytos.config.globalProperties.$kytos = kytos
kytos.config.globalProperties.$kytos_server = window.kytos_server
kytos.config.globalProperties.$kytos_server_api =  window.kytos_server_api
kytos.config.globalProperties.$kytos_version = version
kytos.config.globalProperties.$kytos.eventBus = eventBus;
kytos.config.globalProperties.$kytos.toRaw = toRaw;
kytos.config.globalProperties.$http_helpers = http_helpers;

kytos.config.globalProperties.$filters = {
  humanize_bytes(num, precision = 0, suffix = 'bps') {
    num = Number(num);
    if (isNaN(num)) {
      throw new TypeError('Expected a number');
    }

    var neg = num < 0;
    var units = ['', 'k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];

    if (neg) {
      num = -num;
    }

    if (num < 1) {
      return (neg ? '-' : '') + num + ' ' + suffix;
    }

    var exponent = Math.min(Math.floor(Math.log(num) / Math.log(1000)), units.length - 1);
    num = (num / Math.pow(1000, exponent)).toFixed(precision) * 1;
    var unit = units[exponent] + suffix;

    return (neg ? '-' : '') + num + ' ' + unit;
  }
}

kytos.mount('#app')