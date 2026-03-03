<script setup lang="ts">
import AnimalCard from "@/components/animalCard.vue";

const { data: animals, pending, error } = await useFetch("/api/animals_saved");

// Creamos la función para borrar
const eliminarAnimal = async (id: number) => {
    // Un pequeño aviso de confirmación nunca viene mal
    if (!confirm("¿Seguro que quieres quitar este animal de tu lista?")) return;

    try {
        await $fetch(`/api/animals_saved/${id}`, {
            method: 'DELETE'
        });

        // 3️⃣ Recargamos la lista automáticamente
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
            <NuxtLink to="/catalogo/index" class="action-link">
                Ver catálogo de animales
            </NuxtLink>
        </div>
    </div>
</template>

<style scoped>
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

.btn-eliminar {
    background-color: #dc3545;
    /* Rojo de eliminar */
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.2s;
}

.btn-eliminar:hover {
    background-color: #c82333;
}
</style>