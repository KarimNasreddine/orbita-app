import { Redis } from "@upstash/redis";

// Creates a connection to the Upstash Redis database.
// The db object is used to interact with the database.
export const db = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL as string,
  token: process.env.UPSTASH_REDIS_REST_TOKEN as string,
});
