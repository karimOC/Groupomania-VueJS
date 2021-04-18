<template>
  <div class="feed">
    <form method="post" @submit.prevent="buttonNewMessage">
      <h2>Envoyer un message</h2>
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
      <div>
        <label for="File">(Faclultatif)</label><br />
        <input type="file" ref="file" @change="selectFile()" />
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
      file: null,
      error: "",
    };
  },
  methods: {
    buttonNewMessage() {
      let token = localStorage.getItem("token");
      const data = new FormData();
      if (this.file !== null) {
        data.append("title", this.title);
        data.append("content", this.content);
        data.append("image", this.file, this.file.name);
      } else {
        data.append("title", this.title);
        data.append("content", this.content);
      }
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
    selectFile() {
      this.file = this.$refs.file.files[0];
    },
  },
};
</script>

<style scoped>
.feed {
  display: flex;
  flex-direction: column;
  align-items: center;
}
form {
  background-color: #192a48;
  width: 50%;
  padding: 10px;
  color: white;
  margin-bottom: 40px;
}
input {
  border: solid rgb(143, 143, 143) 1px;
  margin-bottom: 5px;
  width: 80%;
}
textarea {
  width: 80%;
  margin-bottom: 10px;
}
label {
  font-size: 12px;
}
button {
  margin-top: 30px;
  margin-bottom: 20px;
}
.error {
  font-size: 13px;
  background-color: rgb(231, 185, 185);
  color: rgb(53, 21, 21);
  margin: 20px;
  padding: 10px;
}
</style>