<script setup lang="ts">
import { useStore } from 'vuex'
import type { State } from '@/store/tasks.ts'
import type { TaskFilter } from '@/types/Task.ts'

const store = useStore<State>()

const filterOptions: {
  value: TaskFilter
  label: string
}[] = [
  { value: 'all', label: 'Все' },
  { value: 'active', label: 'Активные' },
  { value: 'completed', label: 'Выполненные' },
]
</script>

<template>
  <div class="filters">
    <button
      v-for="filterOption in filterOptions"
      :key="filterOption.value"
      @click="store.dispatch('setFilter', filterOption.value)"
      :class="['filter-button', { selected: store.state.filter === filterOption.value }]"
      :disabled="store.state.loading"
    >
      {{ filterOption.label }}
    </button>
  </div>
</template>

<style scoped>
.filters {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  justify-content: center;
}

.filter-button {
  padding: 8px 16px;
  border: 2px solid #ddd;
  background-color: white;
  border-radius: 6px;
  transition: all 0.3s;
}

.filter-button.selected {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}

.filter-button:hover:not(:disabled) {
  border-color: #007bff;
}

.filter-button:active:not(:disabled) {
  background-color: #93bfee;
}

.filter-button:disabled {
  pointer-events: none;
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
