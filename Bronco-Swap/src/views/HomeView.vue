<script setup>
import LandingPage from '../components/LandingPage.vue';
</script>

<template>
  <main>
    <LandingPage/>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/login" v-if="!isLoggedIn">Login</RouterLink>
      <RouterLink to="/" @click="handleSignOut" v-if="isLoggedIn">Sign Out</RouterLink>
    </nav>
  </main>
</template>
