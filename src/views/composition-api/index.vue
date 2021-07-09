<template>
  <div>
    {{ $t('common_create') }}
    <div>{{ readersNumber }}</div>
    {{ state.count }}
    <button @click="add">增加</button>
    <div>{{ doubleCount }}</div>
    <el-button>123</el-button>
    <div><TestButton @clickOne="outClick"></TestButton></div>
  </div>
</template>

<script lang="ts">
import {
  reactive,
  ref,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onErrorCaptured,
  onRenderTracked,
  onRenderTriggered,
  computed,
  watch,
  watchEffect
} from 'vue'
import TestButton from './test-button.vue'

export default {
  components: { TestButton },
  setup(props: any, context: any) {
    console.log(props)
    console.log(context)
    onBeforeMount(() => {
      console.log('onBeforeMount')
    })
    onMounted(() => {
      console.log('onMounted')
    })
    onBeforeUpdate(() => {
      console.log('onBeforeUpdate')
    })
    onUpdated(() => {
      console.log('onUpdate')
    })
    onBeforeUnmount(() => {
      console.log('onBeforeUnmount')
    })
    onUnmounted(() => {
      console.log('onUnmount')
    })
    onErrorCaptured(() => {
      console.log('onErrorCaptured')
    })
    onRenderTracked(() => {
      console.log('onRenderTracked')
    })
    onRenderTriggered(() => {
      console.log('onRenderTriggered')
    })
    // 这里返回的readersNumber是一个对象，具有指向内部值的单个属性.value。ref声明的需要用.value访问。
    // 在html里访问时不用添加.value,vue3会自动展开为内部值
    const readersNumber = ref(0)
    console.log('readersNumber', readersNumber.value)

    // reactive声明的需要用可以直接通过state.count访问。
    const state = reactive({ count: 0 })
    console.log('state', state.count)

    const add = function () {
      state.count += 1
    }
    // computed
    const doubleCount = computed(() => state.count * 2)
    // 适用于需要知道oldVal的情况
    watch(
      () => state.count,
      (val, oldVal) => {
        console.log('watch count change', val, oldVal)
      }
    )
    // 适用于不需要知道oldVal的情况
    watchEffect(() => {
      console.log('watchEffect count change', state.count)
    })
    const outClick = function () {
      console.log('外部按钮事件')
    }

    return { state, add, readersNumber, doubleCount, outClick }
  }
}
</script>

<style scoped></style>
