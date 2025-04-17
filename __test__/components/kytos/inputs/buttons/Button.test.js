import { mount, shallowMount } from '@vue/test-utils';
import Button from '@/components/kytos/inputs/buttons/Button.vue';
import { describe, test, expect, beforeAll, afterEach, vi } from "vitest";



describe("Button.vue", () => {
    let wrapper;
    beforeAll(() => {
        expect(Button).toBeTruthy();
    });

    afterEach(() => {
        wrapper.unmount();
        vi.restoreAllMocks();
    });

    //Inputs

    describe("Props", () => {
        test("Disabling Button", async () => {
            wrapper = mount(Button);
            expect(wrapper.exists()).toBe(true);
            const mainButton = wrapper.get('[data-test="main-button"]');
            expect(mainButton.element.hasAttribute('disabled')).toBe(false);

            await wrapper.setProps({ isDisabled: true });

            expect(mainButton.element.hasAttribute('disabled')).toBe(true);
        });

        test("Button Tooltip", async () => {
            const testValue = 'test';
            wrapper = mount(Button);
            expect(wrapper.exists()).toBe(true);
            const mainButton = wrapper.get('[data-test="main-button"]');

            expect(mainButton.element.hasAttribute('title')).toBe(false);

            await wrapper.setProps({ tooltip: testValue });

            expect(mainButton.attributes('title')).toBe(testValue);
        });
    });

    describe("User Interactions", () => {
        test("Button Data/Write/Use", async () => {
            wrapper = mount(Button);
            expect(wrapper.exists()).toBe(true);
            const mainButton = wrapper.get('[data-test="main-button"]');

            await mainButton.trigger('click');

            expect(wrapper.emitted('click')).toHaveLength(1);
        });
        
        test("Click On Disabled Button", async () => {
            wrapper = mount(Button);
            expect(wrapper.exists()).toBe(true);
            const mainButton = wrapper.get('[data-test="main-button"]');

            await wrapper.setProps({ isDisabled: true });
            await mainButton.trigger('click');

            expect(wrapper.emitted('click')).toBeFalsy;
        });
    });

    //Outputs

    describe("DOM Elements", () => {
        test("Button", () => {
            wrapper = mount(Button);
            expect(wrapper.exists()).toBe(true);

            expect(wrapper.find('[data-test="main-button"]').exists()).toBe(true);
        });

        test("Icon", async () => {
            const testIcon = "arrow-right";
            wrapper = shallowMount(Button);
            expect(wrapper.exists()).toBe(true);

            expect(wrapper.find('[data-test="main-icon"]').exists()).toBe(false);

            await wrapper.setProps({ icon: testIcon });

            expect(wrapper.find('[data-test="main-icon"]').exists()).toBe(true);

            const icon = wrapper.get('[data-test="main-icon"]');

            expect(icon.attributes('icon')).toBe(testIcon);
        });
    });

    describe("Emits", () => {
        test("Emit Button Click", async () => {
            wrapper = mount(Button);
            expect(wrapper.exists()).toBe(true);
            const mainButton = wrapper.get('[data-test="main-button"]');

            await mainButton.trigger('click');

            expect(wrapper.emitted('click')).toHaveLength(1);
        });
    });
});