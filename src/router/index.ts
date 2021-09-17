import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import nested from './modules/nested'
const Layout = () => import('@/layout/index.vue')
const compositionApi = () => import('@/views/composition-api/index.vue')
const tableList = () => import('@/views/table-list/index.vue')
const directive = () => import('@/views/directive/index.vue')

// 导入动态路由
const asyncFiles = require.context('./asyncModules', true, /\.ts$/)
let asyncModules: Array<RouteRecordRaw> = []
asyncFiles.keys().forEach((key) => {
  if (key === './index.ts') return
  asyncModules = asyncModules.concat(asyncFiles(key).default)
})

// 路由表
export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/redirect',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import(/* webpackChunkName: "redirect" */ '@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "userManager" */ '@/views/login/index.vue')
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: {
          title: '首页',
          icon: 'dashboard',
          affix: true
        }
      }
    ]
  },
  {
    path: '/composition-api',
    name: 'compositionApi',
    component: Layout,
    meta: {
      title: 'composition-api',
      icon: 'dashboard',
      alwaysShow: true
    },
    children: [
      {
        path: 'index',
        component: compositionApi,
        name: 'compositionApi-index',
        meta: {
          title: 'composition-api-index',
          icon: 'dashboard'
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

export const asyncRoutes: Array<RouteRecordRaw> = [...asyncModules, nested]
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})

export function resetRouter() {
  // 重置路由
  // 注意：所有动态路由路由必须带有 name 属性，否则可能会不能完全重置干净
  try {
    router.getRoutes().forEach((route) => {
      const { name, meta } = route
      if (name && meta.roles?.length) {
        router.hasRoute(name) && router.removeRoute(name)
      }
    })
  } catch (error) {
    // 强制刷新浏览器，不过体验不是很好
    window.location.reload()
  }
}

export default router
