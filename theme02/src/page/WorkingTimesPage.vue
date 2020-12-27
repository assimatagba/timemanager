<template>
  <b-container class="mt-3">
    <section v-if="loading">
      <h4>Chargement..</h4>
    </section>
    <section v-if="error">Erreurs chargement..</section>
    <section v-if="!loading">
      <div class="center mb-5">
        <Input
          v-if="
            this.$store.getters['auth/currentUserRole'] === 'admin' ||
            this.$store.getters['auth/currentUserRole'] === 'manager'
          "
          placeholder="Rechercher un user id"
          type="text"
          v-model="terms"
          class="m-1"
        />
        <Button
          v-if="this.$store.getters['auth/currentUserRole'] !== 'employee'"
          text="Ajouter un working time"
          v-b-modal="`modal-add-workingtime`"
          class="w-25"
        />
      </div>
      <div v-if="terms">
        <div v-for="t in filter" :key="t.id">
          <WorkingTime :data="t" />
        </div>
      </div>
      <div v-else>
        <div v-for="t in workingtimes" :key="t.id">
          <WorkingTime :data="t" />
        </div>
      </div>
    </section>
    <b-modal
      :id="`modal-add-workingtime`"
      size="lg"
      hide-footer
      title="Ajouter un workingtime"
    >
      <b-container>
        <div class="center">
          <h2>Ajouter un working time</h2>
        </div>
        <div>
          <p v-if="errorCreated == true">Veuillez remplir tous les champs</p>
        </div>
        <b-row>
          <b-col class="center mb-2">
            <Input v-model="title" placeholder="Titre" type="text" />
          </b-col>
          <b-col class="center mb-2">
            <Input
              v-model="description"
              placeholder="Description"
              type="text"
            />
          </b-col>
          <b-col class="ml-3">
            <p>Date de début</p>
            <datetime type="datetime" v-model="startDate"></datetime>
          </b-col>
          <b-col class="ml-3">
            <p>Date de fin</p>
            <datetime type="datetime" v-model="endDate"></datetime>
          </b-col>
          <b-col class="mb-2">
            <b-col cols="2">
              <label for="createworkingtime-user">Utilisateur :</label>
            </b-col>
            <b-col>
              <select
                @change="selectedUser = $event.target.value"
                id="createworkingtime-user"
              >
                <option
                  v-for="user in userList"
                  :value="user.id"
                  v-bind:key="user.id"
                >
                  {{ user.username }} ( {{ user.email }})
                </option>
              </select>
            </b-col>
          </b-col>
        </b-row>
        <div class="center m-3">
          <Button @click="createWorkingTime" text="valider" class="w-75" />
        </div>
      </b-container>
    </b-modal>
  </b-container>
</template>

<script>
import WorkingTime from "../components/WorkingTime";
import Input from "../components/fields/Input";
import Button from "../components/fields/Button";
import store from "@/store/store";
import { Datetime } from "vue-datetime";

export default {
  name: "WorkingTimePage",
  data() {
    return {
      terms: "",
      user: null,
      loading: true,
      error: false,
      workingtimes: [],
      displayedWorkingtimes: [],
      userList: [],
      selectedUser: null,
      startDate: null,
      endDate: null,
      title: null,
      description: null,
      errorCreated: false,
    };
  },
  props: {
    userId: {
      type: String,
      required: true,
    },
  },
  components: {
    WorkingTime,
    Input,
    Button,
    Datetime,
  },
  methods: {
    async getWorkingTimes() {
      const currentUser = this.$store.getters["auth/currentUser"];
      if (currentUser.role === "employee") {
        this.user = currentUser;
        store
          .dispatch("workingTime/GET_ALL_WORKING_TIME_BY_USERID", {
            id: this.userId,
          })
          .then((res) => {
            const arr = res.data.data;
            this.workingtimes = arr;
            this.loading = false;
          })
          .catch((err) => {
            console.log(err);
            this.error = true;
          });
      } else {
        this.user = currentUser;
        store
          .dispatch("workingTime/GET_ALL_WORKING_TIME", {
            id: this.userId,
          })
          .then((res) => {
            const arr = res.data.data;
            this.workingtimes = arr;
            this.loading = false;
          })
          .catch((err) => {
            console.log(err);
            this.error = true;
          });
      }
    },

    async createWorkingTime() {
      if (
        this.endDate == null ||
        this.startDate == null ||
        this.startDate === "" ||
        this.startDate === "" ||
        this.title == null ||
        this.description == null
      ) {
        this.errorCreated = true;
        return;
      }
      this.errorCreated = false;
      let data = {
        id: this.selectedUser,
        workingtime: {
          start: this.startDate,
          end: this.endDate,
          description: this.description,
          title: this.title,
        },
        currentUserId: this.$store.getters["auth/currentUserId"],
      };
      await this.$store.dispatch("workingTime/CREATE_WORKING_TIME", {
        data,
      });
    },
  },
  computed: {
    filter: function () {
      let arr = [];
      if (this.workingtimes) {
        arr = this.workingtimes.filter(
          (a) => a.user_id.toString() === this.terms
        );
      }
      return arr;
    },
  },
  async beforeMount() {
    if (this.$store.getters["auth/currentUserRole"] !== "employee") {
      let result = await this.$store.dispatch("users/GET_ALL_USER");
      this.userList = result.data.data;
      this.selectedUser = this.userList[0].id;
    }
  },
  mounted() {
    this.getWorkingTimes();
  },
};
</script>

<style>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

#createworkingtime-user {
  border: 0.223em solid #eeeeee;
  box-sizing: border-box;
  border-radius: 0.4em;
  font-size: 1.33333em;
  font-weight: 600;
  -webkit-appearance: none;
  outline: none;
  color: rgb(61, 61, 61);
  padding: 0.5em 0.75em;
}

#createworkingtime-user:focus {
  border-color: black;
}

.vdatetime-input {
  border: 0.223em solid #eeeeee;
  box-sizing: border-box;
  border-radius: 0.4em;
  font-size: 1.33333em;
  font-weight: 600;
  -webkit-appearance: none;
  outline: none;
  color: rgb(61, 61, 61);
  padding: 0.5em 0.75em;
}
.vdatetime-input:focus {
  border-color: black;
}

.vdatetime-calendar__month__day--selected > span > span,
.vdatetime-calendar__month__day--selected:hover > span > span {
  background: black !important;
}
.vdatetime-popup__header {
  background: black !important;
}
.vdatetime-time-picker__item--selected {
  color: black !important;
}

.vdatetime-popup__actions__button {
  color: black !important;
}
</style>