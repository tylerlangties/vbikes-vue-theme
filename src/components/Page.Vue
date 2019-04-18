<template>
  <div>
    <!-- <Titlebanner :title="pageContent.title.rendered"></Titlebanner> -->
    <template v-if="allPagesLoaded">
      <div class="content-body" v-html="pageContent.content.rendered"></div>
      <div class="content-body"></div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "page",
  data() {
    return {
      url: this.$route.params
      // id: this.pageContent.id
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
    $route(to, from) {
      console.log("change");
      if (this.pageContent.slug === "gallery") {
        console.log("true");
        this.$router.go();
      }
    }
  },

  components: {}
};
</script>

<style scoped>
.content-body {
  max-width: 1044px;
  margin: 0 auto;
  padding: 0.5rem;
}
</style>
