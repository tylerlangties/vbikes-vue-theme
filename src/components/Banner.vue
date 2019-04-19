<template>
  <div class="title-banner">
    <h2>{{title}}</h2>
    <div v-for="item in items" :key="item.text">{{item.text}}</div>
    <div @click="increment++">clicky</div>
    <div>{{increment}}</div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    required: true
  },
  data() {
    return {
      increment: 0,
      items: [
        {
          text: "Home"
        },
        {
          text: this.title
        }
      ]
    };
  }
};
</script>

<style scoped lang="scss">
.title-banner {
  width: 100%;
  height: 200px;
  display: flex;
  background-image: url("https://images.unsplash.com/photo-1476631840528-13bdc7f18072?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  /* margin-top: 63px; */
  h2 {
    width: 250px;
    margin: 0;
    padding: 0;
  }
}
</style>