import { useClientsStore } from './../../store/clients';
import { useQuery } from '@tanstack/vue-query';
import clientsApi from "@/api/clients-api";
import type { Client } from "../interfaces/client";
import { storeToRefs } from 'pinia';
import { watch, computed } from 'vue';

const getClients = async(page: number):Promise<Client[]> => {
    
    // await new Promise( resolve => {
    //     setTimeout( () => resolve(true), 2500); 
    // });
    
    const { data } = await clientsApi.get<Client[]>(`/clients?_page=${ page }`);

    return data;
}

const useClients = () => {

    const store = useClientsStore();
    const { clients, currentPage, totalPages } = storeToRefs(store);

    const { isLoading, data } = useQuery(
        ['clients?_page=', currentPage],
        () => getClients( currentPage.value ),
    );

    watch( data, clients => {
        if(clients) store.setClients(clients);
    }, { immediate: true });

    return {
        // State
        isLoading,
        clients,
        currentPage,
        totalPages,

        // Methods
        getPage( page: number ){
            
            store.setPage( page );
        },

        // Getters 
        // totalPageNumbers: computed(
        //     () => [...new Array(totalPages.value)].map( (v, i) => i + 1 )
        // ),
    }
}

export default useClients;