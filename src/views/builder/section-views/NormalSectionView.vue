<template>
    <div class="normal-section">
        <div class="headline-block p5" v-show="section.isShowHeadline">
            <h2 :class="section.headlineAdditionalClass" v-text="section.headline"></h2>
            <p :class="section.subHeadlineAdditionalClass" v-text="section.subHeadline"></p>
        </div>

        <!--- SHOW CONTROLS WITH SORTABLE --->
        <div @drop="onDrop($event)" @dragover.prevent>
            <draggable :class="draggableClasses" ghost-class="ghost" :handle="dragControlHandle"
                :list="section.controls" :group="dragGroup" :disabled="!permissions.canReOrderingControl">

                <ControlView v-for="controlId in uniqueArr" :key="controlId" :control="controls[controlId]"
                    :parent-id="section.uniqueId" :permissions="permissions" :sortedSections="sortedSections" />

                <p v-if="!hasControl">
                    Droppable Zone / Controls will be showed here...
                </p>
            </draggable>
        </div>

        <!-- Add Control -->
        <AddControlControl v-if="permissions.canAddControl" :section="section" :sortedSections="sortedSections" />
    </div>
</template>

<script>
import { SECTION_VIEW_MIXINS } from "@/mixins/section-view-mixins";
import { CONTROLS, createControlData } from "@/configs/controls";
import { SIDEBAR_BODY_MIXIN } from "@/mixins/sidebar-body-mixin";

/**
 * @property {Object} section
 * @property {Object} rows RowId - RowData
 * @property {Object} controls ControlId - ControlData
 * @property {Array} section.rows
 * @property {Array} section.controls
 * @property {Array} sortedSections
 */
export default {
    name: "NormalSectionView",
    mixins: [SECTION_VIEW_MIXINS, SIDEBAR_BODY_MIXIN],
    props: {
        sortedSections: Array
    },
    data: () => ({
        uniqueArr: [],
        dataKey: "newControlData",
        newControlData: null,
    }),

    mounted() {
        this.uniqueArr = this.section.controls
    },
    watch: {
        "section.controls": {
            handler(value) {
                let unique = [...new Set(this.section.controls)];
                this.uniqueArr = unique
            },
            deep: true
        }
    },
    methods: {
        onDrop(evt) {
            let controlKey = evt.dataTransfer.getData("controlKey");
            if (!CONTROLS[controlKey]) {
                alert(`Control ${controlKey} doesn't exist in Vue-Form-Builder`)
                return
            }

            this.newControlData = createControlData(controlKey);
            this.save(true)
        },
    },
}
</script>
