<script setup lang="ts">

import ClientList from '@/clients/components/ClientList.vue'
import PaginationNumbers from '../components/PaginationNumbers.vue';
import useClients from '../composables/useClients';
import LoadingModal from '@/shared/components/LoadingModal.vue';

const { getPage, isLoading, clients, currentPage, totalPages } = useClients();
</script>

<template>
    <div>
        <h1>Lista de Clientes</h1>

        <!-- CLient List -->
        <ClientList :clients="clients" />
        <!-- Pagination Numbers -->
        <PaginationNumbers
            @page-changed="getPage"
            :currentPage="currentPage"
            :totalPages="totalPages"/>
        <!-- LoadingModal -->
        <LoadingModal v-if="isLoading"/>
    </div>
</template>


<style scoped>

</style>