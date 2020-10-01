<template>
    <v-carousel-item>
        <v-sheet height="100%" tile style="background-color: transparent;">
            <v-row class="fill-height pb-10" align="center" justify="center">
                <div class="d-flex flex-column align-center fill-height">
                    <v-img
                        :src="item.img"
                        :max-width="$vuetify.breakpoint.xsOnly ? 414 : 500"
                        min-height="400"
                        contain
                    />
                    <div
                        class="text-body-1 text--primary mt-2 text-center"
                        :style="{ 'max-width': textWidth + 'px' }"
                    >
                        <p class="ma-0">
                            <strong>{{ item.text }}</strong>
                            {{ item.description }}
                        </p>
                    </div>
                </div>
            </v-row>
        </v-sheet>
    </v-carousel-item>
</template>

<script>
export default {
    name: 'SlideItemTriumphSignUp',
    props: {
        item: {
            type: Object,
            default: () => ({}),
        },
        textWidth: {
            type: [Number, String],
            default: 320,
        },
    },
};
</script>
