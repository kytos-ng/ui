import { mount, flushPromises } from "@vue/test-utils";
import StatusMenu from "@/components/kytos/misc/StatusMenu.vue";
import {
  describe,
  test,
  expect,
  beforeAll,
  afterEach,
  beforeEach,
  vi,
} from "vitest";
import { createTestingPinia } from "@pinia/testing";
import axios from "axios";
import { AxiosError } from "axios";
import eventBus from "@/event-bus.js";
import http_helpers from "@/helpers/http-helpers.js";
import { toRaw } from "vue";
import Button from "@/components/kytos/inputs/buttons/Button.vue";
import AccordionItem from "@/components/kytos/accordion/AccordionItem.vue";
import ToolbarItem from "@/components/kytos/misc/ToolbarItem.vue";
import AccordionItem from "@/components/kytos/accordion/AccordionItem.vue";
import ButtonGroup from "@/components/kytos/inputs/buttons/ButtonGroup.vue";
import Accordion from "@/components/kytos/accordion/Accordion.vue";

const linearTopology = {
  data: {
    topology: {
      switches: {
        "00:00:00:00:00:00:00:01": {
          id: "00:00:00:00:00:00:00:01",
          name: "00:00:00:00:00:00:00:01",
          dpid: "00:00:00:00:00:00:00:01",
          connection: "",
          ofp_version: null,
          type: "switch",
          manufacturer: "",
          serial: "",
          hardware: "",
          software: null,
          data_path: "",
          interfaces: {
            "00:00:00:00:00:00:00:01:4294967294": {
              id: "00:00:00:00:00:00:00:01:4294967294",
              name: "s1",
              port_number: 4294967294,
              mac: "56:e2:d7:0d:29:41",
              switch: "00:00:00:00:00:00:00:01",
              type: "interface",
              nni: false,
              uni: true,
              speed: 0,
              metadata: {},
              lldp: true,
              active: false,
              enabled: true,
              status: "DOWN",
              status_reason: ["deactivated"],
              link: "",
              interface_id: "00:00:00:00:00:00:00:01:4294967294",
              dpid: "00:00:00:00:00:00:00:01",
              content_switch: {
                $ref: '$["switches"]["00:00:00:00:00:00:00:01"]',
              },
            },
            "00:00:00:00:00:00:00:01:1": {
              id: "00:00:00:00:00:00:00:01:1",
              name: "s1-eth1",
              port_number: 1,
              mac: "ca:ee:cb:53:f8:86",
              switch: "00:00:00:00:00:00:00:01",
              type: "interface",
              nni: false,
              uni: true,
              speed: 1250000000,
              metadata: {},
              lldp: true,
              active: false,
              enabled: true,
              status: "DOWN",
              status_reason: ["deactivated"],
              link: "",
              interface_id: "00:00:00:00:00:00:00:01:1",
              dpid: "00:00:00:00:00:00:00:01",
              content_switch: {
                $ref: '$["switches"]["00:00:00:00:00:00:00:01"]',
              },
            },
            "00:00:00:00:00:00:00:01:2": {
              id: "00:00:00:00:00:00:00:01:2",
              name: "s1-eth2",
              port_number: 2,
              mac: "12:dc:08:f0:b5:2c",
              switch: "00:00:00:00:00:00:00:01",
              type: "interface",
              nni: true,
              uni: false,
              speed: 1250000000,
              metadata: {},
              lldp: true,
              active: false,
              enabled: true,
              status: "DOWN",
              status_reason: ["deactivated"],
              link: "cf0f4071be426b3f745027f5d22bc61f8312ae86293c9b28e7e66015607a9260",
              interface_id: "00:00:00:00:00:00:00:01:2",
              dpid: "00:00:00:00:00:00:00:01",
              content_switch: {
                $ref: '$["switches"]["00:00:00:00:00:00:00:01"]',
              },
            },
          },
          metadata: {
            lat: "0.0",
            lng: "-30.0",
          },
          active: false,
          enabled: true,
          status: "DOWN",
          status_reason: ["deactivated"],
        },
        "00:00:00:00:00:00:00:02": {
          id: "00:00:00:00:00:00:00:02",
          name: "00:00:00:00:00:00:00:02",
          dpid: "00:00:00:00:00:00:00:02",
          connection: "",
          ofp_version: null,
          type: "switch",
          manufacturer: "Nicira, Inc.",
          serial: "None",
          hardware: "Open vSwitch",
          software: "3.1.0",
          data_path: "s2",
          interfaces: {
            "00:00:00:00:00:00:00:02:4294967294": {
              id: "00:00:00:00:00:00:00:02:4294967294",
              name: "s2",
              port_number: 4294967294,
              mac: "e2:44:3b:c5:3b:4e",
              switch: "00:00:00:00:00:00:00:02",
              type: "interface",
              nni: false,
              uni: true,
              speed: 0,
              metadata: {},
              lldp: true,
              active: false,
              enabled: true,
              status: "DOWN",
              status_reason: ["deactivated"],
              link: "",
              interface_id: "00:00:00:00:00:00:00:02:4294967294",
              dpid: "00:00:00:00:00:00:00:02",
              content_switch: {
                $ref: '$["switches"]["00:00:00:00:00:00:00:02"]',
              },
            },
            "00:00:00:00:00:00:00:02:1": {
              id: "00:00:00:00:00:00:00:02:1",
              name: "s2-eth1",
              port_number: 1,
              mac: "b2:f1:6e:6c:b7:49",
              switch: "00:00:00:00:00:00:00:02",
              type: "interface",
              nni: false,
              uni: true,
              speed: 1250000000,
              metadata: {},
              lldp: true,
              active: false,
              enabled: true,
              status: "DOWN",
              status_reason: ["deactivated"],
              link: "",
              interface_id: "00:00:00:00:00:00:00:02:1",
              dpid: "00:00:00:00:00:00:00:02",
              content_switch: {
                $ref: '$["switches"]["00:00:00:00:00:00:00:02"]',
              },
            },
            "00:00:00:00:00:00:00:02:2": {
              id: "00:00:00:00:00:00:00:02:2",
              name: "s2-eth2",
              port_number: 2,
              mac: "06:ed:ff:43:ad:35",
              switch: "00:00:00:00:00:00:00:02",
              type: "interface",
              nni: true,
              uni: false,
              speed: 1250000000,
              metadata: {},
              lldp: true,
              active: false,
              enabled: true,
              status: "DOWN",
              status_reason: ["deactivated"],
              link: "cf0f4071be426b3f745027f5d22bc61f8312ae86293c9b28e7e66015607a9260",
              interface_id: "00:00:00:00:00:00:00:02:2",
              dpid: "00:00:00:00:00:00:00:02",
              content_switch: {
                $ref: '$["switches"]["00:00:00:00:00:00:00:02"]',
              },
            },
            "00:00:00:00:00:00:00:02:3": {
              id: "00:00:00:00:00:00:00:02:3",
              name: "s2-eth3",
              port_number: 3,
              mac: "22:ab:5c:35:9a:32",
              switch: "00:00:00:00:00:00:00:02",
              type: "interface",
              nni: true,
              uni: false,
              speed: 1250000000,
              metadata: {},
              lldp: true,
              active: false,
              enabled: true,
              status: "DOWN",
              status_reason: ["deactivated"],
              link: "4d42dc0852278accac7d9df15418f6d921db160b13d674029a87cef1b5f67f30",
              interface_id: "00:00:00:00:00:00:00:02:3",
              dpid: "00:00:00:00:00:00:00:02",
              content_switch: {
                $ref: '$["switches"]["00:00:00:00:00:00:00:02"]',
              },
            },
          },
          metadata: {
            lat: "0.0",
            lng: "-20.0",
          },
          active: false,
          enabled: true,
          status: "DOWN",
          status_reason: ["deactivated"],
        },
        "00:00:00:00:00:00:00:03": {
          id: "00:00:00:00:00:00:00:03",
          name: "00:00:00:00:00:00:00:03",
          dpid: "00:00:00:00:00:00:00:03",
          connection: "",
          ofp_version: null,
          type: "switch",
          manufacturer: "Nicira, Inc.",
          serial: "None",
          hardware: "Open vSwitch",
          software: "3.1.0",
          data_path: "s3",
          interfaces: {
            "00:00:00:00:00:00:00:03:4294967294": {
              id: "00:00:00:00:00:00:00:03:4294967294",
              name: "s3",
              port_number: 4294967294,
              mac: "12:cb:a7:29:21:4e",
              switch: "00:00:00:00:00:00:00:03",
              type: "interface",
              nni: false,
              uni: true,
              speed: 0,
              metadata: {},
              lldp: true,
              active: false,
              enabled: true,
              status: "DOWN",
              status_reason: ["deactivated"],
              link: "",
              interface_id: "00:00:00:00:00:00:00:03:4294967294",
              dpid: "00:00:00:00:00:00:00:03",
              content_switch: {
                $ref: '$["switches"]["00:00:00:00:00:00:00:03"]',
              },
            },
            "00:00:00:00:00:00:00:03:1": {
              id: "00:00:00:00:00:00:00:03:1",
              name: "s3-eth1",
              port_number: 1,
              mac: "26:e9:52:28:3f:50",
              switch: "00:00:00:00:00:00:00:03",
              type: "interface",
              nni: false,
              uni: true,
              speed: 1250000000,
              metadata: {},
              lldp: true,
              active: false,
              enabled: true,
              status: "DOWN",
              status_reason: ["deactivated"],
              link: "",
              interface_id: "00:00:00:00:00:00:00:03:1",
              dpid: "00:00:00:00:00:00:00:03",
              content_switch: {
                $ref: '$["switches"]["00:00:00:00:00:00:00:03"]',
              },
            },
            "00:00:00:00:00:00:00:03:2": {
              id: "00:00:00:00:00:00:00:03:2",
              name: "s3-eth2",
              port_number: 2,
              mac: "d6:d5:04:1e:f8:7c",
              switch: "00:00:00:00:00:00:00:03",
              type: "interface",
              nni: true,
              uni: false,
              speed: 1250000000,
              metadata: {},
              lldp: true,
              active: false,
              enabled: true,
              status: "DOWN",
              status_reason: ["deactivated"],
              link: "4d42dc0852278accac7d9df15418f6d921db160b13d674029a87cef1b5f67f30",
              interface_id: "00:00:00:00:00:00:00:03:2",
              dpid: "00:00:00:00:00:00:00:03",
              content_switch: {
                $ref: '$["switches"]["00:00:00:00:00:00:00:03"]',
              },
            },
          },
          metadata: {
            lat: "0.0",
            lng: "-10.0",
          },
          active: false,
          enabled: true,
          status: "DOWN",
          status_reason: ["deactivated"],
        },
      },
      links: {
        "4d42dc0852278accac7d9df15418f6d921db160b13d674029a87cef1b5f67f30": {
          id: "4d42dc0852278accac7d9df15418f6d921db160b13d674029a87cef1b5f67f30",
          endpoint_a: {
            id: "00:00:00:00:00:00:00:02:3",
            name: "s2-eth3",
            port_number: 3,
            mac: "22:ab:5c:35:9a:32",
            switch: "00:00:00:00:00:00:00:02",
            type: "interface",
            nni: true,
            uni: false,
            speed: 1250000000,
            metadata: {},
            lldp: true,
            active: false,
            enabled: true,
            status: "DOWN",
            status_reason: ["deactivated"],
            link: "4d42dc0852278accac7d9df15418f6d921db160b13d674029a87cef1b5f67f30",
          },
          endpoint_b: {
            id: "00:00:00:00:00:00:00:03:2",
            name: "s3-eth2",
            port_number: 2,
            mac: "d6:d5:04:1e:f8:7c",
            switch: "00:00:00:00:00:00:00:03",
            type: "interface",
            nni: true,
            uni: false,
            speed: 1250000000,
            metadata: {},
            lldp: true,
            active: false,
            enabled: true,
            status: "DOWN",
            status_reason: ["deactivated"],
            link: "4d42dc0852278accac7d9df15418f6d921db160b13d674029a87cef1b5f67f30",
          },
          metadata: {},
          active: false,
          enabled: true,
          status: "DOWN",
          status_reason: ["deactivated"],
        },
        cf0f4071be426b3f745027f5d22bc61f8312ae86293c9b28e7e66015607a9260: {
          id: "cf0f4071be426b3f745027f5d22bc61f8312ae86293c9b28e7e66015607a9260",
          endpoint_a: {
            id: "00:00:00:00:00:00:00:01:2",
            name: "s1-eth2",
            port_number: 2,
            mac: "12:dc:08:f0:b5:2c",
            switch: "00:00:00:00:00:00:00:01",
            type: "interface",
            nni: true,
            uni: false,
            speed: 1250000000,
            metadata: {},
            lldp: true,
            active: false,
            enabled: true,
            status: "DOWN",
            status_reason: ["deactivated"],
            link: "cf0f4071be426b3f745027f5d22bc61f8312ae86293c9b28e7e66015607a9260",
          },
          endpoint_b: {
            id: "00:00:00:00:00:00:00:02:2",
            name: "s2-eth2",
            port_number: 2,
            mac: "06:ed:ff:43:ad:35",
            switch: "00:00:00:00:00:00:00:02",
            type: "interface",
            nni: true,
            uni: false,
            speed: 1250000000,
            metadata: {},
            lldp: true,
            active: false,
            enabled: true,
            status: "DOWN",
            status_reason: ["deactivated"],
            link: "cf0f4071be426b3f745027f5d22bc61f8312ae86293c9b28e7e66015607a9260",
          },
          metadata: {},
          active: false,
          enabled: true,
          status: "DOWN",
          status_reason: ["deactivated"],
        },
      },
    },
  },
};

describe("StatusMenu.vue", () => {
  let wrapper;
  beforeAll(() => {
    expect(StatusMenu).toBeTruthy();
  });

  beforeEach(async () => {
    vi.spyOn(axios, "get").mockResolvedValue(linearTopology);
    vi.spyOn(Storage.prototype, "getItem");
    vi.spyOn(Storage.prototype, "setItem");
    wrapper = mount(StatusMenu, {
      attachTo: document.body,
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
        mocks: {
          $kytos: { eventBus: eventBus, toRaw: toRaw },
          $http: axios,
          $http_helpers: http_helpers,
          $kytos_server_api: "http://localhost:8181/api/",
        },
        components: {
          "k-button": Button,
          "k-button-group": ButtonGroup,
          "k-accordion-item": AccordionItem,
          "k-accordion": Accordion,
          "k-toolbar-item": ToolbarItem,
        },
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });
    expect(wrapper.exists()).toBe(true);

    await flushPromises();
  });

  afterEach(() => {
    wrapper.unmount();
    vi.restoreAllMocks();
    localStorage.clear();
  });

  //Inputs

  describe("User Interactions", () => {
    test("Click on switch to get Switch Details", async () => {
      vi.spyOn(eventBus, "$emit");

      const switchRow = wrapper.get('[data-test="switchRow_0"]');

      await switchRow.trigger("click");

      expect(eventBus.$emit).toHaveBeenCalledTimes(1);
      expect(eventBus.$emit.mock.calls[0][0]).toBe("showInfoPanel");
      expect(eventBus.$emit.mock.calls[0][1]).toMatchSnapshot();
    });

    test("Click on link to get Link Details", async () => {
      vi.spyOn(eventBus, "$emit");

      const linkRow = wrapper.get('[data-test="linkRow_0"]');

      await linkRow.trigger("click");

      expect(eventBus.$emit).toHaveBeenCalledTimes(1);
      expect(eventBus.$emit.mock.calls[0][0]).toBe("showInfoPanel");
      expect(eventBus.$emit.mock.calls[0][1]).toMatchSnapshot();
    });

    test("Click on interface to get Interface Details", async () => {
      vi.spyOn(eventBus, "$emit");

      const interfaceRow = wrapper.get('[data-test="interfaceRow_0"]');

      await interfaceRow.trigger("click");

      expect(eventBus.$emit).toHaveBeenCalledTimes(1);
      expect(eventBus.$emit.mock.calls[0][0]).toBe("showInfoPanel");
      expect(eventBus.$emit.mock.calls[0][1]).toMatchSnapshot();
    });

    test("Filter Switch Name", async () => {
      const switchName_Filter = wrapper.get('[data-test="switchName_Filter"]');
      let row1, row2, row3, rows;
      [row1, row2, row3] = rows = wrapper.findAll("[data-test^=switchRow]");

      expect(rows).toHaveLength(3);
      expect(row1.exists()).toBe(true);
      expect(row2.exists()).toBe(true);
      expect(row3.exists()).toBe(true);

      await switchName_Filter.setValue("0");

      [row1, row2, row3] = rows = wrapper.findAll("[data-test^=switchRow]");

      expect(rows).toHaveLength(3);
      expect(row1.exists()).toBe(true);
      expect(row2.exists()).toBe(true);
      expect(row3.exists()).toBe(true);

      await switchName_Filter.setValue("00:00:00:00:00:00:00:02");

      [row1] = rows = wrapper.findAll("[data-test^=switchRow]");

      expect(rows).toHaveLength(1);
      expect(row1.exists()).toBe(true);
      expect(row1.html()).toContain("00:00:00:00:00:00:00:02");

      await switchName_Filter.setValue("");

      [row1, row2, row3] = rows = wrapper.findAll("[data-test^=switchRow]");

      expect(rows).toHaveLength(3);
      expect(row1.exists()).toBe(true);
      expect(row2.exists()).toBe(true);
      expect(row3.exists()).toBe(true);
    });

    test("Filter Switch Status", async () => {
      const switchStatus_Filter = wrapper.get(
        '[data-test="switchStatus_Filter"]'
      );
      let row1, row2, row3, rows;
      [row1, row2, row3] = rows = wrapper.findAll("[data-test^=switchRow]");

      expect(rows).toHaveLength(3);
      expect(row1.exists()).toBe(true);
      expect(row2.exists()).toBe(true);
      expect(row3.exists()).toBe(true);

      await switchStatus_Filter.setValue("UP");

      rows = wrapper.findAll("[data-test^=switchRow]");

      expect(rows.length).toBe(0);

      await switchStatus_Filter.setValue("DOWN");

      [row1, row2, row3] = rows = wrapper.findAll("[data-test^=switchRow]");

      expect(rows).toHaveLength(3);
      expect(row1.exists()).toBe(true);
      expect(row2.exists()).toBe(true);
      expect(row3.exists()).toBe(true);

      await switchStatus_Filter.setValue("DO");

      [row1, row2, row3] = rows = wrapper.findAll("[data-test^=switchRow]");

      expect(rows).toHaveLength(3);
      expect(row1.exists()).toBe(true);
      expect(row2.exists()).toBe(true);
      expect(row3.exists()).toBe(true);

      await switchStatus_Filter.setValue("");

      [row1, row2, row3] = rows = wrapper.findAll("[data-test^=switchRow]");

      expect(rows).toHaveLength(3);
      expect(row1.exists()).toBe(true);
      expect(row2.exists()).toBe(true);
      expect(row3.exists()).toBe(true);
    });

    test("Filter Switch Reason", async () => {
      const switchReason_Filter = wrapper.get(
        '[data-test="switchReason_Filter"]'
      );
      let row1, row2, row3, rows;
      [row1, row2, row3] = rows = wrapper.findAll("[data-test^=switchRow]");

      expect(rows).toHaveLength(3);
      expect(row1.exists()).toBe(true);
      expect(row2.exists()).toBe(true);
      expect(row3.exists()).toBe(true);

      await switchReason_Filter.setValue("Something");

      rows = wrapper.findAll("[data-test^=switchRow]");

      expect(rows.length).toBe(0);

      await switchReason_Filter.setValue("N/A");

      [row1, row2, row3] = rows = wrapper.findAll("[data-test^=switchRow]");

      expect(rows).toHaveLength(3);
      expect(row1.exists()).toBe(true);
      expect(row2.exists()).toBe(true);
      expect(row3.exists()).toBe(true);

      await switchReason_Filter.setValue("N/");

      [row1, row2, row3] = rows = wrapper.findAll("[data-test^=switchRow]");

      expect(rows).toHaveLength(3);
      expect(row1.exists()).toBe(true);
      expect(row2.exists()).toBe(true);
      expect(row3.exists()).toBe(true);

      await switchReason_Filter.setValue("");

      [row1, row2, row3] = rows = wrapper.findAll("[data-test^=switchRow]");

      expect(rows).toHaveLength(3);
      expect(row1.exists()).toBe(true);
      expect(row2.exists()).toBe(true);
      expect(row3.exists()).toBe(true);
    });

    test("Filter Switch Enabled", async () => {
      const switchEnabled_Filter = wrapper.get(
        '[data-test="switchEnabled_Filter"]'
      );
      let row1, row2, row3, rows;
      [row1, row2, row3] = rows = wrapper.findAll("[data-test^=switchRow]");

      expect(rows).toHaveLength(3);
      expect(row1.exists()).toBe(true);
      expect(row2.exists()).toBe(true);
      expect(row3.exists()).toBe(true);

      await switchEnabled_Filter.setValue("false");

      rows = wrapper.findAll("[data-test^=switchRow]");

      expect(rows.length).toBe(0);

      await switchEnabled_Filter.setValue("true");

      [row1, row2, row3] = rows = wrapper.findAll("[data-test^=switchRow]");

      expect(rows).toHaveLength(3);
      expect(row1.exists()).toBe(true);
      expect(row2.exists()).toBe(true);
      expect(row3.exists()).toBe(true);

      await switchEnabled_Filter.setValue("tr");

      [row1, row2, row3] = rows = wrapper.findAll("[data-test^=switchRow]");

      expect(rows).toHaveLength(3);
      expect(row1.exists()).toBe(true);
      expect(row2.exists()).toBe(true);
      expect(row3.exists()).toBe(true);

      await switchEnabled_Filter.setValue("");

      [row1, row2, row3] = rows = wrapper.findAll("[data-test^=switchRow]");

      expect(rows).toHaveLength(3);
      expect(row1.exists()).toBe(true);
      expect(row2.exists()).toBe(true);
      expect(row3.exists()).toBe(true);
    });

    test("Filter Switch Active", async () => {
      const switchActive_Filter = wrapper.get(
        '[data-test="switchActive_Filter"]'
      );
      let row1, row2, row3, rows;
      [row1, row2, row3] = rows = wrapper.findAll("[data-test^=switchRow]");

      expect(rows).toHaveLength(3);
      expect(row1.exists()).toBe(true);
      expect(row2.exists()).toBe(true);
      expect(row3.exists()).toBe(true);

      await switchActive_Filter.setValue("true");

      rows = wrapper.findAll("[data-test^=switchRow]");

      expect(rows.length).toBe(0);

      await switchActive_Filter.setValue("false");

      [row1, row2, row3] = rows = wrapper.findAll("[data-test^=switchRow]");

      expect(rows).toHaveLength(3);
      expect(row1.exists()).toBe(true);
      expect(row2.exists()).toBe(true);
      expect(row3.exists()).toBe(true);

      await switchActive_Filter.setValue("fa");

      [row1, row2, row3] = rows = wrapper.findAll("[data-test^=switchRow]");

      expect(rows).toHaveLength(3);
      expect(row1.exists()).toBe(true);
      expect(row2.exists()).toBe(true);
      expect(row3.exists()).toBe(true);

      await switchActive_Filter.setValue("");

      [row1, row2, row3] = rows = wrapper.findAll("[data-test^=switchRow]");

      expect(rows).toHaveLength(3);
      expect(row1.exists()).toBe(true);
      expect(row2.exists()).toBe(true);
      expect(row3.exists()).toBe(true);
    });

    test("Filter Link Name", async () => {
      const linkName_Filter = wrapper.get('[data-test="linkName_Filter"]');
      let row1, row2, rows;
      [row1, row2] = rows = wrapper.findAll("[data-test^=linkRow]");

      expect(rows).toHaveLength(2);
      expect(row1.exists()).toBe(true);
      expect(row2.exists()).toBe(true);

      await linkName_Filter.setValue("0");

      [row1, row2] = rows = wrapper.findAll("[data-test^=linkRow]");

      expect(rows).toHaveLength(2);
      expect(row1.exists()).toBe(true);
      expect(row2.exists()).toBe(true);

      await linkName_Filter.setValue(
        "4d42dc0852278accac7d9df15418f6d921db160b13d674029a87cef1b5f67f30"
      );

      [row1] = rows = wrapper.findAll("[data-test^=linkRow]");

      expect(rows).toHaveLength(1);
      expect(row1.exists()).toBe(true);
      expect(row1.html()).toContain(
        "4d42dc0852278accac7d9df15418f6d921db160b13d674029a87cef1b5f67f30"
      );

      await linkName_Filter.setValue("");

      [row1, row2] = rows = wrapper.findAll("[data-test^=linkRow]");

      expect(rows).toHaveLength(2);
      expect(row1.exists()).toBe(true);
      expect(row2.exists()).toBe(true);
    });

    test("Filter Link Status", async () => {
      const linkStatus_Filter = wrapper.get('[data-test="linkStatus_Filter"]');
      let row1, row2, rows;
      [row1, row2] = rows = wrapper.findAll("[data-test^=linkRow]");

      expect(rows).toHaveLength(2);
      expect(row1.exists()).toBe(true);
      expect(row2.exists()).toBe(true);

      await linkStatus_Filter.setValue("UP");

      rows = wrapper.findAll("[data-test^=linkRow]");

      expect(rows.length).toBe(0);

      await linkStatus_Filter.setValue("DOWN");

      [row1, row2] = rows = wrapper.findAll("[data-test^=linkRow]");

      expect(rows).toHaveLength(2);
      expect(row1.exists()).toBe(true);
      expect(row2.exists()).toBe(true);

      await linkStatus_Filter.setValue("DO");

      [row1, row2] = rows = wrapper.findAll("[data-test^=linkRow]");

      expect(rows).toHaveLength(2);
      expect(row1.exists()).toBe(true);
      expect(row2.exists()).toBe(true);

      await linkStatus_Filter.setValue("");

      [row1, row2] = rows = wrapper.findAll("[data-test^=linkRow]");

      expect(rows).toHaveLength(2);
      expect(row1.exists()).toBe(true);
      expect(row2.exists()).toBe(true);
    });

    test("Filter Link Reason", async () => {
      const linkReason_Filter = wrapper.get('[data-test="linkReason_Filter"]');
      let row1, row2, rows;
      [row1, row2] = rows = wrapper.findAll("[data-test^=linkRow]");

      expect(rows).toHaveLength(2);
      expect(row1.exists()).toBe(true);
      expect(row2.exists()).toBe(true);

      await linkReason_Filter.setValue("Something");

      rows = wrapper.findAll("[data-test^=linkRow]");

      expect(rows.length).toBe(0);

      await linkReason_Filter.setValue("N/A");

      [row1, row2] = rows = wrapper.findAll("[data-test^=linkRow]");

      expect(rows).toHaveLength(2);
      expect(row1.exists()).toBe(true);
      expect(row2.exists()).toBe(true);

      await linkReason_Filter.setValue("N/");

      [row1, row2] = rows = wrapper.findAll("[data-test^=linkRow]");

      expect(rows).toHaveLength(2);
      expect(row1.exists()).toBe(true);
      expect(row2.exists()).toBe(true);

      await linkReason_Filter.setValue("");

      [row1, row2] = rows = wrapper.findAll("[data-test^=linkRow]");

      expect(rows).toHaveLength(2);
      expect(row1.exists()).toBe(true);
      expect(row2.exists()).toBe(true);
    });

    test("Filter Link Enabled", async () => {
      const linkEnabled_Filter = wrapper.get(
        '[data-test="linkEnabled_Filter"]'
      );
      let row1, row2, rows;
      [row1, row2] = rows = wrapper.findAll("[data-test^=linkRow]");

      expect(rows).toHaveLength(2);
      expect(row1.exists()).toBe(true);
      expect(row2.exists()).toBe(true);

      await linkEnabled_Filter.setValue("false");

      rows = wrapper.findAll("[data-test^=linkRow]");

      expect(rows.length).toBe(0);

      await linkEnabled_Filter.setValue("true");

      [row1, row2] = rows = wrapper.findAll("[data-test^=linkRow]");

      expect(rows).toHaveLength(2);
      expect(row1.exists()).toBe(true);
      expect(row2.exists()).toBe(true);

      await linkEnabled_Filter.setValue("tr");

      [row1, row2] = rows = wrapper.findAll("[data-test^=linkRow]");

      expect(rows).toHaveLength(2);
      expect(row1.exists()).toBe(true);
      expect(row2.exists()).toBe(true);

      await linkEnabled_Filter.setValue("");

      [row1, row2] = rows = wrapper.findAll("[data-test^=linkRow]");

      expect(rows).toHaveLength(2);
      expect(row1.exists()).toBe(true);
      expect(row2.exists()).toBe(true);
    });

    test("Filter Link Active", async () => {
      const linkActive_Filter = wrapper.get('[data-test="linkActive_Filter"]');
      let row1, row2, rows;
      [row1, row2] = rows = wrapper.findAll("[data-test^=linkRow]");

      expect(rows).toHaveLength(2);
      expect(row1.exists()).toBe(true);
      expect(row2.exists()).toBe(true);

      await linkActive_Filter.setValue("true");

      rows = wrapper.findAll("[data-test^=linkRow]");

      expect(rows.length).toBe(0);

      await linkActive_Filter.setValue("false");

      [row1, row2] = rows = wrapper.findAll("[data-test^=linkRow]");

      expect(rows).toHaveLength(2);
      expect(row1.exists()).toBe(true);
      expect(row2.exists()).toBe(true);

      await linkActive_Filter.setValue("fa");

      [row1, row2] = rows = wrapper.findAll("[data-test^=linkRow]");

      expect(rows).toHaveLength(2);
      expect(row1.exists()).toBe(true);
      expect(row2.exists()).toBe(true);

      await linkActive_Filter.setValue("");

      [row1, row2] = rows = wrapper.findAll("[data-test^=linkRow]");

      expect(rows).toHaveLength(2);
      expect(row1.exists()).toBe(true);
      expect(row2.exists()).toBe(true);
    });

    test("Filter Interfaces Switch/Node", async () => {
      const interfaceNode_Filter = wrapper.get(
        '[data-test="interfaceNode_Filter"]'
      );
      let row1, row2, row3, row4, row5, row6, row7, row8, row9, row10, rows;
      [row1, row2, row3, row4, row5, row6, row7, row8, row9, row10] = rows =
        wrapper.findAll("[data-test^=interfaceRow]");

      expect(rows).toHaveLength(10);
      expect(row1.exists()).toBe(true);
      expect(row2.exists()).toBe(true);
      expect(row3.exists()).toBe(true);
      expect(row4.exists()).toBe(true);
      expect(row5.exists()).toBe(true);
      expect(row6.exists()).toBe(true);
      expect(row7.exists()).toBe(true);
      expect(row8.exists()).toBe(true);
      expect(row9.exists()).toBe(true);
      expect(row10.exists()).toBe(true);

      await interfaceNode_Filter.setValue("00");

      [row1, row2, row3, row4, row5, row6, row7, row8, row9, row10] = rows =
        wrapper.findAll("[data-test^=interfaceRow]");

      expect(rows).toHaveLength(10);
      expect(row1.exists()).toBe(true);
      expect(row2.exists()).toBe(true);
      expect(row3.exists()).toBe(true);
      expect(row4.exists()).toBe(true);
      expect(row5.exists()).toBe(true);
      expect(row6.exists()).toBe(true);
      expect(row7.exists()).toBe(true);
      expect(row8.exists()).toBe(true);
      expect(row9.exists()).toBe(true);
      expect(row10.exists()).toBe(true);

      await interfaceNode_Filter.setValue("00:00:00:00:00:00:00:02");

      [row1, row2, row3, row4] = rows = wrapper.findAll(
        "[data-test^=interfaceRow]"
      );

      expect(rows).toHaveLength(4);
      expect(row1.exists()).toBe(true);
      expect(row2.exists()).toBe(true);
      expect(row3.exists()).toBe(true);
      expect(row4.exists()).toBe(true);
      expect(row1.html()).toContain("00:00:00:00:00:00:00:02");
      expect(row2.html()).toContain("00:00:00:00:00:00:00:02");
      expect(row3.html()).toContain("00:00:00:00:00:00:00:02");
      expect(row4.html()).toContain("00:00:00:00:00:00:00:02");

      await interfaceNode_Filter.setValue("");

      [row1, row2, row3, row4, row5, row6, row7, row8, row9, row10] = rows =
        wrapper.findAll("[data-test^=interfaceRow]");

      expect(rows).toHaveLength(10);
      expect(row1.exists()).toBe(true);
      expect(row2.exists()).toBe(true);
      expect(row3.exists()).toBe(true);
      expect(row4.exists()).toBe(true);
      expect(row5.exists()).toBe(true);
      expect(row6.exists()).toBe(true);
      expect(row7.exists()).toBe(true);
      expect(row8.exists()).toBe(true);
      expect(row9.exists()).toBe(true);
      expect(row10.exists()).toBe(true);
    });

    test("Filter Interfaces Port", async () => {
      const interfacePort_Filter = wrapper.get(
        '[data-test="interfacePort_Filter"]'
      );
      let row1, row2, row3, row4, row5, row6, row7, row8, row9, row10, rows;
      [row1, row2, row3, row4, row5, row6, row7, row8, row9, row10] = rows =
        wrapper.findAll("[data-test^=interfaceRow]");

      expect(rows).toHaveLength(10);
      expect(row1.exists()).toBe(true);
      expect(row2.exists()).toBe(true);
      expect(row3.exists()).toBe(true);
      expect(row4.exists()).toBe(true);
      expect(row5.exists()).toBe(true);
      expect(row6.exists()).toBe(true);
      expect(row7.exists()).toBe(true);
      expect(row8.exists()).toBe(true);
      expect(row9.exists()).toBe(true);
      expect(row10.exists()).toBe(true);

      await interfacePort_Filter.setValue("s");

      [row1, row2, row3, row4, row5, row6, row7, row8, row9, row10] = rows =
        wrapper.findAll("[data-test^=interfaceRow]");

      expect(rows).toHaveLength(10);
      expect(row1.exists()).toBe(true);
      expect(row2.exists()).toBe(true);
      expect(row3.exists()).toBe(true);
      expect(row4.exists()).toBe(true);
      expect(row5.exists()).toBe(true);
      expect(row6.exists()).toBe(true);
      expect(row7.exists()).toBe(true);
      expect(row8.exists()).toBe(true);
      expect(row9.exists()).toBe(true);
      expect(row10.exists()).toBe(true);

      await interfacePort_Filter.setValue("s1");

      [row1, row2, row3] = rows = wrapper.findAll("[data-test^=interfaceRow]");

      expect(rows).toHaveLength(3);
      expect(row1.exists()).toBe(true);
      expect(row1.html()).toContain("s1");
      expect(row2.exists()).toBe(true);
      expect(row2.html()).toContain("s1-eth1");
      expect(row3.exists()).toBe(true);
      expect(row3.html()).toContain("s1-eth2");

      await interfacePort_Filter.setValue("");

      [row1, row2, row3, row4, row5, row6, row7, row8, row9, row10] = rows =
        wrapper.findAll("[data-test^=interfaceRow]");

      expect(rows).toHaveLength(10);
      expect(row1.exists()).toBe(true);
      expect(row2.exists()).toBe(true);
      expect(row3.exists()).toBe(true);
      expect(row4.exists()).toBe(true);
      expect(row5.exists()).toBe(true);
      expect(row6.exists()).toBe(true);
      expect(row7.exists()).toBe(true);
      expect(row8.exists()).toBe(true);
      expect(row9.exists()).toBe(true);
      expect(row10.exists()).toBe(true);
    });

    test("Filter Interfaces Status", async () => {
      const interfaceStatus_Filter = wrapper.get(
        '[data-test="interfaceStatus_Filter"]'
      );
      let row1, row2, row3, row4, row5, row6, row7, row8, row9, row10, rows;
      [row1, row2, row3, row4, row5, row6, row7, row8, row9, row10] = rows =
        wrapper.findAll("[data-test^=interfaceRow]");

      expect(rows).toHaveLength(10);
      expect(row1.exists()).toBe(true);
      expect(row2.exists()).toBe(true);
      expect(row3.exists()).toBe(true);
      expect(row4.exists()).toBe(true);
      expect(row5.exists()).toBe(true);
      expect(row6.exists()).toBe(true);
      expect(row7.exists()).toBe(true);
      expect(row8.exists()).toBe(true);
      expect(row9.exists()).toBe(true);
      expect(row10.exists()).toBe(true);

      await interfaceStatus_Filter.setValue("UP");

      rows = wrapper.findAll("[data-test^=interfaceRow]");

      expect(rows.length).toBe(0);

      await interfaceStatus_Filter.setValue("DOWN");

      [row1, row2, row3, row4, row5, row6, row7, row8, row9, row10] = rows =
        wrapper.findAll("[data-test^=interfaceRow]");

      expect(rows).toHaveLength(10);
      expect(row1.exists()).toBe(true);
      expect(row2.exists()).toBe(true);
      expect(row3.exists()).toBe(true);
      expect(row4.exists()).toBe(true);
      expect(row5.exists()).toBe(true);
      expect(row6.exists()).toBe(true);
      expect(row7.exists()).toBe(true);
      expect(row8.exists()).toBe(true);
      expect(row9.exists()).toBe(true);
      expect(row10.exists()).toBe(true);

      await interfaceStatus_Filter.setValue("DO");

      [row1, row2, row3, row4, row5, row6, row7, row8, row9, row10] = rows =
        wrapper.findAll("[data-test^=interfaceRow]");

      expect(rows).toHaveLength(10);
      expect(row1.exists()).toBe(true);
      expect(row2.exists()).toBe(true);
      expect(row3.exists()).toBe(true);
      expect(row4.exists()).toBe(true);
      expect(row5.exists()).toBe(true);
      expect(row6.exists()).toBe(true);
      expect(row7.exists()).toBe(true);
      expect(row8.exists()).toBe(true);
      expect(row9.exists()).toBe(true);
      expect(row10.exists()).toBe(true);

      await interfaceStatus_Filter.setValue("");

      [row1, row2, row3, row4, row5, row6, row7, row8, row9, row10] = rows =
        wrapper.findAll("[data-test^=interfaceRow]");

      expect(rows).toHaveLength(10);
      expect(row1.exists()).toBe(true);
      expect(row2.exists()).toBe(true);
      expect(row3.exists()).toBe(true);
      expect(row4.exists()).toBe(true);
      expect(row5.exists()).toBe(true);
      expect(row6.exists()).toBe(true);
      expect(row7.exists()).toBe(true);
      expect(row8.exists()).toBe(true);
      expect(row9.exists()).toBe(true);
      expect(row10.exists()).toBe(true);
    });

    test("Filter Interfaces Reason", async () => {
      const interfaceReason_Filter = wrapper.get(
        '[data-test="interfaceReason_Filter"]'
      );
      let row1, row2, row3, row4, row5, row6, row7, row8, row9, row10, rows;
      [row1, row2, row3, row4, row5, row6, row7, row8, row9, row10] = rows =
        wrapper.findAll("[data-test^=interfaceRow]");

      expect(rows).toHaveLength(10);
      expect(row1.exists()).toBe(true);
      expect(row2.exists()).toBe(true);
      expect(row3.exists()).toBe(true);
      expect(row4.exists()).toBe(true);
      expect(row5.exists()).toBe(true);
      expect(row6.exists()).toBe(true);
      expect(row7.exists()).toBe(true);
      expect(row8.exists()).toBe(true);
      expect(row9.exists()).toBe(true);
      expect(row10.exists()).toBe(true);

      await interfaceReason_Filter.setValue("Something");

      rows = wrapper.findAll("[data-test^=interfaceRow]");

      expect(rows.length).toBe(0);

      await interfaceReason_Filter.setValue("N/A");

      [row1, row2, row3, row4, row5, row6, row7, row8, row9, row10] = rows =
        wrapper.findAll("[data-test^=interfaceRow]");

      expect(rows).toHaveLength(10);
      expect(row1.exists()).toBe(true);
      expect(row2.exists()).toBe(true);
      expect(row3.exists()).toBe(true);
      expect(row4.exists()).toBe(true);
      expect(row5.exists()).toBe(true);
      expect(row6.exists()).toBe(true);
      expect(row7.exists()).toBe(true);
      expect(row8.exists()).toBe(true);
      expect(row9.exists()).toBe(true);
      expect(row10.exists()).toBe(true);

      await interfaceReason_Filter.setValue("N/");

      [row1, row2, row3, row4, row5, row6, row7, row8, row9, row10] = rows =
        wrapper.findAll("[data-test^=interfaceRow]");

      expect(rows).toHaveLength(10);
      expect(row1.exists()).toBe(true);
      expect(row2.exists()).toBe(true);
      expect(row3.exists()).toBe(true);
      expect(row4.exists()).toBe(true);
      expect(row5.exists()).toBe(true);
      expect(row6.exists()).toBe(true);
      expect(row7.exists()).toBe(true);
      expect(row8.exists()).toBe(true);
      expect(row9.exists()).toBe(true);
      expect(row10.exists()).toBe(true);

      await interfaceReason_Filter.setValue("");

      [row1, row2, row3, row4, row5, row6, row7, row8, row9, row10] = rows =
        wrapper.findAll("[data-test^=interfaceRow]");

      expect(rows).toHaveLength(10);
      expect(row1.exists()).toBe(true);
      expect(row2.exists()).toBe(true);
      expect(row3.exists()).toBe(true);
      expect(row4.exists()).toBe(true);
      expect(row5.exists()).toBe(true);
      expect(row6.exists()).toBe(true);
      expect(row7.exists()).toBe(true);
      expect(row8.exists()).toBe(true);
      expect(row9.exists()).toBe(true);
      expect(row10.exists()).toBe(true);
    });

    test("Filter Interfaces Enabled", async () => {
      const interfaceEnabled_Filter = wrapper.get(
        '[data-test="interfaceEnabled_Filter"]'
      );
      let row1, row2, row3, row4, row5, row6, row7, row8, row9, row10, rows;
      [row1, row2, row3, row4, row5, row6, row7, row8, row9, row10] = rows =
        wrapper.findAll("[data-test^=interfaceRow]");

      expect(rows).toHaveLength(10);
      expect(row1.exists()).toBe(true);
      expect(row2.exists()).toBe(true);
      expect(row3.exists()).toBe(true);
      expect(row4.exists()).toBe(true);
      expect(row5.exists()).toBe(true);
      expect(row6.exists()).toBe(true);
      expect(row7.exists()).toBe(true);
      expect(row8.exists()).toBe(true);
      expect(row9.exists()).toBe(true);
      expect(row10.exists()).toBe(true);

      await interfaceEnabled_Filter.setValue("false");

      rows = wrapper.findAll("[data-test^=interfaceRow]");

      expect(rows.length).toBe(0);

      await interfaceEnabled_Filter.setValue("true");

      [row1, row2, row3, row4, row5, row6, row7, row8, row9, row10] = rows =
        wrapper.findAll("[data-test^=interfaceRow]");

      expect(rows).toHaveLength(10);
      expect(row1.exists()).toBe(true);
      expect(row2.exists()).toBe(true);
      expect(row3.exists()).toBe(true);
      expect(row4.exists()).toBe(true);
      expect(row5.exists()).toBe(true);
      expect(row6.exists()).toBe(true);
      expect(row7.exists()).toBe(true);
      expect(row8.exists()).toBe(true);
      expect(row9.exists()).toBe(true);
      expect(row10.exists()).toBe(true);

      await interfaceEnabled_Filter.setValue("tr");

      [row1, row2, row3, row4, row5, row6, row7, row8, row9, row10] = rows =
        wrapper.findAll("[data-test^=interfaceRow]");

      expect(rows).toHaveLength(10);
      expect(row1.exists()).toBe(true);
      expect(row2.exists()).toBe(true);
      expect(row3.exists()).toBe(true);
      expect(row4.exists()).toBe(true);
      expect(row5.exists()).toBe(true);
      expect(row6.exists()).toBe(true);
      expect(row7.exists()).toBe(true);
      expect(row8.exists()).toBe(true);
      expect(row9.exists()).toBe(true);
      expect(row10.exists()).toBe(true);

      await interfaceEnabled_Filter.setValue("");

      [row1, row2, row3, row4, row5, row6, row7, row8, row9, row10] = rows =
        wrapper.findAll("[data-test^=interfaceRow]");

      expect(rows).toHaveLength(10);
      expect(row1.exists()).toBe(true);
      expect(row2.exists()).toBe(true);
      expect(row3.exists()).toBe(true);
      expect(row4.exists()).toBe(true);
      expect(row5.exists()).toBe(true);
      expect(row6.exists()).toBe(true);
      expect(row7.exists()).toBe(true);
      expect(row8.exists()).toBe(true);
      expect(row9.exists()).toBe(true);
      expect(row10.exists()).toBe(true);
    });

    test("Filter Interfaces Active", async () => {
      const interfaceActive_Filter = wrapper.get(
        '[data-test="interfaceActive_Filter"]'
      );
      let row1, row2, row3, row4, row5, row6, row7, row8, row9, row10, rows;
      [row1, row2, row3, row4, row5, row6, row7, row8, row9, row10] = rows =
        wrapper.findAll("[data-test^=interfaceRow]");

      expect(rows).toHaveLength(10);
      expect(row1.exists()).toBe(true);
      expect(row2.exists()).toBe(true);
      expect(row3.exists()).toBe(true);
      expect(row4.exists()).toBe(true);
      expect(row5.exists()).toBe(true);
      expect(row6.exists()).toBe(true);
      expect(row7.exists()).toBe(true);
      expect(row8.exists()).toBe(true);
      expect(row9.exists()).toBe(true);
      expect(row10.exists()).toBe(true);

      await interfaceActive_Filter.setValue("true");

      rows = wrapper.findAll("[data-test^=interfaceRow]");

      expect(rows.length).toBe(0);

      await interfaceActive_Filter.setValue("false");

      [row1, row2, row3, row4, row5, row6, row7, row8, row9, row10] = rows =
        wrapper.findAll("[data-test^=interfaceRow]");

      expect(rows).toHaveLength(10);
      expect(row1.exists()).toBe(true);
      expect(row2.exists()).toBe(true);
      expect(row3.exists()).toBe(true);
      expect(row4.exists()).toBe(true);
      expect(row5.exists()).toBe(true);
      expect(row6.exists()).toBe(true);
      expect(row7.exists()).toBe(true);
      expect(row8.exists()).toBe(true);
      expect(row9.exists()).toBe(true);
      expect(row10.exists()).toBe(true);

      await interfaceActive_Filter.setValue("fa");

      [row1, row2, row3, row4, row5, row6, row7, row8, row9, row10] = rows =
        wrapper.findAll("[data-test^=interfaceRow]");

      expect(rows).toHaveLength(10);
      expect(row1.exists()).toBe(true);
      expect(row2.exists()).toBe(true);
      expect(row3.exists()).toBe(true);
      expect(row4.exists()).toBe(true);
      expect(row5.exists()).toBe(true);
      expect(row6.exists()).toBe(true);
      expect(row7.exists()).toBe(true);
      expect(row8.exists()).toBe(true);
      expect(row9.exists()).toBe(true);
      expect(row10.exists()).toBe(true);

      await interfaceActive_Filter.setValue("");

      [row1, row2, row3, row4, row5, row6, row7, row8, row9, row10] = rows =
        wrapper.findAll("[data-test^=interfaceRow]");

      expect(rows).toHaveLength(10);
      expect(row1.exists()).toBe(true);
      expect(row2.exists()).toBe(true);
      expect(row3.exists()).toBe(true);
      expect(row4.exists()).toBe(true);
      expect(row5.exists()).toBe(true);
      expect(row6.exists()).toBe(true);
      expect(row7.exists()).toBe(true);
      expect(row8.exists()).toBe(true);
      expect(row9.exists()).toBe(true);
      expect(row10.exists()).toBe(true);
    });

    test("Collapse Accordion Refresh", async () => {
      const refresh_accordion = wrapper.get('[data-test="refresh_accordion"]');
      const checkbox = refresh_accordion.get('input[type="checkbox"]');
      const div = refresh_accordion.get("div");

      expect(div.isVisible()).toBe(true);

      await checkbox.setChecked(false);

      expect(div.isVisible()).toBe(false);

      await checkbox.setChecked(true);

      expect(div.isVisible()).toBe(true);
    });

    test("Collapse Accordion Tables", async () => {
      const tables_accordion = wrapper.get('[data-test="tables_accordion"]');
      const checkbox = tables_accordion.get('input[type="checkbox"]');
      const div = tables_accordion.get("div");

      expect(div.isVisible()).toBe(true);

      await checkbox.setChecked(false);

      expect(div.isVisible()).toBe(false);

      await checkbox.setChecked(true);

      expect(div.isVisible()).toBe(true);
    });

    test("Collapse Accordion Switches", async () => {
      const switches_accordion = wrapper.get(
        '[data-test="switches_accordion"]'
      );
      const checkbox = switches_accordion.get('input[type="checkbox"]');
      const div = switches_accordion.get("div");

      expect(div.isVisible()).toBe(true);

      await checkbox.setChecked(false);

      expect(div.isVisible()).toBe(false);

      await checkbox.setChecked(true);

      expect(div.isVisible()).toBe(true);
    });

    test("Collapse Accordion Switches Filters", async () => {
      const switchfilters_accordion = wrapper.get(
        '[data-test="switchfilters_accordion"]'
      );
      const checkbox = switchfilters_accordion.get('input[type="checkbox"]');
      const div = switchfilters_accordion.get("div");

      expect(div.isVisible()).toBe(true);

      await checkbox.setChecked(false);

      expect(div.isVisible()).toBe(false);

      await checkbox.setChecked(true);

      expect(div.isVisible()).toBe(true);
    });

    test("Collapse Accordion Links", async () => {
      const links_accordion = wrapper.get('[data-test="links_accordion"]');
      const checkbox = links_accordion.get('input[type="checkbox"]');
      const div = links_accordion.get("div");

      expect(div.isVisible()).toBe(true);

      await checkbox.setChecked(false);

      expect(div.isVisible()).toBe(false);

      await checkbox.setChecked(true);

      expect(div.isVisible()).toBe(true);
    });

    test("Collapse Accordion Links Filters", async () => {
      const linkfilters_accordion = wrapper.get(
        '[data-test="linkfilters_accordion"]'
      );
      const checkbox = linkfilters_accordion.get('input[type="checkbox"]');
      const div = linkfilters_accordion.get("div");

      expect(div.isVisible()).toBe(true);

      await checkbox.setChecked(false);

      expect(div.isVisible()).toBe(false);

      await checkbox.setChecked(true);

      expect(div.isVisible()).toBe(true);
    });

    test("Collapse Accordion Interfaces", async () => {
      const interfaces_accordion = wrapper.get(
        '[data-test="interfaces_accordion"]'
      );
      const checkbox = interfaces_accordion.get('input[type="checkbox"]');
      const div = interfaces_accordion.get("div");

      expect(div.isVisible()).toBe(true);

      await checkbox.setChecked(false);

      expect(div.isVisible()).toBe(false);

      await checkbox.setChecked(true);

      expect(div.isVisible()).toBe(true);
    });

    test("Collapse Accordion Interfaces Filters", async () => {
      const interfacefilters_accordion = wrapper.get(
        '[data-test="interfacefilters_accordion"]'
      );
      const checkbox = interfacefilters_accordion.get('input[type="checkbox"]');
      const div = interfacefilters_accordion.get("div");

      expect(div.isVisible()).toBe(true);

      await checkbox.setChecked(false);

      expect(div.isVisible()).toBe(false);

      await checkbox.setChecked(true);

      expect(div.isVisible()).toBe(true);
    });

    test("Select/Deselect Switch", async () => {
      const row1 = wrapper.get("[data-test^=switchRow]");
      const checkbox = row1.getComponent(Button);

      expect(wrapper.vm.selectedSwitches).toEqual([]);

      await checkbox.trigger("click");

      expect(wrapper.vm.selectedSwitches).toMatchSnapshot();

      await checkbox.trigger("click");

      expect(wrapper.vm.selectedSwitches).toEqual([]);
    });

    test("Select/Deselect Link", async () => {
      const row1 = wrapper.get("[data-test^=linkRow]");
      const checkbox = row1.getComponent(Button);

      expect(wrapper.vm.selectedLinks).toEqual([]);

      await checkbox.trigger("click");

      expect(wrapper.vm.selectedLinks).toMatchSnapshot();

      await checkbox.trigger("click");

      expect(wrapper.vm.selectedLinks).toEqual([]);
    });

    test("Select/Deselect Interface", async () => {
      const row1 = wrapper.get("[data-test^=interfaceRow]");
      const checkbox = row1.getComponent(Button);

      expect(wrapper.vm.selectedInterfaces).toEqual([]);

      await checkbox.trigger("click");

      expect(wrapper.vm.selectedInterfaces).toMatchSnapshot();

      await checkbox.trigger("click");

      expect(wrapper.vm.selectedInterfaces).toEqual([]);
    });

    test("Show All and Selected Switch", async () => {
      const switch_table = wrapper.get("[data-test=switch_table]");
      const switch_all = wrapper.get("[data-test=switch_all]");
      const switch_selected = wrapper.get("[data-test=switch_selected]");

      expect(switch_table.html()).toMatchSnapshot();

      await switch_selected.trigger("click");

      expect(switch_table.html()).toMatchSnapshot();

      await switch_all.trigger("click");

      expect(switch_table.html()).toMatchSnapshot();

      const row1 = wrapper.get("[data-test^=switchRow]");
      const checkbox = row1.getComponent(Button);

      expect(wrapper.vm.selectedSwitches).toEqual([]);

      await checkbox.trigger("click");

      expect(wrapper.vm.selectedSwitches).toMatchSnapshot();

      await switch_selected.trigger("click");

      expect(switch_table.html()).toMatchSnapshot();
    });

    test("Show All and Selected Link", async () => {
      const link_table = wrapper.get("[data-test=link_table]");
      const link_all = wrapper.get("[data-test=link_all]");
      const link_selected = wrapper.get("[data-test=link_selected]");

      expect(link_table.html()).toMatchSnapshot();

      await link_selected.trigger("click");

      expect(link_table.html()).toMatchSnapshot();

      await link_all.trigger("click");

      expect(link_table.html()).toMatchSnapshot();

      const row1 = wrapper.get("[data-test^=linkRow]");
      const checkbox = row1.getComponent(Button);

      expect(wrapper.vm.selectedLinks).toEqual([]);

      await checkbox.trigger("click");

      expect(wrapper.vm.selectedLinks).toMatchSnapshot();

      await link_selected.trigger("click");

      expect(link_table.html()).toMatchSnapshot();
    });

    test("Show All and Selected Interface", async () => {
      const interface_table = wrapper.get("[data-test=interface_table]");
      const interface_all = wrapper.get("[data-test=interface_all]");
      const interface_selected = wrapper.get("[data-test=interface_selected]");

      expect(interface_table.html()).toMatchSnapshot();

      await interface_selected.trigger("click");

      expect(interface_table.html()).toMatchSnapshot();

      await interface_all.trigger("click");

      expect(interface_table.html()).toMatchSnapshot();

      const row1 = wrapper.get("[data-test^=interfaceRow]");
      const checkbox = row1.getComponent(Button);

      expect(wrapper.vm.selectedInterfaces).toEqual([]);

      await checkbox.trigger("click");

      expect(wrapper.vm.selectedInterfaces).toMatchSnapshot();

      await interface_selected.trigger("click");

      expect(interface_table.html()).toMatchSnapshot();
    });

    test("Refresh Data", async () => {
      expect(axios.get).toHaveBeenCalledOnce();
      expect(axios.get).toHaveBeenLastCalledWith(
        "http://localhost:8181/api/kytos/topology/v3"
      );

      const refresh_button = wrapper.get("[data-test=refresh_button]");

      await refresh_button.trigger("click");

      expect(axios.get).toHaveBeenCalledTimes(2);
      expect(axios.get).toHaveBeenLastCalledWith(
        "http://localhost:8181/api/kytos/topology/v3"
      );
    });
  });

  describe("Data Streams", () => {
    test("HTTP Get Request", async () => {
      expect(axios.get).toHaveBeenCalledOnce();
      expect(axios.get).toHaveBeenCalledWith(
        "http://localhost:8181/api/kytos/topology/v3"
      );
      expect(wrapper.vm.switches).toMatchSnapshot();
    });

    test("HTTP Get Request Failure", async () => {
      const mockAxiosError = new AxiosError("Not Found", null, null, null, {
        status: 404,
        statusText: "Not Found",
        data: { error: "Resource not found" },
        headers: {},
        config: {},
      });

      vi.spyOn(axios, "get").mockRejectedValue(mockAxiosError);

      wrapper = mount(StatusMenu, {
        global: {
          plugins: [
            createTestingPinia({
              createSpy: vi.fn,
            }),
          ],
          mocks: {
            $kytos: { eventBus: eventBus, toRaw: toRaw },
            $http: axios,
            $http_helpers: http_helpers,
            $kytos_server_api: "http://localhost:8181/api/",
          },
          components: {
            "k-button": Button,
            "k-button-group": ButtonGroup,
            "k-accordion-item": AccordionItem,
            "k-accordion": Accordion,
            "k-toolbar-item": ToolbarItem,
          },
          stubs: {
            FontAwesomeIcon: true,
          },
        },
      });
      expect(wrapper.exists()).toBe(true);

      await flushPromises();

      expect(axios.get).toHaveBeenCalledOnce();
      await expect(axios.get.mock.results[0].value).rejects.toThrowError(
        mockAxiosError
      );
    });
  });

  //Outputs

  describe("DOM Elements", () => {
    test("StatusMenu", async () => {
      expect(wrapper.find('[data-test="main-statusmenu"]').exists()).toBe(true);
    });

    test("Switch Table", async () => {
      const switch_table = wrapper.find('[data-test="switch_table"]');

      expect(switch_table.exists()).toBe(true);

      expect(switch_table.html()).toMatchSnapshot();
    });

    test("Link Table", async () => {
      const link_table = wrapper.find('[data-test="link_table"]');

      expect(link_table.exists()).toBe(true);

      expect(link_table.html()).toMatchSnapshot();
    });

    test("Interface Table", async () => {
      const interface_table = wrapper.find('[data-test="interface_table"]');

      expect(interface_table.exists()).toBe(true);

      expect(interface_table.html()).toMatchSnapshot();
    });

    test("Refresh Button", async () => {
      const refresh_button = wrapper.find('[data-test="refresh_button"]');

      expect(refresh_button.exists()).toBe(true);
    });

    test("Switch Show All Button", async () => {
      const switch_all = wrapper.find('[data-test="switch_all"]');

      expect(switch_all.exists()).toBe(true);
    });

    test("Switch Show Selected Button", async () => {
      const switch_selected = wrapper.find('[data-test="switch_selected"]');

      expect(switch_selected.exists()).toBe(true);
    });

    test("Link Show All Button", async () => {
      const link_all = wrapper.find('[data-test="link_all"]');

      expect(link_all.exists()).toBe(true);
    });

    test("Link Show Selected Button", async () => {
      const link_selected = wrapper.find('[data-test="link_selected"]');

      expect(link_selected.exists()).toBe(true);
    });

    test("Interface Show All Button", async () => {
      const interface_all = wrapper.find('[data-test="interface_all"]');

      expect(interface_all.exists()).toBe(true);
    });

    test("Interface Show Selected Button", async () => {
      const interface_selected = wrapper.find(
        '[data-test="interface_selected"]'
      );

      expect(interface_selected.exists()).toBe(true);
    });

    test("Status Colors", async () => {
      expect(wrapper.vm.statusColor({ enabled: false })).toBe("darkWhite");
      expect(
        wrapper.vm.statusColor({
          enabled: true,
          status_reason: ["test1", "maintenance", "test2"],
        })
      ).toBe("yellow");
      expect(
        wrapper.vm.statusColor({
          enabled: true,
          status_reason: [],
          status: "UP",
        })
      ).toBe("green");
      expect(
        wrapper.vm.statusColor({
          enabled: true,
          status_reason: [],
          status: "DOWN",
        })
      ).toBe("red");
    });

    test("Checked Squares", async () => {
      let row = wrapper.get("[data-test^=switchRow]");
      let checkbox = row.getComponent(Button);

      expect(checkbox.props("icon")).toBe("square");

      await checkbox.trigger("click");

      expect(checkbox.props("icon")).toBe("check-square");

      row = wrapper.get("[data-test^=linkRow]");
      checkbox = row.getComponent(Button);

      expect(checkbox.props("icon")).toBe("square");

      await checkbox.trigger("click");

      expect(checkbox.props("icon")).toBe("check-square");

      row = wrapper.get("[data-test^=interfaceRow]");
      checkbox = row.getComponent(Button);

      expect(checkbox.props("icon")).toBe("square");

      await checkbox.trigger("click");

      expect(checkbox.props("icon")).toBe("check-square");
    });
  });

  describe("Emits", () => {
    test("Show Info Panel for Switch", async () => {
      vi.spyOn(eventBus, "$emit");

      const switchRow = wrapper.get('[data-test="switchRow_0"]');

      await switchRow.trigger("click");

      expect(eventBus.$emit).toHaveBeenCalledTimes(1);
      expect(eventBus.$emit.mock.calls[0][0]).toBe("showInfoPanel");
    });

    test("Show Info Panel for Link", async () => {
      vi.spyOn(eventBus, "$emit");

      const linkRow = wrapper.get('[data-test="linkRow_0"]');

      await linkRow.trigger("click");

      expect(eventBus.$emit).toHaveBeenCalledTimes(1);
      expect(eventBus.$emit.mock.calls[0][0]).toBe("showInfoPanel");
    });

    test("Show Info Panel for Interface", async () => {
      vi.spyOn(eventBus, "$emit");

      const interfaceRow = wrapper.get('[data-test="interfaceRow_0"]');

      await interfaceRow.trigger("click");

      expect(eventBus.$emit).toHaveBeenCalledTimes(1);
      expect(eventBus.$emit.mock.calls[0][0]).toBe("showInfoPanel");
    });
  });

  describe("Side Effects", () => {
    test("Local Storage", async () => {
      expect(Storage.prototype.getItem).toHaveBeenCalledTimes(9);
      expect(Storage.prototype.getItem).nthCalledWith(
        1,
        "kytos/ui/switchTextFilter"
      );
      expect(Storage.prototype.getItem).nthCalledWith(
        2,
        "kytos/ui/linkTextFilter"
      );
      expect(Storage.prototype.getItem).nthCalledWith(
        3,
        "kytos/ui/interfaceTextFilter"
      );
      expect(Storage.prototype.getItem).nthCalledWith(
        4,
        "kytos/ui/currentSwitchData"
      );
      expect(Storage.prototype.getItem).nthCalledWith(
        5,
        "kytos/ui/currentLinkData"
      );
      expect(Storage.prototype.getItem).nthCalledWith(
        6,
        "kytos/ui/currentInterfaceData"
      );
      expect(Storage.prototype.getItem).nthCalledWith(
        7,
        "kytos/ui/selectedSwitches"
      );
      expect(Storage.prototype.getItem).nthCalledWith(
        8,
        "kytos/ui/selectedLinks"
      );
      expect(Storage.prototype.getItem).nthCalledWith(
        9,
        "kytos/ui/selectedInterfaces"
      );

      expect(Storage.prototype.setItem).toHaveBeenCalledTimes(0);

      const switchRow = wrapper.get('[data-test="switchRow_0"]');
      const checkbox = switchRow.getComponent(Button);

      await checkbox.trigger("click");

      expect(Storage.prototype.setItem).toHaveBeenCalledOnce();
      expect(Storage.prototype.setItem).toHaveBeenCalledWith(
        "kytos/ui/selectedSwitches",
        '[{"name":"00:00:00:00:00:00:00:01","status":"DOWN","status_reason":"N/A","enabled":true,"active":false,"dpid":"00:00:00:00:00:00:00:01"}]'
      );
    });
  });
});
