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
    name: z.string().min(1, 'El nombre es obligatorio'),
    email: z.string().email('Email inválido'),
    password: z.string().min(8, 'Mínimo 8 caracteres')
})

type Schema = z.output<typeof schema>

/* ========================
   State reactivo
======================== */
const state = reactive<Partial<Schema>>({
    name: '',
    email: '',
    password: ''
})

/* ========================
   Submit
======================== */
async function onSubmit(event: FormSubmitEvent<Schema>) {
    try {
        await $fetch('/auth/register', {
            method: 'POST',
            body: event.data
        })
        toast.add({ title: 'Éxito', description: 'Cuenta registrada correctamente', color: 'success' })
        fetch()
        navigateTo('/admin')
    } catch (error) {
        const message =
            error instanceof FetchError
                ? error.data?.message ?? 'Error en el registro'
                : 'Error inesperado. Contacta con soporte.'
        toast.add({ title: 'Error', description: message, color: 'error' })
    }
}

/* ========================
   Auto redirect si ya logueado
======================== */
watch(loggedIn, () => {
    if (loggedIn.value) navigateTo('/admin')
})
</script>

<template>
  <UCard class="max-w-md mx-auto my-10 p-6 rounded-lg shadow-lg bg-gray-100 dark:bg-gray-900">
    
    <h1 class="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-green-400">Register</h1>

    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormField label="Nombre" name="name">
        <UInput 
          v-model="state.name" 
          placeholder="Tu nombre completo"
          class="w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white" 
        />
      </UFormField>

      <UFormField label="Email" name="email">
        <UInput 
          v-model="state.email" 
          type="email"
          placeholder="usuario@ejemplo.com"
          class="w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        />
      </UFormField>

      <UFormField label="Password" name="password">
        <UInput 
          v-model="state.password" 
          type="password"
          placeholder="Mínimo 8 caracteres"
          class="w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        />
      </UFormField>

      <UButton 
        type="submit"
        class="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition dark:bg-blue-700 dark:hover:bg-blue-800 text-center"
      >
        Registrarse
      </UButton>
    </UForm>

    <!-- Botón social con icono -->
    <UButton 
      class="w-full flex items-center justify-center gap-2 mt-4 bg-gray-800 text-white font-semibold py-2 rounded-md hover:bg-gray-900 transition dark:bg-gray-700 dark:hover:bg-gray-600"
      @click="openInPopup('/auth/github')"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path fill-rule="evenodd" d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.61-4.033-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.236 1.84 1.236 1.07 1.833 2.809 1.304 3.495.997.108-.776.418-1.305.762-1.605-2.665-.303-5.466-1.332-5.466-5.931 0-1.31.468-2.382 1.235-3.222-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 0 1 3-.404c1.02.005 2.045.137 3 .404 2.29-1.552 3.296-1.23 3.296-1.23.653 1.653.241 2.873.118 3.176.77.84 1.233 1.912 1.233 3.222 0 4.61-2.805 5.625-5.475 5.922.43.372.815 1.102.815 2.222v3.293c0 .319.218.694.825.576C20.565 21.795 24 17.3 24 12c0-6.627-5.373-12-12-12z" clip-rule="evenodd"/>
      </svg>
      Registrarse con Github
    </UButton>

    <NuxtLink to="/login" class="block text-center mt-4 text-blue-600 hover:underline text-sm">
      ¿Ya tienes cuenta? <span class="font-semibold">Inicia sesión</span>
    </NuxtLink>

  </UCard>
</template>