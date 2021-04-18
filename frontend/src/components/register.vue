<template>
  <div class="register">
    <h1>Inscription</h1>
    <form method="post" @submit.prevent="buttonSignup">
      <div>
        <label for="email"></label>
        <input
          type="email"
          id="email"
          placeholder="email@exemple.com"
          v-model="email"
        />
      </div>
      <div>
        <label for="name"></label>
        <input type="text" id="nom" placeholder="Nom" v-model="name" />
      </div>
      <div>
        <label for="firsname"></label>
        <input
          type="text"
          id="prénom"
          placeholder="Prénom"
          v-model="firstname"
        />
      </div>
      <div>
        <label for="password"></label>
        <input
          type="password"
          id="password-input"
          placeholder="Votre mot de passe"
          v-model="password"
        />
      </div>
      <button type="submit" @click.prevent="buttonSignup">S'inscrire</button>
    </form>
    <div class="error" v-if="error">
      {{ error.error }}
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "register",
  data() {
    return {
      email: "",
      name: "",
      firstname: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async buttonSignup() {
      const data = {
        email: this.email,
        name: this.name,
        firstname: this.firstname,
        password: this.password,
      };
      await axios
        .post("http://localhost:3000/api/auth/signup", data)
        .then((res) => {
          console.log(res);
          this.$router.push("/login");
        })
        .catch((error) => {
          this.error = error.response.data;
          console.log(error.response.data);
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
