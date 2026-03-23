<script setup lang="ts">
import { ref } from "vue";
import AnimalCard from "@/components/animalCard.vue";

// 1️⃣ Importamos el estado de la sesión
const { loggedIn } = useUserSession();

const { data: animals, refresh } = await useFetch("/api/animals");
const message = ref("");

const guardarAnimal = async (animalId: number) => {
    // Protección extra por si alguien intenta llamar a la función por consola
    if (!loggedIn.value) return;

    try {
        await $fetch("/api/animals_saved", {
            method: 'POST',
            body: { animalId },
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
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
        <NuxtLink v-if="loggedIn" to="/catalogo/nuevo" class="btn-crear">
            ➕ Añadir Nuevo Animal
        </NuxtLink>
    </header>

    <div class="catalogo">
        <div class="grid">
            <div v-for="animal in animals" :key="animal.id" class="card">
                <AnimalCard :animal="animal" />

                <button v-if="loggedIn" @click="guardarAnimal(animal.id)">
                    Guardar
                </button>
            </div>
        </div>

        <p v-if="message">{{ message }}</p>

        <div v-if="loggedIn" class="actions">
            <NuxtLink to="/animalesGuardados" class="action-link">
                Ver mis animales guardados
            </NuxtLink>
        </div>
        
        <div v-else class="actions">
            <p class="text-gray-500">Inicia sesión para guardar o añadir animales.</p>
        </div>
    </div>
</template>

<style scoped>
/* ===== CONTENEDOR PRINCIPAL ===== */

.catalogo {
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
  background: #f9fafb;
  transition: background 0.3s ease;
}

:deep(.dark) .catalogo {
  background: #0f172a;
}

/* ===== CABECERA ===== */
.cabecera {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.cabecera h1 {
  font-size: 2rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #ffffff;
  margin: 0;
  font-weight: bold;
  text-align: center;
}

:deep(.dark) .cabecera h1 {
  color: #f1f5f9;
}

/* ===== BOTÓN CREAR ===== */
.btn-crear {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  padding: 10px 20px;
  border-radius: 12px;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 6px 18px rgba(37, 99, 235, 0.25);
  transition: all 0.3s ease;
}

.btn-crear:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 24px rgba(37, 99, 235, 0.35);
}

/* ===== GRID DE ANIMALES ===== */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 24px;
}

/* ===== CARD INDIVIDUAL ===== */
.card {
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
}

:deep(.dark) .card {
  background: #1e293b;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.5);
}

/* ===== BOTÓN GUARDAR ===== */
.card button {
  margin-top: 12px;
  padding: 10px 16px;
  border-radius: 10px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  background: linear-gradient(135deg, #10b981, #047857);
  color: white;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
  transition: all 0.3s ease;
}

.card button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 18px rgba(16, 185, 129, 0.35);
}

.card button:active {
  transform: scale(0.97);
}

/* ===== MENSAJE DE FEEDBACK ===== */
p {
  margin-top: 20px;
  text-align: center;
  font-size: 1rem;
  font-weight: 600;
  color: #16a34a;
}

:deep(.dark) p {
  color: #6ee7b7;
}

/* ===== LINK A ANIMALES GUARDADOS ===== */
.catalogo > a {
  display: inline-block;
  margin-top: 16px;
  text-align: center;
  color: #3b82f6;
  text-decoration: underline;
  font-weight: 600;
  transition: color 0.2s ease;
}

.catalogo > a:hover {
  color: #2563eb;
}

:deep(.dark) .catalogo > a {
  color: #60a5fa;
}

:deep(.dark) .catalogo > a:hover {
  color: #3b82f6;
}
/*=Boton de acciones=*/
/* ===== SECCIÓN DE ACCIONES ===== */
.actions {
    display: flex;
    justify-content: center;
    margin-top: 50px;
}

/* ===== LINK PRINCIPAL ===== */
.action-link {
    display: inline-block;
    padding: 12px 24px;
    border-radius: 12px;
    font-weight: 600;
    text-decoration: none;
    background: linear-gradient(135deg, #3b82f6, #2563eb);
    color: white;
    transition: all 0.3s ease;
    box-shadow: 0 6px 18px rgba(37, 99, 235, 0.3);
}

.action-link:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 24px rgba(37, 99, 235, 0.4);
}

.action-link:active {
    transform: scale(0.97);
}
</style>