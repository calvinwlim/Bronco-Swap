<template>
  <div id="app" class="create">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <form @submit.prevent="handleInput" name="listing-info" class="listing-form">
            <h1>Post a Listing</h1>

            <fieldset>
              <div class="form-group">
                <label for="fileInput">Upload Image</label>
                <input
                  id="fileInput"
                  class="form-control"
                  lang="en"
                  type="file"
                  accept=".jpg,.png, .jpeg"
                  @change="updateImageEvent"
                  required
                />
              </div>

              <div class="form-group">
                <label for="itemTitle">Title</label>
                <input
                  v-model="userTitle"
                  class="form-control"
                  type="text"
                  id="itemTitle"
                  name="item_title"
                  required
                />
              </div>

              <div class="form-group">
                <label for="category">Category</label>
                <select
                  v-model="userType"
                  class="form-control"
                  name="category"
                  id="category"
                  required
                >
                  <option value="" disabled>Select category</option>
                  <option value="textbook">Textbook</option>
                  <option value="furniture">Furniture</option>
                  <option value="clothing">Clothing</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div class="form-group">
                <label for="itemDescription">Description</label>
                <textarea
                  v-model="userDesc"
                  class="form-control"
                  id="itemDescription"
                  name="item_description"
                  required
                ></textarea>
              </div>

              <div class="form-group">
                <label for="currency-field">Price</label>
                <input
                  v-model="userPrice"
                  class="form-control"
                  type="text"
                  name="currency-field"
                  id="currency-field"
                  value=""
                  data-type="currency"
                  placeholder="$0"
                  required
                  @input="validatePriceInput"
                />
                <p v-if="!isPriceValid" class="text-danger">
                  Please enter a valid numeric value for the price.
                </p>
              </div>
            </fieldset>

            <button type="submit" class="btn btn-primary submit-button">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router'
import { addDoc, collection, query, getFirestore } from 'firebase/firestore'
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'

const storage = getStorage()
const db = getFirestore()
const q = query(collection(db, 'Listings'))

export default {
  data() {
    return {
      product: {
        title: '',
        price: 0,
        image: '',
        description: '',
        uid: JSON.parse(localStorage.getItem('user')).uid,
        displayName: JSON.parse(localStorage.getItem('user')).displayName,
        type: "",
        email: JSON.parse(localStorage.getItem('user')).email
      },
      userTitle: '',
      selectedCategory: '',
      userDesc: '',
      userPrice: '',
      userType: "",
      isPriceValid: true
    }
  },

  methods: {
    async handleInput(event) {
      this.product.title = this.userTitle;
      this.product.description = this.userDesc;
      this.product.price = this.userPrice;
      this.product.type = this.userType;
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
          fileInput.value = ''
        }
        alert('Listing Posted!')
        //TODO: not working??
        router.push('/profile')
      })
    },

    updateImageEvent(event) {
      this.imageEvent = event
    },

    async previewImage() {
      const imageData = this.imageEvent.target.files[0]
      const imageName = imageData.name.replace(/ /g, '-');
      const storageRef = ref(storage, 'images/' + imageName)
      const uploadTask = uploadBytesResumable(storageRef, imageData)
      const snapshot = await uploadTask
      this.product.image = await getDownloadURL(snapshot.ref)
    },

    validatePriceInput() {
      // Regular expression to match numeric values
      const numericRegex = /^[0-9]*$/
      this.isPriceValid = numericRegex.test(this.userPrice)
    }
  }
}
</script>

<style scoped>
.create {
  min-height: 90vh;
  display: flex;
  align-items: center;
}

h1 {
  color: rgb(50, 50, 50);
  font-size: 4rem;
  font-weight: 500;
  margin-bottom: 2rem;
}
label {
  margin-bottom: 10px;
}

.listing-form {
  background-color: #f8f9fa;
  padding: 50px;
  border-radius: 8px;
}

.listing-form h1 {
  margin-bottom: 30px;
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

.form-control {
  border-radius: 5px;
}

.input-group-text {
  background-color: #862633;
  border-color: #862633;
  color: #fff;
}

.submit-button {
  width: 100%;
  padding: 15px;
  background-color: #862633;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #72202b;
}

@media (max-width: 790px) {
  .container {
    display: flex;
    align-items: center;
  }

  h1 {
    font-size: 3rem;
  }

  .justify-content-center {
    width: 100vw;
  }
}

</style>