<template>
 <div class="container">
   <section class="k-menu-bar">
     <span  v-for="item in keymap"  v-hotkey="item" v-show="false"></span>
     <div class="logo" @click="toggle" v-bind:class="{ compacted: compacted  }" data-test="logo">
       <div class="logo-wrapper" v-show="!compacted">
         <img src="../../../assets/kytosng_logo_white.svg" class="logo-kytos" alt="Kytos">
         <div id="kytos-version">v{{version}}</div>
       </div>
       <img v-show="compacted" src="../../../assets/kytosng_icon_white.svg" class="icon-kytos" alt="Kytos">
     </div>
     <k-button v-for="(component, index) in toolbarItemsList"
               :class="{ active: activeItem==(index+1) }"
               :key="component.name"
               :icon="component.icon"
               :tooltip="component.tooltip"
               @click="setItem(index+1)"/>
   </section>
   <k-toolbar :active="activeItem" :compacted="compacted"></k-toolbar>
 </div>
</template>

<script>
import KytosBase from '../base/KytosBase'
import KytosBaseWithIcon from '../base/KytosBaseWithIcon'
import { useNappStore } from '../../../stores/nappStore'
import { mapState } from 'pinia'

export default {
  name: 'k-menu-bar',
  mixins: [KytosBaseWithIcon],
  props: ['toggle', 'compacted'],
  data() {
    return {
      version: this.$kytos_version,
      activeItem: 1
    }
  },
  methods: {
    toggleLabel (type, label) {
      this.$kytos.eventBus.$emit('topology-toggle-label', type, label)
    },
    setItem (item) {
      this.$kytos.eventBus.$emit("hideInfoPanel")
      this.activeItem = item
    },
  },
  computed: {
    keymap () {
      var self = this
      var keys = []
      for (let component in this.toolbarItemsList) {
        let componentNumber = Number(component) + 1
        let currentKey = 'ctrl+shift+' + componentNumber
        let keyObject = {}
        keyObject[currentKey] = function() {
          self.activeItem = componentNumber
        }
        keys.push(keyObject)
      }
      return keys
    },
    ...mapState(useNappStore, ['toolbarItems', 'toolbarItemsList'])
  },
  mounted() {
    //Register additional toolbarItems
    this.toolbarItems['mapbox-settings'] = {name: 'mapbox-settings'};
    this.toolbarItems['k-status-menu'] = {name: 'k-status-menu'};
  }
}
</script>

<style lang="sass">

@use '../../../assets/styles/dark-theme-variables'

.k-menu-bar
 -webkit-order: 1
 -ms-flex-order: 1
 order: 1
 z-index: 998
 width: 40px
 height: 100vh
 background: dark-theme-variables.$fill-menubar
 box-shadow: 0px 0px 10px dark-theme-variables.$fill-panel

 .logo
    padding: 0
    margin: 0
    display: block
    height: 30px
    width: 280px
    vertical-align: middle
    padding: 3px 0px 7px 0px
    background: dark-theme-variables.$kytos-gradient
    cursor: pointer
    text-align: center
 
 .logo-wrapper
   width: 15em

   .logo-kytos
     height: 1.5em
     position: relative
     top: 4px
    
 .icon-kytos
   height: 1.5em
   position: relative
   top: 4px

 .k-menu-bar
   box-shadow: none

.k-menu-bar

 .k-button
  width: 40px
  height: 40px
  margin: 0px
  padding: 0px
  background: dark-theme-variables.$fill-menubar

  > svg
   vertical-align: middle
   height: 20px
   width: 23px
   padding: 10px 9px 10px 5px
   cursor: pointer
   fill: dark-theme-variables.$fill-icon
   color: dark-theme-variables.$fill-icon
   border-left: 3px solid transparent

  &:hover
   fill: dark-theme-variables.$fill-icon-h
   color: dark-theme-variables.$fill-icon-h
   border-color: dark-theme-variables.$fill-menubar-b
   background: dark-theme-variables.$fill-menubar-b

  &::-moz-focus-inner
   border: 0

  &.active
   background: dark-theme-variables.$fill-panel
   border-color: dark-theme-variables.$fill-menubar-b

   > svg
    border-left: 3px solid dark-theme-variables.$fill-link-h

.compacted
 .k-menu-bar
  .logo
   width: 40px

#kytos-version
 font-size: 0.5em
 color: dark-theme-variables.$kytos-dark-white
 margin: 0 auto
 position: absolute
 top: 25px
 left: 175px
 font-weight: bold

</style>
