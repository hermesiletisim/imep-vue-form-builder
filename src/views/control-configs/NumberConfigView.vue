<template>
    <div>
        <div :class="styles.FORM.FORM_GROUP">
            <label>
                {{$ml.get("IS_REAL_NUMBER")}}
                <input type="checkbox" v-model="control.isReal">
            </label>
        </div>

        <div :class="styles.FORM.FORM_GROUP" v-show="control.isReal">
            <label>Ondalık Basamaklar</label>
            <input type="number"
                   step="1"
                   min="0"
                   max="10"
                   :class="styles.FORM.FORM_CONTROL"
                   v-model.number="control.decimalPlace">
        </div>
    </div>
</template>

<script>
    import {CONTROL_SPECIAL_CONFIG_MIXIN} from "@/mixins/control-special-config-mixin";

    export default {
        name: "NumberConfigView",
        mixins: [CONTROL_SPECIAL_CONFIG_MIXIN]
    }
</script>