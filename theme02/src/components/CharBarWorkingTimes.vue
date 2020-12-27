<template>
<!--  <bar-chart-custom class="mt-5" barcolors='["#000"]' :bar-data="workingTimes" :xkey="'day'" :ykey="'hours'"></bar-chart-custom>-->
  <bar-chart id="bar" :data="barData" bar-colors='["#000"]' xkey="day" class="w-100">
  </bar-chart>
</template>

<script>
import store from "@/store/store";
import moment from "moment";

import { BarChart } from "vue-morris";

// import BarChartCustom from "@/components/BarChartCustom";

export default {
  name: "CharBarWorkingTimes",
  data: function () {
    return {
      userId: 0,
      workingTimes: null,
      barData: []
    }
  },
  components: {
    BarChart
  },
  props: ['page', 'id', 'data'],
  async beforeMount() {
    await this.getWorkingTimes()
  },
  methods: {
    getWorkingTimes: async function () {
      let startMonth = moment().startOf('month').format('YYYY-MM-DD hh:mm:ss');
      let endMonth = moment().endOf('month').format('YYYY-MM-DD hh:mm:ss');

      let startMonthGraph = moment().startOf('month').format('DD/MM/YYYY');
      let endMonthGraph = moment().endOf('month').format('DD/MM/YYYY');

      let userId = this.$route.params.userid;
      let test = await store.dispatch('clock/GET_CLOCK_BETWEEN_TWO_DATES', {id: userId, start: startMonth, end: endMonth})
      if(test.data.data[0]) {
        this.barData = [];
        let data = [];
        let self = this;
        await test.data.data.forEach(await function (e) {
          if(data[moment(e.time).format('DD/MM/YYYY')])
            data[moment(e.time).format('DD/MM/YYYY')] += e.hours
          else
            data[moment(e.time).format('DD/MM/YYYY')] = e.hours

          if(e.workingTime == null) {
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
    }
  }
}
</script>

<style scoped>

</style>