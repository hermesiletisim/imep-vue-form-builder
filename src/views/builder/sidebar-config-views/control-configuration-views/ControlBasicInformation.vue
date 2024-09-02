<template>
    <SidebarToggleableContainer headline="Basic Detail">
        <div :class="styles.FORM.FORM_GROUP">
            <label>{{$ml.get("UNIQUE_ID")}}</label>
            <input type="text" :class="styles.FORM.FORM_CONTROL" :value="control.uniqueId" readonly>
        </div>

        <!-- <div :class="styles.FORM.FORM_GROUP">
            <label>{{$ml.get("UNIQUE_NAME")}}</label>
            <input type="text" :class="styles.FORM.FORM_CONTROL" v-model="control.name">
        </div> -->

        <div :class="styles.FORM.FORM_GROUP">
            <label>{{$ml.get("LABEL")}}</label>
            <input type="text" :class="styles.FORM.FORM_CONTROL" v-model="control.label">
        </div>

        <div :class="styles.FORM.FORM_GROUP">
            <label>{{$ml.get("SUB_LABEL")}}</label>
            <input type="text" :class="styles.FORM.FORM_CONTROL" v-model="control.subLabel">
        </div>

        <div :class="styles.FORM.FORM_GROUP">
            <label>
                {{$ml.get("SHOW_LABEL")}}
                <input type="checkbox" v-model="control.isShowLabel">
            </label>
        </div>

        <div :class="styles.FORM.FORM_GROUP">
            <label>{{$ml.get("FIELD_PLACEHOLDER")}}</label>
            <input type="text" :class="styles.FORM.FORM_CONTROL" v-model="control.placeholderText">
        </div>

        <div :class="styles.FORM.FORM_GROUP">
            <label>{{$ml.get("DEFAULT_VALUE")}}</label>
            <input type="text" :class="styles.FORM.FORM_CONTROL" v-model="control.defaultValue">
        </div>

    </SidebarToggleableContainer>
</template>

<script>
    import SidebarToggleableContainer from "@/views/container-views/SidebarToggleableContainer";
    import {STYLE_INJECTION_MIXIN} from "@/mixins/style-injection-mixin";

    export default {
        name: "ControlBasicInformation",
        mixins: [STYLE_INJECTION_MIXIN],
        components: {SidebarToggleableContainer},
        props: {
            control: Object,
        }
    }
</script>

<style scoped>

</style>