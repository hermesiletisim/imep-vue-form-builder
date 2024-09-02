<template>
    <div class="file-section">
        <div class="headline-block p5" v-show="section.isShowHeadline">
            <h2 :class="section.headlineAdditionalClass" v-text="section.headline"></h2>
            <p :class="section.subHeadlineAdditionalClass" v-text="section.subHeadline"></p>
        </div>
        <div class="row md-layout control-list-container">
            <div class="input-group w-100 mt-2">
                <div class="custom-file">
                    <input type="file" class="custom-file-input" id="inputGroupFile02" @change="chooseFile($event)">
                    <label class="custom-file-label mb-0" for="inputGroupFile02" aria-describedby="inputGroupFileAddon02">{{file.name || "Seçili dosya yok"}}</label>
                </div>
                <div class="input-group-append">
                    <button class="btn mcBgDark text-white px-5" type="button" id="inputGroupFileAddon04">Yükle</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {SECTION_VIEW_MIXINS} from "@/mixins/section-view-mixins";
    import {STYLE_INJECTION_MIXIN} from "@/mixins/style-injection-mixin";

    export default {
        name: "FileSectionView",
        components: {},
        mixins: [SECTION_VIEW_MIXINS, STYLE_INJECTION_MIXIN],
        data() {
            return {
                file: {}
            };
        },

        methods: {
            chooseFile(event){
                this.file = event.target.files[0]
            }
        },
        mounted() {

        }
    }
</script>

<style scoped>

    .custom-file-label{
        padding-left:80px;
        color: #D1D1D7;
        font-size: 14px;
        font-weight: 500;
        line-height: 24px;
        overflow: hidden;
    }
    .custom-file-label::after{
        left: 0;
        right: auto;
        content: "Göz At";
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        background-color: #3767a0 !important;
        cursor: pointer !important;
        color: #fff !important;
    }
    .mcBgDark {
        background-color: #3767a0 !important;
    }
</style>