<template>
  <div id="app" class="gradient-background">
    <main class="padding-content">
      <section class="next-generation-section">
        <article class="next-generation-article">
          <div class="headers">
            <h1 class="title">
              Bronco Swap: <br />
              Sustainable Solutions <br />
              for Campus Living
            </h1>
            <div class="header-image">
              <img src="../assets/second-hand.png">
            </div>
          </div>
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
html,
body {
  height: 100%;
}

.gradient-background {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f8f3ec;
  background-size: 100vw 100vh;
  background-repeat: repeat;
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

.headers {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
}

.header-image {
  display: flex;
  justify-content: center;
  align-items: center;
}

.padding-content {
  display: flex;
  justify-content: center;
  font-weight: 500;
}

img {
  width: 80%;
}

.next-generation-section {
  display: flex;
  overflow: hidden;
  color: rgb(50, 50, 50);
}

.next-generation-article {
  display: flex;
  flex-direction: column;
  padding: 0 1rem 1rem;
}

h1 {
  font-size: 4rem;
  font-weight: 900;
  margin-top: 5rem;
}

.next-generation-text {
  margin-bottom: 2rem;
}

.browse-button {
  background-color: #862633;
  color: #F8f4f9;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  margin-bottom: 30px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
  max-width: 200px;
  box-sizing: border-box;
}

.browse-button:hover {
  background-color: #6c1b26;
}

@media (max-width: 790px) {
  .headers {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0;
    font-size: 3rem;
    padding-bottom: 2rem;
  }

  .title {
    font-size: 3rem;
  }
}
</style>

