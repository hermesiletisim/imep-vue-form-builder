<template>
    <div class="section-container">
        <component
            :is="sectionViewComponent"
            :section="section"
            :rows="rows"
            :controls="controls"
            :key="section.uniqueId"
            :value-container="valueContainer"
            :validation-errors="validationErrors"
            :read-only="readOnly"
            :current-step="currentStep"
            :customerFiles="customerFiles"
            :cloudApiTokens="cloudApiTokens"
            @changeControlPermission="changeControlPermission"
            @changeSectionPermission="changeSectionPermission"
        />
    </div>
    
</template>

<script>
    import {SECTION_TYPES} from "@/configs/section";
    import FormBuilderBusiness from "@/mixins/form-builder-mixins";

    export default {
        name: "SectionContainer",
        mixins: FormBuilderBusiness,
        props: {
            section: Object,
            rows: Object,
            controls: Object,
            valueContainer: Object,
            validationErrors: Object,
            readOnly: Boolean,
            currentStep: String,
            customerFiles: Array,
            cloudApiTokens: Array
        },

        computed: {
            sectionViewComponent() {
                return SECTION_TYPES[this.section.type].rendererView
            }
        },

        methods: {
            changeControlPermission(id, step, config) {
                this.$emit("changeControlPermission", id, step, config)
            },
            changeSectionPermission(id, step, config) {
                this.$emit("changeSectionPermission", id, step, config)
            }
        },

        created() {
            // console.log(this.section);
        }
    }
</script>

<style scoped>
</style>