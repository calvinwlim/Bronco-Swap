<template>
  <div class="gradient-background">
    <main class="padding-content">
      <section class="next-generation-section">
        <article class="next-generation-article">
          <h1>
            Bronco Swap - <br />
            Sustainable Solutions <br />
            for Campus Living
          </h1>
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
        <div class="next-generation-phones">
          <img src="../assets/images/image-mockups.png" class="next-generation-image" />
        </div>
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
      this.$router.push('/marketplace')
    }
  }
}
</script>

<style scoped>
.gradient-background {
  background: linear-gradient(300deg, white, #f6f1f1, #afd3e2);
  background-size: 180% 180%;
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

/* next-generation */
.next-generation-section {
  display: flex;
  overflow: hidden;
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
  margin-bottom: 1rem;
}

.next-generation-text {
  margin-bottom: 1rem;
}

.next-generation-phones {
  width: 65%;
  background-image: url(../assets/images/bg-intro-desktop.svg);
  background-size: cover;
  background-repeat: no-repeat;
  margin-top: -8rem;
  padding-left: 14rem;
}

.browse-button {
  background-color: #007bff; /* Blue color */
  color: white; /* Text color */
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
  background-color: #0056b3; /* Darker blue on hover */
}
</style>

