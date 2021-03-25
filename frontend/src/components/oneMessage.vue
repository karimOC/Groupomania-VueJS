<template>
  <div>
    <div id="nav"><router-link to="/feed">Retour</router-link></div>
    <div id="oneMessage">
      <div id="comment-card" v-for="comment in allComments" :key="comment.id">
        <div class="content">{{ comment.comment }}</div>
        <p></p>
        <div class="createdAt">
          <i>{{ moment(comment.createdAt).fromNow() }}</i>
          <i>{{ comment.User.name }} {{ comment.User.firstname }}</i>
        </div>
        <div v-if="comment.idUsers == userId">
          <deleteComment :idComm="comment.id" />
        </div>
        <div v-if="isAdmin == true">
          <deleteComment :idComm="comment.id" />
        </div>
      </div>
    </div>
    <div class="commentaire">
      <newComment :id="id" />
    </div>
  </div>
</template>


<script>
let moment = require("moment");
import newComment from "./newComment";
import deleteComment from "./deleteComment";
let jwt = require("jsonwebtoken");

import axios from "axios";

export default {
  name: "oneMessage",
  components: {
    deleteComment,
    newComment,
  },
  data() {
    return {
      moment: moment,
      token: "",
      isAdmin: "",
      id: this.$route.params.id,
      userId: localStorage.getItem("id"),
      allComments: [],
    };
  },
  methods: {
    loadComments() {
      let token = localStorage.getItem("token");
      let decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
      axios
        .get("http://localhost:3000/api/messages/" + this.id + "/comments/", {
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          this.allMessages = res.data;
          this.isAdmin = decodedToken.isAdmin;
          this.allComments = res.data;
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
  font-size: 20px;
  width: 90%;
  border: solid 2px;
  margin-bottom: 15px;
  padding: 10px;
}
.comment {
  font-size: 20px;
}
.createdAt {
  font-size: 12px;
  display: flex;
  justify-content: space-between;
}
.commentaire {
  margin: 15px;
}
</style>