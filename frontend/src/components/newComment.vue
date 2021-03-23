<template>
  <div>
    <form method="post" @submit.prevent="buttonNewComment">
      <div>
        <label for="comment"></label>
        <input
          type="text"
          id="comment"
          placeholder="Commentaire !"
          v-model="comment"
        />
      </div>
      <button type="submit" @click.prevent="buttonNewComment">Envoyer</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "newComment",
  data() {
    return {
        comment: "",
    };
  },
  methods: {
    buttonNewComment() {
      const data = {
        comment: this.comment,
      };
      let token = localStorage.getItem("token");
      axios
        .post("http://localhost:3000/api/messages/1/comment/", data, {
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          console.log(res);
          document.location.reload();
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
input {
  border: solid rgb(143, 143, 143) 1px;
  margin-bottom: 5px;
  width: 90%;
}
button {
  margin-bottom: 10px;
}
</style>