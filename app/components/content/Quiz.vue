<script setup lang="ts">
import { ref, provide, computed, reactive } from 'vue'

const props = defineProps<{
  id: string
  title?: string
}>()

interface Answer {
  selected: number | null
  correct: boolean
}

const state = reactive({
  answers: new Map<number, Answer>(),
  questionCount: 0,
  showResults: false,
})

provide('quizState', state)

const score = computed(() => {
  let correct = 0
  state.answers.forEach((answer) => {
    if (answer.correct) correct++
  })
  return correct
})

const allAnswered = computed(() => {
  let answered = 0
  state.answers.forEach((answer) => {
    if (answer.selected !== null) answered++
  })
  return answered === state.questionCount && state.questionCount > 0
})

function checkAnswers() {
  state.showResults = true
}

function resetQuiz() {
  state.showResults = false
  state.answers.forEach((_, key) => {
    state.answers.set(key, { selected: null, correct: false })
  })
}
</script>

<template>
  <div class="not-prose my-8 rounded-lg border border-border overflow-hidden">
    <div class="bg-muted px-4 py-3 border-b border-border">
      <h3 class="font-semibold text-lg">
        {{ title || 'Check Your Understanding' }}
      </h3>
    </div>

    <div class="p-4 space-y-6">
      <slot />
    </div>

    <div class="px-4 py-3 bg-muted/50 border-t border-border flex items-center justify-between">
      <div v-if="state.showResults" class="text-sm">
        Score: <span class="font-semibold">{{ score }}/{{ state.questionCount }}</span>
        <span v-if="score === state.questionCount" class="ml-2 text-green-600 dark:text-green-400">
          Perfect!
        </span>
      </div>
      <div v-else class="text-sm text-muted-foreground">
        {{ allAnswered ? 'Ready to check!' : `Answer all ${state.questionCount} questions` }}
      </div>

      <div class="flex gap-2">
        <button
          v-if="state.showResults"
          type="button"
          class="px-4 py-2 text-sm rounded-md border border-border hover:bg-muted transition-colors"
          @click="resetQuiz"
        >
          Try Again
        </button>
        <button
          v-else
          type="button"
          :disabled="!allAnswered"
          class="px-4 py-2 text-sm rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          @click="checkAnswers"
        >
          Check Answers
        </button>
      </div>
    </div>
  </div>
</template>
