<template>
  <div class="home">
    <div class="main">
      <h3>main</h3>
      <p>{{ mainStore.counter }}</p>
      <button @click="increment()">Increment</button>
    </div>
    <div class="users">
      <h3>users</h3>
      <p>{{ usersStore.UsersCounter }}</p>
      <button @click="UsersIncrement()">Increment</button>
    </div>
  </div>
</template>

<script setup>
import { getHistoryApi } from "@/api/test";
import { useMainStore } from "@/store/main";
import { onMounted } from "vue";
import { useUsersStore } from "@/store/users";

const mainStore = useMainStore();
const usersStore = useUsersStore();
const { increment } = mainStore;
const { UsersIncrement } = usersStore;

const historyApi = async () => {
  try {
    const response = await getHistoryApi();
    console.log("🚀 ~ historyApi ~ response:", response);
  } catch (error) {
  } finally {
  }
};

onMounted(() => {
  historyApi();
});
</script>
