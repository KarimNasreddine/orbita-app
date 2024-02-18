/* eslint-disable react-hooks/rules-of-hooks */
import { Client } from "../../ts-client";
import { env } from "../env";

const useClientInstance = () => {
  const client = new Client(env);
  return client;
};
let clientInstance: ReturnType<typeof useClientInstance>;

export const useClient = () => {
  if (!clientInstance) {
    clientInstance = useClientInstance();
  }
  return clientInstance;
};
