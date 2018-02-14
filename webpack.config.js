var webpack = require("webpack"),
    path = require('path'),
    CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        "app": [
            'babel-polyfill',
            'react-hot-loader/patch',
            './src/index.js',
        ]
    },
    output: {
        path: path.resolve(__dirname, './public'),
        publicPath: '/',
        filename: "[name].bundle.js",
    },
    devtool: "eval",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'react-hot-loader/webpack'
                    },
                    {
                        loader: 'babel-loader',
                        options: {
                            'plugins': [
                                "react-hot-loader/babel",
                                "transform-object-rest-spread"
                            ],
                            'presets': [
                                "react",
                                ["es2015", {"modules": false}],
                                "latest"
                            ]
                        }
                    }]
            }]
    },
    devServer: {
        contentBase: path.join(__dirname, "public"),
        compress: true,
        port: 3000
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};