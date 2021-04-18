<template>
  <div class="login">
    <nav id="nav">
      <img src="../assets/logo.png" alt="logo" />
      <ul class="links">
        <li>
          <router-link to="/">S'enregistrer</router-link>
        </li>
      </ul>
    </nav>
    <h2>Connection</h2>
    <form method="post" @submit.prevent="buttonLogin">
      <div>
        <label for="email"></label>
        <input type="email" placeholder="email@exemple.com" v-model="email" />
      </div>
      <div>
        <label for="password"></label>
        <input
          type="password"
          placeholder="Votre mot de passe"
          v-model="password"
        />
      </div>
      <button type="submit">Se connecter</button>
    </form>
    <div class="error" v-if="error">
      {{ error.error }}
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "login",
  data() {
    return {
      token: "",
      email: "",
      password: "",
      userId: "",
      error: "",
    };
  },
  methods: {
    async buttonLogin() {
      await axios
        .post("http://localhost:3000/api/auth/login", {
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("id", res.data.userId);
          }
          this.$router.push("/feed");
        })
        .catch((error) => {
          this.error = error.response.data;
        });
    },
  },
};
</script>

<style scoped>
.formulaire {
  display: flex;
  flex-direction: column;
  align-items: center;
}
input {
  border: solid rgb(206, 206, 206) 1px;
  text-decoration: none;
  box-shadow: 10px 5px 9px #67708428;
  margin-bottom: 20px;
  width: 50%;
}
button {
  background-color: #192a48;
  color: white;
  padding: 6px;
  margin-bottom: 10px;
  border: none;
  text-decoration: none;
}
.error {
  font-size: 13px;
  background-color: rgb(231, 185, 185);
  color: rgb(53, 21, 21);
  margin-top: 30px;
  padding: 10px;
}
</style>
