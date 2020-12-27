<template>
  <b-container>
    <div v-for="user in users" v-bind:key="user.id">
      <AdminRowUser :current-user-role="currentRole" :id="user.id" :username="user.username" :email="user.email" :role="user.role"/>
    </div>
  </b-container>
</template>

<script>
import AdminRowUser from "../components/AdminRowUser";

export default {
  name: "AdminPage",
  components: { AdminRowUser },
  data() {
    return {
      users: null,
      currentRole: null
    }
  },
  async beforeMount() {
    let users = await this.$store.dispatch('users/GET_ALL_USER');
    this.currentRole = this.$store.getters['auth/currentUserRole'];
    this.users = users.data.data
  }
};
</script>

<style scoped>
.tabs-corps {
  border: 0.223em solid #eeeeee;
}

.tabs-start {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.223em solid #eeeeee;
  border-top: 0px;
  border-bottom: 0px;
  border-left: 0px;
}

.tabs-end {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.223em solid #eeeeee;
  border-top: 0px;
  border-bottom: 0px;
  border-right: 0px;
}

.tabs {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.223em solid #eeeeee;
  border-top: 0px;
  border-bottom: 0px;
}
</style>