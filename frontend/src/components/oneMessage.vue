<template>
  <div>
    <div id="nav"><router-link to="/feed">Retour</router-link></div>
    <div id="oneMessage">
      <div id="comment-card" v-for="comment in allComments" :key="comment.id">
        <div class="content">{{ comment.comment }}</div>
        <p></p>
        <div class="createdAt">
          {{ comment.createdAt }}
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "oneMessage",
  data() {
    return {
      token: "",
      id: this.$route.params.id,
      allComments: [],
      oneMessage: [],
      idUsers: "",
      idMessages: "",
      comments: "",
      createAt: "",
    };
  },
  methods: {
    loadComments() {
      let token = localStorage.getItem("token");
      axios
        .get("http://localhost:3000/api/messages/" + this.id + "/comments/", {
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          this.allComments = res.data;
          console.log(this.allComments);
        })
        .catch((error) => {
          console.log({ error });
        });
    },
  },
  mounted() {
    this.loadComments();
  },
};
</script>

<style scoped>
#oneMessage {
  display: flex;
  align-items: center;
  flex-direction: column;
}
#comment-card {
  background-color: black;
  color: white;
  width: 50%;
  border: solid 2px;
  margin-bottom: 15px;
  padding: 10px;
}
.comment {
  font-size: 20px;
}
.createdAt {
  font-size: 11px;
  display: flex;
  justify-content: space-between;
}
</style>