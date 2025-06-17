<template>
  <input
    type="checkbox"
    class="task-checkbox"
  />
</template>

<style scoped>
.task-checkbox {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.task-checkbox:disabled {
  cursor: not-allowed;
}
</style>
