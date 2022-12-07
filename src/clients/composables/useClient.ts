import { computed, ref, watch } from "vue";
import clientsApi from '@/api/clients-api';
import { useMutation, useQuery } from "@tanstack/vue-query";

import type { Client } from "../interfaces/client";

const getClient = async ( id: number ): Promise<Client> => {
    const { data } = await clientsApi.get(`/clients/${ id }`);

    return data;
}

const updateClient = async( client: Client ): Promise<Client> => {

    // await new Promise( resolve => {
    //     setTimeout( () => resolve(true), 1500); 
    // });

    const { data } = await clientsApi.patch<Client>(`/clients/${ client.id }`, client );

    // const queries = queryClient.getQueryCache().clear();
    // const queries = queryClient.getQueryCache().findAll(['clients?page='], { exact: false });
    // queries.forEach( query => query.reset() );
    // queries.forEach( query => query.fetch() );
    return data;
}

const useClient = ( id: number ) => {
    const client = ref<Client>();

    const { isLoading, data, isError } = useQuery(
        ['client', id],
        () => getClient(id),
        // {
        //     retry: false,
        // }
        
    );

    const clientMutation = useMutation( updateClient );


    watch( data, () => {
        if(data.value)
            client.value = { ...data.value };
    }, { immediate: true })
    
    return {
        client,
        isError,
        isLoading,
        clientMutation,

        // Methods 
        clientUpdate: clientMutation.mutate,
        isUpdating: computed( () => clientMutation.isLoading.value ),
        isUpdatingSuccess: computed( () => clientMutation.isSuccess.value ),
        isErrorUpdating: computed( () => clientMutation.isError.value )
    }
}

export default useClient;