const path = require('path');
const webpack = require('webpack');
const ClenWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    entry:'./src/index.js',
    output:{
        path:path.join(__dirname,'dist'),
        // name是entry名字，默认main，hash根据打包后文件内容生成的
        filename:'[name].[hash:8].js'//打包后文件名字
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                // css-loader用来解析处理css文件中的url路径 把css文件变成模块
                // style-loader 把css文件变成style变迁插入
                // yarn add css-loader style-loader -D
                // 多个loader有顺序要求 转换时候是从右往左转换的 
                use: [ MiniCssExtractPlugin.loader, 'css-loader',"postcss-loader" ]
                // loader:['style-loader','css-loader']
            },
            {
                test:/\.less$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "less-loader",
                    "postcss-loader"
                ]
            },
            {
                test:/\.scss$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                    "postcss-loader"
                ]
            },
            // image
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8*1024
                        }
                    }, {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 75
                            },
                            optipng: {
                                enabled: true
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false
                            }
                        }
                    }
                ]
            },
            // babel
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [path.resolve('src')],
                exclude: [path.resolve('node_modules')]
            }
        ]
    },
    
    plugins:[
        // yarn add clean-webpack-plugin
        new ClenWebpackPlugin([path.join(__dirname,'dist')]),
        // yarn add html-webpack-plugin -D
        // 此插件自动产出html
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            filename:'index.html',//产生文件名称
            title:'hah ',
            hash:true,//会在引入的js里加入查询字符串避免缓存
            minify:{
                removeAttributeQuotes:true//属性去掉引号
            }
        }),
        // HRM
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css',
        }),
    ],
    // yarn add webpack-dev-server -D
    devServer:{
        contentBase:'./dist',
        host:'localhost',
        port:8080,
        hot:true,
        compress:true,//服务器返回给浏览器的时候是否开启gzip压缩
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
}