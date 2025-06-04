<template>
 <div class='k-toolbar-item' :icon="icon" :tooltip="tooltip" data-test="main-div">
    <!-- @slot Slot with the toolbar item. -->
    <slot>
    </slot>
 </div>
</template>

<script>
import KytosBase from '../base/KytosBase'
import KytosBaseWithIcon from '../base/KytosBaseWithIcon'
import { mapActions } from 'pinia'
import { useNappStore } from '../../../stores/nappStore'

/**
 * Component representing a toolbar item that create a new item in the
 * ``k-menu-bar`` and shows the content in the ``k-toolbar``.
 *
 */
export default {
  name: 'k-toolbar-item',
  mixins: [KytosBaseWithIcon],
  props: ["icon", "tooltip", "name"],
  methods: {
    ...mapActions(useNappStore, ['addIconTooltip'])
  },
  mounted() {
    this.addIconTooltip(this.name, this.icon, this.tooltip);
  }
}
</script>
