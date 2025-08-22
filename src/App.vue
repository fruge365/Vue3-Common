<script setup>
import { getCurrentLocale } from '@/utils/locale';
</script>

<template>
    <el-config-provider :locale="getCurrentLocale()">
  <router-view></router-view>
    </el-config-provider>
</template>

<style scoped>
</style>
