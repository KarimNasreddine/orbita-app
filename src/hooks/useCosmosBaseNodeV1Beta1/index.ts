/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery, type UseQueryOptions, useInfiniteQuery, type UseInfiniteQueryOptions } from "@tanstack/react-query";
import { useClient } from '../useClient';

export default function useCosmosBaseNodeV1Beta1() {
  const client = useClient();
  const ServiceConfig = ( options: any) => {
    const key = { type: 'ServiceConfig',  };    
    return useQuery([key], () => {
      // @ts-ignore
      return  client.CosmosBaseNodeV1Beta1.query.serviceConfig().then( res => res.data );
    }, options);
  }
  
  return {ServiceConfig,
  }
}