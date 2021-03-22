<template>
  <div>
    <a href="/"><img id="logo" src="./assets/logo.png" alt="logo" /></a>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
}

#logo {
  width: 300px;
}

#nav {
  padding: 20px;
  a {
    font-weight: bold;
    color: black;
    text-decoration: none;

    &.router-link-exact-active {
      color: #fd2d01;
    }
  }
}
</style>
