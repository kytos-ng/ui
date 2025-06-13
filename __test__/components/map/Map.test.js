import { mount } from "@vue/test-utils";
import Map from "@/components/kytos/map/Map.vue";
import KytosTopology from '@/components/kytos/topology/Topology.vue';
import { describe, test, expect, beforeAll, afterEach, vi } from "vitest";

const mockMap = {
  Map: vi.fn(() => ({
    addControl: vi.fn(),
    on: vi.fn(),
    remove: vi.fn(),
    setStyle: vi.fn(),
    dragRotate: {
      disable: vi.fn()
    },
  })),
  NavigationControl: vi.fn(),
  accessToken: vi.fn()
}

describe("Map.vue", () => {
  let wrapper;
  beforeAll(() => {
    expect(Map).toBeTruthy();
  });

  afterEach(() => {
    wrapper.unmount();
    vi.restoreAllMocks();
  });

  describe("Props", () => {
    test("Does Map exists?", () => {
      wrapper = mount(Map, {
          global: {
            components: {
              'k-topology': KytosTopology
            },
            mocks: {
              $kytos: {eventBus: {$on: vi.fn()}},
              $mapboxgl: mockMap,
            }
          },
      });
      expect(wrapper.exists()).toBe(true);
    });
  });

  //Outputs
  describe("DOM Elements", () => {
      test("Map element", () => {
        wrapper = mount(Map, {
          global: {
            components: {
              'k-topology': KytosTopology
            },
            mocks: {
              $kytos: {eventBus: {$on: vi.fn()}},
              $mapboxgl: mockMap,
            }
          },
        });
        expect(wrapper.find('[data-test="map-container"]').exists()).toBe(true);
      });
  });
});
