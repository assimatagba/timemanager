<template>
  <b-container class="mb-5">
    <b-row class="mb-2">
      <b-col>
        Date de début
        <datetime type="datetime" v-model="data.start"></datetime>
      </b-col>
      <b-col>
        Date de fin
        <datetime type="datetime" v-model="data.end"></datetime>
      </b-col>
    </b-row>
    <Button class="w-100" text="enregistrer" @click="saveLog()" />
  </b-container>
</template>

<script>
import Button from "./fields/Button";
import store from '@/store/store'
import { Datetime } from 'vue-datetime';
import moment from "moment";

export default {
  name: "ClockView",
  components: {
    Button,
    Datetime
  },
  props: ["data"],
  data: function () {
    const { data } = this;
    return {
      infos: {
        start:  data.start ,
        end: data.end ,
      },
    };
  },
  methods: {
    saveLog: function () {
      const {data} = this
      const infos = {
          title: data.title,
          description: data.description,
          start: moment(data.start).format('YYYY-MM-DD HH:mm:ss'),
          end: moment(data.end).format('YYYY-MM-DD HH:mm:ss'),
          id: data.id,
          user: data.user,
        }
      store.dispatch('workingTime/UPDATE_WORKING_TIME', {data: infos})
    },
  },
};
</script>

<style>
</style>
