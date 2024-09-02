<template>
    <div class="normal-section withHover" v-if="isConfigurable">
        <div class="headline-block hover-section" v-show="section.isShowHeadline">
            <h2 :class="section.headlineAdditionalClass" v-text="section.headline"></h2>
            <p :class="section.subHeadlineAdditionalClass" v-text="section.subHeadline"></p>
            <div class="section-button-group currentSectionConfig">
                <span :class="{active:currentSectionConfig=='editable'}" @click="changeConfig('editable',section.uniqueId)">Editable</span>
                <span :class="{active:currentSectionConfig=='read-only'}" @click="changeConfig('read-only',section.uniqueId)">Read-only</span>
                <span :class="{active:currentSectionConfig=='hidden'}" @click="changeConfig('hidden',section.uniqueId)">Hidden</span>
            </div>
        </div>

        <div :class="containerClasses">
            <ControlView
                v-for="controlId in section.controls"
                :key="controlId"
                :control="controls[controlId]"
                :parent-id="section.uniqueId"
                :value-container="valueContainer"
                :validation-errors="validationErrors"
                :read-only="readOnly"
                :current-step="currentStep"
                :sectionConfig="section.permission[currentStep]"
                @changeControlPermission="changeControlPermission"
            />
        </div>
    </div>
    <div class="normal-section" v-else>
        <div v-show="!isHidden">
            <div class="headline-block" v-show="section.isShowHeadline">
                <h2 :class="section.headlineAdditionalClass" v-text="section.headline"></h2>
                <p :class="section.subHeadlineAdditionalClass" v-text="section.subHeadline"></p>
            </div>

            <div :class="containerClasses">
                <ControlView
                    v-for="controlId in section.controls"
                    :key="controlId"
                    :control="controls[controlId]"
                    :parent-id="section.uniqueId"
                    :value-container="valueContainer"
                    :validation-errors="validationErrors"
                    :read-only="readOnly"
                    :current-step="currentStep"
                    :sectionConfig="section.permission[currentStep]"
                    @changeControlPermission="changeControlPermission"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import {RENDERER_SECTION_VIEW_MIXIN} from "@/mixins/renderer-section-view-mixin";

    /**
     * @property {Object} section
     * @property {Object} rows RowId - RowData
     * @property {Object} controls ControlId - ControlData
     * @property {Array} section.rows
     * @property {Array} section.controls
     * @property {String} currentStep
     */
    export default {
        name: "NormalSectionView",
        mixins: [RENDERER_SECTION_VIEW_MIXIN],
        data () {
            return {
                currentSectionConfig: "",
                isConfigurable: false,
                isDisabled: false,
                isHidden: false
            }
        },
        methods: {
            changeControlPermission(id, step, config) {
                // console.log(this.controls);
                this.$emit("changeControlPermission", id, step, config)
            },
            changeConfig(config, sectionId) {
                if(this.section.uniqueId == sectionId) {
                    this.currentSectionConfig = config
                    this.section.permission[this.currentStep] = config // Deployda bu satır kaldırılacak !!!
                }
                // console.log(this.control);
                this.$emit('changeSectionPermission',sectionId,this.currentStep,config)
                
            }
        },

        watch: {
            currentStep: function(val) {
                if(this.section.permission[val]) {
                    this.currentSectionConfig = this.section.permission[val]
                }
                else{
                    this.currentSectionConfig = ""
                }
            },
            currentSectionConfig: function(val) {
                if(val == 'read-only') {
                    this.isDisabled = true
                    this.isHidden = false
                }
                else if(val == 'hidden') {
                    this.isDisabled = false
                    this.isHidden = true
                }
                else {
                    this.isDisabled = false
                    this.isHidden = false
                }
            },
        },

        mounted(){
            var configurable = document.getElementById("configurable")
            if(configurable != null){
                this.isConfigurable = true
            }
            
            if(this.section.permission[this.currentStep]) {
                this.currentSectionConfig = this.section.permission[this.currentStep]
            }
        },

    }
</script>

<style scoped>

    .hover-section {
        position: relative;
    }
    .section-button-group {
        display: none; 
        grid-template-columns: 90px 90px 90px; 
        grid-gap: 1px;
        border: 0.5px solid #A8A6A6; 
        position:absolute; 
        top:10%; 
        right:2%; 
        box-shadow: 1px 1px 5px 0.1px grey; 
        background-color:white; 
        cursor:pointer; 
        z-index:100;
    }

    .hover-section:hover > .section-button-group {
        display: inline-grid;
    }

    .withHover:hover   {
        background:#E9EDF580; 
        padding-left:10px; 
        padding-right:10px;
    }

    .section-button-group > span {
        display:block; 
        padding: 5px; 
        text-align:center; 
        border-right:0.5px solid #909090; 
    }

    .currentSectionConfig .active {
        background:#EFF3F8;
    }
</style>
