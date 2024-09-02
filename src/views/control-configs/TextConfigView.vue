<template>
    <div>
        <div :class="styles.FORM.FORM_GROUP">
            <label>{{$ml.get("NUMBER_OF_ROWS")}}</label>
            <input type="number" step="1" :class="styles.FORM.FORM_CONTROL" v-model.number="control.rows" />
            <small>{{$ml.get("ROW_HTML_ATTRIBUTE_CONFIGURATION")}}</small>
        </div>

    </div>
</template>

<script>
    import {CONTROL_SPECIAL_CONFIG_MIXIN} from "@/mixins/control-special-config-mixin";

    export default {
        name: "TextConfigView",
        mixins: [CONTROL_SPECIAL_CONFIG_MIXIN]
    }
</script>