<template>
    <v-btn
        v-clipboard:copy="copyText"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError"
        :icon="icon"
        :small="small"
        :block="block"
        :outlined="outlined"
        :disabled="disabled"
        :depressed="depressed"
        :ripple="false"
        :color="color"
        class="u-text-initial"
        :text="text"
        @click.stop
    >
        <slot />
    </v-btn>
</template>

<script>
export default {
    props: {
        copyText: {
            type: String,
            required: true,
        },
        small: {
            type: Boolean,
            default: false,
        },
        outlined: {
            type: Boolean,
            default: false,
        },
        icon: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        block: {
            type: Boolean,
            default: false,
        },
        depressed: {
            type: Boolean,
            default: false,
        },
        text: {
            type: Boolean,
            default: true,
        },
        color: {
            type: String,
            default: '',
        },
    },
    methods: {
        onCopy() {
            this.messageSuccess('Ссылка скопирована');
        },
        onError() {
            this.messageError('Произошла ошибка при копировании');
        },
    },
};
</script>
