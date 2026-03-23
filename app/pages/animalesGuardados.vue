<script setup lang="ts">
import AnimalCard from "@/components/animalCard.vue";

const { data: animals, pending, error, refresh } = await useFetch("/api/animals_saved");

// Creamos la función para borrar
const eliminarAnimal = async (id: number) => {
    // Un pequeño aviso de confirmación nunca viene mal
    if (!confirm("¿Seguro que quieres quitar este animal de tu lista?")) return;

    try {
        await $fetch(`/api/animals_saved/${id}`, {
            method: 'DELETE'
        });

        //  Recargamos la lista automáticamente
        await refresh();
    } catch (err) {
        console.error("Error al eliminar:", err);
        alert("Hubo un problema al eliminar el animal.");
    }
};

</script>

<template>
    <div class="catalogo">
        <h1>Mis Animales</h1>

        <div v-if="pending">
            Cargando animales...
        </div>

        <div v-else-if="error">
            Hubo un error al cargar los animales.
        </div>

        <div v-else>
            <div v-if="animals?.length" class="grid">
                <div v-for="animal in animals" :key="animal.id" class="animal-wrapper">

                    <AnimalCard :animal="animal" />

                    <button @click="eliminarAnimal(animal.id)" class="btn-eliminar">
                        Quitar de mi lista
                    </button>

                </div>

            </div>

            <p v-else>No tienes animales guardados todavía.</p>
        </div>

        <div class="actions">
            <NuxtLink to="/catalogo" class="action-link">
                Ver catálogo de animales
            </NuxtLink>
        </div>
    </div>
</template>

<style scoped>
/* ===== CONTENEDOR PRINCIPAL ===== */
.catalogo {
    max-width: 1200px;
    margin: 40px auto;
    padding: 0 20px;
}

/* ===== TÍTULO ===== */
.catalogo h1 {
    text-align: center;
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 2rem;
    color: #ffffff;
    letter-spacing: 0.5px;
}

/* ===== GRID RESPONSIVE ===== */
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 24px;
}

/* ===== WRAPPER DE CADA CARD ===== */
.animal-wrapper {
    display: flex;
    flex-direction: column;
    gap: 12px;
    transition: transform 0.25s ease;
}

.animal-wrapper:hover {
    transform: translateY(-4px);
}

/* ===== BOTÓN ELIMINAR ===== */
.btn-eliminar {
    background: linear-gradient(135deg, #ef4444, #dc2626);
    color: white;
    border: none;
    padding: 10px 14px;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 600;
    font-size: 0.9rem;
    transition: all 0.25s ease;
    box-shadow: 0 4px 10px rgba(220, 38, 38, 0.25);
}

.btn-eliminar:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 18px rgba(220, 38, 38, 0.35);
}

.btn-eliminar:active {
    transform: scale(0.97);
}

/* ===== MENSAJES (loading, error, vacío) ===== */
.catalogo>div {
    text-align: center;
    font-size: 1rem;
    color: #64748b;
    margin-top: 20px;
}

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