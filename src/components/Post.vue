<template>
  <div v-if="post">
    <Banner :title="post.title.rendered"></Banner>
    <template>
      <div class="post">
        <div v-if="post.better_featured_image" class="post-featured-image">
          <img :src="post.better_featured_image.source_url">
        </div>
        <div class="post-content">
          <h1 class="post-title" v-html="post.title.rendered"></h1>
          <div class="post-body" v-html="post.content.rendered"></div>
          <div class="date-posted">{{ post.date | date }}</div>
          <div class="pagination">
            <div v-if="prevPost">
              <span>&lt;&lt; Prev |</span>
              <router-link :to="prevPost.slug" v-html="prevPost.title.rendered"></router-link>
            </div>
            <div v-else>This is the latest post!</div>
            <div v-if="nextPost">
              <router-link :to="nextPost.slug" v-html="nextPost.title.rendered">Prev Post</router-link>
              <span>| Next &gt;&gt;</span>
            </div>
            <div v-else>This is the first post!</div>
          </div>
        </div>
      </div>
    </template>
  </div>
  <div v-else class="loading">
    <h3>Loading...</h3>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import SETTINGS from "../settings";
import Banner from "./Banner.vue";

export default {
  name: "post",
  data() {
    return {
      post: false,
      loading: true,
      index: null,
      nextPost: null,
      prevPost: null
    };
  },
  components: {
    Banner
  },
  computed: {
    ...mapGetters({
      getPostIndex: "getPostIndex",
      getPostByIndex: "getPostByIndex",
      getPostBySlug: "getPostBySlug"
    })
  },
  beforeMount() {
    this.getPost();
  },
  mounted() {
    if (this.post == undefined) {
      this.getPostDirect();
    }
  },
  methods: {
    getPost() {
      this.post = this.getPostBySlug(this.$route.path);
      if (this.post) {
        this.getIndex();
      }
    },
    getIndex() {
      this.index = this.getPostIndex(this.post.id);
      this.getPagination();
    },
    getPagination() {
      this.getPrevPost();
      this.getNextPost();
      console.log("pag");
    },
    getPrevPost() {
      const prevPost = this.index - 1;
      this.prevPost = this.getPostByIndex(prevPost);
    },
    getNextPost() {
      const nextPost = this.index + 1;
      this.nextPost = this.getPostByIndex(nextPost);
    },
    getPostDirect() {
      axios
        .get(
          SETTINGS.API_BASE_PATH + "posts?slug=" + this.$route.params.postSlug
        )
        .then(response => {
          this.post = response.data[0];
          this.getIndex();
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
.loading {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-content: center;
}
.pagination {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 1rem;
  box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.1);
  padding: 2rem 1rem;
}
</style>
