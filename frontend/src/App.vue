<template>
  <div>
    <router-view />
    <footer>
      <p>Copyright © 2021 Tous droits réservés | El Fakih Karim</p>
    </footer>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  background-color: #f1f1f1	;
}

#nav {
  display: flex;
  justify-content: space-between;
  background-color: #192a48;
  height: 60px;
  padding: 20px;
  p {
    color: white;
  }
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
    border-bottom: 2px solid white;
  
  }
}
footer {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #192a48;
  color: white;
  height: 60px;
  padding: 20px;
  margin-top: 50px;
}
</style>
