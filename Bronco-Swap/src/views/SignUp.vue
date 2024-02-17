<template>
    <h1>Sign in with your SCU email:</h1>
    <p><button @click="signInWithGoogle">Sign in with Google</button></p>
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
            console.log("success!");
            router.push("/home");
        })
        .catch((error) => {
            router.push("/error");
        });
}
</script>