import AddTodoDialog from '../components/AddTodoDialog.vue'
import { mount, flushPromises, shallowMount } from '@vue/test-utils'
import { it,expect, describe, afterEach, vi, expectTypeOf } from "vitest"
import { nextTick } from 'vue';

describe('AddTodoDialog', () => {
  let wrapper; 

  const createComponent = () => {
    wrapper = mount(AddTodoDialog)
  }

  afterEach(() => {
    wrapper.unmount()
  })

  it('addTodoDialog renders', () => {
    createComponent()
    expect(wrapper.text()).toContain('Close Dialog')
  })

  it('emit closing dialog page', async () => {
    createComponent()
    wrapper.find('.closeTodoDialogBtn').trigger('click')
    console.log('CLOSE WRAPPER', wrapper.emitted())
    expect(await wrapper.emitted()).toHaveProperty('closeTodoDialog')
  })

  it('valid to add todo', async () => {
    createComponent()
    const addTodoFormRef = {
      value: {
        validate: vi.fn().mockResolvedValue({ valid: true }),
      },
    };

    await wrapper.find('.addTodoBtn').trigger('click')
    expect(await addTodoFormRef.value.validate()).toEqual({ valid: true })

    await nextTick()
  })
})  
