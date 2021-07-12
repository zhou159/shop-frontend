import vue from 'vue'
import VueRouter from "vue-router"

import NotFound from "../viwes/NotFound"

vue.use(VueRouter);//安装路由

export default new VueRouter({
    mode: 'history',//改成此模式，URL中就不会有#符号
    routes: [
        // {
        //     //路由路径
        //     path: '/main',
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
            path: '*',
            component: NotFound
        }
        ]
})
