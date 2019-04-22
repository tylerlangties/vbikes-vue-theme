<template>
  <div>
    <Banner title="Blog"></Banner>
    <div class="container">
      <b-row class="blog" v-if="recentPostsLoaded">
        <b-col
          lg="4"
          md="6"
          sm="12"
          xs="12"
          class="blog-post"
          v-for="post in recentPosts(limit)"
          :key="post.id"
        >
          <div v-if="post.better_featured_image" class="blog-post_thumbnail">
            <img class="featured-image" :src="post.better_featured_image.source_url">
          </div>
          <div v-else>
            <p>no image available</p>
          </div>
          <div class="blog-post_content">
            <router-link :to="post.slug">{{ post.title.rendered }}</router-link>
            <p>{{post.excerpt.rendered}}</p>
          </div>
        </b-col>
      </b-row>

      <div v-else>Loading...</div>
    </div>
    <b-button @click="loadMore">Load More</b-button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Banner from "./Banner.vue";
export default {
  data() {
    return {
      limit: 9
    };
  },
  computed: {
    ...mapGetters({
      recentPosts: "recentPosts",
      recentPostsLoaded: "recentPostsLoaded"
    })
  },
  components: {
    Banner
  },
  methods: {
    loadMore() {
      this.limit = this.limit + 6;
      this.getPosts(this.limit);
    },
    getPosts(limit) {
      this.$store.dispatch("getPosts", { limit: limit });
    }
  },
  mounted() {
    this.getPosts(this.limit);
  }
};
</script>
<style lang="scss" scoped>
.blog {
  margin: 4rem 0.5rem;
  &-post {
    box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.1);
    width: 325px;
    height: 480px;
    &_thumbnail {
      img {
        width: 350px;
        height: 240px;
      }
    }
    &_content {
      height: 240px;
      box-sizing: border-box;
      padding: 0.5rem;
      a {
        font-size: 18px;
        line-height: 1.4;
        color: #000;
      }
      p {
        color: #777777;
        line-height: 1.7;
        font-size: 15px;
      }
    }
  }
}
</style>
