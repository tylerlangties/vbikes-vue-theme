<template></template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      showFooter: false
    };
  },
  computed: {
    ...mapGetters({
      isLoading: "isLoading"
    })
  },
  watch: {
    // watch the value of isLoading and once it's false hide the loader
    isLoading(val) {
      if (val == false) {
        let footer = document.getElementById("colophon");
        setTimeout(function() {
          footer.style.display = "block";
        }, 500);
      }
    }
  }
};
</script>

<style lang="scss">
.site-footer {
  display: none;
  background-color: #212121;
  padding-top: 4rem;
  .footer-mega-col-wrap {
    max-width: 1140px;
    margin-bottom: 2rem;
    @media (max-width: 992px) {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .widget {
        width: 100%;
        margin-bottom: 2rem;
      }
    }
    .textwidget {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      color: white;
      text-align: left;
      img {
        max-height: 8rem;
      }
      p {
        width: 100%;
        display: flex;
        justify-content: center;
      }
    }
    .instagram-pics {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      padding-left: 0;
      @media (max-width: 992px) {
      }
      li {
        margin: 0.25rem;
        img {
          max-height: 100px;
        }
      }
    }
  }
  .widget-title {
    text-align: center;
    color: white;
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
  .clear {
    text-align: center;
    a {
      padding: 0.375rem 0.75rem;
      background-color: #2980b9;
      color: white;
      transition: all 200ms ease;
      border-radius: 5px;
      border: 1px solid #2980b9;
      &:hover {
        background-color: transparent;
        text-decoration: none;
      }
    }
  }
}
</style>
