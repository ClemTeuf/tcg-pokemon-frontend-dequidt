<template>
  <NCard
    hoverable
    :class="['pokemon-card', size, { selected, disabled }]"
    @click="handleClick"
  >
    <div class="card-content">
      <img :src="card.imgUrl" class="img" />

      <div class="pokedex">#{{ card.pokedexNumber }}</div>
      <h3>{{ card.name }}</h3>

      <NTag
        :bordered="false"
        :style="{ backgroundColor: getTypeColor(card.type), color: '#fff' }"
      >
        {{ card.type }}
      </NTag>

      <div class="stats">
        <div>❤️ {{ card.hp }}</div>
        <div>⚔️ {{ card.attack }}</div>
      </div>

      <NProgress
        v-if="currentHp !== undefined"
        type="line"
        :percentage="(currentHp / card.hp) * 100"
        :show-indicator="false"
      />
    </div>
  </NCard>
</template>

<script setup lang="ts">
import { useColors } from '@/composables/useColors'
import type { Card } from '@/types/card.ts'

const { getTypeColor } = useColors()

const props = defineProps<{
  card: Card
  size?: 'sm' | 'md'
  selectable?: boolean
  selected?: boolean
  disabled?: boolean
  currentHp?: number
}>()

const emit = defineEmits<(e: 'select', card: Card) => void>()

function handleClick() {
  if (!props.selectable || props.disabled) return
  emit('select', props.card)
}
</script>

<style scoped>
.pokemon-card.sm {
  width: 120px;
}

.pokemon-card.md {
  width: 180px;
}

.pokemon-card.selected {
  border: 2px solid #019440;
}

.pokemon-card.disabled {
  opacity: 0.4;
  pointer-events: none;
}

.img {
  width: 100%;
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 6px;
}

.stats {
  display: flex;
  justify-content: center;
  gap: 16px;
  font-weight: bold;
}
</style>
