## 创建项目
```
    npm init -y
```
安装webpack4和webpack-cli
> yarn add webpack webpack-cli -D

## 创建 index.html
```
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title><%=htmlWebpackPlugin.options.title%></title>
    </head>
    <body>
        <div id="app">33</div>
    </body>
    </html>
```
src 下面创建index.js

```
console.log(33)
```

创建webpack.config.js

```
const path = require('path');


module.exports = {
    entry:'./src/index.js',
    output:{
        path:path.join(__dirname,'dist'),
        // name是entry名字，默认main，hash根据打包后文件内容生成的
        filename:'[name].[hash:8].js'//打包后文件名字
    },
    module:{
       
    },
    
    plugins:[
        
    ],
    // yarn add webpack-dev-server -D
    devServer:{
        contentBase:'./dist',
        host:'localhost',
        port:8080,
        compress:true,//服务器返回给浏览器的时候是否开启gzip压缩
    },
}
```

运行打包
> npm run build


## 引入Babel
安装babel
> yarn add @babel/core @babel/preset-env -d
安装babel-loader
> yarn add babel-loader -D
配置babel,一般在.babelrc文件中配置

```
{
  "presets": [
    "@babel/preset-env"
  ]
}
```
然后添加babel配置
```
{
    test: /\.js$/,
    loader: 'babel-loader',
    include: [resolve('src')],
    exclude: [resolve('node_modules')]
}
```

## HTML模板
安装webpack-html-plugin：
> yarn add html-webpack-plugin -D
修改webpack文件
```
// 此插件自动产出html
new HtmlWebpackPlugin({
    template:'./src/index.html',
    filename:'index.html',//产生文件名称
    title:'hah ',
    hash:true,//会在引入的js里加入查询字符串避免缓存
    minify:{
        removeAttributeQuotes:true//属性去掉引号
    }
})
```
创建 index.html
```
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title><%=htmlWebpackPlugin.options.title%></title>
    </head>
    <body>
        <div id="app">33</div>
    </body>
    </html>
```

## 清理输出文件夹
安装html-webpack-plugin
> yarn add html-webpack-plugin -D
修改webpack配置文件
```
new ClenWebpackPlugin([path.join(__dirname,'dist')]),

```

## 处理图片
主要有以下loader用于处理图片
1. file-loader，用于将图片转为连接
2. url-loader，对小图片直接Base64编码，对大图片通过file-loader进行处理
3. image-webpack-loader，对各种图片进行压缩
安装上面依赖
> yarn add file-loader url-loader image-webpack-loader
修改webpack.config.js文件，加入loader配置如下
```
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
}
```
我们会对所有的图片进行压缩，压缩之后的图片如果小于8KB，那么将直接转为Base64编码，否则通过URL的形式连接图片

