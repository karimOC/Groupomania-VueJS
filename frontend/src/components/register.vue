<template>
  <div class="register">
    <h2>Inscription</h2>
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
          console.log({ error });
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
  border: solid rgb(143, 143, 143) 1px;
  margin-bottom: 15px;
  width: 20%;
}
</style>
