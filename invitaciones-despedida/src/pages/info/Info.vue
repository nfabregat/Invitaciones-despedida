<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'

const carouselImages = Array.from({ length: 9 }, (_, index) => {
  const number = String(index + 1).padStart(2, '0')
  return `/info/carrusel/carrusel${number}.png`
})

const currentIndex = ref(0)
const carouselShell = ref<HTMLElement | null>(null)
const isAutoPaused = ref(false)
let autoAdvanceTimer: number | null = null
let autoPauseTimer: number | null = null

const pauseAutoAdvance = () => {
  isAutoPaused.value = true

  if (autoPauseTimer) {
    window.clearTimeout(autoPauseTimer)
  }

  autoPauseTimer = window.setTimeout(() => {
    isAutoPaused.value = false
  }, 5000)
}

const goToStep = (nextIndex: number) => {
  const lastIndex = carouselImages.length - 1

  if (nextIndex > lastIndex) {
    currentIndex.value = 0
  } else if (nextIndex < 0) {
    currentIndex.value = lastIndex
  } else {
    currentIndex.value = nextIndex
  }

  const currentImageElement = carouselShell.value?.querySelectorAll('img')[currentIndex.value]

  currentImageElement?.scrollIntoView({
    behavior: 'smooth',
    inline: 'center',
    block: 'nearest'
  })
}

const nextSlide = () => {
  goToStep(currentIndex.value + 1)
}

const prevSlide = () => {
  goToStep(currentIndex.value - 1)
}

const startAutoAdvance = () => {
  if (autoAdvanceTimer) {
    window.clearInterval(autoAdvanceTimer)
  }

  autoAdvanceTimer = window.setInterval(() => {
    if (!isAutoPaused.value) {
      currentIndex.value = (currentIndex.value + 1) % carouselImages.length
      goToStep(currentIndex.value)
    }
  }, 3000)
}

const handleManualClick = (direction: 'next' | 'prev') => {
  pauseAutoAdvance()

  if (direction === 'next') {
    nextSlide()
  } else {
    prevSlide()
  }

  startAutoAdvance()
}

onBeforeUnmount(() => {
  if (autoAdvanceTimer) window.clearInterval(autoAdvanceTimer)
  if (autoPauseTimer) window.clearTimeout(autoPauseTimer)
})

startAutoAdvance()
</script>

<template>
  <main class="info-story" aria-label="Información de la invitación">
    <section class="panel" aria-label="Información uno">
      <img src="/info/info1.png" alt="Información uno" class="panel-image" />
    </section>

    <section class="panel panel-info2" aria-label="Información dos">
      <div class="carousel-shell" ref="carouselShell" aria-label="Carrusel de imágenes">
        <div class="carousel-track">
          <img
            v-for="(image, index) in carouselImages"
            :key="image"
            :src="image"
            :alt="`Imagen ${index + 1}`"
            class="carousel-image"
            :class="{ active: currentIndex === index }"
          />
        </div>
      </div>

      <div class="carousel-controls" aria-label="Controles del carrusel">
        <button type="button" class="nav-button" aria-label="Anterior" @click="handleManualClick('prev')">
          ←
        </button>
        <button type="button" class="nav-button" aria-label="Siguiente" @click="handleManualClick('next')">
          →
        </button>
      </div>
    </section>
  </main>
</template>

<style scoped>
.info-story {
  width: 100vw;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  scroll-padding: 0;
  overscroll-behavior: none;
  background: #f6d8e6;
}

.panel {
  width: 100vw;
  margin: 0;
  padding: 0;
  line-height: 0;
  scroll-snap-align: start;
}

.panel-image {
  display: block;
  width: 100vw;
  height: auto;
  margin: 0;
  padding: 0;
  vertical-align: top;
}

.panel-info2 {
  position: relative;
  display: block;
  min-height: 100vh;
  background: url('/info/info2.png') center top / 100vw auto no-repeat;
}

.carousel-shell {
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  z-index: 1;
  width: min(78vw, 580px);
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  scroll-snap-type: x proximity;
  -webkit-overflow-scrolling: touch;
  background: transparent;
  scrollbar-width: none;
}

.carousel-shell::-webkit-scrollbar {
  display: none;
}

.carousel-track {
  display: flex;
  width: max-content;
}

.carousel-image {
  display: block;
  height: 36vh;
  width: auto;
  object-fit: contain;
  flex-shrink: 0;
  scroll-snap-align: start;
  opacity: 0.96;
}

.carousel-image.active {
  opacity: 1;
}

.carousel-controls {
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: space-between;
  width: min(84vw, 640px);
  z-index: 2;
  pointer-events: none;
}

.nav-button {
  pointer-events: auto;
  width: 46px;
  height: 46px;
  border: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.7);
  color: #5a1f3f;
  font-size: 1.6rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 6px 18px rgba(66, 20, 41, 0.15);
}
</style>
