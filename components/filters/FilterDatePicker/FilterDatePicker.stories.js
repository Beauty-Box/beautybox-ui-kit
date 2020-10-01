import { withKnobs } from '@storybook/addon-knobs';

import FilterDatePicker from './index';

export default { title: 'filters', decorators: [withKnobs] };

export const filterDatePicker = () => ({
    components: { FilterDatePicker },
    template: '<filter-date-picker></filter-date-picker>',
});
