<script setup lang="ts">
import { inject, ref, onMounted, provide, computed, reactive } from 'vue'

defineProps<{
  type?: 'multiple-choice' | 'true-false'
}>()

interface QuizState {
  answers: Map<number, { selected: number | null; correct: boolean }>
  questionCount: number
  showResults: boolean
}

const quizState = inject<QuizState>('quizState')

const questionIndex = ref(-1)
const optionCount = ref(0)

onMounted(() => {
  if (quizState) {
    questionIndex.value = quizState.questionCount
    quizState.questionCount++
    quizState.answers.set(questionIndex.value, { selected: null, correct: false })
  }
})

const questionState = reactive({
  index: questionIndex,
  optionCount: 0,
})

provide('questionState', questionState)
provide('quizState', quizState)
</script>

<template>
  <div class="space-y-3">
    <div class="font-medium">
      <slot />
    </div>
  </div>
</template>
