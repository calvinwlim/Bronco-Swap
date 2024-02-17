<template>
  <button class="google-button" @click="signInWithGoogle">
    <span class="google-icon">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M44.2 23.5c0-1.4-.1-2.9-.4-4.3H24v8h11.9c-.5 2.5-2.1 4.7-4.3 5.9v5h7.1c4.2-3.8 6.7-9.4 6.7-16.6z"/>
        <path fill="#FF3D00" d="M24 48c6.1 0 11.3-2 15.1-5.4l-7.1-5.9c-1.9 1.3-4.4 2.1-7.3 2.1-5.6 0-10.4-3.8-12.1-8.9H3v5.5C6.8 44.1 14 48 24 48z"/>
        <path fill="#4CAF50" d="M11.9 28c-.3-1-1.4-1.7-2.7-1.7-1.6 0-3 .8-3.9 2.1v5.3c1.2 3.4 3.7 6.3 6.7 7.8l7.1-5.9c-1.9-1.1-3.3-2.8-4.2-4.6z"/>
        <path fill="#1976D2" d="M8 14.7c-1.1 1.7-1.7 3.8-1.7 5.9s.6 4.2 1.7 5.9l7.1 5.9c1.1-.8 2.4-1.4 3.9-1.7V16.4c-1-.3-2.3-.4-3.9-.4-1.8 0-3.5.2-5.1.7z"/>
      </svg>
    </span>
    Sign in with Google
  </button>
</template>

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
  color: #fff;
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
    fill: #fff;
  }
}
</style>