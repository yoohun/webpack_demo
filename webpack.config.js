const path = require('path')
const ugfliy = require('uglifyjs-webpack-plugin')
const htmlplugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
var website = { publicPath: '/'}


module.exports={
  entry: {
    entry: './src/entry.js',
    entry2: './src/entry2.js',
    entry3: './src/entry3.js'
  },
  output: {
    //打包后的文件路径
    path: path.resolve(__dirname, 'dist'),
    //打包的文件名称
    filename: '[name].js',
    publicPath: website.publicPath
  },
  //模块：例如解读CSS,图片如何转换，压缩
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader',
          MiniCssExtractPlugin.loader,
        'css-loader'
      ]
      }, {
        test: /\.(png|jpg|gif)/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 500,
            outputPath: "images/"
          }
        }]
      },{
        test: /\.(htm|html)$/i,
        loader: 'html-withimg-loader'
      }, {
        test: /\.less$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "less-loader" // compiles Less to CSS
        }]
      }
    ]
  },
  //插件，用于生产模版和各项功能
  plugins: [
    new ugfliy(),
    new htmlplugin({
      minify: {
        removeAttributeQuotes: true},
      hash: true,
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "css/index.css"
    }),
  ],
  //配置webpack开发服务功能
  devServer: {
    //设置基本目录结构
    contentBase: path.resolve(__dirname, 'dist'),
    //服务器的IP地址，可以使用IP也可以使用localhost
    host: 'localhost',
    //服务端压缩是否开启
    compress: true,
    //配置服务端口号
    port: 5454,
    disableHostCheck: true
  }
}