<template>
  <div>
    WorkingTimesAdminPage

    <div v-if="update != true">
      {{startDate}}

      {{endDate}}
    </div>
    <div v-else>
      <Input
          placeholder="startDate"
          type="text"
          v-model="startDate"
          class="mr-2"
      />
      <Input placeholder="endDate" type="text" v-model="endDate" />
      <div class="update-profil" @click="edit">
        <svg
            width="2em"
            height="2em"
            viewBox="0 0 16 16"
            class="bi bi-check"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
        >
          <path
              fill-rule="evenodd"
              d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"
          />
        </svg>
      </div>
    </div>
    <div class="update-profil" @click="update = !update">
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
    <div>
      <button @click="deleteWorkingTime()">DELETE</button>
    </div>
  </div>
</template>

<script>

import store from "@/store/store";
import moment from "moment";
import Input from "@/components/fields/Input";

export default {
  name: 'WorkingTimeAdminPage',
  props: ['start', 'end', 'id', 'userid'],
  methods: {
    edit: async function() {
      this.update = false;
      let data = {
        "workingtime": {
          "start": this.startDate,
          "end": this.endDate
        },
        id:this.$route.params.workingTimeId
      }
      await store.dispatch('workingTime/UPDATE_WORKING_TIME', {data});
    },
    deleteWorkingTime: async function() {
      let id = this.$route.params.workingTimeId;
      await store.dispatch('workingTime/DELETE_WORKING_TIME', {id});
    }
  },
  data() {
    return {
      startDate: null,
      endDate: null,
      update: false
    }
  },
  async beforeMount() {
    let test = await store.dispatch('workingTime/GET_ONE_WORKING_TIME', {id:this.$route.params.userId, workingTimeId: this.$route.params.workingTimeId});
    this.startDate = moment(test.data.data[0].start).format('YYYY-MM-DD hh:mm:ss');
    this.endDate = moment(test.data.data[0].end).format('YYYY-MM-DD hh:mm:ss');
    // this.id = this.$route.params.workingTimeId;
  },
  components: {
    Input,
  },
}
</script>

<style>

</style>
