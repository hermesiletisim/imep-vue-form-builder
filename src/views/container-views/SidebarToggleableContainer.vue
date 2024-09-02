<template>
    <div class="toggleable-section">
        <div class="headline-block" @click="isVisible = !isVisible">
            <h5 class="d-flex">
                <!-- headline -->
                <span class="type-headline d-flex  align-items-center" v-text="headline"></span>

                <!-- subheadline -->
                <small class="toggleable-sub-headline" v-text="subHeadline"></small>

                <!-- chevron icon to show/hide -->
                <span class="toggle-item ml-auto" 
                    v-html="isVisible ? iconClose : iconOpen"
                    >
                </span>
            </h5>
        </div>

        <transition name="slide">
            <div v-show="isVisible">
                <slot />
            </div>
        </transition>
    </div>
</template>

<script>
import { TOGGLEABLE_MIXIN } from "@/mixins/toggleable-mixin";

/**
 * Normal ToggleableContainer to use anywhere
 * Not used for Toggleable Renderer...
 */
export default {
    name: "SidebarToggleableContainer",
    mixins: [TOGGLEABLE_MIXIN],
    props: {
        headline: {
            type: String,
        },
        subHeadline: {
            type: String,
        },
        initialOpen: {
            type: Boolean,
            default: true
        }
    },

    created() {
        if (!this.initialOpen) {
            this.isVisible = false
        }
    }
}
</script>