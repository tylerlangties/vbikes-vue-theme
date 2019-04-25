<template>
  <div>
    <Banner title="Blog"></Banner>
    <div v-if="recentPostsLoaded" class="container centered">
      <div class="row blog">
        <div class="blog-post" v-for="post in recentPosts(limit)" :key="post.id">
          <div v-if="post.better_featured_image" class="blog-post_thumbnail">
            <router-link :to="post.slug">
              <img class="featured-image" :src="post.better_featured_image.source_url">
            </router-link>
          </div>
          <div v-else>
            <p>no image available</p>
          </div>
          <div class="blog-post_content">
            <router-link :to="post.slug" v-html="post.title.rendered"></router-link>
            <p v-html="post.excerpt.rendered"></p>
          </div>
          <ul class="blog-post_details">
            <li>Icon: {{getCategory(post.categories[0])}}</li>
            <li>Icon: {{getAuthor(post.author)}}</li>
          </ul>
          <router-link :to="post.slug">
            <a class="blog-post_button">Read More</a>
          </router-link>
        </div>
      </div>
      <div class="loadmore">
        <b-button class="loadmore-button" @click="loadMore">Load More</b-button>
      </div>
    </div>
    <div v-else class="loading">
      <div class="loading-text">Loading...</div>
    </div>
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
      allCategories: "allCategories",
      allCategoriesLoaded: "allCategoriesLoaded",
      recentPosts: "recentPosts",
      recentPostsLoaded: "recentPostsLoaded",
      allUsers: "allUsers"
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
    },
    getCategory(id) {
      const cat = this.allCategories.find(cat => cat.id == id);
      if (cat) {
        return cat.name;
      }
    },
    getAuthor(id) {
      const author = this.allUsers.find(auth => auth.id == id);
      if (author) {
        return author.name;
      }
    }
  },
  mounted() {
    this.getPosts(this.limit);
    this.$store.dispatch("getAllUsers");
  }
};
</script>
<style lang="scss" scoped>
.blog {
  margin: 4rem auto 1rem;
  display: flex;
  justify-content: center;
  &-post {
    box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.1);
    width: 325px;
    margin: 0.5rem;
    padding: 0 0 3rem;
    position: relative;
    @media (max-width: 776px) {
      width: 100%;
    }
    &_thumbnail {
      img {
        width: 100%;
        height: auto;
        transition: all 200ms ease;
        &:hover {
          transform: scale(1.02);
          box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.1);
        }
      }
    }
    &_content {
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
    &_details {
      list-style: none;
      display: flex;
      width: 100%;
      padding: 0;
      li {
        margin: 0 0.25rem;
      }
    }
    &_button {
      position: absolute;
      width: 100%;
      height: 40px;
      padding-top: 0.5rem;
      bottom: 0;
      display: flex;
      justify-content: center;
      align-content: center;
      background-color: #2980b9;
      color: white !important;
      font-size: 14px;
      &:hover {
        cursor: pointer;
      }
    }
  }
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
