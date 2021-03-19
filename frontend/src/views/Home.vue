<template>
  <div class="home">
    <h3 v-if="user">Bonjour, {{ user.name }} {{ user.firstname }}</h3>
    <h3 v-if="!user">Vous n'êtes pas connecté !</h3>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      user: null,
    };
  },
  methods: {
    async create() {
      let token = JSON.parse(window.localStorage.getItem("token"));
      const response = await axios.get("user", {
        headers: {
          Authorization: "Bearer" + token,
        },
      });
      console.log(response);
    },
  },
};
</script>
