<template>
  <div id="nav">
    <router-link to="/login">Se connecter</router-link>
    <register />
  </div>
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