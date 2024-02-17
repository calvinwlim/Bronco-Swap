<template>
    <div class="tile">
        <img src="../assets/test-image.jpeg" class="image"/>
        <h1 class="title">{{ itemTitle }}</h1>
        <h2 class="price-text">{{ price }}</h2>
        <p class="info-text">Posted By: {{ postedBy }}</p>
        <p class="info-text">Contact: {{ contactInfo }}</p>
    </div>
</template>

<script setup>
    import { defineProps } from 'vue';
    const props = defineProps(['image', 'itemTitle', 'price', 'postedBy', 'contactInfo']);
</script>

<style scoped>
    .tile {
        background-color: white;
        border-radius: 2%;
        width: 15rem;
    }
    .title {
        color: black;
    }
    .price-text {
        color: black;
    }

    .info-text {
        color: black;
    }

    .image {

    }
</style>

