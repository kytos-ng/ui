<template>
    <div class="modal-mask" v-if="showModal">
        <div class="modal-wrapper">
            <div class="modal-container">
                <div class="modal-header">
                    <slot name="header">
                        {{ header }}
                    </slot>
                </div>
                <div class="modal-body">
                    <slot name="body">
                        {{ message }}
                    </slot>
                </div>
                <div class="modal-footer">
                    <slot name="footer">
                        <k-button tooltip="Cancel" title="Cancel" @click="modalClose">
                        </k-button>
                        <k-button id="modalOK" :tooltip="buttonTitle" :title="buttonTitle" @click="invokeAction">
                        </k-button>
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import KytosBase from '../base/KytosBase';
import KytosBaseWithIcon from '../base/KytosBaseWithIcon';

/**
 * A general modal element/component that allows you to define your own header, body, button, 
 * and function to be executed when it's pressed.
 * 
 * @example
 * //generates modal
 * <k-modal message="There has been a grave mistake" header="Error" buttonTitle="Ok" action="Func" v-model:show-modal="condition"></k-modal>
 */

export default {
    name: 'k-modal',
    mixins: [KytosBaseWithIcon],
    emits: ['update:showModal'],
    props: {
        /**
         * String used in modal body
         */
        message: {
            type: String,
            required: false,
            default: ""
        },
        /**
         * String used in modal header/title
         */
        header: {
            type: String,
            required: false,
            default: ""
        },
        /**
         * Name of second button within modal
         */
        buttonTitle: {
            type: String,
            required: false,
            default: "Ok"
        },
        /**
         * Action to be done when second button is pressed
         */
        action: {
            type: Function,
            required: false
        },
        /**
         * Hides or displays modal
         */
        showModal: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        modalClose() {
            /**
            * Modal window - Close (X) buttom
            */
           this.$emit('update:showModal', false)
        },
        invokeAction() {
            /**
             * Workaround to set a default function for modal
             */
            if (this.action) {
                this.action();
                this.modalClose();
            } else {
                this.modalClose();
            }
        }
    }
}
</script>

<style lang="sass">

    @import '../../../assets/styles/variables'

    .modal-mask
        position: fixed
        z-index: 9998
        top: 0
        left: 0
        width: 100%
        height: 100%
        background-color: rgba(0, 0, 0, 0.5)
        display: table
        transition: opacity 0.3s ease

    .modal-wrapper
        display: table-cell
        vertical-align: middle

    .modal-container
        width: 300px
        margin: 0px auto
        padding: 10px 10px 10px 20px
        background-color: #e8e8e8
        border-radius: 2px
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33)
        transition: all 0.3s ease
        font-family: Helvetica, Arial, sans-serif

    .modal-body
        margin: 20px 0
        word-wrap: break-word
        overflow-wrap: break-word

    .modal-default-button
        float: right

    .modal-enter
        opacity: 0

    .modal-leave-active
        opacity: 0

    .modal-footer
        justify-content: end
        display: flex

    #modalOK
        color: #ffc5c5
        background: #be0000

    .modal-header
        font-weight: bold
        margin-top: 2%

</style>