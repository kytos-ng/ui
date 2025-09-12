import { mount, shallowMount, nextTick } from '@vue/test-utils';
import Select from '@/components/kytos/inputs/Select.vue';
import { describe, test, expect, beforeAll, afterEach, vi } from "vitest";



describe("Select.vue", () => {
    let wrapper;
    const testOptions = [{value: "testVal1", description: "testDesc1"},
        {value: "testVal2", description: "testDesc2"},
        {value: "testVal3", description: "testDesc3"}];
    beforeAll(() => {
        expect(Select).toBeTruthy();
    });

    afterEach(() => {
        wrapper.unmount();
        vi.restoreAllMocks();
    });

    //Inputs

    describe("Props", () => {
        test("Default Select Value", () => {
            const testValue = ["test1", "test2", "test3"];
            wrapper = mount(Select, {
                props: {
                    value: testValue,
                    options: testOptions
                }
            });
            expect(wrapper.exists()).toBe(true);
            expect(wrapper.vm.selected).toEqual(testValue);
            expect(wrapper.vm.title).toEqual(undefined);
            expect(wrapper.vm.enable_filter).toEqual(false);
        });

        test("Select Options", () => {
            wrapper = mount(Select, {
                props: {
                    options: testOptions
                }
            });

            expect(wrapper.exists()).toBe(true);
            const [option1, option2, option3] = wrapper.findAll('option');
            const [optionText1, optionText2, optionText3] = [option1.text(), option2.text(), option3.text()];
            const [optionValue1, optionValue2, optionValue3] = [option1.element.value, option2.element.value, option3.element.value];

            expect(option1.exists()).toBe(true);
            expect(option2.exists()).toBe(true)
            expect(option3.exists()).toBe(true)

            expect(optionText1).toEqual(testOptions[0].description);
            expect(optionText2).toEqual(testOptions[1].description);
            expect(optionText3).toEqual(testOptions[2].description);

            expect(optionValue1).toEqual(testOptions[0].value);
            expect(optionValue2).toEqual(testOptions[1].value);
            expect(optionValue3).toEqual(testOptions[2].value);
        });

        test("Select Action", async () => {
            const fn = vi.fn();
            wrapper = mount(Select, {
                props: {
                    options: testOptions
                }
            });
            expect(wrapper.exists()).toBe(true);
            const mainSelect = wrapper.get('[data-test="main-select"]');

            expect(wrapper.props().hasOwnProperty('action')).toBe(true);

            await wrapper.setProps({ action: fn });

            expect(wrapper.props('action')).toBe(fn);

            await mainSelect.setValue(['testVal1', 'testVal3']);

            expect(fn).toHaveBeenCalledTimes(2);
            expect(fn).toHaveBeenCalledWith([testOptions[0].value, testOptions[2].value]);
        });

        test("Select Enable Filter", async () => {
            wrapper = mount(Select, {
                props: {
                    options: testOptions,
                    enable_filter: true,
                }
            });
            expect(wrapper.exists()).toBe(true);

            let actual = wrapper.vm.isAMatch(testOptions[0]);
            expect("no_filter").toEqual(actual);
            
            await wrapper.find('input').setValue("Desc1");
            actual = wrapper.vm.isAMatch(testOptions[0]);
            expect("matched").toEqual(actual);
            actual = wrapper.vm.isAMatch(testOptions[1]);
            expect("not_matched").toEqual(actual);
        });
    });

    describe("User Interactions", () => {
        test("Select Data/Use Select", async () => {
            wrapper = mount(Select, {
                props: {
                    options: testOptions
                }
            });
            expect(wrapper.exists()).toBe(true);
            const mainSelect = wrapper.get('[data-test="main-select"]');

            await mainSelect.setValue(['testVal1', 'testVal3']);

            expect(wrapper.vm.selected).toEqual(['testVal1', 'testVal3']);
        });

        test("Select and Deselect Data", async () => {
            wrapper = mount(Select, {
                props: {
                    options: testOptions
                }
            });
            expect(wrapper.exists()).toBe(true);
            const mainSelect = wrapper.get('[data-test="main-select"]');

            await mainSelect.setValue(['testVal1', 'testVal3']);

            expect(wrapper.vm.selected).toEqual(['testVal1', 'testVal3']);

            await mainSelect.setValue();

            expect(wrapper.vm.selected).toEqual([]);
        });

        test("Select Empty Array", () => {
            wrapper = mount(Select, {
                props: {
                    options: testOptions
                }
            });
            expect(wrapper.exists()).toBe(true);

            expect(wrapper.vm.selected).toEqual([]);
        });
    });

    //Outputs

    describe("DOM Elements", () => {
        test("Select", () => {
            wrapper = mount(Select, {
                props: {
                    options: testOptions
                }
            });
            expect(wrapper.exists()).toBe(true);

            expect(wrapper.find('[data-test="main-select"]').exists()).toBe(true);
        });

        test("Icon", async () => {
            const testIcon = "arrow-right";
            wrapper = shallowMount(Select, {
                props: {
                    options: testOptions,
                    title: "TestSelect"
                }
            });
            expect(wrapper.exists()).toBe(true);

            expect(wrapper.find('[data-test="main-icon"]').exists()).toBe(false);

            await wrapper.setProps({ icon: testIcon });

            expect(wrapper.find('[data-test="main-icon"]').exists()).toBe(true);

            const icon = wrapper.get('[data-test="main-icon"]');

            expect(icon.attributes('icon')).toBe(testIcon);
        });
    });

    describe("Emits", () => {
        test("Emit Select Value", async () => {
            wrapper = mount(Select, {
                props: {
                    options: testOptions
                }
            });
            expect(wrapper.exists()).toBe(true);
            const mainSelect = wrapper.get('[data-test="main-select"]');

            await mainSelect.setValue(['testVal1', 'testVal3']);

            expect(wrapper.emitted('update:value')).toHaveLength(2);
            expect(wrapper.emitted('update:value')[0]).toEqual([[testOptions[0].value, testOptions[2].value]]);
        });
    });

    //V-Model

    describe("V-Models", () => {
        test("V-Model Value", async () => {
            wrapper = mount(Select, {
                props: {
                value: [],
                'onUpdate:value': (e) => wrapper.setProps({ value: e }),
                options: testOptions
                }
            });
            
            await wrapper.get('[data-test="main-select"]').setValue(['testVal1', 'testVal3']);
            expect(wrapper.props('value')).toEqual([testOptions[0].value, testOptions[2].value]);
            });
    });
});