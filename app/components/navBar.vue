<script setup lang="ts">
const { loggedIn, user, clear } = useUserSession();
const route = useRoute(); //  Obtenemos la ruta actual

// 1. Definimos en qué páginas NO queremos que aparezca el NavBar
// He incluido 'login' y 'register' por si acaso
const mostrarNavbar = computed(() => {
  return route.path !== '/login' && route.path !== '/register';
});

const handleLogout = async () => {
  await clear();
  navigateTo('/login');
};
</script>

<template>
  <UCard v-if="mostrarNavbar" class="w-full max-w-2xl mx-auto mt-8 
           rounded-2xl overflow-hidden
           bg-white/80 dark:bg-gray-900/80
           backdrop-blur-lg
           shadow-lg hover:shadow-2xl
           transition-all duration-300 border-none">
    
    <div class="p-4 md:p-6">
      <div v-if="loggedIn" class="flex flex-col gap-6">
        
        <div class="flex items-center justify-between w-full border-b border-gray-100 dark:border-gray-800 pb-4">
          <div class="flex items-center gap-3">
            <div class="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
            <div class="flex flex-col">
              <h2 class="text-lg font-bold text-gray-800 dark:text-green-400 leading-tight">
                {{ user?.login }}
              </h2>
              <p class="text-[10px] uppercase tracking-widest text-gray-500">
                Sesión activa
              </p>
            </div>
          </div>

          <UButton 
            color="red" 
            variant="ghost" 
            icon="i-heroicons-arrow-left-on-rectangle"
            class="rounded-xl font-bold hover:scale-105 transition-transform"
            @click="handleLogout"
          >
            Salir
          </UButton>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <UButton 
            as-child
            block
            class="py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-md transition-all hover:-translate-y-1"
          >
            <NuxtLink to="/animalesGuardados">
              📂 Mis Guardados
            </NuxtLink>
          </UButton>

          <UButton 
            as-child
            block
            class="py-3 rounded-xl font-semibold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-md transition-all hover:-translate-y-1"
          >
            <NuxtLink to="/catalogo">
              🐾 Ver Catálogo
            </NuxtLink>
          </UButton>
        </div>
      </div>

      <div v-else class="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="text-center sm:text-left">
          <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
            ¡Hola, explorador!
          </h2>
          <p class="text-xs text-gray-500 dark:text-gray-400">
            Inicia sesión para guardar tus avistamientos
          </p>
        </div>

        <UButton 
          as-child 
          size="lg"
          class="px-8 py-2 rounded-xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg transition-all hover:scale-105"
        >
          <NuxtLink to="/login">Entrar</NuxtLink>
        </UButton>
      </div>

    </div>
  </UCard>
</template>