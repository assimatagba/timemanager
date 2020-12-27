<template>
  <div>
    <div class="header">
      <Header />
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "../components/Header";

export default {
  name: "LoginPage",
  components: {
    Header,
  },
};
</script>

<style>
.header {
  height: 13vh;
}
</style>
