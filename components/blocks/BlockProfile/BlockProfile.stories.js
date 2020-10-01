// import { withKnobs, object, number, boolean } from '@storybook/addon-knobs';

// import BlockProfile from './index';

// export default { title: 'blocks', decorators: [withKnobs] };

// export const blockProfile = () => ({
//     components: { BlockProfile },
//     props: {
//         data: {
//             default: object('data', {
//                 avatar:
//                     'https://images.unsplash.com/photo-1594846198287-f7aefab844de?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
//                 name: 'User',
//                 phone: '+7 (937) 140-04-44',
//                 clientType: {
//                     text: 'Клиент',
//                     color: 'primary',
//                 },
//             }),
//         },
//         loading: {
//             default: boolean('loading', false),
//         },
//         size: {
//             default: number('size', 80),
//         },
//         column: {
//             default: boolean('column', false),
//         },
//         shadow: {
//             default: boolean('shadow', false),
//         },
//         showPhone: {
//             default: boolean('showPhone', true),
//         },
//         phoneLink: {
//             default: boolean('phoneLink', false),
//         },
//         mobileOptions: {
//             default: boolean('mobileOptions', false),
//         },
//     },
//     template: '<block-profile v-bind="$props"></block-profile>',
// });
