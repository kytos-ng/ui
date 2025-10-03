<template>
  <div class="k-slider">
    <icon v-if="icon && iconName" :icon="iconName" data-test="main-icon"></icon>
    <span class="range-slider__value">{{value}}</span>
    <input @input="doRange" :id="id" class="k-slider__range" type="range" v-model.number="value" :min="min" :max="max" :step="step" data-test="main-slider">
  </div>
</template>

<script>
import KytosBase from '../base/KytosBase';
import KytosBaseWithIcon from '../base/KytosBaseWithIcon';

/**
 * A GUI widget that allows the users specify a numeric value which must be no less than a given value, and no more than another given value.
 *
 * @example <k-slider icon="adjust" :initial-value="mapOpacity" :action="emitMapOpacity"></k-slider>
 * @example /_static/imgs/components/input/k-slider.png
 */

export default {
  name: 'k-slider',
  mixins: [KytosBaseWithIcon],
  props: {
    /**
     * Initial value assigned to slider input.
     */
    initialValue: {
      type: Number,
      default: 0
    },
    /**
     * Optinal action called after change the range of slider input.
     */
    action: {
      type: Function,
      default: function (val) { return }
    },
    /**
     * Minimum value assigned to slider input.
     */
    min: {
      type: Number,
      default: 0
    },
    /**
     * Maximum value assigned to slider input.
     */
    max: {
      type: Number,
      default: 100
    },
    /**
     * The minimum change when the slider increase or decrease.
     */
    step: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {value: this.initialValue}
  },
  methods: {
    doRange () {
      this.action(this.value)
    }
  }
}
</script>

<style lang="sass">

@use '../../../assets/styles/dark-theme-variables'

.k-slider
  width: 100%
  padding: 5px
  border-radius: 5px
  overflow: hidden
  display: inline-flex
  cursor: default
  color: dark-theme-variables.$fill-text

  svg
   margin-right: 7px
   margin-top: 3px
   width: 20px
   fill: dark-theme-variables.$fill-icon
   color: dark-theme-variables.$fill-icon

  &:hover svg
    fill: dark-theme-variables.$fill-icon-h
    color: dark-theme-variables.$fill-icon-h

.range-slider__value
  font-size: 10px
  order: 3
  width: 40px
  margin-left: 3px
  padding-top: 5px
  text-align: left
  display: block
  float: right

.k-slider__range
  -webkit-appearance: none
  width: 100%
  border: none
  background-color: transparent
  outline: 0
  order: 2
  margin: 0px
  padding: 0px
  cursor: pointer

  &[type=range]
   &::-moz-range-track
    width: 100%
    height: 5px
    border-radius: 3px
    background: dark-theme-variables.$fill-input-bg

   &::-moz-range-progress
    background-color: dark-theme-variables.$fill-link-h
    border: 1px solid dark-theme-variables.$fill-link-h
    border-radius: 5px

   &::-moz-range-thumb
    height: 10px
    width: 10px
    border-radius: 50%
    border: none
    background: dark-theme-variables.$fill-icon

   &:hover::-moz-range-thumb
    background: dark-theme-variables.$fill-icon-h

   &::-webkit-slider-runnable-track
    height: 5px
    width: 100%
    border: none
    border-radius: 3px
    background: dark-theme-variables.$fill-input-bg

   &::-webkit-slider-thumb
    -webkit-appearance: none
    height: 12px
    width: 12px
    margin-top: -3px
    border-radius: 50%
    background: dark-theme-variables.$fill-icon

   &:hover::-webkit-slider-thumb
    background: dark-theme-variables.$fill-icon-h
    border: 1px solid dark-theme-variables.$fill-input-bg

   &:focus
    outline: 0

.compacted
 .k-slider
  align-self: center

</style>