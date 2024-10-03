<template>
    <div class="person-input">
        <input :id="control.uniqueId" :type="control.typeAttribute" :class="controlFieldClass" :value="writeResult2(value)"
            v-model="fullName" :name="control.name || control.uniqueId" :placeholder="control.placeholderText"
            v-on:keyup="getContacts($event.target.value)" :disabled="isReadOnly" />
        <ul class="new-dropdown border-0 p-0 autocomplete-results" v-show='listOptions.length > 0'>
            <div v-if="listOptions.length > 0">
                <li class="autocomplete-result" v-for='(result, i) in listOptions' :key="i" @click="setResult(result)">
                    {{ writeResult(result) }}</li>
            </div>
            <div v-if="listOptions.length < 1">
                <li class="autocomplete-result">NOT FOUND</li>
            </div>
        </ul>
    </div>


</template>

<script>
import { CONTROL_FIELD_EXTEND_MIXIN } from "@/mixins/control-field-extend-mixin";
import { DROPDOWN_DATA_MODES } from "@/configs/control-config-enum";
import ListItem from "@/libraries/list-item.class";
import axios from 'axios'



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
        fullName: "",
        reloadInput: false,
    }),

    watch: {
        fullName: function () {
            if (this.fullName === "") {
                this.listOptions = []
            }
        }
    },


    methods: {
        getContacts(keyWord) {
            console.log("logggggggggggggggggg")
            console.log(keyWord)
            this.fullName = keyWord

            var dataObj = {
                search: keyWord
            }
            console.log("quickFilterContacts")
            axios({
                method: 'POST',
                url: '/quickFilterContacts',
                baseURL: "https://new.iletisimmakinesi.com/api",
                data: dataObj,
                withCredentials: true
            }).then((res) => {
                return res
            }).then((res) => {
                if (!res.data.status) {

                }
                if (res.data.status.code == 0) {
                    this.listOptions = res.data.content.contacts
                }
            })

        },
        setResult(res) {
            const result = this.listOptions.filter(item => item._id.$oid == res._id.$oid)

            if (result[0].name !== undefined) {
                this.fullName = result[0].name
                if (result[0].surName !== undefined) {
                    this.fullName += ' ' + result[0].surName
                }
            }
            else if (result[0].surName !== undefined) {
                this.fullName = result[0].surName
                if (result[0].name !== undefined) {
                    this.fullName = result[0].name + ' ' + result[0].surName
                }
            }
            else if (result[0].email !== undefined) {
                this.fullName = result[0].email
            }
            else if (result[0].phone !== undefined) {
                this.fullName = result[0].phone
            }
            else {
                this.fullName = ""
            }

            this.listOptions = []
            this.updateValue(res)
        },
        writeResult(res) {
            console.log(res)
            const result = this.listOptions.filter(item => item._id.$oid == res._id.$oid)
            let displayVal
            if (result[0].name !== undefined) {
                displayVal = result[0].name
                if (result[0].surName !== undefined) {
                    displayVal += ' ' + result[0].surName
                }
            }
            else if (result[0].surName !== undefined) {
                displayVal = result[0].surName
                if (result[0].name !== undefined) {
                    displayVal = result[0].name + ' ' + result[0].surName
                }
            }
            else if (result[0].email !== undefined) {
                displayVal = result[0].email
            }
            else if (result[0].phone !== undefined) {
                displayVal = result[0].phone
            }
            else {
                displayVal = ""
            }
            return displayVal;

        },
        writeResult2(res) {
            console.log(res)
            if (res.name !== undefined) {
                this.fullName = res.name
                if (res.surName !== undefined) {
                    this.fullName += ' ' + res.surName
                }
            }
            else if (res.surName !== undefined) {
                this.fullName = res.surName
                if (res.name !== undefined) {
                    this.fullName = res.name + ' ' + res.surName
                }
            }
            else if (res.email !== undefined) {
                this.fullName = res.email
            }
            else if (res.phone !== undefined) {
                this.fullName = res.phone
            }
            else {
                this.fullName = ""
            }


            return this.fullName;

        }
    },

}
</script>

<style scoped></style>