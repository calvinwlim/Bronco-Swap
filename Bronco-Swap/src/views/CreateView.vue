<template>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Post a Listing</title>
    <link href='https://fonts.googleapis.com/css?family=Nunito:400,300' rel='stylesheet' type='text/css'>
  </head>

  <body>
    <div id="app">
      <div class="row">
        <div class="col-md-12">
          <form @submit.prevent="getFormValues" name="listing-info">
            <h1> Post a Listing </h1>

            <fieldset>

              <input id="fileInput" class="form-control" lang="en" type="file" placeholder="sqs" accept=".jpg,.png"
                @change="updateImageEvent" required />

              <label for="itemTitle">Title</label>
              <input v-model="userTitle" type="text" id="itemTitle" name="item_title" required>

              <select name="cars" id="cars" required=true>
                <option value="textbook">Textbook</option>
                <option value="furniture">Furniture</option>
                <option value="clothing">Clothing</option>
                <option value="other">Other</option>
              </select>

              <label for="itemDescription">Description</label>
              <input v-model="userDesc" type="text" id="itemDescription" name="item_description" required>

              <label for="currency-field">Price</label>
              <input v-model="userPrice" type="text" name="currency-field" id="currency-field" value=""
                data-type="currency" placeholder="$0" required>

            </fieldset>

            <input type="submit" @click="handleInput"/>

          </form>
        </div>
      </div>
    </div>
  </body>
</template>
<script>
import router from "@/router";
import {
  addDoc,
  collection,
  query,
  getFirestore,
  onSnapshot,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

const storage = getStorage();
const db = getFirestore();
const q = query(collection(db, "Listings"));

export default {
  data() {
    return {
      product: {
        title: "",
        price: 0,
        image: "",
        description: "",
        uid: JSON.parse(localStorage.getItem('user')).uid
      },
      ProgressShow: false,
      uploadValue: 0,
      picture: null,
      imageData: null,
      imageName: null,
      imageEvent: null,
      userTitle: "",
      userDesc: "",
      userPrice: ""
    };
  },

  methods: {
    async handleInput(event) {
      this.product.title = this.userTitle;
      this.product.description = this.userDesc;
      this.product.price = this.userPrice;
      await this.previewImage();
      addDoc(
        q,
        this.product
      ).then(() => {
        this.product.title = "";
        this.product.price = "";
        this.product.image = "";
        this.product.description = "";
        this.userTitle = "";
        this.userDesc = "";
        this.userPrice = "";
        const fileInput = document.getElementById('fileInput'); // Replace 'fileInput' with the actual ID of your file input
        if (fileInput) {
          fileInput.value = '';
        }
        alert("Listing Posted!")
        router.push("/profile")
      });
    },

    updateImageEvent(event) {
      this.imageEvent = event;
    },

    async previewImage() {
      this.ProgressShow = true;
      this.uploadValue = 0;
      this.picture = null;
      this.imageData = this.imageEvent.target.files[0];
      this.imageName = this.imageEvent.target.files[0].name;
      const storageRef = ref(storage, "images/" + this.imageName);
      const uploadTask = uploadBytesResumable(storageRef, this.imageData);
      const snapshot = await uploadTask;
      this.uploadValue =
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

      await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log("File available at", downloadURL);
        this.product.image = downloadURL;
      });

    },
  }
};

</script>
<style>
@media (min-width: 1024px) {
  .create {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }

  *,
  *:before,
  *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  body {
    font-family: 'Nunito', sans-serif;
    color: #384047;
  }

  form {
    max-width: 300px;
    margin: 10px auto;
    padding: 10px 20px;
    border-radius: 8px;
  }

  h1 {
    margin: 0 0 30px 0;
    text-align: center;
  }

  input[type="text"],
  textarea,
  select {
    background: rgba(255, 255, 255, 0.1);
    border: none;
    font-size: 16px;
    height: auto;
    margin: 0;
    outline: 0;
    padding: 15px;
    width: 100%;
    background-color: #e8eeef;
    color: #8a97a0;
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.03) inset;
    margin-bottom: 30px;
  }

  input[type="radio"],
  input[type="checkbox"] {
    margin: 0 4px 8px 0;
  }

  select {
    padding: 6px;
    height: 32px;
    border-radius: 2px;
  }

  button {
    padding: 19px 39px 18px 39px;
    color: #FFF;
    background-color: #4bc970;
    font-size: 18px;
    text-align: center;
    font-style: normal;
    border-radius: 5px;
    width: 100%;
    border: 1px solid #3ac162;
    border-width: 1px 1px 3px;
    box-shadow: 0 -1px 0 rgba(255, 255, 255, 0.1) inset;
    margin-bottom: 10px;
  }

  fieldset {
    margin-bottom: 30px;
    border: none;
  }

  legend {
    font-size: 1.4em;
    margin-bottom: 10px;
  }

  label {
    display: block;
    margin-bottom: 8px;
  }

  label.light {
    font-weight: 300;
    display: inline;
  }

  .number {
    background-color: #5fcf80;
    color: #fff;
    height: 30px;
    width: 30px;
    display: inline-block;
    font-size: 0.8em;
    margin-right: 4px;
    line-height: 30px;
    text-align: center;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.2);
    border-radius: 100%;
  }

  @media screen and (min-width: 480px) {

    form {
      max-width: 480px;
    }

  }

}
</style>
  