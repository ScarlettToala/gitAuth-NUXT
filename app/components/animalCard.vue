<template>
  <UCard v-if="animal" class="mi-ucard">
    <h2>{{ animal.name }}</h2>

    <div class="info-texto">
      <p v-if="animal.scientific_name"><strong>Científico:</strong> <i>{{ animal.scientific_name }}</i></p>
      <p><strong>Categoría:</strong> <span class="badge">{{ animal.category }}</span></p>
      <p v-if="animal.notes" class="notas"><strong>Notas:</strong> {{ animal.notes }}</p>
    </div>

    <div class="imagen-contenedor" v-if="animal.imageUrl">
      <img :src="animal.imageUrl" :alt="animal.name" />
    </div>

    <div class="acciones">
      <NuxtLink :to="`/catalogo/${animal.id}`" class="btn-detalle">
        👁️ Ver detalle
      </NuxtLink>

      <NuxtLink :to="`/catalogo/editar/${animal.id}`" class="btn-editar">
        ✏️ Editar
      </NuxtLink>
    </div>
  </UCard>
</template>

<script setup lang="ts">
defineProps<{ animal: any }>();
</script>

<style scoped>
/* Ajustes generales del contenido */
h2 {
  font-size: 1.5rem;
  margin-bottom: 0.8rem;
  color: #2c3e50;
  text-align: center;
}

.info-texto p {
  margin: 4px 0;
  font-size: 0.95rem;
}

.badge {
  background-color: #e2e8f0;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.85em;
  text-transform: capitalize;
}

.notas {
  color: #666;
  font-size: 0.85rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  /* Limita las notas a 2 líneas para que las tarjetas midan igual */
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 🌟 Imagen 100% responsiva (mejor que width="300") */
.imagen-contenedor {
  margin-top: 1rem;
  width: 100%;
}

.imagen-contenedor img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  /* Recorta la imagen sin deformarla */
  border-radius: 8px;
}

/* 🌟 Flexbox para alinear los botones mitad y mitad */
.acciones {
  display: flex;
  gap: 10px;
  margin-top: 1rem;
}

.btn-detalle,
.btn-editar {
  flex: 1;
  /* Hacen que ocupen el 50% cada uno */
  text-align: center;
  text-decoration: none;
  padding: 8px;
  border-radius: 6px;
  font-weight: bold;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

/* Colores de los botones */
.btn-detalle {
  background-color: #e2e8f0;
  color: #334155;
}

.btn-detalle:hover {
  background-color: #cbd5e1;
  transform: translateY(-2px);
}

.btn-editar {
  background-color: #ffc107;
  color: #333;
}

.btn-editar:hover {
  background-color: #e0a800;
  transform: translateY(-2px);
}
</style>