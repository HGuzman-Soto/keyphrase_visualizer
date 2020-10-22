<template>
  <div>
    <div v-if="loading">
      <p>Loading ...</p>
    </div>
    <div v-else>
      <p class="joke">{{ joke }}</p>

      <button @click="likeJoke" :disabled="likeButtonDisabled">
        Like Joke
      </button>
      <button @click="logJokes" class="btn">Log Jokes</button>
      <button @click="clearStorage" class="btn">Clear Storage</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      loading: true,
      joke: "",
      likeButtonDisabled: false,
    };
  },
  methods: {
    likeJoke() {
      chrome.storage.local.get("jokes", (res) => {
        if (!res.jokes) res.jokes = [];
        res.jokes.push(this.joke);
        chrome.storage.local.set(res);
        this.likeButtonDisabled = true;
      });
    },
    logJokes() {
      chrome.storage.local.get("jokes", (res) => {
        if (res.jokes) res.jokes.map((joke) => console.log(joke));
      });
    },
    clearStorage() {
      chrome.storage.local.clear();
    },
  },
  mounted() {
    axios
      .get("https://icanhazdadjoke.com/", {
        headers: { Accept: "application/json" },
      })
      .then((res) => {
        this.joke = res.data.joke;
        this.loading = false;
      });
  },
};
</script>

<style scoped>
body {
  height: 98vh;
  text-align: center;
  color: #353638;
  font-size: 22px;
  line-height: 22px;
  font-family: Georgia, serif;
  background-size: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.joke {
  max-width: 800px;
}
</style>
