<template>
  <div class="container">
    <h1>{{ deck?.name }}</h1>

    <NButton type="warning" class="full-button" @click="goToEdit">
      Modifier
    </NButton>

    <CardGrid :cards="deckCards" :model-value="deckCards" :max-selection="10" />
  </div>
</template>

<script setup lang="ts">
import { useMessage } from 'naive-ui'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'

import CardGrid from '@/components/layout/cards/CardGrid.vue'
import { useApi } from '@/composables/useApi'
import type { Card, Deck } from '@/types'

const api = useApi()
const route = useRoute()
const message = useMessage()
const router = useRouter()

const deck = ref<Deck | null>(null)
const deckCards = ref<Card[]>([])

const fetchData = async () => {
  try {
    const [deckRes, cardsRes] = await Promise.all([
      api.getDeck(route.params.id as string),
      api.getCards(),
    ])

    deck.value = deckRes

    deckCards.value = deckRes.cards
      .map((dc) => cardsRes.find((c) => c.id === dc.cardId))
      .filter(Boolean) as Card[]
  } catch (e: unknown) {
    message.error(e.message)
  }
}

const goToEdit = () => {
  router.push(`/decks/${route.params.id}/edit`)
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
