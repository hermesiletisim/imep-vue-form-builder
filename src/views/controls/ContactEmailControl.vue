<template>
    <div class="contact-email-input">
        <input :id="control.uniqueId" :type="control.typeAttribute" :class="controlFieldClass" :value="value"
            v-model="contactEmail" :name="control.name || control.uniqueId" :placeholder="control.placeholderText"
            :disabled="isReadOnly" />
    </div>


</template>

<script>
import { CONTROL_FIELD_EXTEND_MIXIN } from "@/mixins/control-field-extend-mixin";

export default {
    name: "ContactEmailControl",
    mixins: [CONTROL_FIELD_EXTEND_MIXIN],
    props: ['isReadOnly'],
    data: () => ({
        contactEmail: "",
        reloadInput: false,
    }),

    methods: {

    },

}
</script>

<style scoped></style>