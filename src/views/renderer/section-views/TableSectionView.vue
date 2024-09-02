<template>
    <div class="table-section withHover" v-if="isConfigurable">
        <div class="headline-block p5 hover-section" v-show="section.isShowHeadline">
            <h2 :class="section.headlineAdditionalClass" v-text="section.headline"></h2>
            <p :class="section.subHeadlineAdditionalClass" v-text="section.subHeadline"></p>
            <div class="section-button-group currentSectionConfig">
                <span :class="{active:currentSectionConfig=='editable'}" @click="changeConfig('editable',section.uniqueId)">Editable</span>
                <span :class="{active:currentSectionConfig=='read-only'}" @click="changeConfig('read-only',section.uniqueId)">Read-only</span>
                <span :class="{active:currentSectionConfig=='hidden'}" @click="changeConfig('hidden',section.uniqueId)">Hidden</span>
            </div>
        </div>

        <div class="table-wrapper">
            <vue-excel-editor :class="styles.TABLE.TABLE_CLASS" ref="grid" v-model="valueContainer[section.uniqueId]" no-footer :readonly="isDisabled" :readonly-style="readOnlyStyle">
                <vue-excel-column
                    :key="column"
                    :init-style="columnStyle"
                    v-for="column in section.tableObject.tableColumns"
                    :field="column"
                    :label="column"
                    width="160px"
                />
            </vue-excel-editor>

            <div v-show="isHidden" :id="'line-'+ section.uniqueId" class="line"></div>
        </div>
    </div>
    <div v-else class="table-section">
        <div v-show="!isHidden">
            <div class="headline-block p5" v-show="section.isShowHeadline">
                <h2 :class="section.headlineAdditionalClass" v-text="section.headline"></h2>
                <p :class="section.subHeadlineAdditionalClass" v-text="section.subHeadline"></p>
            </div>

            <div class="table-wrapper">
                <div class="mb-2">
                    <button type="button" class="btn btn-light btn-sm" style="font-size:0.8rem;" @click="addRow">Add row</button>
                </div>
                <vue-excel-editor :class="styles.TABLE.TABLE_CLASS" ref="grid" v-model="valueContainer[section.uniqueId]" no-footer :readonly="isDisabled" :readonly-style="readOnlyStyle">
                    <vue-excel-column
                        :key="column"
                        :init-style="columnStyle"
                        v-for="column in section.tableObject.tableColumns"
                        :field="column"
                        :label="column"
                        width="160px"
                    />
                </vue-excel-editor>
            </div>
        </div>
    </div>
</template>

<script>
    import {SECTION_VIEW_MIXINS} from "@/mixins/section-view-mixins";
    import {STYLE_INJECTION_MIXIN} from "@/mixins/style-injection-mixin";
    import AddRowControl from "@/views/builder/add-controls/AddRowControl";
    import TableRowView from "@/views/builder/row-views/TableRowView";

    export default {
        name: "TableSectionView",
        components: {TableRowView, AddRowControl},
        mixins: [SECTION_VIEW_MIXINS, STYLE_INJECTION_MIXIN],
        props: {
            valueContainer: {
                type: Object,
                required: true
            },
            currentStep: {
                type: String,
                required: true
            },
        },
        data() {
            return {
                columnStyle: {
                    color: "black",
                },
                newColumn: "",
                currentSectionConfig: "",
                isConfigurable: false,
                isDisabled: false,
                isHidden: false,
                readOnlyStyle: {
                    background: "#f2f2f2"
                }
            };
        },

        methods: {
            openModal(){
                $('#'+ this.section.uniqueId).modal('show')
            },
            addColumn() {
                this.section.tableObject.tableColumns.push(this.newColumn);
                for(let item of this.section.tableObject.data){
                    item[this.newColumn] = ""
                }
                this.newColumn = ""
                $('#'+ this.section.uniqueId).modal('hide')
            },
            addRow() {
                let newRow = {}
                
                const keys = Object.keys(this.valueContainer[this.section.uniqueId][0])

                keys.forEach( key => {
                    if(key !== '$id') {
                        newRow[key] = ""
                    }
                })
                
                this.valueContainer[this.section.uniqueId].push(newRow)
         
            },
            changeConfig(config, sectionId) {
                if(this.section.uniqueId == sectionId) {
                    this.currentSectionConfig = config
                    this.section.permission[this.currentStep] = config 
                }

                if(config == "hidden"){
                    var section = document.getElementById(sectionId)
                    var table = section.getElementsByClassName("component-content")
                    var width = table[0].offsetWidth + 20
                    var line = document.getElementById("line-"+sectionId)
                    line.setAttribute('style', 'width:'+ width + 'px;')
                }

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
                    this.readOnlyStyle.background = '#f2f2f2'
                    this.isDisabled = true
                    this.isHidden = false
                }
                else if(val == 'hidden') {
                    this.readOnlyStyle.background = '#fff'
                    this.isDisabled = false
                    this.isHidden = true
                }
                else {
                    this.readOnlyStyle.background = '#fff'
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

    .line {
        display: block;
        position: absolute;
        height: 1px;
        width: 100px;
        background: black;
        top: 50%;
        left: -10px;
        z-index: 1000;
    }
    .table-wrapper {
        position: relative;
    }
</style>