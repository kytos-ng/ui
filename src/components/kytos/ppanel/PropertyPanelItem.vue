<template>
    <tr :id="id" class="k-property-panel-item">
        <th>{{name}}</th>
        <td>{{value}}</td>
    </tr>
</template>

<script>
import KytosBase from '../base/KytosBase';

/**
 * This component create a row in the table (``k-property-panel``) with two columns, *name* and *value*.
 *
 * @example /_static/imgs/components/ppanel/k-property-panel-item.png
 * @example  <k-property-panel>
 *     <k-property-panel-item :name="kytos/mef_eline"
 *                            :value="2.2.0
 *     </k-property-panel-item>
 *   </k-property-panel>
 */

export default {
  name: 'k-property-panel-item',
  mixins: [KytosBase],
  props: {
    /**
     * Name displayed in the header of property panel item.
     */
    name: {
      type: String,
      required: true,
    },
    /**
     * Value displayed in the data of property panel item.
     */
    value: {
      type: [String, Number],
      required: true,
    },
  }
}
</script>

<style lang="sass">

@use '../../../assets/styles/dark-theme-variables'

.k-property-panel-item
  cursor: pointer
  padding-top: 0.3em

  th
   display: table-cell
   font-size: 0.8em
   border-right: 1px solid dark-theme-variables.$fill-input-content
   border-bottom: 1px solid dark-theme-variables.$fill-input-content
   color: dark-theme-variables.$fill-text
   text-align: right
   padding: 0.5em
   min-width: 50%

  td
   display: table-cell
   color: dark-theme-variables.$fill-text
   text-align: left
   border-bottom: 1px solid dark-theme-variables.$fill-input-content
   font-size: 0.8em
   padding: 0.5em

  &:nth-child(odd)
   background-color: dark-theme-variables.$fill-menubar

  &:nth-child(even)
   background-color: dark-theme-variables.$fill-panel

  &:hover *
   color: dark-theme-variables.$fill-text-h
   background-color: dark-theme-variables.$fill-bar

</style>
