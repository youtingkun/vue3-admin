const defaultState = {
  count: 1
}

// Create a new store instance.
export default {
  namespaced: true,
  state() {
    return defaultState
  },
  mutations: {
    increment(state: typeof defaultState) {
      console.log('commit,increment')
      state.count += 1
    },
    decrement(state: typeof defaultState) {
      console.log('commit,decrement')
      state.count -= 1
    }
  },
  actions: {
    increment(context: any) {
      console.log('action,increment')

      context.commit('increment')
    },
    decrement(context: any) {
      console.log('action,decrement')

      context.commit('decrement')
    }
  },
  getters: {
    double(state: typeof defaultState) {
      return 2 * state.count
    }
  }
}
