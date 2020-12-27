<template>
  <div id="login-container">
    <b-container>
      <b-row class="login-form">
        <b-col xl="8" lg="6">
          <form autocomplete="off" v-on:submit.prevent="checkForm">
            <h1>Sign up</h1>
            <b id="error" v-if="error != null" >{{error}}</b>
            <Input placeholder="username" v-model="username" />
            <Input placeholder="email" type="email" v-model="email" />
            <Input placeholder="password" type="password" v-model="password" />
            <b
              >You have a account -
              <Link text="Log in" @click="$router.push(`/login/`)"
            /></b>
            <p v-if="errors.length">
              <b>Please correct the following error(s):</b>
              <ul>
                <li v-for="error in errors" :key="error">{{ error }}</li>
              </ul>
            </p>
            <Button text="Submit" class="clear" />
          </form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Input from "../components/fields/Input";
import Button from "../components/fields/Button";
import Link from "../components/fields/Link";
import store from "@/store/store";
import jwt_decode from "jwt-decode";

export default {
  name: "SignupPage",
  components: {
    Input,
    Button,
    Link,
  },
  data() {
    return {
      email: null,
      username: null,
      password: null,
      error: null,
      errors: [],
      reg: /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
    };
  },
  methods: {
    checkForm: async function (e) {
      this.errors = [];
      if (this.username && this.password && this.reg.test(this.email)) {
        const infos = {
          email: this.email,
          username: this.username,
          password: this.password,
        };
        store
          .dispatch("auth/SIGN_UP", infos)
          .then(async () => {
            this.error = null;
            let login = await store.dispatch("auth/LOGIN", {
              data: { email: infos.email, password: infos.password },
            });
            if (login.data.token) {
              let jwt = await jwt_decode(login.data.token);
              // localStorage.setItem('user', JSON.stringify(result.data.token));
              localStorage.setItem("jwt", login.data.token);
              localStorage.setItem("Timemanager_userID", jwt.user_id);
              localStorage.setItem("Timemanager_userRole", jwt.role);
              localStorage.setItem("Timemanager_expiration", jwt.exp);
              this.$router.replace("/");
            }
          })
            .catch((err) => {
                  let error = Object.assign({}, err).response.data.errors;
                  if (error.email) {
                    this.error = "Email already taken";
                  } else if (error.username) {
                    this.error = "Username already taken";
                  }
                }
            );
      }
      if (!this.username) this.errors.push("Username missing");
      if (!this.email) this.errors.push("Email missing");
      if (!this.password) this.errors.push("Password missing");

      e.preventDefault();
    },
  },
  async mounted() {
    if (await this.$store.dispatch("auth/CHECK_TOKEN")) {
      this.$router.replace("/");
    }
  },
};
</script>

<style scoped>
#login-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

a {
  text-decoration: none;
}

.login-form {
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
}

button {
  margin-top: 3vh;
  width: 100%;
}
input {
  margin-top: 1vh;
  width: 100%;
}
h1 {
  font-weight: bolder;
}
</style>
