<template>
    <div class="sidebar">
        <!-- <span class="close"
              @click="close"
              v-html="$form.getIcon('close', '24px', '24px', '#000')">
        </span> -->
        <!--- For dynamic purpose --->
        <component :is="component" :dataPackage="dynamicData"
            :formData="formData" :permissions="permissions" @save="save" @saveAndClose="saveAndClose" @close="close" />
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
        component: null,
        dynamicData: {},
        runnerId: null,
        isOpen: false,

        componentControl: null,
        dynamicDataControl: {},
        runnerIdControl: null,
        isOpenControl: false,
    }),
    computed: {
        isSidebarControlConfiguration() {
            return this.component && this.component.name === "SidebarControlSelectList";
        }
    },
    methods: {
        /**
         * Open the Right Sidebar
         */
        open(runnerId) {
            if (this.isOpen) {
                // console.log("asdasd", this.component.name)
                this.close();
            }

            // set size
            this.$el.style.width = SIDEBAR_WIDTH_SIZE
            // document.getElementsByTagName("body")[0].style.marginRight = SIDEBAR_WIDTH_SIZE
           
            // turn on flag and notify watcher that sidebar is opened
            // `runnerId` will be sent back in order to make sure other components will touch yours
            setTimeout(() => {
                this.$formEvent.$emit(EVENT_CONSTANTS.BUILDER.SIDEBAR.OPENED, runnerId)
                this.isOpen = true
            }, 100);
            
            
        },

        /**
         * Save - Emitting data to the listener but do not close the sidebar
         * @hook Emit Data to the Listener
         */
        save(specialData = {}) {
            // console.log("save")

            this.$formEvent.$emit(
                EVENT_CONSTANTS.BUILDER.SIDEBAR.SAVE,
                this.runnerId,
                Object.assign({}, specialData)
            )
        },

        /**
         * Save event with close the right sidebar
         */
        saveAndClose(specialData = {}) {
            // console.log("saveandclose", specialData)
            this.$formEvent.$emit(
                EVENT_CONSTANTS.BUILDER.SIDEBAR.SAVE_AND_CLOSE,
                this.runnerId,
                Object.assign({}, specialData)
            )
        },

        /**
         * Close the right sidebar
         * @hook After Closed - Fire an Event to notify (maybe someone will listen :v )
         */
        close() {
            this.$el.style.width = 0
            document.getElementsByTagName("body")[0].style.marginRight = 0

            // fire event after closed (if emit == true)
            this.$formEvent.$emit(
                EVENT_CONSTANTS.BUILDER.SIDEBAR.AFTER_CLOSED,
                this.runnerId,
                null
            )

            // remove renderer
            this.component = null
            this.dynamicData = {}
            this.runnerId = null
            this.isOpen = false
        },

        /**
         * This method will help us inject our Component into the Sidebar Body
         * @param {SidebarRenderer} rendererInfo - data that will be assigned for the Component
         */
        updateBody(rendererInfo) {
            if (this.isOpen) {
                return
            }

            this.dynamicData = Object.assign({}, rendererInfo.data)
            this.component = rendererInfo.component
            this.runnerId = rendererInfo.runnerId
        }
    },

    created() {
        // listen to render even
        this.$formEvent.$on(EVENT_CONSTANTS.BUILDER.SIDEBAR.INJECT, this.updateBody)

        // listen to open
        this.$formEvent.$on(EVENT_CONSTANTS.BUILDER.SIDEBAR.OPEN, this.open)
    }
}
</script>
<style>
.sidebar {
    margin-top: 55px;
    right: 0;
}
</style>