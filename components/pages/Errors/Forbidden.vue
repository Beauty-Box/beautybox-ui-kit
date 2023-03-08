<template>
    <v-app id="app" class="l-not-found" data-server-rendered="true">
        <div class="l-not-found__inner">
            <i class="l-not-found__icon l-not-found__icon--left">
                <v-svg name="404_broken" lg />
            </i>
            <i class="l-not-found__icon l-not-found__icon--top">
                <v-svg name="404_calendar" lg />
            </i>
            <i class="l-not-found__icon l-not-found__icon--right">
                <v-svg name="404_staff" lg />
            </i>
            <b-block-empty title="Доступ запрещен" class="l-not-found__empty">
                <template #text>
                    К сожалению, у вас нет прав для просмотра данной страницы
                </template>
                <template #buttons>
                    <v-btn v-if="checkHistory" min-width="150" large color="white" @click="back">
                        Вернуться назад
                    </v-btn>
                    <v-btn v-else min-width="150" large color="primary" @click="goHome">
                        Перейти на главную
                    </v-btn>
                </template>
            </b-block-empty>
        </div>
        <div class="l-not-found__title">403</div>
        <div class="l-not-found__block-shadow" />
    </v-app>
</template>

<script>
const VSvg = () => import(/* webpackChunkName: "Svg" */ '../../../components/icons/Svg');
const BBlockEmpty = () =>
    import(/* webpackChunkName: "BlockEmpty" */ '../../../components/blocks/BlockEmpty');

export default {
    components: {
        VSvg,
        BBlockEmpty,
    },
    computed: {
        checkHistory() {
            return window.history.length > 1;
        },
    },
    methods: {
        back() {
            // window.history.back();
            window.location.reload();
        },
        goHome() {
            window.location.replace(window.location.origin);
        },
    },
};
</script>

<style lang="scss" scoped src="./errors.scss" />
