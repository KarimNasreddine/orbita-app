const apiURL = "http://ec2-3-140-46-112.us-east-2.compute.amazonaws.com:1317";
const rpcURL = "http://ec2-3-140-46-112.us-east-2.compute.amazonaws.com:26657";
const prefix = "orbita";
const alertAppURL = "http://3.99.220.2/";

const NEXTAUTH_URL = "http://localhost:3000";
const NEXTAUTH_SECRET = "Orbita-Zone";

const UPSTASH_REDIS_REST_URL = "https://eu2-settling-polliwog-31027.upstash.io";
const UPSTASH_REDIS_REST_TOKEN =
  "AXkzASQgMWRkOGNkNWItMTA5NS00ZjNlLWIzODctYTI1Mjk2MjUyMGQ3ZDkzYTNlZmM3NTZjNDZlMTgxM2JkMjhiYjQyZTEwN2I=";

const PUSHER_APP_ID = "1754900";
const NEXT_PUBLIC_PUSHER_APP_KEY = "f38157df5d76fcef07c6";
const PUSHER_APP_SECRET = "957262143ffba2e8a42e";
const NEXT_PUBLIC_PUSHER_APP_CLUSTER = "ap2";

const safefiAddress = "orbita1xc9d44w8097v9u5ruacp2nz7kjrd8tlfpdxjdc";
const safefiPrivKey =
  "110829617d884c531c0c13bbec64e0807d7fb272d0d01d89ed8d7e72c43e395f";

export const env = {
  apiURL,
  rpcURL,
  prefix,
  alertAppURL,
  NEXTAUTH_URL,
  NEXTAUTH_SECRET,
  UPSTASH_REDIS_REST_URL,
  UPSTASH_REDIS_REST_TOKEN,
  PUSHER_APP_ID,
  NEXT_PUBLIC_PUSHER_APP_KEY,
  PUSHER_APP_SECRET,
  NEXT_PUBLIC_PUSHER_APP_CLUSTER,
  safefiAddress,
  safefiPrivKey,
};
