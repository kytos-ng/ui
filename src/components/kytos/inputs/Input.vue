<template>
  <div class="k-input-wrap">
    <icon v-if="icon && iconName" :icon="iconName" data-test="main-icon"></icon>
    <input :value="value" class="k-input" :title="tooltip" :placeholder="placeholder"
      @input="updateText"
      ref="inputValue"
      v-bind="$attrs"
      v-bind:disabled="isDisabled" onshow="this.focus()" autofocus 
      data-test="main-input"
      @keypress="filterKey($event)"/>
  </div>
</template>

<script>
import KytosBase from '../base/KytosBase';
import KytosBaseWithIcon from '../base/KytosBaseWithIcon';

/**
 * An input field where the user can enter data.
 *
 * @example /_static/imgs/components/input/k-input.png
 */

export default {
  name: 'k-input',
  inheritAttrs: false,
  mixins: [KytosBaseWithIcon],
  props: {
   /**
    * The value to input button.
    */
   value: {
      default: "",
      type: String
   },
   /*
   * Tooltip string for the input.
   */
   tooltip: {
      type: String
   },
   /**
   * Placeholder string displayed in input field.
   */
   placeholder: {
      type: String
   },
   /**
    * If true disables the input functionality of the input component (used for display purposes).
    */
   isDisabled: {
      type: Boolean,
      default: false
   },
   /**
   * Function called after input changes.
   */
   action: {
      type: Function,
      default: function(val) {return}
   },
   only_digits: {
      type: Boolean,
      default: false,
      required: false,
   },
  },
  emits: {
    'update:value': (value) => {
      if (typeof value === 'string' || value instanceof String) {
        return true
      } else {
        console.warn('Invalid update:value event payload!')
        return false
      }
    }
  },
  methods: {
    updateText(){
      this.$emit('update:value', this.$refs.inputValue.value)
      this.action(this.$refs.inputValue.value)
    },
    filterKey: function(event) {
      if (this.only_digits && !/^[0-9]$/.test(event.key) ) {
        // If Digits only allowed, prevent non-digit input
        event.preventDefault();
      };
    },
  }
}
</script>

<style lang="sass">

@use '../../../assets/styles/dark-theme-variables'

.k-input-wrap
 border: 1px solid dark-theme-variables.$fill-input-bg
 border-radius: 0.2em
 background: dark-theme-variables.$fill-input-bg
 display: flex
 margin: 5px 0
 flex-direction: row

 &:hover
  border-color: dark-theme-variables.$fill-input-content
  background: dark-theme-variables.$fill-input-content

  input, svg
   background: dark-theme-variables.$fill-input-content
   fill: dark-theme-variables.$fill-icon-h
   color: dark-theme-variables.$fill-icon-h

 svg
  fill: dark-theme-variables.$fill-icon
  color: dark-theme-variables.$fill-icon
  padding: 0.3em 0.5em

.k-input
 padding: 0.2em
 border: none
 border-radius: 0.2em
 outline: none
 background: dark-theme-variables.$fill-input-bg
 color: dark-theme-variables.$fill-input
 font-size: 0.8em
 flex: 1

 &:focus
  border-color: dark-theme-variables.$fill-input-hover

 &:hover
  border-color: dark-theme-variables.$fill-input-hover
  color: dark-theme-variables.$fill-text
  background: dark-theme-variables.$fill-input-content

.compacted
 .k-input-wrap
   margin: 2px 5px

</style>
