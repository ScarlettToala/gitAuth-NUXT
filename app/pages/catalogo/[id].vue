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
/* ===== CONTENEDOR GENERAL ===== */
.animal-detalle {
  max-width: 720px;
  margin: 60px auto;
  padding: 0 20px;
}

/* ===== CARD PRINCIPAL ===== */
.detalle-card {
  background: #ffffff;
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.detalle-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.12);
}

/* ===== TÍTULOS ===== */
.detalle-card h1 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 6px;
  color: #1e293b;
}

.detalle-card h3 {
  font-size: 1rem;
  font-weight: 400;
  color: #64748b;
  margin-bottom: 14px;
}

/* ===== BADGE ===== */
.badge {
  display: inline-block;
  background: linear-gradient(135deg, #38bdf8, #6366f1);
  color: white;
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: capitalize;
  margin-bottom: 20px;
}

/* ===== INFO ===== */
.info {
  margin-top: 10px;
  color: #475569;
  line-height: 1.6;
}

.info p {
  margin: 8px 0;
}

/* ===== IMAGEN ===== */
.imagen-contenedor {
  margin-top: 24px;
  overflow: hidden;
  border-radius: 16px;
}

.imagen-contenedor img {
  width: 100%;
  max-height: 420px;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.imagen-contenedor img:hover {
  transform: scale(1.05);
}

/* ===== BOTÓN ===== */
.actions {
  margin-top: 30px;
  display: flex;
  justify-content: flex-start;
}

.btn-volver {
  display: inline-block;
  padding: 12px 22px;
  background: linear-gradient(135deg, #64748b, #475569);
  color: white;
  text-decoration: none;
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 6px 16px rgba(71, 85, 105, 0.25);
}

.btn-volver:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 24px rgba(71, 85, 105, 0.35);
}

.btn-volver:active {
  transform: scale(0.97);
}

/* ===== MENSAJES DE ESTADO ===== */
.animal-detalle > div {
  text-align: center;
  font-size: 1rem;
  color: #64748b;
  margin-top: 30px;
}
</style>