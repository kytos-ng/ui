import { mount, shallowMount } from '@vue/test-utils';
import Input from '@/components/kytos/inputs/Input.vue';
import { describe, test, expect, beforeAll, afterEach, vi } from "vitest";
import { wrap } from 'yargs';



describe("Input.vue", () => {
    let wrapper;
    beforeAll(() => {
        expect(Input).toBeTruthy();
    });

    afterEach(() => {
        wrapper.unmount();
        vi.restoreAllMocks();
    });

    //Inputs

    describe("Props", () => {
        test("Disabling Input", async () => {
            wrapper = mount(Input);
            expect(wrapper.exists()).toBe(true);
            const mainInput = wrapper.get('[data-test="main-input"]');
            expect(mainInput.element.hasAttribute('disabled')).toBe(false);

            await wrapper.setProps({ isDisabled: true });

            expect(mainInput.element.hasAttribute('disabled')).toBe(true);
        });

        test("Default Input Value", async () => {
            const testValue = 'test';
            wrapper = mount(Input);
            expect(wrapper.exists()).toBe(true);
            const mainInput = wrapper.get('[data-test="main-input"]');

            expect(mainInput.element.hasAttribute('value')).toBe(true);

            await wrapper.setProps({ value: testValue });

            expect(mainInput.attributes('value')).toBe(testValue);
        });

        test("Input Tooltip", async () => {
            const testValue = 'test';
            wrapper = mount(Input);
            expect(wrapper.exists()).toBe(true);
            const mainInput = wrapper.get('[data-test="main-input"]');

            expect(mainInput.element.hasAttribute('title')).toBe(false);

            await wrapper.setProps({ tooltip: testValue });

            expect(mainInput.attributes('title')).toBe(testValue);
        });

        test("Input Placeholder", async () => {
            const testValue = 'test';
            wrapper = mount(Input);
            expect(wrapper.exists()).toBe(true);
            const mainInput = wrapper.get('[data-test="main-input"]');

            expect(mainInput.element.hasAttribute('placeholder')).toBe(false);

            await wrapper.setProps({ placeholder: testValue });

            expect(mainInput.attributes('placeholder')).toBe(testValue);
        });

        test("Input Action", async () => {
            const fn = vi.fn();
            const text = 'test';
            wrapper = mount(Input);
            expect(wrapper.exists()).toBe(true);
            const mainInput = wrapper.get('[data-test="main-input"]');

            expect(wrapper.props().hasOwnProperty('action')).toBe(true);

            await wrapper.setProps({ action: fn });

            expect(wrapper.props('action')).toBe(fn);

            await mainInput.setValue(text);

            expect(fn).toHaveBeenCalledTimes(1);
            expect(fn).toHaveBeenCalledWith(text);
        });

        test("Test keypress event and method call", async () => {
            wrapper = mount(Input);
            const isNumberSpy = vi.spyOn(wrapper.vm, 'isNumber');
            const input = wrapper.find('input');
            await input.trigger('keypress', {key: 'a'});
            expect(isNumberSpy).toBeCalled()
        });
    });

    describe("User Interactions", () => {
        test("Input Data/Write/Use Input", async () => {
            const text = 'test';
            wrapper = mount(Input);
            expect(wrapper.exists()).toBe(true);
            const mainInput = wrapper.get('[data-test="main-input"]');

            await mainInput.setValue(text);

            expect(mainInput.element.value).toContain(text);
        });
    });

    //Outputs

    describe("DOM Elements", () => {
        test("Input", () => {
            wrapper = mount(Input);
            expect(wrapper.exists()).toBe(true);

            expect(wrapper.find('[data-test="main-input"]').exists()).toBe(true);
        });

        test("Icon", async () => {
            const testIcon = "arrow-right";
            wrapper = shallowMount(Input);
            expect(wrapper.exists()).toBe(true);

            expect(wrapper.find('[data-test="main-icon"]').exists()).toBe(false);

            await wrapper.setProps({ icon: testIcon });

            expect(wrapper.find('[data-test="main-icon"]').exists()).toBe(true);

            const icon = wrapper.get('[data-test="main-icon"]');

            expect(icon.attributes('icon')).toBe(testIcon);
        });
    });

    describe("Emits", () => {
        test("Emit Input Value", async () => {
            const text = 'test';
            wrapper = mount(Input);
            expect(wrapper.exists()).toBe(true);
            const mainInput = wrapper.get('[data-test="main-input"]');

            await mainInput.setValue(text);

            expect(wrapper.emitted('update:value')).toHaveLength(1);
            expect(wrapper.emitted('update:value')[0]).toEqual([text]);
        });
    });

    //V-Model

    describe("V-Models", () => {
        test("V-Model Value", async () => {
            const text = 'test';
            wrapper = mount(Input, {
                props: {
                value: 'initialText',
                'onUpdate:value': (e) => wrapper.setProps({ value: e })
                }
            });
            
            await wrapper.get('[data-test="main-input"]').setValue(text);
            expect(wrapper.props('value')).toBe(text);
            });
    });

    //Methods

    describe("Methods", () => {
        test("isNumber Method with letter", () => {
            const fn = vi.fn();
            wrapper = shallowMount(Input, {
                props: {only_numbers: true}
            });
            const event = {key: 'a', preventDefault: fn};
            wrapper.vm.isNumber(event);
            expect(event.preventDefault).toHaveBeenCalled();
        });

        test("isNumber Method with number", () => {
            const fn = vi.fn();
            wrapper = shallowMount(Input, {
                props: {only_numbers: true}
            });
            const event = {key: '1', preventDefault: fn};
            wrapper.vm.isNumber(event);
            expect(event.preventDefault).not.toHaveBeenCalled();
        });
    });
});