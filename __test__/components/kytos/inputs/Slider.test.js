import { mount, shallowMount, nextTick } from '@vue/test-utils';
import Slider from '@/components/kytos/inputs/Slider.vue';
import { describe, test, expect, beforeAll, afterEach, vi } from "vitest";

describe("Slider.vue", () => {
    let wrapper;
    beforeAll(() => {
        expect(Slider).toBeTruthy();
    });

    afterEach(() => {
        wrapper.unmount();
        vi.restoreAllMocks();
    });

    //Inputs

    describe("Props", () => {
        test("Default Slider Value", () => {
            const testValue = 10;
            wrapper = mount(Slider, {
                props: {
                    initialValue: testValue
                }
            });
            expect(wrapper.exists()).toBe(true);
            const mainSlider = wrapper.get('[data-test="main-slider"]');

            expect(mainSlider.element.value).toBe(`${testValue}`);
        });

        test("Slider Minimum", async () => {
            const testMin = 10;
            wrapper = mount(Slider);
            expect(wrapper.exists()).toBe(true);
            const mainSlider = wrapper.get('[data-test="main-slider"]');

            expect(mainSlider.element.value).toBe("0");
            expect(mainSlider.attributes('min')).toBe("0");

            await wrapper.setProps({ min: testMin });
            await mainSlider.setValue(0);

            expect(mainSlider.attributes('min')).toBe(`${testMin}`);
            expect(mainSlider.element.value).toBe(`${testMin}`);
        });

        test("Slider Maximum", async () => {
            const testMax = 90;
            wrapper = mount(Slider);
            expect(wrapper.exists()).toBe(true);
            const mainSlider = wrapper.get('[data-test="main-slider"]');

            expect(mainSlider.element.value).toBe("0");
            expect(mainSlider.attributes('max')).toBe("100");

            await wrapper.setProps({ max: testMax });
            await mainSlider.setValue(100);

            expect(mainSlider.attributes('max')).toBe(`${testMax}`);
            expect(mainSlider.element.value).toBe(`${testMax}`);
        });

        test("Slider Step", async () => {
            const testStep = 1;
            wrapper = mount(Slider);
            expect(wrapper.exists()).toBe(true);
            const mainSlider = wrapper.get('[data-test="main-slider"]');

            expect(mainSlider.element.value).toBe("0");
            expect(mainSlider.attributes('step')).toBe("1");

            await wrapper.setProps({ step: testStep });

            expect(mainSlider.attributes('step')).toBe(`${testStep}`);
        });

        test("Slider Action", async () => {
            const testValue = 10;
            const fn = vi.fn();
            wrapper = mount(Slider);
            expect(wrapper.exists()).toBe(true);
            const mainSlider = wrapper.get('[data-test="main-slider"]');

            expect(wrapper.props().hasOwnProperty('action')).toBe(true);

            await wrapper.setProps({ action: fn });

            expect(wrapper.props('action')).toBe(fn);

            await mainSlider.setValue(testValue);

            expect(fn).toHaveBeenCalledTimes(1);
            expect(fn).toHaveBeenCalledWith(testValue);
        });
    });

    describe("User Interactions", () => {
        test("Use Slider", async () => {
            const testValue = 10;
            wrapper = mount(Slider);
            expect(wrapper.exists()).toBe(true);
            const mainSlider = wrapper.get('[data-test="main-slider"]');

            await mainSlider.setValue(testValue);

            expect(wrapper.vm.value).toBe(testValue);
        });
    });

    //Outputs

    describe("DOM Elements", () => {
        test("Slider", () => {
            wrapper = mount(Slider);
            expect(wrapper.exists()).toBe(true);

            expect(wrapper.find('[data-test="main-slider"]').exists()).toBe(true);
        });

        test("Icon", async () => {
            const testIcon = "arrow-right";
            wrapper = shallowMount(Slider);
            expect(wrapper.exists()).toBe(true);

            expect(wrapper.find('[data-test="main-icon"]').exists()).toBe(false);

            await wrapper.setProps({ icon: testIcon });

            expect(wrapper.find('[data-test="main-icon"]').exists()).toBe(true);

            const icon = wrapper.get('[data-test="main-icon"]');

            expect(icon.attributes('icon')).toBe(testIcon);
        });
    });
});