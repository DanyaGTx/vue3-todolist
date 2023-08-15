<template>
  <div>
    <v-dialog v-model="dialog" width="600">
      <v-card>
        <v-sheet>
          <v-form
            @submit.prevent
            ref="addTodoFormRef"
            data-test="addTodoForm"
            class="max-w-[400px] mt-[20px] m-auto w-full"
          >
            <v-select
              class="mb-[10px]"
              :closable-chips="false"
              v-model="todoData.category"
              :items="props.categoriesList"
              label="Category *"
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
              data-test="todoTitleInput"
              class="mb-[10px]"
              :counter="50"
              v-model="todoData.title"
              label="Title of todo *"
              ref="titleInputRef"
              :rules="checkTitleValidation()"
            ></v-text-field>
            <v-text-field
              data-test="todoDescriptionInput"
              class="mb-[10px]"
              v-model="todoData.description"
              label="Description of todo"
            ></v-text-field>

            <div class="flex justify-center">
              <v-card-actions>
                <v-btn
                  color="primary"
                  class="closeTodoDialogBtn"
                  block
                  @click="closeTodoDialog"
                  >Close Dialog</v-btn
                >
              </v-card-actions>
              <v-card-actions>
                <v-btn
                  type="submit"
                  color="success"
                  variant="outlined"
                  class="addTodoBtn"
                  block
                  @click="addNewTodo"
                  >Add new todo</v-btn
                >
              </v-card-actions>
            </div>
          </v-form>
        </v-sheet>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import {
  checkSelectValidation,
  checkTitleValidation,
} from '../validations/validations'
const titleInputRef = ref<HTMLElement>()
const addTodoFormRef = ref<HTMLFormElement>()

type TodoFields = {
  category: string
  title: string
  description: string
}

type CategoryInList = {
  value: string
  title: string
  image: string
  color: string
}

const dialog = ref(false)

const todoData = ref<TodoFields>({
  category: '',
  title: '',
  description: '',
})

const emit = defineEmits<{
  (e: 'closeTodoDialog'): void
  (e: 'addNewTodo', todo: TodoFields): void
}>()

const addNewTodo = async () => {
  if (addTodoFormRef.value) {
    try {
      const { valid } = await addTodoFormRef.value.validate()
      if (valid) {
        emit('addNewTodo', todoData.value)
        emit('closeTodoDialog')
        clearTodoFields()
      }
    } catch (e) {
      console.log(e)
    }
  }
}

const clearTodoFields = () => {
  todoData.value.category = ''
  todoData.value.title = ''
  todoData.value.description = ''
}

const closeTodoDialog = () => {
  console.log(todoData.value)
  emit('closeTodoDialog')
}

const props = defineProps<{
  dialog: boolean
  categoriesList: CategoryInList[]
}>()

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
</script>
