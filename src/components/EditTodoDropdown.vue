<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <img
        v-bind="props"
        class="cursor-pointer p-[10px]"
        src="../assets/todo/edit.svg"
        alt="edit"
      />
    </template>
    <v-list>
      <v-list-item v-if="boardType === 'todo'">
        <v-list-item-title
          class="cursor-pointer"
          @click="doneTodo(props.todo.id)"
          >Done</v-list-item-title
        >
      </v-list-item>
      <v-list-item v-else-if="boardType === 'doneTodo'">
        <v-list-item-title class="cursor-pointer" @click="doTodo(props.todo.id)"
          >To do</v-list-item-title
        >
      </v-list-item>
      <v-list-item>
        <v-list-item-title class="cursor-pointer" @click="editTodo"
          >Edit</v-list-item-title
        >
      </v-list-item>
      <v-list-item>
        <v-list-item-title
          class="cursor-pointer"
          @click="deleteTodo(props.todo.id)"
          >Delete</v-list-item-title
        >
      </v-list-item>
    </v-list>
  </v-menu>
  <EditTodoDialog
    :categoriesList="props.categoriesList"
    :dialog="isTodoEditingDialogOpen"
    :currentTodo="props.todo"
    @closeTodoDialog="closeTodoDialog"
    @editedTodo="editedTodo"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { TODO, CategoryInList } from '../types/types'
import EditTodoDialog from './EditTodoDialog.vue'

const isTodoEditingDialogOpen = ref(false)
const props = defineProps<{
  todo: TODO
  categoriesList: CategoryInList[]
  boardType: string
}>()

const emit = defineEmits<{
  (e: 'deleteTodo', id: number): void
  (e: 'editedTodo', todo: TODO): void
  (e: 'doTodo', id: number): void
  (e: 'doneTodo', id: number): void
}>()

const editTodo = () => {
  console.log('editing todo')
  isTodoEditingDialogOpen.value = true
}

const deleteTodo = (id: number) => {
  console.log('delete', id)
  emit('deleteTodo', id)
}
const editedTodo = (todo: TODO) => {
  emit('editedTodo', todo)
}
const closeTodoDialog = () => {
  isTodoEditingDialogOpen.value = false
}

const doneTodo = (id: number) => {
  emit('doneTodo', id)
}
const doTodo = (id: number) => {
  emit('doTodo', id)
}
</script>
