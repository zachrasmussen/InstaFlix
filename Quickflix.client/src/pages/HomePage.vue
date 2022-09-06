<template>
  <div class="container-fluid" v-if="content">
    <div class="row">
      <!-- <div class="col-md-4" v-for="c in content" :key="c.id">
      <ContentCard :content="c"/>
     </div> -->

      <img
        class="p-0"
        v-if="content.imageurl"
        :src="enhance(content.imageurl[0], 3)"
        alt=""
      />
      <h3 class="title-font text-center my-2">{{ content.title }}</h3>
      <div class="d-flex justify-content-between mt-5">
        <h1 class="bg-danger rounded-circle p-4">👎🏼</h1>
        <h1 class="bg-success rounded-circle p-4">👍🏼</h1>
      </div>
    </div>
  </div>
</template>
  
  <script>
import { computed, onMounted } from '@vue/runtime-core';
import { contentService } from '../services/ContentService.js'
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';
import ContentCard from '../components/ContentCard.vue';
export default {
  setup() {
    async function getContent() {
      try {
        await contentService.getContent();
      }
      catch (error) {
        logger.error("[Getting Movies]", error);
        Pop.error(error);
      }
    }
    onMounted(() => {
      getContent();
    });
    return {
      content: computed(() => AppState.contents[0]),
      enhance(url, factor = 2) {
        let ux = url.indexOf('UX') != -1 ? url.indexOf('UX') : url.indexOf('UY')
        logger.log(ux)
        let front = url.slice(0, ux + 2)
        let dataStr = url.slice(ux + 2, url.indexOf('_AL.jpg') - 7)
        logger.log('front', front)
        logger.log('data', dataStr)
        let data = dataStr.split(/_|,/g)
        logger.log(data)
        Math.round(data[0] = parseInt(data[0]) * factor)
        Math.round(data[3] = parseInt(data[3]) * factor)
        Math.round(data[4] = parseInt(data[4]) * factor)
        logger.warn(front + data.join(',').replace(',', '_') + '_AL_.jpg')
        return front + data.join(',').replace(',', '_') + '_AL_.jpg'
      }
    };
  },
  components: { ContentCard }
}
  </script>
  
  <style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card {
    width: 50vw;
    > img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}

.title-font {
  font-family: "Montserrat", sans-serif;
}
</style>
  
