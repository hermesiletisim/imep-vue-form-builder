<template>
    <SidebarToggleableContainer headline="Styling/Classes">
        <div :class="styles.FORM.FORM_GROUP">
            <label>{{ $ml.get("CONTAINER_SIZE_CLASS") }}</label>
            <div class="form-check form-check-inline" style="border: 0px;" :class="styles.FORM.FORM_CONTROL"
                v-for="(className, classID) in containerClasses">
                <input class="form-check-input" type="radio" v-model="control.containerClass" name="inlineRadioOptions"
                    :id="className" :value="className">
                <label class="form-check-label" :for="className">{{ 12 / parseInt(classID.slice(3)) }} columns</label>
            </div>
            <!-- <select :class="styles.FORM.FORM_CONTROL" v-model="control.containerClass">
                <option v-for="(className, classID) in containerClasses"
                        :key="className"
                        :value="className">
                    {{12/parseInt(classID.slice(3))}} columns
                </option>
            </select> -->
        </div>

        <div :class="styles.FORM.FORM_GROUP">
            <label>{{ $ml.get("CONTAINER_ADDITIONAL_CLASSES") }}</label>
            <input type="text" :class="styles.FORM.FORM_CONTROL" v-model="control.additionalContainerClass">
        </div>

        <div :class="styles.FORM.FORM_GROUP">
            <label>{{ $ml.get("CONTROL_FIELD_ADDITIONAL_CLASSES") }}</label>
            <input type="text" :class="styles.FORM.FORM_CONTROL" v-model="control.additionalFieldClass">
        </div>

        <div :class="styles.FORM.FORM_GROUP">
            <label>{{ $ml.get("CONTROL_LABEL_ADDITIONAL_CLASSES") }}</label>
            <input type="text" :class="styles.FORM.FORM_CONTROL" v-model="control.additionalLabelClass">
        </div>
    </SidebarToggleableContainer>
</template>

<script>
import SidebarToggleableContainer from "@/views/container-views/SidebarToggleableContainer";
import { STYLE_INJECTION_MIXIN } from "@/mixins/style-injection-mixin";

export default {
    name: "ControlStylingInformation",
    mixins: [STYLE_INJECTION_MIXIN],
    components: { SidebarToggleableContainer },
    props: {
        control: Object
    },

    computed: {
        containerClasses() {
            return this.styles.COLUMNS
        }
    }
}
</script>

<style scoped></style>