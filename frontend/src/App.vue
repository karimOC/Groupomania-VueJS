<template>
  <a href="/">
    <img id="logo" alt="Vue logo" src="./assets/icon-left-font.png" />
  </a>
  <div id="nav">
    <router-link to="/">Accueil</router-link>
    <router-link to="/addpost">Créer un post</router-link>
    <router-link to="/myprofile">Mon Profil</router-link>
    <router-link to="/logout">Déconnecter</router-link>
  </div>
  <router-view />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: black;
}

#nav {
  padding: 15px;

  a {
    margin-right: 20px;
    font-weight: bold;
    color: black;
    text-decoration: none;

    &.router-link-exact-active {
      color: #fd2d01;
    }
  }
}

#logo {
  display: flex;
  align-content: left;
  width: 200px;
}
</style>
