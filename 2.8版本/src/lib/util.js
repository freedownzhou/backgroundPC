import Cookies from 'js-cookie'

// let host = 'http://47.103.119.152:8082/';
let host = 'http://192.168.1.101:8091/';

let util = {

};
util.host = () => {
  return host;
};
util.title = function (title) {
    title = title ? title : '赋奥管理平台';
    window.document.title = title;
};

export const TOKEN_KEY = 'token'
export const MENU_KEY = 'auth_menu'

util.setToken = (token) => {
    sessionStorage.setItem(TOKEN_KEY, token)
}

util.getToken = () => {
  const token = sessionStorage.getItem(TOKEN_KEY)
  if (token) return token
  else return false
}

util.removeToken = () => {
    sessionStorage.removeItem(TOKEN_KEY)
}

util.setMenu = (token) => {
    sessionStorage.setItem(MENU_KEY, token)
}

util.getMenu = () => {
  const token = sessionStorage.getItem(MENU_KEY)
  if (token) return token
  else return false
}

util.removeMenu = () => {
    sessionStorage.removeItem(MENU_KEY)
}


util.setItem = (key, value) => {
    sessionStorage.setItem(key, value)
}

util.getItem = (key) => {
  const value = sessionStorage.getItem(key)
  if (value) return value
  else return false
}

util.removeItem = (key) => {
    sessionStorage.removeItem(key)
}
util.setlocalItem = (key, value) => {
  localStorage.setItem(key, value)
}

util.getlocalItem = (key) => {
  const value = localStorage.getItem(key)
  if (value) return value
  else return false
}

util.removelocalItem = (key) => {
  localStorage.removeItem(key)
}


util.setCookieItem = (key, value) => {
    Cookies.set(key, value)
}

util.getCookieItem = (key) => {
  const value = Cookies.get(key)
  if (value) return value
  else return false
}

util.removeCookieItem = (key) => {
    Cookies.remove(key)
}

export default util;

