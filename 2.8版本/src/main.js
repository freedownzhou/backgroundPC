import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Qs from 'qs';
import iView from 'iview';
import router from '@/router/router';
import Util from '@/lib/util';
import Api from "@/lib/api"; // 导入我们的api接口
import App from './App';
import 'iview/dist/styles/iview.css';
import '@/assets/css/common.css';
import '@/assets/css/other.css';
import '@/assets/css/reset.css';
import '@/assets/fonts/iconfont.css';
//import echarts from 'echarts';
import store from '../store/index';
import 'babel-polyfill'; // 兼容
//import promise from 'es6-promise';

Vue.use(iView);
Vue.prototype.Util = Util;
Vue.prototype.Api = Api;

const Bus = new Vue()

const LOGIN_PAGE_NAME = 'login'

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    const token = Util.getToken();
    const isLogin = (to.name === LOGIN_PAGE_NAME);

    from.meta.keepAlive = false;  //修改为false
    if (!token && !isLogin) {
        // 未登录且要跳转的页面不是登录页
        next({
            name: LOGIN_PAGE_NAME // 跳转到登录页
        })
    } else if (!token && isLogin) {
        // 未登陆且要跳转的页面是登录页
        next() // 跳转
    } else if (token && isLogin) {
        // 已登录且要跳转的页面是登录页
        console.log(' 已登录且要跳转的页面是登录页');
        next({
            path: '/' // 跳转到homeName页
        })
    } else {

        next()
    }

});

router.afterEach((to, from, next) => {
    iView.LoadingBar.finish();
    Util.title(to.meta.title);
    window.scrollTo(0, 0);
});

let app = new Vue({
    el: '#app',
    data: {
        Bus   // 在子组件中通过this.$root.Bus.$on(); this.$root.Bus.$emit()来调用
    },
    router: router,
    store: store,
    components: {
        App
    },
    //render: h => h(App)
    template: '<App/>'
});


/* 默认配置axios */
axios.defaults.timeout = 600000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
//axios.defaults.baseURL = 'http://106.14.114.45:8080/api/';
//axios.defaults.baseURL = 'http://47.100.20.210:8080/api/';
//axios.defaults.baseURL = 'http://192.168.1.100:8082/';
axios.defaults.baseURL = Util.host();
//console.log(Util.host());
// transformRequest在向服务器发送前，修改请求数据
axios.defaults.transformRequest = [function (data) {
    return Qs.stringify(data);
}];

let nowDataTime = new Date().getTime();

// 请求拦截器
axios.interceptors.request.use(
    config => {
        // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        const token = Util.getToken();
        //token && (config.headers.Authorization = token);

        // var dateTime = store.state.dateTime;
        // if (token && (nowDataTime - dateTime) < (1000 * 3600 * 2)) {
        //     config.headers.Authorization = token;
        //     config.headers.access_token = token;
        // }

        if (token) {
            config.headers.Authorization = token;
            config.headers.access_token = token;
        }

        return config;
    },
    error => {
        return Promise.error(error);
    });


// 响应拦截器
axios.interceptors.response.use(
    response => {
        var code = response.data.code;
        switch (code) {
            case 0:
                //iView.Message.info(response.data.msg);
                break;
            case 40001:
                iView.Message.error('用户登录身份实效，即将请求重新登录···');
                Util.removeToken();
                Util.removeMenu();
                
                var pathname = window.location.pathname;//获取当前窗口的路径 ; 结果：/Home/Index
                var search = window.location.search;//获取参数；结果：?id=2&age=18
                // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
                setTimeout(() => {
                    router.push({
                        path: 'login?redirect='+ encodeURIComponent(pathname + search)
                    })
                }, 1000);
                break;
            case 50008:
                setTimeout(() => {
                    // router.push({
                    //     path: '/'
                    // });
                    router.push({
                        name: 'main'
                    })
                }, 500);

                break;
            default:
                iView.Message.warning(response.data.msg);
            //break;
        }
        return Promise.resolve(response);
    },
    // 服务器状态码不是200的情况
    error => {
        //iView.Message.error('网络请求不存在');
        return Promise.reject(error);
    }
);

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            console.log(err)
            iView.Message.error('网络请求失败');
            reject('网络请求失败')
        });
    });
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params).then(res => {
            resolve(res.data);
        }).catch(err => {
            iView.Message.error('网络请求失败');
            reject('网络请求失败')
        });
    });
}


Vue.use(VueAxios, axios);
