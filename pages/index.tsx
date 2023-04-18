import Icon from "@/components/icon";
import { Paper, Rock, Scissors } from "@/public/images/images";
import { winRate } from "@/util/api/rcp";
import { useQuery } from "react-query";

export default function Home() {
  const { data, isSuccess } = useQuery("wr", () => winRate());

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <h1 className="text-7xl mb-40">가위바위보</h1>
      {isSuccess ? (
        <>
          <div className="flex">
            <Icon image={Scissors} name={data[1].hand} rate={data[1].wr} hand="C" />
            <Icon image={Paper} name={data[2].hand} rate={data[2].wr} hand="P" />
            <Icon image={Rock} name={data[0].hand} rate={data[0].wr} hand="R" />
          </div>
        </>
      ) : (
        <>
          <p className="text-5xl">데이터를 불러오는중...</p>
        </>
      )}
    </div>
  );
}
