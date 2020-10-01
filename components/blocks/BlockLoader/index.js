import './style.scss';

import VProgressCircular from 'vuetify/lib/components/VProgressCircular';

export default {
    name: 'BlockLoader',
    components: {
        VProgressCircular,
    },
    props: {
        color: {
            type: String,
            default: 'primary',
        },
        className: {
            type: String,
            default: null,
        },
        position: {
            type: String,
            default: 'absolute',
            validator(value) {
                return ['fixed', 'absolute', 'relative', 'static', 'sticky'].indexOf(value) !== -1;
            },
        },
        bgc: {
            type: String,
            default: 'transparent',
        },
        zIndex: {
            type: [String, Number],
            default: 10,
        },
        indeterminate: {
            type: Boolean,
            default: true,
        },
        size: {
            type: [String, Number],
            default: 50,
        },
        width: {
            type: Number,
            default: 3,
        },
    },
    template: ` <div
    class="loader"
    :class="{
        className,
    }"
    :style="{
        '--bg-color': bgc,
        '--position': position,
        '--z-index': zIndex,
    }"
>
    <div>
        <v-progress-circular
            :color="color"
            :indeterminate="indeterminate"
            :size="size"
            :width="width"
        />
    </div>
</div>`,
};
