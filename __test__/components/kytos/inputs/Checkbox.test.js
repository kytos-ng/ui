import { mount, shallowMount } from '@vue/test-utils';
import Checkbox from '@/components/kytos/inputs/Checkbox.vue';
import { describe, test, expect, beforeAll, afterEach, vi } from "vitest";

//Inputs

describe("Props", () => {
    beforeAll(() => {
        expect(Checkbox).toBeTruthy();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    test("Checkbox Value", async () => {
        const testValue = 'test';
        const wrapper = mount(Checkbox);
        expect(wrapper.exists()).toBe(true);
        const mainCheckbox = wrapper.get('[data-test="main-checkbox"]');

        expect(wrapper.props('value')).toBe(0);

        await wrapper.setProps({ value: testValue });
        await mainCheckbox.setChecked(true);

        expect(wrapper.vm.list_of_checked).toEqual([testValue]);

        await mainCheckbox.setChecked(false);

        expect(wrapper.vm.list_of_checked).toEqual([]);
    });

    test("Checked as Default", () => {
        const wrapper = mount(Checkbox, {
            props: {
                checked: true
            }
        });
        expect(wrapper.exists()).toBe(true);
        const mainCheckbox = wrapper.get('[data-test="main-checkbox"]');

        expect(mainCheckbox.element.checked).toBe(true);
        expect(wrapper.vm.enabled).toBe(true);
    });

    test("UnChecked as Default", () => {
        const wrapper = mount(Checkbox);
        expect(wrapper.exists()).toBe(true);
        const mainCheckbox = wrapper.get('[data-test="main-checkbox"]');

        expect(mainCheckbox.element.checked).toBe(false);
        expect(wrapper.vm.enabled).toBe(false);
    });

    test("Checkbox Model", async () => {
        const testArray = ['test1', 'test2'];
        const wrapper = mount(Checkbox, {
            props: {
                model: [...testArray]
            }
        });
        expect(wrapper.exists()).toBe(true);
        const mainCheckbox = wrapper.get('[data-test="main-checkbox"]');

        expect(wrapper.vm.list_of_checked).toEqual(testArray);

        await mainCheckbox.setChecked(true);

        expect(wrapper.vm.list_of_checked).toEqual([...testArray, 0]);
    });

    test("Checkbox Action", async () => {
        const fn = vi.fn();
        const text = 'test';
        const wrapper = mount(Checkbox);
        expect(wrapper.exists()).toBe(true);
        const mainCheckbox = wrapper.get('[data-test="main-checkbox"]');

        expect(wrapper.props().hasOwnProperty('action')).toBe(true);

        await wrapper.setProps({
            value: text,
            action: fn
         });

        expect(wrapper.props('action')).toBe(fn);

        await mainCheckbox.setChecked(true);

        expect(fn).toHaveBeenCalledTimes(1);
        expect(fn).toHaveBeenCalledWith(text);

        //Hack to avoid state from crossing over to other unit tests
        //Just undo the changes made and everything works fine
        //Unchecking luckily also resets data
        await mainCheckbox.setChecked(false);
    });
});

describe("User Interactions", () => {
    beforeAll(() => {
        expect(Checkbox).toBeTruthy();
    });

    test("Click Checkbox", async () => {
        const testValue = 'test';
        const testModel = ['test1', 'test2'];
        const wrapper = mount(Checkbox);
        expect(wrapper.exists()).toBe(true);
        const mainCheckbox = wrapper.get('[data-test="main-checkbox"]');

        expect(mainCheckbox.element.checked).toBe(false);
        expect(wrapper.vm.list_of_checked).toEqual([]);
        expect(wrapper.vm.enabled).toBe(false);

        await wrapper.setProps({ 
            value: testValue,
            model: [...testModel]
         });
        await mainCheckbox.setChecked(true);

        expect(mainCheckbox.element.checked).toBe(true);
        expect(wrapper.vm.list_of_checked).toEqual([...testModel, testValue]);
        expect(wrapper.vm.enabled).toBe(true);

        await mainCheckbox.setChecked(false);

        expect(mainCheckbox.element.checked).toBe(false);
        expect(wrapper.vm.list_of_checked).toEqual([...testModel]);
        expect(wrapper.vm.enabled).toBe(false);
    });
});

//Outputs

describe("DOM Elements", () => {
    beforeAll(() => {
        expect(Checkbox).toBeTruthy();
    });

    test("Checkbox", () => {
        const wrapper = mount(Checkbox);
        expect(wrapper.exists()).toBe(true);

        expect(wrapper.find('[data-test="main-checkbox"]').exists()).toBe(true);
    });

    test("Icon", async () => {
        const testIcon = "arrow-right";
        const wrapper = shallowMount(Checkbox);
        expect(wrapper.exists()).toBe(true);

        expect(wrapper.find('[data-test="main-icon"]').exists()).toBe(false);

        await wrapper.setProps({ icon: testIcon });

        expect(wrapper.find('[data-test="main-icon"]').exists()).toBe(true);

        const icon = wrapper.get('[data-test="main-icon"]');

        expect(icon.attributes('icon')).toBe(testIcon);
    });
});

describe("Emits", () => {
    beforeAll(() => {
        expect(Checkbox).toBeTruthy();
    });

    test("Emit Checkbox Model", async () => {
        const testValue = 'test';
        const wrapper = mount(Checkbox);
        expect(wrapper.exists()).toBe(true);
        const mainCheckbox = wrapper.get('[data-test="main-checkbox"]');

        await wrapper.setProps({ value: testValue });
        await mainCheckbox.setChecked(true);

        expect(wrapper.emitted('update:model')).toHaveLength(1);
        expect(wrapper.emitted('update:model')[0]).toEqual([[testValue]]);
    });
});

describe("V-Models", () => {
    beforeAll(() => {
        expect(Checkbox).toBeTruthy();
    });

    test("V-Model Model", async () => {
        const testValue = 'test';
        const wrapper = mount(Checkbox, {
            props: {
              model: [],
              'onUpdate:model': (e) => wrapper.setProps({ model: e }),
              value: testValue
            }
        });
        
        await wrapper.get('[data-test="main-checkbox"]').setChecked(true);
        expect(wrapper.props('model')).toEqual([testValue]);
    });
});