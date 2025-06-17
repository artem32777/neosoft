<script setup lang="ts"></script>

<template>
  <button class="delete-button">Удалить</button>
</template>

<style scoped>
.delete-button {
  padding: 6px 12px;
  background-color: #dc3545;
  color: white;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.delete-button:hover:not(:disabled) {
  background-color: #c82333;
}

.delete-button:active:not(:disabled) {
  background-color: #5b010a;
}

.delete-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
