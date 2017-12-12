const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');//html模板
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');

/*const Visualizer = require('webpack-visualizer-plugin'); // remove it in production environment.
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; // remove it in production environment.
const otherPlugins = process.argv[1].indexOf('webpack-dev-server') >= 0 ? [] : [
    new Visualizer(), // remove it in production environment.
    new BundleAnalyzerPlugin({
        defaultSizes: 'parsed',
        // generateStatsFile: true,
        statsOptions: {source: false}
    }), // remove it in production environment.
];*/

const postcssOpts = {
    ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
    plugins: () => [
        autoprefixer({
            browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
        }),
        // pxtorem({ rootValue: 100, propWhiteList: [] })
    ],
};

module.exports = {
    devtool: 'source-map', // or 'inline-source-map'
    devServer: {
        disableHostCheck: true
    },

    entry: {
        "index": path.resolve(__dirname, 'src/index'),
        //添加要打包在vendors.js里面的库
        vendors:['react','react-dom']
    },

    output: {
        filename: '[name].[chunkhash:5].js',
        chunkFilename: '[id].chunk.js',
        path: path.join(__dirname, '/build'),
        // publicPath: '/build/'
    },

    resolve: {
        modules: [path.resolve(__dirname, 'node_modules'), path.join(__dirname, 'src')],
        extensions: ['.web.js', '.jsx', '.js', '.json'],
        //设置别名方便引用
        alias: {
            Comps: path.resolve(__dirname, 'src/components/'),//组件
            Utils: path.resolve(__dirname, 'src/util/'),//工具包
            RestUrl: path.resolve(__dirname, 'src/actions/RestUrl/'),//rest、http服务地址
            Img: path.resolve(__dirname, 'src/assets/img/'),//图片
        }
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader',
                options: {
                    plugins: [
                        'external-helpers', // why not work?
                        ["transform-runtime", {polyfill: false}],
                        ["import", [{"style": "css", "libraryName": "antd-mobile"}]]
                    ],
                    presets: ['es2015', 'stage-0', 'react']
                    // presets: [['es2015', { modules: false }], 'stage-0', 'react'] // tree-shaking
                }
            },
            {test: /\.(jpg|png)$/, loader: "url-loader?limit=8192&name=img/[name]_[hash:5].[ext]"},
            // 注意：如下不使用 ExtractTextPlugin 的写法，不能单独 build 出 css 文件
            // { test: /\.less$/i, loaders: ['style-loader', 'css-loader', 'less-loader'] },
            // { test: /\.css$/i, loaders: ['style-loader', 'css-loader'] },
            {
                test: /\.less$/i, use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    'css-loader', {loader: 'postcss-loader', options: postcssOpts}, 'less-loader'
                ]
            })
            },
            {
                test: /\.css$/i, use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    'css-loader', {loader: 'postcss-loader', options: postcssOpts}
                ]
            })
            },
            {
                test: /\.svg$/i,
                use:'svg-sprite-loader',
                include: [
                    require.resolve('antd-mobile').replace(/warn\.js$/, ''),  // antd-mobile使用的svg目录
                    path.resolve(__dirname, './node_modules/yylib-antd-mobile/svg/'),  // svg文件目录
                    path.resolve(__dirname, './src/'),  // 个人的svg文件目录，如果自己有svg需要在这里配置
                ]
            },
        ]
    },
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
        // new webpack.optimize.CommonsChunkPlugin('shared.js'),
        new webpack.optimize.CommonsChunkPlugin({
            // minChunks: 2,
            name: 'shared',
            filename: 'shared.[chunkhash:5].js'
        }),
        new ExtractTextPlugin({filename: '[name].[contenthash:5].css', allChunks: true}),
        new HtmlWebpackPlugin({template: './public/index.html'}),
        //...otherPlugins
    ]
}
