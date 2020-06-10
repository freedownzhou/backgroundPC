import { constantRouterMap } from '@/router/router';
import router from '@/router/router';
import Util from '@/lib/util';
//import Api from "../lib/api";



function generaMenu(routers, data) {
    data.forEach((item) => {
        if (item.children) {
            let menu = {
                path: item.menuPath,
                component: (resolve) => require([`@/view/${item.menuUrl}`], resolve),
                //hidden: true,
                children: [],
                name: item.menuType == 2 ? item.parentId : item.menuName,
                meta: { title: item.menuName, requireAuth: true, id: item.id, parentId: item.parentId }
            }
            generaMenu(routers, item.children);
            routers.push(menu);
        }
    })
}

function filterMenu(data) {
    let routers = [];
    data.forEach((item) => {
        if (item.path != "/") {
            routers.push(item);
        }
    })
    return routers;
}

function addRoutes() {
    return new Promise(resolve => {
        if (router.options.routes.length <= 1) {
            // 获取缓存中的菜单信息
            //Util.setMenu(JSON.stringify(menuList));
            let menus = Util.getMenu();
            if (menus) {
                menus = JSON.parse(menus);
                let routers = [{
                    path: '/index',
                    name: 'index',
                    component: (resolve) => require(['@/view/index'], resolve)
                }];
                generaMenu(routers, menus);
                routers = [{
                    path: "/",
                    name: "main",
                    component: (resolve) => require([`@/view/main`], resolve),
                    redirect: "/index",
                    meta: {
                        requireAuth: false
                    },
                    children: filterMenu(routers)
                }];
                router.addRoutes(routers);
                resolve(0);
            } else {
                resolve(1);
            }
        } else {
            resolve(0);
        }
    });
}

const generateRoutes = p => addRoutes(p);

export default generateRoutes;