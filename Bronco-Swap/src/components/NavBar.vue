<template>
  <div id="navigation">
    <div class="navbar">
      <img class="logo">
      <RouterLink class="link" to="/">Home</RouterLink>
      <RouterLink class="link" to="/create">Create a Listing</RouterLink>
      <RouterLink class="link" to="/profile">View Profile</RouterLink>
      <RouterLink class="link" to="/login" v-if="!isLoggedIn">Login</RouterLink>
      <RouterLink class="link" to="/" @click="handleSignOut" v-if="isLoggedIn">Sign Out</RouterLink>
      <div class="search">
        <input type="text" placeholder="Search for items..." />
        <button class="searchButton">Search</button>
      </div>
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
  .navbar{
    width: 100%;
    margin: auto;
    padding: 35px 25px 35px 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    float: right;
  }

.logo{
    width: 180px;
    cursor: pointer;
}

.navbar link{
    list-style: none;
    display: inline-block;
    margin: 0 20px;
    position: relative;
}

.navbar link{
    text-decoration: none;
    color: #fff;
    text-transform: uppercase;
}

.navbar link::after{
    content:  '';
    height: 3px;
    width: 0;
    background: #009688;
    position: absolute;
    left: 0;
    bottom: -10px;
    transition: 0.5s;
}

.navbar link:hover::after{
    width: 100%;
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

</style>
