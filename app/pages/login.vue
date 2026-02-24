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

    <UCard class="max-w-md m-auto my-10 p-8 shadow-lg rounded-lg bg-white">
        <h1 class="text-3xl font-bold text-center mb-6 text-gray-800">Login</h1>
        <UForm :schema="schema" :state="state" class="space-y-6" @submit="onSubmit">
            <UFormField label="Email" name="email">
                <UInput v-model="state.email"
                    class="w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-blue-500 text-black" />
            </UFormField>

            <UFormField label="Password" name="password">
                <UInput v-model="state.password" type="password"
                    class="w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-blue-500" />
            </UFormField>

            <UButton type="submit"
                class="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition">
                Iniciar sesión
            </UButton>
        </UForm>
        <div class="flex items-center my-4">
            <div class="flex-grow border-t border-gray-300"></div>
            <span class="mx-2 text-gray-400">o</span>
            <div class="flex-grow border-t border-gray-300"></div>
        </div>
        <UButton class="w-full bg-gray-800 text-white font-semibold py-2 rounded-md hover:bg-gray-900 transition mt-2"
            @click="openInPopup('/auth/github')">
            Login con Github
        </UButton>
        <NuxtLink to="/register" class="block text-center mt-6 text-blue-600 hover:underline text-sm">
            ¿No tienes cuenta? <span class="font-semibold">Regístrate aquí</span>
        </NuxtLink>
        
        <UCard>
            <UCardHeader>
                <h2 class="text-lg font-semibold">¿Olvidaste tu contraseña?</h2>
            </UCardHeader>
            <UCardBody>
                <p class="text-gray-600">No te preocupes, puedes restablecerla aquí.</p>
                <NuxtLink to="/reset-password" class="text-blue-600 hover:underline">Restablecer contraseña</NuxtLink>
            </UCardBody>
        </UCard>
        </UCard>
</template>