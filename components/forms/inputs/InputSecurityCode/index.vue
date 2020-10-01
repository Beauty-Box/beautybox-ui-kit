<template>
    <div
        class="c-security-code"
        :class="{ 'has-error error--text': error || errorMessages.length }"
    >
        <div class="c-security-code__inner">
            <label v-for="n in securityCodeLength" :key="n" class="c-security-code__field">
                <input
                    v-model="securityCode[n - 1]"
                    :style="{ '--bg': bg }"
                    :type="type"
                    autocapitalize="off"
                    autocomplete="off"
                    autocorrect="off"
                    maxlength="1"
                    spellcheck="false"
                    @focus="setSelected"
                    @input.stop="inputEvent"
                    @keydown.stop="downEvent"
                    @keypress.stop="pressEvent"
                    @paste="pasteEvent(n - 1, $event)"
                />
            </label>
        </div>
        <div v-if="errorMessages.length" class="c-security-code__errors error--text">
            {{ errorMessages[0] }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'SecurityCode',
    inheritAttrs: false,
    props: {
        value: {
            type: [Number, String],
            default: '',
        },
        blurOnComplete: {
            type: Boolean,
            default: false,
        },
        securityCodeLength: {
            type: Number,
            default: 4,
        },
        isArray: {
            type: Boolean,
            default: false,
        },
        type: {
            type: String,
            default: 'tel',
        },
        bg: {
            type: String,
            default: '#F7F7F8',
        },
        error: {
            type: Boolean,
            default: false,
        },
        errorMessages: {
            type: Array,
            default: () => [],
        },
    },
    data: (vm) => ({
        securityCode: new Array(vm.securityCodeLength),
    }),
    mounted() {
        if (this.value !== 0) {
            this.securityCode = this.value.toString().substr(0, this.securityCodeLength).split('');
        }
    },
    methods: {
        inputEvent(event) {
            let value = event.target.value;

            if (value.length > 1) {
                event.target.value = value.substr(0, 1);
            }

            if (this.getCodeString().length === this.securityCodeLength) {
                if (this.blurOnComplete) {
                    event.target.blur();
                } else {
                    this.nextElement(event);
                }
                this.$emit('complete');
                this.$emit('clearErrors');
            } else {
                event.target.value && this.nextElement(event);
            }
        },
        /**
         * Listen paste event.
         *
         * @param  {number} index
         * @param  {[type]} event
         *
         * @return {[array]}
         */
        pasteEvent(index, event) {
            let i,
                pasteData,
                elements = event.target.parentNode.parentNode.childNodes,
                len = 0,
                vm = this;

            for (
                event.clipboardData && event.clipboardData.getData
                    ? (pasteData = event.clipboardData.getData('Text'))
                    : window.clipboardData &&
                      window.clipboardData.getData &&
                      (pasteData = window.clipboardData.getData('Text')),
                    pasteData = pasteData
                        .replace(/\s/g, '')
                        .substr(0, elements.length - index)
                        .split(''),
                    i = 0;
                i < elements.length && !isNaN(Number(pasteData[i]));
                i++
            ) {
                len++;
                elements[i + index].firstChild.value = pasteData[i];
                vm.securityCode[i + index] = pasteData[i];
            }

            return [
                setTimeout(() => {
                    vm.getCodeString().length === vm.securityCodeLength
                        ? vm.blurOnComplete
                            ? event.target.blur()
                            : vm.previousElement(event, vm.getCodeString().length - 1)
                        : vm.previousElement(event, index + len);
                }, 0),
                event.preventDefault(),
                false,
            ];
        },
        pressEvent(event) {
            let keyCode = event.which || event.keyCode;
            return this.isMainKeyCode(keyCode) ||
                this.isTab(keyCode) ||
                this.isBackspace(keyCode) ||
                this.isMetaKey(event, keyCode)
                ? void 0
                : (event.preventDefault(), false);
        },
        downEvent(event) {
            let parentNode = event.target.parentNode;
            let keyCode = event.which || event.keyCode;
            let _sibling;

            if (keyCode === 8 && !event.target.value) {
                _sibling = parentNode.previousSibling;
                if (_sibling) {
                    _sibling.firstChild.focus();
                }
            } else if (keyCode >= 37 && keyCode <= 41) {
                switch (keyCode) {
                    case 37:
                        _sibling = parentNode.previousSibling;
                        break;
                    case 39:
                        _sibling = parentNode.nextSibling;
                        break;
                }
                if (_sibling) {
                    _sibling.firstChild.focus();
                }
                return [event.preventDefault(), false];
            }
            this.$emit('clearErrors');
        },
        previousElement(event, length) {
            let elements = event.target.parentNode.parentNode.childNodes;

            if (length >= elements.length) {
                length = elements.length - 1;
            }

            elements[length].firstChild.focus();
        },
        nextElement(event) {
            let parentNode = event.target.parentNode;
            let nextSibling = parentNode.nextSibling;

            nextSibling ? nextSibling.firstChild.focus() : parentNode.focus();
        },
        isTab(keyCode) {
            return keyCode === 9;
        },
        isBackspace(keyCode) {
            return keyCode === 8;
        },
        isMainKeyCode(keyCode) {
            return keyCode >= 48 && keyCode <= 57;
        },
        isMetaKey(event, keyCode) {
            return event.metaKey && keyCode === 118;
        },
        setSelected(event) {
            event.target.select();
            this.$emit('focus');
            this.$emit('clearErrors');
        },
        getCodeString() {
            let code = this.isArray ? this.securityCode : this.securityCode.join('');
            this.$emit('input', code);

            return code;
        },
    },
};
</script>

<style lang="scss" scoped>
.c-security-code {
    --bg: #f7f7f8;

    display: flex;
    flex-direction: column;

    &__inner {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &__field {
        & + .c-security-code__field {
            margin-left: 10px;
        }
    }

    &__errors {
        margin-top: 10px;
        min-height: 14px;
        font-size: 12px;
        line-height: 12px;
        text-align: center;
        color: red;
    }

    &.has-error {
        .c-security-code {
            &__field {
                input {
                    outline: none;
                    caret-color: red;
                    border: 1px solid red;
                    background-color: transparent;
                }
            }
        }
    }

    input {
        max-width: 60px;
        min-height: 70px;
        font-size: 32px;
        font-weight: 600;
        text-align: center;
        border-radius: 8px;
        caret-color: blue;
        outline-color: blue;
        border: 1px solid transparent;
        background-color: var(--bg);

        &:focus,
        &:focus-within,
        &:active {
            background-color: transparent;
        }
    }
}
</style>
