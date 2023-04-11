import { instance } from "../instance";

export const winRate = async () => {
  return (await instance.get("/wr")).data;
};