<template>
  <div id="container">
    <NCard id="card" title="S'inscrire">
      <NForm @submit.prevent="handleSignUp">
        <NFormItem label="Nom d'utilisateur" required>
          <NInput
            v-model:value="username"
            type="text"
            placeholder="Dresseur42"
          />
        </NFormItem>
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
          S'inscrire
        </NButton>
        <div id="signup">
          Déjà un compte ? <RouterLink to="/sign-in"> Se connecter </RouterLink>
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
const authStore = useAuthStore()
const router = useRouter()

const username = ref('')
const email = ref('')
const password = ref('')

const loading = ref(false)
const error = ref<string | null>(null)

const handleSignUp = async () => {
  loading.value = true
  error.value = null

  try {
    await authStore.signUp({
      username: username.value,
      email: email.value,
      password: password.value,
    })

    router.push('/')
  } catch (_e) {
    error.value = 'Erreur inscription'
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

#signup {
  text-align: center;
  margin: 15px;
}
</style>
