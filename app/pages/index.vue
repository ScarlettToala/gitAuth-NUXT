<script setup lang="ts">
import { ref, onMounted } from "vue";
import AnimalCard from "@/components/animalCard.vue";

const animal = ref<any>(null);

const getRandomAnimal = async () => {
  const res = await fetch("/api/random-animal");
  animal.value = await res.json();
};

onMounted(() => {
  getRandomAnimal();
});
</script>

<template>
  <section class="max-w-4xl mx-auto p-6 text-center">
    <h1 class="text-3xl font-bold text-gray-900 dark:text-green-400 mb-2">
      Bienvenido a tu catálogo de animales de confianza
    </h1>
    <p class="text-gray-700 dark:text-gray-300 mb-6">
      Explora y descubre la fauna única de las Islas Galápagos.
    </p>

    <main class="flex flex-col items-center gap-4">
      <!-- Animal aleatorio -->
      <AnimalCard v-if="animal" :animal="animal" />

      <!-- Botón para cambiar animal -->
      <button @click="getRandomAnimal"
        class="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 transition-colors">
        Mostrar otro animal
      </button>
    </main>
  </section>

  <div class="actions">
    <NuxtLink to="/animalesCatalogo" class="action-link">
      Ver Mis Animales Guardados
    </NuxtLink>
    <NuxtLink to="/catalogo/index" class="action-link">
      Guardar un nuevo animal
    </NuxtLink>
  </div>
</template>

<style scoped>
/* Opcional: estilos adicionales para animaciones o ajustes */
main {
  width: 100%;
}

.actions {
  display: flex;
  gap: 16px;
  /* separación entre los links */
  justify-content: center;
  margin-top: 20px;
  flex-wrap: wrap;
  /* si la pantalla es pequeña se acomoda */
}

.action-link {
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  /* azul principal */
  color: #fff;
  font-weight: 600;
  border-radius: 8px;
  text-decoration: none;
  text-align: center;
  transition: background-color 0.2s, transform 0.2s;
}

.action-link:hover {
  background-color: #0056b3;
  /* azul más oscuro al pasar el mouse */
  transform: translateY(-2px);
}

.action-link:active {
  background-color: #004085;
  /* azul aún más oscuro al hacer clic */
}
</style>