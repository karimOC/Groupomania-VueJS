<template>
  <div>
    <h4>Envoyer un message</h4>
    <form method="post" @submit.prevent="buttonNewMessage">
      <div>
        <label for="title"></label>
        <input type="title" id="title" placeholder="Titre" v-model="title" />
      </div>
      <div>
        <label for="content"></label>
        <textarea
          type="text"
          id="content"
          placeholder="Votre message !"
          rows="5"
          cols="33"
          v-model="content"
        />
      </div>
      <button type="submit" @click.prevent="buttonNewMessage">Envoyer</button>
      <div class="error" v-if="error">
        {{ error.error }}
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "newMessage",
  data() {
    return {
      title: "",
      content: "",
      error: "",
    };
  },
  methods: {
    buttonNewMessage() {
      const data = {
        title: this.title,
        content: this.content,
      };
      let token = localStorage.getItem("token");
      axios
        .post("http://localhost:3000/api/messages/", data, {
          headers: { Authorization: "Bearer " + token },
        })
        .then(() => {
          alert("Votre message a bien été envoyé !");
          document.location.reload();
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
input {
  border: solid rgb(143, 143, 143) 1px;
  margin-bottom: 5px;
  width: 60%;
}
textarea {
  width: 60%;
}
.error {
  font-size: 13px;
  background-color: rgb(231, 185, 185);
  color: rgb(53, 21, 21);
  margin: 20px;
  padding: 10px;
}
</style>