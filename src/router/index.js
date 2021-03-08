import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/users/Login.vue'
import usersIndex from '@/views/users/Users.vue'
import usersCreate from '@/views/users/UsersCreate.vue'
import UserHistory from '@/views/users/UserHistory.vue'
import Roles from '@/views/roles/Roles.vue'
import Auths from '@/views/auths/Auths.vue'
import Admin from '@/views/admin/Admin.vue'
import RolesCreate from '@/views/roles/RolesCreate.vue'
import Goods from '@/views/goods/Goods.vue'
import GoodsCreate from '@/views/goods/GoodsCreate.vue'
import GoodsClcyle from '@/views/goods/GoodsClcyle.vue'
import OrdersTotals from '@/views/orders/Total.vue'
import GoodsLevel from '@/views/goodslevel/GoodsLevel.vue'
//进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,

    routes: [
        {
            path: '/login',
            component: Login
        },
        {
            path: '/admin', alias: '/',
            component: Admin,
            children: [
                { path: 'users', alias: '/', component: usersIndex, meta: { name1: "用户管理", name2: "列表" } },
                { path: 'users/create', component: usersCreate, meta: { name1: "用户管理", name2: "创建" } },
                { path: 'users/history', component: UserHistory },
                { path: 'roles', component: Roles, meta: { name1: "角色管理", name2: "列表" } },
                { path: 'roles/create', component: RolesCreate, meta: { name1: "角色管理", name2: "创建" } },
                { path: 'auths', component: Auths, meta: { name1: "权限管理", name2: "列表" } },
                { path: 'goods', component: Goods, meta: { name1: "商品管理", name2: "列表" } },
                { path: 'goods/create', component: GoodsCreate, meta: { name1: "商品管理", name2: "创建" } },
                { path: 'goods/clcyle', component: GoodsClcyle },
                { path: 'orders/totals', component: OrdersTotals },
                { path: 'goodslevel', component: GoodsLevel },

            ]

        },
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
        }
    ]
})
router.beforeEach((to, from, next) => {
    NProgress.start()
    if (to.path == '/login') {
        next()
    } else {
        let token = localStorage.getItem('token')
        if (token) {
            next()
        } else {
            next('/login')
        }
    }
});

router.afterEach(() => {
    NProgress.done()
})
export default router