<script setup lang="ts">
</script>

<template>
  <main class="info-story" aria-label="Información de la invitación">
    <section class="panel" aria-label="Información uno">
      <img src="/info/info1.png" alt="Información uno" class="panel-image" />
    </section>

    <section class="panel" aria-label="Información dos">
      <img src="/info/info2.png" alt="Información dos" class="panel-image" />
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
</style>
