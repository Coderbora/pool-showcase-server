<template>
  <div
    class="modal fade"
    :class="{ show: active, 'd-block': active }"
    tabindex="-1"
    role="dialog"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-body">
          <slot />
        </div>
      </div>
    </div>
  </div>
  <div
    v-if="active"
    class="modal-backdrop fade show"
    @click="$emit('closeModal')"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "Modal",
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },
  emits: ['closeModal']
})
</script>

<style>
.modal-content {
  background-color: #333;
}
</style>