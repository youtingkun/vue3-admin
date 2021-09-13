import { reactive } from 'vue'
// eslint-disable-next-line
function useDialog(): any {
  const dialogData = reactive({
    dialogVisible: false,
    dialogBtnLoading: false,
    title: '123' // 新增或编辑
  })
  const openDialog = (data: any) => {
    dialogData.dialogVisible = true
    data ? (dialogData.title = '编辑') : (dialogData.title = '新增')
  }

  return { dialogData, openDialog }
}

export default useDialog
