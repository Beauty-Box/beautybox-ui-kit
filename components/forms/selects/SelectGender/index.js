import FSelect from '../Select';
import { genderArray } from '@beautybox/utils/helpers';

export default {
    name: 'FSelectGender',
    extends: FSelect,
    props: {
        items: {
            type: Array,
            default: () => genderArray,
        },
        label: {
            type: String,
            default: 'Пол',
        },
        name: {
            type: String,
            default: 'gender',
        },
    },
};
