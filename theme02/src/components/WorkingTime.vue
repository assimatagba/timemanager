<template>
  <b-container>
    <b-row class="WorkingTime-center">
      <b-col class="text-center WorkingTimeContainer p-2" xl="8">
        <h1>{{ data.title }}</h1>
        <h5>
          {{ data.description }}
        </h5>
        <p v-if="data.id !== null">
          Debut : {{ timeToString(data.start) }} Fin : {{ timeToString(data.end) }}
        </p>
        <b-row v-if="data.id !== null" class="mt-3">
          <b-col>
            <Button
              text="Log Time"
              class="clear w-100"
              @click="$router.push(`/clock/${data.id}`)"
            />
          </b-col>
          <b-col>
            <Button
              text="Modifie log"
              v-b-modal="`modal-${data.id}`"
              class="w-100"
            />
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-modal
      :id="`modal-${data.id}`"
      size="lg"
      hide-footer
      :title="'Time logs for : ' +data.title"
    >
      <b-container>
        <ClockView :data="data" />
      </b-container>
    </b-modal>
  </b-container>
</template>

<script>
import Button from "./fields/Button";
import ClockView from "./ClockView";
import moment from "moment";

export default {
  name: "WorkingTime",
  components: {
    Button,
    ClockView,
  },
  methods: {
    timeToString(date) {
      return moment(date).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  props: {
    data: {
      title: String,
      description: String,
      start: String,
      end: String,
      user: Number,
      id: Number
    }
  }
};
</script>

<style>
.WorkingTime-center {
  justify-content: center;
}

.WorkingTimeContainer {
  border-radius: 0.6em;
  border: 0.223em solid black;
  margin-bottom: 50px;
}
</style>
