const path = require('path')
const webpack = require('webpack')

module.exports = {
    entry: './src/client/index.js',
    devtool: 'source-map',
    stats: 'verbose',
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 6060
    },
    output: {
        libraryTarget: 'var',
        library: 'Client'
    },
    module: {
        rules: [
            {
                test:'/\.m?js$/',
                exclude: /node-modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [ 'style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpe?g|gif|ico)$/i,
                use: [
                    {
                        loader: 'file-loader?name=[name].[ext]',
                        options: {
                            esModule: false,
                        },
                    },
                ],
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            }
        ]
    },
    plugins: [
        
    ]
}