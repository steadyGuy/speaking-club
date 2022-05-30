export interface IParticipant {
  identity: {
    id: string;
    name: string;
  };
  id: string;
  socketId: string;
  roomId: string;
  stream?: MediaStream;
}
