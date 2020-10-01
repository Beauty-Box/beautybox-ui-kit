import BSelectTime from './index';

export default { title: 'forms/selects/SelectGender' };

export const simple = () => ({
    components: { BSelectTime },
    template: '<b-select-time lable="test" />',
});
