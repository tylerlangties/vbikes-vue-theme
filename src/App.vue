<template>
  <div>
    <Header limit="5"></Header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
export default {
  name: "App",
  data() {
    return {};
  },
  beforeRouteUpdate(to, from, next) {
    console.log("beforeRouteUpdate");
  },
  components: {
    Header
  }
};
</script>

<style scoped lang="scss">
</style>