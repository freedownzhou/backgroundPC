/**
 * api接口统一管理
 */
import { get, post } from '../main';



const testApi = p => post('test/test1', p);

const postLogin = p => post('sys/login', p);

const postUserAuthorityMenu = p => post('admin/system/selectUserAuthorityMenu.action', p);

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
  postUserAuthorityMenu,
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
