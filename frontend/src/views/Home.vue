<template>
  <div id="nav">
    <router-link to="/login">Se connecter</router-link>
  </div>
  <div class="home">
    <register />
  </div>
  <router-view />
</template>

<script>
import register from "../components/register";

export default {
  name: "Home",
  components: {
    register,
  },
};
</script>
