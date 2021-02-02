<template>
    <v-btn
        v-clipboard:copy.stop="copyText"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError"
        :icon="icon"
        :small="small"
        :large="large"
        :x-large="xLarge"
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
    name: 'app-btn-copy',
    props: {
        copyText: {
            type: String,
            required: true,
        },
        successText: {
            type: String,
            default: 'Ссылка скопирована',
        },
        small: {
            type: Boolean,
            default: false,
        },
        large: {
            type: Boolean,
            default: false,
        },
        xLarge: {
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
            this.messageSuccess(this.successText);
        },
        onError() {
            this.messageError('Произошла ошибка при копировании');
        },
    },
};
</script>
