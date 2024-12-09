<template>
   <label :class="{[customClass]: true, 'k-select': true, 'no-compact': true}">
    <div class="k-select__title">
      <icon v-if="icon && iconName"  :icon="iconName"></icon>
      {{title}}
    </div>
    <select class="k-select__select" v-model="selected" @change.prevent="emitEvent"  multiple>
      <option v-for="item in options" :value="item.value">
        {{item.description}} 
      </option>
    </select>
   </label>
</template>

<script>
import KytosBase from '../base/KytosBase';
import KytosBaseWithIcon from '../base/KytosBaseWithIcon';

/**
 * This component is a form control and can be used to collect the selected user
 * input from a list of options.
 *
 * @example <k-select icon="link" title="Undesired links:" :options="get_links" :value.sync ="undesired_links"></k-select>
 * @example /_static/imgs/components/input/k-select.png
 * 
 */

export default {
  name: 'k-select',
  mixins: [KytosBaseWithIcon],
  props: {
    value: {
        type: Array
    },
    options: {
      type: Array,
      required: true
    },
    event: {
      type: Object,
      default: undefined
    },
    action: {
      type: Function,
      default: function (value) { return }
    },
    /**
    * Custom CSS Classes
    */
    customClass: {
      type: String,
      default: ""
    }
  },
  data () {
    return {
      selected: []
    }
  },
  methods: {
    emitEvent () {
      if (this.event !== undefined){
        let content = this.event.content
        content.value = this.selected
        this.$kytos.eventBus.$emit(this.event.name, content)
      }
      this.$emit('update:value', this.selected)
      this.action(this.selected)
    },
    clear () {
      this.selected = [];
    }
  },
  beforeMount () {
    // Initialize the selected values with the :value.sync property
    if(this.value) {
      let _selected = [];
      this.value.forEach((item) => {
        if(!this.selected.includes(item)) {
          _selected.push(item);
        }
      });
      this.selected = _selected;
    }
  },
  watch: {
    selected () {
      this.emitEvent();
    },
  }
}
</script>

<style lang="sass">

@import '../../../assets/styles/variables'

.k-select
 position: relative
 display: block
 width: 100%
 padding: 0px
 margin: 5px 0px
 font-size: 0.8em
 color: $fill-text

 &:hover svg
  fill: $fill-icon-h
  color: $fill-icon-h

  .k-select__title
   padding-bottom: 2px
   padding-left: 3px
   padding-top: 0px

  .k-select__select
   margin-left: 5px
   width: 130px
   max-width: 130px
   height: 100%

.k-select__title
 padding-bottom: 10px
 padding-top: 5px
 padding-left: 10px
 position: relative

 svg
  fill: $fill-icon
  color: $fill-icon
  margin-right: 5px

.k-select__select
 font-size: 1em
 background: $fill-input-bg
 color: $fill-text
 border: none
 outline: 0
 display: block
 cursor: pointer
 width: 100%
 max-width: 100%
 height: 80px
 overflow: auto
 overflow-y: auto
 overflow-x: hidden
 padding: 0px

 &:nth-child(odd)
  background-color: $fill-button-bg

 &:nth-child(even)
  background-color: $fill-button-bg

 &:hover *
  color: $fill-shortkey
  background-color: $fill-button-bg-h
</style>
