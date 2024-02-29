<template>
  <div class="theNavbar">
    <div class="links">
      <RouterLink class="link" to="/">Home</RouterLink>
      <RouterLink class="link" :to="!isLoggedIn ? '/login' : '/create'">Create a Listing</RouterLink>
      <!--<<RouterLink class="link" :to="!isLoggedIn ? '/login' : '/chat'">Chat</RouterLink>-->
      <RouterLink class="link" :to="!isLoggedIn ? '/login' : '/browse'" @click="browseTab">Browse</RouterLink>
    </div>
    <div class="search-container">
      <input class="search-input" type="text" v-model="searchInput" placeholder="Search for items..." />
      <button class="search-button" @click="searchProducts">Search</button>
    </div>

    <div class="mobile-menu">
      <img class="hamburger" v-if="!isMobileMenuVisible" src='../assets/mobile-menu-icon.png' @click="toggleMobileMenu" />
      <img class="hamburger" v-if="isMobileMenuVisible" src='../assets/x-icon.png' @click="toggleMobileMenu" />
      <div class="mobile-menu-content" v-show="isMobileMenuVisible">
        <RouterLink class="link drop" to="/" @click="isMobileMenuVisible = false">Home</RouterLink>
        <RouterLink class="link drop" :to="!isLoggedIn ? '/login' : '/create'" @click="isMobileMenuVisible = false">Create
          a Listing</RouterLink>
        <!--<RouterLink class="link drop" :to="!isLoggedIn ? '/login' : '/chat'">Chat</RouterLink>-->
        <RouterLink class="link drop" :to="!isLoggedIn ? '/login' : '/browse'" @click="browseTab">Browse</RouterLink>
      </div>
      <img class="mobile-search" src="../assets/search-icon.png" @click="router.push('/search')" />
    </div>

    <RouterLink class="link" to="/login" v-if="!isLoggedIn">Login</RouterLink>
    <div class="dropdown" v-if="isLoggedIn" @click="toggleDropdown">
      <img class="pfp" referrerpolicy="no-referrer" :src="userPhoto" />
      <span class="profile-link">Profile
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
import { onMounted, ref, watch } from 'vue'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore'
import router from '../router'

const db = getFirestore()
const listingsCollection = collection(db, 'Listings')
const q = query(listingsCollection)
const searchInput = ref('')
const isLoggedIn = ref(false)
const isDropdownVisible = ref(false)
const isMobileMenuVisible = ref(false)
let userPhoto = '../assets/pfp4.png'

const toggleDropdown = () => {
  isDropdownVisible.value = !isDropdownVisible.value
}

const toggleMobileMenu = () => {
  isMobileMenuVisible.value = !isMobileMenuVisible.value;
}

let auth
onMounted(async () => {
  auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true
      userPhoto = user.photoURL
    }
    else {
      isLoggedIn.value = false
      localStorage.setItem('user', JSON.stringify({
        uid: null
      }))
    }
  })
})

watch(isLoggedIn, async (newValue) => {
  if (newValue) {
    const uid = JSON.parse(localStorage.getItem("user")).uid;
    const allResults = [];

    const querySnapshot = await getDocs(query(listingsCollection, where('uid', '!=', uid)));
    querySnapshot.forEach((doc) => {
      allResults.push(doc.data());
    });
    localStorage.setItem('allResults', JSON.stringify(allResults));
  } else {

  }
})

let searchProducts = async () => {
  if (isLoggedIn) {
    const searchTerm = searchInput.value.trim()
    if (searchTerm !== '') {
      localStorage.setItem('lastSearch', searchTerm);
      const searchResults = [];
      let querySnapshot = await getDocs(query(listingsCollection));
      querySnapshot.forEach((doc) => {

        const userid = JSON.parse(localStorage.getItem("user")).uid;
        if (doc.data().title.toLowerCase().includes(searchTerm.toLowerCase()) && doc.data().uid != userid)
          searchResults.push(doc.data());
      });
      if (searchResults.length > 0) {
        localStorage.setItem('searchResults', JSON.stringify(searchResults))
        // Redirect to /browse and pass searchResults as a route parameter
        await router.push('/browse')
        window.location.reload()
      } else {
        localStorage.setItem('searchResults', null)
        await router.push('/browse')
        window.location.reload()
      }
    }
  }
}

const handleSignOut = () => {
  localStorage.setItem('user', JSON.stringify({
    uid: null
  }))
  signOut(auth).then(() => {
    router.push('/')
    window.location.reload()
  })
}

const browseTab = async () => {
  if (isLoggedIn.value) {
    isMobileMenuVisible.value = false;
    localStorage.setItem('lastSearch', "");
    let uid = "XYZ"
    if (JSON.parse(localStorage.getItem("user"))) {
      uid = JSON.parse(localStorage.getItem("user")).uid;
    }

    const searchResults = [];
    const querySnapshot = await getDocs(query(listingsCollection, where('uid', '!=', uid)));
    querySnapshot.forEach((doc) => {
      searchResults.push(doc.data());
    });
    localStorage.setItem('searchResults', JSON.stringify(searchResults)); // Store search results in local storage
    await router.push('/browse');
  }
};

</script>

<style lang="scss" scoped>
.theNavbar {
  z-index: 998;
  width: 100%;
  padding: 0 35px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  background: #862633;
}

.links {
  width: 40%;
  display: flex;
  justify-content: space-evenly;
  color: #f9f9f9;
  text-decoration-color: #f9f9f9;
}

.link {
  color: #f9f9f9;
  padding: 0 0.25rem;
  white-space: nowrap;
  overflow: hidden;
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
  background-color: white;
  height: 30%;
  border-radius: 4%;
  color: black;
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
  background-color: #811e2d;
  padding: 1rem;
  border-radius: 2%;
  border: 1px solid white;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  top: calc(100% - 5px);
  right: 0;
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
  border-radius: 50%;
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
  border-top: 1px solid #f9f9f9;
  border-right: 1px solid #f9f9f9;
  border-bottom: 1px solid #f9f9f9;
  border-left: none;
}

.search-button:hover {
  color: #862633;
  background-color: white;
}

.profile-link:hover {
  border-bottom: 2px solid #f9f9f9;
}

.mobile-menu {
  display: none;
}

@media (max-width: 790px) {

  .theNavbar {
    padding-left: 2px;
    padding-right: 15px;
  }

  .links,
  .search-container {
    display: none;
  }

  .mobile-menu {
    display: flex;
  }

  .mobile-menu-content {
    position: absolute;
    background-color: #811e2d;
    padding: 1rem;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    top: calc(100% - 5px); // Adjust the top position
    right: 0; // Align with the right edge of the parent
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-content: center;
    width: 100%;
    height: 300%;
  }

  .drop {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    text-align: center;
    height: 100%;
  }

  .drop:hover {
    border-bottom: none;
    background-color: white;
    color: #811e2d;
    transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
  }

  .hamburger {
    margin: auto 1rem;
    height: 25px;
    width: 25px;
  }

  .hamburger:hover {
    cursor: pointer;
  }

  .mobile-search:hover {
    cursor: pointer;
  }

}
</style>
