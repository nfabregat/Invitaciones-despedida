<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const isOpen = ref(false)

const invitedName = computed(() => {
  const rawName = typeof route.query.name === 'string' ? route.query.name : ''
  return rawName ? `/${encodeURIComponent(rawName)}` : ''
})

const playOpenSound = () => {
  const AudioContextClass =
    window.AudioContext ||
    (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext

  if (!AudioContextClass) return

  const audioContext = new AudioContextClass()
  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()

  oscillator.type = 'triangle'
  oscillator.frequency.setValueAtTime(180, audioContext.currentTime)
  oscillator.frequency.exponentialRampToValueAtTime(110, audioContext.currentTime + 0.16)

  gainNode.gain.setValueAtTime(0.0001, audioContext.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.025, audioContext.currentTime + 0.01)
  gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.18)

  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)

  oscillator.start(audioContext.currentTime)
  oscillator.stop(audioContext.currentTime + 0.18)

  window.setTimeout(() => {
    audioContext.close()
  }, 300)
}

const openInvitation = () => {
  if (isOpen.value) return

  isOpen.value = true
  playOpenSound()

  window.setTimeout(() => {
    router.push(`/principal${invitedName.value}`)
  }, 900)
}
</script>

<template>
  <main
    class="relative h-screen w-full overflow-hidden bg-cover bg-center bg-no-repeat"
    :style="{ backgroundImage: 'url(/inicio/fondo-inicio.png)' }"
  >
    <div class="absolute inset-0 bg-[rgba(255,255,255,0.08)]" />

    <section class="absolute inset-0 z-20 flex items-center justify-center px-4">
      <div v-if="!isOpen" class="pointer-events-none absolute inset-0 flex items-center justify-center">
        <p class="landing-text select-none text-center text-[#5a1f3f]">Pulsa para abrir</p>
      </div>

      <button
        type="button"
        class="relative z-10 flex max-w-[560px] -translate-y-4 items-center justify-center border-0 bg-transparent p-0 transition-transform duration-300 active:scale-[0.98]"
        aria-label="Abrir invitación"
        @click="openInvitation"
      >
        <img
          v-if="!isOpen"
          src="/inicio/sobre-cerrado.png"
          alt="Sobre cerrado"
          class="envelope-shake h-auto w-full max-w-[560px] object-contain"
        />

        <img
          v-else
          src="/inicio/sobre-abierto.png"
          alt="Sobre abierto"
          class="envelope-open h-auto w-full max-w-[560px] object-contain"
        />
      </button>
    </section>
  </main>
</template>

<style scoped>
.landing-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -200px);
  z-index: 20;
  font-family: 'Homemade Apple', cursive;
  font-size: clamp(1.5rem, 4vw, 2rem);
  line-height: 1.05;
  letter-spacing: 0.06em;
  text-shadow: 0 2px 2px rgb(255, 255, 255);
}

.envelope-shake {
  animation: envelopeShake 3.1s ease-in-out infinite;
  transform-origin: center;
}

.envelope-open {
  animation: envelopeOpen 0.6s ease-out forwards;
}

@keyframes envelopeShake {
  0%,
  18% {
    transform: rotate(0deg) translateY(-8px);
  }
  22% {
    transform: rotate(-4deg) translateY(-4px);
  }
  26% {
    transform: rotate(4deg) translateY(-6px);
  }
  31% {
    transform: rotate(-2deg) translateY(-5px);
  }
  35% {
    transform: rotate(0deg) translateY(-8px);
  }
  70% {
    transform: rotate(0deg) translateY(-8px);
  }
  74% {
    transform: rotate(-3deg) translateY(-5px);
  }
  78% {
    transform: rotate(3deg) translateY(-6px);
  }
  83% {
    transform: rotate(0deg) translateY(-8px);
  }
  100% {
    transform: rotate(0deg) translateY(-8px);
  }
}

@keyframes envelopeOpen {
  0% {
    opacity: 0.4;
    transform: scale(0.96) translateY(8px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
</style>