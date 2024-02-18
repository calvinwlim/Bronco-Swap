<template>
  <div class="theNavbar">
    <div class="links">
      <RouterLink class="link" to="/">Home</RouterLink>
      <RouterLink class="link" :to="!isLoggedIn ? '/login' : '/create'"
        >Create a Listing</RouterLink
      >
      <RouterLink class="link" :to="!isLoggedIn ? '/login' : '/chat'">Chat</RouterLink>
      <RouterLink class="link" to="/browse" @click="browseTab">Browse</RouterLink>
    </div>
    <div class="search-container">
      <input
        class="search-input"
        type="text"
        v-model="searchInput"
        placeholder="Search for items..."
      />
      <button class="search-button" @click="searchProducts">Search</button>
    </div>
    <RouterLink class="link" to="/login" v-if="!isLoggedIn">Login</RouterLink>
    <div class="dropdown" v-if="isLoggedIn" @click="toggleDropdown">
      <img class="pfp" src="../assets/pfp4.png" />
      <span class="profile-link"
        >Profile
        <img v-if="!isDropdownVisible" class="arrow" src="../assets/icons-arrow-down.png" />
        <img v-if="isDropdownVisible" class="arrow" src="../assets/icons-arrow-up.png" />
      </span>
      <div class="dropdown-content" v-show="isDropdownVisible">
        <RouterLink class="link drops" to="/profile">View Profile</RouterLink>
        <RouterLink class="link drops" to="/" @click="handleSignOut">Sign Out</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { onMounted, ref } from 'vue'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore'
import router from '../router'

const db = getFirestore()
const listingsCollection = collection(db, 'Listings')
const q = query(listingsCollection)
const searchInput = ref('')
const isLoggedIn = ref(false)
const isDropdownVisible = ref(false)

const toggleDropdown = () => {
  isDropdownVisible.value = !isDropdownVisible.value
}

let auth
onMounted(() => {
  auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (user) isLoggedIn.value = true
    else isLoggedIn.value = false
  })
})

let searchProducts = async () => {
  const searchTerm = searchInput.value.trim()
  if (searchTerm !== '') {
    localStorage.setItem('lastSearch', searchTerm);
    const searchResults = [];
    let querySnapshot = await getDocs(query(listingsCollection));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data());
      const userid = JSON.parse(localStorage.getItem("user")).uid;
      if (doc.data().title.toLowerCase().includes(searchTerm.toLowerCase()) && doc.data().uid != userid)
        searchResults.push(doc.data());
    });
    if (searchResults.length > 0) {
      localStorage.setItem('searchResults', JSON.stringify(searchResults)) // Store search results in local storage
      // Redirect to /browse and pass searchResults as a route parameter
      await router.push('/browse')
      window.location.reload()
    } else {
      localStorage.setItem('searchResults', null)
      await router.push('/browse')
      window.location.reload()
      console.log('No search results found')
    }
  } else {
    console.log('Search input is blank')
  }
}

const handleSignOut = () => {
  localStorage.setItem('user', null)
  signOut(auth).then(() => {
    router.push('/')
    window.location.reload()
  })
}

const browseTab = async () => {
  localStorage.setItem('lastSearch', "");
  let uid = JSON.parse(localStorage.getItem("user")).uid;
  if (!uid) {
    uid = "@#$%";
  }
  console.log(uid);
  const searchResults = [];
  const querySnapshot = await getDocs(query(listingsCollection, where('uid', '!=', uid)));
  querySnapshot.forEach((doc) => {
      searchResults.push(doc.data());
    });
    console.log("before browse")
  console.log(searchResults)
  localStorage.setItem('searchResults', JSON.stringify(searchResults)); // Store search results in local storage
  await router.push('/browse');
  window.location.reload();
};

</script>

<style lang="scss" scoped>
.theNavbar {
  position: relative;
  z-index: 998;
  width: 100%;
  margin: auto;
  padding: 15px 35px 35px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  background: #862633;
}
.links {
  width: 30%;
  display: flex;
  justify-content: space-evenly;
  color: #f9f9f9;
  text-decoration-color: #f9f9f9;
}

.link {
  color: #f9f9f9;
}

.link:hover {
  border-bottom: 2px solid #f9f9f9;
}

.search {
  width: 30%;
  display: flex;
  justify-content: space-evenly;
}

.search-input {
  border: 2px #f9f9f9;
  background-color: transparent;
  height: 30%;
  border-radius: 4%;
  color: #f9f9f9;
}
.dropdown {
  position: relative;
  display: inline-block;
  align-items: center;
  z-index: 999;
  color: #f9f9f9;
}

.dropdown-content {
  position: absolute;
  background-color: #862633;
  padding: 1rem;
  border-radius: 2%;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  top: calc(100% - 5px); // Adjust the top position
  right: 0; // Align with the right edge of the parent
  display: flex;
  flex-direction: column;
  width: 100%;
}

.arrow {
  width: 16px;
  top: -2px;
  color: #f9f9f9;
}

.pfp {
  width: 55px;
  padding: 5px;
}

.profile-link {
  cursor: pointer;
}

.drops {
  margin: 20 20;
}

.search-container {
  display: flex;
  align-items: center;
  width: 40%;
}

.search-input {
  flex: 1;
  padding: 12px;
  border: 1px solid #f9f9f9;
  border-radius: 6px 0 0 6px;
  font-size: 16px;
  outline: none;
}

.search-button {
  padding: 12px 20px;
  background-color: transparent;
  color: #f9f9f9;
  border-radius: 0 6px 6px 0;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border: 2px #f9f9f9;

}

.search-button:hover {
  background-color: #862633;
}

.profile-link:hover {
  border-bottom: 2px solid #f9f9f9;
}
</style>
