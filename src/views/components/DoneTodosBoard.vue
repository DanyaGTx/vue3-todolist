<template>
  <div
    class="w-[360px] h-[640px] overflow-x-hidden bg-[#CCF5D1] rounded-[18px] mt-[30px] pb-[10px]"
  >
    <div class="flex justify-between bg-[#CCF5D1] p-[24px] sticky top-0">
      <h3 class="font-medium text-[16px]">Done todos</h3>
      <div class="flex gap-4">
        <img
          @click="openTodoGialog"
          class="cursor-pointer"
          src="../../assets/todo/add.svg"
          alt="add"
        />
        <EditAllTodos
          :boardType="props.boardType"
          @completeAllTodos="completeAllTodos"
          @uncompleteAllTodos="uncompleteAllTodos"
          @deleteAllTodos="deleteAllTodos"
          :todos="props.todos"
        />
      </div>
    </div>
    <div v-if="todos.length">
      <TodoItem
        :categoriesList="categoriesList"
        @deleteTodo="deleteTodoFromList"
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        :allTodos="todos"
        @editedTodo="editedTodo"
        @doTodo="doTodo"
        :boardType="props.boardType"
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
  (e: 'doTodo', id: number): void
  (e: 'completeAllTodos'): void
  (e: 'uncompleteAllTodos'): void
}>()

const openTodoGialog = () => {
  console.log('ADD')
  isTodoDialogOpen.value = true
}

const deleteTodoFromList = (id: number) => {
  const deletedTodos = props.todos.filter((todo) => todo.id !== id)
  emit('deletedTodos', deletedTodos, 'doneTodo')
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
  emit('addNewTodo', newTodo, 'doneTodo')

  const stringifyTodos = JSON.stringify(props.todos)
  saveTodosToLocalStorage('doneTodos', stringifyTodos)
}

const completeAllTodos = () => {
  emit('completeAllTodos')
}

const deleteAllTodos = () => {
  emit('deleteAllTodos')
}

const editedTodo = (todo: TODO) => {
  const findTodoInArray = (todoInArray: TODO) => todoInArray.id === todo.id
  const myIndex = props.todos.findIndex(findTodoInArray)
  emit('editTodo', myIndex, todo, 'doneTodo')
  const stringifyTodos = JSON.stringify(props.todos)
  saveTodosToLocalStorage('doneTodos', stringifyTodos)
}

const doTodo = (id: number) => {
  emit('doTodo', id)
}

const uncompleteAllTodos = () => {
  emit('uncompleteAllTodos')
}
</script>
