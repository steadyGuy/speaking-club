export interface IUser {
  identity: {
    name: string;
    id: string;
  };
  socketId: string;
  roomId: string;
}

export interface IRoom {
  id: string;
  connectedUsers: IUser[];
}
