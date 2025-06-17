import type { Task } from '@/types/Task'
import { delay } from '@/helpers/delay.ts'
import { ref } from 'vue'
import { generateId } from '@/helpers/generateNextId.ts'

export const useTasksApi = () => {
  const tasks = ref<Task[]>([
    {
      id: 1,
      title: 'Сделать тестовое задание',
      completed: true,
    },
    {
      id: 2,
      title: 'Получить офер на собеседование',
      completed: false,
    },
  ])

  const get = async () => {
    await delay()
    return [...tasks.value]
  }

  const add = async (title: Task['title']) => {
    const newTask: Task = {
      id: generateId(tasks.value.map((task) => task.id)),
      title,
      completed: false,
    }
    tasks.value.push(newTask)
  }

  const del = async (id: Task['id']) => (tasks.value = tasks.value.filter((task) => task.id !== id))

  const update = async (id: Task['id'], updates: Partial<Omit<Task, 'id'>>) => {
    const taskIndex = tasks.value.findIndex((task) => task.id === id)
    if (taskIndex === -1) {
      throw new Error('Задача не найдена')
    }
    tasks.value[taskIndex] = { ...tasks.value[taskIndex], ...updates }
  }

  {
    return {
      get,
      add,
      del,
      update,
    }
  }
}
