<template>
  <div>
    <div id="nav"><router-link to="/feed">Retour</router-link></div>
    <div id="profile">
      <div id="profile-card" v-for="info in dataProfile" :key="info.id">
        <div class="email">{{ info.email }}</div>
        <div class="name">
          {{ info.name }}
        </div>
        <div class="firstname">
          {{ info.firstname }}
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "profile",
  data() {
    return {
      data: {
        token: "",
        dataProfile: [],
        id: "",
        email: "",
        name: "",
        firstname: "",
      },
    };
  },
  methods: {
    loadProfile() {
      let token = localStorage.getItem("token");
      axios
        .get("http://localhost:3000/api/auth/profile/5", {
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          this.dataProfile = res.data;
          console.log(this.dataProfile);
        })
        .catch((error) => {
          console.log({ error });
        });
    },
  },
  mounted() {
    this.loadProfile();
  },
};
</script>

<style scoped>
#profile {
  display: flex;
  align-items: center;
  flex-direction: column;
}
#profile-card {
  width: 50%;
  border: solid 1px;
  margin-top: 15px;
  padding: 10px;
}
</style>