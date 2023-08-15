<template>
  <div class="w-[225px] min-h-[800px] shadow-sidebar bg-white">
    <div class="pl-[45px] pt-[30px]">
      <div class="flex gap-3">
        <img src="../assets/logo.svg" alt="" />
        <h2 class="font-bold text-[16px]">Todo List</h2>
      </div>
    </div>

    <div class="w-full mt-[30px]">
      <div class="mb-[20px]">
        <router-link :to="{ name: 'board' }"
          ><div class="ml-[45px] pr-[10px] pt-[10px] pb-[10px] flex">
            <img class="mr-[15px]" src="../assets/sidebar/board.svg" alt="" />
            Tasks
          </div></router-link
        >
      </div>
    </div>
  </div>
</template>
