<template>
    <div class="sidebar mirrored">
        <!-- <span class="close"
              @click="close"
              v-html="$form.getIcon('close', '24px', '24px', '#000')">
        </span> -->
        <!--- For dynamic purpose --->
        <SidebarControlSelectList :dataPackage="dynamicDataControl"
            :formData="formData" :permissions="permissions" :runnerId="runnerIdControl" @save="saveControl"
            @saveAndClose="saveAndCloseControl" @close="closeControl" />
    </div>
</template>

<script>
import { EVENT_CONSTANTS } from "@/configs/events";
import { ALERT_DIALOG } from "@/libraries/alert-dialog";
import SidebarControlSelectList from "@/views/builder/sidebar-config-views/SidebarControlSelectList.vue"

const SIDEBAR_WIDTH_SIZE = "20vw"

export default {
    name: "GlobalSidebar",
    components: { SidebarControlSelectList },
    props: {
        formData: {
            type: Object,
            default() {
                return {}
            }
        },
        permissions: Object
    },
    data: () => ({
        componentControl: null,
        dynamicDataControl: {},
        runnerIdControl: null,
        isOpenControl: false,
    }),
    computed: {

    },
    methods: {
        /**
         * Open the Right Sidebar
         */

        // SidebarControlComponent
        openControl(runnerId) {
            if (this.isOpenControl) {
                this.closeControl();
            }

            // set size
            this.$el.style.width = SIDEBAR_WIDTH_SIZE
            // document.getElementsByTagName("body")[0].style.marginRight = SIDEBAR_WIDTH_SIZE

            // turn on flag and notify watcher that sidebar is opened
            // `runnerId` will be sent back in order to make sure other components will touch yours
            this.$formEvent.$emit(EVENT_CONSTANTS.BUILDER.SIDEBAR.CONTROL.OPENED, runnerId)
            this.isOpenControl = true
        },

        /**
         * Save - Emitting data to the listener but do not close the sidebar
         * @hook Emit Data to the Listener
         */
        saveControl(specialData = {}) {
            this.$formEvent.$emit(
                EVENT_CONSTANTS.BUILDER.SIDEBAR.CONTROL.SAVE,
                this.runnerIdControl,
                Object.assign({}, specialData)
            )
        },

        /**
         * Save event with close the right sidebar
         */
        saveAndCloseControl(specialData = {}) {
            this.$formEvent.$emit(
                EVENT_CONSTANTS.BUILDER.SIDEBAR.CONTROL.SAVE_AND_CLOSE,
                this.runnerIdControl,
                Object.assign({}, specialData)
            )

            if(this.componentControl.name == 'SidebarControlSelectList'){

            }
            else{

                this.closeControl()
            }
        },

        /**
         * Close the right sidebar
         * @hook After Closed - Fire an Event to notify (maybe someone will listen :v )
         */
        closeControl() {
            this.$el.style.width = 0
            document.getElementsByTagName("body")[0].style.marginRight = 0

            // fire event after closed (if emit == true)
            this.$formEvent.$emit(
                EVENT_CONSTANTS.BUILDER.SIDEBAR.CONTROL.AFTER_CLOSED,
                this.runnerIdControl,
                null
            )

            // remove renderer
            this.componentControl = null
            this.dynamicDataControl = {}
            this.runnerIdControl = null
            this.isOpenControl = false
        },

        /**
         * This method will help us inject our Component into the Sidebar Body
         * @param {SidebarRenderer} rendererInfo - data that will be assigned for the Component
         */
        updateBodyControl(rendererInfo) {
            // if (this.isOpen) {
            //     return
            // }
            // console.log("renderınfo",rendererInfo)
            this.dynamicDataControl = Object.assign({}, rendererInfo.data)
            this.componentControl = rendererInfo.component
            this.runnerIdControl = rendererInfo.runnerId

        }
    },

    created() {

        // listen to render even
        this.$formEvent.$on(EVENT_CONSTANTS.BUILDER.SIDEBAR.CONTROL.INJECT, this.updateBodyControl)

        // listen to open
        this.$formEvent.$on(EVENT_CONSTANTS.BUILDER.SIDEBAR.CONTROL.OPEN, this.openControl)
    }
}
</script>
<style>
.sidebar {
    margin-top: 55px;
}

.mirrored {
    left: 0;
}

.not_mirrored {
    right: 0;
}
</style>
