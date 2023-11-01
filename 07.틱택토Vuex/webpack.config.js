const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path'); //노드가 만들어주는 스크립트(모듈)를 불러와서 사용

module.exports = {
    mode: 'development', //개발 모드로 사용, 배포시에는 production
    devtool: 'eval', //웹팩 빌드 속도가 빨라짐
    resolve: {
        extensions: ['.js', '.vue'] //여기에 extension을 추가하면 좋은게 import, require 할때 from './NumberBaseball.vue'에서 확장자를 제거하고 쓸수가 있다 ('./NumberBaseball') 이렇게만 사용 가능
    },
    entry: {
        app: path.join(__dirname, 'main.js') //추가로 여기도 path를 사용해서 수정해보자
    },
    module: {
        rules: [{
            test: /\.vue$/,
            use: 'vue-loader'
        }, {
            test: /\.css$/,
            use: ['vue-style-loader',
                     'css-loader',]
        }]
    },
    plugins: [
        new VueLoaderPlugin(),
    ],
    output: {
        filename: '[name].js', //이렇게 하면 위에 entry에서 지정한 'app'이라는 이름으로 filename 자동 지정
        path: path.join(__dirname, 'dist'), //폴더 경로 지정 (path.join(__dirname)를 하면 현재 폴더 경로를 절대경로로 얻고 그 뒤에 dist를 붙이는 것)
        publicPath: '/dist',
    },
    devServer: {
        devMiddleware: {publicPath:'/dist'},
        static: {directory: path.resolve(__dirname) },
        hot:true
    }
}