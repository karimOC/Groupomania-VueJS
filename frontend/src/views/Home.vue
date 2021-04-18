<template>
  <div>
    <nav id="nav">
      <img src="../assets/logo.png" alt="logo" />
      <ul class="links">
        <li>
          <router-link to="/login">Se connecter</router-link>
        </li>
      </ul>
    </nav>
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