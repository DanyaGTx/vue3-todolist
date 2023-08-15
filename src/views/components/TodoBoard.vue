<template>
  <div
    class="w-[360px] h-[640px] overflow-x-hidden bg-[#EEF2F5] rounded-[18px] mt-[30px] pb-[10px]"
  >
    <div class="flex justify-between bg-[#EEF2F5] p-[24px] sticky top-0">
      <h3 class="font-medium text-[16px]">To do</h3>
      <div class="flex gap-4">
        <img
          @click="openTodoGialog"
          class="cursor-pointer"
          src="../../assets/todo/add.svg"
          alt="add"
        />
        <EditAllTodos
          @completeAllTodos="completeAllTodos"
          @deleteAllTodos="deleteAllTodos"
          :boardType="props.boardType"
          :todos="props.todos"
        />
      </div>
    </div>
    <div v-if="todos.length">
      <TodoItem
        :categoriesList="categoriesList"
        :boardType="props.boardType"
        @deleteTodo="deleteTodoFromList"
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        :allTodos="todos"
        @editedTodo="editedTodo"
        @doneTodo="doneTodo"
      />
    </div>
    <div class="text-center text-[20px]" v-else>Nothing to do</div>

    <AddTodoDialog
      :categoriesList="categoriesList"
      :dialog="isTodoDialogOpen"
      @closeTodoDialog="isTodoDialogOpen = false"
      @addNewTodo="addNewTodo"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import saveTodosToLocalStorage from '../../helpers/saveTodoToLocalStorage'
import AddTodoDialog from '../../components/AddTodoDialog.vue'
import EditAllTodos from '../../components/EditAllTodosDropdown.vue'
import TodoItem from '../../components/TodoItem.vue'

import { TODO, CategoryInList } from '../../types/types'

type TodoFields = {
  category: string
  title: string
  description: string
}

const isTodoDialogOpen = ref(false)

const props = defineProps<{
  todos: TODO[]
  categoriesList: CategoryInList[]
  boardType: string
}>()

const emit = defineEmits<{
  (e: 'deletedTodos', deletedTodos: TODO[], type: string): void
  (e: 'addNewTodo', addNewTodo: TODO, type: string): void
  (e: 'deleteAllTodos'): void
  (e: 'editTodo', id: number, todo: TODO, type: string): void
  (e: 'doneTodo', id: number): void
  (e: 'completeAllTodos'): void
}>()

const openTodoGialog = () => {
  console.log('ADD')
  isTodoDialogOpen.value = true
}

const deleteTodoFromList = (id: number) => {
  const deletedTodos = props.todos.filter((todo) => todo.id !== id)
  emit('deletedTodos', deletedTodos, 'todo')
}

const addNewTodo = (todo: TodoFields) => {
  const uid = new Date()
  const dateOfTodoCreation = new Date(uid).toUTCString()
  const newTodo = {
    id: +uid,
    category: todo.category,
    title: todo.title,
    description: todo.description,
    creationDate: dateOfTodoCreation,
  }
  emit('addNewTodo', newTodo, 'todo')

  const stringifyTodos = JSON.stringify(props.todos)
  saveTodosToLocalStorage('todos', stringifyTodos)
}

const deleteAllTodos = () => {
  emit('deleteAllTodos')
}

const editedTodo = (todo: TODO) => {
  const findTodoInArray = (todoInArray: TODO) => todoInArray.id === todo.id
  const myIndex = props.todos.findIndex(findTodoInArray)
  emit('editTodo', myIndex, todo, 'todo')
  const stringifyTodos = JSON.stringify(props.todos)
  saveTodosToLocalStorage('todos', stringifyTodos)
}

const doneTodo = (id: number) => {
  emit('doneTodo', id)
}

const completeAllTodos = () => {
  emit('completeAllTodos')
}
</script>
