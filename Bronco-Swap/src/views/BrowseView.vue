<template>
    <div class="galleryitems">
      <div v-for="item in searchResults" :key="item.uid" class="item">
        <div class="itemcontent">
          <div class="overlay">
            <a href="" class="zoomlink"><i class="fa-solid fa-plus"></i></a>
            <div class="text">
              <h3>{{ item.title }}</h3>
              <a href="#" class="livelink">{{ item.price }} <i class="fa-solid fa-angle-right"></i></a>
            </div>
          </div>
          <img :src="item.image" alt="" class="product-image" />
        </div>
      </div>
    </div>
  </template>

<script setup>
import { ref, onMounted } from 'vue';

const searchResults = ref([]);

onMounted(() => {
  // Retrieve search results from local storage
  const storedSearchResults = localStorage.getItem('searchResults');
  if (storedSearchResults) {
    searchResults.value = JSON.parse(storedSearchResults);
  }
});
</script>

<style scoped>
/* Add CSS styles to standardize the size of the photos and product listings */
.item {
  margin-bottom: 20px; /* Add margin between product items */
}

.product-image {
  width: 100%; /* Set image width to 100% of its container */
  height: auto; /* Maintain aspect ratio */
}

.itemcontent {
  position: relative; /* Positioning context for overlay */
}

.overlay {
  position: absolute; /* Position overlay relative to item content */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0; /* Initially hidden */
  transition: opacity 0.3s ease; /* Smooth transition */
}

.item:hover .overlay {
  opacity: 1; /* Show overlay on hover */
}

.text {
  text-align: center;
  color: #fff;
  padding: 10px;
}
</style>