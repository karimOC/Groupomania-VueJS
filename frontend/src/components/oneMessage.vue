<template>
  <div id="nav">
    <router-link to="/feed">Accueil </router-link> |
    <router-link to="/login"> Profil</router-link> |
    <a to="/login" v-on:click="Logout()"> Déconnexion</a>
  </div>
  <div>
    <div id="oneMessage">
      <div id="message-card" v-for="comment in allComments" :key="comment.id">
        <div class="content">{{ comment.comment }}</div>
        <p></p>
        <div class="createdAt">
          {{ comment.createdAt }}
        </div>
      </div>
    </div>
  </div>
  <router-view />
</template>


<script>
import axios from "axios";

export default {
  name: "feed",
  props: {
    idUsers: Number,
    idMessages: Number,
    comment: String,
    createAt: Date,
  },
  data() {
    return {
      data: {
        token: "",
        allComments: [],
        id: "",
        idUsers: "",
        idMessages: "",
        comments: "",
        createAt: "",
      },
    };
  },
  methods: {
    loadMessage() {
      let token = localStorage.getItem("token");
      axios
        .get("http://localhost:3000/api/messages/2/comments/", {
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
    Logout() {
      localStorage.clear();
      this.$router.push("/login");
    },
  },
  mounted() {
    this.loadMessage();
  },
};
</script>

<style scoped>
#oneMessage {
  display: flex;
  align-items: center;
  flex-direction: column;
}
#message-card {
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