// app actions

import { ActionContext, ActionTree } from 'vuex'
import { RootState, useStore } from '@/store'
import { state, UserState } from './state'
import { Mutations } from './mutations'
import { UserMutationTypes } from './mutation-types'
import { UserActionTypes } from './action-types'
import { removeToken, setToken } from '@/utils/cookies'
import { PermissionActionType } from '../permission/action-types'
import router, { resetRouter } from '@/router'
import { RouteRecordRaw } from 'vue-router'
import { accountLogin, userInfoRequest } from '@/api/login'

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<UserState, RootState>, 'commit'>

export interface Actions {
  [UserActionTypes.ACTION_LOGIN]({ commit }: AugmentedActionContext, userInfo: any): void
  [UserActionTypes.ACTION_RESET_TOKEN]({ commit }: AugmentedActionContext): void
  [UserActionTypes.ACTION_GET_USER_INFO]({ commit }: AugmentedActionContext): void
  [UserActionTypes.ACTION_CHANGE_ROLES]({ commit }: AugmentedActionContext, role: string): void
  [UserActionTypes.ACTION_LOGIN_OUT]({ commit }: AugmentedActionContext): void
}

export const actions: ActionTree<UserState, RootState> & Actions = {
  async [UserActionTypes.ACTION_LOGIN]({ commit }: AugmentedActionContext, userInfo: any) {
    let { username, password } = userInfo
    username = username.trim()
    setToken('res.data.accessToken')
    commit(UserMutationTypes.SET_TOKEN, 'res.data.accessToken')
    // await accountLogin({ username, password }).then(async(res: any) => {
    //   if (res?.code === 0 && res.data.accessToken) {
    //     setToken(res.data.accessToken)
    //     commit(UserMutationTypes.SET_TOKEN, res.data.accessToken)
    //   }
    // }).catch((err: any) => {
    //   console.warn(err)
    // })
  },

  [UserActionTypes.ACTION_RESET_TOKEN]({ commit }: AugmentedActionContext) {
    removeToken()
    commit(UserMutationTypes.SET_TOKEN, '')
    commit(UserMutationTypes.SET_ROLES, [])
  },

  async [UserActionTypes.ACTION_GET_USER_INFO]({ commit }: AugmentedActionContext) {
    if (state.token === '') {
      throw Error('token is undefined!')
    }
    const res = {
      id: 0,
      username: 'admin',
      password: 'any',
      name: 'Super Admin',
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      introduction: 'I am a super administrator',
      email: 'admin@test.com',
      phone: '1234567890',
      roles: ['admin']
    }
    commit(UserMutationTypes.SET_ROLES, res.roles)
    commit(UserMutationTypes.SET_NAME, res.name)
    commit(UserMutationTypes.SET_AVATAR, res.avatar)
    commit(UserMutationTypes.SET_INTRODUCTION, res.introduction)
    commit(UserMutationTypes.SET_EMAIL, res.email)
    // await userInfoRequest().then((res: any) => {
    //   if (res?.code === 0) {
    //     commit(UserMutationTypes.SET_ROLES, res.data.roles)
    //     commit(UserMutationTypes.SET_NAME, res.data.name)
    //     commit(UserMutationTypes.SET_AVATAR, res.data.avatar)
    //     commit(UserMutationTypes.SET_INTRODUCTION, res.data.introduction)
    //     commit(UserMutationTypes.SET_EMAIL, res.data.email)
    //     return res
    //   } else {
    //     throw Error('Verification failed, please Login again.')
    //   }
    // })
  },

  async [UserActionTypes.ACTION_CHANGE_ROLES]({ commit }: AugmentedActionContext, role: string) {
    const token = role + '-token'
    const store = useStore()
    commit(UserMutationTypes.SET_TOKEN, token)
    setToken(token)
    await store.dispatch(UserActionTypes.ACTION_GET_USER_INFO, undefined)
    store.dispatch(PermissionActionType.ACTION_SET_ROUTES, state.roles)
    resetRouter()
    store.state.permission.dynamicRoutes.forEach((item: RouteRecordRaw) => {
      router.addRoute(item)
    })
  },

  [UserActionTypes.ACTION_LOGIN_OUT]({ commit }: AugmentedActionContext) {
    removeToken()
    commit(UserMutationTypes.SET_TOKEN, '')
    commit(UserMutationTypes.SET_ROLES, [])
    resetRouter()
  }
}
