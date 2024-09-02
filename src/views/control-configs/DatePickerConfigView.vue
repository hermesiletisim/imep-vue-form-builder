<template>
    <div>
        <div :class="styles.FORM.FORM_GROUP">
            <label>{{$ml.get("DATA_RETURN_TYPE")}}</label>
            <select :class="styles.FORM.FORM_CONTROL"
                    v-model="control.returnType">

                <option v-for="item in listReturnTypes"
                        :key="item.val"
                        :value="item.val"
                        v-text="item.description">
                </option>

            </select>
        </div>

        <!--- Only show this configuration if return Type is Format --->
        <div :class="styles.FORM.FORM_GROUP" v-show="control.returnType === listReturnTypes.format.val">
            <label>{{$ml.get("DATE_FORMAT")}}</label>
            <input type="text" :class="styles.FORM.FORM_CONTROL" v-model="control.format" />
        </div>

        <div :class="styles.FORM.FORM_GROUP">
            <label>{{$ml.get("START_DATE_OF_THE_WEEK")}}</label>
            <select :class="styles.FORM.FORM_CONTROL"
                    v-model="control.firstDay">

                <option v-for="item in listStartDates"
                        :key="item.val"
                        :value="item.val"
                        v-text="item.description">
                </option>

            </select>
        </div>

        <div :class="styles.FORM.FORM_GROUP">
            <label>
                {{$ml.get("MINIMUM_DATE")}}
                <IconTooltip icon="informationOutline" text="Follow this format: YYYY-MM-DD. Empty for none." />
            </label>
            <input type="text" :class="styles.FORM.FORM_CONTROL" v-model="control.minDate" />
            <small>{{$ml.get("MINIMUM_DATE_INFO")}}</small>
        </div>

        <div :class="styles.FORM.FORM_GROUP">
            <label>
                {{$ml.get("MAXIMUM_DATE")}}
                <IconTooltip icon="informationOutline" text="Follow this format: YYYY-MM-DD. Empty for none." />
            </label>
            <input type="text" :class="styles.FORM.FORM_CONTROL" v-model="control.maxDate"  />
            <small>{{$ml.get("MAXIMUM_DATE_INFO")}}</small>
        </div>

        <div :class="styles.FORM.FORM_GROUP">
            <label>
                {{$ml.get("ENABLE_DATE_RANGE")}}

                <!--- Because singleModel == true => single date picker --->
                <input type="checkbox"
                       name="enableDateRange"
                       v-model="control.singleMode"
                       :true-value="false"
                       :false-value="true">
            </label>
        </div>

        <!--- Only show this configuration if date-range --->
        <div :class="styles.FORM.FORM_GROUP" v-show="!control.singleMode">
            <label>Minimum Day in Range (0 for none)</label>
            <input type="number" step="1" :class="styles.FORM.FORM_CONTROL" v-model.number="control.minDays" />
        </div>

        <div :class="styles.FORM.FORM_GROUP" v-show="!control.singleMode">
            <label>Maximum Day in Range (0 for none)</label>
            <input type="number" step="1" :class="styles.FORM.FORM_CONTROL" v-model.number="control.maxDays" />
        </div>

        <div :class="styles.FORM.FORM_GROUP">
            <label>{{$ml.get("NUMBER_OF_MONTHS")}}</label>
            <input type="number" step="1" :class="styles.FORM.FORM_CONTROL" v-model.number="control.numberOfMonths" />
            <small>{{$ml.get("NUMBER_OF_MONTHS_DESC")}}</small>
        </div>

        <div :class="styles.FORM.FORM_GROUP">
            <label>{{$ml.get("NUMBER_OF_COLUMNS")}}</label>
            <input type="number" step="1" :class="styles.FORM.FORM_CONTROL" v-model.number="control.numberOfColumns" />
            <small>{{$ml.get("NUMBER_OF_COLUMNS_DESC")}}</small>
        </div>
    </div>
</template>

<script>
    import {CONTROL_SPECIAL_CONFIG_MIXIN} from "@/mixins/control-special-config-mixin";
    import {DATE_PICKER_RETURN_TYPES, DATE_PICKER_START_DATES} from "@/configs/control-config-enum";

    export default {
        name: "DatePickerConfigView",
        mixins: [CONTROL_SPECIAL_CONFIG_MIXIN],


        computed: {
            /**
             * Return types of DatePicker
             */
            listReturnTypes: () => DATE_PICKER_RETURN_TYPES,

            /**
             * Start dates of the Week
             */
            listStartDates:() => DATE_PICKER_START_DATES,
        }
    }
</script>