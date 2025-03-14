<script>
import Home from './Home.vue'

export default {
  name: 'App',
  components: {
    Home,
  },
}
</script>

<template>
  <div id="app">
    <Home />
  </div>
</template>

<style>
#app {
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
    'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
