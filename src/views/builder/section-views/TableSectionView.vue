<template>
    <div class="table-section">
        <div class="headline-block p5" v-show="section.isShowHeadline">
            <h2 :class="section.headlineAdditionalClass" v-text="section.headline"></h2>
            <p :class="section.subHeadlineAdditionalClass" v-text="section.subHeadline"></p>
        </div>

        <div class="table-wrapper">

            <div class="mb-2">
                <button type="button" class="btn btn-light btn-sm mr-2" style="font-size:0.8rem;" @click="openModal">Add column</button>
                <button type="button" class="btn btn-light btn-sm" style="font-size:0.8rem;" @click="addRow">Add row</button>
            </div>
            <vue-excel-editor :class="styles.TABLE.TABLE_CLASS" ref="grid" v-model="section.tableObject.data" no-footer>
                <vue-excel-column
                    :key="column"
                    :init-style="columnStyle"
                    v-for="column in section.tableObject.tableColumns"
                    :field="column"
                    :label="column"
                    width="160px"
                />
            </vue-excel-editor>

            <div class="modal" tabindex="-1" :id="section.uniqueId">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header py-2">
                            <h6 class="mt-2"><strong>Column name</strong></h6>
                        </div>
                        <div class="modal-body">
                            <input class="new-input bg-white" type="text" v-model="newColumn">
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" @click="addColumn">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {SECTION_VIEW_MIXINS} from "@/mixins/section-view-mixins";
    import {STYLE_INJECTION_MIXIN} from "@/mixins/style-injection-mixin";
    import AddRowControl from "@/views/builder/add-controls/AddRowControl";
    import TableRowView from "@/views/builder/row-views/TableRowView";
    import Vue from 'vue';
    import VueExcelEditor from 'vue-excel-editor';

    
    Vue.use(VueExcelEditor)

    export default {
        name: "TableSectionView",
        components: {TableRowView, AddRowControl},
        mixins: [SECTION_VIEW_MIXINS, STYLE_INJECTION_MIXIN],
        data() {
            return {
                columnStyle: {
                    color: "black",
                },
                newColumn: "",
                tempSectionKey:""
            };
        },

        methods: {
            openModal(){
                $('#'+ this.section.uniqueId).modal('show')
                console.log(this.section);
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
                console.log(this.section);
                let newRow = {}
                if(this.section.tableObject.tableColumns.length>0){
                    for(let item of this.section.tableObject.tableColumns){
                        newRow[item] = ""
                    }
                    this.section.tableObject.data.push(newRow)
                }
            }
        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>