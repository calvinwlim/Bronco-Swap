<template>
  <div v-if="user">
    <img :src="user.photoURL" alt="Profile Picture" width="100" height="100">
    <div>Name: {{ user.displayName }}</div>
    <div>Email: {{ user.email }}</div>
  </div>
  <div v-else>
    <button class="google-button" @click="signInWithGoogle">
      <span class="google-icon">
        <img src="https://www.vectorlogo.zone/logos/google/google-icon.svg" alt="Google Icon">
      </span>
      Sign in with Google
    </button>
  </div>
</template>

<script>
// import { ref } from "vue";
import { useRouter } from "vue-router";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default {
  name: 'UserProfile',
  data() {
    return {
      user: null
    };
  },
  methods: {
    signInWithGoogle() {
      console.log("method")
      let router = useRouter(); 
      const provider = new GoogleAuthProvider();
      signInWithPopup(getAuth(), provider)
        .then((result) => {
              this.user = result.user;
              localStorage.setItem('user', JSON.stringify(this.user))
              this.$router.push("/");
              window.location.reload();
          })
          .catch((error) => {
              console.error(error);
             this.$router.push("/error");
          });
    }
  }
}

// const email = ref("");
// const password = ref("");

let user = null;
const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then((result) => {
          this.user = result.user;

      })
      .catch((error) => {
          router.push("/error");
      });
}
</script>

<style lang="scss">
.google-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  color: #4285f4;
  background-color: #EFECEC;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: darken(#4285f4, 10%);
  }

  .google-icon img {
    width: 24px;
    height: 24px;
    vertical-align: middle;

  }

  .button-text {
    vertical-align: middle;
  }
}
</style>