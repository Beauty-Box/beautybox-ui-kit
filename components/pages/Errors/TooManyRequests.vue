<template>
    <v-app class="l-not-found">
        <div class="l-not-found__inner">
            <i class="l-not-found__icon l-not-found__icon--left">
                <component :is="svgComponent" name="404_broken" :size="56" />
            </i>
            <i class="l-not-found__icon l-not-found__icon--top">
                <component :is="svgComponent" name="404_calendar" :size="56" />
            </i>
            <i class="l-not-found__icon l-not-found__icon--right">
                <component :is="svgComponent" name="404_staff" :size="56" />
            </i>
            <b-block-empty title="Ошибка при запросе" class="l-not-found__empty">
                <template #text>
                    <div>Вы сделали слишком много запросов к серверу.</div>
                    <div v-if="timer !== 0">Сайт будет доступен через {{ timer }} сек.</div>
                </template>
                <template #buttons>
                    <v-btn
                        min-width="150"
                        large
                        color="primary"
                        :disabled="timer !== 0"
                        @click="update"
                    >
                        Продолжить работу
                    </v-btn>
                </template>
            </b-block-empty>
        </div>
        <div class="l-not-found__title">429</div>
        <div class="l-not-found__block-shadow" />
    </v-app>
</template>

<script>
const BBlockEmpty = () =>
    import(/* webpackChunkName: "BlockEmpty" */ '../../../components/blocks/BlockEmpty');
import svgComponentMixin from '../../../mixins/svgComponent.mixin';

export default {
    components: {
        BBlockEmpty,
    },
    mixins: [svgComponentMixin],
    data: () => ({
        timer: 60,
    }),
    computed: {
        checkHistory() {
            return window.history.length > 1;
        },
    },
    mounted() {
        this.setTimer();
    },
    methods: {
        setTimer() {
            let interval = setInterval(() => {
                this.timer--;
                if (this.timer === 0) {
                    clearInterval(interval);
                    setTimeout(this.update, 5000);
                }
            }, 1000);
        },
        update() {
            window.location.reload(true);
        },
    },
};
</script>

<style lang="scss" scoped src="./errors.scss" />
