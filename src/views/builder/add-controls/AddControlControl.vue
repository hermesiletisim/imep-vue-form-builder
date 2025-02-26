<template>
    <div class="add-control-outer" :class="styles.COLUMNS.COL12">
        <div class="add-control-container" @click="openAddControl">
            <span v-html="$form.getIcon('addOutline', '32px', '32px', '#000')"></span>
            <span>{{$ml.get("ADD_CONTROL")}}</span>
        </div>
    </div>
</template>

<script>
    import {STYLE_INJECTION_MIXIN} from "@/mixins/style-injection-mixin";
    import {EVENT_CONSTANTS} from "@/configs/events";
    import SidebarRenderer from "@/libraries/sidebar-renderer.class";
    import SidebarControlSelectList from "@/views/builder/sidebar-config-views/SidebarControlSelectList";

    export default {
        name: "AddControlControl",
        mixins: [STYLE_INJECTION_MIXIN],
        props: {
            section: {
                type: Object,
                required: true
            },

            // TODO: Need to extend: Row too.
        },
        data: () => ({
            show: false
        }),
        methods:{
            /**
             * Open the sidebar to add control yeah yeah
             */
            openAddControl() {
                // let specialData = true;
                // this.$formEvent.$emit(
                //     EVENT_CONSTANTS.BUILDER.SIDEBAR.SAVE,
                //     this.runnerId,
                //     Object.assign({}, specialData)
                // )
                this.$formEvent.$emit(EVENT_CONSTANTS.BUILDER.SIDEBAR.CONTROL.OPEN, this.runnerId)
            },

            /**
             * Render the sidebar if can be opened hehe
             */
            afterOpenedSidebar(runnerId) {
                if (runnerId !== this.runnerId) {
                    return
                }

                // render
                this.renderSidebar()
            },

            /**
             * Trigger this to render the GlobalSidebar for Select Controls
             */
            renderSidebar() {
                this.$formEvent.$emit(EVENT_CONSTANTS.BUILDER.SIDEBAR.CONTROL.INJECT, new SidebarRenderer(
                    this.runnerId,
                    SidebarControlSelectList,
                    this.section
                ));
            },

            /**
             * After user chose a control. This will be invoked in order to create a new control
             */
            createNewControlForSection(runnerId, controlObj) {
                // runnerId to check the right identifier of the Invoker
                // uniqueId to check if we create new control or not
                // console.log(this.runnerId)
                // console.log(runnerId)
                if (this.runnerId !== runnerId) {
                    return
                }

                // emit to FormBuilder and let it create control...
                // TODO: Need to extend - For Rows
                this.$formEvent.$emit(EVENT_CONSTANTS.BUILDER.CONTROL.CREATE, this.section.uniqueId, controlObj)
            }
        },

        computed: {
            /**
             * Runner ID to detect the right
             * @returns {string}
             */
            runnerId() {
                return `add-control-${this.section.uniqueId}`
            }
        },

        mounted(){
            this.openAddControl()  
        },
        created() {
            // listen to Global Sidebar
            this.$formEvent.$on(EVENT_CONSTANTS.BUILDER.SIDEBAR.CONTROL.OPENED, this.afterOpenedSidebar)
            this.$formEvent.$on(EVENT_CONSTANTS.BUILDER.SIDEBAR.CONTROL.SAVE_AND_CLOSE, this.createNewControlForSection)
        },
    }

</script>