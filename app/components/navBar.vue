<script setup lang="ts">
const { loggedIn, user, session, fetch, clear, openInPopup } = useUserSession();
</script>

<template>
  <UCard class="w-full max-w-md mx-auto mt-8 
           rounded-2xl overflow-hidden
           bg-white/80 dark:bg-gray-900/80
           backdrop-blur-lg
           shadow-lg hover:shadow-2xl
           transition-all duration-300">
    <div class="flex justify-between items-center p-6">

      <!-- Usuario logueado -->
      <div v-if="loggedIn" class="flex items-center gap-4">

        <!-- Indicador visual -->
        <div class="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>

        <div class="flex flex-col">
          <h2 class="text-lg font-semibold text-gray-800 dark:text-green-400 tracking-wide">
            {{ user?.login }}
          </h2>
          <p class="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Sesión activa
          </p>
        </div>

        <UButton class="ml-4 px-4 py-2 rounded-xl font-medium
                 bg-gradient-to-r from-red-500 to-red-600
                 hover:from-red-600 hover:to-red-700
                 text-white shadow-md
                 transition-all duration-300 hover:scale-105" @click="clear(); navigateTo('/login')">
          Logout
        </UButton>
      </div>

      <!-- Usuario no logueado -->
      <div v-else class="flex items-center justify-between w-full gap-4">

        <div>
          <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
            No has iniciado sesión
          </h2>
          <p class="text-xs text-gray-500 dark:text-gray-400">
            Inicia sesión para continuar
          </p>
        </div>

        <UButton as-child class="px-4 py-2 rounded-xl font-medium
                 bg-gradient-to-r from-blue-500 to-indigo-600
                 hover:from-blue-600 hover:to-indigo-700
                 text-white shadow-md
                 transition-all duration-300 hover:scale-105">
          <NuxtLink to="/login">Login</NuxtLink>
        </UButton>
      </div>

    </div>
  </UCard>
</template>