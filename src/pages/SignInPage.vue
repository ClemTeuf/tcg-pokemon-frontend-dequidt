<template>
  <div id="container">
    <NCard id="card" title="Se connecter">
      <NForm @submit.prevent="handleSignIn">
        <NFormItem label="Email" required>
          <NInput
            v-model:value="email"
            type="email"
            placeholder="votre@email.com"
          />
        </NFormItem>
        <NFormItem label="Mot de passe" required>
          <NInput
            v-model:value="password"
            type="password"
            show-password-on="mousedown"
            placeholder="........"
          />
        </NFormItem>
        <NButton
          id="button"
          type="success"
          :loading="loading"
          :disabled="loading"
          attr-type="submit"
        >
          Se connecter
        </NButton>
        <div id="signin">
          Pas encore de compte ?
          <RouterLink to="/sign-up"> S'inscrire </RouterLink>
        </div>
        <div v-if="error" style="color: red">
          {{ error }}
        </div>
      </NForm>
    </NCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')

const loading = ref(false)
const error = ref<string | null>(null)

const handleSignIn = async () => {
  loading.value = true
  error.value = null

  try {
    await auth.signIn({
      email: email.value,
      password: password.value,
    })

    router.push('/')
  } catch (_e) {
    error.value = 'Identifiants incorrects'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
#container {
  display: flex;
  justify-content: center;
  margin-top: 75px;
}

#card {
  max-width: 400px;
}

#button {
  width: 100%;
}

#signin {
  text-align: center;
  margin: 15px;
}
</style>
