<template>
  <div class="container">
    <h1>Modifier le deck</h1>

    <NInput v-model:value="name" placeholder="Nom du deck" />

    <p>{{ selectedCards.length }} / 10 cartes</p>

    <NButton
      type="primary"
      :disabled="!isValid"
      class="full-button"
      @click="submit"
    >
      Sauvegarder
    </NButton>

    <CardGrid v-model="selectedCards" :cards="cards" :max-selection="10" />
  </div>
</template>

<script setup lang="ts">
import { useMessage } from 'naive-ui'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import CardGrid from '@/components/layout/cards/CardGrid.vue'
import { useApi } from '@/composables/useApi'
import type { Card } from '@/types'

const api = useApi()
const route = useRoute()
const router = useRouter()
const message = useMessage()

const name = ref('')
const cards = ref<Card[]>([])
const selectedCards = ref<Card[]>([])

const fetchData = async () => {
  try {
    const [deckRes, cardsRes] = await Promise.all([
      api.getDeck(route.params.id as string),
      api.getCards(),
    ])

    name.value = deckRes.name
    cards.value = cardsRes

    // 🔥 PRÉ-REMPLISSAGE
    selectedCards.value = deckRes.cards
      .map((dc) => cardsRes.find((c) => c.id === dc.cardId))
      .filter(Boolean) as Card[]
  } catch (e: unknown) {
    message.error(e.message)
  }
}

const isValid = computed(() => {
  return name.value.trim() !== '' && selectedCards.value.length === 10
})

const submit = async () => {
  if (!isValid.value) return

  try {
    await api.updateDeck(route.params.id as string, {
      name: name.value,
      cards: selectedCards.value.map((c) => c.id),
    })

    message.success('Deck modifié')
    router.push(`/decks/${route.params.id}`)
  } catch (e: unknown) {
    message.error(e.message)
  }
}

onMounted(fetchData)
</script>

<style scoped>
.container {
  padding: 20px;
}

.full-button {
  width: 100%;
  margin: 16px 0;
}
</style>
