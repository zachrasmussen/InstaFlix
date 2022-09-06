<template>
    <div class="">
          <div class="card">
             <h3 class="text-center">  {{content.title}}  </h3> 
              <img :src="content.imageurl" alt="">
              <p class="text-center"><b>IMDB rating:{{content.imdbrating}}</b></p>
              <p>{{content.synopsis}}</p>
              <p>{{content.genre}}</p>
              <div class="d-flex justify-content-around">
                  <h1 class="mdi mdi-thumb-down selectable"></h1>
                  <h1 class="mdi mdi-thumb-up selectable"></h1>
              </div>
          </div>
      </div>
  </template>
  
  <script>
 
  export default {
      props: {
          content: { type: Object, required: true}
      },
      setup() {
  
      return {
  
        //   setActiveContent() {
        //       AppState.activeContent = props.content
        //   }
      }
      }
  }
  </script>
  
  <style>
  
  </style>