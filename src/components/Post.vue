<template>
  <div v-if="post">
    <Banner :title="post.title.rendered"></Banner>
    <template>
      <div class="post">
        <div v-if="post.better_featured_image" class="post-featured-image">
          <img :src="post.better_featured_image.source_url">
        </div>
        <div class="post-content">
          <h1 class="post-title">{{ post.title.rendered }}</h1>
          <div class="post-body" v-html="post.content.rendered"></div>
          <div class="date-posted">{{ post.date | date }}</div>
        </div>
      </div>
    </template>
  </div>
  <div v-else>
    <h3>Loading...</h3>
  </div>
</template>

<script>
import axios from "axios";
// import Loader from "../partials/Loader.vue";
import { mapGetters } from "vuex";
import SETTINGS from "../settings";
import Banner from "./Banner.vue";

export default {
  name: "post",
  data() {
    return {
      post: false
    };
  },
  components: {
    Banner
  },
  computed: {},

  beforeMount() {
    this.getPost();
  },

  methods: {
    getPost: function() {
      axios
        .get(
          SETTINGS.API_BASE_PATH + "posts?slug=" + this.$route.params.postSlug
        )
        .then(response => {
          this.post = response.data[0];
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>

<style scoped lang="scss">
.post {
  max-width: 1044px;
  margin: 4rem auto;
}
.post-featured-image {
  img {
    width: 100%;
    height: auto;
    border-radius: 2px;
  }
}
.post-content {
  .post-title {
    font-size: 32px;
    font-weight: 500;
    margin-bottom: 20px;
    @media (max-width: 776px) {
      font-size: 24px;
    }
  }
  box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.1);
  padding: 2rem 2rem;
  @media (max-width: 776px) {
    padding: 2rem 1rem;
  }
}
</style>
