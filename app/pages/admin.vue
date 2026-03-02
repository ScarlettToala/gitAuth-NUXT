<script setup>
definePageMeta({ middleware: ["auth"] })

// lazy per renderitzar quan ho tingui el en client ???
const { data } = useFetch('/api/admin', {
    lazy: true
});

</script>

<template>
    <div v-if="data">
        {{ data.sensitive }}
    </div>
    <NuxtLink to="/animalesCatalogo">
        Ver los animales guardados
    </NuxtLink>
    <NuxtLink to="/catalogo">
        Ver los animales disponibles
    </NuxtLink>
</template>