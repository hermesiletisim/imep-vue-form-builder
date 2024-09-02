/**
 * List-Item for Checkbox/Radio/Select
 */
export default class ListItem {
    value = ""
    text = ""
    show_section = []

    constructor(value, text, show_section) {
        this.value = value
        this.text = text
        this.show_section = show_section
    }
}