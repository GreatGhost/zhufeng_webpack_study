const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const notifier = require('node-notifier')
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const smw = new SpeedMeasureWebpackPlugin();
const webpack = require('webpack');
const {
    BundleAnalyzerPlugin
} = require("webpack-bundle-analyzer")
const path = require('path')
const icon = path.resolve(__dirname, 'error.jpg')
const loadersPath = path.resolve(__dirname, 'loaders')

module.exports = smw.wrap({
    mode: 'development',
    devtool: 'source-map', // 调试工具
    context: process.cwd(), // 上下文根目录
    entry: {
        main: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "bundle.js"
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            bootstrap: path.resolve(__dirname, 'node_modules/bootstrap/dist/css/bootstrap.css')
        },
        modules: [
            "c:/node_modules", "node_modules"
        ],
        mainFields: ['browser', 'module', 'main'],
        mainFiles: ['index']
    },
    resolveLoader: {
        modules: [loadersPath, 'node_modules']
    },
    externals: {
        jquery: 'jQuery'
    },

    module: {
        rules: [{
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                use: [{
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true
                    }
                }]
            },
            {
                test: /\.css$/,
                use: [
                    'cache-loader',
                    'logger-loader',
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [

        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'disabled',
            generateStatsFile: true
        }),
        new FriendlyErrorsWebpackPlugin({
            onErrors: (severity, errors) => {
                let error = errors[0];
                notifier.notify({
                    title: 'webpack编译失败',
                    message: severity + ':' + error.name,
                    subtitle: error.file || '',
                    icon: icon
                })
            }
        }),
        new webpack.IgnorePlugin({
            resourceRegExp: /^\.\/locale$/, //资源正则
            contextRegExp: /moment$/ // 上下文正则
        })
    ]
})