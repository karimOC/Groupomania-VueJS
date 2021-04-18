<template>
  <div>
    <form method="post" @submit.prevent="buttonNewComment">
      <div>
        <label for="comment"></label>
        <input
          type="text"
          id="comment"
          placeholder="Commentaire"
          v-model="comment"
        />
      </div>
      <button type="submit" @click.prevent="buttonNewComment">
        Envoyer <i class="far fa-comments"></i>
      </button>
    </form>
    <div class="error" v-if="error">
      {{ error.error }}
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "newComment",
  props: {
    id: Number,
  },
  data() {
    return {
      comment: "",
      error: "",
    };
  },
  methods: {
    buttonNewComment() {
      const data = {
        comment: this.comment,
      };
      let token = localStorage.getItem("token");
      axios
        .post(
          "http://localhost:3000/api/messages/" + this.id + "/comment/",
          data,
          {
            headers: { Authorization: "Bearer " + token },
          }
        )
        .then((res) => {
          console.log(res);
          this.$router.push("/oneMessage/" + this.id);
          document.location.reload();
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
  border: solid rgb(206, 206, 206) 1px;
  text-decoration: none;
  box-shadow: 10px 5px 9px #67708469;
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
  font-size: 11px;
  background-color: rgb(231, 185, 185);
  color: rgb(53, 21, 21);
  padding: 10px;
}
</style>