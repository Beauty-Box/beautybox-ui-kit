<template>
    <div
        ref="table"
        class="table-scroll"
        :style="{
            '--fixedColWidth': fixedColWidth,
            '--scrollColsWidth': scrollColsWidth,
            '--tdWidth': tdWidth,
        }"
        :class="{ 'table-scroll--custom-header': customHeader }"
    >
        <div class="d-flex flex-column table-scroll__wrapper">
            <div v-if="'table-header' in $slots" class="table-scroll__header">
                <slot name="table-header" />
            </div>

            <div class="table-scroll__inner">
                <div
                    class="table-scroll__fixed-col"
                    :class="{ 'table-scroll__fixed-col--hide-header': customHeader }"
                >
                    <slot name="table-fixed-col" />
                </div>
                <div
                    class="table-scroll__scroll-cols"
                    :class="{ 'table-scroll__scroll-cols--hide-header': customHeader }"
                    @scroll="scrollCols"
                >
                    <slot name="table-scroll-cols" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'BTableScrollHorizontal',
    props: {
        arrayLength: {
            type: Number,
            default: 0,
        },
        loading: {
            type: Boolean,
            default: false,
        },
        customHeader: {
            type: Boolean,
            default: false,
        },
    },
    data: () => ({
        bottom: false,
        fixedColWidth: 0,
        scrollColsWidth: 0,
        tdWidth: 0,
    }),
    updated() {
        this.$nextTick(() => {
            this.setEqualColsHeight();
        });
    },
    mounted() {
        this.$nextTick(() => {
            this.setEqualColsHeight();
        });
    },
    methods: {
        scrollCols(event) {
            event.target.querySelector('thead').scrollLeft = event.target.scrollLeft;
        },
        setEqualColsHeight() {
            let table = this.$refs.table;
            let scrollCols = table.querySelector('.table-scroll__scroll-cols');
            let fixedCols = table.querySelector('.table-scroll__fixed-col');
            let childScrollCols = scrollCols.querySelector('tbody').children;
            let childFixedCols = fixedCols.querySelector('tbody').children;

            this.scrollColsWidth = scrollCols.getBoundingClientRect().width + 'px';
            this.fixedColWidth = fixedCols.getBoundingClientRect().width + 'px';
            this.tdWidth = scrollCols.querySelector('td').getBoundingClientRect().width + 'px';

            if (HTMLCollection.prototype.forEach === undefined) {
                HTMLCollection.prototype.forEach = function (callback, thisObj) {
                    Array.prototype.forEach.call(this, callback, thisObj);
                };
            }

            childScrollCols.forEach((item, i) => {
                item.removeAttribute('style');
                childFixedCols[i].removeAttribute('style');

                if (item.clientHeight > childFixedCols[i].clientHeight) {
                    childFixedCols[i].style.height = item.clientHeight + 'px';
                } else if (item.clientHeight < childFixedCols[i].clientHeight) {
                    item.style.height = childFixedCols[i].clientHeight + 'px';
                }
            });
        },
    },
};
</script>
<style lang="scss">
.table-scroll {
    position: relative;
    background-color: #fff;

    overflow: hidden;
    overflow-y: auto;

    @include min(md) {
        max-height: calc(100vh - 316px);
    }

    @include max(sm) {
        max-height: calc(100vh - 205px);
    }

    @include max(xs) {
        max-height: calc(100vh - 248px);
        box-shadow: none;
        @include border(left);
        @include border(bottom);
    }

    &__inner {
        display: flex;
        width: 100%;
        max-width: 100%;
    } //.table-scroll__inner

    &:not(&--custom-header) {
        box-shadow: $box-shadow-base;
    }

    &--custom-header {
        .table-scroll__inner {
            box-shadow: $box-shadow-base;
        }
    }

    &__header {
        position: sticky;
        top: 0;
        z-index: 2;
    }
    &__fixed-col {
        flex-basis: 25%;
        flex-shrink: 0;
        @include border(right);

        @include max(xs) {
            flex-basis: auto;
            width: 150px;
        }

        table {
            width: 100%;
        }

        thead {
            width: var(--fixedColWidth, 0px);
            max-width: var(--fixedColWidth, 0px);
            @include border(right);

            tr,
            th {
                display: block;
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
        &:not(&--hide-header) {
            padding-top: 45px;
        }
    } //.table-scroll__fixed-col

    &__scroll-cols {
        flex-basis: 75%;
        flex-grow: 1;
        overflow-x: auto;

        @include max(xs) {
            flex-basis: auto;
            width: calc(100% - 150px);
        }

        table {
            @include min(lg) {
                width: 100%;
            }
        }

        thead {
            width: var(--scrollColsWidth, 0px);
            max-width: var(--scrollColsWidth, 0px);
            overflow-x: hidden;

            tr {
                width: 100%;
            }
        }

        tbody {
            display: flex;
            flex-direction: column;

            tr {
                display: flex;
            }

            td {
                display: block;
            }
        }

        th {
            @include max(xs) {
                @include border(top);
            }
        }

        td,
        th {
            display: flex;
            justify-content: center !important;
            align-items: center;
            min-width: 150px;
            text-align: center !important;
            //width: var(--tdWidth, 0px);

            &:not(:first-child) {
                @include border(left);
            }
        }

        td {
            width: 100%;
            display: flex !important;
            flex-direction: column;
            justify-content: center;
            align-items: stretch;

            button:disabled {
                cursor: default;
            }
        }

        &:not(&--hide-header) {
            padding-top: 45px;
        }
    } //.table-scroll__scroll-cols

    table {
        table-layout: fixed;
        border-collapse: collapse;
        background-color: #fff;
        user-select: none;
    }

    thead {
        color: $color-text;
        @include border(bottom);
        position: fixed;
        z-index: 1;
        transform: translateY(-45px);
        background-color: #fff;

        tr {
            display: flex;
            width: 100%;
        }

        th {
            height: 45px;
            width: 100%;

            @include max(xs) {
                @include border(top);

                /*&:not(:last-child) {
                    @include border(right);
                }*/
            }
        }
    }

    tr {
        &:last-child {
            td {
                border-bottom: 0;
            }
        }
    }

    td {
        @include border(bottom);
    }
} //.table-scroll
</style>
