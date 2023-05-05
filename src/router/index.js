import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/login/index.vue";
import Layout from "@/layout/index.vue";
import Home from "@/views/home/index.vue";
import Book from "@/views/book/index.vue"
import Borrow from "@/views/borrow/index.vue";
import Classify from "@/views/classify/index.vue";
import User from "@/views/user/index.vue";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/main',
        name: 'Layout',
        component: Layout,
        children:
            [
                {
                    path: "/home",
                    component: Home,
                    meta:{
                        title:"首页"
                    }
                },{
                    path: "/book",
                    component: Book,
                    meta:{
                        title:"图书管理"
                    }
                },
                {
                    path: "/borrow",
                    component: Borrow,
                    meta:{
                        title:"借阅管理"
                    }
                },
                {
                    path: "/classify",
                    component: Classify,
                    meta: {
                        title: "分类管理"
                    }
                },
                {
                    path: "/user",
                    component: User,
                    meta:{
                        title:"用户管理"
                    }
                }
            ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
