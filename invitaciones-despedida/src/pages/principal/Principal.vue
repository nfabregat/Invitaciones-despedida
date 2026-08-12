<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const personalizedName = computed(() => {
  const rawName =
    (route.params.name as string | undefined) ??
    (typeof route.query.name === 'string' ? route.query.name : '')

  const decoded = rawName ? decodeURIComponent(rawName) : ''

  return decoded.trim() || 'name'
})
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
</style>
