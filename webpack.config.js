var webpack = require("webpack"),
    path = require('path'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    env = process.env.NODE_ENV,

    prodBase = "https://notifierapp.herokuapp.com",
    devBase = "http://localhost:3001",

    prodWSBase = "wss://notifierapp.herokuapp.com",
    devWSBase = "ws://localhost:3001";

module.exports = {
    entry: {
        "app": [
            'babel-polyfill',
            'react-hot-loader/patch',
        ],
        "vendor": [
            "react",
            "react-dom"
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
        new CleanWebpackPlugin(['*.bundle.js'], {
            root: __dirname + '/public',
            verbose: true,
            dry: false
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            "API_URL": JSON.stringify(env === 'production' ? prodBase : devBase),
            "API_WS": JSON.stringify(env === 'production' ? prodWSBase : devWSBase)
        })
    ]
};