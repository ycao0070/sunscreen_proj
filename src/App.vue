<script>
import HomeView from './HomeView.vue'

export default {
  name: 'App',
  components: {
    HomeView,
  },
}
</script>

<template>
  <div id="app">
    <HomeView />
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
