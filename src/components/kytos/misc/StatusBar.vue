<template>
  <div class="k-status-bar">
    <span class='terminal-status-background'>&nbsp;</span>
  </div>
</template>

<script>
import TypeIt from "typeit";
/**
 * A GUI widget the shows notifications and System Information.
 *
 * @example /_static/imgs/components/misc/k-status-bar.png
 */
export default {
  name: 'k-status-bar',
  data(){
    return {
      messages: [],
      options:{
          speed: 50,
          autoStart: true,
          breakDelay: 3000,
          breakLines: false
      }
    }
  },
  mounted (){
    //require('typeit')
    this.register_listeners()
    setInterval(this.display_messages, 3000)
  },
  methods:{
    display_messages(){
      var message= this.messages.shift()
      if (message !== undefined){
        //this.get_terminal().type(message).pause(1500).delete().go();
      }
    },
    get_terminal (){
      //return new TypeIt('.k-status-bar span', this.options);
    },
    /**
     * Display a message inside the k-status-bar.
     *
     * @public
     * @param {string} message Message to be displayed.
     * @param {boolean} error  If true will display the message in red, default is false
     */
    set_status(message, error=false){
      if (error){
        message = "<span class='status-error'>" + message + "</span>"
      }
      this.messages.push(message)
    },
    register_listeners(){
      /**
       * Show a status message in StatusBar
       *
       * @event statusMessage
       * @type {string}
       */
      this.$kytos.eventBus.$on('statusMessage', this.set_status)
    }
  }
}
</script>

<style lang='sass'>

@import '../../../assets/styles/variables'

.k-status-bar
  display: inline-flex
  background: $fill-panel-dark
  padding: 6px 0
  font-family: monospace
  color: $kytos-blue
  font-size: 12px

.k-status-bar:before
  content: '|'

.k-status-bar .status-error
  color: $kytos-red

</style>
