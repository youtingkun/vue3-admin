import { createStore, useStore as baseUseStore } from 'vuex'
import count from './modules/count'
import app from './modules/app'
import settings from './modules/settings'
import tagsView from './modules/tagsView'
import permission from './modules/permission'
// Create a new store instance.
export default createStore({
  state: {
    text: 'This is Vuex Root.state.text'
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    count,
    app,
    settings,
    tagsView,
    permission
  }
})
