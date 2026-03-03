<script setup lang="ts">
import { ref } from 'vue';
// Usamos useRouter para redirigir al usuario cuando termine de guardar
const router = useRouter();

const isLoading = ref(false);
const errorMessage = ref('');

// Preparamos un objeto reactivo con los campos vacíos
const form = ref({
    name: '',
    scientific_name: '',
    category: '', // Podrías incluso preseleccionar una categoría 
    seenAt: '',
    notes: '',
    imageUrl: ''
});

// La función que se ejecuta al darle al botón "Guardar"
const guardarNuevoAnimal = async () => {
    isLoading.value = true;
    errorMessage.value = '';

    try {
        // Llamamos a nuestra nueva API POST
        await $fetch('/api/animals', {
            method: 'POST',
            body: form.value
        });

        // Si todo va bien, mandamos al usuario de vuelta al catálogo general
        alert("¡Animal añadido al catálogo!");
        router.push('/catalogo');

    } catch (error: any) {
        console.error("Error al guardar:", error);
        errorMessage.value = error.statusMessage || "Hubo un error al crear el animal.";
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <div class="form-container">
        <h1>Añadir Nuevo Animal</h1>

        <div v-if="errorMessage" class="error-msg">
            {{ errorMessage }}
        </div>

        <form @submit.prevent="guardarNuevoAnimal" class="animal-form">

            <div class="form-group">
                <label for="name">Nombre común *</label>
                <input v-model="form.name" type="text" id="name" required placeholder="Ej: Zorro Rojo" />
            </div>

            <div class="form-group">
                <label for="scientific_name">Nombre científico</label>
                <input v-model="form.scientific_name" type="text" id="scientific_name"
                    placeholder="Ej: Vulpes vulpes" />
            </div>

            <div class="form-group">
                <label for="category">Categoría *</label>
                <select v-model="form.category" id="category" required>
                    <option value="mammal">Mamífero</option>
                    <option value="bird">Ave</option>
                    <option value="reptile">Reptil</option>
                    <option value="amphibian">Anfibio</option>
                    <option value="marine">Marino</option>
                    <option value="insect">Insecto</option>
                </select>
            </div>

            <div class="form-group">
                <label for="seenAt">Fecha de Avistamiento *</label>
                <input v-model="form.seenAt" type="datetime-local" id="seenAt" required />
            </div>

            <div class="form-group">
                <label for="imageUrl">URL de la Imagen</label>
                <input v-model="form.imageUrl" type="url" id="imageUrl" placeholder="https://ejemplo.com/foto.jpg" />
            </div>

            <div class="form-group full-width">
                <label for="notes">Notas / Descripción</label>
                <textarea v-model="form.notes" id="notes" rows="4" placeholder="¿Dónde lo viste? ¿Cómo era?"></textarea>
            </div>

            <div class="form-actions full-width">
                <NuxtLink to="/catalogo" class="btn-cancelar">Cancelar</NuxtLink>
                <button type="submit" class="btn-guardar" :disabled="isLoading">
                    {{ isLoading ? 'Guardando...' : 'Guardar Animal' }}
                </button>
            </div>

        </form>
    </div>
</template>

<style scoped>
.form-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.error-msg {
    background-color: #f8d7da;
    color: #721c24;
    padding: 12px;
    border-radius: 8px;
    margin-bottom: 20px;
    text-align: center;
}

.animal-form {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
}

.form-group {
    flex: 1 1 calc(50% - 16px);
    display: flex;
    flex-direction: column;
}

.form-group.full-width {
    flex: 1 1 100%;
}

label {
    font-weight: bold;
    margin-bottom: 6px;
    color: #333;
}

input,
select,
textarea {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 1rem;
}

input:focus,
select:focus,
textarea:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
}

.form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 10px;
}

.btn-guardar {
    background-color: #28a745;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    font-size: 1rem;
}

.btn-guardar:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
}

.btn-cancelar {
    background-color: #f8f9fa;
    color: #333;
    text-decoration: none;
    padding: 10px 20px;
    border-radius: 8px;
    border: 1px solid #ccc;
    display: flex;
    align-items: center;
}
</style>