const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        full: './src/fullscreen.js',
        mini: './src/miniscreen.js'
    },
    mode: 'development',
    output: {
        filename: '[name].[chunkHash:5].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                loader: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 8192
                    }
                }
            },
            {
                test: /\.ttf$/,
                use: 'url-loader'
            }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        host: '0.0.0.0'
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[hash:5].css'
        }),
        new HtmlWebpackPlugin({
            filename: 'fullscreen.html',
            template: path.resolve(__dirname, 'src/fullscreen.html'),
            chunks: ['full']
        }),
        new HtmlWebpackPlugin({
            filename: 'miniscreen.html',
            template: path.resolve(__dirname, 'src/miniscreen.html'),
            chunks: ['mini']
        })
    ]
}