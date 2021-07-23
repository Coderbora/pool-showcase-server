<template>
  <Modal
    :active="active"
    @closeModal="$emit('closeModal')"
  >
    <table class="table table-dark table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>Player</th>
          <th>Score</th>
        </tr>
      </thead>
      <tr
        v-for="(map, i) in showcasePool"
        :key="'replayDetails'+i"
      >
        <td>{{ map.modpool }}{{ map.modpool_id }}</td>
        <td>{{ map.playedBy ? map.playedBy.username : "-" }}</td>
        <td>{{ map.playedBy ? map.playedBy.score : "-" }}</td>
      </tr>
    </table>

    <button
      type="button"
      class="btn btn-secondary mx-2"
      @click="$emit('closeModal')"
    >
      Close
    </button>
  </Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState } from 'vuex';

import { Map } from '../../shared/types';
import Modal from './Modal.vue';

export default defineComponent({
  name: "PoolReplayDetailsModal",
  components: {
    Modal
  },
  props: {
      active: {
      type: Boolean,
      default: false
      }
  },
  emits: ['closeModal'],
  computed: {
    ...mapState({
      showcasePool: (state: any) => state.showcasePool as Map[],
    })
  }
})
</script>
