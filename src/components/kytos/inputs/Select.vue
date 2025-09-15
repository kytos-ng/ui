<template>
   <label class="k-select no-compact">
    <div v-if="title" class="k-select__title">
      <icon v-if="icon && iconName"  :icon="iconName" data-test="main-icon"></icon>
      {{title}}
    </div>
    <div class="input_filter" v-if="enable_filter">
      <input v-model="filter_text"></input>
    </div>
    <select class="k-select__select" v-model="selected" @change="emitEvent" multiple data-test="main-select">
      <option :class="isAMatch(item)" v-for="item in options" :value="item.value" :key="item.value">
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
  emits: {
    'update:value': (value) => {
      if (Array.isArray(value)) {
        return true;
      } else {
        console.warn('Invalid update:value event payload!');
        return false;
      }
    }
  },
  props: {
    value: {
      type: Array
    },
    options: {
      type: Array,
      required: true
    },
    action: {
      type: Function,
      default: function (value) { return }
    },
    title: {
      type: String,
      required: false,
    },
    enable_filter: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data () {
    return {
      selected: [],
      filter_text: "",
    }
  },
  methods: {
    emitEvent () {
      this.$emit('update:value', this.selected)
      this.action(this.selected)
    },
    clear () {
      this.selected = [];
    },
    isAMatch (option) {
      if (this.filter_text) {
        if (option.description.toUpperCase().includes(this.filter_text.toUpperCase())) {
          return "matched";
        }
        return "not_matched";
      }
      return "no_filter";
    },
  },
  beforeMount () {
    // Initialize the selected values with the v-model:value property
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

@use '../../../assets/styles/dark-theme-variables'

.k-select
 position: relative
 display: block
 width: 100%
 padding: 0px
 margin: 5px 0px
 font-size: 0.8em
 color: dark-theme-variables.$fill-text

.k-select .input_filter input
 background: lightgray
 border-radius: 3px
 font-size: 0.9em
 width: 99.5%

 &:hover svg
  fill: dark-theme-variables.$fill-icon-h
  color: dark-theme-variables.$fill-icon-h

  .k-select__title
   padding-bottom: 2px
   padding-left: 3px
   padding-top: 0px

.k-select__title
 padding-bottom: 10px
 padding-top: 5px
 padding-left: 10px
 position: relative

 svg
  fill: dark-theme-variables.$fill-icon
  color: dark-theme-variables.$fill-icon
  margin-right: 5px

.k-select__select
 font-size: 1em
 background: dark-theme-variables.$fill-input-bg
 color: dark-theme-variables.$fill-text
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
  background-color: dark-theme-variables.$fill-button-bg

 &:nth-child(even)
  background-color: dark-theme-variables.$fill-button-bg

 &:hover *
  color: dark-theme-variables.$fill-shortkey

.k-select__select option.not_matched
 display: none
</style>
