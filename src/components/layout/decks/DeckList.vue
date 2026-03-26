<template>
  <div class="container">
    <h1>Jouer</h1>

    <div class="play-section">
      <NCard title="Créer une partie" class="play-card">
        <NSelect
          v-model:value="selectedDeckId"
          placeholder="Sélectionner le deck"
          :options="deckOptions"
        />

        <NButton type="primary" style="margin-top: 12px" block>
          Créer la partie
        </NButton>
      </NCard>

      <NCard title="Parties disponibles" class="play-card">
        <NEmpty description="Aucune partie disponible pour l'instant" />
      </NCard>
    </div>

    <div class="deck-header">
      <h2>Mes decks</h2>

      <NButton type="success" @click="goToCreate"> + Nouveau deck </NButton>
    </div>

    <NCard>
      <NSpace vertical size="large">
        <NCard v-for="deck in decks" :key="deck.id" :title="deck.name">
          <p>{{ deck.cards.length }} cartes</p>

          <template #action>
            <NSpace>
              <NButton size="small" @click="goToDetail(deck.id)">
                Voir
              </NButton>

              <NButton size="small" type="warning" @click="goToEdit(deck.id)">
                Modifier
              </NButton>

              <NPopconfirm
                positive-text="Oui"
                negative-text="Non"
                @positive-click="deleteDeck(deck.id)"
              >
                <template #trigger>
                  <NButton size="small" type="error"> Supprimer </NButton>
                </template>
                Supprimer ce deck ?
              </NPopconfirm>
            </NSpace>
          </template>
        </NCard>
      </NSpace>
    </NCard>
  </div>
</template>

<script setup lang="ts">
import { useMessage } from 'naive-ui'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import { useApi } from '@/composables/useApi'
import type { Deck } from '@/types/deck'

const decks = ref<Deck[]>([])
const selectedDeckId = ref<number | null>(null)

const router = useRouter()
const message = useMessage()
const api = useApi()

const fetchDecks = async () => {
  try {
    decks.value = await api.getMyDecks()
  } catch (e) {
    if (e instanceof Error) {
      message.error(e.message)
    } else {
      message.error('Une erreur est survenue')
    }
  }
}

const deleteDeck = async (id: number) => {
  try {
    await api.deleteDeck(id)
    message.success('Deck supprimé')
    fetchDecks()
  } catch (e) {
    if (e instanceof Error) {
      message.error(e.message)
    } else {
      message.error('Une erreur est survenue')
    }
  }
}

const goToDetail = (id: number) => router.push(`/decks/${id}`)
const goToEdit = (id: number) => router.push(`/decks/${id}/edit`)
const goToCreate = () => router.push('/decks/create')

const deckOptions = computed(() =>
  decks.value.map((deck) => ({
    label: deck.name,
    value: deck.id,
  })),
)

onMounted(fetchDecks)
</script>

<style scoped>
.container {
  padding: 20px;
}

.play-section {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}

.play-card {
  flex: 1;
}

.deck-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
</style>
