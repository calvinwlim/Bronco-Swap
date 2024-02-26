import './assets/main.css'
import 'mdb-vue-ui-kit/css/mdb.min.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

import App from './App.vue'
import router from './router'

const firebaseConfig = {
  apiKey: "AIzaSyAkMW0BEIry_tKws6h3NHOUHpDAGCy9744",
  authDomain: "bronco-swap.firebaseapp.com",
  databaseURL: "https://bronco-swap-default-rtdb.firebaseio.com",
  projectId: "bronco-swap",
  storageBucket: "bronco-swap.appspot.com",
  messagingSenderId: "899198764619",
  appId: "1:899198764619:web:f5a4878f421f6d67ddafce",
  measurementId: "G-ZLP3956T4T"
};

initializeApp(firebaseConfig);

const app = createApp(App)
app.use(createPinia())
app.use(router)

app.mount('#app')


