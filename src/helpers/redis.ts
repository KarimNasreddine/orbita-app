type Command = "zrange" | "sismember" | "get" | "smembers" | "del";

export async function fetchRedis(
  command: Command,
  ...args: (string | number)[]
) {
  const uptashRedisRestUrl = process.env.NEXT_PUBLIC_UPSTASH_REDIS_REST_URL;
  const authToken = process.env.NEXT_PUBLIC_UPSTASH_REDIS_REST_TOKEN;

  // console.log("fetchRedis", command, args);
  const commandUrl = `${uptashRedisRestUrl}/${command}/${args.join("/")}`;

  // console.log("commandUrl", commandUrl);

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
