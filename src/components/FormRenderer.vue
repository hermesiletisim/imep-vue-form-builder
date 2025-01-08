<template>
    <div :class="[styles.CONTAINER.FLUID, 'form-padding', 'vue-form-renderer']">

        <!-- Render Form Tag Or Not -->
        <form
            v-if="formData.formConfig.renderFormTag"
            :action="formData.formConfig.formActionURL"
            :method="formData.formConfig.formMethod"
            :id="formTagId"
            @submit.prevent
        >
            <!-- form headline -->
            <div class="form-headline-container" v-show="formData.formConfig.isShowHeadline">
                <h1 v-text="formData.formConfig.headline"></h1>
                <p v-text="formData.formConfig.subHeadline"></p>
            </div>

            <!-- sections of the form -->
            <SectionContainer
                v-for="(sectionData) in sortedSections"
                :id="sectionData.uniqueId"
                :section="sectionData"
                :rows="formData.rows"
                :controls="formData.controls"
                :key="sectionData.uniqueId"
                :value-container="valueContainer"
                :validation-errors="validationErrors"
                :read-only="readOnly"
                :current-step="currentStep"
                @changeControlPermission="changeControlPermission"
                @changeSectionPermission="changeSectionPermission"
                :cloudApiTokens="[]"
                :customerFiles="[]"
            />
        </form>
        <template v-else>

            <!-- form headline -->
            <div class="form-headline-container" v-show="formData.formConfig.isShowHeadline">
                <h1 v-text="formData.formConfig.headline"></h1>
                <p v-text="formData.formConfig.subHeadline"></p>
            </div>

            <!-- sections of the form -->
            <SectionContainer
                v-for="(sectionData) in sortedSections"
                :id="sectionData.uniqueId"
                :section="sectionData"
                :rows="formData.rows"
                :controls="formData.controls"
                :key="sectionData.uniqueId"
                :value-container="valueContainer"
                :validation-errors="validationErrors"
                :read-only="readOnly"
                :current-step="currentStep"
                @changeControlPermission="changeControlPermission"
                @changeSectionPermission="changeSectionPermission"
                :cloudApiTokens="cloudApiTokens"
                :customerFiles="customerFiles"
            />

        </template>
    </div>
</template>

<script>
    import FormRendererBusiness from "@/mixins/form-renderer-mixins";
    import SectionContainer from "@/views/renderer/SectionContainer";

    export default {
        name: "FormRenderer",
        components: {SectionContainer},
        mixins: FormRendererBusiness,
        data: () => ({
            formData: null
        }),

        created() {
            this.$root.$refs.FormRenderer = this
        },

        methods: {
            changeControlPermission(id, step, config) {
                let obj = {
                    id: id,
                    step: step,
                    config: config
                }
                this.$emit("changeControlPermission",obj)
            },
            changeSectionPermission(id, step, config) {
                let obj = {
                    id: id,
                    step: step,
                    config: config
                }
                // console.log(this.formData);
                this.$emit("changeSectionPermission",obj)
            },
            submitFile(file) {
                this.$emit("submitFile",file)
            },
            deleteFile(id) {
                this.$emit("deleteFile",id)
            }
        }
    }
</script>