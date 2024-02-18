
<script setup>
    import NavBar from './components/NavBar.vue';
</script>

<template>
  <div id="app">
    <div class = "navbar">
      <NavBar />
    </div>
    <div class="content">
        <router-view/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navbar {
  width: 100%;
}
</style>
