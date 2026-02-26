<script setup lang="ts">
const { loggedIn, user, session, fetch, clear, openInPopup } = useUserSession();
</script>

<template>
  <UCard class="flex justify-between items-center p-4 bg-white dark:bg-gray-900 shadow-md rounded-lg w-full max-w-md mx-auto mt-6">
    
    <!-- Usuario logueado -->
    <div v-if="loggedIn" class="flex items-center gap-4">
      <div class="flex flex-col">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-green-400">
          {{ user?.login }}
        </h2>
        <p class="text-sm text-gray-500 dark:text-gray-300">Logged in</p>
      </div>
      <UButton 
        class="bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
        @click="clear(); navigateTo('/login')"
      >
        Logout
      </UButton>
    </div>

    <!-- Usuario no logueado -->
    <div v-else class="flex items-center gap-4">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-200">No has inciado sesión</h2>
      <UButton 
        as-child
        class="bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
      >
        <NuxtLink to="/login">Login</NuxtLink>
      </UButton>
    </div>

  </UCard>
</template>