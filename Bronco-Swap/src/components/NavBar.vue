<template>
  <div id="navigation">
    <div class="navbar">
      <img class="logo">
      <RouterLink class="link" to="/">Home</RouterLink>
      <RouterLink class="link" to="/create">Create a Listing</RouterLink>
      <RouterLink class="link" to="/chat">Chat</RouterLink>
      <RouterLink class="link" to="/profile">View Profile</RouterLink>
      <RouterLink class="link" to="/login" v-if="!isLoggedIn">Login</RouterLink>
      <RouterLink class="link" to="/" @click="handleSignOut" v-if="isLoggedIn">Sign Out</RouterLink>
      <div class="search">
        <input type="text" v-model="searchInput" placeholder="Search for items..." />
        <button class="searchButton" @click="searchProducts">Search</button>
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
      router.push('/browse');
      window.location.reload();
    } else {
      console.log('No search results found');
    }
  } else {
    console.log('Search input is blank');
  }
};

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

  .search-container {
    display: flex;
    align-items: center;
  }
  
  .search-input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px 0 0 5px;
  }
  
  .search-button {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 0 5px 5px 0;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .search-button:hover {
    background-color: #0056b3;
  }

</style>
