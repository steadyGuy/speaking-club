import { store } from "../store";
import { setDirectChatHistroy } from "../store/action-creators/roomInfoActions";
import { Identity, IMessage } from "../types";

export const appendNewMessageToChatHistory = (data: {
  authorIdentity: Identity;
  message: string;
  isAuthor: boolean;
  receiverId: string;
}) => {
  const msg: IMessage = {
    message: data.message,
    time: new Date().toLocaleTimeString(),
    author: data.authorIdentity.name,
    isAuthor: data.isAuthor,
  };

  updateChatHistoryByUser(msg, data.authorIdentity.id, data.receiverId);
};

const updateChatHistoryByUser = (
  message: IMessage,
  userIdSender: string,
  userIdReceiver: string
) => {
  const oldChatHistory = store.getState().roomInfo.directChatHistory;
  let userId = "";
  let userChat: IMessage[] = [];
  console.log(`${userIdSender}_${userIdReceiver}`);
  if (oldChatHistory[`${userIdSender}_${userIdReceiver}`]) {
    userId = `${userIdSender}_${userIdReceiver}`;
    userChat = oldChatHistory[`${userIdSender}_${userIdReceiver}`];
  } else if (oldChatHistory[`${userIdReceiver}_${userIdSender}`]) {
    userId = `${userIdReceiver}_${userIdSender}`;
    userChat = oldChatHistory[`${userIdReceiver}_${userIdSender}`];
  } else {
    userId = `${userIdReceiver}_${userIdSender}`;
    userChat = [];
  }

  const newChatHistoryForUser = [...userChat, message];

  store.dispatch(
    setDirectChatHistroy({ ...oldChatHistory, [userId]: newChatHistoryForUser })
  );
};
