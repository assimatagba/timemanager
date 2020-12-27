<template>
  <nav class="navbar navbar-expand-lg bg-white header">
    <router-link to="/">
      <h1>Joshua</h1>
    </router-link>
    <Button
      class="navbar-toggler clear"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </Button>

    <div class="collapse navbar-collapse bg-white" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto ml-auto text-center">
        <li class="m-1">
          <Link
            text="Working Time"
            @click="$router.push(`/workingTimes/${currentUser.id}`).catch(()=>{})"
          />
        </li>
        <li class="m-1">
          <Link text="Log Time" @click="$router.push(`/clock/`).catch(()=>{})" />
        </li>
        <li v-if="this.$store.getters['auth/currentUserRole'] === 'manager'" class="m-1">
          <Link text="Manager panel" @click="$router.push(`/manager`).catch(()=>{})" />
        </li>
        <li v-if="this.$store.getters['auth/currentUserRole'] === 'admin'" class="m-1">
          <Link text="Admin panel" @click="$router.push(`/admin`).catch(()=>{})" />
        </li>
      </ul>
      <div class="my-2 my-lg-0 text-center">
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          class="bi bi-circle-fill"
          fill="green"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="8" cy="8" r="8" />
        </svg>
        <b class="mr-3 myaccount" @click="$router.push(`/user/${currentUser.id}`).catch(()=>{})"
          >Mon Compte</b
        >
        <Button text="Log out" class="clear" @click="userLogout" />
      </div>
    </div>
  </nav>
</template>

<script>
import Button from "./fields/Button";
import Link from "./fields/Link";
import store from '@/store/store'

export default {
  components: {
    Button,
    Link,
  },
  data: function () {
    return {
      hoverUser: false,
      currentUser: this.$store.getters["auth/currentUser"],
    };
  },
  methods: {
    userLogout: function () {
      store.dispatch("auth/LOG_OUT");
      this.$router.replace("/login");
    },
  },
  computed: {},
};
</script>

<style scoped>
h1 {
  font-size: 5vh;
  color: rgba(22, 22, 22, 0.815);
}

a {
  text-decoration: none;
}

.header {
  background: white;
  z-index: 100;
}

.myaccount {
  cursor: pointer;
  padding-right: 2px;
  padding-left: 2px;
  margin: 7px;
  font-size: 100%;
  font-weight: bolder;
  color: black;
  transition: all 0.1s ease;
  box-sizing: border-box;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

.myaccount:hover {
  background-color: white;
  color: black;
  font-weight: bolder;
  transform: translate(1px, -2px);
}
</style>
