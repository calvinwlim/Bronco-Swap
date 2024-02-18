<template>
  <div class="theNavbar">
    <div class="links">
      <RouterLink class="link" to="/">Home</RouterLink>
      <RouterLink class="link" :to="(isLoggedIn) ? '/login' : '/create'">Create a Listing</RouterLink>
      <RouterLink class="link" to="/chat">Chat</RouterLink>
    </div>
    <div class="search">
      <input class="searchbar" type="text" placeholder="Search for items..." />
      <button class="searchButton">Search</button>
    </div>
    <RouterLink class="link" to="/login" v-if="!isLoggedIn">Login</RouterLink>
    <div class="dropdown" v-if="isLoggedIn">
        <span class="profile-link">Profile</span>
        <div class="dropdown-content">
          <RouterLink class="link" to="/profile">View Profile</RouterLink>
          <RouterLink  class="link" @click="handleSignOut" to="/">Logout</RouterLink>
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
  localStorage.setItem("user", null)
  signOut(auth).then(() => {
    router.push("/");
  });
}


</script>

<style lang="scss" scoped>
  .theNavbar{
    width: 100%;
    margin: auto;
    padding: 35px 25px 35px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .links {
    width: 30%;
    display: flex;
    justify-content: space-evenly;
  }

  .link:hover{
    border-bottom: 2px solid blue;

  }

.search {
  width: 30%;
  display: flex;
  justify-content: space-evenly;
}
.searchbar {
  height: 20%;
}

.searchButton {
  width: 5rem;
  font-size: small;
  text-align: center;
  border-radius: 5%;
  border: none;
}

.searchButton:hover {
  background-color: rgb(118, 117, 117);
  color: white;
}

.dropdown {
    position: relative;
    display: inline-block;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    top: 100%; // Adjust the top position
  right: 0; // Align with the right edge of the parent
  }

  .dropdown:hover .dropdown-content {
    display: flex;
    flex-direction: column;
    padding: auto;
  }

  .profile-link {
    cursor: pointer;
  }
</style>
