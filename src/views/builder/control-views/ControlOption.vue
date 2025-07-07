<template>
    <div class="control-option-container">

        <div class="option-control"
             title="Kontrolü Sil"
             v-show="permissions.canDeleteControl"
             @click="clickedDelete">
            <span v-html="$form.getIcon('trash', '14px', '14px', '#e74c3c')"></span>
        </div>

        

        <div class="option-control"
             title="Kontrol Yapılandırması"
             v-show="permissions.canEditControl"
             @click="clickedConfiguration">
            <span v-html="$form.getIcon('cog', '14px', '14px', '#3498db')"></span>
        </div>
        
        <div class="option-control drag-item"
             title="Konumunu Değiştir / Sürükle"
             v-show="permissions.canReOrderingControl">
            <span v-html="$form.getIcon('navigationMore', '14px', '14px', '#f1c40f')"></span>
        </div>
        
    </div>
</template>

<script>
    export default {
        name: "ControlOption",
        props: {
            permissions: Object
        },
        methods: {
            /**
             * Emit to parent to delete this control...
             */
            clickedDelete() {
                this.$emit('delete', true)
            },

            /**
             * Emit to parent to open the configuration
             */
            clickedConfiguration() {
                this.$emit('config', true)
            }
        },
    }
</script>