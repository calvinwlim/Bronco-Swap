<template>
    <!DOCTYPE html>
 <html lang="en">
 
 
     <head>
 
         <meta charset="UTF-8" />
         <meta name="viewport" content="width=device-width, initial-scale=1">
         <title>DesignFolio: Portfolio Website Template</title>
         <link rel="preconnect" href="https://fonts.googleapis.com">
         <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
         <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
         <link rel="stylesheet" href="css/simple-lightbox.css">
         <link rel="stylesheet" href="fonts/fa/css/all.css">
     </head>
 
 
 
     <body>
         
 
          <main>
    
               <header>
                   <div class="branding">
                       <h1>DesignFolio</h1>
                       <img src="" alt="" class="avatar" />
                       <h2>John Doe</h2>
                       <p>
                         I Create Beautiful Designs. <strong>My fee is affordable and I deliver fast</strong> (within timeframe). Try Me, Contact Below.
                       </p>
                     <ul>
                       <li><i class="fa-solid fa-phone"></i> Call: <a href="tel:+11234567890">+1 1234567890</a></li>
                       <li><i class="fa-solid fa-envelope"></i> Email: <a href="mailto:#">john@mailname.com</a></li>
                       <li><i class="fa-brands fa-skype"></i> Skype: <a href="skype:username?chat">JOHNDOE123</a></li>
                     </ul>
                   </div>
                   
               </header>
               <!-- HEADER -->
 
                
                
                
               <section class="portfoliogallery gallery">
                 
                 <div class="headings">
                   <h2>My Portfolio</h2>
                   <p>Designfolio is a Portfolio Website Template.</p>
                 </div>
                   
                 
                 <div class="galleryitems">
                     <div v-for="item in products" class="item">
             
                         <div class="itemcontent">
                             <div class="overlay">
                                 <a href="" class="zoomlink"><i class="fa-solid fa-plus"></i></a>
                                 <div class="text">
                                 <h3>{{ item.title }}</h3>
                                 <a href="#" class="livelink">{{ item.price }} <i class="fa-solid fa-angle-right"></i></a>
                                 </div>
                             </div>
                             <img :src="item.image" alt="" />
                         </div>
                   </div>
                   <!--1-->
                 </div>
 
                 <!--galleryitems-->
                 
             </section>
                 <div class="pagination">
                   <a href="#" class="active">1</a>
                   <a href="#">2</a>
                   <a href="#">3</a>
                   <a href="#">4</a>
                   <a href="#">5</a>
                 </div>
                 <!--pagination-->
         
                
             </main>
     </body>
 </html>
 <!--HTML-->
 <!-- Template By: LayoutFlow, URL: https://layoutflow.com/  -->
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
             id: JSON.parse(localStorage.getItem('user')).uid
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
 
 <style>
 *{box-sizing:border-box;margin:0; padding:0;}
 ul{list-style:none;}
 a{text-decoration:none;}
 main{
   width:100%;
   margin:0 auto 0 auto;
   position:relative;
   max-width:2000px;
 }
 header{
   position:fixed;
   top:20;
   width:400px;
   height:100%;
   border-right:1px solid #ddd;
   font-family:'Manrope';
   padding:30px 40px;
   overflow-y:auto;
   z-index:5;
 }
 .branding{
   display:flex; flex-direction:column; align-items:center;
 }
 .branding h1{
   text-align:center;
   font-size:15px;
   text-transform:uppercase;
   color:royalblue;
   margin:0 0 20px 0;
 }
 .branding img.avatar{
   float:left;
   width:128px;
   height:auto;
   aspect-ratio: 1/1;
   border-radius:50%;
   object-fit:cover;
   object-position:center;
   margin:0 0 25px 0;
 }
 .branding h2{
   text-align:center;
   font-size:17px;
   color:black;
   margin:0 0 10px 0;
 }
 .branding p{
   text-align:center;
   font-size:14px; line-height:150%;
   color:gray;
   margin:0 0 20px 0;
 }
 .branding ul{
   float:left;
   width:100%;
   display:flex;
   flex-direction:column;
   align-items:center;
 }
 .branding ul li{
   float:left;
   width:100%;
   max-width:260px;
   padding:8px 8px;
   border:1px solid royalblue;
   border-radius:50px;
   text-align:center;
   font-size:13px;
   color:royalblue;
   margin:5px 0;
 }
 .branding ul li a{color:#000;}
 
 
 
 .portfoliogallery{
   float:right;
   width:100%;
   padding:30px 60px;
   padding-left:460px;
   font-family:'Manrope';
 }
 .portfoliogallery .headings{
   margin:0 0 40px 0;
 }
 .portfoliogallery .headings h2{
   color:royalblue;
   font-size:21px;
   margin:0 0 15px 0;
 }
 .portfoliogallery .headings p{
   color:gray;
   font-size:15px;
   margin:0 0 0 0;
 }
 
 .galleryitems{
   margin:0 -15px;
   display: flex;
   flex-wrap: wrap;
 }
 .galleryitems .item{
   flex-basis:20%;
   padding:0 15px;
   margin:0 0 30px 0;
   position:relative;
   min-width: 250px;
   max-width: 350px;
 }
 .galleryitems .item .itemcontent{
   float:left;
   width:100%; height:100%;
   position:relative;
   border-radius:6px;
   overflow:hidden;
 }
 .galleryitems .item .overlay{
   position:absolute; width:100%;
   height:100%; z-index:3; left:0;
   top:0;
   background:rgba(0,0,0,0.2);
   padding:15px;
   display:flex; align-items:flex-end; flex-wrap:wrap;
   opacity:0;
   transition:0.4s;
 }
 .galleryitems .item:hover .overlay{
   opacity:1;
 }
 .galleryitems .item .overlay a.zoomlink{
   position:absolute;
   width:100%; height:100%;
   z-index:4; left:0; top:0;
   display:flex;
   align-items:center;
   justify-content:center;
   font-size:16px;
   color:#fff;
 }
 .galleryitems .item .overlay h3{
   color:#fff;
   font-size:13px;
   margin:0 0 8px 0;
 }
 .galleryitems .item .overlay a.livelink{
   display:table;
   width:auto; height:auto;
   padding:5px 10px;
   background:royalblue;
   color:#fff;
   border-radius:30px;
   font-size:9px;
   text-transform:uppercase;
   position:relative;
   z-index:5;
   transition:0.5s;
 }
 .galleryitems .item .overlay a.livelink:hover{
   background:slateblue;
 }
 .galleryitems .item img{
   float:left; width:100%;
   height:auto;
   aspect-ratio:1/1;
   object-fit:cover;
   object-position:center;
 }
 .pagination{
   float:left;
   width:100%;
   margin:30px 0;
   display:flex;
   flex-wrap:wrap;
   align-items:center;
 }
 .pagination a{
   float:left;
   width:32px; height:32px;
   display:flex;
   flex-wrap:wrap;
   align-items:center;
   justify-content:center;
   color:gray;
 }
 .pagination a.active{
   color:royalblue;
   border-bottom:1px solid royalblue;
 }
 .companytext{
   float:left;
   width:100%;
   font-size:12px;
   color:gray;
   margin:20px 0 0 0;
 }
 .companytext a{
   color:gray;
   border-bottom:1px solid gray;
 }
 
 
 footer{
   position:fixed;
   bottom:0;
   width:400px;
   padding:30px 40px;
   z-index:6;
   font-family:'Manrope';
 }
 .social{
   float:left;
   width:100%;
   display:flex;
   align-items:center;
   justify-content:center;
   flex-wrap:wrap;
   font-size: 13px;
   color:#000;
   margin:0 0 10px 0;
 }
 .social a{
   margin-left:10px;
   color:royalblue;
   text-decoration:none;
 }
 a.link{
   display:table;
   width:auto;
   text-transform:uppercase;
   margin:0 auto 0 auto;
   text-align:center;
   color:gray;
   font-size:10px;
   letter-spacing:3px;
   border-bottom:1px solid gray;
 }
 
 
 
 
 @media(max-width:1460px){
   .galleryitems .item{
     flex-basis:25%;
   }
 }
 
 
 @media(max-width:1280px){
   main{
     float:left;
     padding:0 25px;
     max-width:100%;
   }
   header{
     float:left;
     position:relative;
     width:100%;
     height:auto;
     border-right:none;
     border-bottom:1px solid #ddd;
     font-family:'Manrope';
     padding:30px 0;
   }
   .portfoliogallery{
     float:left;
     width:100%;
     padding:30px 0;
     padding-left:0;
   }
   footer{
     float:left;
     position:relative;
     bottom:0;
     width:100%;
     border-top:1px solid #ddd;
     padding:30px 0;
   }
 }
 
 
 @media(max-width:960px){
   .galleryitems .item{
     flex-basis:33.33%;
   }
 }
 
 
 @media(max-width:640px){
   .galleryitems .item{
     flex-basis:50%;
   }
   .galleryitems{
     margin:0 -8px;
   }
   .galleryitems .item{
     padding:0 8px;
     margin:0 0 20px 0;
   }
   .galleryitems .item .overlay h3{
     font-size:11px;
   }
   .galleryitems .item .overlay a.livelink{
     padding:4px 8px;
     font-size:8px;
   }
 }
 </style>