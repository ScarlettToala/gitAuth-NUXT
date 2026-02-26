<template>
  <UCard v-if="animal">
    <h2>{{ animal.name }}</h2>
    <p><strong>Científico:</strong> {{ animal.scientific_name }}</p>
    <p><strong>Categoría:</strong> {{ animal.category }}</p>
    <p><strong>Notas:</strong> {{ animal.notes }}</p>
    <img :src="animal.image_url" :alt="animal.name" width="300" />
  </UCard>
</template>

<script setup lang="ts">
defineProps<{ animal: any }>();
</script>

<style scoped>
h2 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}
.animal-card {
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 8px;
  max-width: 350px;
  margin: 1rem auto;
  text-align: center;
  box-shadow: 2px 2px 8px rgba(0,0,0,0.1);
}
.animal-card img {
  border-radius: 8px;
  margin-top: 0.5rem;
}
</style>