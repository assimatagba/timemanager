<template>
  <b-container>
    <b v-if="error != null"> {{ error }}</b>
    <b-row class="tabs-corps">
      <b-col class="justify-center">
        <b-row>
          <b-col lg="6">
            <Input
              placeholder="Username"
              type="text"
              class="w-100 m-1"
              v-model="username"
              :disabled="currentUserRole === 'manager'"
            />
          </b-col>
          <b-col lg="6">
            <Input
              placeholder="Email"
              type="text"
              class="w-100 m-1"
              v-model="email"
              :disabled="currentUserRole === 'manager'"
            />
          </b-col>
        </b-row>
      </b-col>
      <b-col lg="2" class="tabs">
        <form>
          <b-container class="form-check justify-center">
            <fieldset>
              <b-row>
                <b-col>
                  <input
                    type="radio"
                    class="form-check-input"
                    name="role"
                    :id="`Checkbox1${id}`"
                    v-model="role" v-bind:value="'admin'"
                    :disabled="currentUserRole === 'manager'"
                  />
                  <label class="form-check-label" :for="`Check1${id}`"
                    >Admin</label
                  >
                </b-col>
                <b-col>
                  <input
                    type="radio"
                    class="form-check-input"
                    name="role"
                    :id="`Checkbox2${id}`"
                    v-model="role" v-bind:value="'manager'"
                    :disabled="currentUserRole === 'manager'"
                  />
                  <label class="form-check-label" :for="`Check1${id}`"
                    >Manager</label
                  >
                </b-col>
                <b-col>
                  <input
                    type="radio"
                    class="form-check-input"
                    name="role"
                    :id="`Checkbox3${id}`"
                    v-model="role" v-bind:value="'employee'"
                    :disabled="currentUserRole === 'manager'"
                  />
                  <label class="form-check-label" :for="`Check1${id}`"
                    >Employer</label
                  >
                </b-col>
              </b-row>
            </fieldset>
          </b-container>
        </form>
      </b-col>
      <b-col lg="3" class="justify-center">
        <Button v-if="currentUserRole === 'admin'" text="Save" class="clear w-50 m-1" @click="SaveUser()" />
        <Button
          text="Visite"
          class="w-50 m-1"
          @click="$router.push(`/user/${id}`)"
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Button from "./fields/Button";
import Input from "./fields/Input";

export default {
  name: "AdminRowUser",
  components: {
    Button,
    Input,
  },
  props: ["id", "username", "email", "role", "currentUserRole"],
  beforeMount() {
  },
  data: function () {
    return {
      error: null
    };
  },
  methods: {
    async SaveUser() {
      let data = {
          "username": this.username,
          "email" : this.email,
          "role": this.role,
          "password": null
      };
      try {
        await this.$store.dispatch('users/UPDATE_USER', {data:data, id: this.id })
        this.error = null;
      } catch (err) {
        let error = Object.assign({}, err).response.data.errors;
        if (error.email) {
          this.error = "Email already taken";
        } else if (error.username) {
          this.error = "Username already taken";
        }
      }

    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}

.user-info {
  display: flex;
}

.tabs-corps {
  border: 0.223em solid #eeeeee;
}

.justify-center {
  display: flex;
  justify-content: center;
  align-items: center;
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
