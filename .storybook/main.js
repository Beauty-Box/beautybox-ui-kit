const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const { resolve } = require('path');

const pathToSvg = /spriteSVG/;

module.exports = {
    stories: ['../components/**/*.stories.js'],
    webpackFinal: (config) => {
        config.module.rules.push({
            test: /\.sass$/i,
            use: [
                'style-loader',
                'css-loader',
                {
                    loader: 'sass-loader',
                    options: {
                        prependData: '@import "@ui-kit/scss/variables.scss"',
                        implementation: require('sass'),
                    },
                },
            ],
        });
        config.module.rules.push({
            test: /\.scss$/i,
            use: [
                'style-loader',
                'css-loader',
                {
                    loader: 'sass-loader',
                    options: {
                        prependData: '@import "@ui-kit/scss/variables.scss";',
                        implementation: require('sass'),
                    },
                },
            ],
        });
        const fileLoaderRule = config.module.rules.find((rule) => rule.test.test('.svg'));
        fileLoaderRule.exclude = pathToSvg;
        config.module.rules.push({
            test: /\.svg$/i,
            include: pathToSvg,
            use: [
                {
                    loader: 'svg-sprite-loader',
                    options: {
                        extract: true,
                        spriteFilename: 'assets/sprite.[hash:8].svg',
                    },
                },
                'svgo-loader',
            ],
            // include: svgList,
        });
        config.resolve.alias = { ...config.resolve.alias, '@ui-kit': resolve(__dirname, '..'), '@crm': resolve(__dirname, '..', '..', 'crm', 'src') };
        config.plugins.push(new VuetifyLoaderPlugin());
        config.plugins.push(
            new SpriteLoaderPlugin({
                plainSprite: true,
            })
        );
        return config;
    },
    addons: [
        '@storybook/addon-docs',
        '@storybook/addon-knobs/register',
        '@storybook/addon-jest/register',
        '@storybook/addon-viewport/register',
        {
            name: '@storybook/addon-storysource',
            options: {
                rule: {
                    test: /\.stories\.js$/,
                    include: [resolve(__dirname, '../components')]
                }
            }
        }
    ],
};
