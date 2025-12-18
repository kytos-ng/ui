import { defineStore } from 'pinia';
import http_helpers from '../helpers/http-helpers';

export const useInterfaceStore = defineStore('interfaceData', {
    state: () => ({
        _this: null,
        kytos_server_api: location.protocol + '//' + location.host + '/api/',
        switches: [],
        links: [],
        interfaces: {},
        table_link_body: {},
        interfaceChartData: {},
        pollingInterval: null
    }),
    actions: {
        updateData() {
            this.fetchTopology();
            Object.entries(this.interfaces).forEach(([id, stored_interfaces]) => {
                Object.entries(stored_interfaces).forEach(
                    ([interface_id, stored_interface]) => {
                        this.fetchInterface(stored_interface);
                    }
                );
            });
        },
        async fetchTopology() {
            try {
                const response = await this._this.$http.get(
                    this.kytos_server_api + 'kytos/topology/v3/'
                );
                this.links = response.data['topology']['links'];
                this.switches = Object.keys(response.data['topology']['switches']);
                this.switches.forEach((id) => {
                    this.interfaces[id] =
                        response.data['topology']['switches'][id]['interfaces'];
                });
                this.table_link_body = [];
                var id = '';
                for (const [switch_id, interfaces] of Object.entries(this.interfaces)) {
                    for (let k_interface in interfaces) {
                        id = this.interfaces[switch_id][k_interface].link;
                        if (id != '') {
                            this.table_link_body[switch_id] = [];
                            this.table_link_body[switch_id].push(this.links[id]);
                        }
                    }
                }
            } catch (err) {
                http_helpers.post_error(this._this, err, 'Could not reach links data');
            }
        },
        async fetchInterface(stored_interface) {
            try {
                let url = this.kytos_server_api + 'amlight/kytos_stats/v1/port/stats';
                let complete_url =
                    url +
                    `?dpid=${stored_interface.switch}&port=${Number(stored_interface.port_number)}`;
                const response = await this._this.$http.get(complete_url);
                if (!response) {
                    var msg = 'Error while trying to fetch interface data.';
                    this._this.$kytos.eventBus.$emit('statusMessage', msg, true);
                } else {
                    response.data[stored_interface.switch][
                        stored_interface.port_number
                    ].timestamp = new Date();
                    if (!this.interfaceChartData[stored_interface.switch]) {
                        this.interfaceChartData[stored_interface.switch] = {};
                    }
                    if (
                        !this.interfaceChartData[stored_interface.switch][
                            stored_interface.port_number
                        ]
                    ) {
                        this.interfaceChartData[stored_interface.switch][
                            stored_interface.port_number
                        ] = [];
                    }
                    this.interfaceChartData[stored_interface.switch][
                        stored_interface.port_number
                    ].push(
                        response.data[stored_interface.switch][
                            stored_interface.port_number
                        ]
                    );
                    if (
                        this.interfaceChartData[stored_interface.switch][
                            stored_interface.port_number
                        ].length > 15
                    ) {
                        this.interfaceChartData[stored_interface.switch][
                            stored_interface.port_number
                        ].shift();
                    }
                }
            } catch (err) {
                http_helpers.post_error(
                    this._this,
                    err,
                    'Could not retrieve interface stats'
                );
            }
        },
        startPolling(_this) {
            this._this = _this;
            if (this.pollingInterval) clearInterval(this.pollingInterval);

            this.updateData();
            this.pollingInterval = setInterval(() => {
                this.updateData();
            }, 50000);
        },
        stopPolling() {
            if (this.pollingInterval) {
                clearInterval(this.pollingInterval);
                this.pollingInterval = null;
            }
        }
    }
});
