<template>
  <div class="">
    角色权限
    <el-table :data="tableList">
      <el-table-column prop="name" label="名字" />
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button @click="handleEdit(row)"> 编辑 </el-button>
        </template>
      </el-table-column>
    </el-table>
    <Dialog ref="dialog" />
  </div>
</template>

<script>
import Dialog from './dialog'

export default {
  name: '',
  components: { Dialog },
  props: {},
  data() {
    return {
      tableList: [],
      username: ''
    }
  },
  computed: {},
  watch: {},
  methods: {
    getRoleList() {},
    handleEdit(row) {
      this.$refs.dialog.openDialog(row)
    }
  },
  created() {},
  mounted() {
    this.getRoleList()
  },
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeUnmount() {},
  unmounted() {},
  activated() {}
}
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
