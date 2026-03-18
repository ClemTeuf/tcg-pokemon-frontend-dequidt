<template>
  <NConfigProvider>
    <NMessageProvider>
      <NLayout>
        <HeaderBar v-if="auth.isAuthenticated" />
        <NLayoutContent>
          <RouterView />
        </NLayoutContent>
      </NLayout>
    </NMessageProvider>
  </NConfigProvider>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

import HeaderBar from './components/layout/HeaderBar.vue'
const auth = useAuthStore()
</script>

<style>
body {
  padding: 0 20px;
}
</style>
