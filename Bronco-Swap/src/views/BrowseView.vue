<template>
  <Modal @close="toggleModal(null)" :modalActive="modalActive" :passProduct="passProduct">

    <div class="modal-content">
    </div>
  </Modal>
  <div class="content">

    <div class="sidebar">
      <h1 class="searchHeader">Filter by Category:</h1>
      <label class="checkbox">
        <input id="textbooks" type="checkbox" v-model="textbook" @input="updateItems()"> Textbooks
      </label>

      <label class="checkbox">
        <input id="clothes" type="checkbox" v-model="clothing" @input="updateItems()"> Clothing
      </label>

      <label class="checkbox">
        <input id="furniture" type="checkbox" v-model="furniture" @input="updateItems()"> Furniture
      </label>

      <label class="checkbox">
        <input id="other" type="checkbox" v-model="other" @input="updateItems()"> Other
      </label>
    </div>

    <div class="browse">
      <h1 class="searchHeader" v-if="searchResults && searchTerm != ''">Search Results for "{{ this.searchTerm }}"
      </h1>
      <div v-if="searchResults" class="galleryitems">

        <div v-for="item in searchResults" class="item">
          <div class="itemcontent">
            <div class="overlay">
              <a @click="toggleModal(item)" class="zoomlink"><i class="fa-solid fa-plus"></i></a>
              <div class="text">
                <h3>{{ item.title }}</h3>
                <a href="#" class="livelink">${{ item.price }} <i class="fa-solid fa-angle-right"></i></a>
              </div>
            </div>
            <img
              v-show="loadingMap.get(item.image)"
              class="item-image"
              :src="item.image"
              alt=""
              @load="handleImageLoad(item.image)"
              />
          </div>
        </div>
      </div>
      <h1 v-if="!searchResults" class="searchHeader">No results found. Sorry!</h1>
    </div>
  </div>
  <h1 v-if="!searchResults" class="searchHeader">No results found. Sorry!</h1>
</template>

<script>
import Modal from '../components/ModalPopUp.vue';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore'

const db = getFirestore()
const listingsCollection = collection(db, 'Listings')
const q = query(listingsCollection)

export default {
  
  components: {
    Modal,
  },

  data() {
    return {
      id: JSON.parse(localStorage.getItem('user')).uid,
      isModalVisible: false,
      passProduct: {
        key: 111111111,
        title: "title",
        description: "Description",
        price: "price",
        image: "url",
      },
      modalActive: false,
      searchTerm: localStorage.getItem("lastSearch"),
      textbook: false,
      clothing: false,
      furniture: false,
      other: false,
      searchResults: JSON.parse(localStorage.getItem('searchResults')),
      loadingMap: new Map(),
    };
  },

  async created() {
    this.searchTerm = localStorage.getItem("lastSearch");
    await this.searchProducts(this.searchTerm);
    if (this.searchResults)
      this.searchResults.forEach((result) => {
      this.loadingMap.set(result.image, true);
      })
  },

  beforeUnmount() {
    this.searchTerm = localStorage.setItem("lastSearch", "");
    this.loadingMap.clear()
  },

  watch: {
    textbook: 'updateItems',
    clothing: 'updateItems',
    furniture: 'updateItems',
    other: 'updateItems',
  },

  methods: {
    toggleModal(item) {
      if (item) {
        this.passProduct = item;
      }
      this.modalActive = !this.modalActive;
    },

    updateItems(type, bool) {
      let storedSearchResults = JSON.parse(localStorage.getItem('searchResults')) || [];
      let types = []
      this.$nextTick(() => {
        if (this.textbook)
          types.push("textbook")
        if (this.clothing)
          types.push("clothing")
        if (this.furniture)
          types.push("furniture")
        if (this.other)
          types.push("other")

        if (types.length == 0) {
          this.searchResults = storedSearchResults;
        } else {
          storedSearchResults = storedSearchResults.filter(item => types.includes(item.type));
          this.searchResults = storedSearchResults;
        }
      });
    },

    async searchProducts(term) {
      const searchTerm = term;
      let querySnapshot = await getDocs(query(listingsCollection));
      const searchResults = [];
      querySnapshot.forEach((doc) => {
        const userid = JSON.parse(localStorage.getItem("user")).uid;
        if (doc.data().title.toLowerCase().includes(searchTerm.toLowerCase()) && doc.data().uid != userid)
          searchResults.push(doc.data());
      });
      if (searchResults.length > 0) {
        localStorage.setItem('searchResults', JSON.stringify(searchResults))
        this.searchResults = searchResults;
        // Redirect to /browse and pass searchResults as a route parameter
      } else {
        localStorage.setItem('searchResults', null)
      }
    },

    handleImageLoad(image) {
      this.loadingMap.set(image, true);
    },
  }
}
</script>

<style scoped>
.content {
  display: flex;
  height: 100%;
}

.browse {
  width: 80%;
}

.sidebar {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20%;
  height: 100vh;
  border-right: 1px solid #ddd;
}

.checkbox {
  padding-top: 1rem;
}

.galleryitems {
  margin: 30px 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.galleryitems .item {
  flex-basis: 20%;
  padding: 0 15px;
  margin: 0 0 30px 0;
  position: relative;
  min-width: 250px;
  max-width: 350px;
}

.galleryitems .item .itemcontent {
  float: left;
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
}

.galleryitems .item .overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 3;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.2);
  padding: 15px;
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
  opacity: 0;
  transition: 0.4s;
}

.galleryitems .item:hover .overlay {
  opacity: 1;
}

.galleryitems .item .overlay a.zoomlink {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 4;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #fff;
}

.galleryitems .item .overlay h3 {
  color: #fff;
  font-size: 18px;
  margin: 0 0 8px 0;
}

.galleryitems .item .overlay a.livelink {
  display: table;
  width: auto;
  height: auto;
  padding: 5px 10px;
  background: #862633;
  color: #fff;
  border-radius: 30px;
  font-size: 10px;
  text-transform: uppercase;
  position: relative;
  z-index: 5;
  transition: 0.5s;
}

.galleryitems .item .overlay a.livelink:hover {
  background: slateblue;
}

.galleryitems .item img {
  float: left;
  width: 100%;
  height: auto;
  aspect-ratio: 1/1;
  object-fit: cover;
  object-position: center;
}

.searchHeader {
  padding-top: 1rem;
  text-align: center;
  font-size: 28px;
  margin: 30px 0;
}

@media (max-width: 790px) {
  .content {
    flex-direction: column;
    justify-content: center;
  }

  .browse {
    width: 100vw;
  }

  .sidebar {
    width: 100vw;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 3.5rem;
    border-bottom: 1px solid #ddd;
    border-right: none;
  }

  .searchHeader {
    font-size: 17px;
    margin-top: 12px;
  }

  .checkbox {
    padding: 0 1rem;
  }
}
</style>