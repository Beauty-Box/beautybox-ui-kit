import { VDatePicker } from 'vuetify/lib';

export default {
    extends: VDatePicker,
    props: {
        weekdayFormat: {
            ...VDatePicker.options.props.weekdayFormat,
            default(event) {
                let weekday = new Intl.DateTimeFormat('ru-RU', { weekday: 'short' }).format(
                    new Date(event)
                );
                return `${weekday[0].toLocaleUpperCase()}${weekday.slice(1)}`;
            },
        },
    },
};
