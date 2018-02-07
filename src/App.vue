<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    window.ap.setNavigationBar({
      backgroundColor: '#1ab394'
    })
  }
}
</script>

<style lang="scss">
  @import "./styles/common.scss";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
