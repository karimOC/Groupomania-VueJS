<template>
  <div>
    <div id="loadMessages">
      <div id="message-card" v-for="message in allMessages" :key="message.id">
        <h1 class="title">{{ message.title }}</h1>
        <div class="content">{{ message.content }}</div>
        <p></p>
        <div class="createdAt">
          <i>{{ moment(message.createdAt).fromNow() }}</i>
        </div>
        <div>
          <router-link class="one-message" :to="'/oneMessage/' + message.id"
            >Voir les commentaires</router-link
          >
        </div>
        <div class="adminDelete" v-if="isAdmin == true">
          <deleteMessage :id="message.id" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import deleteMessage from "./deleteMessage";
let moment = require("moment");
let jwt = require("jsonwebtoken");

import axios from "axios";

export default {
  name: "loadMessages",
  components: {
    deleteMessage,
  },
  data() {
    return {
      moment: moment,
      token: "",
      userId: localStorage.getItem("id"),
      isAdmin: "",
      allMessages: [],
      idUsers: "",
      title: "",
      content: "",
      createAt: "",
    };
  },
  methods: {
    loadFeed() {
      let token = localStorage.getItem("token");
      let decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
      axios
        .get("http://localhost:3000/api/messages/", {
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          this.allMessages = res.data;
          this.isAdmin = decodedToken.isAdmin;
        })
        .catch((error) => {
          console.log({ error });
        });
    },
  },
  mounted() {
    this.loadFeed();
  },
};
</script>

<style scoped>
#loadMessages {
  display: flex;
  align-items: center;
  flex-direction: column;
}
#message-card {
  width: 90%;
  border: solid 2px;
  margin: 15px;
  padding-bottom: 15px;
  line-height: normal;
}
a {
  text-decoration: none;
  color: black;
}
.title {
  padding-bottom: 15px;
}
h1 {
  border-bottom: solid 1px;
}
.content {
  font-size: 20px;
}
.createdAt {
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  border-bottom: dashed 1px;
  padding: 10px;
  margin-bottom: 15px;
}
.one-message {
  background-color: black;
  color: white;
  padding: 4px;
}
.adminDelete {
  margin: 10px;
}
</style>
