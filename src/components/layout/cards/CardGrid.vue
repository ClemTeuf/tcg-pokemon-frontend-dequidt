<template>
  <NGrid :cols="6" :x-gap="12" :y-gap="12">
    <NGridItem v-for="card in cards" :key="card.id">
      <PokemonCard
        :card="card"
        selectable
        :selected="isSelected(card)"
        :disabled="isDisabled(card)"
        @select="toggleCard"
      />
    </NGridItem>
  </NGrid>
</template>

<script setup lang="ts">
import { NGridItem } from 'naive-ui'

import type { Card } from '@/types/card.ts'

import PokemonCard from './PokemonCard.vue'

const props = defineProps<{
  cards: Card[]
  modelValue: Card[]
  maxSelection: number
}>()

const emit = defineEmits<(e: 'update:modelValue', value: Card[]) => void>()

function isSelected(card: Card) {
  return props.modelValue.some((c) => c.id === card.id)
}

function isDisabled(card: Card) {
  return !isSelected(card) && props.modelValue.length >= props.maxSelection
}

function toggleCard(card: Card) {
  const selected = [...props.modelValue]

  const index = selected.findIndex((c) => c.id === card.id)

  if (index !== -1) {
    selected.splice(index, 1)
  } else {
    if (selected.length >= props.maxSelection) {
      return
    }
    selected.push(card)
  }

  emit('update:modelValue', selected)
}
</script>
