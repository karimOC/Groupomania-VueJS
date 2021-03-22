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
          v-model="content"
        />
      </div>
      <button type="submit" @click.prevent="buttonNewMessage">Envoyer</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "newMessage",
  data() {
    return {
      data: {
        title: "",
        content: "",
      },
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
        .then((res) => {
          console.log(res);
          alert("Votre message a bien été envoyé !");
          document.location.reload();
          this.$router.push("/feed");
        })
        .catch((error) => {
          console.log({ error });
        });
    },
  },
  mounted() {
    this.buttonNewMessage();
  },
};
</script>

<style scoped>
input {
  border: solid rgb(143, 143, 143) 1px;
  margin-bottom: 5px;
  width: 30%;
}
textarea {
  width: 30%;
}
button {
  margin-bottom: 50px;
}
</style>