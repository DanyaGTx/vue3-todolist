<template>
  <div
    class="w-[310px] m-auto min-h-[200px] mt-[20px] p-[25px] rounded-[20px] bg-white"
  >
    <div class="flex items-center justify-between">
      <div class="flex gap-2">
        <img
          src="../assets/todo/types-icons/green-status.svg"
          alt="green"
        /><span class="text-[14px] text-[#707070]">{{
          props.todo.category
        }}</span>
      </div>
      <div>
        <EditTodoDropdown
          :todo="props.todo"
          :boardType="props.boardType"
          :categoriesList="props.categoriesList"
          @deleteTodo="deleteTodo"
          @editedTodo="editedTodo"
          @doTodo="doTodo"
          @doneTodo="doneTodo"
        />
      </div>
    </div>
    <div class="mt-[20px]">
      <h3 class="text-[18px] font-medium">{{ props.todo.title }}</h3>
      <p class="text-[14px] mt-[5px]">
        {{ props.todo.description }}
      </p>

      <p class="text-[12px] mt-[10px]">
        Created at {{ props.todo.creationDate }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import EditTodoDropdown from './EditTodoDropdown.vue'
import { TODO, CategoryInList } from '../types/types'

const props = defineProps<{
  allTodos: TODO[]
  todo: TODO
  categoriesList: CategoryInList[]
  boardType: string
}>()

const emit = defineEmits<{
  (e: 'deleteTodo', id: number): void
  (e: 'closeTodoDialog'): void
  (e: 'editedTodo', todo: TODO): void
  (e: 'doTodo', id: number): void
  (e: 'doneTodo', id: number): void
}>()

const deleteTodo = (id: number) => {
  emit('deleteTodo', id)
}

const editedTodo = (todo: TODO) => {
  emit('editedTodo', todo)
}
const doneTodo = (id: number) => {
  emit('doneTodo', id)
}

const doTodo = (id: number) => {
  emit('doTodo', id)
}
</script>
