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
/* ===== CARD GENERAL ===== */
.mi-ucard {
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  background: #ffffff;
}

.mi-ucard:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
}

/* ===== TÍTULO ===== */
h2 {
  font-size: 1.4rem;
  margin-bottom: 0.6rem;
  color: #1e293b;
  text-align: center;
  font-weight: 600;
}

/* ===== TEXTO ===== */
.info-texto {
  margin-bottom: 0.8rem;
}

.info-texto p {
  margin: 6px 0;
  font-size: 0.95rem;
  color: #475569;
}

/* ===== BADGE ===== */
.badge {
  background: linear-gradient(135deg, #38bdf8, #6366f1);
  color: white;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: capitalize;
}

/* ===== NOTAS ===== */
.notas {
  color: #64748b;
  font-size: 0.85rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
}

/* ===== IMAGEN ===== */
.imagen-contenedor {
  margin-top: 1rem;
  width: 100%;
  overflow: hidden;
  border-radius: 12px;
}

.imagen-contenedor img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.imagen-contenedor img:hover {
  transform: scale(1.05);
}

/* ===== BOTONES ===== */
.acciones {
  display: flex;
  gap: 12px;
  margin-top: 1.2rem;
}

.btn-detalle,
.btn-editar {
  flex: 1;
  text-align: center;
  text-decoration: none;
  padding: 10px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.25s ease;
}

/* Botón detalle */
.btn-detalle {
  background: #f1f5f9;
  color: #1e293b;
}

.btn-detalle:hover {
  background: #e2e8f0;
  transform: translateY(-3px);
}

/* Botón editar */
.btn-editar {
  background: linear-gradient(135deg, #facc15, #f59e0b);
  color: #1e293b;
}

.btn-editar:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 14px rgba(245, 158, 11, 0.35);
}
</style>