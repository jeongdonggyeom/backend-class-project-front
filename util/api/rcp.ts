import { instance } from "../instance";

export const winRate = async () => {
  return (await instance.get("/wr")).data;
};

export const play = async (hand: string) => {
  return (await instance.post('/play', {
    hand: hand,
  })).data;
}