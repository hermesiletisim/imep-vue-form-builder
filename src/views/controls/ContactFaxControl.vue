<template>
    <div class="contact-fax-input">
        <input :id="control.uniqueId" :type="control.typeAttribute" :class="controlFieldClass" :value="value"
            v-model="contactFax" :name="control.name || control.uniqueId" :placeholder="control.placeholderText"
            :disabled="isReadOnly" />
    </div>


</template>

<script>
import { CONTROL_FIELD_EXTEND_MIXIN } from "@/mixins/control-field-extend-mixin";

export default {
    name: "ContactFaxControl",
    mixins: [CONTROL_FIELD_EXTEND_MIXIN],
    props: ['isReadOnly'],
    data: () => ({
        contactFax: "",
        reloadInput: false,
    }),

    methods: {

    },

}
</script>

<style scoped></style>