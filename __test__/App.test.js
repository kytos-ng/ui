import { mount } from '@vue/test-utils';
import App from '../src/App.vue';
import { describe, expect, test } from "vitest";

describe("App.vue", () => {
    const wrapper = mount(App);
    test("Does a wrapper exists?", () => {
        expect(wrapper.exists()).toBe(true);
    });
});