<script setup lang="ts">
const model = defineModel<string>()
</script>
<template>
  <input
    v-model="model"
    class="task-input"
  />
</template>

<style scoped>
.task-input {
  width: 100%;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 6px;
  outline: none;
  transition: border-color 0.3s;
}

.task-input:focus {
  border-color: #007bff;
}

.task-input:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}
</style>
