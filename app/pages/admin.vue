<script setup lang="ts"> 
definePageMeta({middleware:["auth"]});
const {data} = useFetch("/api/admin")
</script>

<template>
Ya estas registrado
{{ data?.sensitive }}
</template>