<template>
  <Modal @close="toggleModal(null)" :modalActive="modalActive" :passProduct="passProduct">

    <div class="modal-content">
    </div>
  </Modal>
  <div class="content">
    <div class="sidebar">
      <h1 class="searchHeader">Filter by Category:</h1>
      <label class="checkbox">
        <input type="checkbox" v-model="textbook" @input="updateItems()"> Textbooks
      </label>

      <label class="checkbox">
        <input type="checkbox" v-model="clothing" @input="updateItems()"> Clothing
      </label>

      <label class="checkbox">
        <input type="checkbox" v-model="furniture" @input="updateItems()"> Furniture
      </label>

      <label class="checkbox">
        <input type="checkbox" v-model="other" @input="updateItems()"> Other
      </label>
    </div>
    <div class="browse">
      <h1 class="searchHeader" v-if="searchResults && searchText != ''">Search Results for "{{ this.searchTerm }}"</h1>
      <div v-if="searchResults" class="galleryitems">

        <div v-for="item in searchResults" class="item">
          <div class="itemcontent">
            <div class="overlay">
              <a @click="toggleModal(item)" class="zoomlink"><i class="fa-solid fa-plus"></i></a>
              <div class="text">
                <h3>{{ item.title }}</h3>
                <a href="#" class="livelink">{{ item.price }} <i class="fa-solid fa-angle-right"></i></a>
              </div>
            </div>
            <img :src="item.image" alt="" />

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
      searchText: localStorage.getItem("searchText")
    };
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
      console.log('textbook:', this.textbook);
      console.log('clothing:', this.clothing);
      console.log('furniture:', this.furniture);
      console.log('other:', this.other);
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

          console.log(types.length)
        if (types.length == 0) {
          console.log(storedSearchResults)
          this.searchResults = storedSearchResults;
        } else {
          storedSearchResults = storedSearchResults.filter(item => types.includes(item.type));
          this.searchResults = storedSearchResults;
        }
      });
    }
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
  height: 100%;
  min-height: 89.7vh;
  border-right: 1px solid #ddd;
}

.checkbox {
  padding-top: 1rem;
}

.galleryitems {
  margin: 30px 30px;
  display: flex;
  flex-wrap: wrap;
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
  background: rgb(252, 20, 20);
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
</style>