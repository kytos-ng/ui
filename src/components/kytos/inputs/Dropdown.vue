<template>
   <label class="k-dropdown" v-bind:class="{'no-title' : !title  }">
    <div class="k-dropdown__title">
      <icon v-if="icon && iconName" :icon="iconName" data-test="main-icon"></icon>
      {{title}}
    </div>
    <select class="k-dropdown__select" v-model="selected" @change.prevent="emitEvent" data-test="main-dropdown">
      <option v-for="item in options"
              :value="item.value" :key="item.value">{{item.description}}</option>
    </select>
   </label>
</template>

<script>
import KytosBase from '../base/KytosBase';
import KytosBaseWithIcon from '../base/KytosBaseWithIcon';

/**
* A toggleable menu that allows the user to choose one value from a predefined list.
*
* @example k-dropdown title="Switch Labels:" icon="circle" :options="switchLabels" :event="{name: 'topology-toggle-label', content: {node_type: 'switch'}}"></k-dropdown>
* @example /_static/imgs/components/input/k-dropdown.png
*/

export default {
 name: 'k-dropdown',
 mixins: [KytosBaseWithIcon],
 emits: {
  'update:value': (value) => {
      if (typeof value === 'string' || value instanceof String || typeof value === 'boolean' || value instanceof Boolean ) {
        return true
      } else {
        console.warn('Invalid update:value event payload!')
        return false
      }
    }
  },
 props: {
   /**
    * Property with the selected option.
    */
   value:{
     type: [String, Boolean],
     default: ""
   },
   /**
    * A collection with all options that could be selected.
    * Within the array of options you can add a property to one of the objects called selected.
    * If set to true, this will select the option by default.
    * [{value: "testVal1", description: "testDesc1"},
        {value: "testVal2", description: "testDesc2", selected: true}]
    */
   options: {
     type: Array,
     required: true
   },
   /**
    * An event triggered when the dropdown change, this event should have the
    * following content: {**name**: 'event_name', **content**: {} }
    */
   event: {
     type: Object,
     default: undefined
   },
   /**
    * Optinal action called after select a dropdown option.
    */
   action: {
     type: Function,
     default: function (value) { return }
   }
 },
 data () {
   return {
     selected: ''
   }
 },
 methods: {
   emitEvent () {
     if (this.event){
       let content = this.event.content
       content.value = this.selected
       this.$kytos.eventBus.$emit(this.event.name, content)
     }
     this.$emit('update:value', this.selected)
     this.action(this.selected)
   },
   clear () {
     this.selected = '';
   },
   reset () {
     this.selected = '';
     if(this.options && this.options.length > 0) {
       this.options.forEach((item) => {
         if (this.selected == '' && item.selected) {this.selected = item.value}
       })
     }
   }
 },
 mounted () {
   this.options.forEach((item) => {
     if (this.selected == '' && item.selected) {this.selected = item.value}
   })
 },
 watch: {
   selected () {
     this.emitEvent()
   },
   options () {
     this.options.forEach((item) => {
       if (this.selected == '' && item.selected) {this.selected = item.value }
     })
   },
   value () {
    this.selected = this.value;
   }
 }
}
</script>

<style lang="sass">

@use '../../../assets/styles/dark-theme-variables'

.k-dropdown
 position: relative
 display: block
 width: 100%
 padding: 0px
 margin: 5px 0px
 font-size: 0.8em
 color: dark-theme-variables.$fill-text

 &:hover svg
  fill: dark-theme-variables.$fill-icon-h

 &:before
  content: '◂▸'
  font: 11px monospace
  line-height: 18px
  color: dark-theme-variables.$fill-icon
  -webkit-transform: rotate(90deg)
  -moz-transform: rotate(90deg)
  -ms-transform: rotate(90deg)
  transform: rotate(90deg)
  opacity: 0.7
  right: 0px
  bottom: 0px
  padding: 0px
  margin: 0px
  -webkit-margin-end: 3px
  border-bottom: 1px solid dark-theme-variables.$fill-icon
  position: absolute
  pointer-events: none
  display: block

 &.inline
  position: relative
  margin-left: 15px
  display: -webkit-flex
  display: flex
  -webkit-align-items: center
  align-items: center
  min-width: 140px
  overflow: hidden

  .k-dropdown__title
   padding-bottom: 2px
   padding-left: 3px
   padding-top: 0px

  .k-dropdown__select
   margin-left: 5px
   width: 130px
   max-width: 130px

  &:before
   background: dark-theme-variables.$fill-input-bg
   width: 20px
   height: 20px
   text-align: center
   top: 4.5px

 &.no-title
  display: inline-flex
  height: 20px
  margin: 5px 0px
  .k-dropdown__title
   padding: 3px

.k-dropdown__title
 padding-bottom: 10px
 padding-top: 5px
 padding-left: 10px
 position: relative

 svg
  fill: dark-theme-variables.$fill-icon
  margin-right: 5px

.k-dropdown__select
 -webkit-appearance: none
 -moz-appearance: none
 appearance: none
 font-size: 1em
 padding-left: 3px
 -webkit-padding-start: 5px
 padding-right: 20px
 margin: 0
 margin-right: -20px
 -webkit-border-radius: 3px
 -moz-border-radius: 3px
 border-radius: 3px
 background: dark-theme-variables.$fill-input-bg
 color: dark-theme-variables.$fill-text
 border: none
 outline: 0
 display: inline-block
 cursor: pointer
 width: 100%
 max-width: 100%
 height: 20px

 &:active,
 &:hover
  box-shadow: 0 0 10px 10px rgba(0,0,0,0.2) inset
  outline: 0
  color: dark-theme-variables.$fill-text-h

 option:focus,
 option:hover
  box-shadow: 0 0 10px 10px rgba(0,0,0,0.5) inset

.compacted
 .k-dropdown
  display: inline-flex
  min-width: 100px
  max-width: 400px
  margin-top: 7px
  margin-right: 5px
  margin-left: 2px

  &.no-title
   svg
    margin-left: -3px
    margin-top: 2px
   &:before
    bottom: -2px

 .k-dropdown__title
  visibility: hidden
  width: 12px

  svg
   visibility: visible
   margin-left: -8px

 .k-dropdown__select
  margin-top: 3px
  margin-right: 2px

</style>