import { reactive } from 'vue'

// 接口和搜索参数不同，需要单独传
function useTableList(apiFunction, searchForm) {
  const table = reactive({
    listLoading: false,
    tableList: <any>[],
    page: {
      current: 1,
      size: 10,
      total: 0
    }
  })
  // 页码改变时
  const getTableList = () => {
    const params = {
      param: { ...searchForm },
      pageNum: table.page.current,
      pageSize: table.page.size
    }
    table.listLoading = true
    table.tableList = [{ phone: 456 }]
    table.page.total = 10
    table.listLoading = false
  }
  // 点击搜索时
  const handleSearch = () => {
    table.page.current = 1
    getTableList()
  }
  // 点击重置时
  const handleReset = () => {
    Object.keys(searchForm).forEach((key) => {
      searchForm[key] = ''
    })
    handleSearch()
  }
  return { table, getTableList, handleSearch, handleReset }
}

export default useTableList
