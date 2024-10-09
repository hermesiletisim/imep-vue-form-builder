<template>
    <div :class="dynamicClass">
        <input :id="control.uniqueId" :type="control.typeAttribute" :class="controlFieldClass" :value="value"
            v-model="vModel" :name="control.name || control.uniqueId" :placeholder="control.placeholderText"
            :disabled="isReadOnly" />
    </div>


</template>

<script>
import { CONTROL_FIELD_EXTEND_MIXIN } from "@/mixins/control-field-extend-mixin";

export default {
    name: "CustomFieldControl",
    mixins: [CONTROL_FIELD_EXTEND_MIXIN],
    props: ['isReadOnly'],
    data: () => ({
        vModel: "",
        reloadInput: false,
    }),

    computed: {
        dynamicClass() {
            // Dynamically construct the class name
            return `customfield-${this.control.type}-input`;
        }
    },

    methods: {

    },

}
</script>

<style scoped></style>