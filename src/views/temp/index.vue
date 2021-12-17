<template>
  <div class="">{{ title }}</div>
</template>

<script lang="ts">
import { reactive, toRefs, onMounted } from 'vue'
export default {
  name: '',
  components: {},
  setup() {
    const state = reactive({
      title: 'hello word'
    })
    return {
      ...state
    }
  }
}
</script>
<style lang="scss" scoped></style>
