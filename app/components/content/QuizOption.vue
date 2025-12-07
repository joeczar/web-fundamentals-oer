<script setup lang="ts">
import { inject, ref, onMounted, computed } from 'vue'

const props = defineProps<{
  correct?: boolean
}>()

interface QuizState {
  answers: Map<number, { selected: number | null; correct: boolean }>
  questionCount: number
  showResults: boolean
}

interface QuestionState {
  index: { value: number }
  optionCount: number
}

const quizState = inject<QuizState>('quizState')
const questionState = inject<QuestionState>('questionState')

const optionIndex = ref(-1)

onMounted(() => {
  if (questionState) {
    optionIndex.value = questionState.optionCount
    questionState.optionCount++
  }
})

const isSelected = computed(() => {
  if (!quizState || !questionState) return false
  const answer = quizState.answers.get(questionState.index.value)
  return answer?.selected === optionIndex.value
})

const showResults = computed(() => quizState?.showResults ?? false)

const resultClass = computed(() => {
  if (!showResults.value) return ''
  if (props.correct) return 'border-green-500 bg-green-50 dark:bg-green-950/30'
  if (isSelected.value && !props.correct) return 'border-red-500 bg-red-50 dark:bg-red-950/30'
  return ''
})

function selectOption() {
  if (showResults.value) return
  if (quizState && questionState) {
    quizState.answers.set(questionState.index.value, {
      selected: optionIndex.value,
      correct: props.correct ?? false,
    })
  }
}
</script>

<template>
  <button
    type="button"
    :class="[
      'w-full text-left px-4 py-3 rounded-lg border-2 transition-all',
      isSelected && !showResults ? 'border-primary bg-primary/5' : 'border-border',
      showResults ? 'cursor-default' : 'hover:border-primary/50 cursor-pointer',
      resultClass,
    ]"
    :disabled="showResults"
    @click="selectOption"
  >
    <div class="flex items-center gap-3">
      <div
        :class="[
          'w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0',
          isSelected ? 'border-primary' : 'border-muted-foreground/30',
        ]"
      >
        <div
          v-if="isSelected"
          class="w-2.5 h-2.5 rounded-full bg-primary"
        />
      </div>
      <span class="flex-1">
        <slot />
      </span>
      <svg
        v-if="showResults && props.correct"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="text-green-500"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
      <svg
        v-if="showResults && isSelected && !props.correct"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="text-red-500"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </div>
  </button>
</template>
