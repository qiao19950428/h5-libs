const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: [
        './demo/index.jsx',
        require.resolve('react-dev-utils/webpackHotDevClient'),
    ],
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'index.js',
        publicPath: '/',
        devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|mjs)$/,
                enforce: 'pre',
                use: [
                    {
                        options: {
                            formatter: eslintFormatter,
                            eslintPath: require.resolve('eslint'),

                        },
                        loader: require.resolve('eslint-loader'),
                    },
                ],
                include: path.join(__dirname, './src'),
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules\/(?!(dom7|ssr-window|swiper)\/).*/,
                loader: require.resolve('babel-loader'),
                options: {
                    presets: [
                        require.resolve('@babel/preset-react'),
                        [
                            require.resolve('@babel/preset-env'),
                            {
                                targets: {
                                    browsers: [
                                        'last 2 versions',
                                        'Firefox ESR',
                                        '> 1%',
                                        'ie >= 9',
                                        'iOS >= 8',
                                        'Android >= 4',
                                    ],
                                }
                            }
                        ]
                    ],
                    plugins: [
                        require.resolve('babel-plugin-inline-import-data-uri'),
                        require.resolve('@babel/plugin-transform-member-expression-literals'),
                        require.resolve('@babel/plugin-transform-object-assign'),
                        require.resolve('@babel/plugin-transform-property-literals'),
                        [
                            require.resolve('@babel/plugin-transform-runtime'),
                            {
                                helpers: false,
                            },
                        ],
                        require.resolve('@babel/plugin-transform-spread'),
                        require.resolve('@babel/plugin-transform-template-literals'),
                        require.resolve('@babel/plugin-proposal-export-default-from'),
                        require.resolve('@babel/plugin-proposal-export-namespace-from'),
                        require.resolve('@babel/plugin-proposal-object-rest-spread'),
                        [
                            require.resolve('@babel/plugin-proposal-decorators'),
                            {
                                legacy: true,
                            },
                        ],
                        require.resolve('@babel/plugin-proposal-class-properties'),
                    ],
                }
            },
            {
                test: /\.(css|less)$/,
                use: [
                    require.resolve('style-loader'),
                    {
                        loader: require.resolve('css-loader'),
                    },
                    {
                        loader: require.resolve('postcss-loader'),
                        options: {
                            plugins: () => [
                                autoprefixer({
                                    browsers: [
                                        '>1%',
                                        'last 5 versions',
                                        'Firefox ESR',
                                        'not ie < 9', // React doesn't support IE8 anyway
                                        'iOS >= 8',
                                        'Android >= 4',
                                    ],
                                    flexbox: 'no-2009',
                                }),
                            ],
                        },
                    },
                    {
                        loader: require.resolve('less-loader'),
                        options: {
                            javascriptEnabled: true,
                        },
                    },
                ],
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
                loader: require.resolve('url-loader'),
                options: {
                    limit: 10000,
                    name: 'assets/[name].[hash:8].[ext]',
                },
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: path.join(__dirname, './demo/index.html'),
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    resolve: {
        extensions: ['*', '.js', '.jsx', '.less', '.css']
    },
};
