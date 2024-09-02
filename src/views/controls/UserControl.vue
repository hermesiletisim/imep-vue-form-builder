<template>
    <div class="person-input">
        <input :id="control.uniqueId"
           :type="control.typeAttribute"
           :class="controlFieldClass"
           :value="value"
           v-model="fullName"
           :name="control.name || control.uniqueId"
           :placeholder="control.placeholderText"
           v-on:keyup="getContacts($event.target.value)"
           :disabled="isReadOnly"
        />
        <ul class="new-dropdown border-0 p-0 autocomplete-results" v-show='listOptions.length>0'>
            <div v-if="listOptions.length>0">
                <li class="autocomplete-result" v-for='(result, i) in listOptions' :key="i" @click="setResult(result)">{{result.n}} {{result.sn}}</li>
            </div>
            <div v-if="listOptions.length<1">
                <li class="autocomplete-result" >NOT FOUND</li>
            </div>
        </ul>
    </div>
    
    
</template>

<script>
    import {CONTROL_FIELD_EXTEND_MIXIN} from "@/mixins/control-field-extend-mixin";
    import {DROPDOWN_DATA_MODES} from "@/configs/control-config-enum";
    import ListItem from "@/libraries/list-item.class";
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
            fullName:""
        }),

        watch: {
            fullName: function() {
                if(this.fullName === ""){
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
            getContacts(keyWord){
                this.fullName = keyWord
               
                var dataObj={
                    search:keyWord
                }
                
                axios({
                    method:'POST',
                    url:'/quickFilterContact',
                    baseURL: this.baseUrl,
                    data: dataObj,
                    withCredentials:true
                }).then((res)=>{
                    return res
                }).then((res)=>{
                    if(!res.data.status){
                         
                    }
                    if(res.data.status.code==0){
                        this.listOptions = res.data.content.contacts
                    }
                })
                                                 
            },
            setResult(res){
                const result = this.listOptions.filter(item => item._id.$oid == res._id.$oid)

                if(result[0].sn !== undefined){
                    this.fullName = result[0].n + " " + result[0].sn
                }
                else{
                    this.fullName = result[0].n
                }
                this.listOptions = []
                this.updateValue(res._id.$oid)
            },
        },

    }
</script>

<style scoped>

</style>