<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isVelaLit = ref(true)

const toggleVela = () => {
  if (!isVelaLit.value) return

  isVelaLit.value = false

  window.setTimeout(() => {
    router.push('/invitation')
  }, 900)
}

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

  const shell = carouselShell.value
  const currentImageElement = shell?.querySelectorAll('img')[currentIndex.value]

  if (!shell || !currentImageElement) return

  const targetLeft = currentImageElement.offsetLeft - (shell.clientWidth - currentImageElement.clientWidth) / 2

  shell.scrollTo({
    left: Math.max(targetLeft, 0),
    behavior: 'smooth'
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
      <img src="/info/info2.png" alt="Información dos" class="info2-image" />

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

    <section class="panel" aria-label="Información tres">
      <img src="/info/info3.png" alt="Información tres" class="panel-image" />
    </section>

    <section class="panel panel-info4" aria-label="Información cuatro">
      <img src="/info/info4.png" alt="Información cuatro" class="panel-image" />

      <button
        type="button"
        class="vela-button"
        :class="{ 'is-lit': isVelaLit }"
        aria-label="Encender vela"
        @click="toggleVela"
      >
        <img
          :src="isVelaLit ? '/info/vela-encendida.png' : '/info/vela-apagada.png'"
          alt="Vela"
          class="vela-image"
        />
      </button>
    </section>
  </main>
</template>

<style scoped>
.info-story {
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
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
  width: 100vw;
  line-height: 0;
}

.panel-info4 {
  position: relative;
  display: block;
  width: 100vw;
  line-height: 0;
}

.info2-image {
  display: block;
  width: 100vw;
  height: auto;
  margin: 0;
  padding: 0;
  vertical-align: top;
}

.vela-button {
  position: absolute;
  left: 50%;
  top: 58%;
  transform: translate(-50%, -50%);
  width: min(48vw, 300px);
  background: transparent;
  border: 0;
  padding: 0;
  cursor: pointer;
}

.vela-image {
  display: block;
  width: 100%;
  height: auto;
  filter: drop-shadow(0 10px 16px rgba(115, 72, 21, 0.25));
  animation: velaShake 2.8s ease-in-out infinite;
}

.vela-button.is-lit .vela-image {
  filter: drop-shadow(0 0 18px rgba(255, 207, 99, 0.8));
}

@keyframes velaShake {
  0%,
  20% {
    transform: rotate(0deg) translateY(0px);
  }
  24% {
    transform: rotate(-4deg) translateY(-4px);
  }
  28% {
    transform: rotate(4deg) translateY(-2px);
  }
  34% {
    transform: rotate(-2deg) translateY(-5px);
  }
  38% {
    transform: rotate(0deg) translateY(0px);
  }
  100% {
    transform: rotate(0deg) translateY(0px);
  }
}

.carousel-shell {
  position: absolute;
  left: 50%;
  top: 30%;
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
  top: 35%;
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
