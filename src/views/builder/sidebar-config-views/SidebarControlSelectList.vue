<template>
    <div class="sidebar-form-configuration">

        <h5>{{ $ml.get("ADD_CONTROL_TO_YOUR_SECTION") }}</h5>


        <div :class="[styles.CONTROLS_LIST.CONTAINER]">
            <a href="javascript:void(0)" draggable @dragstart="startDrag($event, controlKey)"
                :class="styles.CONTROLS_LIST.SINGLE_ITEM" v-for="(controlInfo, controlKey) in controlTypes"
                v-show="!controlInfo.isHidden" @click="selectedControl(controlKey)">
                <div class="d-flex align-items-center">
                    <div class="icon" v-html="ICONS_ARRAY[controlInfo.name]"></div>
                    <p class="type-headline ml-3 mb-0" v-text="getName(controlInfo)"></p>
                    <!-- SVG icon -->
                </div>
            </a>
        </div>

    </div>
</template>

<script>
import { STYLE_INJECTION_MIXIN } from "@/mixins/style-injection-mixin";
import { CONTROLS, createControlData } from "@/configs/controls";
import { SIDEBAR_BODY_MIXIN } from "@/mixins/sidebar-body-mixin";
import { ICONS_ARRAY } from "@/bootstrap-icons/input.icon.js";

export default {
    name: "SidebarControlSelectList",
    mixins: [STYLE_INJECTION_MIXIN, SIDEBAR_BODY_MIXIN],
    computed: {
        controlTypes: () => CONTROLS
    },

    data: () => ({
        dataKey: "newControlData",
        newControlData: null,
        ICONS_ARRAY // SVG stringini burada erişilebilir hale getiriyoruz
    }),

    methods: {
        selectedControl(controlKey) {
            if (!CONTROLS[controlKey]) {
                alert(`Control ${controlKey} doesn't exist in Vue-Form-Builder`)
                return
            }

            this.newControlData = createControlData(controlKey)
            this.save(true)
        },

        getName(controlInfo) {
            if (controlInfo.isCustomField) {
                return controlInfo.name
            }
            return this.$ml.get(controlInfo.name)
        },
        
        startDrag(evt, controlKey) {
            evt.dataTransfer.dropEffect = 'move'
            evt.dataTransfer.effectAllowed = 'move'
            evt.dataTransfer.setData("controlKey", controlKey);
        },

    }
}
</script>

<style scoped>
.icon {
    display: flex;
    align-items: center;
}
</style>
