var webpack = require("webpack"),
    path = require('path'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    env = process.env.NODE_ENV,
    BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin,
    PKG = require('./package.json');

module.exports = {
    entry: {
        "app": [
            'babel-polyfill',
            'react-hot-loader/patch',
        ],
        "vendor": [
            "react",
            "react-dom",
            "react-redux",
            "react-hot-loader",
            "redux",
            "antd"
        ],
        "index": [
            './src/components/notifier/index.js',
        ],
        "admin": [
            './src/components/admin/index.js',
        ]
    },
    output: {
        path: path.resolve(__dirname, './public'),
        publicPath: '/',
        filename: "[name].bundle.js",
        chunkFilename: "[id].bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
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
        new CleanWebpackPlugin(['*.bundle.js'], {
            root: __dirname + '/public',
            verbose: true,
            dry: false
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            "API_URL": JSON.stringify(env === 'production' ? PKG.api.prodBase : PKG.api.devBase),
            "API_WS": JSON.stringify(env === 'production' ? PKG.api.prodWSBase : PKG.api.devWSBase)
        })
    ]
};