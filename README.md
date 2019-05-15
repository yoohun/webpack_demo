#WEBPACK_DEMO
>This is a webpack practice.    

``` bash
# install dependencies
npm install

# build for production with minification
npm run build

# serve with hot reload at localhost:5454
npm run server
```

##webpack_demo     
###tips:  


##安装webpack
mkdir [filename] -> cd [filename] -> npm install webpack -g -> webpack -v ->  
npm install webpack-cli -g -> npm insatll init (把该文件夹初始化为的是创建一个package.json文件)  
-> npm install webpack webpack-cli --save-dev  
  
##1 初步熟悉webpack  
1.在还未正式学习webpack的时候我们可以用另一种方式来初步接触一下打包文件：
在webpack_demo文件夹的根目录下创建src文件夹，里面创建一个js文件，创建dist文件夹（打包后的文件所在的文件夹）里面创建一个html文件，在html文件中引入bundle.js文件。  
初步创建好所需的文件后，来控制台中输入：   
>webpak ./src/entry.js output ./dist/bundle.js --mode development  
  
[ ./src/entry.js] 是指要打包的文件内容   
[./dist/bundle.js] 是指要打包成根目录下dist文件夹的bundle.js文件  
output是意为接下来的是要打包的路径

2.live-server 可以帮助前端人员搭建临时的http服务器可以自动打开项目，浏览器能立即同步，自动加载，自动刷新，在安装好了之后，吧文件打包好后在控制台输入 live-server 浏览器就能自动打开网页能自动看到效果  
安装：  
>npm install -g live-server  

##2 正式学习webpack  (了解webpack.config.js以及配置入口出口文件)  
在实际工作中，上面的方法是不使用的，而是使用webpack的配置文件来进行打包  
1.webpack.config.js结构  

	module.exports = { 
		entry: {},  //入口文件配置项
		output: {}, //出口文件配置项（webpack最后打包文件的地址和名称）
		module: {},  //模块解读css，图片如何压缩或转换
		plugins: [], //插件
		devServer: {} //配置webpack开发服务功能
	}  

2.单入口单出口文件配置  

	module.export = {
		entry: {
			entry: './src/entry.js'
		},
		output: {
			path: path.resolve(__dirname+ 'dist'),
			filename: 'bundle.js'  //打包后的文件名
		}
	}    
配置完成之后就可以使用webpack对项目进行打包

3.多入口多出口文件配置    

	module.export = {
		entry: {
			entry: './src/entry.js',
			entry2: './src/entry2.js'
		},
		output: {
			path: path.resolve(__dirname+ 'dist'),
			filename: '[name].js'  //打包后的文件
		}
	}    
配置成功之后就可以使用webpack对项目进行打包  
   
##3. 配置服务和热更新  

热更新简洁的理解就是在左边屏幕打开浏览器，右边打开编辑器，当编辑器中的内容被编辑并且进行保存之后，左边的浏览器不需要进行自动刷新就可以自动更新（即时更新）。  
  
安装dev-server  
`npm install --save-dev webpack-dev-server`  
  
对webpack.config.js进行配置  

	module.export = {
		entry: {
			entry: './src/entry.js',
			entry2: './src/entry2.js'
		},
		output: {
			path: path.resolve(__dirname+ 'dist'),
			filename: '[name].js'  //打包后的文件
		},
		devServer: {
			contentBase: path.resolve(__dirname,'dist'), //设置基本的目录结构，路径（用于找到打包后的文件）
			compress: true,  //服务器端的压缩是否要开启 
			host: 'localhost',   //最好写IP地址
			port: '1212',	// 配置端口	
			inline: true,   // 当源文件改变的时候，就会自动刷新页面（即热更新）
			// 还有一个historyFallback属性，在开发单页应用的时候很有用，它依赖于h5的history的API，如果它设置为true的话，所有的跳转都会指向的是index.html
		}
	}  
  
package.json  

	{
		"script": {
			"build": "webpack",
			"server": "webpack-dev-server"
		}
	
	}  

配置好了之后就可以在控制台里输入:  
`npm run build`  

`npm run server`  
来对文件进行打包和起服务  
在执行成功之后有： Project is running at http://localhost:412  
那么我们就能在地址栏中输入该地址就能访问到打包好的页面，可以不用之前使用的方法来打包文件。该操作的同时也能支持热更新，在 npm run server 启动页面之后，它有一种监控机制（watch），能够监控到我们修改源码，且立即在浏览器中更新。    
 
**在起了服务之后，想让其他的电脑或者手机都能访问到该项目**  
package.json 文件中 

	{
		"script": {
			"build": "webpack",
			"server": "webpack-dev-server --open --env dev --host ip地址"
		}
	
	}   
这样的话，在同一个局域网中的电脑或者手机就能够访问得到  

##4.模块：CSS文件打包  
Webpack在生产环境中有一个重要的作用就是减少http的请求数，就是把多个文件打包到一个js里，这样请求数就可以减少好多。这节课我们就学习一个重要的知识，把我们的CSS文件打包。在学习CSS打包之前，需要先对webpack.config.js里的Loaders配置项进行了解。  

Loaders是Webpack最重要的功能之一，他也是Webpack如此盛行的原因。通过使用不同的Loader，Webpack可以的脚本和工具，从而对不同的文件格式进行特定处理。

简单的举几个Loaders使用例子：

1.可以把SASS文件的写法转换成CSS，而不在使用其他转换工具。
2.可以把ES6或者ES7的代码，转换成大多浏览器兼容的JS代码。
3.可以把React中的JSX转换成JavaScript代码。    
**注意：所有的Loaders都需要在npm中单独进行安装，并在webpack.config.js里进行配置。下面我们对Loaders的配置型简单梳理一下。**

test：用于匹配处理文件的扩展名的表达式，这个选项是必须进行配置的；
use：loader名称，就是你要使用模块的名称，这个选项也必须进行配置，否则报错；
include/exclude:手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）；
query：为loaders提供额外的设置选项（可选）。  

####打包CSS文件  
css文件不需要直接引导到index.html中，可以导入到js文件中（把文件都整合到几个文件中，能减少http请求的次数）
所以就在任何一个js文件中先把css文件引入：  
`import indexccss from './css/index.css'`  

打包css文件需要loader，所以需要安装两个loader： style-loader,css-loader  

`npm install --save-dev style-loader css-loader`

webpack.config.js

	module.export={
		module: {
			rules: [{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			}]
		}		
	}  
以上便配置成功了，配置成功之后就可以使用  
`npm run build` 以及 `npm run server`  


##5.配置js压缩   
项目在上线之前都是需要压缩js的，所以可以使用一个插件来把项目中的js进行压缩：uglifyjs-webpack-plugin（简称uglifyjs），但是该插件是默认集成的，所以不需要再次安装。  
引入: webpack.config.js文件下  
	
	const uglifyjs = require('uglifyjs-webpack-plugin')
	plugins: [
		new uglifyjs()	
	]    
以上配置完成  

##6.HTML的发布  
在实际项目中dist文件夹是打包之后C才出现的，所以像之前的在dist文件中设置一个index.html文件的情况是没有的。所以在实际项目中html文件也是在src文件夹下的，并且index.html文件也不需要引入js，因为webpack会自动引入js文件。  
html的发布需要一个插件： html-webpack-plugin  
安装: `npm install --save-dev html-webpack-plugin`  
webpack.config.js配置  

	const htmlPlugin = require('html-plugin')  
	plugins: [
		new	htmlPlugin({
			minify: {
				removeAttributeQuotes: true
			},
			hash: true,
			template: './src/index.html'
		})
	]
配置完成之后，`npm run build `以及`npm run server` 之后就会发现js已经自动引入到了html文件当中了。  

##7.CSS中的图片处理 
在学习过程中可能会出现这样一种情况：给网页使用css设置了图片在开发环境中能够正确显示但是打包之后就找不到图片了。  

解决这个问题主要使用到一个loader： file-loader，url-loader  

**file-loader**：该loader主要是解决路径的问题，它可以解析项目中的url的引入  
**url-loader**：会把引入的图片编码，生成dataURI，但是如果图片太大的话就不会编码而是直接copy图片。  

webpack.config.js  

	module: {
		rules: [{
			test: /\.(jpg|gif|png)$/i,
			use: [{
				loader: 'url-loader',
				options: {
					limit: 500000
				}
			}]
		}]	
	}

