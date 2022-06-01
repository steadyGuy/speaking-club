import { getTURNCredentials } from "./api";

let TURNIceServers: any = null;

export const fetchTURNCredentials = async () => {
  const resData = await getTURNCredentials();

  if (resData?.token?.iceServers) {
    TURNIceServers = resData.token?.iceServers;
  }
  
  console.log("TURNIceServers fetched");
  return TURNIceServers;
};

export const getTURNIceServers = () => TURNIceServers;
