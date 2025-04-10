import { mount, shallowMount } from '@vue/test-utils';
import Textarea from '@/components/kytos/inputs/Textarea.vue';
import { describe, test, expect, beforeAll, afterEach, vi } from "vitest";



describe("Textarea.vue", () => {
    let wrapper;
    beforeAll(() => {
        expect(Textarea).toBeTruthy();
    });

    afterEach(() => {
        wrapper.unmount();
        vi.restoreAllMocks();
    });

    //Inputs

    describe("Props", () => {
        test("Disabling Textarea", async () => {
            wrapper = mount(Textarea);
            expect(wrapper.exists()).toBe(true);
            const mainTextarea = wrapper.get('[data-test="main-textarea"]');
            expect(mainTextarea.element.hasAttribute('disabled')).toBe(false);

            await wrapper.setProps({ isDisabled: true });

            expect(mainTextarea.element.hasAttribute('disabled')).toBe(true);
        });

        test("Default Textarea Value", async () => {
            const testValue = 'test';
            wrapper = mount(Textarea);
            expect(wrapper.exists()).toBe(true);
            const mainTextarea = wrapper.get('[data-test="main-textarea"]');

            expect(mainTextarea.element.hasAttribute('value')).toBe(false);

            await wrapper.setProps({ value: testValue });

            expect(mainTextarea.attributes('value')).toBe(testValue);
        });

        test("Textarea Tooltip", async () => {
            const testValue = 'test';
            wrapper = mount(Textarea);
            expect(wrapper.exists()).toBe(true);
            const mainTextarea = wrapper.get('[data-test="main-textarea"]');

            expect(mainTextarea.element.hasAttribute('title')).toBe(false);

            await wrapper.setProps({ tooltip: testValue });

            expect(mainTextarea.attributes('title')).toBe(testValue);
        });

        test("Textarea Placeholder", async () => {
            const testValue = 'test';
            wrapper = mount(Textarea);
            expect(wrapper.exists()).toBe(true);
            const mainTextarea = wrapper.get('[data-test="main-textarea"]');

            expect(mainTextarea.element.hasAttribute('placeholder')).toBe(false);

            await wrapper.setProps({ placeholder: testValue });

            expect(mainTextarea.attributes('placeholder')).toBe(testValue);
        });

        test("Textarea Action", async () => {
            const fn = vi.fn();
            const text = 'test';
            wrapper = mount(Textarea);
            expect(wrapper.exists()).toBe(true);
            const mainTextarea = wrapper.get('[data-test="main-textarea"]');

            expect(wrapper.props().hasOwnProperty('action')).toBe(true);

            await wrapper.setProps({ action: fn });

            expect(wrapper.props('action')).toBe(fn);

            await mainTextarea.setValue(text);

            expect(fn).toHaveBeenCalledTimes(2);
            expect(fn).toHaveBeenCalledWith(text);
        });
    });

    describe("User Interactions", () => {
        test("Textarea Data/Write/Use", async () => {
            const text = 'test';
            wrapper = mount(Textarea);
            expect(wrapper.exists()).toBe(true);
            const mainTextarea = wrapper.get('[data-test="main-textarea"]');

            await mainTextarea.setValue(text);

            expect(mainTextarea.element.value).toContain(text);
        });
    });

    //Outputs

    describe("DOM Elements", () => {
        test("Textarea", () => {
            wrapper = mount(Textarea);
            expect(wrapper.exists()).toBe(true);

            expect(wrapper.find('[data-test="main-textarea"]').exists()).toBe(true);
        });

        test("Icon", async () => {
            const testIcon = "arrow-right";
            wrapper = shallowMount(Textarea);
            expect(wrapper.exists()).toBe(true);

            expect(wrapper.find('[data-test="main-icon"]').exists()).toBe(false);

            await wrapper.setProps({ icon: testIcon });

            expect(wrapper.find('[data-test="main-icon"]').exists()).toBe(true);

            const icon = wrapper.get('[data-test="main-icon"]');

            expect(icon.attributes('icon')).toBe(testIcon);
        });
    });

    describe("Emits", () => {
        test("Emit Textarea Value", async () => {
            const text = 'test';
            wrapper = mount(Textarea);
            expect(wrapper.exists()).toBe(true);
            const mainTextarea = wrapper.get('[data-test="main-textarea"]');

            await mainTextarea.setValue(text);

            expect(wrapper.emitted('update:value')).toHaveLength(1);
            expect(wrapper.emitted('update:value')[0]).toEqual([text]);
        });

        test("Emit Textarea textarea", async () => {
            const text = 'test';
            wrapper = mount(Textarea);
            expect(wrapper.exists()).toBe(true);
            const mainTextarea = wrapper.get('[data-test="main-textarea"]');

            await mainTextarea.setValue(text);

            expect(wrapper.emitted('textarea')).toHaveLength(1);
        });
    });

    //V-Model

    describe("V-Models", () => {
        test("V-Model Value", async () => {
            const text = 'test';
            wrapper = mount(Textarea, {
                props: {
                value: 'initialText',
                'onUpdate:value': (e) => wrapper.setProps({ value: e })
                }
            });
            
            await wrapper.get('[data-test="main-textarea"]').setValue(text);
            expect(wrapper.props('value')).toBe(text);
            });
    });
});