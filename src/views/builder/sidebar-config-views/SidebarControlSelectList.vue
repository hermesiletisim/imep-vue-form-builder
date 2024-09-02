<template>
    <div class="sidebar-form-configuration">

        <h5>{{ $ml.get("ADD_CONTROL_TO_YOUR_SECTION") }}</h5>


        <div :class="[styles.LIST_GROUP.CONTAINER]">
            <a href="javascript:void(0)" :class="styles.LIST_GROUP.SINGLE_ITEM"
                v-for="(controlInfo, controlKey) in controlTypes" v-show="!controlInfo.isHidden"
                @click="selectedControl(controlKey)">
                <div class="d-flex justify-content-between">
                    <p class="type-headline ml-2" v-text="$ml.get(controlInfo.name)"></p>
                    <!-- <p class="type-desc" v-text="$ml.get(controlInfo.description)"></p> -->
                    <span id="icon" v-html="$form.getIcon('addOutline', '24px', '24px', '#000')"></span>
                </div>

            </a>

        </div>

    </div>
</template>

<script>
import { STYLE_INJECTION_MIXIN } from "@/mixins/style-injection-mixin";
import { CONTROLS, createControlData } from "@/configs/controls";
import { SIDEBAR_BODY_MIXIN } from "@/mixins/sidebar-body-mixin";

export default {
    name: "SidebarControlSelectList",
    mixins: [STYLE_INJECTION_MIXIN, SIDEBAR_BODY_MIXIN],
    computed: {
        controlTypes: () => CONTROLS
    },

    data: () => ({
        dataKey: "newControlData",
        newControlData: null
    }),

    methods: {
        /**
         * Selected a control => we will generate a new control data then emit it to the section
         * @param controlKey
         */
        selectedControl(controlKey) {
            if (!CONTROLS[controlKey]) {
                alert(`Control ${controlKey} doesn't exists in Vue-Form-Builder`)
                return
            }

            // create
            this.newControlData = createControlData(controlKey)
            this.save(true)
        }
    }
}
</script>

<style scoped>
#icon {
    opacity: 0;
}

#icon:hover{
    opacity: 100;
}
</style>