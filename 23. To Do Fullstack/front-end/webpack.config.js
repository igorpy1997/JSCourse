const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';

    return {
        entry: './src/index.js',

        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: isProduction ? '[name].[contenthash].js' : '[name].js',
            clean: true,
        },

        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [['@babel/preset-env', { targets: 'defaults' }]]
                        }
                    }
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                        'css-loader',
                        {
                            loader: 'sass-loader',
                            options: {
                                api: 'modern'
                            }
                        }
                    ]
                },
                {
                    test: /\.css$/i,
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                        'css-loader'
                    ]
                },
                {
                    test: /\.(png|jpe?g|gif|svg|ico)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'images/[name][ext]'
                    }
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'fonts/[name][ext]'
                    }
                }
            ]
        },

        plugins: [
            new Dotenv({
                path: './.env.example.example',
                safe: false,
                systemvars: true,
                silent: true,
                defaults: false,
            }),

            new webpack.DefinePlugin({
                'process.env.API_URL': JSON.stringify(process.env.API_URL || 'http://localhost:3000/api'),
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            }),

            new HtmlWebpackPlugin({
                template: './src/index.html',
                minify: isProduction ? {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    keepClosingSlash: true,
                    minifyJS: true,
                    minifyCSS: true,
                    minifyURLs: true,
                } : false
            }),

            ...(isProduction ? [
                new MiniCssExtractPlugin({
                    filename: '[name].[contenthash].css'
                })
            ] : [])
        ],

        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        compress: {
                            drop_console: isProduction,
                            drop_debugger: true,
                            pure_funcs: isProduction ? ['console.log'] : [],
                            passes: 2,
                            unsafe: true,
                            unsafe_comps: true,
                            unsafe_math: true,
                            unsafe_proto: true,
                            unsafe_regexp: true,
                        },
                        mangle: {
                            safari10: true,
                        },
                        format: {
                            comments: false,
                            ascii_only: true,
                            beautify: false,
                            braces: false,
                            indent_level: 0,
                        },
                        parse: {
                            bare_returns: true,
                        },
                        sourceMap: false,
                    },
                    extractComments: false,
                    parallel: true,
                }),
                new CssMinimizerPlugin({
                    minimizerOptions: {
                        preset: [
                            'default',
                            {
                                discardComments: { removeAll: true },
                                normalizeWhitespace: true,
                                colormin: true,
                                minifySelectors: true,
                            },
                        ],
                    },
                }),
                ...(isProduction ? [
                    new ImageMinimizerPlugin({
                        minimizer: {
                            implementation: ImageMinimizerPlugin.imageminMinify,
                            options: {
                                plugins: [
                                    ['imagemin-mozjpeg', { quality: 80 }],
                                    ['imagemin-pngquant', { quality: [0.6, 0.8] }],
                                ]
                            }
                        }
                    })
                ] : [])
            ],
            splitChunks: {
                chunks: 'all',
                minSize: 0,
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                    },
                },
            },
        },

        devServer: {
            static: {
                directory: path.join(__dirname, 'dist'),
            },
            compress: true,
            port: 8081,
            open: true,
            hot: true,
            historyApiFallback: true,
            // Proxy API requests to backend during development
            proxy: {
                '/api': {
                    target: 'http://localhost:3000',
                    changeOrigin: true,
                    secure: false
                }
            }
        },

        devtool: isProduction ? false : 'eval-source-map',
    };
};