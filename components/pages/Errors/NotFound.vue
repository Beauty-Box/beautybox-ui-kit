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
const BBlockEmpty = () =>
    import(/* webpackChunkName: "BlockEmpty" */ '../../../components/blocks/BlockEmpty');
import svgComponentMixin from '../../../mixins/svgComponent.mixin';

export default {
    components: {
        BBlockEmpty,
    },
    mixins: [svgComponentMixin],
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
