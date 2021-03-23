<template>
  <div>
    <div id="loadMessages">
      <div id="message-card" v-for="message in allMessages" :key="message.id">
        <router-link class="one-message" :to="'/oneMessage/' + message.id"
          >Voir le message</router-link
        >
        <h2 class="title">{{ message.title }}</h2>
        <div class="content">{{ message.content }}</div>
        <p></p>
        <div class="createdAt">
          {{ message.createdAt }}
        </div>
        <div class="commentaire">
          <newComment :id="message.id" />
        </div>
        <div>
          <deleteMessage :id="message.id" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import newComment from "./newComment";
import deleteMessage from "./deleteMessage";
import axios from "axios";

export default {
  name: "loadMessages",
  components: {
    newComment,
    deleteMessage,
  },
  data() {
    return {
      token: "",
      userId: localStorage.getItem("id"),
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
      axios
        .get("http://localhost:3000/api/messages/", {
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          this.allMessages = res.data;
          console.log(this.allMessages);
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
  width: 50%;
  border: solid 2px;
  margin-bottom: 15px;
  padding: 10px;
  line-height: normal;
}
a {
  text-decoration: none;
  color: black;
}
h2 {
  padding-bottom: 15px;
  border-bottom: solid 1px;
}
.content {
  font-size: 20px;
}
.createdAt {
  font-size: 11px;
  display: flex;
  justify-content: space-between;
}
.commentaire {
  margin-top: 15px;
}
.one-message {
  background-color: black;
  color: white;
  padding: 4px;
}
</style>
