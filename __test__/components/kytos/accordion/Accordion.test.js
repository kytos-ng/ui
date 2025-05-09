import { mount, shallowMount } from '@vue/test-utils';
import Accordion from '@/components/kytos/accordion/Accordion.vue';
import AccordionItem from '@/components/kytos/accordion/AccordionItem.vue';
import { describe, test, expect, beforeAll, afterEach, vi } from "vitest";



describe("ButtonGroup.vue", () => {
    let wrapper;
    beforeAll(() => {
        expect(Accordion).toBeTruthy();
    });

    afterEach(() => {
        wrapper.unmount();
        vi.restoreAllMocks();
    });

    //Inputs

    describe("Slots", () => {
        test("Accordion Single Item in Slot", () => {
            wrapper = mount(Accordion, {
                slots: {
                    default: AccordionItem
                }
            });
            expect(wrapper.exists()).toBe(true);
            const accordionItem = wrapper.findComponent(AccordionItem);

            expect(accordionItem.exists()).toBe(true);
        });

        test("Accordion Multiple Items in Slot", () => {
            wrapper = mount(Accordion, {
                slots: {
                    default: [AccordionItem, AccordionItem, AccordionItem]
                }
            });
            expect(wrapper.exists()).toBe(true);
            const accordionItems = wrapper.findAllComponents(AccordionItem);
            expect(accordionItems.length).toBe(3);
        });
    });

    //Outputs

    describe("DOM Elements", () => {
        test("Accordion Wrapper", () => {
            wrapper = mount(Accordion);
            expect(wrapper.exists()).toBe(true);

            expect(wrapper.find('[data-test="main-accordionwrapper"]').exists()).toBe(true);
        });
    });
});