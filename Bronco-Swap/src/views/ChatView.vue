<script setup>
import AuthPage from './pages/AuthPage/index.vue'
import ChatsPage from './pages/ChatsPage/index.vue'
import { loginRest, signupRest } from './pages/AuthPage/api'
</script>

<template>
  <!-- scrapped auth page, direct to google auth -->
  <!-- <AuthPage v-if="!googleuser" @onAuth="handleAuth" /> -->
  <div v-if="!googleuser">You must be logged in!</div>
  <ChatsPage v-else v-bind:username="googleuser.email" v-bind:secret="'1234'" />
  <!-- <ChatsPage
    v-else
    v-bind:username="user.username"
    v-bind:secret="user.secret"
  /> -->
</template>

<script>
// onMounted(() => {
//   console.log("Component mounted");

//   // Example: Reload the page once when the component is mounted
//   window.location.reload();
// });

let googleuser = JSON.parse(localStorage.getItem('user'))

// checks if user not in database, signs them up
if (googleuser) {
  loginRest(googleuser.email, '1234').catch((error) => {
    signupRest(
      googleuser.email, // username
      '1234', //pass
      googleuser.email, // email
      googleuser.displayName //firstlast
    ).catch((error) => console.log('Sign up error', error))
  })
}

export default {
  data() {
    return {
      user: undefined
    }
  },
  methods: {
    handleAuth(user) {
      this.user = user
    }
  }
}
</script>

<!-- <style>
* {

}
body {
  margin: 0px;
}
.login-page {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    180deg,
    rgba(117, 84, 160, 1) 7%,
    rgba(117, 84, 160, 1) 17%,
    rgba(106, 95, 168, 1) 29%,
    rgba(99, 103, 174, 1) 44%,
    rgba(87, 116, 184, 1) 66%,
    rgba(70, 135, 198, 1) 83%,
    rgba(44, 163, 219, 1) 96%,
    rgba(22, 188, 237, 1) 100%,
    rgba(0, 212, 255, 1) 100%
  );
}
.card {
  width: 200px;
  position: relative;
  left: calc(50vw - 100px);
  text-align: center;
  padding-top: 6vw;
}
.title {
  padding-top: 32px;
  font-size: 22px;
  color: white;
  font-weight: 700;
}
input {
  width: calc(100% - 16px);
  margin-top: 12px;
  padding: 8px;
  background-color: #e6f7ff;
  outline: none;
  border: 1px solid #e6f7ff;
}
button {
  margin-top: 12px;
  width: 100%;
  padding: 8px;
}
</style> -->