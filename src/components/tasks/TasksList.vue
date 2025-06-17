<script setup lang="ts">
import Checkbox from '@/components/ui/Checkbox.vue'
import ButtonDelete from '@/components/ui/ButtonDelete.vue'
import { useStore } from 'vuex'
import type { State } from '@/store/tasks.ts'
import { computed, onMounted } from 'vue'
import Loader from '@/components/ui/Loader.vue'

const store = useStore<State>()

const emptyMessage = computed(() => {
  switch (store.state.filter) {
    case 'all':
      return 'Нет задач'
    case 'active':
      return 'Нет активных задач'
    default:
      return 'Нет выполненных задач'
  }
})

onMounted(() => store.dispatch('fetchTasks'))
</script>

<template>
  <section class="tasks-list">
    <div class="tasks-list__stats">
      <Loader v-if="store.state.loading" />
      <div
        class="tasks-list__stats-items"
        v-else
      >
        <span>Всего: {{ store.getters.totalTasks }}</span>
        <span>Активных: {{ store.getters.activeTasks.length }}</span>
        <span>Выполненных: {{ store.getters.completedTasks.length }}</span>
      </div>
    </div>

    <div class="tasks-list__items">
      <div
        v-for="task in store.getters.filteredTasks"
        :key="task.id"
        :class="['tasks-list__item', { completed: task.completed }]"
      >
        <Checkbox
          :checked="task.completed"
          @change="store.dispatch('updateTask', task)"
          :disabled="store.state.loading"
        />
        <span class="tasks-list__item-title">{{ task.title }}</span>
        <ButtonDelete
          @click="store.dispatch('deleteTask', task.id)"
          :disabled="store.state.loading"
        />
      </div>
    </div>
    <span
      v-if="!store.state.loading && store.getters.filteredTasks.length === 0"
      class="tasks-list__message"
    >
      {{ emptyMessage }}
    </span>
  </section>
</template>

<style scoped lang="scss">
.tasks-list {
  &__stats {
    margin-bottom: 20px;
    height: 40px;
    background-color: #f8f9fa;
    border-radius: 6px;
    font-weight: bold;
  }
  &__stats-items {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  &__items {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 15px;
    border: 2px solid #ddd;
    border-radius: 6px;
    background-color: white;
    transition: all 0.3s;
    &:hover {
      border-color: #007bff;
      box-shadow: 0 2px 4px rgba(0, 123, 255, 0.1);
    }
    &.completed {
      background-color: #f8f9fa;
      border-color: #28a745;
    }
  }

  &__item-title {
    flex: 1;
    font-size: 16px;
    transition: all 0.3s;
    .completed & {
      text-decoration: line-through;
      color: #666;
    }
  }

  &__message {
    text-align: center;
    padding: 40px;
    color: #666;
    font-style: italic;
    font-size: 18px;
  }

  &__loading {
    height: 50px;
  }
}
</style>
