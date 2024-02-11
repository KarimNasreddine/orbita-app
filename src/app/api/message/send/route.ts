export async function POST(req: Request) {
  try {
    const { text, chatId }: { text: string; chatId: string } = await req.json();

    console.log("text", text);
    console.log("chatId", chatId);

    // const session = await getServerSession(authOptions);

    // if (!session) {
    //   return new Response("Unauthorized", { status: 401 });
    // }

    // const [userId1, userId2] = chatId.split("--");

    // if (userId1 !== session.user.id && userId2 !== session.user.id) {
    //     return new Response("Unauthorized", { status: 401 });
    // }

    // const friendId = userId1 === session.user.id ? userId2 : userId1;
  } catch (error) {
    console.error(error);
    return new Response("Something went wrong", { status: 500 });
  }
}
