const uptashRedisRestUrl = "https://eu2-settling-polliwog-31027.upstash.io";
const authToken =
  "AXkzASQgMWRkOGNkNWItMTA5NS00ZjNlLWIzODctYTI1Mjk2MjUyMGQ3ZDkzYTNlZmM3NTZjNDZlMTgxM2JkMjhiYjQyZTEwN2I=";

// const uptashRedisRestUrl = process.env.NEXT_PUBLIC_UPSTASH_REDIS_REST_URL;
// const authToken = process.env.NEXT_PUBLIC_UPSTASH_REDIS_REST_TOKEN;

type Command = "zrange" | "sismember" | "get" | "smembers";

export async function fetchRedis(
  command: Command,
  ...args: (string | number)[]
) {
  console.log("fetchRedis", command, args);
  const commandUrl = `${uptashRedisRestUrl}/${command}/${args.join("/")}`;

  console.log("commandUrl", commandUrl);

  const response = await fetch(commandUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Error executing Redis command: ${response.statusText}`);
  }

  const data = await response.json();
  return data.result;
}
