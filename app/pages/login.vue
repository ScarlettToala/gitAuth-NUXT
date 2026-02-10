<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const schema = z.object({
    email: z.string().email('Invalid email'),
    password: z.string('Password is required').min(8, 'Must be at least 8 characters')
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
    email: undefined,
    password: undefined
})

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
    toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' })
    console.log(event.data)
}
</script>

<template>

    <UCard class="max-w-md m-auto mi-10">
        <template>
            <h1 class="text-2x1 text-center">Login</h1>
        </template>
        <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
            <UFormField label="Email" name="email">
                <UInput v-model="state.email" />
            </UFormField>

            <UFormField label="Password" name="password">
                <UInput v-model="state.password" type="password" />
            </UFormField>

            <UButton type="submit">
                Submit
            </UButton>
        </UForm>
    </UCard>

    <UButton type="submit">
       Login with Github
    </UButton>
</template>
