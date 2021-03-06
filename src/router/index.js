import vue from 'vue'
import VueRouter from "vue-router"

import NotFound from "../viwes/NotFound"
import Main from "../viwes//item/Main.vue"
import UpdateItem from "../viwes/item/UpdateItem"
import ShopMain from "../viwes/maintain/ShopMaintain";
import UnitMaintain from "../viwes/maintain/UnitMaintain";
import SpecificationMaintain from "../viwes/maintain/SpecificationMaintain";

vue.use(VueRouter);//安装路由

export default new VueRouter({
    mode: 'history',//改成此模式，URL中就不会有#符号
    routes: [
        // {
        //     //路由路径
        //     path: '/item',
        //     //跳转的组件
        //     component: Main,
        //     props: true,
        //     Children: [//嵌套路由
        //         {
        //             path: '/user/profile/:id',
        //             name: 'userprofile',
        //             component: UserProfile,
        //             props: true
        //         }
        //         ]
        // },
        {
            path:'/',
            component: Main,
            name:"main"
        },
        {
            path: '*',
            component: NotFound,

        },
        {
            path: '/updateItem/:item',
            component: UpdateItem,
            name:"updateItem"
        },
        {
            path: '/shopMaintain',
            component: ShopMain,
            name:"shopMaintain"
        },
        {
            path: '/specificationMaintain',
            component: SpecificationMaintain,
            name:"specificationMaintain"
        },
        {
            path: '/unitMaintain',
            component: UnitMaintain,
            name:"unitMaintain"
        }
        ]
})
