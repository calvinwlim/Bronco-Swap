<template>
  <div id="navigation">
    <nav>
      <RouterLink class="link" to="/">Home</RouterLink>
      <RouterLink class="link" to="/about">About</RouterLink>
      <RouterLink class="link" to="/create">Create a Listing</RouterLink>
      <RouterLink class="link" to="/chat">Chat</RouterLink>
      <RouterLink class="link" to="/profile">View Profile</RouterLink>
      <RouterLink class="link" to="/login" v-if="!isLoggedIn">Login</RouterLink>
      <RouterLink class="link" to="/" @click="handleSignOut" v-if="isLoggedIn">Sign Out</RouterLink>
    </nav>
    <div class="search">
      <input type="text" placeholder="Search for items..." />
      <button class="searchButton">Search</button>
    </div>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import router from '../router';

const isLoggedIn = ref(false);

let auth;
onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user)
      isLoggedIn.value = true;
    else
      isLoggedIn.value = false;
  });
})

const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push("/");
  });
}
</script>

<style lang="scss" scoped>
#navigation {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 50px;
  margin-top: -4%;

  nav {
    display: flex;
    justify-content: space-evenly;
    list-style: none;
    padding: 0;
    margin: 0 20px 0 0;
  }

  .link {
      font-size: 2rem;
      padding: 2px 10px;
      cursor: pointer;

      &:hover {
        color: #7ca971;
      }
    }

  .search {
    position: relative;
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 400px;

    input {
      border: none;
      outline: none;
      width: calc(100% - 80px);
      padding: 15px 60px 15px 20px;
      margin: 0;
      border-radius: 20px;
      background-color: #efefef;
      font-family: "Segoe UI", Tahoma;
      font-size: 1rem;
    }

    i {
      position: absolute;
      right: 20px;
      top: 15px;
      font-size: 1.6rem;
      color: #aaa;
      cursor: pointer;
    }
  }

  .searchButton {
    border: 0;
      border-radius: 10%;
  }
}
</style>
