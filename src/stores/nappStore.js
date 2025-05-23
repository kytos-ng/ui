import { defineStore } from "pinia";
import * as Vue from "vue";
import { defineAsyncComponent } from "vue";
import { loadModule } from "vue3-sfc-loader";

export const useNappStore = defineStore("toolbar", {
  state: () => {
    return {
      toolbarItems: {},
      loaderOptions: {
        moduleCache: {
          vue: Vue,
        },

        pathResolve({ refPath, relPath }, options) {
          if (relPath === ".") return refPath;

          if (relPath[0] !== "." && relPath[0] !== "/") return relPath;

          return String(
            new URL(relPath, refPath === undefined ? window.location : refPath)
          );
        },

        handleModule: async function (type, getContentData, path, options) {
          switch (type) {
            case ".css":
              options.addStyle(await getContentData(false));
              return null;
            case ".kytos":
              console.log("Kytos extension detected. Switch extension to .vue");
              return null;
            default:
              return undefined; // let vue3-sfc-loader handle this
          }
        },

        async getFile(url) {
          const res = await fetch(url);
          if (!res.ok)
            throw Object.assign(new Error(url + " " + res.statusText), { res });
          return await { type: ".vue", getContentData: () => res.text() };
        },

        addStyle(textContent) {
          const style = Object.assign(document.createElement("style"), {
            textContent,
          });
          const ref = document.head.getElementsByTagName("style")[0] || null;
          document.head.insertBefore(style, ref);
        },

        log(type, ...args) {
          console.log("vue3-sfc-loader log:");
          console[type](...args);
        },
      },
    };
  },
  actions: {
    addIconTooltip(name, icon, tooltip) {
      this.toolbarItems[name].icon = icon;
      this.toolbarItems[name].tooltip = tooltip;
    },
    registerComponents(_this, componentList) {
      componentList.forEach((component) => {
        if ("url" in component) {
          let url = _this.$kytos_server + component.url;
          _this.$kytos.component(
            component.name,
            defineAsyncComponent(() => loadModule(url, this.loaderOptions))
          );
        }
      });
    },
  },
  getters: {
    toolbarItemsList(state) {
      return Object.values(state.toolbarItems);
    },
  },
});
