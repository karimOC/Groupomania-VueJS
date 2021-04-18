<template>
  <div>
    <nav id="nav">
      <ul class="links">
        <li>
          <router-link to="/feed">Retour</router-link>
        </li>
      </ul>
    </nav>
    <div>
    <h2>Profile</h2>
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
    <div class="error" v-if="error">
      {{ error.error }}
    </div>
    <button class="deletebtn" type="submit" @click.prevent="deleteProfile">
      Supprimer mon compte
    </button>
    <h4>Tout mes messages</h4>
    <div class="my-messages">
      <div
        class="my-message"
        v-for="myMessage in messagesProfile"
        :key="myMessage.id"
      >
        <h3>{{ myMessage.title }}</h3>
        <img
          :src="myMessage.image"
          :alt="myMessage.image"
          v-if="myMessage.image != null"
        /><br />
        <p>{{ myMessage.content }}</p>
        <deleteMessage :id="myMessage.id" />
      </div>
    </div>
  </div>
</template>


<script>
import deleteMessage from "./deleteMessage";
import axios from "axios";

export default {
  name: "profile",
  components: {
    deleteMessage,
  },
  props: {
    id: Number,
  },
  data() {
    return {
      token: "",
      error: "",
      userId: "",
      dataProfile: [],
      messagesProfile: [],
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
        })
        .catch((error) => {
          console.log({ error });
        });
    },
    loadMessagesProfile() {
      let token = localStorage.getItem("token");
      let userId = localStorage.getItem("id");
      axios
        .get("http://localhost:3000/api/auth/profile/" + userId + "/messages", {
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          this.messagesProfile = res.data;
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
          document.location.reload();
        })
        .catch((error) => {
          this.error = error.response.data;
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
          this.$router.push("/");
        })
        .catch((error) => {
          console.log({ error });
        });
    },
  },
  mounted() {
    this.loadProfile();
    this.loadMessagesProfile();
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
  margin-bottom: 50px;
}
.my-messages {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
  padding-bottom: 20px;
}
img {
  width: 90px;
  height: 90px;
}
.my-message {
  border: solid;
  margin: 15px;
  padding: 15px;
  font-size: 12px;
}
.error {
  font-size: 13px;
  background-color: rgb(231, 185, 185);
  color: rgb(53, 21, 21);
  margin-top: 30px;
  padding: 10px;
}
</style>