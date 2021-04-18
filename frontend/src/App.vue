<template>
  <div>
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

#nav {
  display: flex;
  justify-content: space-between;
  background-color: #192a48;
  height: 60px;
  padding: 20px;
  .links {
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-between;
    list-style: none;
    // width: 30%;
  }
  li {
    margin-right: 20px;
  }
  a {
    font-weight: bold;
    color: white;
    text-decoration: none;

    &.router-link-exact-active {
      color: #c46e78;
    }
  }
  a:hover {
    color: #677084;
  }
}
</style>
