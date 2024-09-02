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
    import {DROPDOWN_DATA_MODES} from "@/configs/control-config-enum";
    import ListItem from "@/libraries/list-item.class";

    export default {
        name: "UserConfigView",
        mixins: [CONTROL_SPECIAL_CONFIG_MIXIN],
        data: () => ({
            listDataModes : {
                api: {
                    val: 'api',
                    description: "API - List Items from your own API",
                },
            },
            selected: "api"
        }),

        methods: {
            /**
             * Add new List-Item for the Current Radio/Checkbox
             */
            addListItem() {
                this.control.items.push(
                    new ListItem('', '')
                )
            },

            /**
             * Remove list-Item by Index of the Array
             */
            removeListItem(index) {
                this.control.items.splice(index, 1)
            }
        },

        computed: {
            /**
             * Dropdown Data Modes List
             */
            // listDataModes: () => DROPDOWN_DATA_MODES,
        }
    }
</script>