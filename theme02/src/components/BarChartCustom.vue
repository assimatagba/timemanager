<template>
  <div>
    <bar-chart
      id="bar"
      :data="barDatadisplayed"
      :bar-colors="barcolors"
      :resize="resize"
      :xkey="xkey"
      :ykey="ykey"
    >
    </bar-chart>
  </div>
</template>

<script>
import { BarChart } from "vue-morris";

export default {
  name: "BarChartCustom",
  components: {
    BarChart,
  },
  data: function() {
    return {
      barDatadisplayed: [
        {"day": "2020-01-01", "hours": 5},
      ],
      workingTimes: []
    }
  },
  props: ["barData", "barcolors", "resize", "xkey", "ykey"],
  watch : {
    barData: function (value) {
      let newVal = [];
      value.forEach(function (item) {
        newVal.push({"day": item.day, "value": item.hours});
      })
      this.barDatadisplayed = newVal
    }
  }
};
</script>

<style scoped>
</style>