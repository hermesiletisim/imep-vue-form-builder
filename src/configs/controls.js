/**
 * Supported Controls in Vue-Form-Builder
 * @author Phat Tran
 */
import { STYLES } from "@/configs/styles";
import { HELPER } from "@/libraries/helper";
import {
    DATE_PICKER_RETURN_TYPES,
    DATE_PICKER_START_DATES,
    RADIO_CHECKBOX_POSITION,
    RADIO_CHECKBOX_STYLE,
    DROPDOWN_DATA_MODES

    // FILE_UPLOAD_MODES
} from "@/configs/control-config-enum";
//
// Control-GUI-Component
import InputControl from "@/views/controls/InputControl";
import TextControl from "@/views/controls/TextControl";
import ButtonControl from "@/views/controls/ButtonControl";
import EmptyBlockControl from "@/views/controls/EmptyBlockControl";
import TextBlockControl from "@/views/controls/TextBlockControl";
import LabelControl from "@/views/controls/LabelControl";
import RadioCheckboxControl from "@/views/controls/RadioCheckboxControl";
import DatePickerControl from "@/views/controls/DatePickerControl";
import NumberControl from "@/views/controls/NumberControl";
import DropdownControl from "@/views/controls/DropdownControl";
import FileUploaderControl from "@/views/controls/FileUploaderControl";
import UserControl from "@/views/controls/UserControl";
import ContactNameControl from "@/views/controls/ContactNameControl";
import ContactSurNameControl from "@/views/controls/ContactSurNameControl";
import ContactEmailControl from "@/views/controls/ContactEmailControl";
import ContactPhoneControl from "@/views/controls/ContactPhoneControl";
import ContactFaxControl from "@/views/controls/ContactFaxControl";
import CustomFieldControl from "@/views/controls/CustomFieldControl";
import OrganizationControl from "@/views/controls/OrganizationControl";
import DealControl from "@/views/controls/DealControl";

// Control-Config-Component
import InputConfigView from "@/views/control-configs/InputConfigView";
import TextBlockConfigView from "@/views/control-configs/TextBlockConfigView";
import ButtonConfigView from "@/views/control-configs/ButtonConfigView";
import LabelConfigView from "@/views/control-configs/LabelConfigView";
import RadioCheckboxConfigView from "@/views/control-configs/RadioCheckboxConfigView";
import NumberConfigView from "@/views/control-configs/NumberConfigView";
import DatePickerConfigView from "@/views/control-configs/DatePickerConfigView";
import TextConfigView from "@/views/control-configs/TextConfigView";
import DropdownConfigView from "@/views/control-configs/DropdownConfigView";
import FileUploaderConfigView from "@/views/control-configs/FileUploaderConfigView";
import UserConfigView from "@/views/control-configs/UserConfigView";
import ContactNameConfigView from "@/views/control-configs/ContactNameConfigView";
import ContactSurNameConfigView from "@/views/control-configs/ContactSurNameConfigView";
import ContactEmailConfigView from "@/views/control-configs/ContactEmailConfigView";
import ContactPhoneConfigView from "@/views/control-configs/ContactPhoneConfigView";
import ContactFaxConfigView from "@/views/control-configs/ContactFaxConfigView";
import OrganizationConfigView from "@/views/control-configs/OrganizationConfigView";
import DealConfigView from "@/views/control-configs/DealConfigView";

import axios from 'axios'


const CONTROLS = {
    input: {
        name: "INPUT_FIELD",
        description: "INPUT_FIELD_DESC",
        icon: "editPencil", // Follow ICON in `icon-facade.js` to see how it works.

        configData: {
            typeAttribute: "text" // date, password
        },

        // component mapping
        fieldComponent: InputControl,
        configComponent: InputConfigView
    },

    number: {
        name: "NUMBER_INPUT_FIELD",
        description: "NUMBER_INPUT_FIELD_DESC",

        configData: {
            isReal: false, // integer or real (float/double)
            decimalPlace: 1 // [For Real] 0.xxx?? (x = num of places)
        },

        fieldComponent: NumberControl,
        configComponent: NumberConfigView,

        /**
         * As same like Vue-JS Property Default Data
         * Specific field need some special data-type/structure, they need to
         * put the creation in a factory method.
         * It must return a value.
         */
        rendererDefaultData() {
            return 0;
        }
    },

    text: {
        name: "TEXT_FIELD",
        description: "TEXT_FIELD_DESC",

        // config data for the input field - it will be merge with the CONTROL_DEFAULT_DATA
        configData: {
            rows: 3 // numeric
        },

        // component mapping
        fieldComponent: TextControl,
        configComponent: TextConfigView
    },

    // I would love to support this, but the thing is, many rich editors are too large:
    // js: 150KB+
    // css: 30KB+
    // So 2.0.0 won't have this field.
    // richText: {
    //     name: "Rich-Text Field",
    //     description: "Multiple line text field - Rich Editor (WYSIWYG)",
    // },

    date: {
        name: "DATE_PICKER",
        description: "DATE_PICKER_DESC",

        configData: {
            format: "DD/MM/YYYY",
            firstDay: DATE_PICKER_START_DATES.monday.val, // 0 Sunday, 1 Monday,...
            numberOfMonths: 1, // Number of Month(s) will be shown
            numberOfColumns: 1, // Number of Column(s) will be shown
            minDate: null, // min day (less => can't select)
            maxDate: null, // max day (more => can't select),

            singleMode: true, // date or date-range

            // for date-range
            minDays: 0, // min-day range
            maxDays: 0, // max-day range

            returnType: DATE_PICKER_RETURN_TYPES.format.val // specific return type
        },

        fieldComponent: DatePickerControl,
        configComponent: DatePickerConfigView
    },

    // fileUpload: {
    //     name: "File Upload",
    //     description: "Upload single file through API",
    //
    //     configData: {
    //         uploadMode: FILE_UPLOAD_MODES.normal.val,
    //         apiURL: "", // API-Url to upload
    //     },
    // },

    dropDown: {
        name: "DROPDOWN",
        description: "DROPDOWN_DESC",

        configData: {
            dataMode: DROPDOWN_DATA_MODES.list.val, // normal - api
            multiple: false, // is multiple selection

            /**
             * @var {ListItem[]} items
             */
            items: [], // for normal hard-list

            apiURL: "", // for api-request - must be entered
            apiTextKey: "text", // <option>TEXT</option>
            apiValueKey: "value" // <option value=value>...</option>
        },

        fieldComponent: DropdownControl,
        configComponent: DropdownConfigView
    },

    // user: {
    //     name: "CONTACT",
    //     description: "CONTACT_DESC",

    //     configData: {
    //         dataMode: DROPDOWN_DATA_MODES.api.val, // normal - api
    //         multiple: false, // is multiple selection

    //         /**
    //          * @var {ListItem[]} items
    //          */
    //         items: [], // for normal hard-list

    //         apiURL: "", // for api-request - must be entered
    //         apiTextKey: "text", // <option>TEXT</option>
    //         apiValueKey: "value" // <option value=value>...</option>
    //     },

    //     fieldComponent: UserControl,
    //     configComponent: UserConfigView
    // },

    checkbox: {
        name: "CHECKBOX_LIST",
        description: "CHECKBOX_LIST_DESC",

        configData: {
            displayMode: RADIO_CHECKBOX_STYLE.line.val, // line by line / next to each others / 2 items per line
            position: RADIO_CHECKBOX_POSITION.left.val, // POSITION

            /**
             * @var {ListItem[]} items
             */
            items: [] // list-item
        },

        fieldComponent: RadioCheckboxControl,
        configComponent: RadioCheckboxConfigView,
        rendererDefaultData() {
            return [];
        }
    },

    radio: {
        name: "RADIO_LIST",
        description: "RADIO_LIST_DESC",

        configData: {
            displayMode: RADIO_CHECKBOX_STYLE.line.val, // line by line / next to each others / 2 items per line
            position: RADIO_CHECKBOX_POSITION.left.val, // POSITION
            /**
             * @var {ListItem[]} items
             */
            items: [] // list-item
        },

        fieldComponent: RadioCheckboxControl,
        configComponent: RadioCheckboxConfigView
    },

    fileUploader: {
        name: "FILE_UPLOADER",
        description: "FILE_UPLOADER_DESC",
        disableValidation: true,

        // config data
        configData: {
            // for styling
            buttonLabel: "Select File",
            buttonClasses: "btn btn-primary",

            // for components
            postActionURL: "/your-api-post-url-to-upload",
            extensions: ".gif,.png,.jpg,.jpeg",
            accept: "image/gif,image/jpeg,image/png",
            maxSize: 1000, // in bytes - 0 unlimited

            isMultiple: false,
            maximumFiles: 1, // if multiple is on, we need to configure this one

            // special configurations
            // these will be appended when the vue-uploader-component make a request
            headers: [],
            postData: []
        },

        fieldComponent: FileUploaderControl,
        configComponent: FileUploaderConfigView
    },

    // label: {
    //     name: "LABEL",
    //     description: "LABEL_DESC",
    //     disableValue: true,

    //     configData: {
    //         forAttribute: null, // `for` for any control? (except the Label)

    //         // Override here in order to not show the Label
    //         isShowLabel: false
    //     },

    //     // no need validation
    //     disableValidation: true,
    //     fieldComponent: LabelControl,
    //     configComponent: LabelConfigView
    // },

    button: {
        name: "BUTTON",
        description: "BUTTON_DESC",
        disableValidation: true,
        disableValue: true,

        configData: {
            buttonClass: STYLES.BUTTON.PRIMARY,
            buttonType: "button", // submit/reset/button/...

            emitEventCode: "", // like: "BtnClicked/clicked/change"
            emitEventData: "", // special data to emit to let you know which button is clicked

            // if this is true => validation will be run before the real invoke method
            isRunValidation: false,

            // Override here in order to not show the Label
            isShowLabel: false
        },

        fieldComponent: ButtonControl,
        configComponent: ButtonConfigView
    },

    // emptyBlock: {
    //     name: "EMPTY_BLOCK",
    //     description: "EMPTY_BLOCK_DESC",
    //     disableValidation: true,
    //     disableValue: true,

    //     fieldComponent: EmptyBlockControl,

    //     configData: {
    //         // Override here in order to not show the Label
    //         isShowLabel: false
    //     }
    // },

    // textBlock: {
    //     name: "TEXT_BLOCK",
    //     description: "TEXT_BLOCK_DESC",
    //     disableValidation: true,
    //     disableValue: true, // if you provide this, the control field value will not be recorded.

    //     fieldComponent: TextBlockControl,
    //     configComponent: TextBlockConfigView,

    //     configData: {
    //         text: ""
    //     }
    // },

    contactName: {
        name: "CONTACT_NAME",
        description: "CONTACT_NAME_DESC",
        icon: "editPencil", // Follow ICON in `icon-facade.js` to see how it works.

        configData: {
            typeAttribute: "text" // date, password
        },

        // component mapping
        fieldComponent: ContactNameControl,
        configComponent: ContactNameConfigView
    },

    contactSurName: {
        name: "CONTACT_SURNAME",
        description: "CONTACT_SURNAME_DESC",
        icon: "editPencil", // Follow ICON in `icon-facade.js` to see how it works.

        configData: {
            typeAttribute: "text" // date, password
        },

        // component mapping
        fieldComponent: ContactSurNameControl,
        configComponent: ContactSurNameConfigView
    },

    contactEmail: {
        name: "CONTACT_EMAIL",
        description: "CONTACT_EMAIL_DESC",
        icon: "editPencil", // Follow ICON in `icon-facade.js` to see how it works.

        configData: {
            typeAttribute: "text" // date, password
        },

        // component mapping
        fieldComponent: ContactEmailControl,
        configComponent: ContactEmailConfigView
    },

    contactPhone: {
        name: "CONTACT_PHONE",
        description: "CONTACT_PHONE_DESC",
        icon: "editPencil", // Follow ICON in `icon-facade.js` to see how it works.

        configData: {
            typeAttribute: "text" // date, password
        },

        // component mapping
        fieldComponent: ContactPhoneControl,
        configComponent: ContactPhoneConfigView
    },

    contactFax: {
        name: "CONTACT_FAX",
        description: "CONTACT_FAX_DESC",
        icon: "editPencil", // Follow ICON in `icon-facade.js` to see how it works.

        configData: {
            typeAttribute: "text" // date, password
        },

        // component mapping
        fieldComponent: ContactFaxControl,
        configComponent: ContactFaxConfigView
    }
};

const CONTROL_DEFAULT_DATA = {
    // default configuration
    uniqueId: "", // :id
    type: "", // control type...
    name: "", // :name

    label: "",
    subLabel: "",
    isShowLabel: true,

    placeholderText: "", // :placeholder

    containerClass: STYLES.COLUMNS.COL4,
    additionalContainerClass: "", // :class for the <div> outer container

    additionalFieldClass: "", // :class for <input> <select> ...
    additionalLabelClass: "", // :class for the <label>

    defaultValue: "",
    permission: {},
    /**
     * Validation that applied to the control
     * @var {ValidationRule[]} validations
     */
    validations: []

    // data of the others - coming up later
};

/**
 * Create new control data
 * @param controlKey
 * @returns {CONTROL_DEFAULT_DATA}
 */
function createControlData(controlKey) {
    const newData = Object.assign(
        {},
        CONTROL_DEFAULT_DATA,
        CONTROLS[controlKey].configData || {}
    );

    // set default data
    newData.label = CONTROLS[controlKey].name;
    newData.type = controlKey;

    // unique ID is a must - I used UUIDv4 => 99% Unique
    newData.uniqueId = "control-" + HELPER.getUUIDv4();
    if(CONTROLS[controlKey].isCustomField){
        newData.isCustomField = true
    }

    return newData;
}

function getCustomFields() {

    axios({
        method: 'POST',
        url: '/getCustomFields',
        baseURL: "https://new.iletisimmakinesi.com/api",
        withCredentials: true
    }).then((res) => {
        return res
    }).then((res) => {
        if (!res.data.status) {

        }
        if (res.data.status.code == 0) {
            for(let customfield of res.data.content.customFields){        
                CONTROLS[customfield._id.$oid] = {
                    name: customfield.name,
                    isCustomField: true,
                    description: "INPUT_FIELD_DESC",
                    icon: "editPencil", // Follow ICON in `icon-facade.js` to see how it works.
            
                    configData: {
                        typeAttribute: "text" // date, password
                    },
            
                    // component mapping
                    fieldComponent: CustomFieldControl,
                    configComponent: InputConfigView
                }
            }
        }
    })

    // for(let customfield of CUSTOMFIELDS){        
    //     CONTROLS[customfield._id.$oid] = {
    //         name: customfield.name,
    //         isCustomField: true,
    //         description: "INPUT_FIELD_DESC",
    //         icon: "editPencil", // Follow ICON in `icon-facade.js` to see how it works.
    
    //         configData: {
    //             typeAttribute: "text" // date, password
    //         },
    
    //         // component mapping
    //         fieldComponent: CustomFieldControl,
    //         configComponent: InputConfigView
    //     }
    // }
}


// const CUSTOMFIELDS = [
//     {
//       "update_time": {
//         "$date": "2023-05-05T11:40:05.896Z"
//       },
//       "domain": 1,
//       "name": "Doğum Tarihi",
//       "x": true,
//       "_id": {
//         "$oid": "6454eb150293d872a298b084"
//       },
//       "tag": "[##Doğum Tarihi##]",
//       "field_type": 3,
//       "add_time": {
//         "$date": "2023-05-05T11:40:05.896Z"
//       },
//       "cid": {
//         "$oid": "63e4904defce006ecf5ef9dc"
//       }
//     },
//     {
//       "update_time": {
//         "$date": "2023-05-05T11:41:46.910Z"
//       },
//       "domain": 1,
//       "name": "Müşteri Tipi",
//       "x": true,
//       "_id": {
//         "$oid": "6454eb7a0293d872a298b085"
//       },
//       "tag": "[##Müşteri Tipi##]",
//       "field_type": 1,
//       "add_time": {
//         "$date": "2023-05-05T11:41:46.910Z"
//       },
//       "cid": {
//         "$oid": "63e4904defce006ecf5ef9dc"
//       }
//     },
//     {
//       "update_time": {
//         "$date": "2023-05-05T11:42:49.326Z"
//       },
//       "domain": 1,
//       "name": "Posta Kodu",
//       "x": true,
//       "_id": {
//         "$oid": "6454ebb90293d872a298b086"
//       },
//       "tag": "[##Posta Kodu##]",
//       "field_type": 2,
//       "add_time": {
//         "$date": "2023-05-05T11:42:49.326Z"
//       },
//       "cid": {
//         "$oid": "63e4904defce006ecf5ef9dc"
//       }
//     },
//     {
//       "update_time": {
//         "$date": "2023-05-05T11:42:55.417Z"
//       },
//       "domain": 1,
//       "name": "Şehir",
//       "x": true,
//       "_id": {
//         "$oid": "6454ebbf0293d872a298b087"
//       },
//       "tag": "[##Şehir##]",
//       "field_type": 1,
//       "add_time": {
//         "$date": "2023-05-05T11:42:55.417Z"
//       },
//       "cid": {
//         "$oid": "63e4904defce006ecf5ef9dc"
//       }
//     },
//     {
//       "update_time": {
//         "$date": "2023-05-09T10:58:08.866Z"
//       },
//       "domain": 1,
//       "name": "evlilik",
//       "x": true,
//       "_id": {
//         "$oid": "645a2740e34cfa3553e773a9"
//       },
//       "tag": "[##evlilik##]",
//       "field_type": 3,
//       "add_time": {
//         "$date": "2023-05-09T10:58:08.866Z"
//       },
//       "cid": {
//         "$oid": "63e4904defce006ecf5ef9dc"
//       }
//     },
//     {
//       "update_time": {
//         "$date": "2023-05-09T10:58:20.190Z"
//       },
//       "domain": 1,
//       "name": "konsol",
//       "x": true,
//       "_id": {
//         "$oid": "645a274ce34cfa3553e773aa"
//       },
//       "tag": "[##konsol##]",
//       "field_type": 1,
//       "add_time": {
//         "$date": "2023-05-09T10:58:20.190Z"
//       },
//       "cid": {
//         "$oid": "63e4904defce006ecf5ef9dc"
//       }
//     },
//     {
//       "update_time": {
//         "$date": "2023-05-09T10:58:35.046Z"
//       },
//       "domain": 1,
//       "name": "ayakkabı",
//       "x": true,
//       "_id": {
//         "$oid": "645a275be34cfa3553e773ab"
//       },
//       "tag": "[##ayakkabı##]",
//       "field_type": 2,
//       "add_time": {
//         "$date": "2023-05-09T10:58:35.046Z"
//       },
//       "cid": {
//         "$oid": "63e4904defce006ecf5ef9dc"
//       }
//     },
//     {
//       "update_time": {
//         "$date": "2023-05-24T06:44:14.231Z"
//       },
//       "domain": 1,
//       "name": "plaka",
//       "x": true,
//       "_id": {
//         "$oid": "646db21157a2120e5a6a0b3d"
//       },
//       "tag": "[##plaka##]",
//       "field_type": 1,
//       "add_time": {
//         "$date": "2023-05-24T06:43:29.220Z"
//       },
//       "cid": {
//         "$oid": "63e4904defce006ecf5ef9dc"
//       }
//     },
//     {
//       "update_time": {
//         "$date": "2023-05-24T11:50:28.412Z"
//       },
//       "domain": 1,
//       "name": "asdsad",
//       "x": true,
//       "_id": {
//         "$oid": "646dfa0457a2120e5a6a0b4b"
//       },
//       "tag": "[##asdsad##]",
//       "field_type": 1,
//       "add_time": {
//         "$date": "2023-05-24T11:50:28.412Z"
//       },
//       "cid": {
//         "$oid": "63e4904defce006ecf5ef9dc"
//       }
//     }
//   ]

  getCustomFields();

export { CONTROLS, CONTROL_DEFAULT_DATA, createControlData };
