import VAutocomplete from 'vuetify/lib/components/VAutocomplete';
import { selectProps } from '../../../../mixins';
console.log(VAutocomplete.options.data());
export default {
    name: 'AutoComplete',
    extends: VAutocomplete,
    mixins: [selectProps(VAutocomplete)],
    props: {
        clearable: {
            ...VAutocomplete.options.props.clearable,
            default: true,
        },
    },
    computed: {
        classes() {
            return {
                ...VAutocomplete.options.computed.classes.call(this),
                'c-select': true,
                'c-select--clearable': true,
                [this.customID]: true,
            };
        },
    },
};
