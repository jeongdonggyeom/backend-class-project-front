import Image, { StaticImageData } from "next/image";

export default function Icon({
  image,
  name,
  rate,
}: {
  image: StaticImageData;
  name: string;
  rate: number;
}) {
  return (
    <div className="w-[400px] h-[400px] flex items-center flex-col">
      <Image src={image} alt="icon" width={300} height={300} className="mb-5" />
      <p className="text-5xl mb-5">{name}</p>
      <p className="text-4xl">승률: {rate}%</p>
    </div>
  );
}
