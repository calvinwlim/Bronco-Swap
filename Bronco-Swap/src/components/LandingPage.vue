<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="heading">
    <h1>
      Buy, Sell, Trade
      Within Your Campus
      Community
    </h1>
    <div class="blurry-gradient-1"></div>
    <div class="blurry-gradient-2"></div>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 900;
  font-size: 3rem;
  position: relative;
  top: -10px;
}

.blurry-gradient-1 {
  position: fixed;
  top: 100px;
  left: 1000px;
  transform: translate(-50%, 0%);
  width: 300px;
  height: 500px;
	border-radius: 50% 22% 40% 80%;  
	filter: blur(100px);
  background: radial-gradient(circle at 50% 50%, #FAEF5D, #FF004D);
  opacity: 0.2;
}

.blurry-gradient-2 {
  position: fixed;
  top: -700px;
  left: 250px;
  transform: translate(-50%, 0%);
  width: 1200px;
  height: 900px;
	border-radius: 50% 22% 40% 80%;  
	filter: blur(100px);
  background: radial-gradient(circle at 50% 50%, #FAEF5D, #FF004D);
  opacity: 0.2;
}

h3 {
  font-size: 1.2rem;
}

.heading h1,
.heading h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .heading h1,
  .heading h3 {
    text-align: left;
  }
}
</style>
