<template>
  <div class="sign-in">
    <div class="pop-up">
      <h2 class="header">Get started by signing in with your SCU email below!</h2>
      <button class="google-button" @click="signInWithGoogle">
        <span class="google-icon">
          <img src="https://www.vectorlogo.zone/logos/google/google-icon.svg" alt="Google Icon" />
        </span>
        Sign in with Google
      </button>
    </div>
  </div>
</template>

<script>
// import { ref } from "vue";
import { useRouter } from 'vue-router'
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'

export default {
  name: 'UserProfile',
  data() {
    return {
      user: null
    }
  },
  created() {
    if (JSON.parse(localStorage.getItem('user'))) {
      console.log('hit')
      this.$router.push('/');
    }
  },
  methods: {
    signInWithGoogle() {
      let router = useRouter()
      const provider = new GoogleAuthProvider()
      signInWithPopup(getAuth(), provider)
        .then((result) => {
          this.user = result.user
          localStorage.setItem('user', JSON.stringify(this.user))
          this.$router.push('/')
        })
        .catch((error) => {
          console.error(error)
          this.$router.push('/error')
        })
    }
  }
}

// const email = ref("");
// const password = ref("");

let user = null
const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider()
  signInWithPopup(getAuth(), provider)
    .then((result) => {
      this.user = result.user
    })
    .catch((error) => {
      router.push('/error')
    })
}
</script>

<style scoped>
.sign-in {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding-top: 5rem;
}

.pop-up {
  width: 50%;
  min-height: 30rem;
  height: 100%;
  padding: 5rem 0;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border: 4px solid rgb(236, 233, 233);
  border-radius: 3%;
}

.header {
  width: 80%;
  text-align: center;
}

.google-button {
  width: 60%;
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
  background-color: #dddbdb;
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

@media (max-width: 790px) {
    .sign-in {
      width: 100vw;
    }

    .pop-up {
      width: 100vw;
      padding: 0;
      border: none;
    }

    .header {
      width: 90%;
      text-align: center;
    }
  }
</style>