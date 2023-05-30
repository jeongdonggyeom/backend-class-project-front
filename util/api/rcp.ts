import { instance } from "../instance";

export const winRate = async () => {
  return (await instance.get("/wr")).data;
};

export const play = async (hand: string) => {
  return (await instance.post('/play', {
    hand: hand,
  })).data;
}

export const day = async (data: string) => {
  return (await instance.get(`/day?day=${data}`)).data
}

export const week = async (start: string, end: string) => {
  return (await instance.get(`/week?start=${start}&end=${end}`)).data
  // return (await instance.get(`/week?start=2023-05-16&end=2023-05-23`)).data
}
