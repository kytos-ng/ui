import { mount, flushPromises } from "@vue/test-utils";
import Menubar from "@/components/kytos/misc/Menubar.vue";
import { describe, test, expect, beforeAll, afterEach, vi } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import { useNappStore } from "@/stores/nappStore.js";
import eventBus from "@/event-bus.js";

const mockComponentList = {
  data: {
    "mapbox-settings": {
      name: "mapbox-settings",
      icon: "desktop",
      tooltip: "MapBox Settings",
    },
    "k-status-menu": {
      name: "k-status-menu",
      icon: "signal",
      tooltip: "Status Menu",
    },
    "kytos-maintenance-k-toolbar-main": {
      name: "kytos-maintenance-k-toolbar-main",
      url: "ui/kytos/maintenance/k-toolbar/main.kytos",
      icon: "gear",
      tooltip: "Maintenace",
    },
    "kytos-mef_eline-k-toolbar-main": {
      name: "kytos-mef_eline-k-toolbar-main",
      url: "ui/kytos/mef_eline/k-toolbar/main.kytos",
      icon: "link",
      tooltip: "Mef-Eline",
    },
    "kytos-pathfinder-k-toolbar-main": {
      name: "kytos-pathfinder-k-toolbar-main",
      url: "ui/kytos/pathfinder/k-toolbar/main.kytos",
      icon: "compass",
      tooltip: "Napp Pathfinder",
    },
    "kytos-telemetry_int-k-toolbar-main": {
      name: "kytos-telemetry_int-k-toolbar-main",
      url: "ui/kytos/telemetry_int/k-toolbar/main.kytos",
      icon: "chart-line",
      tooltip: "Telemetry INT",
    },
    "amlight-sdntrace-k-toolbar-main": {
      name: "amlight-sdntrace-k-toolbar-main",
      url: "ui/amlight/sdntrace/k-toolbar/main.kytos",
      icon: "map-marker",
      tooltip: "Napp sdntrace",
    },
    "amlight-sdntrace_cp-k-toolbar-main": {
      name: "amlight-sdntrace_cp-k-toolbar-main",
      url: "ui/amlight/sdntrace_cp/k-toolbar/main.kytos",
      icon: "search-location",
      tooltip: "Napp sdntrace_cp",
    },
  },
};

describe("Menubar.vue", () => {
  let wrapper;
  beforeAll(() => {
    expect(Menubar).toBeTruthy();
  });

  afterEach(() => {
    wrapper.unmount();
    vi.restoreAllMocks();
  });

  //Inputs

  describe("Props", () => {
    test("Toggle and Compacted Menubar", async () => {
      const fn = vi.fn();
      wrapper = mount(Menubar, {
        props: {
          compacted: false,
          toggle: fn,
        },
        global: {
          plugins: [
            createTestingPinia({
              createSpy: vi.fn,
              initialState: {
                toolbar: { toolbarItems: mockComponentList.data },
              },
            }),
          ],
        },
      });
      expect(wrapper.exists()).toBe(true);

      const div = wrapper.find('[data-test="logo"]');
      expect(div.exists()).toBe(true);

      await div.trigger("click");

      await wrapper.setProps({ compacted: true });

      expect(fn).toHaveBeenCalledTimes(1);

      expect(wrapper.props("compacted")).toBe(true);
    });
  });

  describe("User Interactions", () => {
    test("Click on Menubar Buttons", async () => {
      const text = "hideInfoPanel";
      vi.spyOn(eventBus, "$emit");
      wrapper = mount(Menubar, {
        props: {
          compacted: false,
        },
        global: {
          plugins: [
            createTestingPinia({
              createSpy: vi.fn,
              initialState: {
                toolbar: { toolbarItems: mockComponentList.data },
              },
            }),
          ],
          mocks: {
            $kytos: {
              eventBus: eventBus,
            },
          },
        },
      });
      expect(wrapper.exists()).toBe(true);

      const store = useNappStore();

      store.toolbarItems["mapbox-settings"] = {
        name: "mapbox-settings",
        icon: "desktop",
        tooltip: "MapBox Settings",
      };
      store.toolbarItems["k-status-menu"] = {
        name: "k-status-menu",
        icon: "signal",
        tooltip: "Status Menu",
      };

      const button2 = wrapper.find(
        '[tooltip="' + store.toolbarItemsList[1].tooltip + '"]'
      );

      expect(button2.exists()).toBe(true);

      await button2.trigger("click");

      expect(eventBus.$emit).toHaveBeenCalledTimes(1);
      expect(eventBus.$emit).toHaveBeenCalledWith(text);

      expect(button2.attributes("class")).toBe("active");

      const button5 = wrapper.find(
        '[tooltip="' + store.toolbarItemsList[4].tooltip + '"]'
      );

      expect(button5.exists()).toBe(true);

      await button5.trigger("click");

      expect(eventBus.$emit).toHaveBeenCalledTimes(2);
      expect(eventBus.$emit).toHaveBeenCalledWith(text);

      expect(button5.attributes("class")).toBe("active");
    });
  });

  //Outputs

  describe("DOM Elements", () => {
    test("Menubar Buttons", () => {
      wrapper = mount(Menubar, {
        props: {
          compacted: false,
        },
        global: {
          plugins: [
            createTestingPinia({
              createSpy: vi.fn,
              initialState: {
                toolbar: { toolbarItems: mockComponentList.data },
              },
            }),
          ],
        },
      });
      expect(wrapper.exists()).toBe(true);

      const store = useNappStore();

      store.toolbarItems["mapbox-settings"] = {
        name: "mapbox-settings",
        icon: "desktop",
        tooltip: "MapBox Settings",
      };
      store.toolbarItems["k-status-menu"] = {
        name: "k-status-menu",
        icon: "signal",
        tooltip: "Status Menu",
      };

      const button1 = wrapper.find(
        '[tooltip="' + store.toolbarItemsList[0].tooltip + '"]'
      );
      const button2 = wrapper.find(
        '[tooltip="' + store.toolbarItemsList[1].tooltip + '"]'
      );
      const button3 = wrapper.find(
        '[tooltip="' + store.toolbarItemsList[2].tooltip + '"]'
      );
      const button4 = wrapper.find(
        '[tooltip="' + store.toolbarItemsList[3].tooltip + '"]'
      );
      const button5 = wrapper.find(
        '[tooltip="' + store.toolbarItemsList[4].tooltip + '"]'
      );
      const button6 = wrapper.find(
        '[tooltip="' + store.toolbarItemsList[5].tooltip + '"]'
      );

      expect(button1.exists()).toBe(true);
      expect(button2.exists()).toBe(true);
      expect(button3.exists()).toBe(true);
      expect(button4.exists()).toBe(true);
      expect(button5.exists()).toBe(true);
      expect(button6.exists()).toBe(true);
    });
  });

  describe("Emits", () => {
    test("Emit hideInfoPanel", async () => {
      const text = "hideInfoPanel";
      vi.spyOn(eventBus, "$emit");
      wrapper = mount(Menubar, {
        props: {
          compacted: false,
        },
        global: {
          plugins: [
            createTestingPinia({
              createSpy: vi.fn,
              initialState: {
                toolbar: { toolbarItems: mockComponentList.data },
              },
            }),
          ],
          mocks: {
            $kytos: {
              eventBus: eventBus,
            },
          },
        },
      });
      expect(wrapper.exists()).toBe(true);

      const store = useNappStore();

      store.toolbarItems["mapbox-settings"] = {
        name: "mapbox-settings",
        icon: "desktop",
        tooltip: "MapBox Settings",
      };
      store.toolbarItems["k-status-menu"] = {
        name: "k-status-menu",
        icon: "signal",
        tooltip: "Status Menu",
      };

      const button1 = wrapper.find(
        '[tooltip="' + store.toolbarItemsList[0].tooltip + '"]'
      );

      expect(button1.exists()).toBe(true);

      await button1.trigger("click");

      expect(eventBus.$emit).toHaveBeenCalledTimes(1);
      expect(eventBus.$emit).toHaveBeenCalledWith(text);
    });
  });
});
