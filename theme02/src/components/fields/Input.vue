<template>
  <input :type="type" :name="name" :placeholder="placeholder" :value="value" @input="$emit('input', $event.target.value)"/>
</template>

<script>
export default {
  props: ["placeholder", "name", "type", "value"]
};
</script>

<style scoped>
input {
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
input:focus {
    border-color: black;
}
</style>