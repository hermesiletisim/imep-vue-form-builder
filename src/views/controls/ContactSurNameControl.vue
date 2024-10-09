<template>
    <div class="contact-surname-input">
        <input
            :id="control.uniqueId"
            :type="control.typeAttribute"
            :class="controlFieldClass"
            :value="value"
            :name="control.name || control.uniqueId"
            :placeholder="control.placeholderText"
            @input="updateValue($event.target.value)"
            :disabled="isReadOnly"
        />
    </div>


</template>

<script>
import { CONTROL_FIELD_EXTEND_MIXIN } from "@/mixins/control-field-extend-mixin";

export default {
    name: "ContactSurNameControl",
    mixins: [CONTROL_FIELD_EXTEND_MIXIN],
    props: ['isReadOnly']

}
</script>

<style scoped></style>