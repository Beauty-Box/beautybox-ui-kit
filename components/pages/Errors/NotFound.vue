<template>
    <v-app class="l-not-found">
        <div class="l-not-found__inner">
            <i class="l-not-found__icon l-not-found__icon--left">
                <b-svg name="404_broken" lg />
            </i>
            <i class="l-not-found__icon l-not-found__icon--top">
                <b-svg name="404_calendar" lg />
            </i>
            <i class="l-not-found__icon l-not-found__icon--right">
                <b-svg name="404_staff" lg />
            </i>
            <b-block-empty title="Страница не найдена" class="l-not-found__empty">
                <template #text>
                    К сожалению, такой страницы не существует. Пожалуйста, вернитесь на главную
                </template>
                <template #buttons>
                    <div class="button-box">
                        <v-btn min-width="150" large color="primary" @click="goHome">
                            Перейти на главную
                        </v-btn>
                    </div>
                </template>
            </b-block-empty>
        </div>
        <div class="l-not-found__title">404</div>
        <div class="l-not-found__block-shadow" />
    </v-app>
</template>

<script>
const BSvg = () => import(/* webpackChunkName: "Svg" */ '../../../components/icons/Svg');
const BBlockEmpty = () =>
    import(/* webpackChunkName: "BlockEmpty" */ '../../../components/blocks/BlockEmpty');

export default {
    components: {
        BSvg,
        BBlockEmpty,
    },
    methods: {
        goHome() {
            window.location.replace(
                window.location.origin + '/' + window.location.pathname.split('/')[1]
            );
        },
    },
};
</script>

<style lang="scss" scoped src="./errors.scss" />
