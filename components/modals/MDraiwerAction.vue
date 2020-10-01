<template>
    <filter-mobile>
        <template #body>
            <filter-select
                v-model.number="modelCategories"
                :items="categories"
                label="Категория клиента"
            />
        </template>
        <template #footer>
            <v-btn color="muted" large text light @click="closeFilter">
                Сбросить
            </v-btn>
            <v-btn color="primary" large @click="search">
                Применить
            </v-btn>
        </template>
    </filter-mobile>
</template>
