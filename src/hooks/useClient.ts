import { Client } from "ts-client";
import { env } from "../env";

// Singleton
const clientInstance = new Client(env);

export const useClient = () => clientInstance;
