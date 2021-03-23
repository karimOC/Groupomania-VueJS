<template>
  <div>
    <div id="nav"><router-link to="/feed">Retour</router-link></div>
    <div>
      <p>
        <u>E-mail</u>:
        {{ dataProfile.email }}
      </p>
      <p>
        <u>Nom et prénom</u>: {{ dataProfile.name }} {{ dataProfile.firstname }}
      </p>
    </div>
    <form method="post" @submit.prevent="updateProfile">
      <div>
        <label for="name"></label>
        <input type="name" id="name" placeholder="Nom" v-model="name" />
      </div>
      <div>
        <label for="firstname"></label>
        <input
          type="firstname"
          id="firstname"
          placeholder="Prénom"
          v-model="firstname"
        />
      </div>
      <button type="submit" @click.prevent="updateProfile">Modifier</button>
    </form>
    <button class="deletebtn" type="submit" @click.prevent="deleteProfile">
      Supprimer mon compte
    </button>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "profile",
  data() {
    return {
        token: "",
        userId: "",
        dataProfile: [],
        id: "",
        email: "",
        name: "",
        firstname: "",
    };
  },
  methods: {
    loadProfile() {
      let token = localStorage.getItem("token");
      let userId = localStorage.getItem("id");
      axios
        .get("http://localhost:3000/api/auth/profile/" + userId, {
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          this.dataProfile = res.data;
          console.log(this.dataProfile);
        })
        .catch((error) => {
          console.log({ error });
        });
    },
    updateProfile() {
      let token = localStorage.getItem("token");
      let userId = localStorage.getItem("id");
      const data = {
        name: this.name,
        firstname: this.firstname,
      };
      axios
        .put("http://localhost:3000/api/auth/profile/" + userId, data, {
          headers: { Authorization: "Bearer " + token },
        })
        .then(() => {
          alert("Votre profil a bien été mis à jour !");
        })
        .catch((error) => {
          console.log({ error });
        });
    },
    deleteProfile() {
      let token = localStorage.getItem("token");
      let userId = localStorage.getItem("id");
      axios
        .delete("http://localhost:3000/api/auth/profile/" + userId, {
          headers: { Authorization: "Bearer " + token },
        })
        .then(() => {
          alert("Votre compte est supprimé !");
          this.$router.push("/register");
        })
        .catch((error) => {
          console.log({ error });
        });
    },
  },
  mounted() {
    this.loadProfile();
  },
};
</script>

<style scoped>
form {
  margin-top: 30px;
}
input {
  margin-bottom: 10px;
}
.deletebtn {
  background-color: rgb(255, 80, 80);
  margin-top: 20px;
}
</style>