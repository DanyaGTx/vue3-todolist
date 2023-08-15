<template>
  <div class="block">
    <h1 class="text-[30px] font-medium">Board</h1>
    <div class="flex gap-5">
      <TodoBoard
        :boardType="'todo'"
        :todos="todos"
        :categoriesList="categoriesList"
        @deletedTodos="deletedTodos"
        @deleteAllTodos="deleteAllTodos('todo')"
        @editTodo="editTodo"
        @addNewTodo="addNewTodo"
        @doneTodo="doneTodo"
        @completeAllTodos="completeAllTodos"
      />
      <DoneTodosBoard
        :boardType="'doneTodo'"
        :todos="doneTodos"
        :categoriesList="categoriesList"
        @deletedTodos="deletedTodos"
        @deleteAllTodos="deleteAllTodos('done')"
        @editTodo="editTodo"
        @addNewTodo="addNewTodo"
        @doTodo="doTodo"
        @completeAllTodos="completeAllTodos"
        @uncompleteAllTodos="uncompleteAllTodos"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import TodoBoard from '../views/components/TodoBoard.vue'
import saveTodosToLocalStorage from '../helpers/saveTodoToLocalStorage'
import { TODO } from '../types/types'
import DoneTodosBoard from './components/DoneTodosBoard.vue'
const categoriesList = ref([
  {
    value: 'sport',
    title: 'Sport',
    image: 'https://via.placeholder.com/30x30',
    color: '#FF0000',
  },
  {
    value: 'education',
    title: 'Eduction',
    image: 'https://via.placeholder.com/30x30',
    color: '#00FF00',
  },
  {
    value: 'work',
    title: 'Work',
    image: 'https://via.placeholder.com/30x30',
    color: '#FF4500',
  },
  {
    value: 'other',
    title: 'Other',
    image: 'https://via.placeholder.com/30x30',
    color: '#FF4500',
  },
])

const todos = ref<TODO[]>([
  {
    id: 0,
    category: 'programming',
    title: 'Complete 2 task',
    description: 'If not today then neve! I must do this',
    creationDate: 'Wed, 05 Apr 2023 11:26:00 GMT',
  },
  {
    id: 1,
    category: 'math',
    title: 'Homework',
    description: 'Bro, dont forget to do your hm task3',
    creationDate: 'Wed, 05 Apr 2023 11:27:00 GMT',
  },
])

const doneTodos = ref<TODO[]>([
  {
    id: 2,
    category: 'programming',
    title: 'Done 2 task',
    description: 'If not today then neve! I must do this',
    creationDate: 'Wed, 05 Apr 2023 11:26:00 GMT',
  },
  {
    id: 3,
    category: 'math',
    title: 'Done',
    description: 'Bro, its done',
    creationDate: 'Wed, 05 Apr 2023 11:27:00 GMT',
  },
])

const deletedTodos = (deletedTodos: TODO[], type: string) => {
  if (type === 'todo') {
    todos.value = deletedTodos
  } else if (type === 'doneTodo') {
    doneTodos.value = deletedTodos
  }
}

const deleteAllTodos = (type: string) => {
  if (type === 'todo') {
    todos.value = []
  } else if (type === 'done') {
    doneTodos.value = []
  }
}

const editTodo = (id: number, todo: TODO, type: string) => {
  if (type === 'todo') {
    todos.value[id] = todo
  } else if (type === 'doneTodo') {
    doneTodos.value[id] = todo
  }
}

const addNewTodo = (newTodo: TODO, type: string) => {
  if (type === 'todo') {
    todos.value.unshift(newTodo)
  } else if (type === 'doneTodo') {
    doneTodos.value.unshift(newTodo)
  }
}

const doneTodo = (id: number) => {
  const indexElement = todos.value.findIndex((el) => el.id === id)
  console.log(indexElement)

  doneTodos.value.unshift(todos.value[indexElement])
  todos.value = todos.value.filter(
    (el) => el.id !== todos.value[indexElement].id
  )

  const stringifyTodos = JSON.stringify(doneTodos.value)
  saveTodosToLocalStorage('doneTodos', stringifyTodos)
}

const doTodo = (id: number) => {
  const indexElement = doneTodos.value.findIndex((el) => el.id === id)
  console.log(indexElement)

  todos.value.unshift(doneTodos.value[indexElement])
  doneTodos.value = doneTodos.value.filter(
    (el) => el.id !== doneTodos.value[indexElement].id
  )

  const stringifyTodos = JSON.stringify(todos.value)
  saveTodosToLocalStorage('todos', stringifyTodos)
}

const completeAllTodos = () => {
  for (let todo in todos.value) {
    doneTodos.value.unshift(todos.value[todo])
  }
  todos.value = []
  const stringifyTodos = JSON.stringify(doneTodos.value)
  saveTodosToLocalStorage('doneTodos', stringifyTodos)
}

const uncompleteAllTodos = () => {
  for (let todo in doneTodos.value) {
    todos.value.unshift(doneTodos.value[todo])
  }
  doneTodos.value = []
  const stringifyTodos = JSON.stringify(todos.value)
  saveTodosToLocalStorage('todos', stringifyTodos)
}

watch(
  () => todos.value,
  (newValue) => {
    const stringifyTodos = JSON.stringify(todos.value)
    saveTodosToLocalStorage('todos', stringifyTodos)
  }
)
watch(
  () => doneTodos.value,
  (newValue) => {
    console.log('changed donetodos')

    const stringifyTodos = JSON.stringify(doneTodos.value)
    saveTodosToLocalStorage('doneTodos', stringifyTodos)
  }
)

onMounted(() => {
  const todosFromLocalStorage = localStorage.getItem('todos')
  const doneTodosFromLocalStorage = localStorage.getItem('doneTodos')
  if (todosFromLocalStorage) {
    todos.value = JSON.parse(todosFromLocalStorage)
  }

  if (doneTodosFromLocalStorage) {
    doneTodos.value = JSON.parse(doneTodosFromLocalStorage)
  }
})
</script>
