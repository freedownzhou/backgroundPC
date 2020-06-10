/** 
 * api接口统一管理
 */
import { get, post } from '../main';



const testApi = p => post('test/test1', p);

const postLogin = p => post('admin/user/login.action', p);

const postUserAuthorityMenu = p => post('admin/system/selectUserAuthorityMenu.action', p);

const getProducts = p => get('api/v1/users/my_address/address_edit_before', p);

const apiAddress = p => post('api/v1/users/my_address/address_edit_before', p);


const Api = {
    testApi,
    postLogin,
    postUserAuthorityMenu,
    getProducts,
    apiAddress
}

export default Api;