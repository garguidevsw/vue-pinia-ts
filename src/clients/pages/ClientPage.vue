<script setup lang="ts">
import type LoadingModalVue from '@/shared/components/LoadingModal.vue';
import useClient from '@/clients/composables/useClient';
import { useRoute, useRouter } from 'vue-router';
import { useMutation } from '@tanstack/vue-query';
import type { Client } from '../interfaces/client';
import clientsApi from '@/api/clients-api';
import { watch } from 'vue';

const route = useRoute();
const router = useRouter();

// const queryClient = useQueryClient();

const { isLoading, client, clientMutation, isError, clientUpdate, isUpdatingSuccess, isUpdating, isErrorUpdating } = useClient( +route.params.id );

watch( isError, () => {
    if(isError.value){
        router.replace('/clients');
    }
});

watch( clientMutation.isSuccess, () => {
    setTimeout(() => {
        clientMutation.reset()
    }, 2000);
});

</script>

<template>
    <h3 v-if="isUpdating">Guardando...</h3>
    <h3 v-if="isUpdatingSuccess">Guardado</h3>

    <LoadingModalVue v-if="isLoading" />

    <div v-if="client">
        <h1>{{ client.name }}</h1>
        <form @submit.prevent="clientUpdate( client! )">
            <input v-model="client.name" type="text" placeholder="Nombre">
            <br>
            <input v-model="client.address" type="text" placeholder="Dirección">
            <br>
            <button :disabled="isUpdating" type="submit">Guardar</button>
        </form>
    </div>

    <code>
        {{ client }}
    </code>
</template>

<style scoped>
input {
    width: 100%;
    padding: 5px 10px;
    margin-bottom: 5px;
}

button {
    margin-bottom: 20px;
}
</style>