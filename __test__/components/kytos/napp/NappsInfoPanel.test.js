import { mount, flushPromises } from "@vue/test-utils";
import axios from "axios";
import NappsInfoPanel from "@/components/kytos/napp/NappsInfoPanel.vue";
import { describe, test, expect, beforeAll, afterEach, vi } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import { useNappStore } from "@/stores/nappStore.js";

const mockComponentList = {
  data: [
    {
      name: "kytos-topology-k-info-panel-link_info",
      url: "ui/kytos/topology/k-info-panel/link_info.kytos",
    },
    {
      name: "kytos-topology-k-info-panel-switch_info",
      url: "ui/kytos/topology/k-info-panel/switch_info.kytos",
    },
    {
      name: "kytos-maintenance-k-info-panel-edit_window",
      url: "ui/kytos/maintenance/k-info-panel/edit_window.kytos",
    },
    {
      name: "kytos-maintenance-k-info-panel-list_maintenance",
      url: "ui/kytos/maintenance/k-info-panel/list_maintenance.kytos",
    },
    {
      name: "kytos-mef_eline-k-info-panel-list_connections",
      url: "ui/kytos/mef_eline/k-info-panel/list_connections.kytos",
    },
    {
      name: "kytos-mef_eline-k-info-panel-show_circuit",
      url: "ui/kytos/mef_eline/k-info-panel/show_circuit.kytos",
    },
    {
      name: "kytos-pathfinder-k-info-panel-best_path",
      url: "ui/kytos/pathfinder/k-info-panel/best_path.kytos",
    },
    {
      name: "kytos-telemetry_int-k-info-panel-show_telemetry_int_data",
      url: "ui/kytos/telemetry_int/k-info-panel/show_telemetry_int_data.kytos",
    },
    {
      name: "kytos-telemetry_int-k-info-panel-list_proxy_ports",
      url: "ui/kytos/telemetry_int/k-info-panel/list_proxy_ports.kytos",
    },
    {
      name: "amlight-sdntrace-k-info-panel-show_all_traces",
      url: "ui/amlight/sdntrace/k-info-panel/show_all_traces.kytos",
    },
    {
      name: "amlight-sdntrace-k-info-panel-show_trace_results",
      url: "ui/amlight/sdntrace/k-info-panel/show_trace_results.kytos",
    },
    {
      name: "amlight-sdntrace_cp-k-info-panel-show_trace_results",
      url: "ui/amlight/sdntrace_cp/k-info-panel/show_trace_results.kytos",
    },
  ],
};

describe("NappsInfoPanel.vue", () => {
  let wrapper;
  beforeAll(() => {
    expect(NappsInfoPanel).toBeTruthy();
  });

  afterEach(() => {
    wrapper.unmount();
    vi.restoreAllMocks();
  });

  //Inputs

  describe("HTTP Requests", () => {
    test("Fetch NappsInfoPanel Components", async () => {
      vi.spyOn(axios, "get").mockResolvedValue(mockComponentList);
      wrapper = mount(NappsInfoPanel, {
        props: {
          active: 1,
        },
        global: {
          plugins: [
            createTestingPinia({
              createSpy: vi.fn,
            }),
          ],
          mocks: {
            $kytos_server: "http://localhost:8181/",
            $http: axios,
          },
        },
      });
      expect(wrapper.exists()).toBe(true);
      const store = useNappStore();

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        "http://localhost:8181/ui/k-info-panel"
      );

      await flushPromises();

      expect(wrapper.vm.components).toEqual(mockComponentList.data);
    });

    test("HTTP Error", async () => {
      const error = new Error("Network error");
      vi.spyOn(axios, "get").mockRejectedValue(error);
      vi.spyOn(console, "error").mockImplementation(() => {});
      wrapper = mount(NappsInfoPanel, {
        props: {
          active: 1,
        },
        global: {
          plugins: [
            createTestingPinia({
              createSpy: vi.fn,
            }),
          ],
          mocks: {
            $kytos_server: "http://localhost:8181/",
            $http: axios,
          },
        },
      });
      expect(wrapper.exists()).toBe(true);
      const store = useNappStore();

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        "http://localhost:8181/ui/k-info-panel"
      );

      await flushPromises();

      expect(console.error).toHaveBeenCalledTimes(1);
      expect(console.error).toHaveBeenCalledWith(error);
    });
  });

  //Outputs

  describe("DOM Elements", () => {
    test("NappsInfoPanel Components", async () => {
      vi.spyOn(axios, "get").mockResolvedValue(mockComponentList);
      wrapper = mount(NappsInfoPanel, {
        props: {
          active: 1,
        },
        global: {
          plugins: [
            createTestingPinia({
              createSpy: vi.fn,
            }),
          ],
          mocks: {
            $kytos_server: "http://localhost:8181/",
            $http: axios,
          },
          stubs: {
            "kytos-topology-k-info-panel-link_info": {
              template: '<div data-test="test1">Test</div>',
            },
            "kytos-topology-k-info-panel-switch_info": {
              template: '<div data-test="test2">Test</div>',
            },
            "kytos-maintenance-k-info-panel-edit_window": {
              template: '<div data-test="test3">Test</div>',
            },
            "kytos-maintenance-k-info-panel-list_maintenance": {
              template: '<div data-test="test4">Test</div>',
            },
            "kytos-mef_eline-k-info-panel-list_connections": {
              template: '<div data-test="test5">Test</div>',
            },
            "kytos-mef_eline-k-info-panel-show_circuit": {
              template: '<div data-test="test6">Test</div>',
            },
            "kytos-pathfinder-k-info-panel-best_path": {
              template: '<div data-test="test7">Test</div>',
            },
            "kytos-telemetry_int-k-info-panel-show_telemetry_int_data": {
              template: '<div data-test="test8">Test</div>',
            },
            "kytos-telemetry_int-k-info-panel-list_proxy_ports": {
              template: '<div data-test="test9">Test</div>',
            },
            "amlight-sdntrace-k-info-panel-show_all_traces": {
              template: '<div data-test="test10">Test</div>',
            },
            "amlight-sdntrace-k-info-panel-show_trace_results": {
              template: '<div data-test="test11">Test</div>',
            },
            "amlight-sdntrace_cp-k-info-panel-show_trace_results": {
              template: '<div data-test="test12">Test</div>',
            },
          },
        },
      });
      expect(wrapper.exists()).toBe(true);
      const store = useNappStore();

      await flushPromises();

      const div1 = wrapper.find('[data-test="test1"]');
      const div2 = wrapper.find('[data-test="test2"]');
      const div3 = wrapper.find('[data-test="test3"]');
      const div4 = wrapper.find('[data-test="test4"]');
      const div5 = wrapper.find('[data-test="test5"]');
      const div6 = wrapper.find('[data-test="test6"]');
      const div7 = wrapper.find('[data-test="test7"]');
      const div8 = wrapper.find('[data-test="test8"]');
      const div9 = wrapper.find('[data-test="test9"]');
      const div10 = wrapper.find('[data-test="test10"]');
      const div11 = wrapper.find('[data-test="test11"]');
      const div12 = wrapper.find('[data-test="test12"]');

      expect(div1.exists()).toBe(true);
      expect(div2.exists()).toBe(true);
      expect(div3.exists()).toBe(true);
      expect(div4.exists()).toBe(true);
      expect(div5.exists()).toBe(true);
      expect(div6.exists()).toBe(true);
      expect(div7.exists()).toBe(true);
      expect(div8.exists()).toBe(true);
      expect(div9.exists()).toBe(true);
      expect(div10.exists()).toBe(true);
      expect(div11.exists()).toBe(true);
      expect(div12.exists()).toBe(true);
    });
  });

  describe("vue3-sfc-loader", () => {
    test("Register Components", async () => {
      vi.spyOn(axios, "get").mockResolvedValue(mockComponentList);
      wrapper = mount(NappsInfoPanel, {
        props: {
          active: 1,
        },
        global: {
          plugins: [
            createTestingPinia({
              createSpy: vi.fn,
            }),
          ],
          mocks: {
            $kytos_server: "http://localhost:8181/",
            $http: axios,
          },
        },
      });
      expect(wrapper.exists()).toBe(true);
      const store = useNappStore();

      await flushPromises();

      expect(store.registerComponents).toHaveBeenCalledTimes(1);
      expect(store.registerComponents.mock.calls[0][1]).toEqual(
        mockComponentList.data
      );
    });
  });
});
