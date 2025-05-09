<template>
<div class="accordion-wrapper" data-test="main-accordionwrapper">
    <!-- @slot Slot to be filled with accordion item -->
    <slot>
    </slot>
</div>
</template>

<script>

import KytosBase from '../base/KytosBase';
import KytosBaseWithIcon from '../base/KytosBaseWithIcon';

/**
 * A GUI widget with a list of items (``k-accordion-item``) that can be switched between hiding and showing content.
 *
 * @example /_static/imgs/components/accordion/k-accordion.png
 * @example
 * <k-accordion>
 *    <k-accordion-item title="Custom Labels">
 *        <k-dropdown title="Switch Labels:" icon="circle" :options="switchLabels" :event="{name: 'topology-toggle-label', content: {node_type: 'switch'}}"></k-dropdown>
 *        <k-dropdown title="Interface Labels:" icon="plug" :options="interfaceLabels" :event="{name: 'topology-toggle-label', content: {node_type: 'interface'}}"></k-dropdown>
 *    </k-accordion-item>
 *    <k-accordion-item title="Background">
 *        <k-button-group>
 *          <k-button tooltip="Map Background" icon="globe"></k-button>
 *          <k-button tooltip="Image Background (disabled)" icon="image" :is-disabled="true"></k-button>
 *          <k-button tooltip="No Background" icon="window-close"></k-button>
 *        </k-button-group>
 *        <k-slider icon="adjust" :initial-value="mapOpacity" :action="emitMapOpacity"></k-slider>
 *    </k-accordion-item>
 *   </k-accordion>
 */
export default {
    name: 'k-accordion',
    mixins: [KytosBaseWithIcon],
}

</script>
