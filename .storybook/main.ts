//const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');
//const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
//const CopyWebpackPlugin = require('copy-webpack-plugin');
import type { StorybookConfig } from '@storybook/vue-vite';
import { resolve } from 'path';
const pathToSvg = /spriteSVG/;


export const config: StorybookConfig =  {
    stories: ['../componentsV2/**/*.stories.ts'],
    // webpackFinal: (config) => {
    //     config.module.rules.push({
    //         test: /\.sass$/i,
    //         use: [
    //             'style-loader',
    //             'css-loader',
    //             {
    //                 loader: 'sass-loader',
    //                 options: {
    //                     additionalData: '@import "@beautybox/ui-kit/scss/variables.scss"',
    //                     implementation: require('sass'),
    //                 },
    //             },
    //         ],
    //     });
    //     config.module.rules.push({
    //         test: /\.scss$/i,
    //         use: [
    //             'style-loader',
    //             'css-loader',
    //             {
    //                 loader: 'sass-loader',
    //                 options: {
    //                     additionalData: '@import "@beautybox/ui-kit/scss/variables.scss";',
    //                     implementation: require('sass'),
    //                 },
    //             },
    //         ],
    //     });
    //     const fileLoaderRule = config.module.rules.find((rule) => rule.test.test('.svg'));
    //     fileLoaderRule.exclude = pathToSvg;
    //     config.module.rules.push({
    //         test: /\.svg$/i,
    //         include: pathToSvg,
    //         use: [
    //             {
    //                 loader: 'svg-sprite-loader',
    //                 options: {
    //                     extract: true,
    //                     spriteFilename: 'assets/sprite.[hash:8].svg',
    //                 },
    //             },
    //             'svgo-loader',
    //         ],
    //         // include: svgList,
    //     });
    //     config.resolve.alias = { ...config.resolve.alias, '@beautybox/ui-kit': resolve(__dirname, '..'), '@crm': resolve(__dirname, '..', '..', 'crm', 'src') };
    //     config.plugins.push(new VuetifyLoaderPlugin());
    //     config.plugins.push(
    //         new SpriteLoaderPlugin({
    //             plainSprite: true,
    //         })
    //     );
    //     config.plugins.push(
    //         new CopyWebpackPlugin({
    //             patterns: [
    //                 {
    //                     from: 'assets',
    //                     to: 'assets',
    //                     globOptions: {
    //                         ignore: ['**/spriteSVG/**'],
    //                     },
    //                 },
    //             ],
    //         }),
    //     );
    //     return config;
    // },
    //addons: ['@storybook/addon-docs', '@storybook/addon-jest/register', '@storybook/addon-viewport/register',
    
//],
    addons: ['@storybook/addon-docs', '@storybook/addon-links', '@storybook/addon-essentials',  {
        name: '@storybook/addon-storysource',
        options: {
            rule: {
                test: /\.stories\.ts$/,
                include: [resolve(__dirname, '../componentsV2')]
            }
        }
    }],
    docs: {
        autodocs: 'tag'
    },
    framework: {
        name: '@storybook/vue-vite',
        options: {}
    },
    core: {
        builder: '@storybook/builder-vite',
    },
};

export default config;