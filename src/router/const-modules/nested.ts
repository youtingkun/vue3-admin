import { RouteRecordRaw } from 'vue-router'
const Layout = () => import('@/layout/index.vue')

const nested: RouteRecordRaw = {
  path: '/nested',
  component: Layout,
  redirect: '/nested/menu1',
  name: 'Nested',
  meta: {
    title: '多层菜单',
    icon: 'link'
  },
  children: [
    {
      path: 'menu1',
      component: () => import('@/views/nested/menu1/index.vue'), // Parent router-view
      name: 'Menu1',
      meta: { title: 'Menu1', icon: 'el-icon-share' },
      children: [
        {
          path: 'menu1-1',
          component: () => import('@/views/nested/menu1/menu1-1/index.vue'),
          name: 'Menu1-1',
          meta: { title: 'Menu1-1', icon: 'el-icon-share' }
        },
        {
          path: 'menu1-2',
          component: () => import('@/views/nested/menu1/menu1-2/index.vue'),
          name: 'Menu1-2',
          meta: { title: 'Menu1-2', icon: 'el-icon-share' },
          children: [
            {
              path: 'menu1-2-1',
              component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1/index.vue'),
              name: 'Menu1-2-1',
              meta: { title: 'Menu1-2-1' }
            },
            {
              path: 'menu1-2-2',
              component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2/index.vue'),
              name: 'Menu1-2-2',
              meta: { title: 'Menu1-2-2' }
            }
          ]
        }
      ]
    },
    {
      path: 'menu2',
      component: () => import('@/views/nested/menu2/index.vue'),
      name: 'Menu2',
      meta: { title: 'menu2', icon: 'link' }
    }
  ]
}

export default nested
