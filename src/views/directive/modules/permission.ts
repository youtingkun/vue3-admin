/*
 * @Date: 2021-06-07 11:52:27
 */
const ownPermission = ['user', 'order']
const permission = {
  mounted(el, binding) {
    if (permission && !ownPermission.includes(binding.value)) {
      el.parentNode && el.parentNode.removeChild(el) // 关键代码, 没有权限则删除元素
    }
  },
  updated(el, binding) {
    toolPermission(el, binding.value)
  }
}
