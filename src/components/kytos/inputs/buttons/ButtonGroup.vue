<template>
<div class="k-button-wrapper compact">
    <a v-if="tooltip" v-bind:title="tooltip" class="k-button-wrapper-tooltip" data-test="main-buttongroup"></a>
     <!-- @slot Slot to be filled with a buttons set -->
    <slot>
    </slot>
</div>
</template>

<script>
import KytosBase from '../../base/KytosBase';

/**
 * Allows to group buttons (``k-button``), which trigger events when clicked.
 * @example <k-button-group>
 *     <k-button tooltip="Map Background" icon="globe"></k-button>
 *     <k-button tooltip="Image Background (disabled)" icon="image" :is-disabled="true"></k-button>
 *     <k-button tooltip="No Background" icon="window-close"></k-button>
 *   </k-button-group>
 * @example /_static/imgs/components/input/k-button-group.png
 */

export default {
  name: 'k-button-group',
  mixins: [KytosBase],
  props: {
  /**
   * Tooltip string for the input.
   */
   tooltip: {
      type: String
   },
  }
}
</script>

<style lang="sass">

@use '../../../../assets/styles/dark-theme-variables'

.k-button-wrapper
 position: relative
 align-self: center
 vertical-align: middle
 float: left

 .k-button
   float: left

.k-toolbar

 .k-button
  float: left

 .k-button-wrapper
  clear: both

  .k-button
   clear: none

</style>
