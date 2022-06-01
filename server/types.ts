export interface IUser {
  identity: Identity;
  socketId: string;
  roomId: string;
}

export interface IRoom {
  id: string;
  connectedUsers: IUser[];
}

export type Identity = {
  name: string;
  id: string;
};

export interface IMessage {
  message: string;
  time: string;
  author: string;
  isAuthor: boolean;
}
