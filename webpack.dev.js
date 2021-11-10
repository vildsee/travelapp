const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")

module.exports = {
    entry: './src/client/index.js',
    mode: 'development',
    devtool: 'source-map',
    stats: 'verbose',
    target: 'web',
    devServer: {
        // historyApiFallback: true,
        static: path.resolve(__dirname, './dist'),
        open: true,
        compress: true,
        // hot: true,
        port: 6060
        
    },
    // resolve: {
    //     fallback: {
    //       util: require.resolve("util/")
    //     }
    // },
    output: {
        libraryTarget: 'var',
        library: 'Client',
        // filename: '[name].bundle.js',
        // path: path.resolve(__dirname, 'dist'),
        clean: true,
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
                use: [ 'style-loader', 'css-loader', 'sass-loader'],
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
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html"
        }),
        new webpack.HotModuleReplacementPlugin(),
    ]
}