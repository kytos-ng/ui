<template>
  <button :id="id" class="k-button compact"
    @click="handleClick"
    v-bind:title="tooltip"
    v-bind:disabled="isDisabled"
    data-test="main-button">
      <icon v-if="icon && iconName" :icon="iconName" data-test="main-icon"></icon>
      {{title}}
  </button>
</template>
<script>
import KytosBase from '../../base/KytosBase';
import KytosBaseWithIcon from '../../base/KytosBaseWithIcon';

/**
 * This component represents a button that triggers an event when clicked.
 * @example <k-button tooltip="Request Circuit" title="Request Circuit" icon="cog" :action="request_circuit" @click="on_click"></k-button>
 * @example /_static/imgs/components/input/k-button.png
 */

export default {
  name: 'k-button',
  mixins: [KytosBaseWithIcon],
  emits: ['click'],
  props: {
  /**
   * Tooltip string for the input.
   */
   tooltip: {
      type: String
   },
   /**
    * If true disables the input functionality of the input component (used for display purposes).
    */
   isDisabled: {
      type: Boolean,
      default: false
   }
  },
  methods: {
     /**
     * Call click event.
     *
     * @public
     * @param {object} event trigged event
     */
    handleClick(event){
      this.$emit('click', event.target.value); 
    },
  }
}
</script>

<style lang="sass">

@use '../../../../assets/styles/dark-theme-variables'

.k-button
  display: block
  outline: 0
  border: none
  min-width: 25px
  height: 28px
  overflow: hidden
  margin: 2px
  text-align: center
  cursor: Pointer
  padding: 2px 5px
  transition: 0.3s
  color: dark-theme-variables.$fill-button
  background: dark-theme-variables.$fill-button-bg

  svg
   padding: 0 2px
   margin-top: -1px

  &:hover
   color: dark-theme-variables.$fill-button-hover
   background: dark-theme-variables.$fill-button-bg-h

   &> svg
    fill: dark-theme-variables.$fill-icon-h
    color: dark-theme-variables.$fill-icon-h
    outline: 0

  &.active
   & > svg
     fill: dark-theme-variables.$fill-icon-h
     color: dark-theme-variables.$fill-icon-h
     outline: 0

  & > svg
   vertical-align: middle
   fill: dark-theme-variables.$fill-icon
   color: dark-theme-variables.$fill-icon
   outline: 0

.k-toolbar

 .k-button
   border-radius: 2px
   font-size: 0.9em

   &:hover
    box-shadow: 0 0 2px dark-theme-variables.$fill-bar

   &:disabled
    opacity: 0.5
    cursor: default

</style>
