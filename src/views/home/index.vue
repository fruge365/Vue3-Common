<template>
  <div class="home">
    <div class="box"></div>
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
<style lang="scss">
  .home {
    .box {
      height: 100px;
      width: 100px;
      background-color: red;
    }
  }
</style>
