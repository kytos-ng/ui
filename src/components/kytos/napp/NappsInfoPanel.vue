<template>
  <div class='k-napps-info-panel'>
   <component v-show="false" v-for="component in components" :is="component.name" v-bind:key="component.name"></component>
  </div>
 </template>
 
 <script>
 import { defineAsyncComponent } from 'vue'
  import { loadModule } from 'vue3-sfc-loader'
  import * as Vue from 'vue'
  
 const options = {
  
  moduleCache: {
    vue: Vue
  },
 
  pathResolve({ refPath, relPath }, options) {
 
   if ( relPath === '.' )
     return refPath;
 
   if ( relPath[0] !== '.' && relPath[0] !== '/' )
     return relPath;
 
   return String(new URL(relPath, refPath === undefined ? window.location : refPath));
  },
 
  handleModule: async function (type, getContentData, path, options) {
 
   switch (type) {
     case '.css':
       options.addStyle(await getContentData(false));
       return null;
     case '.kytos':
       console.log("Kytos extension detected. Switch extension to .vue");
       return null;
     default: return undefined; // let vue3-sfc-loader handle this
   }
  },
 
  async getFile(url) {
 
    const res = await fetch(url);
    if ( !res.ok )
       throw Object.assign(new Error(url+' '+res.statusText), { res });
    return await {type: '.vue', getContentData: ()=>res.text()};
  },
 
  addStyle(textContent) {
 
    const style = Object.assign(document.createElement('style'), { textContent });
    const ref = document.head.getElementsByTagName('style')[0] || null;
    document.head.insertBefore(style, ref);
  },
 
  log(type, ...args) {
 
    console.log("vue3-sfc-loader log:");
    console[type](...args);
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
           var url = self.$kytos_server+component.url
           self.$kytos.component(component.name, defineAsyncComponent( () => loadModule(url, options) ))
         }
       })
     },
   }
 };
 </script>
 