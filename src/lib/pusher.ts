import { env } from "@/env";
import PusherServer from "pusher";
import PusherClient from "pusher-js";

// The server instance is used to trigger events from the server
export const pusherServer = new PusherServer({
  appId: env.PUSHER_APP_ID as string,
  key: env.NEXT_PUBLIC_PUSHER_APP_KEY as string,
  secret: env.PUSHER_APP_SECRET as string,
  cluster: env.NEXT_PUBLIC_PUSHER_APP_CLUSTER as string,
  useTLS: true,
});

// The client instance is used to subscribe to events from the client.
export const pusherClient = new PusherClient(
  env.NEXT_PUBLIC_PUSHER_APP_KEY as string,
  {
    cluster: env.NEXT_PUBLIC_PUSHER_APP_CLUSTER as string,
  }
);
