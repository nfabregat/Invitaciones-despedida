<script setup lang="ts">
import { computed, ref } from 'vue'

const showModal = ref(true)
const isConfirmed = ref(false)
const noCount = ref(0)
const noOffset = ref({ x: 0, y: 0 })

const yesScale = computed(() => 1 + noCount.value * 0.24 + noCount.value * noCount.value * 0.18)

const acceptInvitation = () => {
  isConfirmed.value = true
  showModal.value = false
}

const declineInvitation = () => {
  noCount.value += 1

  const yesSize = 140 * yesScale.value
  const noSize = 150
  const padding = 18

  const yesHalfWidth = yesSize / 2 + padding
  const yesHalfHeight = yesSize / 2 + padding
  const noHalfWidth = noSize / 2
  const noHalfHeight = noSize / 2

  const safeWidth = 360
  const safeHeight = 620
  const safeLeft = -safeWidth / 2
  const safeRight = safeWidth / 2
  const safeTop = -safeHeight / 2
  const safeBottom = safeHeight / 2

  const earlyThreshold = 6
  const shouldExitScreen = noCount.value >= earlyThreshold

  let nextX = 0
  let nextY = 0

  if (!shouldExitScreen) {
    const candidates = [
      { x: 0, y: 0 },
      { x: 90, y: 0 },
      { x: -90, y: 0 },
      { x: 0, y: 80 },
      { x: 0, y: -80 },
      { x: 120, y: -70 },
      { x: -120, y: 70 },
      { x: 140, y: 40 },
      { x: -140, y: -40 },
      { x: 60, y: -120 },
      { x: -60, y: 120 }
    ]

    const chosen =
      candidates.find(({ x, y }) => {
        const noLeft = x - noHalfWidth
        const noRight = x + noHalfWidth
        const noTop = y - noHalfHeight
        const noBottom = y + noHalfHeight

        const overlapsYes =
          noRight > -yesHalfWidth &&
          noLeft < yesHalfWidth &&
          noBottom > -yesHalfHeight &&
          noTop < yesHalfHeight

        const insideSafeArea =
          noLeft >= safeLeft &&
          noRight <= safeRight &&
          noTop >= safeTop &&
          noBottom <= safeBottom

        return insideSafeArea && !overlapsYes
      }) ?? { x: 0, y: 0 }

    nextX = chosen.x
    nextY = chosen.y
  } else {
    const randomX = (Math.random() * 2 - 1) * (safeWidth / 2 + 120)
    const randomY = (Math.random() * 2 - 1) * (safeHeight / 2 + 80)
    nextX = randomX
    nextY = randomY
  }

  noOffset.value = { x: nextX, y: nextY }
}
</script>

<template>
  <main class="invitation-page">
    <div v-if="showModal" class="modal-backdrop" aria-modal="true" role="dialog" @click.self.prevent>
      <div class="modal-card" @click.stop>
        <p class="modal-question">¿Cuento contigo?</p>

        <div class="modal-actions">
          <button
            type="button"
            class="modal-button yes-button"
            :style="{ transform: `scale(${yesScale})` }"
            @click="acceptInvitation"
            aria-label="Sí"
          >
            <img src="/invitation/si.png" alt="Sí" class="modal-image" />
          </button>

          <button
            type="button"
            class="modal-button no-button"
            :style="{ transform: `translate(${noOffset.x}px, ${noOffset.y}px)` }"
            @click="declineInvitation"
            aria-label="No"
          >
            <img src="/invitation/no.png" alt="No" class="modal-image" />
          </button>
        </div>
      </div>
    </div>

    <div v-if="!showModal && isConfirmed" class="page-content" aria-label="Página de invitación">
      <div class="placeholder-surface" />
    </div>
  </main>
</template>

<style scoped>
.invitation-page {
  position: relative;
  width: 100vw;
  min-height: 100vh;
  background: #f6d8e6;
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(70, 30, 40, 0.28);
  z-index: 50;
}

.modal-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  width: min(90vw, 560px);
  padding: 2.25rem 1.5rem 1.75rem;
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.82);
  box-shadow: 0 16px 36px rgba(71, 28, 41, 0.18);
}

.modal-question {
  margin: 0;
  font-size: clamp(2rem, 5vw, 2.8rem);
  color: #5a1f3f;
  font-family: 'Caveat', cursive;
  text-align: center;
  line-height: 1;
}

.modal-actions {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
  width: 100%;
  min-height: 180px;
}

.modal-button {
  border: 0;
  background: transparent;
  padding: 0;
  cursor: pointer;
  transition: transform 0.25s ease;
}

.yes-button {
  z-index: 2;
}

.no-button {
  position: relative;
  z-index: 3;
}

.modal-image {
  display: block;
  width: clamp(120px, 24vw, 160px);
  height: auto;
  object-fit: contain;
}

.page-content {
  width: 100%;
  min-height: 100vh;
}

.placeholder-surface {
  width: 100%;
  min-height: 100vh;
  background: #f6d8e6;
}
</style>
