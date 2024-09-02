<template>
    <div :class="[control.containerClass, 'control-view-wrapper', control.additionalContainerClass]">
        <div v-if="isConfigurable" class="control-view hover-effect">

            <!-- render the label, readonly should show the label -->
            <ControlLabel
                v-show="control.isShowLabel || readOnly"
                :control="control"
                :read-only="readOnly"
                :isHidden="isHidden"
            />

            <!-- render the exact field -->
            <component
                v-if="!readOnly"
                v-model="valueContainer[controlName]"
                :is="controlComponent"
                :control="control"
                :value-container="valueContainer"
                :class="validationErrorClasses"
                :isReadOnly="isDisabled"
            />
            <p v-else v-text="valueContainer[controlName]" />

            <div class="button-group currentConfig">
                <span :class="{active:currentConfig=='editable'}" @click="changeConfig('editable',control.uniqueId)">Editable</span>
                <span :class="{active:currentConfig=='read-only'}" @click="changeConfig('read-only',control.uniqueId)">Read-only</span>
                <span :class="{active:currentConfig=='hidden'}" @click="changeConfig('hidden',control.uniqueId)">Hidden</span>
            </div>
            <!-- validation error -->
            <template v-if="hasValidationError">
                <div v-for="(mess, i) in validationErrorMessages"
                     :key="i"
                     v-text="mess"
                     :class="styles.FORM.ERROR_MESSAGE"
                ></div>
            </template>
        </div>


        <div v-else class="control-view">
            <div v-show="!isHidden">
                <!-- render the label, readonly should show the label -->
                <ControlLabel
                    v-show="control.isShowLabel || readOnly"
                    :control="control"
                    :read-only="readOnly"
                />

                <!-- render the exact field -->
                <component
                    v-model="valueContainer[controlName]"
                    :is="controlComponent"
                    :control="control"
                    :value-container="valueContainer"
                    :class="validationErrorClasses"
                    :isReadOnly="isDisabled"
                />
                <!-- <p
                    v-else
                    v-text="valueContainer[controlName]"
                /> -->
                <!-- validation error -->
                <template v-if="hasValidationError">
                    <div v-for="(mess, i) in validationErrorMessages"
                        :key="i"
                        v-text="mess"
                        :class="styles.FORM.ERROR_MESSAGE"
                    ></div>
                </template>
            </div>
        </div>

        <div class="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <h5>Kontrollerde değişiklik yapabilmeniz için ilgili bölümün ayarını değiştirmelisiniz!</h5>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">İptal</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {STYLE_INJECTION_MIXIN} from "@/mixins/style-injection-mixin";
    import ControlLabel from "@/views/builder/control-views/ControlLabel";
    import {CONTROLS} from "@/configs/controls";

    export default {
        name: "ControlView",
        components: {ControlLabel},
        mixins: [STYLE_INJECTION_MIXIN],
        props: {
            control: {
                type: Object,
                required: true
            },
            parentId: {
                type: String,
                required: true,
            },
            valueContainer: {
                type: Object,
                required: true
            },
            validationErrors: {
                type: Object,
                default: () => ({}) // empty object
            },
            readOnly: {
              type: Boolean,
              default: false,
            },
            currentStep: {
                type: String,
                required: true
            },
            sectionConfig: {
                type: String,
                required: false
            }
        },
        data () {
            return {
                isConfigurable: false,
                currentConfig: "",
                isDisabled: false,
                isHidden: false
            }
        },
        methods:{
            changeConfig(config, controlId) {
                if((config !== this.sectionConfig) && (this.sectionConfig == 'read-only' || this.sectionConfig == 'hidden')) {
                    $('#staticBackdrop').modal('show')
                    return false
                }
                if(this.control.uniqueId == controlId) {
                    this.currentConfig = config
                    // this.control.permission[this.currentStep] = config // Deployda bu satır kaldırılacak !!!
                }
                // console.log(this.control);
                this.$emit('changeControlPermission',controlId,this.currentStep,config)
            }
        },
        computed: {
            
            /**
             * This accessor will get the component object to let us inject the right control
             */
            controlComponent() {
                
                // validate input
                if (!CONTROLS[this.control.type] || !CONTROLS[this.control.type].fieldComponent) {
                    throw new TypeError(`Control Type Mapping failed => Can't be rendered. Reason: Your control type ${this.control.type} doesn't have 'fieldComponent' property`)
                }

                return CONTROLS[this.control.type].fieldComponent
            },

            /**
             * Generate Control Base Name
             * @returns {string}
             */
            controlName() {
                return this.control.name || this.control.uniqueId
            },

            /**
             * Check if current control has validation error(s)
             * @returns {boolean}
             */
            hasValidationError() {
                return !!this.validationErrors[this.controlName]
            },

            /**
             * Short-Path access to the Validation Error MEssages List
             * @returns {String[]}
             */
            validationErrorMessages() {
                return this.validationErrors[this.controlName]
            },

            validationErrorClasses() {
                const classes = {};
                classes[this.styles.FORM.ERROR_OUTLINE] = this.hasValidationError
                return classes
            },
        },
        mounted(){
            var configurable = document.getElementById("configurable")
            if(configurable != null){
                this.isConfigurable = true
            }
            
            if(this.control.permission[this.currentStep] && (this.sectionConfig != 'read-only' && this.sectionConfig != 'hidden')) {
                this.currentConfig = this.control.permission[this.currentStep]
            }
        },

        watch: {
            currentStep: function(val) {
                if(this.control.permission[val]) {
                    this.currentConfig = this.control.permission[val]
                }
                else{
                    this.currentConfig = ""
                }
            },
            currentConfig: function(val) {
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
            sectionConfig:{
                immediate: true,
                handler(val) {
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

                    this.changeConfig(val, this.control.uniqueId)
                }
            }
        },
    }
</script>

<style>
    .button-group {
        display: none;
        position:absolute; 
        top:15%; 
        left:30%; 
        box-shadow: 1px 1px 5px 0.1px grey; 
        background-color:white; 
        cursor:pointer; 
        z-index:100;
    }
    .currentConfig .active {
        background:#EFF3F8;
    }

    .button-group > span {
        display:block; 
        padding: 15px 50px 15px 15px;
    }

    .button-group > span:hover {
        background:#EFF3F8;
    }

    .hover-effect:hover > .button-group {
        display: block;
    }

</style>