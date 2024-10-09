<template>
    <div class="control-label-container">
        <label
            v-text="getLabel(control)"
            :for="control.uniqueId"
            :class="[control.additionalLabelClass, isHidden ? 'line' : '']"
        />
        <br v-if="control.subLabel" />
        <small
            v-if="control.subLabel"
            v-text="control.subLabel"
        />
    </div>
</template>

<script>
    export default {
        name: "ControlLabel",
        props: {
            control: {
                type: Object,
                required: true
            },
            readOnly: {
                type: Boolean,
                default: false,
            },
            isHidden: {
                type: Boolean,
                default: false,
            }
        },
        methods: {
            getLabel(controlInfo){
                console.log("controlinfo");
                console.log(controlInfo);
                if(controlInfo.isCustomField){
                    return controlInfo.label;
                }

                return this.$ml.get(controlInfo.label);
            }
        }
    }
</script>

<style scoped>
label.bold {
  font-weight: 600;
}
label.line {
    text-decoration-line: line-through;
    text-decoration-thickness: 2px;
}
</style>
