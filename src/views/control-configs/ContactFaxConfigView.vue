<template>
    <div>
        <div :class="styles.FORM.FORM_GROUP">
            <label>Input `type` attribute</label>
            <select type="text"
                    :class="styles.FORM.FORM_CONTROL"
                    v-model="control.typeAttribute"
            >
                <option v-for="item in inputTypeAttributes"
                        :key="item"
                        :value="item"
                        v-text="item">
                </option>
            </select>
        </div>
    </div>
</template>

<script>
    import {CONTROL_SPECIAL_CONFIG_MIXIN} from "@/mixins/control-special-config-mixin";

    export default {
        name: "ContactFaxConfigView",
        mixins: [CONTROL_SPECIAL_CONFIG_MIXIN],

        computed: {
            inputTypeAttributes() {
                return ['text']
            },
        }
    }
</script>