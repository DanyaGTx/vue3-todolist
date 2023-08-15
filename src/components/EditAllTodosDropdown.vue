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
      <v-list-item v-if="props.boardType === 'todo'">
        <v-list-item-title
          :class="{
            disableCompleting: !props.todos.length,
          }"
          class="cursor-pointer"
          @click="completeAllTodos"
          >Complete all todos</v-list-item-title
        >
      </v-list-item>
      <v-list-item v-else-if="props.boardType === 'doneTodo'">
        <v-list-item-title
          class="cursor-pointer"
          :class="{
            disableCompleting: !props.todos.length,
          }"
          @click="uncompleteAllTodos"
          >Uncomplete all todos</v-list-item-title
        >
      </v-list-item>

      <v-list-item>
        <v-list-item-title
          :class="{
            disableCompleting: !props.todos.length,
          }"
          class="cursor-pointer"
          @click="deleteAllTodos"
          >Delete all todos</v-list-item-title
        >
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { TODO } from '../types/types'

const props = defineProps<{
  boardType: string
  todos: TODO[]
}>()

const emit = defineEmits<{
  (e: 'deleteAllTodos'): void
  (e: 'completeAllTodos'): void
  (e: 'uncompleteAllTodos'): void
}>()

const deleteAllTodos = () => {
  emit('deleteAllTodos')
}

const completeAllTodos = () => {
  emit('completeAllTodos')
}
const uncompleteAllTodos = () => {
  emit('uncompleteAllTodos')
}

onMounted(() => {
  console.log('LENGTH', props.todos.length)
})
</script>
