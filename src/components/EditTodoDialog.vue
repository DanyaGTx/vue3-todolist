<template>
  <div>
    <v-dialog v-model="dialog" width="600">
      <v-card>
        <v-form
          @submit.prevent
          ref="editingFormRef"
          class="max-w-[400px] mt-[20px] m-auto w-full"
        >
          <v-select
            :closable-chips="false"
            v-model="editingTodoData.category"
            :items="props.categoriesList"
            label="Category"
            ref="categorySelect"
            :rules="checkSelectValidation()"
          >
            <template v-slot:selection="{ item }">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-select>
          <v-text-field
            :rules="checkTitleValidation()"
            :counter="50"
            v-model="editingTodoData.title"
            label="Title of todo"
          ></v-text-field>
          <v-text-field
            v-model="editingTodoData.description"
            label="Description of todo"
          ></v-text-field>

          <div class="flex justify-center">
            <v-card-actions>
              <v-btn color="primary" @click="closeTodoDialog"
                >Close Dialog</v-btn
              >
            </v-card-actions>
            <v-card-actions>
              <v-btn
                type="submit"
                color="success"
                variant="outlined"
                @click="editTodo"
                >Edit todo</v-btn
              >
            </v-card-actions>
          </div>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { CategoryInList, TODO } from '../types/types'
import {
  checkTitleValidation,
  checkSelectValidation,
} from '../validations/validations'
const editingFormRef = ref<HTMLFormElement>()

type TodoFields = {
  id: number
  category: string
  title: string
  description: string
  creationDate: string
}

type EditingTodoData = {
  category: string
  title: string
  description: string
}

const editingTodoData = ref<EditingTodoData>({
  category: '',
  title: '',
  description: '',
})

const dialog = ref(false)

const props = defineProps<{
  dialog: boolean
  categoriesList: CategoryInList[]
  currentTodo: TODO
}>()

const todoData = ref<TodoFields>()

const emit = defineEmits<{
  (e: 'closeTodoDialog'): void
  (e: 'editedTodo', todo: TODO): void
}>()

const editTodo = async () => {
  todoData.value = {
    id: props.currentTodo.id,
    category: editingTodoData.value.category,
    title: editingTodoData.value.title,
    description: editingTodoData.value.description,
    creationDate: props.currentTodo.creationDate,
  }

  if (editingFormRef.value) {
    const { valid } = await editingFormRef.value.validate()
    if (valid) {
      emit('editedTodo', todoData.value)
      emit('closeTodoDialog')
    }
  }
}

const closeTodoDialog = () => {
  emit('closeTodoDialog')
}

watch(
  () => props.dialog,
  (newValue) => {
    dialog.value = newValue
  }
)
watch(
  () => dialog.value,
  (newValue) => {
    if (newValue === false) {
      closeTodoDialog()
    }
  }
)

onMounted(() => {
  editingTodoData.value = {
    category: props.currentTodo.category,
    title: props.currentTodo.title,
    description: props.currentTodo.description,
  }
})
</script>

<style scoped></style>
