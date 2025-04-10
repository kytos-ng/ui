import { mount, shallowMount } from '@vue/test-utils';
import ButtonGroup from '@/components/kytos/inputs/buttons/ButtonGroup.vue';
import Button from '@/components/kytos/inputs/buttons/Button.vue';
import { describe, test, expect, beforeAll, afterEach, vi } from "vitest";



describe("ButtonGroup.vue", () => {
    let wrapper;
    beforeAll(() => {
        expect(ButtonGroup).toBeTruthy();
    });

    afterEach(() => {
        wrapper.unmount();
        vi.restoreAllMocks();
    });

    //Inputs

    describe("Props", () => {
        test("ButtonGroup Tooltip", () => {
            const testTooltip = 'test';
            wrapper = mount(ButtonGroup, {
                props: {
                    tooltip: testTooltip
                }
            });
            expect(wrapper.exists()).toBe(true);
            const mainButtonGroup = wrapper.get('[data-test="main-buttongroup"]');

            expect(mainButtonGroup.attributes('title')).toBe(testTooltip);
        });
    });

    describe("Slots", () => {
        test("ButtonGroup Single Button in Slot", () => {
            const testTooltip = 'test';
            wrapper = mount(ButtonGroup, {
                props: {
                    tooltip: testTooltip
                },
                slots: {
                    default: Button
                }
            });
            expect(wrapper.exists()).toBe(true);
            const button = wrapper.findComponent(Button);

            expect(button.exists()).toBe(true);
        });

        test("ButtonGroup Multiple Buttons in Slot", () => {
            const testTooltip = 'test';
            wrapper = mount(ButtonGroup, {
                props: {
                    tooltip: testTooltip
                },
                slots: {
                    default: [Button, Button, Button]
                }
            });
            expect(wrapper.exists()).toBe(true);
            const Buttons = wrapper.findAllComponents(Button);
            expect(Buttons.length).toBe(3);
        });
    });

    //Outputs

    describe("DOM Elements", () => {
        test("ButtonGroup", () => {
            const testTooltip = 'test';
            wrapper = mount(ButtonGroup, {
                props: {
                    tooltip: testTooltip
                }
            });
            expect(wrapper.exists()).toBe(true);

            expect(wrapper.find('[data-test="main-buttongroup"]').exists()).toBe(true);
        });
    });
});