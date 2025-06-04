import { describe, test, expect, beforeEach, beforeAll, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useNappStore } from "@/stores/nappStore.js";

describe("Napp Store", () => {
  beforeAll(() => {
    expect(useNappStore).toBeTruthy();
  });

  beforeEach(() => {
    vi.restoreAllMocks();
    setActivePinia(createPinia());
  });

  test("Add an Icon and Tooltip", () => {
    const store = useNappStore();
    expect(store.toolbarItems).toEqual({});
    store.toolbarItems = { test1: { name: "test1" } };
    store.addIconTooltip("test1", "test2", "test3");
    expect(store.toolbarItems).toEqual({
      test1: { name: "test1", icon: "test2", tooltip: "test3" },
    });
  });

  test("Register Component", () => {
    let _this = {
      $kytos_server: "http://localhost:8181/",
      $kytos: { component: vi.fn() },
    };
    const store = useNappStore();
    store.toolbarItems = {
      test1: {
        name: "test1",
        icon: "test2",
        tooltip: "test3",
        url: "testURL1",
      },
      test4: {
        name: "test4",
        icon: "test5",
        tooltip: "test6",
        url: "testURL2",
      },
    };
    store.registerComponents(_this, store.toolbarItemsList);
    expect(_this.$kytos.component).toHaveBeenCalledTimes(2);
    expect(_this.$kytos.component.mock.calls[0]).toMatchInlineSnapshot(`
      [
        "test1",
        {
          "__asyncHydrate": [Function],
          "__asyncLoader": [Function],
          "__asyncResolved": undefined,
          "name": "AsyncComponentWrapper",
          "setup": [Function],
        },
      ]
    `);
    expect(_this.$kytos.component.mock.calls[1]).toMatchInlineSnapshot(`
      [
        "test4",
        {
          "__asyncHydrate": [Function],
          "__asyncLoader": [Function],
          "__asyncResolved": undefined,
          "name": "AsyncComponentWrapper",
          "setup": [Function],
        },
      ]
    `);
  });

  test("Get Toolbar Items List", () => {
    const store = useNappStore();
    store.toolbarItems = {
      test1: { name: "test1", icon: "test2", tooltip: "test3" },
      test4: { name: "test4", icon: "test5", tooltip: "test6" },
    };
    expect(store.toolbarItemsList).toEqual([
      { name: "test1", icon: "test2", tooltip: "test3" },
      { name: "test4", icon: "test5", tooltip: "test6" },
    ]);
  });
});
