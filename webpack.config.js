const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');
const pkg = require('./package.json');

module.exports = {
    mode: 'production',
    externals: {
        react: {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react',
        },
        'react-dom': {
            root: 'ReactDOM',
            commonjs2: 'react-dom',
            commonjs: 'react-dom',
            amd: 'react-dom',
        },
    },
    entry: {
        [pkg.name]: './src/index.js'
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].js',
        library: pkg.name,
        libraryTarget: 'umd',
    },
    resolve: {
        modules: [ 'node_modules', path.join(__dirname, '../node_modules') ],
        extensions: [ '*', '.js', '.jsx', '.less', '.css' ],
    },
    module: {
        noParse: [ /moment.js/ ],
        rules: [
            // Disable require.ensure as it's not a standard language feature.
            { parser: { requireEnsure: false } },
            // First, run the linter.
            // It's important to do this before Babel processes the JS.
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
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            importLoaders: 1,
                        },
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
                test: [ /\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/ ],
                loader: require.resolve('url-loader'),
                options: {
                    limit: 10000,
                    name: 'assets/[name].[hash:8].[ext]',
                },
            },
        ]
    },
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    parse: {
                        ecma: 8,
                    },
                    compress: {
                        ecma: 5,
                        warnings: false,
                        comparisons: false,
                        inline: 2,
                        drop_debugger: true,
                        drop_console: true,
                    },
                    mangle: {
                        safari10: true,
                    },
                    output: {
                        ecma: 5,
                        comments: false,
                        ascii_only: true,
                    },
                },
                parallel: true,
                cache: true,
                sourceMap: true,
            }),
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: {
                    parser: safePostCssParser,
                    map: false,
                },
            }),
        ],
    }
};
