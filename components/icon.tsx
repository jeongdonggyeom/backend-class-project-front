import { play } from "@/util/api/rcp";
import Image, { StaticImageData } from "next/image";
import { useMutation } from "react-query";

export default function Icon({
  image,
  name,
  rate,
  hand,
}: {
  image: StaticImageData;
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
      className="w-[400px] h-[400px] flex items-center flex-col"
      onClick={() => mutate(hand)}
    >
      <Image src={image} alt="icon" width={300} height={300} className="mb-5" />
      <p className="text-5xl mb-5">{name}</p>
      <p className="text-4xl">승률: {Math.round(rate * 100) / 100}%</p>
    </div>
  );
}
