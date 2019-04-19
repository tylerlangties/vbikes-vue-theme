<template>
  <div>
    <template v-if="allPagesLoaded">
      <Banner :title="pageContent.title.rendered"></Banner>
      <div class="content-body" v-html="pageContent.content.rendered"></div>
      <div class="content-body">{{message}}</div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Banner from "./Banner.vue";
export default {
  name: "page",
  data() {
    return {
      id: this.pageContent.id
    };
  },
  computed: {
    ...mapGetters({
      page: "page",
      allPagesLoaded: "allPagesLoaded"
    }),
    pageContent() {
      return this.page(this.$route.params.pageSlug);
    }
  },
  watch: {
    $route(to, from, next) {
      console.log("change");
    }
  },

  components: {
    Banner
  }
};
</script>

<style scoped>
.content-body {
  max-width: 1044px;
  margin: 0 auto;
  padding: 4rem 0.5rem;
}
</style>
