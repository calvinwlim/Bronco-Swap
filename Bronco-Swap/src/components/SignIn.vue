<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import GoogleLogo from 'https://www.vectorlogo.zone/logos/google/google-icon.svg';

const email = ref("");
const password = ref("");
const router = useRouter(); 

const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(), provider)
        .then((result) => {
            console.log("success!");
            router.push("/home");
        })
        .catch((error) => {
            router.push("/error");
        });
}

</script>

<template>
    <button class="google-button" @click="signInWithGoogle">
        <span class="google-icon">
          <GoogleLogo />
        </span>
        Sign in with Google
    </button>
</template>

<style lang="scss">
.google-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  background-color: #4285f4;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: darken(#4285f4, 10%);
  }

  .google-icon {
    margin-right: 12px;
    width: 24px;
    height: 24px;
  }
}
</style>