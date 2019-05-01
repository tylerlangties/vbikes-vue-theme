<template>
  <div>
    <Banner title="Blog"></Banner>
    <div v-if="recentPostsLoaded" class="container centered">
      <div class="row blog">
        <blog-card v-for="post in recentPosts(limit)" :key="post.id" :post="post"></blog-card>
      </div>
      <div class="loadmore">
        <b-button v-if="!allPostsLoaded" class="loadmore-button" @click="loadMore">Load More</b-button>
        <h5 v-else>Showing All Posts</h5>
      </div>
    </div>
    <div v-else class="loading">
      <div class="loading-text">Loading...</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Banner from "./Banner.vue";
import BlogCard from "./BlogCard.vue";
export default {
  data() {
    return {
      limit: 9,
      allPostsLoaded: null,
      postsDisplayed: 9
    };
  },
  computed: {
    ...mapGetters({
      recentPosts: "recentPosts",
      recentPostsLoaded: "recentPostsLoaded"
    })
  },
  components: {
    Banner,
    FontAwesomeIcon,
    BlogCard
  },
  methods: {
    loadMore() {
      if (!this.allPostsLoaded) {
        this.limit = this.limit + 6;
        this.recentPosts(this.limit);
        this.postsDisplayed = this.recentPosts(this.limit).length;
        if (this.postsDisplayed < this.limit) {
          this.allPostsLoaded = true;
        }
      } else {
        console.log("showing all posts");
      }
    }
  },
  mounted() {
    this.$store.dispatch("getAllUsers");
  }
};
</script>
<style lang="scss">
.blog {
  margin: 4rem auto 1rem;
  display: flex;
  justify-content: center;
}
.loadmore {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 0 1.5rem 0;
  &-button {
    @media (max-width: 776px) {
      width: 100%;
      max-width: 350px;
    }
  }
}
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}
</style>
