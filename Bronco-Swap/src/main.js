import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import App from './App.vue'
import router from './router'

const firebaseConfig = {
    apiKey: "AIzaSyAkMW0BEIry_tKws6h3NHOUHpDAGCy9744",
    authDomain: "bronco-swap.firebaseapp.com",
    projectId: "bronco-swap",
    storageBucket: "bronco-swap.appspot.com",
    messagingSenderId: "899198764619",
    appId: "1:899198764619:web:4a2336eb2112ed08ddafce",
    measurementId: "G-XD5YPPV2WD"
  };
  
initializeApp(firebaseConfig);  

const app = createApp(App)
app.use(createPinia())
app.use(router)

app.mount('#app')
