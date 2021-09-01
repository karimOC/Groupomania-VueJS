<template>
  <div>
    <button type="submit" @click.prevent="onLike">
      <i class="far fa-thumbs-up"></i>
      <!-- <i v-if="like === 1" class="fas fa-thumbs-up"></i> -->
    </button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "like",
  props: {
    idMess: Number,
  },
  data() {
    return {
      token: "",
    };
  },
  methods: {
    onLike() {
      let token = localStorage.getItem("token");
      axios
        .post(
          "http://localhost:3000/api/messages/" + this.idMess + "/like/",
          [],
          {
            headers: { Authorization: "Bearer " + token },
          }
        )
        .then((res) => {
          console.log(res);
          document.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
button {
  border: none;
  background: none;
  text-decoration: none;
  color: white;
}
</style>