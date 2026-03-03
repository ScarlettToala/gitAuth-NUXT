<script setup>
definePageMeta({ middleware: ["auth"] })

// lazy per renderitzar quan ho tingui el en client ???
const { data } = useFetch('/api/admin', {
    lazy: true
});

</script>

<template>
    <div class="admin-container">
        <div v-if="data">
            {{ data.sensitive }}
        </div>

        <div class="actions">
            <NuxtLink to="/animalesCatalogo" class="action-link">
                Ver Mis Animales Guardados
            </NuxtLink>
            <NuxtLink to="/catalogo/index" class="action-link">
                Guardar un nuevo animal
            </NuxtLink>
        </div>
    </div>
</template>

<style scoped>
/* Contenedor principal */
.admin-container {
    max-width: 600px;
    margin: 60px auto;
    padding: 32px;
    text-align: center;
    background: #ffffff;
    border-radius: 16px;
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
}

:deep(.dark) .admin-container {
    background: #1e293b;
    color: #000000;
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.5);
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