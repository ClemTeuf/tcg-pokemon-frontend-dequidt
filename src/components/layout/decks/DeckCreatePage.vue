<template>
  <div class="container">
    <div class="header">
      <NButton @click="goBack"> ← Retour </NButton>

      <h1>Créer un deck</h1>
    </div>

    <div class="field">
      <label>Nom du deck</label>
      <NInput v-model:value="name" placeholder="Mon super deck" />
    </div>

    <p>{{ selectedCount }} / 10 cartes sélectionnées</p>

    <NButton type="primary" :disabled="!isValid" class="button" @click="submit">
      Créer le deck
    </NButton>

    <CardGrid v-model="selectedCards" :cards="cards" :max-selection="10" />
  </div>
</template>

<script setup lang="ts">
import { useMessage } from 'naive-ui'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import CardGrid from '@/components/layout/cards/CardGrid.vue'
import { useApi } from '@/composables/useApi'
import type { Card } from '@/types/card'

const api = useApi()
const router = useRouter()
const message = useMessage()

const cards = ref<Card[]>([])
const selectedCards = ref<Card[]>([])
const name = ref('')

const fetchCards = async () => {
  try {
    cards.value = await api.getCards()
  } catch (e: unknown) {
    message.error(e.message)
  }
}

const selectedCount = computed(() => selectedCards.value.length)

const isValid = computed(() => {
  return name.value.trim() !== '' && selectedCards.value.length === 10
})

const submit = async () => {
  if (!isValid.value) return

  try {
    await api.createDeck({
      name: name.value,
      cards: selectedCards.value.map((c) => c.id),
    })

    message.success('Deck créé')
    router.push('/')
  } catch (e: unknown) {
    message.error(e.message)
  }
}

const goBack = () => {
  router.back()
}

onMounted(fetchCards)
</script>

<style scoped>
.container {
  padding: 20px;
}

.header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
}

.button {
  width: 100%;
  margin: 16px 0;
}
</style>
