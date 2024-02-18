<template>
  <button class="google-button" @click="signInWithGoogle">
    <span class="google-icon">
      <img src="https://www.vectorlogo.zone/logos/google/google-icon.svg" alt="Google Icon">
    </span>
    Sign in with Google
  </button>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
const email = ref("");
const password = ref("");
const router = useRouter(); 

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
      .then((result) => {
          localStorage.setItem('user', JSON.stringify(result.user))
          
          router.push("/home");
      })
      .catch((error) => {
          console.error(error);
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