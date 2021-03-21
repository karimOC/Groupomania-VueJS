<template>
  <div id="nav">
    <router-link to="/feed">Accueil </router-link> |
    <router-link to="/login"> Profil</router-link> |
    <a to="/login" v-on:click="Logout()"> Déconnexion</a>
  </div>
  <div>
    <div id="feed">
      <div id="message-card" v-for="message in allMessages" :key="message.id">
        <h3 class="title">{{ message.title }}</h3>
        <div class="content">{{ message.content }}</div>
        <p></p>
        <div class="createdAt">
          {{ data.name }} {{ data.firstname }}
          {{ message.createdAt }}
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
    title: String,
    content: String,
    createAt: Date,
  },
  data() {
    return {
      data: {
        token: "",
        name: localStorage.getItem("userName"),
        firstname: localStorage.getItem("userFirstname"),
        allMessages: [],
        idUsers: "",
        title: "",
        content: "",
        comments: [],
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
    // loadUsers() {
    //   let token = localStorage.getItem("token");
    //   axios
    //     .get("http://localhost:3000/api/auth/profile/", {
    //       headers: { Authorization: "Bearer " + token },
    //     })
    //     .then((res) => {
    //       console.log(res.data);
    //     })
    //     .catch((error) => {
    //       console.log({ error });
    //     });
    // },
  },
  mounted() {
    this.loadFeed();
    // this.loadUsers();
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
}
.content {
  font-size: 20px;
}
.createdAt {
  font-size: 11px;
  display: flex;
  justify-content: space-between;
}
</style>