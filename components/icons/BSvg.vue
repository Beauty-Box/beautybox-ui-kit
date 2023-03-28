<template>
    <component
        :is="component"
        :class="classes"
        :style="styles"
        :aria-labelledby="name"
        focusable="false"
        role="img"
    />
</template>

<script lang="ts">
import { defineComponent, computed, defineAsyncComponent } from 'vue';

export default defineComponent({
    name: 'BSvg',
    inheritAttrs: false,
    props: {
        fill: {
            type: String,
            default: '',
        },
        name: {
            type: String,
            required: true,
        },
        xs: {
            type: Boolean,
            default: false,
        },
        sm: {
            type: Boolean,
            default: false,
        },
        md: {
            type: Boolean,
            default: false,
        },
        lg: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        classes() {
            return {
                icon: true,
                ['icon-' + this.name]: this.name,
                'icon--xs': this.xs,
                'icon--sm': this.sm,
                'icon--md': this.md,
                'icon--lg': this.lg,
            };
        },
        styles() {
            return {
                fill: this.fill,
            };
        },
        // iconPath() {
        //     let icon = require(`../../../assets/spriteSVG/${this.name}.svg`);
        //     if (Object.prototype.hasOwnProperty.call(icon, 'default')) {
        //         icon = icon.default;
        //     }
        //     return icon.url;
        // },
    },
    // render(h) {
    //     return h(
    //         'svg',
    //         {
    //             class: this.classes,
    //             style: this.styles,
    //             attrs: {
    //                 xmlns: 'http://www.w3.org/2000/svg',
    //                 'aria-labelledby': this.name,
    //                 focusable: false,
    //                 role: 'img',
    //                 ...this.$attrs,
    //             },
    //         },
    //         [
    //             h('use', {
    //                 attrs: {
    //                     href: this.iconPath,
    //                     xmlns: 'http://www.w3.org/2000/svg',
    //                 },
    //             }),
    //         ]
    //     );
    // },

    setup(props, { emit }) {
        // const modules: Record<string, AsyncComponentLoader> = import.meta.glob(
        //     '../../assets/spriteSVG/*.svg?component'
        // );
        const component = computed(() => {
            //  const icon = modules[`../../assets/spriteSVG/${props.name}.svg`];
            const icon = () => import(`../../assets/spriteSVG/${props.name}.svg?component`);
            console.log('b svg debug', props.name, icon);
            return defineAsyncComponent(icon);
            // загрузка иконок и vue template compiler
            // @see https://github.com/jpkleemans/vite-svg-loader/issues/76
        });

        return { component };
    },
});
</script>

<style scoped lang="scss" src="./Svg/Svg.scss"></style>
