import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const Home = () => import('@/views/home.vue')
const Vuex = () => import('@/views/vuex.vue')
const compositionApi = () => import('@/views/composition-api/index.vue')
const Axios = () => import('@/views/axios.vue')
const tableList = () => import('@/views/table-list/index.vue')
const directive = () => import('@/views/directive/index.vue')

export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/vuex',
    name: 'Vuex',
    component: Vuex
  },
  {
    path: '/axios',
    name: 'Axios',
    component: Axios // 懒加载组件
  },
  {
    path: '/composition-api',
    name: 'compositionApi',
    component: Layout,
    meta: {
      title: 'composition-api',
      icon: 'el-icon-share'
    },
    children: [
      {
        path: 'index',
        component: compositionApi,
        name: 'compositionApi-index',
        meta: {
          title: 'composition-api-index',
          icon: 'el-icon-share'
        }
      }
    ]
  },
  {
    path: '/table-list',
    name: 'tableList',
    component: tableList
  },
  {
    path: '/directive',
    name: 'directive',
    component: directive
  }
]

export const asyncRoutes = []

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})

export default router
