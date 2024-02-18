<template>
  <div class="theNavbar">
    <div class="links">
      <RouterLink class="link" to="/">Home</RouterLink>
      <RouterLink class="link" :to="(!isLoggedIn) ? '/login' : '/create'">Create a Listing</RouterLink>
      <RouterLink class="link" to="/chat">Chat</RouterLink>
      <RouterLink class="link" to="/login" v-if="!isLoggedIn">Login</RouterLink>
    </div>
    <div class="search-container">
      <input class="search-input" type="text" v-model="searchInput" placeholder="Search for items..." />
      <button class="search-button" @click="searchProducts">Search</button>
    </div>
    <RouterLink class="link" to="/login" v-if="!isLoggedIn">Login</RouterLink>
    <div class="dropdown" v-if="isLoggedIn">
        <span class="profile-link">Profile</span>
        <div class="dropdown-content">
          <RouterLink class="link" to="/profile">View Profile</RouterLink>
          <RouterLink class="link" to="/" @click="handleSignOut" v-if="isLoggedIn">Sign Out</RouterLink>
        </div>
      </div>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import router from '../router';

const db = getFirestore();
const listingsCollection = collection(db, "Listings");
const q = query(listingsCollection);
const searchInput = ref('');
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

let searchProducts = async () => {
  const searchTerm = searchInput.value.trim();
  if (searchTerm !== '') {
    localStorage.setItem('lastSearch', searchTerm);
    const searchResults = [];
    const querySnapshot = await getDocs(query(listingsCollection, where('title', '==', searchTerm)));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data());
      searchResults.push(doc.data());
    });
    if (searchResults.length > 0) {
      localStorage.setItem('searchResults', JSON.stringify(searchResults)); // Store search results in local storage
      // Redirect to /browse and pass searchResults as a route parameter
      await router.push('/browse');
      window.location.reload();
    } else {
      localStorage.setItem('searchResults', null);
      await router.push('/browse');
      window.location.reload();
      console.log('No search results found');
    }
  } else {
    console.log('Search input is blank');
  }
};

const handleSignOut = () => {
  localStorage.setItem("user", null)
  signOut(auth).then(() => {
    router.push("/");
  });
}
</script>

<style lang="scss" scoped>
  .theNavbar {
    width: 100%;
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: transparent;
  }

  .links {
    width: 30%;
    display: flex;
    justify-content: space-evenly;
  }

  .link {
    color: #333;
    text-decoration: none;
    transition: border-bottom 0.3s ease;
  }

  .link:hover {
    border-bottom: 2px solid blue;
  }

  .search-container {
    display: flex;
    align-items: center;
  }
  
  .search-input {
    flex: 1;
    padding: 12px;
    border: 1px solid #ced4da;
    border-radius: 6px 0 0 6px;
    font-size: 16px;
    outline: none;
  }
  
  .search-button {
    padding: 12px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 0 6px 6px 0;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .search-button:hover {
    background-color: #0056b3;
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
    z-index: 99;
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
    padding: 10px;
    display: block;
    text-decoration: none;
    color: #333;
  }

  .profile-link:hover {
    background-color: #f0f0f0;
  }
  
</style>
