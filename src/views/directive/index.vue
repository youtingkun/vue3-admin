<template>
  <div class="">
    <el-button v-copy="state.copyText">复制</el-button>
    <el-button @click="handleChangeCopyText">改变需要复制的内容</el-button>
    <div style="height: 1080px"></div>
    <img />
  </div>
</template>

<script>
import { reactive, onMounted } from 'vue'
import copy from './modules/copy'

export default {
  name: '',
  components: {},
  directives: {
    copy
  },
  setup() {
    const state = reactive({
      loading: false,
      copyText: '要复制的内容',
      imagUrl:
        'https://raw.githubusercontent.com/youtingkun/image-bucket/main/images/0WlmE2K09y.jpg'
    })
    const handleChangeCopyText = () => {
      state.copyText = '改变需要复制的内容'
    }
    return {
      state,
      handleChangeCopyText
    }
  }
}
</script>
<style lang="scss" scoped></style>
