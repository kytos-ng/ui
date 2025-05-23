<template>
  <div :id="id" class="k-logging">
    <div class="k-logging-toolbar">
        <k-button-group>
          <k-button icon="trash" @click="clear" tooltip="Clear Logging"></k-button>
          <k-button v-if="false" v-bind:icon="playing" @click="play_pause" tooltip="Pause/Play Logging" ></k-button>
          <k-checkbox icon="paint-brush" v-on:change="change_colors" class="round"></k-checkbox>
        </k-button-group>
        <k-button-group>
          <k-button title="All" @click="select('all')" tooltip="All logs"></k-button>
          <k-button title="Info" @click="select('info')" tooltip="Only info messages"></k-button>
          <k-button title="Warn" @click="select('warn')"  tooltip="Only warning messages"></k-button>
          <k-button title="Error" @click="select('error')"  tooltip="Only error messages"></k-button>
          <k-button title="Debug" @click="select('debug')"  tooltip="Only debug messages"></k-button>
        </k-button-group>
        <k-button-group>
          <k-input v-model:value="highlight_string" v-on:change='highlight' icon="lightbulb" tooltip="Highlight string" placeholder="Highlight string"></k-input>
        </k-button-group>
      </div>

      <div class="k-logging-content" v-bind:class="colors">
        <div v-for="log in logs" :class="log.level" v-show="log.display">
           {{log.msg}}
        </div>
      </div>

  </div>
</template>

<script>
import KytosBaseWithIcon from '../base/KytosBaseWithIcon';

export default {
  name: 'k-logging',
  mixins: [KytosBaseWithIcon],
  methods: {
    /**
     * Method called to change the log level.
     */
    select: function(selected){
      for (let log of this.logs){
        if (selected == 'all')
          log.display = true
        else if (selected === log.level)
          log.display = true
        else
          log.display = false
      }
    },
    /**
     * Method to clear all logs stored.
     */
    clear: function () {
      this.logs = []
    },
    /**
     * Method to start and stop store the logs from socked channel.
     */
    play_pause(){
      if(this.playing == "play"){
        this.join_channel('log')
        this.playing = "stop"
      }else{
        this.leave_channel('log')
        this.playing = "play"
      }
    },
    /**
     * Change the logs colors.
     */
    change_colors(){
      this.colors = (this.colors == "colors")? "no_colors": "colors"
    },
    /**
     * Highlight the word searched.
     */
    highlight: function(){
      var logs = $('.k-logging-content div')
      for (let log of logs){
       if (log.innerText.includes(this.highlight_string) > 0){
         var pattern = new RegExp(this.highlight_string, 'ig')
         log.innerHTML = log.innerText.replace( pattern,"<span class='highlight'>"+this.highlight_string+"</span>")
       }
      }
    }
  },
  mounted(){
    this.channels.add('log')
  },
  data () {
    return {
      channels: new Set(),
      logs: [],
      colors: "no_colors",
      playing: "stop",
      highlight_string: "",
      filter: "all"
    }
  }
}
</script>

<style lang="sass">

@use '../../../assets/styles/dark-theme-variables'

.k-logging
 position: relative
 width: 100%

.k-logging-toolbar
 width: 100%
 background-color: dark-theme-variables.$fill-menubar-b
 height: 30px
 overflow: hidden

 .k-input-wrap
  margin-top: 1px

 .k-input-wrap, input
  background: none
  border-color: transparent

  :hover
   background: dark-theme-variables.$fill-panel

 .k-button
  font-size: 0.7em
  height: 30px
  margin: 0px
  padding: 0px 5px

 svg
  width: 10px

.k-logging-content
 overflow: auto
 max-height: 280px
 min-height: 280px
 font-size: 0.8em
 line-height: 1.3em
 padding: 0.5em 1em
 background: dark-theme-variables.$kytos-black
 color: dark-theme-variables.$fill-input

 .highlight
  font-weight: bold
  background-color: dark-theme-variables.$kytos-yellow
  color: #000

 &.colors
  .error
   color: dark-theme-variables.$kytos-red

  .warn
   color: dark-theme-variables.$kytos-yellow

  .info
   color: dark-theme-variables.$kytos-green

 *:hover
   color: dark-theme-variables.$kytos-blue
   cursor: pointer

*:-moz-full-screen
 .k-logging-content
  max-height: none

*:-webkit-full-screen
 .k-logging-content
  max-height: none

</style>
