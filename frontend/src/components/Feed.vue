<template>
  <div class="feed">
    <h2>Feed</h2>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "feed",
  data() {
    return {
      data: {
        allMessages: "",
        message: {
          idUsers: "",
          title: "",
          content: "",
          comments: [],
          createAt: "",
        },
      },
    };
  },
  methods: {
    loadFeed() {
      axios
        .get("http://localhost:3000/api/messages/", {
          headers: { Authorization: "Bearer " + this.token },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log({ error });
        });
    },
  },
  mounted() {
    this.buttonLogin();
  },
};
</script>

<style scoped>
</style>
