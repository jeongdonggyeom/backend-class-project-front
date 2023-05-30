import { play } from "@/util/api/rcp";
import { useMutation } from "react-query";
import {
  FaRegHandRock,
  FaRegHandScissors,
  FaRegHandPaper,
} from "react-icons/fa";

export default function Icon({
  image,
  name,
  rate,
  hand,
}: {
  image: string;
  name: string;
  rate: number;
  hand: string;
}) {
  const { mutate } = useMutation(["play"], play, {
    onSuccess: (data) => {
      alert(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <div
      className="w-[25rem] h-[25rem] flex items-center flex-col border-2 rounded-3xl border-white p-5"
      onClick={() => mutate(hand)}
    >
      {image === "rock" && <FaRegHandRock className="text-[12rem]" />}
      {image === "scissors" && <FaRegHandScissors className="text-[12rem]" />}
      {image === "paper" && <FaRegHandPaper className="text-[12rem]" />}
      <p className="text-5xl mb-5 mt-5">{name}</p>
      <p className="text-4xl">승률: {rate}%</p>
    </div>
  );
}
