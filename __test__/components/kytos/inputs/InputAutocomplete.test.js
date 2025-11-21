import { mount, shallowMount } from '@vue/test-utils';
import Input from '@/components/kytos/inputs/Input.vue';
import Autocomplete from '@trevoreyre/autocomplete-vue';
import InputAutocomplete from '@/components/kytos/inputs/InputAutocomplete.vue';
import { describe, test, expect, beforeAll, afterEach, vi } from "vitest";



describe("InputAutocomplete.vue", () => {
    let wrapper;
    beforeAll(() => {
        expect(InputAutocomplete).toBeTruthy();
    });

    afterEach(() => {
        wrapper.unmount();
        vi.restoreAllMocks();
    });

    //Inputs

    describe("Props", () => {
        test("Default InputAutocomplete Value", async () => {
            const testValue = 'test';
            wrapper = mount(InputAutocomplete, {
                global: {
                    components: {
                        KInput: Input
                    }
                }
            });
            expect(wrapper.exists()).toBe(true);
            const mainInputAutocomplete = wrapper.getComponent(Input);

            await wrapper.setProps({ value: testValue });

            expect(mainInputAutocomplete.props('value')).toBe(testValue);
        });

        test("InputAutocomplete Tooltip", async () => {
            const testValue = 'test';
            wrapper = mount(InputAutocomplete, {
                global: {
                    components: {
                        KInput: Input
                    }
                }
            });
            expect(wrapper.exists()).toBe(true);
            const mainInputAutocomplete = wrapper.getComponent(Input);

            await wrapper.setProps({ tooltip: testValue });

            expect(mainInputAutocomplete.props('title')).toBe(testValue);
        });

        test("InputAutocomplete Placeholder", async () => {
            const testValue = 'test';
            wrapper = mount(InputAutocomplete, {
                global: {
                    components: {
                        KInput: Input
                    }
                }
            });
            expect(wrapper.exists()).toBe(true);
            const mainInputAutocomplete = wrapper.getComponent(Input);

            await wrapper.setProps({ placeholder: testValue });

            expect(mainInputAutocomplete.props('placeholder')).toBe(testValue);
        });

        test("InputAutocomplete Label", async () => {
            const testValue = 'test';
            wrapper = shallowMount(InputAutocomplete, {
                global: {
                    components: {
                        KInput: Input
                    }
                }
            });
            expect(wrapper.exists()).toBe(true);
            const autocomplete = wrapper.getComponent(Autocomplete);

            expect(autocomplete.element.hasAttribute('aria-label')).toBe(true);

            await wrapper.setProps({ label: testValue });

            expect(autocomplete.attributes('aria-label')).toBe(testValue);
        });

        test("InputAutocomplete Input Action", async () => {
            const fn = vi.fn();
            const testCandidates = ['test1', 'test2', 'test3'];
            wrapper = mount(InputAutocomplete, {
                props: {
                    candidates: testCandidates
                },
                global: {
                    components: {
                        'k-input': Input
                    }
                }
            });
            expect(wrapper.exists()).toBe(true);
            const mainInputAutocomplete = wrapper.getComponent(Input);

            expect(wrapper.props().hasOwnProperty('input_action')).toBe(true);

            await wrapper.setProps({ input_action: fn });

            expect(wrapper.props('input_action')).toBe(fn);

            const input = mainInputAutocomplete.get('[data-test="main-input"]');

            await input.setValue(testCandidates[1]);

            expect(fn).toHaveBeenCalledTimes(1);
            expect(fn).toHaveBeenCalledWith(testCandidates[1]);
        });

        test("InputAutocomplete isEditable", async () => {
            wrapper = mount(InputAutocomplete, {
                global: {
                    components: {
                        'k-input': Input
                    }
                }
            });
            expect(wrapper.exists()).toBe(true);
            const mainInputAutocomplete = wrapper.getComponent(Input);

            expect(wrapper.props().hasOwnProperty('isEditable')).toBe(true);

            await wrapper.setProps({isEditable: false });

            expect(wrapper.props('isEditable')).toBe(false);

            expect(mainInputAutocomplete.props('isDisabled')).toBe(true);
        });

        test("InputAutocomplete Submit Action", async () => {
            const fn = vi.fn();
            const testCandidates = ['test1', 'test2', 'test3'];
            wrapper = mount(InputAutocomplete, {
                props: {
                    candidates: testCandidates
                },
                global: {
                    components: {
                        'k-input': Input
                    }
                }
            });
            expect(wrapper.exists()).toBe(true);
            const mainInputAutocomplete = wrapper.getComponent(Input);

            expect(wrapper.props().hasOwnProperty('submit_action')).toBe(true);

            await wrapper.setProps({ submit_action: fn });

            expect(wrapper.props('submit_action')).toBe(fn);
        });

        test("InputAutocomplete Candidates", async () => {
            const text = 'test';
            const testCandidates = ['test1', 'test2', 'test3'];
            wrapper = mount(InputAutocomplete, {
                global: {
                    components: {
                        KInput: Input
                    }
                },
                props: {
                    candidates: testCandidates
                }
            });
            expect(wrapper.exists()).toBe(true);
            const mainInputAutocomplete = wrapper.getComponent(Input);
            const input = mainInputAutocomplete.get('[data-test="main-input"]');

            await input.setValue(text);

            const [result1, result2, result3] = wrapper.findAll('.autocomplete-result');
            const [resultText1, resultText2, resultText3] = [result1.text(), result2.text(), result3.text()];

            expect(result1.exists()).toBe(true);
            expect(result2.exists()).toBe(true);
            expect(result3.exists()).toBe(true);

            expect(resultText1).toEqual(testCandidates[0]);
            expect(resultText2).toEqual(testCandidates[1]);
            expect(resultText3).toEqual(testCandidates[2]);

            await input.setValue(text.concat('2'));

            const results = wrapper.findAll('.autocomplete-result');

            expect(results.length).toBe(1);

            expect(results[0].text()).toEqual(testCandidates[1]);
        });
    });

    describe("User Interactions", () => {
        test("InputAutocomplete Data/Write/Use", async () => {
            const text = 'test';
            const testCandidates = ['test1', 'test2', 'test3'];
            wrapper = mount(InputAutocomplete, {
                attachTo: document.body,
                global: {
                    components: {
                        KInput: Input
                    }
                },
                props: {
                    candidates: testCandidates,
                }
            });
            expect(wrapper.exists()).toBe(true);
            const mainInputAutocomplete = wrapper.getComponent(Input);
            const input = mainInputAutocomplete.get('[data-test="main-input"]');
            const resultsList = wrapper.find('#autocomplete-result-list-v-0');

            //List should exist but not be visible since there is nothing within the input

            expect(resultsList.exists()).toBe(true);
            expect(resultsList.isVisible()).toBe(false);

            await input.setValue(text);

             //List should now be visible since it was interacted with

            expect(resultsList.isVisible()).toBe(true);

            const [result1, result2, result3] = wrapper.findAll('.autocomplete-result');
            const [resultText1, resultText2, resultText3] = [result1.text(), result2.text(), result3.text()];

            //Make sure every element in the list is correct

            expect(result1.exists()).toBe(true);
            expect(result2.exists()).toBe(true);
            expect(result3.exists()).toBe(true);

            expect(resultText1).toEqual(testCandidates[0]);
            expect(resultText2).toEqual(testCandidates[1]);
            expect(resultText3).toEqual(testCandidates[2]);

            //Change value in input

            await input.setValue(text.concat('2'));

            const results = wrapper.findAll('.autocomplete-result');

            //Make sure new values are correct

            expect(results.length).toBe(1);

            expect(results[0].text()).toEqual(testCandidates[1]);

            //Select one value from autocomplete list

            await input.trigger('blur');

            expect(wrapper.emitted('blur')).toHaveLength(1);

            await wrapper.setProps({ value: text });

            expect(mainInputAutocomplete.props('value')).toBe(text);
        });
    });

    //Outputs

    describe("DOM Elements", () => {
        test("InputAutocomplete", () => {
            wrapper = mount(InputAutocomplete, {
                global: {
                    components: {
                        KInput: Input
                    }
                }
            });
            expect(wrapper.exists()).toBe(true);
            expect(wrapper.find('[data-test="main-input"]').exists()).toBe(true);
        });

        test("Icon", async () => {
            const testIcon = "arrow-right";
            wrapper = mount(InputAutocomplete, {
                global: {
                    components: {
                        KInput: Input
                    },
                    stubs: {
                        FontAwesomeIcon: true
                    }
                }
            });
            expect(wrapper.exists()).toBe(true);

            expect(wrapper.find('[data-test="main-icon"]').exists()).toBe(false);

            await wrapper.setProps({ icon: testIcon });

            expect(wrapper.find('[data-test="main-icon"]').exists()).toBe(true);

            const icon = wrapper.get('[data-test="main-icon"]');

            expect(icon.attributes('icon')).toBe(testIcon);
        });

        test("InputAutocomplete List Visibility", async () => {
            const text = 'test';
            const testCandidates = ['test1', 'test2', 'test3'];
            wrapper = mount(InputAutocomplete, {
                attachTo: document.body,
                global: {
                    components: {
                        KInput: Input
                    }
                },
                props: {
                    candidates: testCandidates,
                }
            });
            expect(wrapper.exists()).toBe(true);
            const mainInputAutocomplete = wrapper.getComponent(Input);
            const input = mainInputAutocomplete.get('[data-test="main-input"]');
            const resultsList = wrapper.find('#autocomplete-result-list-v-0');

            expect(resultsList.exists()).toBe(true);
            expect(resultsList.isVisible()).toBe(false);

            await input.setValue(text);

            expect(resultsList.isVisible()).toBe(true);

            await input.setValue(text.concat('4'));

            expect(resultsList.isVisible()).toBe(false);

            await input.setValue('');

            expect(resultsList.isVisible()).toBe(false);
        });

        test("InputAutocomplete List Elements/Results", async () => {
            const text = 'test';
            const testCandidates = ['test1', 'test2', 'test3'];
            wrapper = mount(InputAutocomplete, {
                attachTo: document.body,
                global: {
                    components: {
                        KInput: Input
                    }
                },
                props: {
                    candidates: testCandidates,
                }
            });
            expect(wrapper.exists()).toBe(true);
            const mainInputAutocomplete = wrapper.getComponent(Input);
            const input = mainInputAutocomplete.get('[data-test="main-input"]');

            await input.setValue(text);

            const [result1, result2, result3] = wrapper.findAll('.autocomplete-result');
            const [resultText1, resultText2, resultText3] = [result1.text(), result2.text(), result3.text()];

            expect(result1.exists()).toBe(true);
            expect(result2.exists()).toBe(true);
            expect(result3.exists()).toBe(true);

            expect(resultText1).toEqual(testCandidates[0]);
            expect(resultText2).toEqual(testCandidates[1]);
            expect(resultText3).toEqual(testCandidates[2]);

            await input.setValue(text.concat('2'));

            const results = wrapper.findAll('.autocomplete-result');

            expect(results.length).toBe(1);

            expect(results[0].text()).toEqual(testCandidates[1]);

            await input.setValue(text.concat('4'));

            const results2 = wrapper.findAll('.autocomplete-result');

            expect(results2.length).toBe(0);
        });
    });

    describe("Emits", () => {
        test("Emit InputAutocomplete Value", async () => {
            const text = 'test';
            const testCandidates = ['test1', 'test2', 'test3'];
            wrapper = mount(InputAutocomplete, {
                global: {
                    components: {
                        KInput: Input
                    }
                },
                props: {
                    candidates: testCandidates
                }
            });
            expect(wrapper.exists()).toBe(true);
            const mainInputAutocomplete = wrapper.getComponent(Input);
            const input = mainInputAutocomplete.get('[data-test="main-input"]');

            await input.setValue(text);

            expect(wrapper.emitted('update:value')).toHaveLength(1);
            expect(wrapper.emitted('update:value')[0]).toEqual([text]);
        });

        test("Emit InputAutocomplete Focus", async () => {
            const text = 'test';
            const testCandidates = ['test1', 'test2', 'test3'];
            wrapper = mount(InputAutocomplete, {
                global: {
                    components: {
                        KInput: Input
                    }
                },
                props: {
                    candidates: testCandidates
                }
            });
            expect(wrapper.exists()).toBe(true);
            const mainInputAutocomplete = wrapper.getComponent(Input);
            const input = mainInputAutocomplete.get('[data-test="main-input"]');

            input.element.value = text
            await input.trigger('focus');

            expect(wrapper.emitted('focus')).toHaveLength(1);
        });

        test("Emit InputAutocomplete Blur", async () => {
            const text = 'test';
            const testCandidates = ['test1', 'test2', 'test3'];
            wrapper = mount(InputAutocomplete, {
                global: {
                    components: {
                        KInput: Input
                    }
                },
                props: {
                    candidates: testCandidates
                }
            });
            expect(wrapper.exists()).toBe(true);
            const mainInputAutocomplete = wrapper.getComponent(Input);
            const input = mainInputAutocomplete.get('[data-test="main-input"]');

            await input.setValue(text);
            await input.trigger('blur', text);

            expect(wrapper.emitted('blur')).toHaveLength(1);
        });

        test("Emit InputAutocomplete Send-Message", async () => {
            const text = 'test';
            const testCandidates = ['test1', 'test2', 'test3'];
            wrapper = mount(InputAutocomplete, {
                global: {
                    components: {
                        KInput: Input
                    }
                },
                props: {
                    candidates: testCandidates
                }
            });
            expect(wrapper.exists()).toBe(true);
            const mainInputAutocomplete = wrapper.getComponent(Input);
            const input = mainInputAutocomplete.get('[data-test="main-input"]');

            await input.setValue(text);

            expect(wrapper.emitted('send-message')).toHaveLength(1);
            expect(wrapper.emitted('update:value')[0]).toEqual([text]);
        });
    });

    //V-Model

    describe("V-Models", () => {
        test("V-Model Value", async () => {
            const text = 'test';
            const testCandidates = ['test1', 'test2', 'test3'];
            wrapper = mount(InputAutocomplete, {
                global: {
                    components: {
                        KInput: Input
                    }
                },
                props: {
                    candidates: testCandidates,
                    value: 'initialText',
                    'onUpdate:value': (e) => wrapper.setProps({ value: e })
                }
            });
            const mainInputAutocomplete = wrapper.getComponent(Input);
            const input = mainInputAutocomplete.get('[data-test="main-input"]');

            await input.setValue(text);

            expect(wrapper.props('value')).toBe(text);
            });
    });
});