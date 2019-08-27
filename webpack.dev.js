const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { PUBLIC_PATH = '/', API_HOST = '/', NODE_ENV = 'development' } = process.env;

module.exports = {
    target: 'web',

    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: PUBLIC_PATH,
        filename: 'static/bundle.js',
        chunkFilename: 'static/js/[name].chunk.js',
    },

    optimization: {
        splitChunks: { chunks: 'all' },
        noEmitOnErrors: true,
    },

    watch: true,
    devtool: 'source-map',
    mode: 'development',

    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        publicPath: PUBLIC_PATH,
        port: 3000,
        inline: true,
        hotOnly: true,
        host: '0.0.0.0',
        proxy: {
            '/api': API_HOST,
        },
        historyApiFallback: {
            index: PUBLIC_PATH,
        },
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        modules: [
            'src',
            'node_modules',
        ],
    },
    module: {
        rules: [
            {
                test: /\.js?x|.ts?x$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                ],
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'static/[path][name].[ext]',
                            context: 'src',
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve(__dirname, 'public/index.html'),
        }),
        new webpack.DefinePlugin({
            'process.env': JSON.stringify({ NODE_ENV, API_HOST, PUBLIC_PATH }),
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
};