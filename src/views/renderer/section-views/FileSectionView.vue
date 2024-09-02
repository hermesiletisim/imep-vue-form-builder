<template>
    <div class="file-section withHover" v-if="isConfigurable">
         <div class="headline-block p5 hover-section" v-show="section.isShowHeadline">
             <h2 :class="section.headlineAdditionalClass" v-text="section.headline"></h2>
             <p :class="section.subHeadlineAdditionalClass" v-text="section.subHeadline"></p>
             <div class="section-button-group currentSectionConfig">
                 <span :class="{active:currentSectionConfig=='editable'}" @click="changeConfig('editable',section.uniqueId)">Editable</span>
                 <span :class="{active:currentSectionConfig=='read-only'}" @click="changeConfig('read-only',section.uniqueId)">Read-only</span>
                 <span :class="{active:currentSectionConfig=='hidden'}" @click="changeConfig('hidden',section.uniqueId)">Hidden</span>
             </div>
         </div>
         
         <div class="row md-layout control-list-container">
             <div class="input-group w-100 mt-2">
                 <div class="custom-file">
                     <input type="file" class="custom-file-input" id="inputGroupFile02" @change="chooseFile($event)" :disabled="isDisabled">
                     <label class="custom-file-label mb-0" for="inputGroupFile02" aria-describedby="inputGroupFileAddon02">{{file.name || "Seçili dosya yok"}}</label>
                 </div>
                 <div class="input-group-append">
                     <button class="btn mcBgDark text-white px-5" type="button" id="inputGroupFileAddon04" :disabled="isDisabled">Yükle</button>
                 </div>
 
                 <div v-show="isHidden" :id="'line-'+ section.uniqueId" class="line"></div>
             </div>
         </div>
 
     </div>
     <div v-else>
         <div v-show="!isHidden">
             <div class="headline-block p5" v-show="section.isShowHeadline">
                 <h2 :class="section.headlineAdditionalClass" v-text="section.headline"></h2>
                 <p :class="section.subHeadlineAdditionalClass" v-text="section.subHeadline"></p>
             </div>
             <div class="row md-layout control-list-container">
                 <div class="input-group w-100 mt-2" id="file-input-group">
                     <div class="custom-file">
                         <input type="file" class="custom-file-input" id="inputGroupFile02" @change="chooseFile($event)" :disabled="isDisabled">
                         <label class="custom-file-label mb-0" for="inputGroupFile02" aria-describedby="inputGroupFileAddon02">{{file.name || "Seçili dosya yok"}}</label>
                     </div>
                     <div class="input-group-append">
                         <button class="btn mcBgDark text-white px-5" type="button" id="inputGroupFileAddon04" :disabled="isDisabled" @click="submitFile()">Yükle</button>
                     </div>
                 </div>
             </div>
             <div v-if="isRenderable">
                 <div v-if="cloudApiTokens.length > 0">
                     <div class="col-12 w-100 mt-3 d-flex align-items-baseline">
                         <h5 class="modalTitle">Ekli Dosyalar</h5>
                         <i data-placement="bottom" class="fa fa-info-circle fileInfo text-muted mx-2" style="cursor:pointer;"></i>
                         <div class="fileInfoContext px-2 py-2" >
                             <p><i class="fa fa-info-circle fa-2x text-muted"></i></p>
                             <p>
                                 İndirilemeyen dosyalar için drive üçüncü taraf çerezlerini etkinleştirmeyi deneyin.
                             </p>
                         </div>
                     </div>
                     <div v-if="customerFiles.length>0" class="col-12 py-2 fileList w-100 m-0 fileScroll">
                         <div class="row w-100 m-0 mb-1">
                             <div class="col-7 fileListItemTitle px-3">Dosya Adı</div>
                             <div class="col-3 fileListItemTitle">Dosya Boyutu</div>
                         </div>
                         <div class=" row addFile w-100 m-0 mt-2" v-for="(file,index) in customerFiles" :key="index">
                             <div class="col-7 fileListItem px-3 py-3 d-flex align-items-center">{{file.file_name}}</div>
                             <div class="col-2 fileListItem py-3 d-flex align-items-center">{{file.file_size | setFileSize}}</div>
                             <div class="col-3 py-3 text-center text-sm-right">
                                 <router-link target="_blank" :to="{path:'/api/showCloudFile', query:{fileId: file._id.$oid}}">
                                     <button class="btn btn-light mr-1" data-toggle="tooltip" data-placement="top" title="İndiremediğiniz dosyalar için drive tarafında 3. parti çerezlere izin verilmesi gerekiyor ">
                                         <span class="fas fa-download"></span>
                                     </button>
                                 </router-link>
                             
                                 <button class="btn btn-light text-danger" :disabled="isDisabled" @click="deleteFile(file._id.$oid)"> 
                                     <span class="fas fa-trash-alt"></span>
                                 </button>
                             </div>
                         </div>
                     </div>
                     <div v-else class="px-3 py-2 fileList">
                         <div class="d-flex align-items-center flex-column pt-5">
                             <img src="../../../../static/images/no-file-icon.png" width="50px" height="55px" class="img-fluid" alt="no-file">                            
                             <span class="pt-2 noFile">Ekli dosya yok</span>
                         </div>
                     </div>
                 </div>
                 <div v-else class="container text-center py-5 mt-4 mb-5" style="flex-direction:column">
                     <div>
                         <img src="../../../../static/images/google-drive-icon.png" class="img-fluid">
                         <img src="../../../../static/images/baglanti-yok.png" class="img-fluid px-2">
                         <img src="../../../../static/images/logo.png" class="img-fluid w-121">
                     </div>
                     <div class="d-flex flex-column align-items-center mt-4 pb-5 mb-5">
                         <h6 class="noConnectionTitle pb-1">Bağlantı Hatası</h6>
                         <span class="noConnectionDescription pb-3">Kayıtlara dosyalarınızı ekleyebilmek için google drive hesabınızla Minimum CRM'i senkronize edin.</span>
                         <router-link tag="a"  to="/settings?tab=documentManagementSettings">
                             <button class="btn mcBgDark btn-new text-white py-2 px-4 fileListItem text-white" >Senkronizasyonu Başlat</button>
                         </router-link>
                     </div>
                 </div>
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
      * @property {Array} cloudApiTokens
      * @property {Array} customerFiles
      */
     export default {
         name: "FileSectionView",
         mixins: [RENDERER_SECTION_VIEW_MIXIN],
         data () {
             return {
                 file: {},
                 currentSectionConfig: "",
                 isConfigurable: false,
                 isRenderable:false,
                 isDisabled: false,
                 isHidden: false
             }
         },
         methods: {
             changeConfig(config, sectionId) {
                 if(this.section.uniqueId == sectionId) {
                     this.currentSectionConfig = config
                     this.section.permission[this.currentStep] = config // Deployda bu satır kaldırılacak !!!
                 }
 
                 this.$emit('changeSectionPermission',sectionId,this.currentStep,config)
             },
             chooseFile(event){
                 this.file = event.target.files[0]
             },
             submitFile() {
                 this.$root.$refs.FormRenderer.submitFile(this.file)
             },
             deleteFile(id) {
                 this.$root.$refs.FormRenderer.deleteFile(id)
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
 
         filters:{
             setFileSize(bytes){
                 if      (bytes >= 1073741824) { bytes = (bytes / 1073741824).toFixed(2) + " GB"; }
                 else if (bytes >= 1048576)    { bytes = (bytes / 1048576).toFixed(2) + " MB"; }
                 else if (bytes >= 1024)       { bytes = (bytes / 1024).toFixed(2) + " KB"; }
                 else if (bytes > 1)           { bytes = bytes + " bytes"; }
                 else if (bytes == 1)          { bytes = bytes + " byte"; }
                 else                          { bytes = "0 bytes"; }
                 return bytes;
             }
         },
 
         mounted(){
             var configurable = document.getElementById("configurable")
             if(configurable != null){
                 this.isConfigurable = true
             }
 
             var renderable = document.getElementById("renderable")
             if(renderable != null){
                 this.isRenderable = true
             }
             
             if(this.section.permission[this.currentStep]) {
                 this.currentSectionConfig = this.section.permission[this.currentStep]
             }
         },
 
     }
 </script>
 
 <style scoped>
 
     @import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css");
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
     
     .file-section {
         padding-top: 10px;
         padding-bottom: 10px;
     }
 
     .line {
         display: block;
         position: absolute;
         height: 1px;
         width: 102%;
         background: black;
         top: 50%;
         left: -1%;
         right: -1%;
         z-index: 1000;
     }
 
     #inputGroupFileAddon04 {
         border-top-right-radius: 0.25rem;
         border-bottom-right-radius: 0.25rem;
     }
 
     .modalTitle{
         color: #5b5f63 !important;
         font-size: 18px !important;
     }
 
     .fileInfo:hover + .fileInfoContext{
         display:block;
         position: absolute;
     }
     .fileInfoContext{
         display: none;
         width: 190px;
         height: 150px;
         border: 1px solid gray;
         border-radius: 4px;
         position: relative;
         top: 33px;
         z-index: 99999;
         background:#FAFAFA;
     }
 
     .fileList{
         height: 250px;
         background-color: #FAFAFA;
         border: 1px solid #E7E7E8;
         box-sizing: border-box;
         border-radius: 4px;
     }
 
     .fileScroll::-webkit-scrollbar {
         display: none;
     }
     .fileScroll {
         -ms-overflow-style: none;  /* IE and Edge */
         scrollbar-width: none;  /* Firefox */
     }
     .fileScroll {
         overflow-y: scroll; /* Add the ability to scroll */
     }
 
     .noConnectionTitle{
         font-weight: bold;
         font-size: 16px;
         line-height: 21px;
         color: #2E323C;
     }
     .noConnectionDescription{
         font-size: 16px;
         line-height: 20px;
         color: #7e8187;
         max-width: 445px;
     }
     .fileListItem{
         font-weight: 500;
         font-size: 14px;
         line-height: 21px;
         color: #7e8187;
     }
     .fileListItemTitle{
         font-weight: 500;
         font-size: 14px;
         line-height: 21px;
         color: #2E323C;
     }
 
     .addFile{
         background-color: #FAFAFA;
         border: 1px solid #E7E7E8;
         box-sizing: border-box;
         border-radius: 4px;
     }
 </style>
 