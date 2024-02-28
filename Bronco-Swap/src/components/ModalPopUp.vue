<template>
  <transition name="modal-animation">
    <div v-show="modalActive" class="modal">
      <transition name="modal-animation-inner">
        <div v-show="modalActive" class="modal-inner">
          <i @click="close" class="far fa-times-circle"></i>
          <div class="modalInfo">
            <img
              :src="passProduct.image"
              alt="This should be a photo"
              @load="imageLoaded"
            />
            <h1 class="itemTitle">{{ passProduct.title }}</h1>
            <p class="itemDesc">{{ passProduct.description }}</p>
            <p class="itemPrice">${{ passProduct.price }}</p>
            <p class="userInfo">
              Posted by: {{ passProduct.displayName }} ({{ passProduct.email }})
            </p>
            <div class="button-group">
              <button @click="close" type="button">Close</button>
              <button v-if="(passProduct.uid) == this.userID" @click="deleteListing">Delete Listing</button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>
  
<script>
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { getFirestore, deleteDoc, doc } from 'firebase/firestore'
import { getStorage, ref, deleteObject } from 'firebase/storage';

export default {
  props: ['modalActive', 'passProduct'],
  setup(props, { emit }) {
    const loading = ref(true);
    const userID = JSON.parse(localStorage.getItem('user')).uid;

    const close = () => {
      const imageUrl = props.passProduct.image;
      const regex = /images%2F(.*?)\?alt/;
      const urlPath = regex.exec(imageUrl);
      emit('close')
    }

    const deleteListing = async () => {
      const imageUrl = props.passProduct.image;
      const regex = /images%2F(.*?)\?alt/;
      const urlPath = regex.exec(imageUrl)[1];

      try {
        const storage = getStorage();
        const db = getFirestore();
        const listingRef = doc(db, 'Listings', props.passProduct.key);

        await deleteDoc(listingRef);
        console.log('Document successfully deleted!');

        // Reference to the image in Firebase Storage
        const imageRef = ref(storage, 'images/' + urlPath);

        // Delete the image from Firebase Storage
        await deleteObject(imageRef);
      } catch (error) {
        console.error('Error removing document: ', error);
      }
      emit('close');
    };

    return { close, deleteListing, userID }
  },
}
</script>
  
<style lang="scss" scoped>
.modal-animation-enter-active,
.modal-animation-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-animation-enter-from,
.modal-animation-leave-to {
  opacity: 0;
}

.modal-animation-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-animation-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-animation-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.modal-animation-inner-leave-to {
  transform: scale(0.8);
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.7);

  .modal-inner {
    position: relative;
    max-width: 640px;
    width: 80%;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    background-color: #F8f4f9;
    padding: 64px 16px;

    i {
      position: absolute;
      top: 15px;
      right: 15px;
      font-size: 20px;
      cursor: pointer;

      &:hover {
        color: crimson;
      }
    }

    .modalInfo {
      text-align: center;
      justify-content: center;

      img {
        max-width: 350px;
        min-width: 250px;
        max-height: 500px;
        margin-bottom: 15px;
        border-radius: 10px;
      }

      .itemPrice {
        font-size: 20px;
        color: #A5CC6b;
      }
    }

    button {
      padding: 20px 30px;
      border: none;
      font-size: 16px;
      background-color: #862633;
      color: #F8f4f9;
      cursor: pointer;
    }

    button:active {
      background-color: #811e2d;
    }

  }
}

.button-group {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
</style>