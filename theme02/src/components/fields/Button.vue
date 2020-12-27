<template>
  <button v-bind:class="{ loading: loading }" :disabled="this.loading" @click="$emit('click')">
    <i class="el-icon-refresh" v-if="this.loading"></i>
    {{ this.loading ? "" : this.text }}
  </button>
</template>

<script>
export default {
  props: ["text", "loading", "clear"],
};
</script>

<style scoped>
button {
  cursor: pointer;
  padding: 15px;
  border: none;
  background-color: black;
  border-radius: 0.6em;
  font-size: 100%;
  font-weight: bolder;
  color: white;
  transition: all 0.1s ease;
  border: 0.223em solid black;
  box-sizing: border-box;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
button:hover {
  background-color: rgba(22, 22, 22, 0.815);
  border: 0.223em solid rgba(97, 97, 97, 0.438);

  transform: translate(-1px, -2px);
  box-shadow: 2px 2px 10px rgba(97, 97, 97, 0.438);
}
button:active {
  transform: translate(2px, 4px);
  box-shadow: none;
}
button:disabled {
  opacity: 0.5;
}
button.loading {
  animation: fadder 2s ease infinite;
  position: relative;
}
button.clear {
  background-color: white;
  color: black;
}
button.clear:hover {
  background-color: rgba(255, 255, 255, 0.219);
  transform: translate(-1px, -2px);
  border: 0.223em solid black;
}
button.clear:active {
  transform: translate(2px, 4px);
  box-shadow: none;
}
</style>