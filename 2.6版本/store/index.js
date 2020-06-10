import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import Cookies from 'js-cookie'
Vue.use(Vuex)
Vue.prototype.Cookies = Cookies;
const module = {
    state: {
        userName: '',
        tokenName: 'access_token',
        menuName: 'slides_menu',
        access_token: '',
        slides_menu: '',
        dateTime: new Date().getTime()
    },
    getters: {},
    mutations: {
        setItem(state, payload){
            state[payload.key] = payload.value
        }
    },
    plugins: [createPersistedState({
        session: window.sessionStorage,
        cookie: {
            getItem: key => Cookies.get(key),
            setItem: (key, value) => Cookies.set(key, value, { expires: 7 }),
            removeItem: key => Cookies.remove(key)
        }
    })]
}

const store = new Vuex.Store(module)
export default store