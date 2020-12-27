<template>
  <b-container class="mt-3">
    <h1 class="mb-3">Bonjour {{  this.$store.getters['auth/currentUsername'] }}</h1>
    Dernier temps log :
    <div class="center">
      <bar-chart id="bar" :data="barData" bar-colors='["#000"]' xkey="day" class="w-100">
      </bar-chart>
    </div>
    <b-row>
      <b-col>
        <donut-chart
          id="donut"
          :data="donutData"
          colors='["#000", "#4a4a4a", "#a8a8a8"]'
          xkey="day"
        >
        </donut-chart>
      </b-col>
      <b-col class="center">
        <WorkingTime :data="t" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { BarChart } from "vue-morris";
import { DonutChart } from "vue-morris";
import WorkingTime from "../components/WorkingTime";

import moment from "moment";


export default {
  name: "LoginPage",
  components: {
    BarChart,
    DonutChart,
    WorkingTime,
  },

  methods: {
    barGraph: async function () {
      let startMonth = moment().startOf('month').format('YYYY-MM-DD hh:mm:ss');
      let endMonth = moment().endOf('month').format('YYYY-MM-DD hh:mm:ss');

      let startMonthGraph = moment().startOf('month').format('DD/MM/YYYY');
      let endMonthGraph = moment().endOf('month').format('DD/MM/YYYY');

      let userId = this.$store.getters['auth/currentUserId'];
      let test = await this.$store.dispatch('clock/GET_CLOCK_BETWEEN_TWO_DATES', {id: userId, start: startMonth, end: endMonth})
      if(test.data.data[0]) {
        this.barData = [];
        let data = [];
        let self = this;
        await test.data.data.forEach(await function (e) {
          if(data[moment(e.time).format('DD/MM/YYYY')])
            data[moment(e.time).format('DD/MM/YYYY')] += e.hours
          else
            data[moment(e.time).format('DD/MM/YYYY')] = e.hours
          if(e.workingtime_id == null) {
            self.suppHours += e.hours
          } else {
            self.hoursDone += e.hours;
          }
        });
        Object.entries(data).forEach(function (item) {
          self.barData.push({"day": item[0], "value": item[1]})
        })
      }else {
        this.barData = [
          {day: startMonthGraph, value:0},
          {day: endMonthGraph, value: 0}
        ]
      }
    },
    donutGraph: function () {
      if(this.hoursDone > 0)
        this.donutData.push({ label: "Heure normal", value: Math.round(this.hoursDone) })
      if(this.suppHours > 0)
        this.donutData.push({ label: "Heure supp", value: Math.round(this.suppHours) })
      if(this.upcomingHours > 0)
        this.donutData.push({ label: "Heure a venir", value: Math.round(this.upcomingHours) })

      // this.donutData = [
      //   { label: "Heure normal", value: null },
      //   { label: "Heure supp", value: null },
      //   { label: "Heure a venir", value: null },
      // ]
    },

    getUpcomingHours: async function () {
      let userId = this.$store.getters['auth/currentUserId']
      let test = await this.$store.dispatch('workingTime/GET_NEXT_WORKING_TIME', {id: userId})
      let self = this;
      test.data.data.forEach(function (e) {
        moment(e.start)
        let a = moment(e.start);
        let b = moment(e.end);
        self.upcomingHours += b.diff(a, 'hours')
      })


    },
    updateWorkingTime: async function () {
      let userId = this.$store.getters['auth/currentUserId']
      let current = await this.$store.dispatch('workingTime/GET_CURRENT_WORKING_TIME', {id: userId})

      if(current.data.data[0]) {
        this.t = {
          title: current.data.data[0].title,
          description: current.data.data[0].description,
          start: current.data.data[0].start,
          end: current.data.data[0].end,
          user: current.data.data[0].user_id,
          id: current.data.data[0].id,
        }
      } else {
        let next = await this.$store.dispatch('workingTime/GET_NEXT_WORKING_TIME', {id: userId})

        if(next.data.data[0]) {
          this.t = {
            title: next.data.data[0].title,
            description: next.data.data[0].description,
            start: next.data.data[0].start,
            end: next.data.data[0].end,
            user: next.data.data[0].user_id,
            id: next.data.data[0].id,
          }
        } else {
          this.t = {
            title: "No working time available",
            description: "",
            start: null,
            end: null,
            user: null,
            id: null,
          }
        }
      }
    }
  },
  async beforeMount() {
    await this.barGraph();
    await this.getUpcomingHours();
    await this.donutGraph();
    await this.updateWorkingTime();
  },
  data() {
    return {
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
        { day: "29/10/2020", value: 16 },
        { day: "30/10/2020", value: 10 },
        { day: "31/10/2020", value: 5 },
        { day: "01/11/2020", value: 5 },
        { day: "02/11/2020", value: 20 },
      ],
      donutData: [
      ],
      upcomingHours: 0,
      hoursDone: 0,
      suppHours: 0,
      t: {
        title: "plop",
        description: "loren lipsum",
        start: "DATE",
        end: "DATE",
        user: 1000,
        id: 1000,
      },
    };
  },
};
</script>

<style scoped>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
