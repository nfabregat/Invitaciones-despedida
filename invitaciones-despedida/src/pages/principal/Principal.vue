<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const personalizedName = computed(() => {
  const rawName =
    (route.params.name as string | undefined) ??
    (typeof route.query.name === 'string' ? route.query.name : '')

  const decoded = rawName ? decodeURIComponent(rawName) : ''

  return decoded.trim() || 'Aquí va tu texto'
})
</script>

<template>
  <main
    class="principal-page"
    :style="{
      '--hat-left': '30%',
      '--hat-top': '52%',
      '--text-left': '57%',
      '--text-top': '30%'
    }"
  >
    <img src="/principal/sombrerito1.png" alt="Sombrerito" class="sombrerito" />

    <p class="floating-text">{{ personalizedName }}</p>
  </main>
</template>

<style scoped>
.principal-page {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: url('/principal/principal1.png') center center / cover no-repeat;
  animation: principalFadeIn 1.2s ease-out both;
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
</style>
