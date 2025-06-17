<script setup lang="ts">
import TaskForm from '@/components/tasks/TaskForm.vue'
import TaskFilter from '@/components/tasks/TaskFilter.vue'
import TasksList from '@/components/tasks/TasksList.vue'
</script>

<template>
  <section class="tasks">
    <h1>Список задач</h1>
    <TaskForm />
    <TaskFilter />
    <TasksList />
  </section>
</template>

<style scoped>
.tasks {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
</style>
