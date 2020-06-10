/**
 * api接口统一管理
 */
import { get, post } from '../main';

let menuList = [{ "children": [], "id": 410000, "isShow": 0, "menuName": "首页", "menuPath": "/", "menuType": 1, "menuUrl": "/", "parentId": 0 }, { "children": [{ "children": [], "id": 410006, "isShow": 1, "menuName": "个人用户", "menuPath": "personalUser", "menuType": 1, "menuUrl": "user/personalUser", "parentId": 410001 }, { "children": [], "id": 410007, "isShow": 1, "menuName": "企业用户", "menuPath": "businessUser", "menuType": 1, "menuUrl": "user/businessUser", "parentId": 410001 }], "id": 410001, "isShow": 1, "menuName": "用户管理", "menuPath": "/", "menuType": 1, "menuUrl": "/", "parentId": 0 }, { "children": [{ "children": [], "id": 410008, "isShow": 1, "menuName": "个人产品", "menuPath": "personalProduct", "menuType": 1, "menuUrl": "product/personalProduct", "parentId": 410002 }, { "children": [], "id": 410009, "isShow": 1, "menuName": "企业产品", "menuPath": "businessProduct", "menuType": 1, "menuUrl": "product/businessProduct", "parentId": 410002 }], "id": 410002, "isShow": 1, "menuName": "产品管理", "menuPath": "/", "menuType": 1, "menuUrl": "/", "parentId": 0 }, { "children": [{ "children": [], "id": 410010, "isShow": 1, "menuName": "订单领取", "menuPath": "getOrder", "menuType": 1, "menuUrl": "order/getOrder", "parentId": 410003 }, { "children": [{ "children": [], "id": 410021, "isShow": 0, "menuName": "录单详情", "menuPath": "enteringOrderDetails", "menuType": 2, "menuUrl": "subPage/enteringOrderDetails", "parentId": 410011 }], "id": 410011, "isShow": 1, "menuName": "录单", "menuPath": "enteringOrder", "menuType": 1, "menuUrl": "order/enteringOrder", "parentId": 410003 }, { "children": [{ "children": [], "id": 410022, "isShow": 0, "menuName": "批单详情", "menuPath": "endorsePolicyDetails", "menuType": 2, "menuUrl": "subPage/endorsePolicyDetails", "parentId": 410012 }], "id": 410012, "isShow": 1, "menuName": "批单", "menuPath": "endorsePolicy", "menuType": 1, "menuUrl": "order/endorsePolicy", "parentId": 410003 }, { "children": [], "id": 410013, "isShow": 1, "menuName": "人员清单", "menuPath": "staffList", "menuType": 1, "menuUrl": "order/staffList", "parentId": 410003 }, { "children": [{ "children": [], "id": 410023, "isShow": 0, "menuName": "所有订单详情", "menuPath": "orderDetails", "menuType": 2, "menuUrl": "subPage/orderDetails", "parentId": 410014 }], "id": 410014, "isShow": 1, "menuName": "所有订单", "menuPath": "allOrders", "menuType": 1, "menuUrl": "order/allOrders", "parentId": 410003 }, { "children": [{ "children": [], "id": 410024, "isShow": 0, "menuName": "所有批单详情", "menuPath": "endorseOrderDetails", "menuType": 2, "menuUrl": "subPage/endorseOrderDetails", "parentId": 410015 }], "id": 410015, "isShow": 1, "menuName": "所有批单", "menuPath": "allEndorseOrders", "menuType": 1, "menuUrl": "order/allEndorseOrders", "parentId": 410003 }], "id": 410003, "isShow": 1, "menuName": "订单管理", "menuPath": "/", "menuType": 1, "menuUrl": "/", "parentId": 0 }, { "children": [{ "children": [], "id": 410025, "isShow": 1, "menuName": "结算", "menuPath": "settlement", "menuType": 1, "menuUrl": "finance/settlement", "parentId": 410004 }], "id": 410004, "isShow": 1, "menuName": "财务管理", "menuPath": "/", "menuType": 1, "menuUrl": "/", "parentId": 0 }, { "children": [{ "children": [], "id": 410016, "isShow": 1, "menuName": "组织机构", "menuPath": "organization", "menuType": 1, "menuUrl": "system/organization", "parentId": 410005 }, { "children": [], "id": 410017, "isShow": 1, "menuName": "管理员", "menuPath": "administrator", "menuType": 1, "menuUrl": "system/administrator", "parentId": 410005 }, { "children": [], "id": 410018, "isShow": 1, "menuName": "菜单", "menuPath": "menu", "menuType": 1, "menuUrl": "system/menu", "parentId": 410005 }, { "children": [], "id": 410019, "isShow": 1, "menuName": "角色", "menuPath": "role", "menuType": 1, "menuUrl": "system/role", "parentId": 410005 }, { "children": [], "id": 410020, "isShow": 1, "menuName": "权限", "menuPath": "power", "menuType": 1, "menuUrl": "system/power", "parentId": 410005 }], "id": 410005, "isShow": 1, "menuName": "系统管理", "menuPath": "/", "menuType": 1, "menuUrl": "/", "parentId": 0 }];

const testApi = p => post('test/test1', p);

//const postLogin = p => post('sys/login', p);

const postLogin = (p, debug) => {
  if (debug) {
    return new Promise(resolve => {
      resolve({
        code: 0,
        msg: '',
        data: {
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lcyI6IjE1NzcxNzQxNzg1OTYiLCJzdHIxIjoiMTIzMDAiLCJzdHIyIjoiRlVBT1RFQyIsImV4cCI6MTYwODc5NjU3OCwiaWF0IjoxNTc3MTc0MTc4fQ.LEioZ-CKAWyzG8WVFpKVz_LX4Epz3SEF9v1xPUztmOk',
          userName: '超级管理员'
        }});
    });
  }

  return post('sys/login', p);
}

const getUserAuthMenuList = p => {
  if (p){
    return new Promise(resolve => {
      resolve({
        code: 0,
        msg: '',
        data: {
          data: JSON.stringify(menuList)
        }});
    });
  }
  return get('ydb/sys/v1/selectUserAuthMenuList', p)
};

const getProducts = p => get('api/v1/users/my_address/address_edit_before', p);

const apiAddress = p => post('api/v1/users/my_address/address_edit_before', p);
// 查询管理员信息详情接口
const getUserInfo = p => get('ydb/sys/v1/getUserInfo', p);
// 查询管理员列表
const getUserList = p => get('ydb/sys/v1/getUserList', p);
// 创建管理员
const createUser = p => post('ydb/sys/v1/createUser', p);
// 修改管理员
const updateUser = p => post('ydb/sys/v1/updateUser', p);
// 创建角色
const createRole = p => post('ydb/sys/v1/createRole', p);
// 修改角色
const updateRole = p => post('ydb/sys/v1/updateRole', p);
// 查询角色详细信息
const getRole = p => get('ydb/sys/v1/getRole', p);
// 查询角色列表
const getRoleList = p => get('ydb/sys/v1/getRoleList', p);
// 创建用户角色
const createUserRole = p => post('ydb/sys/v1/createUserRole', p);
// 修改用户角色
const updateUserRole = p => post('ydb/sys/v1/updateUserRole', p);
// 查询用户角色详细信息
const getUserRoleInfo = p => get('ydb/sys/v1/getUserRoleInfo', p);
// 查询用户角色列表
const getUserRoleList = p => get('ydb/sys/v1/getUserRoleList', p);
// 创建用户组
const createUserGroup = p => post('ydb/sys/v1/createUserGroup', p);
// 查询用户组详细
const getUserGroupInfo = p => get('ydb/sys/v1/getUserGroupInfo', p);
// 查询用户组负责人列表
const getLeaderUserList = p => get('ydb/sys/v1/getLeaderUserList', p);
// 查询用户组详细
const getUserGroupList = p => get('ydb/sys/v1/getUserGroupList', p);
// 修改用户组列表
const updateUserGroup = p => post('ydb/sys/v1/updateUserGroup', p);
// 创建菜单
const createMenu = p => post('ydb/sys/v1/createMenu', p);
// 修改菜单
const updateMenu = p => post('ydb/sys/v1/updateMenu', p);
// 查询菜单详细
const getMenuInfo = p => get('ydb/sys/v1/getMenuInfo', p);
// 查询菜单列表
const getMenuList = p => get('ydb/sys/v1/getMenuList', p);
// 创建权限
const createPower = p => post('ydb/sys/v1/createPower', p);
// 修改权限
const updatePower = p => post('ydb/sys/v1/updatePower', p);
// 查询权限详细
const getPowerInfo = p => get('ydb/sys/v1/getPowerInfo', p);
// 查询权限列表
const getPowerList = p => get('ydb/sys/v1/getPowerList', p);


const Api = {
  testApi,
  postLogin,
  getUserAuthMenuList,
  getProducts,
  apiAddress,
  getUserList,
  getUserInfo,
  createUser,
  updateUser,
  getRoleList,
  getRole,
  updateRole,
  createRole,
  createUserRole,
  updateUserRole,
  getUserRoleInfo,
  getUserRoleList,
  createUserGroup,
  getUserGroupInfo,
  getUserGroupList,
  updateUserGroup,
  getLeaderUserList,
  createMenu,
  updateMenu,
  getMenuInfo,
  getMenuList,
  createPower,
  updatePower,
  getPowerInfo,
  getPowerList,
}

export default Api;
