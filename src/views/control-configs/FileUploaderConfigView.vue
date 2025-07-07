<template>
    <div>

        <div :class="styles.FORM.FORM_GROUP">
            <label>Buton İsmi</label>
            <input type="text" :class="styles.FORM.FORM_CONTROL" v-model="control.buttonLabel">
        </div>

        <!-- <div :class="styles.FORM.FORM_GROUP">
            <label>Button Classes</label>
            <input type="text" :class="styles.FORM.FORM_CONTROL" v-model="control.buttonClasses">
        </div>


        <div :class="styles.FORM.FORM_GROUP">
            <label>(API) Post-Action URL</label>
            <input type="text" :class="styles.FORM.FORM_CONTROL" v-model="control.postActionURL">
        </div> -->

        <div :class="styles.FORM.FORM_GROUP">
            <label>Desteklenen Dosya Türleri</label>
            <input type="text" :class="styles.FORM.FORM_CONTROL" v-model="control.accept">
        </div>

        <div :class="styles.FORM.FORM_GROUP">
            <label>İzin Verilen Uzantılar</label>
            <input type="text" :class="styles.FORM.FORM_CONTROL" v-model="control.extensions">
        </div>

        <div :class="styles.FORM.FORM_GROUP">
            <label>Maksimum Boyut (byte türünden - 0: sınırsız)</label>
            <input type="number" :class="styles.FORM.FORM_CONTROL" v-model="control.maxSize">
        </div>

        <div :class="styles.FORM.FORM_GROUP">
            <label>Birden Fazla Dosya Yükleme</label> <br />
            <input type="checkbox" v-model="control.isMultiple">
        </div>

        <div v-show="control.isMultiple">
            <div :class="styles.FORM.FORM_GROUP">
                <label>Maksimum Yüklenebilecek Dosya Sayısı</label>
                <input type="number" :class="styles.FORM.FORM_CONTROL" v-model="control.maximumFiles" max="99">
            </div>
        </div>

        <!-- <GlobalKeyValueItemConfiguration
            :items="control.headers"

            block-title="Additional Headers"
            title="Header Items"
            key-title="Header Key Name"
            value-title="Header Value"
        />

        <GlobalKeyValueItemConfiguration
            :items="control.postData"

            block-title="Additional POST Data"
            title="POST Data"
            key-title="POST Key Name"
            value-title="POST Value"
        /> -->
    </div>
</template>

<script>
    import {CONTROL_SPECIAL_CONFIG_MIXIN} from "@/mixins/control-special-config-mixin";
    import GlobalKeyValueItemConfiguration from "@/views/builder/GlobalKeyValueItemConfiguration";

    export default {
        name: "FileUploaderConfigView",
        components: {GlobalKeyValueItemConfiguration},
        mixins: [CONTROL_SPECIAL_CONFIG_MIXIN]
    }
</script>