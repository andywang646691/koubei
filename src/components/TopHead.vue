<template lang="pug">
  header
    button.btn-sidebar
      img(src="@/assets/icons/bars.png")
    span  灵犀数字营销
</template>

<script>
export default {
  name: 'top-head'
}
</script>

<style lang="scss" scoped>
  header {
    display: flex;
    padding: get-vw(20px) get-vw(30px);
    color: $gray;
    border-bottom: 1px solid #eee;
  }
  button.btn-sidebar {
    background-color: $green;
    width: 25px;
    height: 22px;
    border-radius: 3px;
    text-align: center;
    margin-right: get-vw(35px);
    img {
      vertical-align: middle;
      width: 15px;
    }
  }
</style>
