import PusherServer from "pusher";
import PusherClient from "pusher-js";

// The server instance is used to trigger events from the server
export const pusherServer = new PusherServer({
  appId: process.env.PUSHER_APP_ID as string,
  key: process.env.PUSHER_KEY as string,
  secret: process.env.PUSHER_SECRET as string,
  cluster: process.env.PUSHER_CLUSTER as string,
  useTLS: true,
});

// The client instance is used to subscribe to events from the client.
export const pusherClient = new PusherClient(process.env.PUSHER_KEY as string, {
  cluster: process.env.PUSHER_CLUSTER as string,
});
