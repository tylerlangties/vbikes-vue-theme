<template>
  <div class="container">
    <Header></Header>
    <router-view></router-view>
    <!-- <router-link to="/about">About</router-link> -->
  </div>
</template>

<script>
import Header from "./components/Header.vue";
export default {
  name: "App",
  data() {
    return {
      message: "do we update"
    };
  },
  components: {
    Header
  }
};
</script>

<style scoped lang="scss">
.container {
  width: 600px;
  margin: 50px auto;
  text-align: center;
  h1 {
    color: red;
    font-size: 15px;
  }
}
</style>