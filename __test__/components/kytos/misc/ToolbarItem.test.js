import { mount } from "@vue/test-utils";
import ToolbarItem from "@/components/kytos/misc/ToolbarItem.vue";
import { describe, test, expect, beforeAll, afterEach, vi } from "vitest";
import { createTestingPinia } from "@pinia/testing";

describe("ToolbarItem.vue", () => {
  let wrapper;
  beforeAll(() => {
    expect(ToolbarItem).toBeTruthy();
  });

  afterEach(() => {
    wrapper.unmount();
    vi.restoreAllMocks();
  });

  //Inputs

  describe("Props", () => {
    test("Mounting ToolbarItem", () => {
      const icon = "testIcon";
      const tooltip = "testTooltip";
      const name = "testName";
      const spy = vi.spyOn(ToolbarItem.methods, "addIconTooltip");
      wrapper = mount(ToolbarItem, {
        props: {
          icon: icon,
          tooltip: tooltip,
          name: name,
        },
        global: {
          plugins: [
            createTestingPinia({
              createSpy: vi.fn,
            }),
          ],
        },
      });
      expect(wrapper.exists()).toBe(true);

      expect(spy).toHaveBeenCalledOnce();
      expect(spy).toHaveBeenCalledWith(name, icon, tooltip);
    });

    test("ToolbarItem Icon", () => {
      const icon = "testIcon";
      const tooltip = "testTooltip";
      const name = "testName";
      wrapper = mount(ToolbarItem, {
        props: {
          icon: icon,
          tooltip: tooltip,
          name: name,
        },
        global: {
          plugins: [
            createTestingPinia({
              createSpy: vi.fn,
            }),
          ],
        },
      });
      expect(wrapper.exists()).toBe(true);
      const mainDiv = wrapper.get('[data-test="main-div"]');

      expect(mainDiv.attributes("icon")).toBe(icon);
    });

    test("ToolbarItem Tooltip", () => {
      const icon = "testIcon";
      const tooltip = "testTooltip";
      const name = "testName";
      wrapper = mount(ToolbarItem, {
        props: {
          icon: icon,
          tooltip: tooltip,
          name: name,
        },
        global: {
          plugins: [
            createTestingPinia({
              createSpy: vi.fn,
            }),
          ],
        },
      });
      expect(wrapper.exists()).toBe(true);
      const mainDiv = wrapper.get('[data-test="main-div"]');

      expect(mainDiv.attributes("tooltip")).toBe(tooltip);
    });
  });

  //Outputs

  describe("DOM Elements", () => {
    test("ToolbarItem", () => {
      wrapper = mount(ToolbarItem);
      expect(wrapper.exists()).toBe(true);

      expect(wrapper.find('[data-test="main-div"]').exists()).toBe(true);
    });
  });
});
