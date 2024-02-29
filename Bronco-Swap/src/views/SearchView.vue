<template>
    <div class="search-content-mobile">
        <h1>Search for listings:</h1>
        <div class="search-container-mobile">
            <input class="search-input-mobile" type="text" v-model="searchInput" placeholder="Search for items..." />
            <button class="search-button-mobile" @click="searchProducts">Search</button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import router from '../router';

const db = getFirestore()
const listingsCollection = collection(db, 'Listings')
const q = query(listingsCollection)
const searchInput = ref('')

let searchProducts = async () => {
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
            localStorage.setItem('searchResults', JSON.stringify(searchResults)) // Store search results in local storage
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

onMounted(() => {
    if (!JSON.parse(localStorage.getItem('user')).uid) {
        router.push('/login')
    }
});
</script>

<style>
.search-content-mobile {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 400%;
    margin-top: 5rem;
}

.search-container-mobile {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60%;
    margin-top: 1rem;
}

.search-input-mobile {
    flex: 1;
    padding: 12px;
    border: 1px solid #f9f9f9;
    border-radius: 6px 0 0 6px;
    font-size: 16px;
    outline: none;
}

.search-button-mobile {
    padding: 12px 20px;
    background-color: transparent;
    color: #f9f9f9;
    background-color: #862633;
    border-radius: 0 6px 6px 0;
    cursor: pointer;
    transition: background-color 0.3s ease;
    border-top: 1px solid #f9f9f9;
    border-right: 1px solid #f9f9f9;
    border-bottom: 1px solid #f9f9f9;
    border-left: none;
}

.search-button-mobile:hover {
    border: 1px solid rgb(168, 168, 168);
    color: #862633;
    background-color: white;
}
</style>