/**
 * Supported Section & Section Constants in Vue-Form-Builder
 * @author Phat Tran
 */
 import {HELPER} from "@/libraries/helper";
 import {ROW_TYPES} from "@/configs/row";
 
 // Builder Views
 import NormalSectionView from "@/views/builder/section-views/NormalSectionView";
 import TableSectionView from "@/views/builder/section-views/TableSectionView";
 import ToggleableSectionView from "@/views/builder/section-views/ToggleableSectionView";
 import FileSectionView from "@/views/builder/section-views/FileSectionView";
 import TabSectionView from "@/views/builder/section-views/TabSectionView";
 
 // Builder Buttons [PRE]
 import TabSectionPreButtons from "@/views/builder/section-navigation-buttons/TabSectionPreButtons";
 
 // Builder Buttons [POST]
 
 // Renderer Views
 import RendererNormalSectionView from "@/views/renderer/section-views/NormalSectionView";
 import RendererToggleableSectionView from "@/views/renderer/section-views/ToggleableSectionView";
 import RendererTabSectionView from "@/views/renderer/section-views/TabSectionView";
 import RendererTableSectionView from "@/views/renderer/section-views/TableSectionView";
 import RendererFileSectionView from "@/views/renderer/section-views/FileSectionView";




const SECTION_TYPES = {
    normal: {
        name: "NORMAL_BLOCK",
        description: "NORMAL_BLOCK_DESC",
        // name: "Normal Block",
        // description: "Normal block with a headline",
        value: 'normal',

        rowType: ROW_TYPES.normal,
        builderView: NormalSectionView,
        rendererView: RendererNormalSectionView,
    },

    toggleable: {
        name: "TOGGLEABLE_BLOCK",
        description: "TOGGLEABLE_BLOCK_DESC",
        // name: "Toggle Block",
        // description: "Section block with toggle (display/hide) feature",
        value: 'toggleable',

        rowType: ROW_TYPES.normal,
        builderView: ToggleableSectionView,
        rendererView: RendererToggleableSectionView
    },

    // tab: {
    //     name: "TAB_BLOCK",
    //     description: "TAB_BLOCK_DESC",
    //     // name: "Tab Block",
    //     // description: "A block with multiple tabs feature",
    //     value: "tab",

    //     rowType: ROW_TYPES.tabRow,
    //     builderView: TabSectionView,
    //     rendererView: RendererTabSectionView,
    //     preCustomButtonView: TabSectionPreButtons,
    // }

    table: {
        name: "TABLE_BLOCK",
        description: "TABLE_BLOCK_DESC",
        value: 'table',
    
        rowType: ROW_TYPES.tableRow,
        builderView: TableSectionView,
        rendererView: RendererTableSectionView
    },

    file: {
        name: "FILE_BLOCK",
        description: "FILE_BLOCK_DESC",
        value: 'file',
    
        rowType: ROW_TYPES.fileRow,
        builderView: FileSectionView,
        rendererView: RendererFileSectionView
    },


};

/**
 * DEFAULT DATA in order to create/reread from the configuration
 */
const SECTION_DEFAULT_DATA = {
    uniqueId: '',

    headline: '',
    headlineAdditionalClass: '',

    subHeadline: '',
    subHeadlineAdditionalClass: '',

    isShowHeadline: true,

    sortOrder: 0,
    type: '',
    rows: [], // array of rowId
    controls: [], // array of controlIds
    permission: {}
};

/**
 * Create new Section
 * @param type
 * @param sortOrder
 */
function createNewSection(type, sortOrder = 0) {
    if (!SECTION_TYPES[type]) {
        throw new TypeError(`Section Type: ${type} doesn't exists in Vue-Form-Builder`);
    }

    // create new section data base on the default data
    let newSectionData = HELPER.cloneDeep(SECTION_DEFAULT_DATA)
    newSectionData.type = type
    newSectionData.uniqueId = "section-" + HELPER.getUUIDv4()
    newSectionData.headline = "New Section"
    newSectionData.subHeadline = "This is the sub-headline of the new section"
    newSectionData.sortOrder = sortOrder
    if(type == 'table'){
        newSectionData.tableObject = {
            data: [],
            tableColumns: []
        }
    }

    return newSectionData;
}

export {
    SECTION_TYPES,
    SECTION_DEFAULT_DATA,
    createNewSection
}