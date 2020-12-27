<template>
  <div id="login-container">
    <b-container>
      <b-row class="login-form">
        <b-col xl="8" lg="6">
          <form autocomplete="off" v-on:submit.prevent="login">
            <h1>Login</h1>
            <b id="error" v-if="error === true">Email or password incorrect</b>
            <Input placeholder="Email" type="email" v-model="email" />
            <Input placeholder="Password" type="password" v-model="password" />
            <b
              >no account -
              <Link text="create one" @click="$router.push(`/signup/`)"
            /></b>
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
// import avatar from "cartoon-avatar";
import store from "@/store/store";
import jwt_decode from "jwt-decode";

export default {
  name: "LoginPage",
  components: {
    Input,
    Button,
    Link,
  },
  data() {
    return {
      email: null,
      password: null,
      error: false,
    };
  },
  methods: {
    login: async function () {
      this.error = false;
      let data = {
        email: this.email,
        password: this.password,
      };
      let login = await store.dispatch("auth/LOGIN", { data });
      if (login.data.token) {
        let jwt = await jwt_decode(login.data.token);
        // localStorage.setItem('user', JSON.stringify(result.data.token));
        localStorage.setItem("jwt", login.data.token);
        localStorage.setItem("Timemanager_userID", jwt.user_id);
        localStorage.setItem("Timemanager_userRole", jwt.role);
        localStorage.setItem("Timemanager_expiration", jwt.exp);
        await store.dispatch("auth/FETCH_CURRENT_USER", { id: jwt.user_id });
        this.$router.replace("/");
      } else if (login.data.error == "Email or password incorrect") {
        this.error = true;
      }
    },
  },
  async mounted() {
    // if (await this.$store.dispatch("auth/CHECK_TOKEN")) {
    //   this.$router.replace("/");
    // }
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

#error {
  color: red;
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
