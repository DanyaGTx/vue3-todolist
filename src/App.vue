<template>
  <div class="max-w-[1440px] mt-[10px] m-auto">
    <div class="flex justify-center">
      <SideBar />
      <div
        class="bg-white shadow-sidebar pl-[15px] pr-[15px] pt-[30px] ml-[0px] border-[1px] border-gray-100"
      >
        <BoardComponent />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SideBar from './components/SideBar.vue'
import BoardComponent from './views/BoardComponent.vue'
</script>
