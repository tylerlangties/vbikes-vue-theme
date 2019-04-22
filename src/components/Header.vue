<template>
  <header>
    <Navigation :menu="menu"/>
  </header>
</template>

<script>
import axios from "axios";
import Navigation from "./Navigation.vue";
export default {
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
</style>
