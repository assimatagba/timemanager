<template>
  <b-container>
    <b-row>
      <b-col xl="3" lg="4" md="4" sm="5" class="text-center">
        <img :src="avatarUrl" alt="userImg" />
      </b-col>
      <b-col class="data-container">
        <b-container fluid>
          <b-row v-if="!update">
            <b-col cols="10">
              <b-row>
                <h1>{{ user.username }}</h1>
                <h1>{{ user.email }}</h1>
              </b-row>
            </b-col>
            <b-col cols="2" class="update-profil-container">
              <div class="update-profil" @click="update = true">
                <svg
                  width="2em"
                  height="2em"
                  viewBox="0 0 16 16"
                  class="bi bi-pencil-fill"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"
                  />
                </svg>
              </div>
            </b-col>
          </b-row>
          <b-row v-else class="mt-3">
            <b-col cols="10">
              <b-row>
                <Input
                  placeholder="username"
                  type="text"
                  v-model="user.username"
                  class="m-1"
                />
                <Input
                  placeholder="Email"
                  type="text"
                  class="m-1"
                  v-model="user.email"
                />
              </b-row>
            </b-col>
            <b-col class="update-profil-container">
              <div class="update-profil" @click="update = false">
                <svg
                  width="2em"
                  height="2em"
                  viewBox="0 0 16 16"
                  class="bi bi-pencil-fill"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"
                  />
                </svg>
              </div>
            </b-col>
          </b-row>
<!--          <b-row>-->
<!--            <h4>you work this month : 313 hours</h4>-->
<!--            <h4>you work this week : 25 hours</h4>-->
<!--          </b-row>-->
        </b-container>
      </b-col>
    </b-row>
    <transition name="fade">
      <b-container fluid class="mt-3" v-if="update">
        <b-row class="mb-4">
          <b-col cols="12" sm="5">
            <Input
              placeholder="New Password"
              type="password"
              class="w-100 mt-1"
              v-model="user.newPassword"
            />
          </b-col>
          <b-col cols="12" sm="5">
            <Input
              placeholder="Confirme new Password"
              type="password"
              class="w-100 mt-1"
              v-model="user.passwordConfirmation"
            />
          </b-col>
          <b-col cols="12" sm="2">
            <Button
              text="Change"
              class="clear w-100 mt-1"
              @click="updateUser()"
            />
          </b-col>
        </b-row>
        <Button
          text="delete account"
          class="w-100"
          @click="deleteUser()"
        />
      </b-container>
    </transition>
    <CharBarWorkingTimes :data="this.data" v-model="this.userid" :id="this.userid" page="user"></CharBarWorkingTimes>
  </b-container>
</template>

<script>
import Input from "../components/fields/Input";
import Button from "../components/fields/Button";
import CharBarWorkingTimes from "@/components/CharBarWorkingTimes";
import store from "@/store/store";

import avatar from "cartoon-avatar";
export default {
  name: "UserPage",
  components: {
    Input,
    Button,
    CharBarWorkingTimes,
  },
  props: {
    userid: {
      type: String,
      defautl: null,
      required: false,
    },
  },
  data() {
    return {
      id: 1,
      data: null,
      avatarUrl: avatar.generate_avatar(),
      update: false,
      user: {
        id: 1,
        username: "John",
        email: "test@yahoo.fr",
        newPassword: "",
        passwordConfirmation: "",
        role: "employee",
      },
      barData: [
        { day: "19/10/2020", value: 20 },
        { day: "20/10/2020", value: 10 },
        { day: "21/10/2020", value: 5 },
        { day: "22/10/2020", value: 5 },
        { day: "23/10/2020", value: 20 },
        { day: "24/10/2020", value: 20 },
        { day: "25/10/2020", value: 10 },
        { day: "26/10/2020", value: 5 },
        { day: "27/10/2020", value: 5 },
        { day: "28/10/2020", value: 20 },
        { day: "29/10/2020", value: 20 },
        { day: "30/10/2020", value: 10 },
        { day: "31/10/2020", value: 5 },
        { day: "01/11/2020", value: 5 },
        { day: "02/11/2020", value: 20 },
      ],
    };
  },
  methods: {
    async getUser(id) {
      await store
        .dispatch("users/GET_USER", { userid: id })
        .then((response) => {
          const { data } = response.data;
          this.user.id = data.id;
          this.user.username = data.username;
          this.user.email = data.email;
          this.user.role = data.role;
        });
    },
    async deleteUser() {
      await store.dispatch("users/DELETE_USER", { id: this.user.id });
      if (this.user.id === this.userid) {
        this.disconnect();
      } else {
        this.$router.push('/')
      }
    },
    disconnect() {
      alert("Vous allez être déconnecté !");
      store.dispatch("auth/LOG_OUT");
      this.$router.replace("/login");
    },
    async updateUser() {
      const {
        id,
        username,
        email,
        newPassword,
        passwordConfirmation,
        role,
      } = this.user;
      const data = { id, username, email, role };
      const currentUserid = this.$store.getters["auth/currentUserId"];
      if (
        newPassword &&
        passwordConfirmation &&
        newPassword === passwordConfirmation
      ) {
        await store.dispatch("users/UPDATE_USER", {
          id,
          data: { ...data, password: newPassword },
        });
        this.update = false;
        if (id === currentUserid) {
          this.disconnect();
        }
      } else if (!newPassword && !passwordConfirmation) {
        await store.dispatch("users/UPDATE_USER", {
          id,
          data: { ...data, password: null },
        });
        this.update = false;
        if (id === currentUserid) {
          this.disconnect();
        }
      } else if (
        newPassword &&
        passwordConfirmation &&
        newPassword !== passwordConfirmation
      ) {
        alert("Password are not the same");
      } else if (!newPassword && passwordConfirmation) {
        alert("New password missing !");
      } else if (newPassword && !passwordConfirmation)
        alert("Password confirmation missing !");
    },
  },
  async created() {
    this.getUser(this.userid);
  },
  beforeRouteUpdate(to, from, next) {
    this.getUser(to.params.userid);
    next();
  },
};
</script>

<style scoped>
.data-container {
  display: flex;
  align-items: center;
}

img {
  border-radius: 50%;
}

h1,
h4,
h6 {
  margin: 10px;
}

.update-profil-container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.update-profil {
  width: 3em;
  height: 3em;
  justify-content: end;
  padding: 5px;
  background-color: black;
  border-radius: 0.6em;
  font-size: 100%;
  font-weight: bolder;
  color: white;
  transition: all 0.1s ease;
  border: 0.223em solid black;
}
.update-profil:hover {
  background-color: white;
  color: black;
  cursor: pointer;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>>
