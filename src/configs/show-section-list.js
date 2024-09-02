var SHOW_SECTION_LIST = []

function updateSectionList(formData, sectionObj, type) {
    
    if(type == "delete"){
        var array = SHOW_SECTION_LIST.filter(element => element.uniqueId !== sectionObj.uniqueId);
        SHOW_SECTION_LIST = array
    }
    else{
        var arr = []
        for(let key in formData.sections){  
            arr.push(formData.sections[key])
        }
        SHOW_SECTION_LIST = arr
    }    
}

function removeSectionFromList(sectionId) {
    
    var newArr = SHOW_SECTION_LIST.filter(function(item) {
        return item.uniqueId !== sectionId
    })

    return newArr
}

function fillSectionList(data) {
    console.log("girildi metoda");
    var arr = []
    for(let key in data.sections){  
        arr.push(data.sections[key])
    }
    console.log(arr);
    SHOW_SECTION_LIST = arr
    return arr
}

export  {
    SHOW_SECTION_LIST,
    removeSectionFromList,
    updateSectionList,
    fillSectionList
}