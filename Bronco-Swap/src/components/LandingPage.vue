<template>
  <div id="app" class="gradient-background">
    <main class="padding-content">
      <img src="../assets/second-hand.png">
      <section class="next-generation-section">
        <article class="next-generation-article">
          <h1 class="title">
            Bronco Swap: <br />
            Sustainable Solutions <br />
            for Campus Living
          </h1>
          <br />
      <br />
          <p class="next-generation-text">
            Bronco Swap is more than just an online marketplace; it's a hub for sustainable living
            within university campuses. Our platform facilitates the exchange of goods while
            prioritizing sustainability, enabling students and faculty to trade, sell, and buy items
            with a minimal environmental footprint. From textbooks to furniture to clothing, Bronco
            Swap empowers users to make eco-conscious decisions, reducing waste and fostering a
            culture of reuse and resourcefulness on campus. Join us in our mission to create a
            greener future, one swap at a time, with Bronco Swap.
          </p> 
          <button class="browse-button" @click="goToMarketplace">Browse</button>
        </article>
      </section>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
     
    </main>
  </div>
</template>

<script>

export default {
  name: 'LandingPage',
  components: {},
  methods: {
    goToMarketplace() {
      this.$router.push('/browse')
    }
  }
}
</script>

<style scoped>
html,body { height:100%; }
.gradient-background {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f8f3ec;
  background-size: 100vw 100vh;
  background-repeat:repeat;
  background-attachment: scroll;
  animation: gradient-animation 24s ease infinite;
}

@keyframes gradient-animation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.padding-content {
  padding-left: 8rem;
  font-weight: 500;
}

img {
  float: right;
  max-width: 350px;
  min-width: 200px;
  margin-right: 10%;
  margin-top: 100px;
}

/* next-generation */
.next-generation-section {
  display: flex;
  overflow: hidden;
  color: rgb(50, 50, 50);
}

.next-generation-article {
  display: flex;
  flex-direction: column;
  padding-top: 10rem;
  padding-left: 1rem;
}

h1 {
  font-size: 4rem;
  font-weight: 900;
  margin-bottom: 5rem;
}

.next-generation-text {
  margin-bottom: 2rem;
}

.browse-button {
  background-color: #862633; /* Blue color */
  color: #F8f4f9; /* Text color */
  border: none; /* Remove border */
  border-radius: 20px; /* Rounded corners */
  padding: 10px 20px; /* Padding for the button */
  font-size: 16px; /* Font size */
  cursor: pointer; /* Cursor style */
  transition: background-color 0.3s ease; /* Smooth transition */
  width: 100%; /* Set width to 100% */
  max-width: 200px; /* Limit maximum width */
  box-sizing: border-box; /* Include padding and border in width */
}

.browse-button:hover {
  background-color: #6c1b26; /* Darker blue on hover */
}

</style>

