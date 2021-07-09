<template>
  <button @click="handleClick">{{ text }}</button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '按钮名字'
    }
  },
  setup(props, ctx) {
    // methods
    const handleClick = (evt) => {
      console.log('按钮内部事件')
      ctx.emit('clickOne', evt)
    }
    return { handleClick }
  }
}
</script>

<style></style>
