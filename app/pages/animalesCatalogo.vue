<script setup lang="ts">
import AnimalCard from "@/components/animalCard.vue";

const { data: animals, pending, error } = await useFetch("/api/animalsSaved");
</script>

<template>
    <div class="catalogo">
        <h1>Catálogo de Animales</h1>

        <div v-if="pending">
            Cargando animales...
        </div>

        <div v-else-if="error">
            Hubo un error al cargar los animales.
        </div>

        <div v-else>
            <div v-if="animals?.length" class="grid">
                <AnimalCard v-for="animal in animals" :key="animal.id" :animal="animal" />
            </div>

            <p v-else>No tienes animales guardados todavía.</p>
        </div>

        <NuxtLink to="/catalogo">
            Ver los animales disponibles
        </NuxtLink>
    </div>
</template>