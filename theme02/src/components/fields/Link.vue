<template>
  <a class="custom-link" @click="$emit('click', $event)">
    <b>{{ this.text }}</b>
  </a>
</template>

<script>
export default {
  props: ["text", "clear"],
};
</script>

<style scoped>
.custom-link {
  cursor: pointer;
  padding-right: 2px;
  padding-left: 2px;
  margin: 15px;
  font-size: 100%;
  font-weight: bolder;
  color: black;
  border-bottom: solid black 5px;
  transition: all 0.1s ease;
  box-sizing: border-box;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
.custom-link:hover {
  background-color: white;
  color: black;
  font-weight: bolder;
  transform: translate(1px, -2px);
}

</style>