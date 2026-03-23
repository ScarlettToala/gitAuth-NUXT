<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { FetchError } from 'ofetch'

const { loggedIn, fetch, openInPopup } = useUserSession()
const toast = useToast()

/* ========================
   Schema de validación
======================== */
const schema = z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(8, 'Mínimo 8 caracteres')
})

type Schema = z.infer<typeof schema>

/* ========================
   State
======================== */
const state = reactive<Partial<Schema>>({
    email: '',
    password: ''
})

const loading = ref(false)

/* ========================
   Submit
======================== */
async function onSubmit(event: FormSubmitEvent<Schema>) {
    if (loading.value) return

    loading.value = true

    try {
        await $fetch('/auth/login', {
            method: 'POST',
            body: event.data
        })

        toast.add({
            title: 'Login correcto',
            description: 'Has iniciado sesión correctamente',
            color: 'success'
        })

        await fetch()
        await navigateTo('/admin')

    } catch (error) {
        const message =
            error instanceof FetchError
                ? error?.data?.message ?? 'Credenciales incorrectas'
                : 'Error inesperado. Contacta con soporte.'

        toast.add({
            title: 'Error',
            description: message,
            color: 'error'
        })
    } finally {
        loading.value = false
    }
}
// // El backend le grita el token a la ventana principal de Quasar (que suele estar en el puerto 9000)
//   window.opener.postMessage({ token: 'AQUI_EL_JWT_GENERADO' }, 'http://localhost:9000');
//   // Luego el popup se suicida felizmente
//   window.close();
  
/* ========================
   Auto redirect
======================== */
watchEffect(() => {
    if (loggedIn.value) {
        navigateTo('/admin')
    }
})
</script>

<template>
  <!-- Card principal sin fondo blanco -->
  <UCard class="max-w-md m-auto my-10 p-8 shadow-lg rounded-lg bg-gray-100 dark:bg-gray-900">
    
    <h1 class="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-green-400">Login</h1>
    
    <UForm :schema="schema" :state="state" class="space-y-6" @submit="onSubmit">
      <UFormField label="Email" name="email">
        <UInput 
          v-model="state.email"
          class="w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-blue-500 text-black dark:text-white dark:bg-gray-800 dark:border-gray-600" 
        />
      </UFormField>

      <UFormField label="Password" name="password">
        <UInput 
          v-model="state.password" 
          type="password"
          class="w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:bg-gray-800 dark:border-gray-600" 
        />
      </UFormField>

      <UButton 
        type="submit"
        class="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition dark:bg-blue-700 dark:hover:bg-blue-800"
      >
        Iniciar sesión
      </UButton>
    </UForm>

    <div class="flex items-center my-4">
      <div class="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
      <span class="mx-2 text-gray-400">o</span>
      <div class="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
    </div>

<UButton
  class="w-full flex items-center justify-center gap-2 bg-gray-800 text-white font-semibold py-2 rounded-md hover:bg-gray-900 transition dark:bg-gray-700 dark:hover:bg-gray-600 mt-2"
  @click="openInPopup('/auth/github')"
>
  <!-- Icono de Github -->
  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
    <path fill-rule="evenodd" d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.61-4.033-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.236 1.84 1.236 1.07 1.833 2.809 1.304 3.495.997.108-.776.418-1.305.762-1.605-2.665-.303-5.466-1.332-5.466-5.931 0-1.31.468-2.382 1.235-3.222-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 0 1 3-.404c1.02.005 2.045.137 3 .404 2.29-1.552 3.296-1.23 3.296-1.23.653 1.653.241 2.873.118 3.176.77.84 1.233 1.912 1.233 3.222 0 4.61-2.805 5.625-5.475 5.922.43.372.815 1.102.815 2.222v3.293c0 .319.218.694.825.576C20.565 21.795 24 17.3 24 12c0-6.627-5.373-12-12-12z" clip-rule="evenodd"/>
  </svg>

  Login con Github
</UButton>

    <NuxtLink to="/register" class="block text-center mt-6 text-blue-600 hover:underline text-sm">
      ¿No tienes cuenta? <span class="font-semibold">Regístrate aquí</span>
    </NuxtLink>

    <div class="mt-4 text-center">
        <p>¿Olvidaste tu contraseña?</p>
        <NuxtLink to="/reset-password" class="text-blue-600 hover:underline">Restablecer contraseña</NuxtLink>
    </div>

  </UCard>
</template>