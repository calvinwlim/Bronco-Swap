
<script setup>
    import NavBar from './components/NavBar.vue';
</script>

<template>
  <div id="app">
    <NavBar />
    <div class="content">
        <router-view/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.teaser {
  position: relative;
  width: 100%;
  max-width: 768px;
  height: 400px;
  margin-bottom: 40px;
  background-size: cover;
  background-position: top;
  border-radius: 20px;
  overflow: hidden;

  .teaser-content {
    position: absolute;
    left: 20px;
    bottom: 20px;
    width: 210px;
    height: 50px;
    padding: 0 0 0 20px;
    background-color: #111;
    color: #efefef;
    border-radius: 20px;
    font-size: 2rem;
    cursor: pointer;
  }

  i {
    font-size: 1.6rem;
  }
}

.infobox {
  float: left;
  width: 80px;
  height: 80px;
  padding: 10px;
  margin: 0 20px 20px 0;
  border-radius: 20px;
  border: 1px solid #ccc;

  .title {
    font-weight: bold;
  }
  .value {
    padding: 10px 0 0 0;
    font-size: 2rem;
  }
}
</style>
