<script setup lang="ts">
// Obtenemos información de la URL actual
const route = useRoute();
const animalId = route.params.id;

// Hacemos la petición a tu API usando el ID de la URL
const { data: animal, pending, error } = await useFetch(`/api/animals/${animalId}`);
</script>

<template>
    <div class="animal-detalle">
        <div v-if="pending">Cargando detalles...</div>

        <div v-else-if="error || !animal">
            <h1>Animal no encontrado</h1>
            <NuxtLink to="/catalogo">Volver al catálogo</NuxtLink>
        </div>

        <div v-else class="detalle-card">
            <h1>{{ animal.name }}</h1>
            <h3 v-if="animal.scientific_name">
                <i>{{ animal.scientific_name }}</i>
            </h3>

            <span class="badge">{{ animal.category }}</span>

            <div class="info">
                <p v-if="animal.notes"><strong>Notas:</strong> {{ animal.notes }}</p>
                <p v-if="animal.seenAt">
                    <strong>Visto el:</strong> {{ new Date(animal.seenAt).toLocaleDateString() }}
                </p>
            </div>

            <div v-if="animal.imageUrl" class="imagen-contenedor">
                <img :src="animal.imageUrl" :alt="animal.name" />
            </div>

            <div class="actions">
                <NuxtLink to="/catalogo" class="btn-volver">
                    Volver al catálogo
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<style scoped>
.animal-detalle {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
}

.detalle-card {
    background: white;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.badge {
    display: inline-block;
    background-color: #e2e8f0;
    color: #475569;
    padding: 4px 12px;
    border-radius: 16px;
    font-size: 0.9em;
    margin-bottom: 16px;
    text-transform: capitalize;
}

.imagen-contenedor img {
    width: 100%;
    max-height: 400px;
    object-fit: cover;
    border-radius: 8px;
    margin-top: 16px;
}

.actions {
    margin-top: 24px;
}

.btn-volver {
    display: inline-block;
    padding: 10px 20px;
    background-color: #64748b;
    color: white;
    text-decoration: none;
    border-radius: 8px;
    transition: background-color 0.2s;
}

.btn-volver:hover {
    background-color: #475569;
}
</style>