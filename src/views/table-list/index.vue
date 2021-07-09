<template>
  <div>
    <el-form class="mb10" inline label-suffix="：">
      <el-form-item label="phone">
        <el-input v-model.trim="searchForm.phone" clearable></el-input>
      </el-form-item>
      <el-form-item label="time">
        <el-date-picker
          v-model="searchForm.time"
          type="daterange"
          range-separator="-"
          value-format="yyyy-MM-dd HH:mm:ss"
          :default-time="['00:00:00', '23:59:59']"
        >
        </el-date-picker>
      </el-form-item>
      <el-button type="search" @click="mySearch">搜索</el-button>
      <el-button @click="handleReset">重置</el-button>
    </el-form>
    <el-button @click="parentOpenDialogAdd">添加</el-button>
    <el-button @click="parentOpenDialogEdit({ phone: 123 })">编辑</el-button>
    <el-table
      :data="table.tableList"
      border
      header-row-class-name="table-header"
      v-loading="table.listLoading"
    >
      <el-table-column label="phone" prop="phone"></el-table-column>
    </el-table>
    <el-pagination
      v-if="table.tableList.length > 0"
      :total="table.page.total"
      :page="table.page.current"
      :limit="table.page.size"
      @pagination="getTableList"
    ></el-pagination>
    <testDialog ref="RefChilde"></testDialog>
  </div>
</template>

<script lang="ts">
import { reactive, ref } from 'vue'
import useTableList from './table-list-use'
import testDialog from './test-dialog.vue'

export default {
  components: { testDialog },
  setup(props: any, context: any) {
    const searchForm: any = reactive({
      phone: '',
      time: []
    })
    const RefChilde = ref()
    const { table, getTableList, handleSearch, handleReset } = useTableList(searchForm, searchForm)
    // 先执行一次
    getTableList()
    // 自定义处理收缩参数
    const mySearch = () => {
      searchForm.start = searchForm.time?.[0]
      searchForm.end = searchForm.time?.[1]
      handleSearch()
    }
    const parentOpenDialogAdd = function () {
      RefChilde.value.childrenOpenDialog()
    }
    const parentOpenDialogEdit = (data) => {
      RefChilde.value.childrenOpenDialog(data)
    }
    return {
      table,
      getTableList,
      handleSearch,
      searchForm,
      handleReset,
      mySearch,
      RefChilde,
      parentOpenDialogAdd,
      parentOpenDialogEdit
    }
  }
}
</script>
<style lang="scss" scoped></style>
