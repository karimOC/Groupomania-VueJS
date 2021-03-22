<template>
  <div>
    <div id="nav">
      <router-link to="/feed">Accueil </router-link> |
      <router-link to="/profile"> Profil</router-link> |
      <a to="/login" v-on:click="Logout()"> Déconnexion</a>
    </div>
    <div>
      <newMessage />
    </div>
    <div>
      <div id="feed">
        <div id="message-card" v-for="message in allMessages" :key="message.id">
          <a href="">
            <h2 class="title">{{ message.title }}</h2>
            <div class="content">{{ message.content }}</div>
            <p></p>
            <div class="createdAt">
              {{ message.createdAt }}
            </div>
          </a>
          <div class="commentaire">
            <newComment />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import newMessage from "./newMessage";
import newComment from "./newComment";
import axios from "axios";

export default {
  name: "feed",
  components: {
    newMessage,
    newComment,
  },
  data() {
    return {
      data: {
        token: "",
        allMessages: [],
        id: "",
        idUsers: "",
        title: "",
        content: "",
        createAt: "",
      },
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
    Logout() {
      localStorage.clear();
      this.$router.push("/login");
    },
  },
  mounted() {
    this.loadFeed();
  },
};
</script>

<style scoped>
#feed {
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
</style>