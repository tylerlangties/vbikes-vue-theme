<template>
  <header :class="{hidden: isLoading}">
    <Navigation :menu="menu"/>
  </header>
</template>

<script>
import axios from "axios";
import Navigation from "./Navigation.vue";
export default {
  props: ["isLoading"],
  data() {
    return {
      menu: false
    };
  },
  beforeMount() {
    this.fetchMenu();
  },
  methods: {
    fetchMenu() {
      axios
        .get("/wp-json/menus/v1/menus/main-menu")
        .then(response => {
          this.menu = response.data;
        })
        .catch(error => console.log("error"));
    }
  },
  components: {
    Navigation
  }
};
</script>

<style>
.hidden {
  opacity: 0;
  transform: translateY(-100px);
}
header {
  position: fixed;
  top: 0;
  z-index: 1000;
  width: 100%;
  transition: all 500ms ease;
}
</style>
