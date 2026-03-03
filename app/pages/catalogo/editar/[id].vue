<script setup lang="ts">
import { ref, watchEffect } from 'vue';

const route = useRoute();
const router = useRouter();
const animalId = route.params.id;

const isLoading = ref(false);
const errorMessage = ref('');

// 1️⃣ Obtenemos los datos actuales del animal
const { data: animal, pending, error } = await useFetch(`/api/animals/${animalId}`);

// 2️⃣ Preparamos el formulario
const form = ref({
    name: '',
    scientific_name: '',
    category: 'mammal',
    seenAt: '',
    notes: '',
    imageUrl: ''
});

// 3️⃣ Cuando los datos del animal carguen, rellenamos el formulario automáticamente
watchEffect(() => {
    if (animal.value) {
        form.value.name = animal.value.name || '';
        form.value.scientific_name = animal.value.scientific_name || '';
        form.value.category = animal.value.category || 'mammal';
        form.value.notes = animal.value.notes || '';
        form.value.imageUrl = animal.value.imageUrl || '';

        // Formatear la fecha para que el input type="datetime-local" la entienda
        if (animal.value.seenAt) {
            const fecha = new Date(animal.value.seenAt);
            // Recortamos para que quede en formato YYYY-MM-DDTHH:MM
            form.value.seenAt = fecha.toISOString().slice(0, 16);
        }
    }
});

// 4️⃣ Función para enviar los cambios a tu API
const actualizarAnimal = async () => {
    isLoading.value = true;
    errorMessage.value = '';

    try {
        // Fíjate que usamos el método PUT y le pasamos el animalId en la URL
        await $fetch(`/api/animals/${animalId}`, {
            method: 'PUT',
            body: form.value
        });

        alert("¡Animal actualizado correctamente!");
        router.push('/catalogo'); // Volvemos al catálogo

    } catch (err: any) {
        console.error("Error al actualizar:", err);
        errorMessage.value = err.statusMessage || "Hubo un error al actualizar el animal.";
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <div class="form-container">
        <h1>Editar Animal</h1>

        <div v-if="pending">Cargando datos del animal...</div>
        <div v-else-if="error" class="error-msg">No se pudo cargar el animal.</div>

        <form v-else @submit.prevent="actualizarAnimal" class="animal-form">

            <div v-if="errorMessage" class="error-msg">
                {{ errorMessage }}
            </div>

            <div class="form-group">
                <label for="name">Nombre común *</label>
                <input v-model="form.name" type="text" id="name" required />
            </div>

            <div class="form-group">
                <label for="scientific_name">Nombre científico</label>
                <input v-model="form.scientific_name" type="text" id="scientific_name" />
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
                <input v-model="form.imageUrl" type="url" id="imageUrl" />
            </div>

            <div class="form-group full-width">
                <label for="notes">Notas / Descripción</label>
                <textarea v-model="form.notes" id="notes" rows="4"></textarea>
            </div>

            <div class="form-actions full-width">
                <NuxtLink to="/catalogo" class="btn-cancelar">Cancelar</NuxtLink>
                <button type="submit" class="btn-guardar" :disabled="isLoading">
                    {{ isLoading ? 'Actualizando...' : 'Actualizar Animal' }}
                </button>
            </div>
        </form>
    </div>
</template>

<style scoped>
/* Son los mismos estilos que usamos en nuevo.vue */
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

.form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 10px;
}

.btn-guardar {
    background-color: #ffc107;
    color: #333;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
}

.btn-guardar:hover {
    background-color: #e0a800;
}

.btn-cancelar {
    background-color: #f8f9fa;
    color: #333;
    text-decoration: none;
    padding: 10px 20px;
    border-radius: 8px;
    border: 1px solid #ccc;
}
</style>