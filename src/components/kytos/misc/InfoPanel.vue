<template>
  <section v-bind:class="classObject" v-hotkey="keymap" v-show="showContent">
    <div class="row" style="display: flex;justify-content: flex-end;">
      <div class="actions-btn">
        <k-button class='info-panel-btn max' icon="window-maximize"
                  tooltip="Maximize Info-Panel"
                  @click="this.maximize">
        </k-button>
        <k-button class='info-panel-btn close' icon="times"
                  tooltip="Close Info-Panel"
                  @click="this.hide">
        </k-button>
      </div>
    </div>
    <div class="k-info-title">
      <icon v-if="myIcon && iconName" :icon="iconName"></icon>
      <div v-if="myTitle" class="panel-title">
        <h1> {{ myTitle }}
          <small v-if="subtitle">{{ subtitle }}</small>
          <small v-if="subtitle_2">{{ subtitle_2 }}</small>
        </h1>
      </div>
    </div>
    <div class="k-info-wrapper" id="k-info-wrapper-id">
        <component :is="infoPanelView" :content="content"></component>
    </div>
  </section>
</template>

<script>
import KytosBase from '../base/KytosBase';
import KytosBaseWithIcon from '../base/KytosBaseWithIcon';

/**
 * Shows details about selected kytos components. This panel appears on the
 * right of the Kytos GUI and the NApp developer can choose what to display on
 * the panel.
 *
 * @example /_static/imgs/components/misc/k-info-panel.png
 */

export default {
  name: 'k-info-panel',
  mixins: [KytosBaseWithIcon],
  props: {
    subtitle: {
      type: String,
    },
  },
  data() {
    return {
      keyContent: 1,
      showContent: false,
      infoPanelView: 'div',
      content: undefined,
      myIcon: 'cog',
      myTitle: '',
      subtitle: '',
      subtitle_2: '',
      maximized: false,
      lastContent: {},
      hasContent: false,
      classObject: {
        'k-info-panel': true,
        'k-info-panel-max': false
      }
    }
  },
  methods: {
    toggle() {
      this.showContent = !this.showContent;
    },
    hide() {
      this.myIcon = 'cog';
      this.content = undefined || {};
      this.infoPanelView = "span";
      this.showContent = false;

      if (this.hasContent) {
        this.$kytos.eventBus.$emit('toggleInfoPanelIcon', 'hide')
      }
    },
    /**
     * Show the Info Panel displayed in the right.
     *
     * @public
     * @param {object} content An object filled with:
     *
     *                         {
     *                          **component**: "search-hosts",
     *                          **content**: {**msg**:"content used in the component"},
     *                          **title**: "Search Hosts",
     *                          **icon**: "desktop"
     *                         }
     */
    show(content) {
      this.lastContent = content
      this.infoPanelView = content.component
      this.content = content.content
      this.myTitle = content.title
      this.subtitle = content.subtitle
      this.subtitle_2 = content.subtitle_2
      this.myIcon = content.icon
      this.classObject['k-info-panel-max'] = content.maximized
      $('.k-info-panel').toggleClass('show')
      $('.k-info-wrapper').scrollTop = 0
      this.hasContent = true
      this.showContent = true
      this.$kytos.eventBus.$emit('toggleInfoPanelIcon', 'show')
    },
    latestContent() {
        let standard_infoPanel = {
          component: 'search-hosts',
          content: {'id':''},
          title: '',
          subtitle: '',
          icon: 'cog'
        }
        this.show(standard_infoPanel)
    },
    maximize() {
      /**
       * Controls the maximized view of the current
       * k-info-panel by adding and removing its css class
      */
      $('.k-info-panel').toggleClass('k-info-panel-max')
    },
    register_listeners() {
      /**
       * Hide the info panel displayed in the right.
       *
       * @event hideInfoPanel
       * @type {NULL}
       */
      this.$kytos.eventBus.$on('hideInfoPanel', this.hide)

      /**
       * Show the info panel in the right.
       *
       * @event showInfoPanel
       * @type {Object} An content to be displayed by InfoPanel.
       */
      this.$kytos.eventBus.$on('showInfoPanel', this.show)

      /**
       * Show the latest info panel called in the right,
       * event to comunicate with tabs.vue
       *
       * @event showLatestInfoPanel
       * @type {NULL}
       */
      this.$kytos.eventBus.$on('showLatestInfoPanel', this.latestContent)
    }
  },
  computed: {
    keymap() {
      return {
        'ctrl+alt+space': this.toggle,
        'esc': this.hide,
      }
    },
    iconName() {
      if(this.myIcon) return this.myIcon;
      else return '';
    }
  },
  mounted: function () {
    this.register_listeners()
  },
}
</script>

<style lang="sass">

@use '../../../assets/styles/dark-theme-variables'

.k-info-panel-max
  width: 900px !important
  min-width: 900px !important

.k-info-panel
  -webkit-order: 4
  -ms-flex-order: 4
  order: 4
  display: flex
  flex-direction: column
  min-height: calc(100% - 45px)
  padding: 10px
  position: fixed
  right: 0
  top: 0
  background-color: dark-theme-variables.$fill-panel
  width: 420px
  z-index: 999
  box-shadow: 10px 0px 20px 5px rgba(0, 0, 0, 0.4)
.k-info-panel.hide
  display: none
.k-info-panel.show
  display: flex

.k-info-wrapper
  -webkit-flex: 1 1 auto
  overflow-y: auto
  height: 0px

.k-info-title
  display: flex
  flex-direction: row
  align-items: center

  svg
    fill: dark-theme-variables.$fill-icon
    color: dark-theme-variables.$fill-icon
    width: 50px
    height: 50px
    padding: 10px
    margin-right: 5px

  .panel-title
    padding: 0
    margin: 0
    color: dark-theme-variables.$fill-text

    & > h1
      font-size: 1.2em
      font-weight: bold
      color: dark-theme-variables.$fill-text

    small
      font-size: 0.7em
      color: dark-theme-variables.$fill-text
      display: block

.actions-btn
  position: absolute !important

.info-panel-btn
  background: inherit !important
  display: inline-block
  &.max svg
    width: 14px !important

</style>
