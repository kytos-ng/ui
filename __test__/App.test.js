import { mount } from '@vue/test-utils';
import App from '@/App.vue';
import { describe, test, expect, beforeAll } from "vitest";

describe("App", () => {
    const wrapper = mount(App);
    beforeAll(() => {
        expect(App).toBeTruthy();
    });
    test("Does a wrapper exists?", () => {
        expect(wrapper.exists()).toBe(true);
    });
});