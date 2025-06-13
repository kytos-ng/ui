import { mount, flushPromises } from "@vue/test-utils";
import axios from "axios";
import Toolbar from "@/components/kytos/napp/Toolbar.vue";
import { describe, test, expect, beforeAll, afterEach, vi } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import { useNappStore } from "@/stores/nappStore.js";

const mockComponentList = {
  data: [
    {
      name: "kytos-maintenance-k-toolbar-main",
      url: "ui/kytos/maintenance/k-toolbar/main.kytos",
    },
    {
      name: "kytos-mef_eline-k-toolbar-main",
      url: "ui/kytos/mef_eline/k-toolbar/main.kytos",
    },
    {
      name: "kytos-pathfinder-k-toolbar-main",
      url: "ui/kytos/pathfinder/k-toolbar/main.kytos",
    },
    {
      name: "kytos-telemetry_int-k-toolbar-main",
      url: "ui/kytos/telemetry_int/k-toolbar/main.kytos",
    },
    {
      name: "amlight-sdntrace-k-toolbar-main",
      url: "ui/amlight/sdntrace/k-toolbar/main.kytos",
    },
    {
      name: "amlight-sdntrace_cp-k-toolbar-main",
      url: "ui/amlight/sdntrace_cp/k-toolbar/main.kytos",
    },
  ],
};

describe("Toolbar.vue", () => {
  let wrapper;
  beforeAll(() => {
    expect(Toolbar).toBeTruthy();
  });

  afterEach(() => {
    wrapper.unmount();
    vi.restoreAllMocks();
  });

  //Inputs

  describe("Props", () => {
    test("Active Toolbar Item", async () => {
      vi.spyOn(axios, "get").mockResolvedValue(mockComponentList);
      wrapper = mount(Toolbar, {
        attachTo: document.body,
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
            "kytos-maintenance-k-toolbar-main": {
              template: '<div data-test="test1">Test</div>',
            },
            "kytos-mef_eline-k-toolbar-main": {
              template: '<div data-test="test2">Test</div>',
            },
            "kytos-pathfinder-k-toolbar-main": {
              template: '<div data-test="test3">Test</div>',
            },
            "kytos-telemetry_int-k-toolbar-main": {
              template: '<div data-test="test4">Test</div>',
            },
            "amlight-sdntrace-k-toolbar-main": {
              template: '<div data-test="test5">Test</div>',
            },
            "amlight-sdntrace_cp-k-toolbar-main": {
              template: '<div data-test="test6">Test</div>',
            },
          },
        },
      });
      expect(wrapper.exists()).toBe(true);

      await flushPromises();

      const div1 = wrapper.find('[data-test="test1"]');
      const div2 = wrapper.find('[data-test="test2"]');
      const div3 = wrapper.find('[data-test="test3"]');
      const div4 = wrapper.find('[data-test="test4"]');
      const div5 = wrapper.find('[data-test="test5"]');
      const div6 = wrapper.find('[data-test="test6"]');

      expect(div1.exists()).toBe(true);
      expect(div2.exists()).toBe(true);
      expect(div3.exists()).toBe(true);
      expect(div4.exists()).toBe(true);
      expect(div5.exists()).toBe(true);
      expect(div6.exists()).toBe(true);

      expect(div1.isVisible()).toBe(true);
      expect(div2.isVisible()).toBe(false);
      expect(div3.isVisible()).toBe(false);
      expect(div4.isVisible()).toBe(false);
      expect(div5.isVisible()).toBe(false);
      expect(div6.isVisible()).toBe(false);

      await wrapper.setProps({ active: 5 });

      expect(div1.isVisible()).toBe(false);
      expect(div2.isVisible()).toBe(false);
      expect(div3.isVisible()).toBe(false);
      expect(div4.isVisible()).toBe(false);
      expect(div5.isVisible()).toBe(true);
      expect(div6.isVisible()).toBe(false);
    });
  });

  describe("HTTP Requests", () => {
    test("Fetch k-toolbar Components", async () => {
      vi.spyOn(axios, "get").mockResolvedValue(mockComponentList);
      wrapper = mount(Toolbar, {
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
        "http://localhost:8181/ui/k-toolbar"
      );

      await flushPromises();

      expect(store.toolbarItemsList).toEqual(mockComponentList.data);
    });

    test("HTTP Error", async () => {
      const error = new Error("Network error");
      vi.spyOn(axios, "get").mockRejectedValue(error);
      vi.spyOn(console, "error").mockImplementation(() => {});
      wrapper = mount(Toolbar, {
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

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        "http://localhost:8181/ui/k-toolbar"
      );

      await flushPromises();

      expect(console.error).toHaveBeenCalledTimes(1);
      expect(console.error).toHaveBeenCalledWith(error);
    });
  });

  //Outputs

  describe("DOM Elements", () => {
    test("Toolbar Components", async () => {
      vi.spyOn(axios, "get").mockResolvedValue(mockComponentList);
      wrapper = mount(Toolbar, {
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
            "kytos-maintenance-k-toolbar-main": {
              template: '<div data-test="test1">Test</div>',
            },
            "kytos-mef_eline-k-toolbar-main": {
              template: '<div data-test="test2">Test</div>',
            },
            "kytos-pathfinder-k-toolbar-main": {
              template: '<div data-test="test3">Test</div>',
            },
            "kytos-telemetry_int-k-toolbar-main": {
              template: '<div data-test="test4">Test</div>',
            },
            "amlight-sdntrace-k-toolbar-main": {
              template: '<div data-test="test5">Test</div>',
            },
            "amlight-sdntrace_cp-k-toolbar-main": {
              template: '<div data-test="test6">Test</div>',
            },
          },
        },
      });
      expect(wrapper.exists()).toBe(true);

      await flushPromises();

      const div1 = wrapper.find('[data-test="test1"]');
      const div2 = wrapper.find('[data-test="test2"]');
      const div3 = wrapper.find('[data-test="test3"]');
      const div4 = wrapper.find('[data-test="test4"]');
      const div5 = wrapper.find('[data-test="test5"]');
      const div6 = wrapper.find('[data-test="test6"]');

      expect(div1.exists()).toBe(true);
      expect(div2.exists()).toBe(true);
      expect(div3.exists()).toBe(true);
      expect(div4.exists()).toBe(true);
      expect(div5.exists()).toBe(true);
      expect(div6.exists()).toBe(true);
    });
  });

  describe("vue3-sfc-loader", () => {
    test("Register Components", async () => {
      vi.spyOn(axios, "get").mockResolvedValue(mockComponentList);
      wrapper = mount(Toolbar, {
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
