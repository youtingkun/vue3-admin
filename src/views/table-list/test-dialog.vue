<template>
  <el-dialog
    :title="dialogData.title"
    v-model="dialogData.dialogVisible"
    :close-on-click-modal="false"
    width="30%"
  >
    <el-form :model="ruleForm" ref="ruleForm" label-suffix="：">
      <el-form-item label="phone">
        {{ ruleForm.phone }}
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="dialogData.dialogVisible = false">取消</el-button>
      <el-button v-loading="dialogData.dialogBtnLoading" type="primary" @click="handleSure"
        >确定</el-button
      >
    </template>
  </el-dialog>
</template>

<script>
import { reactive, ref } from 'vue'
import useDialog from './test-use-dialog'

export default {
  name: '',
  components: {},
  props: {},
  setup() {
    const testTrue = ref(true)
    const ruleForm = reactive({
      phone: ''
    })
    const { dialogData, openDialog } = useDialog()
    const handleSure = () => {
      console.log('确定')
    }
    const childrenOpenDialog = (data) => {
      if (data) {
        ruleForm.phone = data.phone
      } else {
        ruleForm.phone = ''
      }
      openDialog(data)
    }
    return { dialogData, ruleForm, handleSure, childrenOpenDialog, testTrue }
  }
}
</script>
<style lang="scss" scoped></style>
