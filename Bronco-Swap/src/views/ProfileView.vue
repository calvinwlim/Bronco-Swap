<template>
    <v-for  v-for="item in products">
        <Listing
            :image="item.image"
            :itemTitle="item.title"
            :price="item.price"
            postedBy="PlaceHolder"
            contactInfo="PlaceHolder"
        ></Listing>
    </v-for>
</template>
  
<script>
import Listing from "@/components/Listing.vue";
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
            products: [],
            id: 1
        };
    },
    created() {
        onSnapshot(q, (querySnapshot) => {
            this.products = [];
            querySnapshot.forEach((doc) => {
                if (doc.data().uid == this.id) {
                    this.products.push({
                        key: doc.id,
                        title: doc.data().title,
                        description: doc.data().description,
                        price: doc.data().price,
                        image: doc.data().image,
                    });
                }
            });
        });
    },
    components: { Listing }
}
</script>

<style></style>