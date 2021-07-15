<template>
  <div class="input-group mb-3">
    <div class="input-group-prepend">
      <span
        class="input-group-text"
      >{{ inputName }}</span>
    </div>
    <input
      :value="value"
      :type="inputType"
      class="form-control"
      @input="changeValue"
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "TextInput",
  props: {
    inputName: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true,
    },
    inputType: {
      type: String,
      default: "text",
    }
  },
  emits: ["changeValue"],
  methods: {
    changeValue(e: Event) {
      this.$emit("changeValue", (e.target as HTMLInputElement).value);
    }
  }
})
</script>

<style>

</style>