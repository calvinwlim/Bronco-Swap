<template>    
		<div class="galleryitems">
			      
			      <div class="item">
			        <div class="itemcontent">
			          <div class="overlay">
			            <a class="zoomlink"><i class="fa-solid fa-plus"></i></a>
			            <div class="text">
			              <h3>sOEIFjoijsfojsdoijfosidjfoids</h3>
			              <a href="#" class="livelink">{{ price }} <i class="fa-solid fa-angle-right"></i></a>
			            </div>
			          </div>
			          <img :src="image" alt="" />
			        </div>
			      </div>
        </div>
</template>

<script setup>
    import { defineProps } from 'vue';
    const props = defineProps(['image', 'itemTitle', 'price', 'postedBy', 'contactInfo']);
</script>

<style scoped>
    
    *{box-sizing:border-box;margin:0; padding:0;}
ul{list-style:none;}
a{text-decoration:none;}
main{
  width:100%;
  margin:0 auto 0 auto;
  position:relative;
  max-width:2000px;
}

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
  display:flex;
  flex-direction: column;
  flex-wrap:wrap;
  max-width: 250px;
}
.galleryitems .item{
  flex-basis:20%;
  padding:0 15px;
  margin:0 0 30px 0;
  position:relative;
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