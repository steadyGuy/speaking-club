export interface IParticipant {
  identity: {
    id: string;
    name: string;
  };
  id: string;
  socketId: string;
  roomId: string;
  onlyAudio: boolean;
}

export interface IMessage {
  message: string;
  time: string;
  author: string;
  isAuthor: boolean;
}
