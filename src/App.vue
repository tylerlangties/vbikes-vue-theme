<template>
  <div>
    <Header></Header>
    <transition
      name="loader-animation"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <progress-bar :show-loader="showLoader" :loader-style="loaderStyle"/>
    </transition>

    <router-view></router-view>
    <Footer :isLoading="isLoading"></Footer>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import ProgressBar from "./components/ProgressBar.vue";
export default {
  name: "App",
  data() {
    return {
      showLoader: true
    };
  },
  computed: {
    ...mapGetters({
      isLoading: "isLoading",
      loadingProgress: "loadingProgress"
    }),

    loaderStyle() {
      return `width: ${this.loadingProgress}%;`;
    }
  },
  beforeRouteUpdate(to, from, next) {
    console.log("beforeRouteUpdate");
  },
  components: {
    Header,
    Footer,
    ProgressBar
  },
  watch: {
    // watch the value of isLoading and once it's false hide the loader
    isLoading(val) {
      if (val == false) {
        let self = this;
        setTimeout(function() {
          self.showLoader = false;
        }, 1000);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.loader {
  position: fixed;
  top: 0;
  width: 100%;
  height: 3px;
  z-index: 1000000;
}

.loader .progress-bar {
  background: var(--brandTertiary);
  height: 3px;
  transition: all 0.25s;
}

.loader-animation-leave-active {
  transition: delay 1s;
}
</style>