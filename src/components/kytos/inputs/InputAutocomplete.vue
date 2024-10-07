<template>
  <div class="k-input-auto-wrap" id="app">
    <autocomplete
      :search="search"
      :placeholder="placeholder"
      :aria-label="label"
      :submitOnEnter="true"
      class="autocomplete-wrap"
      @submit="handleSubmit"
    >
      <template
        #default="{
          rootProps,
          inputProps,
          inputListeners,
          resultListProps,
          resultListListeners,
          results,
          resultProps
        }"
      >
        <icon v-if="icon && iconName" :icon="iconName"></icon>
        <div v-bind="rootProps">
          <custom-input
            v-bind="inputProps"
            v-on="inputListeners"
            :class="[
              'k-input-auto',
              'autocomplete-input',
              { 'autocomplete-input-no-results': noResults },
              { 'autocomplete-input-focused': focused }
            ]"
            :id="id" 
            :value="value"
            :tooltip="tooltip"
            :placeholder="placeholder"
            @input="updateText"
            @focus="handleFocus"
            @blur="handleBlur"
          ></custom-input>
          <template v-if="noResults">
            <ul
              :class="[
                'autocomplete-result-list',
                { 'autocomplete-result-focused': focused }
              ]"
              style="position: absolute; z-index: 1; width: 100%; top: 100%;">
              <li class="autocomplete-result">
                No results found
              </li>
            </ul>
          </template>
          <template v-else>
            <ul v-bind="resultListProps" v-on="resultListListeners">
              <template v-for="(result, index) in results" :key="resultProps[index].id">
                <li v-bind="resultProps[index]">
                  {{ result }}
                </li>
              </template>
            </ul>
          </template>
        </div>
      </template>
    </autocomplete>
  </div>
</template>

<script>
/*
Autocomplete usage example.
In your template:
  <k-input-auto title="Switch Labels:" placeholder="Search DPID" icon="circle" :candidates="dpids" ></k-input-auto>

In your script component:

  mounted() { // when the Vue app is booted up, this is run automatically.
    var self = this // create a closure to access component in the callback below
    dataUrl = "/api/kytos/topology/v3/interfaces";

    fetch(dataUrl).then(response => response.json())
                  .then(data => {
                    dpids = []
                    for ( const [key,value] of Object.entries( data.interfaces ) ) {
                      dpids.push(key)
                    }
                    self.dpids = dpids
                  });
  }
*/
import Autocomplete from '@trevoreyre/autocomplete-vue'
import KytosBase from '../base/KytosBase';
import KytosBaseWithIcon from '../base/KytosBaseWithIcon';
/**
 * An input field where the user can enter data.
 *
 * @example /_static/imgs/components/input/k-input-auto.png
 */
var CustomInput = {
  props: {
    value: {
      type: String,
      default: ''
    },
    
  /**
    * The label to input button.
    */
   label: {
      type: String,
      default: ""
   },
   /**
    * Tooltip string for the input.
    */
   tooltip: {
      type: String,
      default: ""
   },
    /**
     * The id to input button.
     */
   id: {
      type: String,
      default: ""
   },
   /**
    * Placeholder string displayed in input field.
    */
   placeholder: {
      type: String,
      default: ""
   }
  }, 
  template: '<input :id="id" class="k-input" :tooltip="tooltip" ref="inputValue" :placeholder="placeholder" :value="value" v-on="$listeners" />'
}

export default {
  name: 'k-input-auto',
  mixins: [KytosBaseWithIcon],

  data: function ()  {
    return {
      sendButtonDisable : false,
      focused: false,
      results: [],
      cc: []
    }
  },
  computed: {
    noResults() {
      return this.value && this.results.length === 0
    }
  },
  props: {
   /**
    * The value to input button.
    */
   value: {
      type: String
   },
   /**
    * The label to input button.
    */
   label: {
      type: String,
      default: ""
   },
   /**
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
   * Function called after input changes.
   */
   action: {
      type: Function,
      default: function(val) {return}
   },
   candidates: {
     type: Array
   }
  },
  methods: {
    updateText(event) {
      this.$emit('update:value', event.target.value)
      this.action(event.target.value)
    },
    /**
    * Autocomplete search results
    */
    search(input) {
      //this.value = input

      if (input.length < 1) {
        this.results = []
      } else {
        this.results = this.candidates.filter(c => {
          return c.toLowerCase()
            .includes(input.toLowerCase())
        })
      }
      this.$emit('send-message', this.value);
      return this.results
    },
    handleSubmit(result) {
      // handle the autocomplete submit event when the user selects a result from the list
      this.$emit('update:value', result)
      this.action(result)
    },
    handleFocus(event) {
      this.focused = true
      // passing event to parent
      this.$emit('focus', event)
    },   
    handleBlur(event) {
      this.focused = false
      // passing event to parent
      this.$emit('blur', event)
    }
  },
  components: {
    Autocomplete,
    CustomInput
  }
}

</script>

<style lang="sass">

@import '../../../assets/styles/variables'

.k-input-auto-wrap
 border: 1px solid $fill-input-bg
 border-radius: 0.2em
 background: $fill-input-bg
 display: flex
 margin: 5px 0
 flex-direction: row

 &:hover
  border-color: $fill-input-content
  background: $fill-input-content

  input, svg
   background: $fill-input-content
   fill: $fill-icon-h
   color: $fill-icon-h

 svg
  fill: $fill-icon
  color: $fill-icon
  padding: 0.3em 0.5em

.k-input-auto
 padding: 0.5em 0 0 0
 border: none
 border-radius: 0.2em
 outline: none
 background: $fill-input-bg
 color: $fill-input
 font-size: 0.8em
 flex: 1

 &:focus
  border-color: $fill-input-hover

 &:hover
  border-color: $fill-input-hover
  color: $fill-text
  background: $fill-input-content

.compacted
 .k-input-auto-wrap
   margin: 2px 5px

.autocomplete-wrap
  display: flex
  width: 100%

.autocomplete-wrap .autocomplete
  width: 100%

.autocomplete-input
  width: 100%
  position: relative
  font-size: 0.8em
  flex: 1

// Autocomplete https://vuejsexamples.com/accessible-autocomplete-component-for-vanilla-javascript-and-vue/
.autocomplete-input:focus, .autocomplete-input[aria-expanded=true] 
  outline: none

.autocomplete[data-loading=true]:after
  content: ""
  border: 3px solid rgba(0,0,0,.12)
  border-right-color: rgba(0,0,0,.48)
  border-radius: 100%
  width: 100%
  height: 20px
  position: absolute
  right: 12px
  top: 50%
  transform: translateY(-50%)
  animation: rotate 1s linear infinite

.autocomplete-result-list
  font: 400 13.3333px Arial
  color: black
  margin: 0
  border: 1px solid rgba(0,0,0,.12)
  padding: 0.5em 0 0 0.5em
  box-sizing: border-box
  height: 7em
  max-height: 150px

  overflow-y: auto
  background: #fff
  list-style: none
  box-shadow: 0 2px 2px rgba(0,0,0,.16)
  visibility: hidden

[data-position=below] .autocomplete-result-list
  margin-top: -1px
  border-top-color: transparent
  border-radius: 0 0 8px 8px
  padding-bottom: 8px

[data-position=above] .autocomplete-result-list
  margin-bottom: -1px
  border-bottom-color: transparent
  border-radius: 8px 8px 0 0
  padding-top: 8px

.autocomplete-result
  cursor: default
  font-size: 0.7em

.autocomplete-result:hover, .autocomplete-result[aria-selected=true]
  background-color: rgba(0,0,0,.06)

.autocomplete-result-focused
  visibility: visible

@keyframes rotate
  0%
    transform: translateY(-50%) rotate(0deg)
  to
    transform: translateY(-50%) rotate(359deg)
</style>
