<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isBoxOpen = ref(false)

const personalizedName = computed(() => {
  const rawName =
    (route.params.name as string | undefined) ??
    (typeof route.query.name === 'string' ? route.query.name : '')

  const decoded = rawName ? decodeURIComponent(rawName) : ''

  return decoded.trim() || 'name'
})

const openBox = () => {
  if (isBoxOpen.value) return
  isBoxOpen.value = true
}
</script>

<template>
  <main class="story">
    <section
      class="panel panel-one"
      :style="{
        '--hat-left': '30%',
        '--hat-top': '52%',
        '--text-left': '57%',
        '--text-top': '31.5%'
      }"
    >
      <img src="/principal/sombrerito1.png" alt="Sombrerito" class="sombrerito" />
      <p class="floating-text">{{ personalizedName }}</p>
    </section>

    <section class="panel panel-two" aria-label="Siguiente imagen">
      <img src="/principal/avión.png" alt="Avión" class="plane" />
    </section>

    <section class="panel panel-three" aria-label="Tercera imagen" />

    <section class="panel panel-four" aria-label="Cuarta imagen">
      <button type="button" class="box-button" aria-label="Abrir caja" @click="openBox">
        <img
          v-if="!isBoxOpen"
          src="/principal/caja-cerrada.png"
          alt="Caja cerrada"
          class="closed-box"
        />

        <img
          v-else
          src="/principal/caja-abierta.png"
          alt="Caja abierta"
          class="opened-box"
        />
      </button>
    </section>
  </main>
</template>

<style scoped>
.story {
  margin: 0;
  padding: 0;
  width: 100vw;
  min-height: 100vh;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
}

.panel {
  position: relative;
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  scroll-snap-align: start;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}

.panel-one {
  background-image: url('/principal/principal1.png');
  animation: principalFadeIn 1.2s ease-out both;
}

.panel-two {
  background-image: url('/principal/principal2.png');
}

.panel-three {
  background-image: url('/principal/principal3.png');
}

.panel-four {
  background-image: url('/principal/principal4.png');
  width: 100vw;
  height: auto;
  min-height: unset;
  aspect-ratio: 1080 / 1142;
  background-size: contain;
  background-position: center top;
}

.plane {
  position: absolute;
  right: -12%;
  top: 22%;
  width: min(30vw, 220px);
  max-width: 220px;
  transform: translateX(0) translateY(0);
  animation: planeFlight 8s ease-in-out infinite alternate;
  filter: drop-shadow(0 10px 15px rgba(0, 0, 0, 0.08));
}

.box-button {
  position: absolute;
  left: 50%;
  bottom: 12%;
  transform: translateX(-50%);
  border: 0;
  background: transparent;
  padding: 0;
  cursor: pointer;
}

.closed-box {
  display: block;
  width: 350px;
  max-width: none;
  filter: drop-shadow(0 12px 14px rgba(0, 0, 0, 0.14));
  animation: boxShake 2.6s ease-in-out infinite;
}

.opened-box {
  display: block;
  width: 350px;
  max-width: none;
  filter: drop-shadow(0 12px 14px rgba(0, 0, 0, 0.14));
  animation: boxOpen 0.6s ease-out forwards;
}

.sombrerito {
  position: absolute;
  left: var(--hat-left);
  top: var(--hat-top);
  width: min(28vw, 190px);
  max-width: 190px;
  transform: translate(-50%, -50%);
  animation: sombreritoShake 2.8s ease-in-out infinite;
  filter: drop-shadow(0 10px 10px rgba(0, 0, 0, 0.08));
}

.floating-text {
  position: absolute;
  left: var(--text-left);
  top: var(--text-top);
  transform: translate(-50%, -50%);
  margin: 0;
  color: #4f2a2d;
  font-family: 'Homemade Apple', cursive;
  font-size: clamp(1.5rem, 5vw, 3rem);
  line-height: 1.1;
  text-align: center;
  letter-spacing: 0.04em;
  text-shadow: 0 2px 0 rgba(255, 255, 255, 0.25);
  animation: textFadeUp 1.4s ease-out both;
}

@keyframes principalFadeIn {
  0% {
    opacity: 0;
    transform: scale(0.98);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes textFadeUp {
  0% {
    opacity: 0;
    transform: translate(-50%, -42%);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}

@keyframes sombreritoShake {
  0%,
  100% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  20% {
    transform: translate(-50%, -50%) rotate(-2deg) translateY(-4px);
  }
  40% {
    transform: translate(-50%, -50%) rotate(2deg) translateY(2px);
  }
  60% {
    transform: translate(-50%, -50%) rotate(-1deg) translateY(-2px);
  }
  80% {
    transform: translate(-50%, -50%) rotate(1deg) translateY(1px);
  }
}

@keyframes planeFlight {
  0% {
    transform: translateX(0) translateY(0) rotate(0deg);
  }
  25% {
    transform: translateX(-18vw) translateY(-10px) rotate(-4deg);
  }
  50% {
    transform: translateX(-36vw) translateY(18px) rotate(2deg);
  }
  75% {
    transform: translateX(-52vw) translateY(-8px) rotate(-3deg);
  }
  100% {
    transform: translateX(-70vw) translateY(12px) rotate(2deg);
  }
}

@keyframes boxShake {
  0%,
  18% {
    transform: rotate(0deg) translateY(-6px);
  }
  22% {
    transform: rotate(-3deg) translateY(-3px);
  }
  26% {
    transform: rotate(3deg) translateY(-5px);
  }
  31% {
    transform: rotate(-2deg) translateY(-4px);
  }
  35% {
    transform: rotate(0deg) translateY(-6px);
  }
  70% {
    transform: rotate(0deg) translateY(-6px);
  }
  74% {
    transform: rotate(-2deg) translateY(-4px);
  }
  78% {
    transform: rotate(2deg) translateY(-5px);
  }
  83% {
    transform: rotate(0deg) translateY(-6px);
  }
  100% {
    transform: rotate(0deg) translateY(-6px);
  }
}

@keyframes boxOpen {
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
