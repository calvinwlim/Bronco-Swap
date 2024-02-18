
<script setup>
    import NavBar from './components/NavBar.vue';
</script>

<template>
    <NavBar class="navbar" />
    <div class="content">
        <router-view/>
    </div>
</template>

<style lang="scss" scoped>

.app {
  width: 100%;
  display: columns;
  justify-content: space-between;
}

.navbar {
  padding: auto;
  position: sticky;
}
</style>
