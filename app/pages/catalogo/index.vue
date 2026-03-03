<script setup lang="ts">
import { ref } from "vue";
import AnimalCard from "@/components/animalCard.vue";

const { data: animals, refresh } = await useFetch("/api/animals");
const message = ref("");


const guardarAnimal = async (animalId: number) => {
    try {
        await $fetch("/api/animals_saved", {
            method: 'POST',
            body: { animalId },
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'  // 🔑 importante
        });

        message.value = "Animal guardado 🐾";
    } catch (error) {
        console.error("Error real: " , error);
        message.value = "Error al guardar";
    }
};
</script>

<template>
        
        <header class="cabecera">
            <h1>Catálogo</h1>
            <NuxtLink to="/catalogo/nuevo" class="btn-crear">
                ➕ Añadir Nuevo Animal
            </NuxtLink>
        </header>
<div class="catalogo">
        <div class="grid">
            <div v-for="animal in animals" :key="animal.id" class="card">
                <AnimalCard :animal="animal" />

                <button @click="guardarAnimal(animal.id)">
                    Guardar
                </button>
            </div>
        </div>

        <p v-if="message">{{ message }}</p>
        <NuxtLink to="/animalesGuardados">
            Ver los animales guardados
        </NuxtLink>
    </div>
</template>

<style scoped>
/* container styles */
.catalogo {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
    background: #fafafa;
}

h1 {
    padding: 1em 0;
    text-align: center;
    margin-bottom: 20px;
    color: #333;
    font-size: 2rem;
    text-transform: uppercase;
    letter-spacing: 1px;
}

/* grid layout */
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 24px;
}

/* card appearance */
.card {
    display: flex;
    flex-direction: column;
    background: #fff;
    border: 1px solid #e0e0e0;
    padding: 16px;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* button styles */
button {
    margin-top: 12px;
    padding: 8px 16px;
    cursor: pointer;
    background-color: #007bff;
    border: none;
    color: #fff;
    border-radius: 6px;
    font-weight: 600;
    transition: background-color 0.2s;
}

button:hover {
    background-color: #0056b3;
}

button:active {
    background-color: #004085;
}

/* feedback message */
p {
    margin-top: 1rem;
    text-align: center;
    font-size: 1rem;
    color: #28a745;
}
</style>