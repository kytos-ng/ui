import { mount, flushPromises } from "@vue/test-utils";
import axios from "axios";
import ActionMenuItem from "@/components/kytos/napp/ActionMenuItem.vue";
import { describe, test, expect, beforeAll, afterEach, vi } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import { useNappStore } from "@/stores/nappStore.js";

const mockComponentList = {
  data: [
    {
        "name": "kytos-topology-k-action-menu-search_switch",
        "url": "ui/kytos/topology/k-action-menu/search_switch.kytos"
    }
]
};

describe("ActionMenuItem.vue", () => {
  let wrapper;
  beforeAll(() => {
    expect(ActionMenuItem).toBeTruthy();
  });

  afterEach(() => {
    wrapper.unmount();
    vi.restoreAllMocks();
  });

  //Inputs

  describe("HTTP Requests", () => {
    test("Fetch ActionMenuItem Components", async () => {
      vi.spyOn(axios, "get").mockResolvedValue(mockComponentList);
      wrapper = mount(ActionMenuItem, {
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
        "http://localhost:8181/ui/k-action-menu"
      );

      await flushPromises();

      expect(wrapper.vm.components).toEqual(mockComponentList.data);
    });

    test("HTTP Error", async () => {
      const error = new Error("Network error");
      vi.spyOn(axios, "get").mockRejectedValue(error);
      vi.spyOn(console, "error").mockImplementation(() => {});
      wrapper = mount(ActionMenuItem, {
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
        "http://localhost:8181/ui/k-action-menu"
      );

      await flushPromises();

      expect(console.error).toHaveBeenCalledTimes(1);
      expect(console.error).toHaveBeenCalledWith(error);
    });
  });

  //Outputs

  describe("DOM Elements", () => {
    test("ActionMenuItem Components", async () => {
      vi.spyOn(axios, "get").mockResolvedValue(mockComponentList);
      wrapper = mount(ActionMenuItem, {
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
            "kytos-topology-k-action-menu-search_switch": {
              template: '<div data-test="test1">Test</div>',
            }
          },
        },
      });
      expect(wrapper.exists()).toBe(true);
      const store = useNappStore();

      await flushPromises();

      const div1 = wrapper.find('[data-test="test1"]');

      expect(div1.exists()).toBe(true);
    });
  });

  describe("vue3-sfc-loader", () => {
    test("Register Components", async () => {
      vi.spyOn(axios, "get").mockResolvedValue(mockComponentList);
      wrapper = mount(ActionMenuItem, {
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