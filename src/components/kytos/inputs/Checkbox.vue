<template>
  <div class="k-checkbox-wrap">
  <icon v-if="icon && iconName" :icon="iconName"></icon>
  <label class="checkbox">
    <input type="checkbox" id="checkbox" v-model="enabled" @change="update_check()">
    <span class="slider"></span>
  </label>
  {{title}}
  </div>
</template>

<script>
import KytosBase from '../base/KytosBase';
import KytosBaseWithIcon from '../base/KytosBaseWithIcon';

/**
 * A GUI widget that permits the user to make a binary choice, checked (ticked) when activated or not checked when disable.
 *
 * @example /_static/imgs/components/input/k-checkbox.png
 */

export default {
  name: 'k-checkbox',
  mixins: [KytosBaseWithIcon],
  props: {
      /**
       * Model store the checked values.
       */
      model: {
        type: Array,
      },
      /**
       * The value to checkbox button.
       */
      value: {
        default: 0
      },
      /**
       * Initial value to checkbox, when true the checkbox will be checked, otherwise unchecked.
       */
      checked: {
        type: Boolean,
        default: false
      },
      /**
       * Optinal action called after check a checkbox button.
       */
      action: {
        type: Function,
        default: function(value) { return }
      }
  },
  methods: {
    update_check(){
      if(this.enabled){
        this.list_of_checked.push(this.value)
      }else{
        this.list_of_checked.splice(this.list_of_checked.indexOf(this.value),1);
      }
      this.action(this.value)
    }
  },
  data () {
    return {
      enabled: this.checked,
      list_of_checked: this.model || []
    }
  },
  mounted () {
    $(document).ready(this.update_check)
  }
}
</script>

<style lang="sass">

@use '../../../assets/styles/dark-theme-variables'

.k-checkbox-wrap
 display: inline-flex
 align-items: center
 vertical-align: middle
 font-size: 0.8em
 min-height: 30px
 color: dark-theme-variables.$fill-text

 &:hover svg
  fill: dark-theme-variables.$fill-icon-h

 svg
  padding: 0.3em 0.5em
  fill: dark-theme-variables.$fill-icon

 .checkbox
  position: relative
  display: inline-block
  width: 14px
  height: 14px
  margin-right: 5px

 .checkbox input
  display: none

 .slider
  position: absolute
  cursor: pointer
  top: 0
  left: 0
  right: 0
  bottom: 0
  background-color: dark-theme-variables.$fill-button-bg-h
  -webkit-transition: 0.2s
  transition: 0.2s

  &:before
   line-height: 10px
   content: "✓"
   height: 10px
   width: 10px
   color: transparent
   font-size: 1px
   -webkit-transition: 0.2s
   transition: 0.2s

 input
  &:focus
   + .slider
      box-shadow: 0 0 1px dark-theme-variables.$fill-icon

  &:checked
    + .slider
      background-color: dark-theme-variables.$fill-icon-h

      &:before
        color: dark-theme-variables.$fill-icon
        font-size: 1.7em

 &.round
  .checkbox
   width: 30px

  .slider
   border-radius: 8px
   -webkit-transition: 0.4s
   transition: 0.4s

   &:before
    position: absolute
    content: ""
    height: 10px
    width: 10px
    left: 2px
    bottom: 2px
    background-color: dark-theme-variables.$fill-icon
    -webkit-transition: 0.4s
    transition: 0.4s
    border-radius: 50%

  input:checked
    + .slider:before
       -webkit-transform: translateX(14px)
       -ms-transform: translateX(14px)
       transform: translateX(14px)

.k-toolbar .k-checkbox-wrap
 background: none

</style>
