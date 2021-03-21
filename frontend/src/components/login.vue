<template>
  <div class="login">
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
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "login",
  data() {
    return {
      data: {
        token: "",
        email: "",
        password: "",
      },
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
            localStorage.setItem("userName", res.data.name);
            localStorage.setItem("userFirstname", res.data.firstname);
          }
          this.$router.push("/feed");
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
