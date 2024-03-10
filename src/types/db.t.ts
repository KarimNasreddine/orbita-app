interface User {
  name: string;
  publicAddress: string;
}

interface chat {
  id: string;
  message: string;
}

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  stamp: string;
}

interface FriendRequest {
  id: string;
  senderId: string;
  receiverId: string;
}
