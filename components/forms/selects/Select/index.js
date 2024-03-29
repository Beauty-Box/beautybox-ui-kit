import VSelect from 'vuetify/lib/components/VSelect';
import { selectProps } from '../../../../mixins';
import '../select.scss';

export default {
    name: 'FSelect',
    inheritAttrs: false,
    extends: VSelect,
    mixins: [selectProps(VSelect)],
    computed: {
        classes() {
            return {
                ...VSelect.options.computed.classes.call(this),
                'c-select': true,
                'c-input--clearable': this.clearable,
                'placeholder-is-visible': this.placeholder && !this.label,
            };
        },
    },
};
