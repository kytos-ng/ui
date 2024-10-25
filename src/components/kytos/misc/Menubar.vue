<template>
 <div class="container">
   <section class="k-menu-bar">
     <span  v-for="item in keymap"  v-hotkey="item" v-show="false"></span>
     <div class="logo" @click="toggle" v-bind:class="{ compacted: compacted  }">
       <div class="logo-wrapper" v-show="!compacted">
         <img src="../../../assets/kytosng_logo_white.svg" class="logo-kytos" alt="Kytos">
         <div id="kytos-version">v{{version}}</div>
       </div>
       <img v-show="compacted" src="../../../assets/kytosng_icon_white.svg" class="icon-kytos" alt="Kytos">
     </div>
     <k-button v-for="(component, index) in components"
               :class="{ active: activeItem==(index+1) }"
               :key="component.name"
               :icon="component.icon"
               :tooltip="component.tooltip"
               @click="setItem(index+1)"/>
   </section>
   <k-toolbar :active="activeItem" v-model:components="components" :compacted="compacted"></k-toolbar>
 </div>
</template>

<script>
import KytosBase from '../base/KytosBase'
import KytosBaseWithIcon from '../base/KytosBaseWithIcon'

export default {
  name: 'k-menu-bar',
  mixins: [KytosBaseWithIcon],
  props: ['toggle', 'compacted'],
  data() {
    return {
      version: this.$kytos_version,
      components: [{'icon': 'desktop', 'name':'mapbox-settings'}, {'icon': 'signal', 'name': 'k-status-menu'}],
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
      $(".k-toolbar").show();

      this.$nextTick(function () {
      // DOM is now updated
        $(".k-toolbar .k-menu-item").not(":hidden").each(function() {
            $(this).each(function(){
                if ($(this).find(".compact").length == 0){
                    $(".compacted .k-toolbar").css("display","none");
                }
            });
        });
      });
    },
  },
  computed: {
    keymap () {
      var self = this
      var keys = []
      for (let component in self.components) {
        let componentNumber = Number(component) + 1
        let currentKey = 'ctrl+shift+' + componentNumber
        let keyObject = {}
        keyObject[currentKey] = function() {
          self.activeItem = componentNumber
          $(".k-toolbar").show();

          self.$nextTick(function () {
            $(".k-toolbar .k-menu-item").not(":hidden").each(function() {
                $(self).each(function(){
                    if ($(self).find(".compact").length == 0){
                        $(".compacted .k-toolbar").css("display","none");
                    }
                });
            });
          });
        }
        keys.push(keyObject)
      }
      return keys
    }
  }
}
</script>

<style lang="sass">

@import '../../../assets/styles/variables'

.k-menu-bar
 -webkit-order: 1
 -ms-flex-order: 1
 order: 1
 z-index: 998
 width: 40px
 height: 100vh
 background: $fill-menubar
 box-shadow: 0px 0px 10px $fill-panel

 .logo
    padding: 0
    margin: 0
    display: block
    height: 30px
    width: 280px
    vertical-align: middle
    padding: 3px 0px 7px 0px
    background: $kytos-gradient
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
  background: $fill-menubar

  > svg
   vertical-align: middle
   height: 20px
   width: 23px
   padding: 10px 9px 10px 5px
   cursor: pointer
   fill: $fill-icon
   color: $fill-icon
   border-left: 3px solid transparent

  &:hover
   fill: $fill-icon-h
   color: $fill-icon-h
   border-color: $fill-menubar-b
   background: $fill-menubar-b

  &::-moz-focus-inner
   border: 0

  &.active
   background: $fill-panel
   border-color: $fill-menubar-b

   > svg
    border-left: 3px solid $fill-link-h

.compacted
 .k-menu-bar
  .logo
   width: 40px

#kytos-version
 font-size: 0.5em
 color: $kytos-dark-white
 margin: 0 auto
 position: absolute
 top: 25px
 left: 175px
 font-weight: bold

</style>
