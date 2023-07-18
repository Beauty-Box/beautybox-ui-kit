<script>
import Input from '../Input';

export default {
    name: 'InputSearch',
    extends: Input,
    props: {
        autocomplete: {
            type: String,
            default: 'on',
        },
        appendIcon: {
            ...Input.props.appendIcon,
            default: 'search',
        },
    },
};
</script>
