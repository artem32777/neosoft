import { createStore } from 'vuex'
import type { Task, TaskFilter } from '@/types/Task'
import { useTasksApi } from '@/api/taskApi'

export interface State {
  tasks: Task[]
  loading: boolean
  filter: TaskFilter
}

const { get, add, update, del } = useTasksApi()

export default createStore<State>({
  state: {
    tasks: [],
    loading: false,
    filter: 'all',
  },

  mutations: {
    SET_TASKS(state, tasks: Task[]) {
      state.tasks = tasks
    },

    SET_LOADING(state, loading: boolean) {
      state.loading = loading
    },

    SET_FILTER(state, filter: TaskFilter) {
      state.filter = filter
    },
  },

  actions: {
    async fetchTasks({ commit }) {
      commit('SET_LOADING', true)
      try {
        commit('SET_TASKS', await get())
      } catch (error) {
        alert('Ошибка загрузки задач!')
        console.error(error)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async addTask({ dispatch }, title: string) {
      try {
        await add(title)
        await dispatch('fetchTasks')
      } catch (error) {
        alert('Ошибка добавления задачи!')
        console.error(error)
      }
    },

    async deleteTask({ dispatch }, taskId: number) {
      try {
        await del(taskId)
        await dispatch('fetchTasks')
      } catch (error) {
        alert('Ошибка удаления задачи!')
        console.error(error)
      }
    },

    async updateTask({ dispatch }, task: Task) {
      try {
        await update(task.id, {
          completed: !task.completed,
        })
        await dispatch('fetchTasks')
      } catch (error) {
        alert('Ошибка обновления задачи!')
        console.error(error)
      }
    },

    setFilter({ commit }, filter: TaskFilter) {
      commit('SET_FILTER', filter)
    },
  },

  getters: {
    filteredTasks: (state) => {
      switch (state.filter) {
        case 'active':
          return state.tasks.filter((task) => !task.completed)
        case 'completed':
          return state.tasks.filter((task) => task.completed)
        default:
          return state.tasks
      }
    },

    activeTasks: (state) => state.tasks.filter((task) => !task.completed),
    completedTasks: (state) => state.tasks.filter((task) => task.completed),
    totalTasks: (state) => state.tasks.length,
  },
})
