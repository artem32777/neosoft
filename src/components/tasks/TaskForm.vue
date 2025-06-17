<script setup lang="ts">
import Input from '@/components/ui/Input.vue'
import { useStore } from 'vuex'
import type { State } from '@/store/tasks.ts'
import { ref } from 'vue'

const store = useStore<State>()

const taskTitleInput = ref('')

const addTask = async () => {
  const newTaskTitle = taskTitleInput.value.trim()
  if (!newTaskTitle) return
  await store.dispatch('addTask', newTaskTitle)
  taskTitleInput.value = ''
}
</script>

<template>
  <div class="add-task-form">
    <Input
      v-model="taskTitleInput"
      :disabled="store.state.loading"
      placeholder="Введите новую задачу..."
      @keyup.enter="addTask"
    />
    <button
      @click="addTask"
      :disabled="!taskTitleInput.trim() || store.state.loading"
      class="add-button"
    >
      Добавить
    </button>
  </div>
</template>

<style scoped>
.add-task-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.add-button {
  padding: 12px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.add-button:hover:not(:disabled) {
  background-color: #0056b3;
}

.add-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
