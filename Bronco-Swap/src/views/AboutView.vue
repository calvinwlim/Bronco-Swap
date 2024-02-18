<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
  <div v-if="user">
    <img :src="user.photoURL" alt="Profile Picture" width="100" height="100">
    <div>Name: {{ user.displayName }}</div>
    <div>Email: {{ user.email }}</div>
  </div>
  
</template>

<script setup>
let user = JSON.parse(localStorage.getItem("user"));

</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
