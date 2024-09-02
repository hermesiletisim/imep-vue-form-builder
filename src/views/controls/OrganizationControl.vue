<template>
    <div class="organization-input">
        <input :id="control.uniqueId"
           :type="control.typeAttribute"
           :class="controlFieldClass"
           :value="value"
           v-model="fullOrgName"
           :name="control.name || control.uniqueId"
           :placeholder="control.placeholderText"
           v-on:keyup="getOrganizations($event.target.value)"
           :disabled="isReadOnly"
        />
        <ul class="new-dropdown border-0 p-0 autocomplete-results" v-show='listOptions.length>0'>
            <div v-if="listOptions.length>0">
                <li class="autocomplete-result"  v-for='(result, i) in listOptions' :key="i" @click="setResult(result)">{{result.name}}</li>
            </div>
            <div v-if="listOptions.length<1">
                <li class="autocomplete-result" >NOT FOUND</li>
            </div>
        </ul>
    </div>
    
    
</template>

<script>
    import {CONTROL_FIELD_EXTEND_MIXIN} from "@/mixins/control-field-extend-mixin";
    import axios from 'axios'
    import {mapState} from 'vuex'
    

    /**
     * Dropdown Control.
     * I've been thinking all day, all night, should I use some library (select2, choices.js,...)
     * But, after some researched via https://bundlephobia.com/ , I decided to use Native Select instead
     * In order to save some KBs, the bundle is kinda bigger now @@
     * @property {ListItem[]} listOptions
     */
    export default {
        name: "UserControl",
        mixins: [CONTROL_FIELD_EXTEND_MIXIN],
        props: ['isReadOnly'],
        data: () => ({
            listOptions: [],
            fullOrgName:""
        }),

        watch: {
            fullOrgName: function() {
                if(this.fullOrgName === ""){
                    this.listOptions = []
                }
            }
        },
        computed: {
          ...mapState([
              'baseUrl'
            ]),
        },

        methods: {
            getOrganizations(keyWord){
                this.fullOrgName = keyWord
               
                var dataObj={
                    search:keyWord
                }
                
                axios({
                    method:'POST',
                    url:'/quickFilterOrganization',
                    baseURL: this.baseUrl,
                    data: dataObj,
                    withCredentials:true
                }).then((res)=>{
                    return res
                }).then((res)=>{
                    if(!res.data.status){
                         
                    }
                    if(res.data.status.code==0){
                        this.listOptions = res.data.content.organizations
                    }
                })
                                              
            },
            setResult(res){
                const result = this.listOptions.filter(item => item._id.$oid == res._id.$oid)
                
                this.fullOrgName = result[0].name
                this.listOptions = []
                this.updateValue(res._id.$oid)
            },

        },

    }
</script>

<style scoped>

</style>