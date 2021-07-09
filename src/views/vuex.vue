<template>
  <div class="vuex-container page-container">
    <div class="page-title">Vuex Test Page</div>
    <p>store Root is: {{ text }}</p>
    <p>store doubleCount is: {{ count }}</p>
    <p>double:{{ double }}</p>
    <el-button type="primary" @click="increment">increment</el-button>
    <el-button type="primary" @click="decrement">decrement</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'Vuex',
  setup() {
    const store = useStore()
    const text = computed(() => store.state.text)
    console.log(store)

    const count = computed(() => store.state.count.count) // state
    const double = computed(() => store.getters['count/double']) // getters
    const increment = () => store.commit('count/increment') // commit
    const decrement = () => store.dispatch('count/decrement') // dispatch
    return {
      text,
      count,
      double,
      increment,
      decrement
    }
  }
})
</script>
