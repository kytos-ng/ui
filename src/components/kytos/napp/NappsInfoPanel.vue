<template>
 <div class='k-napps-info-panel'>
  <component v-show="false" v-for="component in components" :is="component.name" v-bind:key="component.name"></component>
 </div>
</template>

<script>
import Vue from 'vue'
import httpVueLoader from "./httpVueLoader.js"
import { loadModule } from "vue3-sfc-loader"
 
 const options = {
 
   moduleCache: {
     vue: Vue
   },
 
   getFile(url) {
 
     return fetch(url).then(response => response.ok ? response.text() : Promise.reject(response));
   },
 
   addStyle(styleStr) {
 
     const style = document.createElement('style');
     style.textContent = styleStr;
     const ref = document.head.getElementsByTagName('style')[0] || null;
     document.head.insertBefore(style, ref);
   }
 
 }

export default {
  name: 'k-napps-info-panel',
  data () {
    return {
      url: this.$kytos_server+ 'ui/k-info-panel',
      components: [],
    }
  },
  created() {
      var self = this
      $.get({
        url: this.url,
        datatype: 'json',
        async: true,
        cache: false,
        success: function(data) {
          if(data) {
            self.components = self.components.concat(data)
          }
        }
      }).always(function(){
          self.load_components()
      })
  },
  methods: {
    load_components (){
      var self = this
      $.each(self.components, function(index, component){
        if('url' in component){
          // random is needed to avoid cache of components.
          var url = self.$kytos_server+component.url
          self.$kytos.component(component.name, Vue.defineAsyncComponent( () => loadModule(url, options) ))
        }
      })
    },
  }
};
</script>
