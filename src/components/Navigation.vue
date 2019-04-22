<template>
  <div v-if="menu">
    <b-navbar class="nav" toggleable="lg" type="dark">
      <b-navbar-brand href="/">
        <!-- <img src="http://localhost:8888/wp-content/uploads/2019/04/favicon-light.png" alt="vbikes"> -->
        <object
          type="image/svg+xml"
          data="http://localhost:8888/wp-content/uploads/2019/04/favicon-light.svg"
          class="logo"
        ></object>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item v-for="item in menu.items" :key="item.id">
            <router-link :to="getURLPath(item.url)">{{item.title}}</router-link>
          </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  props: ["menu"],
  methods: {
    getURLPath(url) {
      var m = url.match(
          /^(([^:\/?#]+:)?(?:\/\/((?:([^\/?#:]*):([^\/?#:]*)@)?([^\/?#:]*)(?::([^\/?#:]*))?)))?([^?#]*)(\?[^#]*)?(#.*)?$/
        ),
        r = {
          hash: m[10] || "", // #asd
          host: m[3] || "", // localhost:257
          hostname: m[6] || "", // localhost
          href: m[0] || "", // http://username:password@localhost:257/deploy/?asd=asd#asd
          origin: m[1] || "", // http://username:password@localhost:257
          pathname: m[8] || (m[1] ? "/" : ""), // /deploy/
          port: m[7] || "", // 257
          protocol: m[2] || "", // http:
          search: m[9] || "", // ?asd=asd
          username: m[4] || "", // username
          password: m[5] || "" // password
        };
      r.href = r.origin + r.pathname + r.search + r.hash;
      return r.pathname;
    }
  }
};
</script>

<style scoped lang="scss">
a {
  color: white;
}
.nav {
  /* position: fixed;
  z-index: 20;
  width: 100%; */
}
.navbar {
  background-color: #212121;
}
.logo {
  max-height: 3rem;
  transition: all 200ms ease;
  &:hover {
    transform: scale(1.05);
  }
}
img {
  max-height: 3rem;
}
</style>
